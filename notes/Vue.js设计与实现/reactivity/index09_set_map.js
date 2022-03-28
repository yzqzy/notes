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


const s = new Set([1, 2, 3]);
const p = new Proxy(s, {});

console.log(p.size); // Method get Set.prototype.size called on incompatible receiver #<Set>