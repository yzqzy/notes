// var arr = [1, 2, 3, 4, 5, 6];
// console.log(arr);
// arr.push(7);
// console.log(arr);

// var arr = [1, 2, 3, 4, 5];
// var obj = {
//   0: 1,
//   1: 2,
//   2: 3,
//   3: 4,
//   4: 5
// }
// console.log(arr[2]); // 
// console.log(obj[2]); // 3

// var arr = [,3, 1, 5, 7,];
// console.log(arr); // [empty, 3, 1, 5, 7]
// console.log(arr.length); // 5

// var arr1 = new Array(1, 3, 4);
// console.log(arr1);

// console.log(new Array(5)); // [empty × 5]

// var arr = [1, 2, 3];
// arr.push(4, 5, 6);
// console.log(arr)


// var arr = [2, 3, 4];

// Array.prototype.myPush = function () {
//   for (var i = 0; i < arguments.length; i++) {
//     this[this.length]  = arguments[i];
//   }
//   return this.length
// }

// arr.myPush(1, 5, 6);
// console.log(arr);


// var arr = ['a', 'b', 'c', 'e'];
// function splice (arr, index) {
//   index += index >= 0 ? 0 : arr.length;
//   return index;
// }
// console.log(splice(arr, 3));
// console.log(splice(arr, -1));


// var arr = [-1, -5, 8, 0, 2];
// arr.sort(); // 按照升序排序
// console.log(arr); // [-1, -5, 0, 2, 8]

// var arr = ['b', 'z', 'h', 'i', 'a'];
// arr.sort(); // 按照升序排序
// console.log(arr); // ["a", "b", "h", "i", "z"]

// var arr = [27, 49, 5, 7];
// arr.sort();
// console.log(arr); // [27, 49, 5, 7]

// var arr = [27, 49, 5, 7];
// arr.sort(function (a, b) {
//   return a - b;
// });
// console.log(arr); // [5, 7, 27, 49]

// var arr = [27, 49, 5, 7];
// arr.sort(function (a, b) {
//   return b - a;
// });
// console.log(arr); // [49, 27, 7, 5]

// var arr = [1, 3, 2, 6, 4, 5];
// arr.sort(function (a, b) {
//   return Math.random() - 0.5;
// });
// console.log(arr);

// var arr = [
//   {
//     son: 'Jenny',
//     age: 18
//   },
//   {
//     son: 'Jone',
//     age: 10
//   },
//   {
//     son: 'Ben',
//     age: 16
//   },
//   {
//     son: 'Lucy',
//     age: 11
//   },
//   {
//     son: 'Crytal',
//     age: 3
//   }
// ];
// arr.sort(function (a, b) {
//   return a.age - b.age;
// });
// console.log(arr);

var arr = ['12345', '1', '1234', '12', '1234567'];
arr.sort(function (a, b) {
  return a.length - b.length;
});
console.log(arr);