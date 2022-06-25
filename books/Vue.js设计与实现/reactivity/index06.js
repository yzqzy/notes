
const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const arr = reactive(['foo']);

// effect(() => {
//   console.log(arr[0]);
// });

// arr[0] = 'bar';


// const arr = reactive(['foo']);

// effect(() => {
//   console.log(arr.length);
// });

// 设置索引为 1 的值，会导致数组的长度变为 2
// arr[1] = 'bar';


const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

// 将数组的长度修改为 0，导致第 0 个元素被删除，因此应该触发响应
arr.length = 0;