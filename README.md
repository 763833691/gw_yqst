# UVW × IgnisPath 企业官网

面向 UVW AIGC Studios 与 IgnisPath Labs 的企业官网。当前版本采用原创的黑金光核系统视觉：ImageGen 主视觉、统一的未来科技图标图谱、轻量景深动效、模块化架构图和响应式信息布局。

## 技术栈

- React 19 + TypeScript + Vite 7
- React Router DOM 7
- Lucide 图标
- Radix UI Accordion

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 内容维护

网站文字、导航、业务能力、产品矩阵、案例与页脚信息统一维护在 `src/config.ts`。

品牌自有图片放在 `public/images/`，生成式主视觉与图标资源位于 `public/generated/`。来源未确认的旧模板图片、视频与效果源码已移至 `archive/`，不会进入生产构建；确认拥有使用权后可按需重新启用。

## 主要页面结构

- 企业定位与合作入口
- 关于我们与产品原则
- 四大能力体系及详情页
- 四层 AI 系统架构
- 适用场景与交付方式
- 产品矩阵
- 企业成果与常见问题
- 联系方式

## 版权说明

界面结构、配色与交互动效已进行去模板化重构。网站上线前，仍应由项目方确认品牌名称、文案、证书、团队照片及其他素材的授权范围。
