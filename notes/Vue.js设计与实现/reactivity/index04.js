const { effect,} = require('../shared/effect');
const { reactive, shallowReactive } = require('../shared/reactive');

// const obj = reactive({ foo: { bar: 1 } });

// effect(() => {
//   console.log(obj.foo.bar);
// });

// obj.foo.bar = 2;

const obj = shallowReactive({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});


obj.foo = { bar: 2 }; // 响应的，可以触发副作用函数并执行
obj.foo.bar = 3; // 不是响应的，不能触发副作用函数重新执行

