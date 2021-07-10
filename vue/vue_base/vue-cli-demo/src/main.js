// import { createApp } from 'vue'; 引入全局 CDN 文件，不使用 NPM 库

const { createApp } = Vue;

import App from './App.vue'

createApp(App).mount('#app')
