import { initState } from './state';

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
  
    vm.$options = options;
  
    initState(vm);

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }
}