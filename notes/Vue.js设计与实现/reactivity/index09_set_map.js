const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// // 普通对象的读取和设置操作
// const obj = { foo: 1 };
// obj.foo;
// obj.foo = 2;

// // 用 get/set 方法操作 map 数据
// const map = new Map();
// map.set('key', 1);
// map.get('key');


// const proxy = reactive(new Map([['key', 1]]));

// effect(() => {
//   console.log(proxy.get('key'));
// });

// proxy.set('key', 2);


// const s = new Set([1, 2, 3]);
// const p = new Proxy(s, {});
// console.log(p.size); // Method get Set.prototype.size called on incompatible receiver #<Set>


// const s = new Set([1, 2, 3]);
// const p = new Proxy(s, {
//   get (target, key, receiver) {
//     if (key === 'size') {
//       // 如果读取的时 size 属性
//       // 通过指定第三个参数 receiver 为原始对象 target 从而修复问题 
//       return Reflect.get(target, key, target);
//     }
//     // 读取其他属性的默认行为
//     return Reflect.get(target, key, receiver);
//   }
// });
// // console.log(p.size); 


// const s = new Set([1, 2, 3]);
// const p = new Proxy(s, {
//   get (target, key, receiver) {
//     if (key === 'size') {
//       // 如果读取的时 size 属性
//       // 通过指定第三个参数 receiver 为原始对象 target 从而修复问题 
//       return Reflect.get(target, key, target);
//     }
//     // 读取其他属性的默认行为
//     return Reflect.get(target, key, receiver);
//   }
// });
// p.delete(1); //  Method Set.prototype.delete called on incompatible receiver #<Set>

// const s = new Set([1, 2, 3]);
// const p = new Proxy(s, {
//   get (target, key, receiver) {
//     if (key === 'size') {
//       return Reflect.get(target, key, target);
//     }
//     // 将方法与原始数据对象 target 绑定后返回
//     return target[key].bind(target);
//   }
// });
// p.delete(1);


// const s = new Set([1, 2, 3]);
// const p = new Proxy(s, {
//   get (target, key, receiver) {
//     if (key === 'size') {
//       return Reflect.get(target, key, target);
//     }
//     // 将方法与原始数据对象 target 绑定后返回
//     return target[key].bind(target);
//   }
// });
// p.delete(1);


// const p = reactive(new Set([1, 2, 3]));

// console.log(p.size);
// p.delete(1);
// console.log(p.size);


const p = reactive(new Set([1, 2, 3]));

effect(() => {
  console.log(p.size);
});

p.add(1);