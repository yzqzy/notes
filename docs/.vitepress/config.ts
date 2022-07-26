import { defineConfig } from "vitepress";
import sidebars from './sidebar.json'

// @ts-ignore
export default defineConfig((ctx) => ({
  base: ctx.mode == 'production' ? '/notes/' : '', 
  lang: 'en-US',
  title: 'Personal Notes',
  head: [
    ['link', { rel: 'icon', href: '/notes/favicon.ico' }]
  ],
  description: 'Web Developer & JS Fancier',
  themeConfig: {
    footer: {
      copyright: 'Copyright © 2022-月落 版权所有'
    },
    sidebar: sidebars as any
  }
}))
