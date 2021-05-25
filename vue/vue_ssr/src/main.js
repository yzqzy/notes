import Vue from 'vue';
import App from  './App';
import createRouter from './router/create-router';
import createStore from './store/create-store';

export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return {
    app,
    router,
    store
  }
}