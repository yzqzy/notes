// function Computed () {
//   var args = arguments,
//       res;

//   this.plus = function () {
//     res = 0;
//     loop('add', res);
//   }
  
//   this.times = function () {
//     res = 1;
//     loop('mul', res);
//   }

//   function loop (method, res) {
//     for (var i = 0; i < args.length; i++) {
//       var item = args[i];

//       switch (method) {
//         case 'add':
//           res += item;
//           break;
//         case 'mul':
//           res *= item;
//           break;
//       }
    
//     }

//     console.log(res);
//   }
// }

// var compute = new Computed(2, 4, 6);
// compute.plus();
// compute.times();


// function Phone (color, brand) {
//   this.color = color;
//   this.brand = brand;
//   this.screen = '18:9';
//   this.system = 'Android';
// }

// Phone.prototype.rom = '64g';
// Phone.prototype.ram = '6g';
// Phone.prototype.screen = '15:9';


// var phone1 = new Phone('red', '小米');
// var phone2 = new Phone('black', '华为');

// console.log(phone1, phone2);
// console.log(phone1.rom, phone2.ram);
// console.log(phone1.screen, phone2.screen);


// function Phone (color, brand, system) {
//   this.color = color;
//   this.brand = brand;
//   this.system = system;
// }

// Phone.prototype = {
//   rom: '64G',
//   ram: '6G',
//   screen: '18:9',
//   call: function () { 
//     console.log('I am calling somebody.')
//   }
// }

// var phone = new Phone('black', 'iPhone', 'IOS');

// console.log(phone);
// console.log(phone.constructor);
// console.log(Phone.prototype);


// function Car () {
  
// }
// Car.prototype.name = 'Benz';

// var car = new Car();
// console.log(car);
// console.log(car.__proto__);


// Car.prototype.name = 'Mazda';
// function Car () { }
// var car = new Car();
// Car.prototype = {
//   name: 'Benz'
// };
// console.log(car.__proto__);
// console.log(car.name); // Mazda
// var car2 = new Car();
// console.log(car2.__proto__);
// console.log(car2.name); // Benz  

;(function () {})()
;(function () {})()