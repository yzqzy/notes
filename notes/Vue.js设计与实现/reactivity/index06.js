
const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

arr[0] = 'bar';
