const obj = { c: 1, d: 2 };

let a = Symbol('a'),
    b = Symbol('b'),
    _a = Symbol('_a'),
    _b = Symbol('_b');

obj[a] = 'hello';
obj[b] = 'world';

Object.defineProperties(obj, {
  e: {
    value: 5,
    enumerable: true
  },
  f: {
    value: 6,
    enumerable: false
  },
  [_a]: {
    value: -1,
    enumerable: true
  },
  [_b]: {
    value: -2,
    enumerable: false
  }
});

let h = Symbol('h'),
    i = Symbol('i'),
    j = Symbol('j');

const obj1 = {
  g: 7,
  [h]: 8
}

Object.defineProperties(obj1, {
  [i]: {
    value: 9,
    enumerable: true
  },
  [j]: {
    value: 10
  },
  k: {
    value: 11
  }
});

Object.setPrototypeOf(obj, obj1);

for (let i in obj) {
  console.log(i);
}
// c d e g 
// for in 可以遍历自身和原型上的可枚举属性（不包含Symbol类型的值）

console.log(Object.keys(obj)); 
// ["c", "d", "e"]
// Object.keys() 可以遍历自身的可枚举属性（不包含Symbol类型的值）

console.log(Object.getOwnPropertySymbols(obj)); 
// [ Symbol(a), Symbol(b)m Symbol(_a), Symbol(_b) ]
// Object.getOwnPropertySymbols() 可以遍历自身Symbol类型的值（可枚举、不可枚举都可以遍历）

var obj3 = Object.assign({}, obj);
console.log(obj3); 
// Object.assign() 拷贝自身可枚举的属性（包含Symbol类型的值、不包含原型上的属性）

console.log(JSON.parse(JSON.stringify(obj)));
// JSON.stringify() 可以拷贝自身可枚举的属性（不包含原型上的属性，不包含Symbol类型的属性）