// var url =  'http://www.baidu.com?name=杨志强';
// var newUrl = encodeURI(url);
// console.log(newUrl); // http://www.baidu.com?name=%E6%9D%A8%E5%BF%97%E5%BC%BA

// var newNewUrl = decodeURI(newUrl);
// console.log(newNewUrl); // http://www.baidu.com?name=杨志强


// var str = decodeURL('@ssfsf'); // 


// eval('console.log(1)'); // 1
// var a = eval('1');
// console.log(a); // 1

// var jsonStr = '[{"a": 1, "b": 2}]';
// console.log(jsonStr);
// console.log(JSON.parse(jsonStr));
// console.log(eval(jsonStr));
// console.log(eval('(' + jsonStr + ')'));

// var a = 1;
// var obj = {
//   a: 2
// }
// function test () {
//   var a = 3;
//   with (test) {
//     console.log(a); // 3
//   }
//   with (obj) {
//     console.log(a); // 2
//   }
//   with (window) {
//     console.log(a); // 1
//   }
// }
// test();

// 'use strict'
// eval('var a = 1; console.log(a)');
// console.log(a);