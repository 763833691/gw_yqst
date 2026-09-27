import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const port = parseInt(process.env.DEPLOY_RUN_PORT || '5173', 10)

// https://vite.dev/config/
export default defineConfig({
  // 站点部署在域名根目录（COS 桶根 / server.cjs 根路径）。
  // 用绝对路径，保证 /about/team、/careers/positions 这类多级路由直接打开时
  // 仍能正确加载 assets（相对路径会解析成 /about/assets/... 而 404）。
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port,
    host: '0.0.0.0',
  },
  preview: {
    port,
    host: '0.0.0.0',
  },
});
