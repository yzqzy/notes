class A {
  a: number = 1
}

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4, c: 5 } 
let n = { x, y, ...z }

// n = 1

// export = A