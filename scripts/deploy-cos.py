#!/usr/bin/env python
"""把 dist/ 同步到腾讯云 COS 对象存储，作为站点静态托管。

用法（凭据只放在环境变量里，不写入仓库）:

    $env:COS_SECRET_ID="AKID..."      # PowerShell
    $env:COS_SECRET_KEY="..."
    python scripts/deploy-cos.py               # 先构建再同步
    python scripts/deploy-cos.py --skip-build  # 直接同步现有 dist/
    python scripts/deploy-cos.py --dry-run     # 只打印将要上传的文件

可选环境变量: COS_BUCKET（默认 yqst-1431239154）、COS_REGION（默认 ap-beijing）
"""

from __future__ import annotations

import argparse
import hashlib
import mimetypes
import os
import subprocess
import sys
from pathlib import Path

BUCKET = os.environ.get("COS_BUCKET", "yqst-1431239154")
REGION = os.environ.get("COS_REGION", "ap-beijing")
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".pdf": "application/pdf",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".txt": "text/plain; charset=utf-8",
}

# 带内容哈希的构建产物可以长期缓存，其余文件短缓存以便随时更新
IMMUTABLE_PREFIXES = ("assets/",)
SHORT_CACHE = "public, max-age=604800"
LONG_CACHE = "public, max-age=31536000, immutable"
NO_CACHE = "no-cache, must-revalidate"

# 前端路由：把 index.html 复制到这些目录，使直达链接返回 200（分享到微信/QQ 抓取预览时更稳）
ROUTE_PATHS = (
    "news",
    "practice",
    "investors",
    "products",
    "products/semantic-os",
    "products/hongru-opc",
    "about/profile",
    "about/history",
    "about/team",
    "about/team/zhangbochen",
    "about/team/zhangyansen",
    "careers/positions",
    "careers/workspace",
    "capability/knowledge-search",
    "capability/comic-creation",
    "capability/digital-employee",
    "capability/private-deployment",
)


def content_type_for(path: Path) -> str:
    return CONTENT_TYPES.get(path.suffix.lower()) or mimetypes.guess_type(path.name)[0] or "application/octet-stream"


def cache_control_for(key: str) -> str:
    if key == "index.html":
        return NO_CACHE
    if key.startswith(IMMUTABLE_PREFIXES):
        return LONG_CACHE
    return SHORT_CACHE


def md5_of(path: Path) -> str:
    digest = hashlib.md5()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_site() -> None:
    print("==> 构建站点 (vite build)")
    node = "node"
    subprocess.run([node, "node_modules/typescript/bin/tsc", "-b"], cwd=ROOT, check=True)
    subprocess.run([node, "node_modules/vite/bin/vite.js", "build"], cwd=ROOT, check=True)


def prerender_routes() -> int:
    """为每个前端路由生成一份 index.html，使直达链接返回 200 而不是 404。"""
    shell = DIST / "index.html"
    if not shell.is_file():
        return 0
    html = shell.read_text(encoding="utf-8")
    created = 0
    for route in ROUTE_PATHS:
        target = DIST / route / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists() or target.read_text(encoding="utf-8") != html:
            target.write_text(html, encoding="utf-8")
            created += 1
    print(f"==> 路由入口文件：{len(ROUTE_PATHS)} 个（更新 {created} 个）")
    return created


def main() -> int:
    parser = argparse.ArgumentParser(description="同步 dist/ 到 COS")
    parser.add_argument("--skip-build", action="store_true", help="跳过 vite build，直接同步现有 dist/")
    parser.add_argument("--dry-run", action="store_true", help="只列出将要上传的文件")
    parser.add_argument("--force", action="store_true", help="忽略大小一致判断，强制全部上传")
    args = parser.parse_args()

    secret_id = os.environ.get("COS_SECRET_ID")
    secret_key = os.environ.get("COS_SECRET_KEY")
    if not secret_id or not secret_key:
        print("缺少 COS_SECRET_ID / COS_SECRET_KEY 环境变量", file=sys.stderr)
        return 2

    if not args.skip_build:
        build_site()

    if not DIST.is_dir():
        print(f"找不到构建产物目录: {DIST}", file=sys.stderr)
        return 2

    prerender_routes()

    local_files = sorted(p for p in DIST.rglob("*") if p.is_file())

    if args.dry_run:
        for path in local_files:
            key = path.relative_to(DIST).as_posix()
            print(f"  {key}  ({path.stat().st_size} bytes, {content_type_for(path)})")
        print(f"共 {len(local_files)} 个文件（dry-run，未上传）")
        return 0

    from qcloud_cos import CosConfig, CosS3Client

    client = CosS3Client(
        CosConfig(Region=REGION, SecretId=secret_id, SecretKey=secret_key, Scheme="https", Timeout=60)
    )

    remote: dict[str, tuple[int, str]] = {}
    marker = ""
    while True:
        resp = client.list_objects(Bucket=BUCKET, Marker=marker, MaxKeys=1000)
        for item in resp.get("Contents", []):
            etag = (item.get("ETag") or "").strip('"')
            remote[item["Key"]] = (int(item["Size"]), etag)
        if resp.get("IsTruncated") == "true":
            marker = resp.get("NextMarker", "")
        else:
            break

    uploaded = skipped = 0
    for path in local_files:
        key = path.relative_to(DIST).as_posix()
        size = path.stat().st_size
        current = remote.get(key)
        if not args.force and current:
            remote_size, remote_etag = current
            # 分片上传的 ETag 不是纯 MD5（形如 xxx-N），只能比大小；
            # 普通上传的 ETag 就是文件 MD5，可以精确判断内容是否变化。
            if remote_size == size:
                if "-" in remote_etag:
                    skipped += 1
                    continue
                if remote_etag and remote_etag == md5_of(path):
                    skipped += 1
                    continue
        client.upload_file(
            Bucket=BUCKET,
            Key=key,
            LocalFilePath=str(path),
            ContentType=content_type_for(path),
            CacheControl=cache_control_for(key),
            EnableMD5=False,
        )
        uploaded += 1
        print(f"    上传 {key}  ({size} bytes)")

    print(f"完成：上传 {uploaded} 个，跳过 {skipped} 个（远端已一致）")
    print(f"站点地址: https://{BUCKET}.cos-website.{REGION}.myqcloud.com/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
