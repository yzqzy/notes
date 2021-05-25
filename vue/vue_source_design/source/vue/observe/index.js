import Observer from './observer';
import Watcher from './watcher';
import Dep from './dep';

export function initState (vm) {
  let options = vm.$options;

  if (options.data) {
    initData(vm);
  }

  if (options.computed) {
    initComputed(vm, options.computed);
  }

  if (options.watch) {
    initWatch(vm);
  }
}

export function observe (data) {
  if (typeof data !== 'object' || data == null) {
    return;
  }

  if (data.__ob__) {
    return data.__ob__;
  }

  return new Observer(data);
}

/**
 * @description 属性代理
 * @param {object} vm - vue实例 
 * @param {string} source - 代理的属性片段 
 * @param {string} key - 目标值
 * @return {void}
 */
function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      // vm.message -> vm._data.message
      return vm[source][key];
    },

    set (newValue) {
      vm[source][key] = newValue;
    }
  });
}

function initData (vm) {
  let data = vm.$options.data;

  data = vm._data = typeof data === 'function' ? data.call(vm) : data || [];

  // 代理
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  // 观察数据
  observe(vm._data);
}

/**
 * @description 计算属性的getter方法
 * @param {object} vm - vue实例
 * @param {string} key - 键
 */
function createComputedGetter (vm, key) {
  let watcher = vm._watchersComputed[key];

  // dirty -> 计算属性缓存问题
  return function () {
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  }
}

function initComputed (vm, computed) {
  let watchers = vm._watchersComputed = Object.create(null);

  for (let key in computed) {
    let useDef = computed[key];
    // 计算属性的watcher
    watchers[key] = new Watcher(vm, useDef, () => {}, {
      lazy: true
    });
    // 设置getter方法
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    });
  }
}

function createWatcher (vm, key, handler) {
  return vm.$watch(key, handler);
}

function initWatch (vm) {
  let watch = vm.$options.watch;

  for (let key in watch) {
    let handler = watch[key];
    createWatcher(vm, key, handler);
  }
}