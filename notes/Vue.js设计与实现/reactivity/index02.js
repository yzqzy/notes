const { effect, track, trigger } = require('../shared/effect');

// const data = {
//   foo: 1,
//   get bar () {
//     return this.foo
//   }
// };

// const obj = new Proxy(data, {
//   get (target, key, receiver) {
//     track(target, key);
//     return Reflect.get(target, key, receiver);
//   },
//   set (target, key, newVal) {
//     target[key] = newVal;
//     trigger(target, key);
//   },
// });

// effect(() => {
//   console.log(obj.bar);
// });

// obj.foo++;

// const data = { foo: 1 };

// const obj = new Proxy(data, {
//   deleteProperty (target, key) {
//     return Reflect.deleteProperty(target, key);
//   }
// });

// console.log(obj.foo); // 1
// delete obj.foo;
// console.log(obj.foo); // undefined
// console.log(data.foo); // undefined


const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  has (target, key) {
    track(target, key);
    return Reflect.has(target, key);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});

