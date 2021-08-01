// window.onload = function () {
//   init();
// }

// function init () {
//   console.log(initFb(10));
//   console.log(initDiv(100));
// }

// var initFb = (function () {
//   function fb (n) {
//     if (n <= 0) {
//       return 0;
//     }

//     if (n <= 2) {
//       return 1;
//     }

//     return fb(n - 1) + fb(n - 2);
//   }

//   return fb;
// })();

// var initDiv = (function () {
//   function div (n) {
//     var arr = [];

//     for (var i = 0; i <= n; i++) {
//       if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
//         arr.push(i);
//       }
//     }

//     return arr;
//   }

//   return div;
// })();


// ;(function () {
//   var Test = function () {

//   }

//   Test.prototype = {

//   }

//   window.Test = Test;
// })();


// a > 0 ? console.log('大于0')
//       : console.log('小于等于0');

// var str = a > 0  ? console.log('大于0')
//                  : console.log('小于等于0');
// console.log(str);


// var str = a > 0 ? (
//                     a > 3 ? '大于3' 
//                           : '小于等于3'
//                   )
//                 : '小于等于0';


// var str = 89 > 9 ? (
//                       '89' > '9' ? '通过了' 
//                                  : '内层未通过'                   
//                    )
//                  : '外层未通过';
// console.log(str); // 内层未通过


// var person = {
//   name: '张三',
//   age: 18,
//   sex: 'male',
//   height: 180,
//   weight: 140
// }

// var person2 = person;
// person2.name = '李四';

// console.log(person, person2);


var person = {
  name: '张三',
  age: 18,
  sex: 'male',
  height: 180,
  weight: 140,
  son: {
    first: {
      name: 'Jenney'
    },
    second: {
      name: 'Lucy'
    },
    third: {
      name: 'Jone'
    }
  },
  car: ['Benz', 'Mazda']
}

// 浅拷贝
// var person2 = clone(person);
var person2 = deepClone(person);

person2.name = '李四';
person2.son.forth = {
  name: 'yueluo'
};
person2.car.push('BYD');
console.log(person, person2);

// function clone (origin, target) {
//   var tar = target || {};
//   for (var key in origin) {
//     if (origin.hasOwnProperty(key)) {
//       tar[key] = origin[key];
//     }
//   }
//   return tar;
// }

function deepClone (origin, target) {
  var tar = target || {},
      toStr = Object.prototype.toString,
      arrType = '[object Array]';
      
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof(origin[key]) === 'object' && origin[key] != null) {
        if (toStr.call(origin[key]) === arrType) {
          tar[key] = [];
        } else {
          tar[key] = {};
        }
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
}
