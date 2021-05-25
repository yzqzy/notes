import { initState } from './observe';
import Watcher from './observe/watcher';
import { compiler } from './utils';
import { h, render, patch } from './vdom';

function Vue (options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  let vm = this;

  vm.$options = options;

  initState(vm);

  if (vm.$options.el) {
    vm.$mount();
  }
}

/**
 * @description 寻找DOM节点
 * @param {string | object} el 
 * @return {HTMLElement}
 */
function query (el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype.$watch = function (exp, handler) {
  let vm = this;
  
  // exp - watch 
  // watch属性的watcher
  new Watcher(vm, exp, handler, {
    user: true
  });
}

/**
 * @description 渲染函数
 * @return {vnode}
 */
Vue.prototype._render = function () {
  let vm = this,
      render = vm.$options.render;

  return render.call(vm, h);
}

Vue.prototype.$mount = function () {
  let vm = this,
      el = vm.$options.el;

  el = vm.$el = query(el);

  // 更新组件
  let updateComponent = () => {
    // vm._update(); 
    vm._update(vm._render()); // 使用虚拟DOM
  }

  // 渲染Watcher
  new Watcher(vm, updateComponent);
}

Vue.prototype._update = function (vnode) {
  let vm = this,
      el = vm.$el;

  const preVnode = vm.preVnode;

  if (!preVnode) {
    // 首次渲染 - 虚拟DOM
    vm.preVnode = vnode;
    render(vnode, el);
  } else {
    // diff算法
    vm.$el = patch(preVnode, vnode);
  }

  // 原有逻辑
  // let node  = document.createDocumentFragment(),
  //     firstChild;

  // while (firstChild = el.firstChild) {
  //   node.appendChild(firstChild);
  // }

  // compiler(node, vm);

  // el.appendChild(node);
}

export default Vue;