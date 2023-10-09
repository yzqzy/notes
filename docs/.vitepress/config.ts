import sidebars from './sidebar.json'

export default {
  lang: 'en-US',
  title: 'Personal Notes',
  titleTemplate: '月落 - Personal Notes',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  description: 'Web Developer & JS Fancier',
  themeConfig: {
    sidebar: sidebars,
    socialLinks: [{ icon: 'github', link: 'https://github.com/yzqzy' }],
    footer: {
      copyright: 'Copyright © 2023-月落 版权所有'
    },
    outline: 'deep'
  }
}
