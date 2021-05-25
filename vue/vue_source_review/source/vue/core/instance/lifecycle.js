import Watcher from '../observe/watcher';
import { compiler } from '../../compiler/index';

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (node) {
    const vm = this;
    const el = vm.$el;

    compiler(node, vm);

    el.appendChild(node);
  }
}

export function mountComponent (vm, el) {
  vm.$el = el;
  
  // 更新组件
  const updateComponent = () => {
    vm._update(vm._render());
  }

  // 渲染 Watcher
  new Watcher(vm, updateComponent);
}