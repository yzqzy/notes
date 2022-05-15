
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
