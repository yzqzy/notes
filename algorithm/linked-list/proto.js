// const obj = {};
// const func = () => {};
// const arr = [];

// const obj = {};
// Object.prototype.x = 'x';
// console.log(obj.x); // 'x'

/**
 * @description 判断 A 是否是 B 的实例
 * @param {object} A 
 * @param {object} B 
 * @returns {boolean}
 */
const instanceOf = (A, B) => {
  let p = A;

  while (p) {
    if (p === B.prototype) {
      return true;
    }

    p = p.__proto__;
  }

  return false;
}


var foo = {},
    F = function () {};

Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);
console.log(foo.b);

console.log(F.a);
console.log(F.b);