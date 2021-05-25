import { observe } from './index';
import { newArrayProtoMethods, observeArray, dependArray } from './array';
import Dep from './dep';

export function defineReactive (data, key, value) {
  // 递归处理
  let childOb = observe(value);

  let dep = new Dep();

  /**
   * @description ES5方法 不兼容IE8及以下版本
   * @property {object} data - 目标数据
   * @property {string} key - 目标数据的键
   * @property {any} value - 目标数据的值
   */
  Object.defineProperty(data, key, {
    get () {
      if (Dep.target) {
        // dep.addSub(Dep.target);
        dep.depend(); // 解决重复订阅事件的问题
        if (childOb) {
          childOb.dep.depend(); // 数组的依赖收集
          dependArray(value); // 多维数组依赖收集
        }
      }
      return value;
    },

    set (newValue) {
      if (newValue === value) return;
      observe(newValue); // 观察数据
      value = newValue;
      dep.notify();
    }
  });
}

class Observer {
  constructor (data) {
    // 用于数组依赖收集
    this.dep = new Dep();

    // 用于数组依赖收集
    Object.defineProperty(data, '__ob__', {
      get: () => this
    });

    //  数组单独处理
    if (Array.isArray(data)) {
      // 数组方法劫持
      data.__proto__ = newArrayProtoMethods;
      // 观察数组
      observeArray(data);
      return;
    }

    this.walk(data);
  }

  walk (data) {
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i],
          value = data[key];

      defineReactive(data, key, value);
    }
  }
}

export default Observer;