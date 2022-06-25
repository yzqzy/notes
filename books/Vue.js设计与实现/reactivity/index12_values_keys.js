const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const p = reactive(new Map([
//   ['key1', 'value1'],
//   ['key2', 'value2']
// ]));
// for (const value of p.values()) {
//   console.log(value);
// }

const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

effect(() => {
  for (const value of p.keys()) {
    console.log(value);
  }
});

p.set('key2', 'value3'); // 不会触发响应
p.set('key3', 'value3'); // 能够触发响应
