let str = '字符串';

console.log(str.indexOf('符')); // 1
console.log(str.indexOf('2')); // -1

console.log(~str.indexOf('符')); // -2
console.log(~str.indexOf('2')); // 0

console.log(!!~str.indexOf('符')); // true
console.log(!!~str.indexOf('其他')); // false

console.log(str.includes('符')); // true
console.log(str.includes('其他')); // false


function test (type) {
  let obj = {
    name: 'yangzhiqiang',
    age: 23
  }

  switch (type) {
    case 1:
      const { name } = obj;
      console.log(name);
      break;
      case 2:
      const { name: name1 } = obj;
      console.log(name1);
      break;
    default:
      break;
  }
}
console.log(test(1));
console.log(test(2));