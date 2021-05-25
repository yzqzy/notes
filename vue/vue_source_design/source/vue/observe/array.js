/**
 * @file array -数组劫持
 * @module source/vue/observe/array
 * @author yangzhiqiang <yueluo.yang@qq.com>
 * @time 2020-07-10
 */

import { observe } from './index';

let oldArrayProtoMethods = Array.prototype;

export let newArrayProtoMethods = Object.create(oldArrayProtoMethods);

let methods = ['push', 'shift', 'unshift', 'pop', 'splice', 'sort', 'reverse'];

export function observeArray (insertedElement) {
  for (let i = 0; i < insertedElement.length; i++) {
    observe(insertedElement[i]); 
  }
}

export function dependArray (value) { // [[11, 2,3 ], 2]
  for (let i = 0; i < value.length; i++) {
    let currentItem = value[i];
    // 多维数组依赖收集（currentItem是数组或者对象）
    currentItem.__ob__ && currentItem.__ob__.dep.depend();
    // 递归处理依赖收集
    if (Array.isArray(currentItem)) {
      dependArray(currentItem);
    }
  }
}

// 重写操作原数组的方法：push shift unshift pop splice sort reverse
methods.forEach(method => {
  // method rewriting
  newArrayProtoMethods[method] = function (...args) {
    let result = oldArrayProtoMethods[method].apply(this, args);
    
    let insertedElement;

    switch (method) {
      case 'push':
      case 'unshift':
        insertedElement = args;
        break;
      case 'splice':
        insertedElement = args.slice(2);
        break;
      default:
        break;
    }

    if (insertedElement) {
      observeArray(insertedElement);
    }

    // 视图更新
    this.__ob__.dep.notify();

    return result;
  }
});