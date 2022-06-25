// const { effect, track, trigger, ITERATE_KEY } = require('../shared/effect');

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

const {
  effect, track, trigger,
  ITERATE_KEY, TRIGGER_TYPE
} = require('../shared/effect');

const obj = { foo: 1 };

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
    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);
    trigger(target, key, type);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  deleteProperty (target, key) {
    // 检查被操作的属性是否是对象自己的属性
    const hadKey = Object.prototype.hasOwnProperty.call(target, key);
    // 使用 Reflect.deleteProperty 删除属性
    const res = Reflect.deleteProperty(target, key);

    if (res && hadKey) {
      // 只有当被删除属性时对象自身属性并且删除成功时，才出发更新
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }

    return res;
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

// p.bar = 2;
// p.foo = 2;
delete p.foo;
