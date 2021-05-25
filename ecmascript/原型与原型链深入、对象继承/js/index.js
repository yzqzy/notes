// 算出任意字节的长度
// var getBytes = function (str) {
//   var bytes = 0,
//       pos;

//   for (var i = 0; i < str.length; i++) {
//     pos = str.charCodeAt(i);

//     if (pos <= 225) {
//       bytes++;
//     } else {
//       bytes+=2;
//     }
//   }

//   return bytes;
// }

// function getBytes (str) {
//   var len = str.length,
//       bytes = len,
//       pos;
  
//   for (var i = 0; i < len; i++) {
//     pos = str.charCodeAt(i);

//     if (pos > 255) {
//       bytes++;
//     }
//   }

//   return bytes;
// }
// console.log(getBytes('你好，世界。'));
// console.log(getBytes('Hello World。'));

// function Car () {

// }
// var car = new Car();
// console.log(Car.prototype);
// console.log(car);


// Professor.prototype.tSkill = 'JAVA';
// function Professor () { }
// var professor = new Professor();

// Teacher.prototype = professor;
// function Teacher () {
//   this.mSkill = 'JS/JQ';
//   this.students = 500;
// }
// var teacher = new Teacher();

// Student.prototype = teacher;
// function Student () {
//   this.pSkill = 'HTML/CSS';
// }

// var student = new Student();
// student.students++;
// console.log(student, teacher);


// function Car () {
//   this.brand = 'Benz';
// }
// Car.prototype = {
//   brand: 'Mazda',
//   intro: function () {
//     console.log('我是' + this.brand + '车');
//   }
// }
// var car = new Car();
// car.intro(); // 我是Benz车
// Car.prototype.intro(); // 我是Mazda车

// var obj = {};
// console.log(obj);
// var obj2 = new Object(); // 一般公司不使用这种方法
// console.log(obj);

// function Obj () { }
// var obj = new Obj();
// console.log(obj);

// Object.create(对象 || null) 创建对象
// function Obj () {}
// Obj.prototype.num = 1;
// var obj = Object.create(Obj.prototype);
// var obj2 = new Obj();
// console.log(obj, obj2);

// var obj = Object.create(null);
// obj.num = 1;
// // obj.toString(); obj.toString is not a function
// console.log(obj);
// var obj1 = {
//   count: 2
// }
// obj.__proto__ = obj1;
// console.log(obj);
// console.log(obj.count);

// function Car (brand, color) {
//   this.brand = brand;
//   this.color = color;
// }
// var newCar = { };
// Car.call(newCar, 'Benz', 'red');
// console.log(newCar); // {brand: "Benz", color: "red"}
// Car.apply(newCar, ['Benz', 'black']); 
// console.log(newCar); // {brand: "Benz", color: "black"}

function Compute () {
  this.plus = function (a, b) {
    console.log(a + b);
  }

  this.minus = function (a, b) {
    console.log(a - b);
  }
}

function FullCompute () {
  Compute.apply(this, []);

  this.mul = function (a, b) {
    console.log(a * b);
  }

  this.div = function (a, b) {
    console.log(a / b);
  }
}

var compute = new FullCompute();

compute.plus(1, 2);
compute.minus(1, 2);
compute.mul(1, 2);
compute.div(1, 2);
