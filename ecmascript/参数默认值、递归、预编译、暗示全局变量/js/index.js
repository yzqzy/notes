// function test (a = 1, b) {
//   console.log(a);
//   console.log(b);
// }

// test(undefined, 2);

// function test (a, b) {
//   // var a = arguments[0] || 1,
//   //     b = arguments[1] || 2;

//   var a = typeof(arguments[0]) != 'undefined' ? arguments[0] : 1,
//       b = typeof(arguments[1]) != 'undefined' ? arguments[1] : 2;

  
//   console.log(a);
//   console.log(b);
// }
// test(1);


// n的阶乘 递归
// n! = n * (n-1) 规律
// 出口 
// function fact (n) {
//   if (n === 1) {
//     return 1;
//   }

//   return n * fact(n - 1);
// }
// console.log(fact(5));

// 斐波那契数列
// n3 = n2 + n1
// 出口：n <=2
// function fb (n) {
//   if (n <= 2) {
//     return 1;
//   }

//   return fb(n - 1) + fb(n - 2);
// }
// console.log(fb(6));

// 预编译


// function test (a, b) {
//   console.log(a); // 1
//   c = 0;
//   var c;
//   a = 5;
//   b = 6;
//   console.log(b); // 6
//   function b () {}
//   function d () {}
//   console.log(b); // 6
// }

// test(1);

// AO = {
//   a: undefined ->
//      1,
//   b: undefined -> 
//      function b () {},
//   c: undefined,
//   d: function d () {}
// }


// var a = 1;

// function a () {
//   console.log(2);
// }

// console.log(a); // 1

// console.log(a, b); // function a () {}  undefined
// function a () {}
// var b = function () {}

// function test () {
//   var a = b = 1;
//   console.log(b);
// }
// GO = {
//   test: function test () {},
//   b: undefined -> 1
// }
// AO = {
//   a: undefined -> 1
// }


// var b = 3;
// console.log(a); // function a () {}
// function a (a) {
//   console.log(a); // function a () {}
//   var a = 2;
//   console.log(a); // 2
//   function a () { }
//   var b = 5;
//   console.log(b); // 5
// }
// a(1);

// GO = {
//   b: undefined -> 
//      ,
//   a: undefined -> 
//      function a () {} -> 
// }

// AO = {
//   a: undefined ->
//      1 ->
//      function a () {} -> 
//      2,
//   b: 5
// }


// a = 1;
// function test () {
//   console.log(a); // undefined
//   a = 2;
//   console.log(a); // 2
//   var a = 3;
//   console.log(a); // 3 
// }
// test();
// var a;

// GO = {
//   a: undefined -> 
//      1,
//   test: undefined - >
//         function test ()
// }

// AO = {
//   a: undefined -> 
//      2 -> 
//      3,
// }

// function test () {
//   console.log(b); // undefined

//   if (a) {
//     var b = 2;
//   }

//   c = 3;
//   console.log(c); // 3
// }
// var a;
// test();
// a = 1;
// console.log(a); // 1

// GO = {
//   a: undefined -> 
//      1,
//   test: function test(),
//   c: undefined -> 
//      3
     
// }
// AO = {
//   b: undefined ->,
// }

// function test () {
//   return a;
//   a = 1;
//   function a () {}
//   var a = 2;
// }
// console.log(test()); // functiona () {}

// AO = {
//   a: undefined ->
//      function a () {},
// }

// function test () { 
//   a = 1;
//   function a () { }
//   var a = 2;
//   return a;
// }
// console.log(test());

// AO = {
//   a: undefined -> 
//      function a () {} ->
//      1 -> ,
//      2
// }

// a = 1;
// function test (e) { 
//   function e () { }
//   arguments[0] = 2;
//   console.log(e); // 2
//   if (a) {
//     var b = 3;
//   }
//   var c;
//   a = 4;
//   var a;
//   console.log(b); // undefined
//   f = 5;
//   console.log(c); // undefined 
//   console.log(a); // 4
// }
// var a;
// test(1);

// GO = {
//   a: undefined,
//   test: function () {},
//   f: 5
// }

// AO = {
//   b: undefined -> ,
//   c: undefined,
//   a: undefined -> 
//      4,
//   e: 1 -> 
//      function e () {} -> 
//      2 -> 
// }