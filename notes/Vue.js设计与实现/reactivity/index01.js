// const fn = name => { console.log('我是: ', name); }

// const p2 = new Proxy(fn, {
//   apply (target, thisArg, argArray) {
//     target.call(thisArg, ...argArray);
//   }
// });

// p2('heora'); // 我是:  heora

// const obj = { foo: 1 };

// console.log(obj.foo); // 直接读取
// console.log(Reflect.get(obj, 'foo')); // 通过 Reflect.get 读取


// const obj = { foo: 1 };

// const p = new Proxy(obj, {
//   get (target, key) {

//   }
// })