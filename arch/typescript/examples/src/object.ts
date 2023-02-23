// const pt: {
//   x: number
//   y: number
// } = { x: 100, y: 100 }

// pt.z = 1998 // Error

// -------------------------------

// function printName(obj: { first: string; last?: string }) {}

// printName({ first: 'Bob' })
// printName({ first: 'Alice', last: 'Alisson' })

// -------------------------------

// const o: {
//   a: string
//   b?: {
//     c: string
//   }
// } = { a: '1' }

// // console.log(o.b.c) // Cannot read properties of undefined (reading 'c')
// console.log(o.b?.c) // undefined

// o.b.c = 'Hello' // Error

// -------------------------------

// function printId(id: number | string) {
//   console.log(id.toUpperCase())
//   // 类型“string | number”上不存在属性“toUpperCase”。类型“number”上不存在属性“toUpperCase”。
// }

// -------------------------------

// function printId(id: number | string) {
//   if (typeof id === 'number') {
//     console.log(id)
//     return
//   }
//   console.log(id.toUpperCase())
// }

// -------------------------------

// type Point = {
//   x: number
//   y: number
// }

// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x)
//   console.log("The coordinate's y value is " + pt.y)
// }

// printCoord({ x: 100, y: 100 })

// -------------------------------

// type ID = number | string

// let x: ID = 100
// typeof x // number

// let id: ID = 'abc'
// id = 456

// -------------------------------
