// var arr = ['d', 'e', 'f'];
// Array.prototype.myUnshift = function () {
//   var pos = 0;

//   for (var i = 0; i < arguments.length; i++) {
//     this.splice(pos, 0, arguments[i]);
//     pos++;
//   }

//   return this.length;
// }

// Array.prototype.myUnshift = function () {
//   var argArr = [].slice.call(arguments),
//       newArr = argArr.concat(this);
//   return newArr;
// }
// console.log(arr.myUnshift('a', 'b', 'c'));

// function getBytes (str) {
//   var bytes = str.length;
//   for (var i = 0; i < str.length; i++) {
//     if (str.charCodeAt(i) > 255) {
//       bytes++;
//     }
//   }
//   return bytes;
// }

// var arr = ['你我', 'oka', '你说好不好', '可以', 'what'];
// arr.sort(function (a, b) {
//   return getBytes(a) - getBytes(b);
// });
// console.log(arr);


// function myTypeof (val) {
//   if (val === null) {
//     return 'null';
//   }

//   var type = typeof(val),
//       toStr = Object.prototype.toString;

//   if (type === 'object') {
//     var res = {
//       '[object Array]': 'array',
//       '[object Object]': 'object number',
//       '[object Number]': 'object numer',
//       '[object String]': 'object string',
//       '[object Boolean]': 'object boolean',
//     }
//     return res[toStr.call(val)];
//   } else {
//     return type;
//   }
// }
// console.log(myTypeof(1));
// console.log(myTypeof('1'));
// console.log(myTypeof(true));
// console.log(myTypeof(null));
// console.log(myTypeof({}));
// console.log(myTypeof([]));
// console.log(myTypeof(new Number(1)));
// console.log(myTypeof(undefined));


// var arr = [0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 'a', 'a'];
// // Array.prototype.unique = function () {
// //   var temp = {},
// //       newArr = [];

// //   for (var i = 0; i < this.length; i++) {
// //     if(!temp.hasOwnProperty(this[i])) {
// //       temp[this[i]] = this[i];
// //       newArr.push(this[i]);
// //     }
// //   }

// //   return newArr;
// // }
// console.log(arr.unique());

// var str = '111222000aaabaacc';
// String.prototype.unique = function () {
//   var temp = {},
//       newString = '';

//   for (var i = 0; i < this.length; i++) {
//     if (!temp.hasOwnProperty(this[i])) {
//       temp[this[i]] = this[i];
//       newString += this[i];
//     }
//   }

//   return newString;
// }
// console.log(str.unique());


// var str = 'adsadwdwadsadarfwfawfjawfawdwcxgvdfm';
// function test (str) {
//   var temp = {};
//   for (var i = 0; i < str.length; i++) {
//     if (temp.hasOwnProperty(str[i])) {
//       temp[str[i]]++;
//     } else {
//       temp[str[i]] = 1;
//     }
//   }
//   for (var key in temp) {
//     if (temp[key] === 1) {
//       return key;
//     }
//   }
// }
// console.log(test(str));


// function Test (a, b, c) {
//   var d = 0;

//   this.a = a;
//   this.b = b;
//   this.c = c;

//   function e () {
//     d++;
//     console.log(d);
//   }

//   this.f = e;
// }
// var test1 = new Test();
// test1.f(); // 1
// test1.f(); // 2
// var test2 = new Test();
// test2.f(); // 1


// function test () {
//   console.log(typeof(arguments));
// }
// test(); // object


// function test (day) {
//   var weekday = [
//     'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat', 'Sun'
//   ];

//   weekday[day - 1] != undefined ? console.log(weekday[day - 1]) : console.log('I dont\'t konw');
// }
// test(3);
// test(8);

function test (day) {
  var weekday = [
    ,'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat', 'Sun'
  ];

  // weekday[day - 1] != undefined ? console.log(weekday[day - 1]) : console.log('I dont\'t konw');
  weekday[day] != undefined ? console.log(weekday[day]) : console.log('I dont\'t konw');
}
test(3);
test(8);