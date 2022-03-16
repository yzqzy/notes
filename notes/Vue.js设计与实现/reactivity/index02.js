const { effect, track, trigger, ITERATE_KEY } = require('../shared/effect');

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


// const obj = { foo: 1 };
// const ITERATE_KEY = Symbol();

// const p = new Proxy(obj, {
//   get (target, key, receiver) {
//     track(target, key);
//     return Reflect.get(target, key, receiver);
//   },
//   set (target, key, newVal) {
//     target[key] = newVal;
//     trigger(target, key);
//   },
//   has (target, key) {
//     track(target, key);
//     return Reflect.has(target, key);
//   },
//   ownKeys (target) {
//     track(target, ITERATE_KEY);
//     return Reflect.ownKeys(target);
//   }
// });



const obj = { foo: 1 };

const hasOwnProperty = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  set (target, key, newVal, receiver) {
    const type = hasOwnProperty(target, key) ? 'SET' : 'ADD';
    const res = Reflect.set(target, key, newVal, receiver);
    trigger(target, key, type);
    return res;
  },
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

// p.bar = 2;
p.foo = 2;
