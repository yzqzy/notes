import a = require('./amd')

;(() => {
  const hello: string = 'hello world'
  
  document.querySelectorAll('.app')[0].innerHTML = hello
})();


// class A {}
// class B extends A {}

// const arr = [1, 2, 3]
// const arr2 = [4, ...arr]

// function add(x: number, y: number) {
//   return x + y
// }
// add.call(undefined, 1, 2)
// add.call(undefined, 1, '2') // 类型“string”的参数不能赋给类型“number”的参数。

// class A {
//   a: number = 1

//   getA () {
//     return function() {
//       console.log(this.a) // "this" 隐式具有类型 "any"，因为它没有类型注释。
//     }
//   }
// }
// const a = new A().getA()
// a()

// import { util } from './utils'
// console.log(util)
