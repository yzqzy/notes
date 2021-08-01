// var year = window.prompt('请输入年份');
// console.log(isLeapYear(year));
// function isLeapYear (year) {
//   return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0 ? '闰年' 
//                                                                  : '不是闰年';
// }

// function test () {
//   console.log(arguments);
//   console.log(Array.prototype.slice.call(arguments));
// }
// test(1, 2, 3, 4, 5, 6);


// var obj = {
//   '0': 1,
//   '1': 2,
//   '2': 3,
//   'length': 3,
//   'push': Array.prototype.push,
//   'splice': Array.prototype.splice
// };
// obj.push(4);
// console.log(obj);

// Object.prototype.push = Array.prototype.push;
// Object.prototype.splice = Array.prototype.splice;
// var obj = {
//   '0': 1,
//   '1': 2,
//   '2': 3,
//   'length': 3
// };
// obj.push(4);
// console.log(obj);

// var arr = [1, 2, 3, 4, 5];
// Array.prototype.myPush = function (elem) {
//   this[this.length] = elem;
// }
// arr.myPush(6);
// arr.myPush(7);
// console.log(arr);


// var obj = {
//   '2': 3,
//   '3': 4,
//   'length': 2,
//   'splice': Array.prototype.splice,
//   'push': Array.prototype.push
// }
// obj.push(1);
// obj.push(2);
// console.log(obj); // [empty × 2, 1, 2, splice: ƒ, push: ƒ]


// var person = {
//   '0': '张小一',
//   '1': '张小二',
//   '2': '张小三',
//   'name': '张三',
//   'age': 32,
//   'weight': 140,
//   'height': 180,
//   'length': 3
// }
// Object.prototype.push = Array.prototype.push;
// Object.prototype.splice = Array.prototype.splice;
// // console.log(person[1]); // 张小二
// // console.log(person.weight); // 140
// for (var key in person) {
//   if (person.hasOwnProperty(key)) {
//     console.log(person[key]);    
//   }
// }
