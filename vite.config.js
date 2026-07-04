import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置設定
export default defineConfig({
  plugins: [
    tailwindcss(), // 載入 Tailwind CSS v4 編譯插件
  ],
  // 設定專案路徑為根目錄 '/'，以符合 Cloudflare Pages 獨立自訂網域部署
  base: '/',
})
