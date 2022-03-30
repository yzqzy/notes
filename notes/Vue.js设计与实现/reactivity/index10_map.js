const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const p = reactive(new Map([['key', 1]]));
// effect(() => {
//   console.log(p.get('key'));
// });
// p.set('key', 2);

const m = new Map();

const p1 = reactive(m);
const p2 = reactive(new Map());

p1.set('p2', p2);

effect(() => {
  console.log(m.get('p2').size, m.get('p2'));
});

m.get('p2').set('foo', 1);