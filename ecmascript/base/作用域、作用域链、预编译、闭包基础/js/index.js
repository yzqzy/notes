// function a () {
//   function b () {
//     var b = 2;
//   }
//   var a = 1;
//   b();
// }
// var c = 3;
// a();


// function test () {
//   var n = 100;

//   function add () {
//     n++;
//     console.log(n);
//   }

//   function reduce () {
//     n--;
//     console.log(n);
//   }

//   return [add, reduce];
// }

// var arr = test();

// arr[0]();
// arr[1]();

// function test () {
//   var num = 100;

//   return function () {
//     num++;
//     console.log(num);
//   }
// }
// var plus = test();
// plus();
// plus();

// function breadMgr (num) {
//   var breadNum = arguments[0] || 10;

//   function supply () {
//     breadNum += 10;
//     console.log(breadNum);
//   }

//   function sale () {
//     breadNum--;
//     console.log(breadNum);
//   }

//   return {
//     supply,
//     sale
//   }
// }

// var bm = breadMgr(50);

// bm.supply();
// bm.supply();
// bm.sale();
// bm.sale();
// bm.sale();


// function sunShched () {
//   var sunShched = '';

//   var options = {
//     setSched: function (thing) {
//       sunShched = thing;
//     },

//     showSched: function () {
//       console.log("My schedule on sunday is " + sunShched)
//     }
//   };

//   return options;
// }

// var sun = sunShched();

// sun.setSched('studying');
// sun.showSched();