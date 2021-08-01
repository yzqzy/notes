// function Car (brand, color, displacement) {
//   this.brand = brand;
//   this.color = color;
//   this.displacement = displacement;
//   this.info = function () {
//     return '排量为' + this.displacement + '的' + this.color + this.brand;
//   }
// }

// function Person (opt) {
//   Car.apply(this, [opt.brand, opt.color, opt.displacement])

//   this.name = opt.name;
//   this.age = opt.age;
//   this.say = function () {
//     console.log('年龄' + this.age + '岁，姓名' + this.name + '，买了一辆' + this.info() + '。');
//   }
// }

// var person = new Person({
//   brand: '奔驰',
//   color: '红色',
//   displacement: '3.0',
//   name: '张三',
//   age: 25
// });

// person.say();


// var sched = {
//   wakeup: function () {
//     console.log('Running');
//     return this;
//   },
//   morning: function () {
//     console.log('Going shopping');
//     return this;
//   },
//   noon: function () {
//     console.log('Having a rest');
//     return this;
//   },
//   afternoon: function () {
//     console.log('Studying');
//     return this;
//   },
//   evening: function () {
//     console.log('Walking');
//     return this;
//   },
//   night: function () {
//     console.log('Sleeping');
//     return this;
//   }
// }

// sched.wakeup()
//      .afternoon()
//      .night();

// var person = {
//   name: 'yang',
//   age: 22,
//   height: 172
// }

// for (var key in person) {
//   // person.key -> person['key'] -> undefined
//   // console.log(person.key); // undefined
//   console.log(person[key]);
// }


// let arr = [1, 2, 3, 4, 5];
// for (var key in arr) {
//  console.log(key);
// }


// var person = {
//   name: 'yang',
//   age: 22
// }

// console.log(person.hasOwnProperty(person.name)); // false
// console.log(person.hasOwnProperty('name')); // true

// function Car () {
//   this.brand = 'Benz';
//   this.color = 'red';
//   this.displacement = '3.0';
// }

// Car.prototype = {
//   lang: 5,
//   width: 2.5
// }

// var  car = new Car();

// for (var key in car) {
//   if (car.hasOwnProperty(key)) {
//     console.log(key);
//   }
// }


// var person = {
//   name: 'yang',
//   age: 22
// }

// console.log('name' in person); // true
// console.log('major' in person); // false


// function Car () {
//   this.brand = 'Benz';
//   this.color = 'red';
// }

// Car.prototype = {
//   displacement: '3.0'
// }

// var car = new Car();
// console.log('displacement' in car); // true


// function Car () {}
// var car = new Car();
// console.log(car instanceof Car); // true
// function Person () {}
// var person = new Person();
// console.log(car instanceof Person); // false

// console.log(car instanceof Object); // true
// console.log(person instanceof Object); // true
// console.log([] instanceof Array); // true
// console.log([] instanceof Object); // true
// console.log({} instanceof Object); // true


// var a = [] || {};
// console.log(a.constructor); // ƒ Array() { [native code] }
// console.log(a instanceof Array); // true
// console.log(Object.prototype.toString.call(a)); // [object Array]


// function Test () {
//   this.name = '123';
// }
// var test = new Test();


// function test (a, b, c) {
//   console.log(arguments.callee); // 返回正在执行的函数对象
//   console.log(arguments.callee.length); // 返回正在执行的函数对象形参的长度 3
//   console.log(test.length); // 返回函数的形参的长度 3
//   console.log(arguments.length); // 返回执行函数的实参的长度 0
// }
// test();
// test(1, 2, 3);


// function sum (n) {
//   if (n <= 1) {
//     return 1;
//   }
//   return n + sum(n - 1);
// }
// console.log(sum(100));


// var sum = (function (n) {
//   if (n <= 1) {
//     return 1;
//   }

//   return n + arguments.callee(n - 1);
// });
// console.log(sum(100));


// function test1 () {
//   test2();
// }
// function test2 () {
//   console.log(test2.caller);
// }
// test1();

// function foo () {
//   bar.apply(null, arguments);
// }
// function bar () {
//   console.log(arguments); // 1 2 3 4 5
// }

// foo(1, 2, 3, 4, 5);

// var a = '1';
// function test () {
//   var a = '2';
//   this.a = '3';
//   console.log(a);
// }
// test(); // 2
// new test(); // 2 
// console.log(a); // 3