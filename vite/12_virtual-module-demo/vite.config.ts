import { defineConfig } from 'vite'
import MyPlugin from './src/plugin'

export default defineConfig({
  plugins: [MyPlugin()]
})