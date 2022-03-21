
const { effect } = require('../shared/effect');
const { readonly } = require('../shared/reactive');

// const obj = readonly({ foo: 1 });

// effect(() => {
//   console.log(obj.foo); // 可以读取值，但是不需要在副作用函数与数据之间建立响应关系
// });

// obj.foo = 2;


const obj = readonly({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo.bar = 2;

