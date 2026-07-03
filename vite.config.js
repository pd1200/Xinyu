import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置設定
export default defineConfig({
  plugins: [
    tailwindcss(), // 載入 Tailwind CSS v4 編譯插件
  ],
  // 設定 GitHub Pages 的專案路徑前綴，確保本地打包部署時 CSS、JS 與圖片能正確載入
  base: '/Xinyu/',
})
