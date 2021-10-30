import Vue from 'vue';
import VueRouter from 'vue-router';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const Foo = { template: '<div>Foo<div>' };
const Bar = { template: '<div>Bar<div>' };

const routes = [
  {
    path: '/foo',
    component: Foo
  },
  {
    path: '/bar',
    component: Bar
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/realworld',
  routes
});

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        },
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
