import { defineConfig } from "vitepress";
import sidebars from './sidebar.json'

export default defineConfig((ctx) => ({
  base: ctx.mode == 'production' ? '/notes/' : '', 
  lang: 'en-US',
  title: 'Personal Notes',
  description: 'Web Developer & JS Fancier',
  themeConfig: {
    footer: {
      copyright: 'Copyright © 2022-月落 版权所有'
    },
    sidebar: sidebars as any
  }
}))
