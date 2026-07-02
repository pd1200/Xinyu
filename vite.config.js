import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置設定
export default defineConfig({
  plugins: [
    tailwindcss(), // 載入 Tailwind CSS v4 編譯插件
  ],
  // 自動適配 GitHub Pages 二級目錄部署，本地開發時為根路徑 '/'
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/',
})
