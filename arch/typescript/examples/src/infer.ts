type A1 = string | number // union
type B1 = string & number // never

type Point = { x: number; y: number }
type StateDesc = { state: string }

type X1 = Point | StateDesc
const ins01: X1 = { x: 1, y: 2 }
const ins02: X1 = { state: 'hello', y: 2 }

type X2 = Point & StateDesc
const ins03: X2 = { x: 1, y: 2, state: 'hello' }
// const ins04: X2 = { state: 'hello', y: 2 }
// 不能将类型“{ state: string; y: number; }”分配给类型“X2”。
// 类型 "{ state: string; y: number; }" 中缺少属性 "x"，但类型 "Point" 中需要该属性。

interface A2 {
  foo(): void
}
interface A2 {
  bar(): void
}

// ----------------------------

// function flattern(arr) {}

// function flattern(arr: Array<any>): Array<any> {}

// type Flattened<T> = T extends V[] ? V : T
// // 找不到名称“V”。

type Flattened<T> = T extends Array<infer V> ? V : T

type D = Flattened<Array<number>>
