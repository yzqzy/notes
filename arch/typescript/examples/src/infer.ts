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

// type Flattened<T> = T extends Array<infer V> ? V : T
// type D = Flattened<Array<number>>

type Flattened<T> = T extends Array<infer V> ? Flattened<V> : T
type D = Flattened<Array<Array<number>>> // number

// function flattern<T extends Array<any>>(arr: T): Array<Flattened<T>> {
//   return new Array<Flattened<T>>().concat(...arr.map(x => (Array.isArray(x) ? flattern(x) : x)))
// }

type Atom = string | boolean | number | bigint

// type Nested<T> = (T | (T | T[])[])[]
// function flattern<T extends Atom>(arr: Nested<Atom>): Atom[] {
//   return new Array<Atom>().concat(...arr.map(x => (Array.isArray(x) ? flattern(x) : x)))
// }
type Nested = Array<Atom | Nested>
const target: Nested = [1, 2, 3, [3, 4, [5]]]

// -------------------

// type Unwrapped<T> = T extends (infer U)[] ? U : T
// type T0 = Unwrapped<Array<string>> // string

// type Unwrapped<T> = T extends Promise<infer U> ? U : T
// type T0 = Unwrapped<Promise<string>> // string

type Unwrapped<T> = T extends Array<infer U> ? (U extends Promise<infer R> ? R[] : U) : T
// type Unwrapped<T> = T extends Array<Promise<infer U>> ? U : T
type T0 = Unwrapped<Promise<string>[]> // string
