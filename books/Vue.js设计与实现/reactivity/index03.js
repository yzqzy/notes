const { effect,} = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const obj = { foo: NaN };

// const p = reactive(obj);

// effect(() => {
//   console.log(p.foo);
// });

// p.foo = NaN;


const obj = {};
const proto = { bar: 1 };

const child = reactive(obj);
const parent = reactive(proto);

Object.setPrototypeOf(child, parent);

effect(() => {
  console.log(child.bar);
});

child.bar = 2;

// console.log(child.raw === obj); // true
// console.log(parent.raw === proto); // true
