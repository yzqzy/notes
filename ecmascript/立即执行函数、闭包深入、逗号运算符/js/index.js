// (function () {
//   var a = 1,
//       b = 2;

//   console.log(a + b);
// })();

// (function (a, b) {
//   console.log(a + b);
// })(1, 2);

// var num = (function (a, b) {
//   return a + b;
// })(2, 4);
// console.log(num);


// var num = function () {
//   console.log('执行');
//   return 1 + 2;
// }();
// console.log(num);
// console.log(num);
// console.log(num);


// function test () {
//   var arr = [];

//   for (var i = 0; i < 10; i++) {
//     (function (j) {
//       arr[j] = function () {
//         document.write(j + ' ');
//       };
//     })(i);
//   }

//   return arr;
// }

// var arr = test();
// arr[0]();
// arr[1]();
// arr[2]();

// var oLi = document.querySelectorAll('li');
// for (var i = 0; i < oLi.length; i++) {
//   (function (j) {
//     oLi[j].onclick = function () {
//       console.log(j);
//     }
//   })(i);
// }

// var fn = (
//   function test1 () {
//     return 1;
//   },
//   function test2 () {
//     return 2;
//   }
// )();
// console.log(typeof(fn)); // number

// var a = 10;
// if (function b () {}) {
//   a += typeof(b); // 函数转为表达式，名称忽略
// }
// console.log(a); // 10undefined

// function test () {
//   var num = 0;

//   return function () {
//     num++;
//     console.log(num);
//   }
// }
// var add = test();
// add();
// add();
// add();
// add();
