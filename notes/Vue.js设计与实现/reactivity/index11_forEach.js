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


const key = { key: 1 };
const value = new Set([1, 2, 3]);
const p = reactive(new Map([
  [key, value]
]));

effect(() => {
  p.forEach((value, key) => {
    console.log(value);
  })
});

p.get(key).delete(1);
