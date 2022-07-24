import { defineConfig } from "vitepress";
import sidebars from './sidebar.json'

export default defineConfig({
  lang: 'en-US',
  title: '月落个人笔记',
  description: 'Web Developer & JS Fancier',

  themeConfig: {
    footer: {
      copyright: 'Copyright © 2022-月落 版权所有'
    },
    sidebar: sidebars as any
  }
})
