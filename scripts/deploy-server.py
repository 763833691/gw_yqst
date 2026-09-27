#!/usr/bin/env python
"""把站点部署到腾讯云轻量应用服务器（43.143.250.124 / lhins-q7a82edo）。

流程：构建 dist → 打包 → 上传到 COS 中转 → 通过「自动化助手(TAT)」在服务器上
下载解包到 /var/www/yqst → 重载 nginx。全程不需要 SSH。

用法（凭据只放环境变量，不写入仓库）:

    $env:COS_SECRET_ID="AKID..."
    $env:COS_SECRET_KEY="..."
    python scripts/deploy-server.py             # 构建 + 部署
    python scripts/deploy-server.py --skip-build

可选环境变量：
    SITE_BUCKET（默认 yqst-1431239154）、SITE_REGION（默认 ap-beijing）
    SITE_INSTANCE（默认 lhins-q7a82edo）、SITE_ROOT（默认 /var/www/yqst）
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import tarfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PACKAGE = ROOT / ".deploy" / "yqst-site.tar.gz"

BUCKET = os.environ.get("SITE_BUCKET", "yqst-1431239154")
REGION = os.environ.get("SITE_REGION", "ap-beijing")
INSTANCE = os.environ.get("SITE_INSTANCE", "lhins-q7a82edo")
SITE_ROOT = os.environ.get("SITE_ROOT", "/var/www/yqst")
OBJECT_KEY = "_deploy/yqst-site.tar.gz"
PUBLIC_BASE = f"https://{BUCKET}.cos.{REGION}.myqcloud.com"

# 参与上站的目录（大体积的生成视频仍走 COS，不必复制到服务器）
INCLUDE = ("index.html", "assets", "docs", "images", "news", "practice", "investors",
           "products", "about", "careers", "capability")

# 前端路由：复制 index.html 到各目录，使直达链接返回 200
ROUTE_PATHS = (
    "news", "practice", "investors", "products",
    "products/semantic-os", "products/hongru-opc",
    "about/profile", "about/history", "about/team",
    "about/team/zhangbochen", "about/team/zhangyansen",
    "careers/positions", "careers/workspace",
    "capability/knowledge-search", "capability/comic-creation",
    "capability/digital-employee", "capability/private-deployment",
)


def build() -> None:
    node = "node"
    subprocess.run([node, "node_modules/typescript/bin/tsc", "-b"], cwd=ROOT, check=True)
    subprocess.run([node, "node_modules/vite/bin/vite.js", "build"], cwd=ROOT, check=True)
    prerender_routes()


def prerender_routes() -> None:
    shell = DIST / "index.html"
    if not shell.is_file():
        return
    html = shell.read_text(encoding="utf-8")
    for route in ROUTE_PATHS:
        target = DIST / route / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists() or target.read_text(encoding="utf-8") != html:
            target.write_text(html, encoding="utf-8")
    print(f"==> 路由入口文件：{len(ROUTE_PATHS)} 个")


def pack() -> None:
    PACKAGE.parent.mkdir(parents=True, exist_ok=True)
    with tarfile.open(PACKAGE, "w:gz") as tar:
        for name in INCLUDE:
            path = DIST / name
            if path.exists():
                tar.add(path, arcname=name)
    print(f"==> 打包完成 {PACKAGE.name}（{PACKAGE.stat().st_size / 1024 / 1024:.1f} MB）")


def upload() -> None:
    from qcloud_cos import CosConfig, CosS3Client

    client = CosS3Client(CosConfig(Region=REGION, SecretId=os.environ["COS_SECRET_ID"],
                                   SecretKey=os.environ["COS_SECRET_KEY"], Scheme="https", Timeout=180))
    client.upload_file(Bucket=BUCKET, Key=OBJECT_KEY, LocalFilePath=str(PACKAGE),
                       ContentType="application/gzip", CacheControl="no-cache", EnableMD5=False)
    print("==> 已上传中转包到对象存储")


def run_on_server(command: str, timeout: int = 600) -> str:
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.tat.v20201028 import tat_client, models

    cred = credential.Credential(os.environ["COS_SECRET_ID"], os.environ["COS_SECRET_KEY"])
    profile = ClientProfile()
    profile.httpProfile = HttpProfile()
    profile.httpProfile.endpoint = "tat.tencentcloudapi.com"
    profile.httpProfile.reqTimeout = 60
    client = tat_client.TatClient(cred, REGION, profile)

    req = models.RunCommandRequest()
    req.Content = base64.b64encode(command.encode("utf-8")).decode("ascii")
    req.InstanceIds = [INSTANCE]
    req.CommandName = "yqst-deploy"
    req.Timeout = timeout
    invocation = json.loads(client.RunCommand(req).to_json_string())["InvocationId"]

    for _ in range(60):
        time.sleep(3)
        query = models.DescribeInvocationTasksRequest()
        flt = models.Filter()
        flt.Name = "invocation-id"
        flt.Values = [invocation]
        query.Filters = [flt]
        tasks = json.loads(client.DescribeInvocationTasks(query).to_json_string()).get("InvocationTaskSet", [])
        for task in tasks:
            if task.get("TaskStatus") in ("SUCCESS", "FAILED", "TIMEOUT", "PARTIAL_FAILED"):
                result = task.get("TaskResult") or {}
                output = result.get("Output", "")
                try:
                    output = base64.b64decode(output).decode("utf-8", "replace")
                except Exception:
                    pass
                return f"[{task.get('TaskStatus')} exit={result.get('ExitCode')}]\n{output}"
    return "[PENDING] 超时未拿到执行结果"


def main() -> int:
    parser = argparse.ArgumentParser(description="部署站点到轻量应用服务器")
    parser.add_argument("--skip-build", action="store_true", help="跳过前端构建")
    args = parser.parse_args()

    if not os.environ.get("COS_SECRET_ID") or not os.environ.get("COS_SECRET_KEY"):
        print("缺少 COS_SECRET_ID / COS_SECRET_KEY 环境变量", file=sys.stderr)
        return 2

    if not args.skip_build:
        build()
    pack()
    upload()

    command = f"""set -e
mkdir -p {SITE_ROOT}
curl -fsSL -o /tmp/yqst-site.tar.gz {PUBLIC_BASE}/{OBJECT_KEY}
rm -rf {SITE_ROOT}/*
tar -xzf /tmp/yqst-site.tar.gz -C {SITE_ROOT}
nginx -t >/dev/null 2>&1 && systemctl reload nginx
echo ROUTES_CHECK
for p in / /news /products /about/profile /careers/positions /capability/private-deployment; do
  printf '%s -> ' "$p"; curl -s -o /dev/null -w '%{{http_code}}\\n' "http://127.0.0.1$p"
done
"""
    print(run_on_server(command))
    print(f"==> 站点地址：http://43.143.250.124/   （站点目录 {SITE_ROOT}）")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
