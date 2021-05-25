// 斐波那契数列
// 1 1 2 3 5 8 13 21
// function getNumber () {
//   var n = window.prompt('请输入第几位');
//   var n1 = 1,
//     n2 = 1,
//     n3;

//   if (n <= 0) {
//     alert('输入的值不是Number.');
//     return;
//   }

//   if (n == 1 || n == 2) {
//     n3 = n1 + n2;
//     console.log(n3);
//     return;
//   }

//   for (var i = 2; i < n; i++) {
//     n3 = n1 + n2;
//     n1 = n2;
//     n2 = n3;
//   }

//   console.log(n3);
// }

// getNumber();

// 一个函数被调用时，累加实参值
function sum () {
  var args = arguments,
      len = args.length,
      sum = 0;

  for (var i = 0; i < len; i++) {
    sum += arguments[i];
  }

  console.log(sum);
}

sum(1, 2, 3, 4, 5, 6);