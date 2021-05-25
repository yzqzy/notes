import { arrayMethods } from './array';
import { def } from '../util/index';
import Dep from './dep';

export class Observer {
  constructor (value) {
    // 定义__ob__
    def(value, '__obj__', this);

    // 处理数组
    if (Array.isArray(value)) {
      // 重写数组原型方法
      value.__proto__ = arrayMethods;
      // 观察数组元素
      this.observeArray(value);
      return;
    }

    // 处理对象
    this.walk(value);
  }

  walk (obj) {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      
      defineReactive(obj, key, obj[key]);
    }
  }

  observeArray (items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

export function defineReactive (data, key, val) {
  const dep = new Dep();

  // 递归调用
  observe(val);
  // 不兼容 IE8 及 IE8 以下
  Object.defineProperty(data, key, {
    get () {
      // 订阅
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set (newVal) {
      if (newVal === val) return;
      // 观察新数据
      observe(newVal);
      // 数据赋值
      val = newVal;
      // 发布
      dep.notify();
    }
  });
}

export function observe (data) {
  if (typeof data !== 'object' || data === null) {
    return;
  }
  return new Observer(data);
}