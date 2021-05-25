import { def } from '../util/index';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

// 操作原数组方法
let methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'splice',
  'sort',
  'reverse'
];

methods.forEach(method => {
  const originMethod = arrayMethods[method];

  def(arrayMethods, method, function (...args) {
    const result = originMethod.apply(this, args);

    const ob = this.__ob__;

    let inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }

    // 新增元素处理
    if (inserted) ob.observeArray(inserted);
    
    return result;
  });
});