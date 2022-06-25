const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const m = reactive(new Map([
//   [{ key: 1 }, { value: 1 }]
// ]));
// effect(() => {
//   m.forEach((value, key, m) => {
//     console.log(value);
//     console.log(key);
//   })
// });
// m.set({ key: 2 }, { value: 2 });


// const key = { key: 1 };
// const value = new Set([1, 2, 3]);
// const p = reactive(new Map([
//   [key, value]
// ]));
// effect(() => {
//   p.forEach((value, key) => {
//     console.log(value.size);
//   })
// });
// p.get(key).delete(1);


// effect(() => {
//   for (const key in obj) {
//     console.log(key);
//   }
// });


// const m = reactive(new Map([
//   ['key', 1]
// ]));
// effect(() => {
//   m.forEach((value, key) => {
//     // forEach 循环不仅关心集合的键，还关心集合的值
//     console.log(value);
//   })
// });
// m.set('key', 2);


// const m = new Map([
//   ['key1', 'value1'],
//   ['key2', 'value2']
// ]);

// for (const [key, value] of m.entries()) {
//   console.log(key, value);
// }
// key1 value1
// key2 value2

// const itr = m[Symbol.iterator]();
// console.log(itr.next()); // { value: [ 'key1', 'value1' ], done: false }
// console.log(itr.next()); // { value: [ 'key2', 'value2' ], done: false }
// console.log(itr.next()); // { value: undefined, done: true }

// console.log(m[Symbol.iterator] === m.entries); // true


// const p = reactive(new Map([
//   ['key1', 'value1'],
//   ['key2', 'value2']
// ]));
// effect(() => {
//   // TypeError: p is not iterable
//   for (const [key, value] of p) {
//     console.log(key, value);
//   }
// });
// p.set('key3', 'value3');


const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

effect(() => {
  // TypeError: p.entries is not a function or its return value is not iterable
  for (const [key, value] of p.entries()) {
    console.log(key, value);
  }
});

p.set('key3', 'value3');


// const obj = {
//   // 迭代器协议
//   next () {},
//   // 可迭代协议
//   [Symbol.iterator] () {
//     return this;
//   }
// }