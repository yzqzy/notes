const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

for (const value of p.values()) {
  console.log(value);
}
