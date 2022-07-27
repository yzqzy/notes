// 0开始做加法，什么时候总和是小于100的
// var sum = 0;
// for (var i = 0; i <= 100; i++) {
//   sum += i;

//   if (sum >= 100) {
//     console.log(sum, i);
//     break;
//   }
// }

// 100以内的数，跳过可以被7整除或带有个位数是7的数
// for (var i = 0; i <= 100; i++) {
//   if (i % 7 == 0 || i % 10 == 7) {
//     continue;
//   }

//   console.log(i);
// }

// 可以被4、5、6整除的数
// for (var i = 0; i <= 100; i++) {
//   if (i % 5 == 0 || i % 6 == 0 || i % 7 == 0) {
//     console.log(i);
//   }
// } 

// 打印0-99的数(小括号只能有一句，不能写比较。大括号，不能出现i++ i--)
// var i = 100;
// for (; i--; ) {
//   console.log(i);
// }

// while (false) {
//   console.log('while 循环执行');
// }

// do {
//   console.log('do while 循环执行');
// } while (false);

// 10的n次方
// var n = 5,
//     num = 1;
// for (var i = 0; i < n; i++) {
//   num *= 10;
// }
// console.log(num);

// n的阶乘
// var n = 5,
//     num = 1;
// for (var i = 1; i <= n; i++) {
//   num *= i;
// }
// console.log(num);

// 数字反转
// var num = 789;
// var a = num % 10,
//     b = (num - a) % 100 / 10,
//     c = (num - a - b * 10) / 100;
// console.log('' + a + b + c);

// 打印三个数中最大的数
// var a = 1,
//     b = 2,
//     c = 3;

// if (a > b) {
//   if (a > c) {
//     console.log(a);
//   } else {
//     console.log(c);
//   }
// } else {
//   if (b > c) {
//     console.log(b);
//   } else {
//     console.log(c);
//   }
// }

// 打印100以内质数
// 仅仅被1和自己整除的数（1不是质数）
var count = 0;
for (var i = 2; i < 100; i++) {
  for (var j = 1; j <= i; j++) { // j <= i 不能比本身大
    if (i % j == 0) {
      count++;
    }
  }

  if (count == 2) {
    console.log(i);
  }

  count = 0;
}


function a () { }
console.log(typeof a);