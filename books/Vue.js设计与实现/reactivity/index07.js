const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

// const arr = reactive(['foo']);

// effect(() => {
//   for (const key in arr) {
//     console.log(key); // 0
//   }
// });

// arr[1] = 'bar';
// arr.length = 0;


// const obj = {
//   value: 0,
//   [Symbol.iterator]() {
//     return {
//       next () {
//         return {
//           value: obj.value++,
//           done: obj.value > 10 ? true : false
//         }
//       }
//     }
//   }
// };

// for (const value of obj) {
//   console.log(value); // 0 1 2 3 4 5 6 7 8 9
// }


// const arr = [1, 2, 3, 4, 5];
// const itr = arr[Symbol.iterator]();

// console.log(itr.next()); // { value: 1, done: false }
// console.log(itr.next()); // { value: 1, done: false }
// console.log(itr.next()); // { value: 1, done: false }
// console.log(itr.next()); // { value: 1, done: false }
// console.log(itr.next()); // { value: 1, done: false }
// console.log(itr.next()); // { value: undefined, done: true }


// const arr = [1, 2, 3, 4, 5];

// for (const val of arr) {
//   console.log(val); // 1 2 3 4 5
// }


// const arr = [1, 2, 3, 4, 5];

// arr[Symbol.iterator] = function () {
//   const target = this;
//   const len = target.length;
//   let index = 0;

//   return {
//     next () {
//       return {
//         value: index < len ? target[index] : undefined,
//         done: index++ >= len
//       }
//     }
//   }
// }

// for (const val of arr) {
//   console.log(val); // 1 2 3 4 5
// }


// const arr = reactive([1, 2, 3, 4, 5]);

// effect(() => {
//   for (const val of arr) {
//     console.log(val);
//   }
// });

// arr['1'] = 'bar';
// arr.length = 0; 



// console.log(Array.prototype.values === Array.prototype[Symbol.iterator]); // true

const arr = reactive([1, 2, 3, 4, 5]);

effect(() => {
  for (const val of arr.values()) {
    console.log(val);
  }
});

arr['1'] = 'bar';
arr.length = 0; 
