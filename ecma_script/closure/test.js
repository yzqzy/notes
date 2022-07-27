// function compute (type, a, b) {
//   compute.plus = function (a, b) {
//     return a + b;
//   }
  
//   compute.minus = function (a, b) {
//     return a - b;
//   }
  
//   compute.mul  = function (a, b) {
//     return a * b;
//   }
  
//   compute.div  = function (a, b) {
//     return a / b;
//   }

//   return compute[type](a, b);
// }

// console.log(compute('mul', 100, 200));


// const Compute = (function () {
//   const a = 100;

//   return class Compute {
//     add (b) {
//       return a + b;
//     }
  
//     minus (b) {
//       return a - b;
//     }
//   }
// })();

// const compute = new Compute();

// console.log(compute.add(10));


// function test () {
//   let a = 1;

//   function b () {
//     return ++a;
//   }

//   return b;
// }

// const b = test();

// console.log(b());
// console.log(b());
// console.log(b());



// function compute () {
//   const base = 1000;

//   return {
//     plus: function (a, b) {
//       return base +  a + b;
//     },
//     minus: function (a, b) {
//       return base -  a - b;
//     },
//     mul: function (a, b) {
//       return base *  a * b;
//     },
//     div: function (a, b) {
//       return base /  a / b;
//     }
//   }
// }

// const comp = compute();

// console.log(comp.plus(1, 2));



// function test (count, callback) {
//   const newCount = count + 1;

//   const callbackCount = count + 100;

//   callback && callback(callbackCount);

//   return newCount;
// }


// const count = test(123, function (newCount) {
//   console.log(newCount);
// });

// console.log(count);



// function Compute (callback) {
//   let ans = 0;

//   return function (a, b, type) {
//     switch (type) {
//       case '+':
//         ans = a + b;
//         break;
//       case '-':
//         ans = a - b;
//         break;
//       default:
//         break;
//     }


//     callback && callback({ a, b, type, ans });
//   }
// }

// const compute = Compute(({ a, b, type, ans }) => {
//   console.log(`
//     ${ a } ${ type } ${ b } = ${ ans }
//    `);
// });

// compute(2, 1, '+');


// function compute (validtor) {
//   return function (a, b, type) {
//     const { isError, errorMsg } = validtor(a, b);

//     if (isError) {
//       throw new Error(errorMsg);
//     }

//     switch (type) {
//       case '+':
//         return a + b;
//         break;
//       case '-':
//         return a - b;
//         break;
//       default:
//         break;
//     }
//   }
// }

// const comp = compute(validtor);

// console.log(comp(1, 31, '+'));


// function validtor (a, b) {
//   if (a > 50 || b < 30) {
//     return {
//       isError: true,
//       errorMsg: 'a 必须小于等于 50，并且 b 大于等于 30'
//     }
//   }

//   return {
//     isError: false,
//     errorMsg: 'ok'
//   }
// }


