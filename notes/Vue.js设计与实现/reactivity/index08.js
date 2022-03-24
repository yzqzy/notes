const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const arr = reactive([1, 2]);

// effect(() => {
//   console.log(arr.includes(1));
// });

// arr[0] = 3;


// const obj = {};
// const arr = reactive([ obj ]);

// console.log(arr.includes(arr[0])) // true


// const obj = {};
// const arr = reactive([ obj ]);

// console.log(arr.includes(obj)) // true


const arr = reactive([]);

effect(() => {
  arr.push(1);
});

effect(() => {
  arr.push(1);
});
