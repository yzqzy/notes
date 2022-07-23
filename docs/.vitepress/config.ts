import { defineConfig } from "vitepress";

export default defineConfig({
  lang: 'en-US',
  title: '月落个人笔记',
  description: 'Web Developer & JS Fancier',

  themeConfig: {
    nav: nav(),
    footer: {
      copyright: 'Copyright © 2022-月落 版权所有'
    },
    sidebar: {
      '/css3/': sidebarConfig()
    },
  }
})

function nav() {
  return [
    { text: 'Guide', link: '/css3/index', activeMatch: '/css3/' },
    { text: 'Configs', link: '/config/introduction', activeMatch: '/config/' },
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'CSS3',
      items: [
        { text: 'Introduction', link: '/css3/index' },
        { text: 'sxxx', link: '/css3/2' },
        { text: 'xxdadad', link: '/css3/3' },
      ]
    }
  ]
}