import Vue from 'vue';
import VueRouter from './vue-router';

import Home from '../views/Home';
import User from '../views/User';

// 使用一个插件（install）
Vue.use(VueRouter, {
  test: 'test'
});

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: User
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;