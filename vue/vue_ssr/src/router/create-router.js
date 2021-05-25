import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('../views/Home.vue');
const Aobout = () => import('../views/About.vue');

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: Aobout
  }
]

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes
  });
  return router;
}