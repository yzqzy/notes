import { defineConfig } from "vitepress"
import sidebars from './sidebar.json'

// @ts-ignore
export default defineConfig((ctx) => ({
  lang: 'en-US',
  title: 'Personal Notes',
  titleTemplate: "月落 - Personal Notes",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  description: 'Web Developer & JS Fancier',
  themeConfig: {
    sidebar: sidebars as any,
    socialLinks: [{ icon: "github", link: "https://github.com/yw0525" }],
    footer: {
      copyright: 'Copyright © 2022-月落 版权所有'
    }
  }
}))
