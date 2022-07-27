// function Car (color, brand) {
//   this.color = color;
//   this.brand = brand;
//   this.drive = function () {
//     console.log('I am running.');
//   }
// }

// var car = new Car('red', 'Mazda');
// console.log(car.color);
// console.log(car.brand);
// car.drive();

// function Car () {
//   this.color = 'red';

//   return {};
// }
// var car = new Car();
// console.log(car.red); // undefined

// var x = 1,
//     y = z = 0;
// function add (n) {
//   return n = n + 1;
// }      
// y = add(x);
// console.log(y);

// function add (n) {
//   return n = n + 3;
// }
// z = add(x);
// console.log(x, y, z); // 1 4 4