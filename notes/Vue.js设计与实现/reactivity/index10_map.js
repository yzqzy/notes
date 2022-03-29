const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

const p = reactive(new Map([['key', 1]]));

effect(() => {
  console.log(p.get('key'));
});

p.set('key', 2);