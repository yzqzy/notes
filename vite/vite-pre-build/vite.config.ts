import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // 配置为一个字符串数组，将 `lodash-es` 和 `vue`两个包强制进行预构建
    include: ["lodash-es"]
  }
})
