import { observe } from '../observe';

export function initState (vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }

  if (opts.computed) {
    initComputed(vm);
  }

  if (opts.watch) {
    initWatch(vm);
  }
}

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key];
    },
    set (newVal) {
      vm[source][key] = newVal;
    }
  });
}

function initData (vm) {
  let data = vm.$options.data;

  data = vm._data = typeof data === 'function' 
    ? data.call(vm) 
    : data || {};

  // 访问代理
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      proxy(vm, '_data', key);
    }
  }

  // 观察数据
  observe(vm._data);  
}

function initComputed (vm) {

}

function initWatch (vm) {

}