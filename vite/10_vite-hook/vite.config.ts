import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import testHooks from './test-hooks-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), testHooks()]
})
