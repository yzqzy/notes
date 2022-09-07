const obj: Record<string, any> = {}

obj.name = 'heora'
obj.age = 24

interface Res {
  code: 10000 | 10001 | 50000
  status: 'success' | 'failure'
  data: any
}

enum Char {
  a,
  b = Char.a,
  c = 1 + 3,

  d = Math.random(),
  e = '123'.length
}

enum Test {
  A = 'a',
  B = 'b',
  c = 'C'
}

function getKey(value: string) {
  let key: keyof typeof Test

  for (key in Test) {
    if (value === Test[key]) return key
  }

  return null
}

function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}

const symbolFoo: symbol = Symbol('heora')
const symbolBar: symbol = symbolFoo

// const uniqueSymbolFoo: unique symbol = Symbol('heora')
// // 类型不兼容
// const uniqueSymbolBar: unique symbol = uniqueSymbolFoo

declare const uniqueSymbolFoo: unique symbol
const uniqueSymbolBaz: typeof uniqueSymbolFoo = uniqueSymbolFoo

interface Res {
  code: 10000 | 10001 | 50000
  status: 'success' | 'failure'
  data: any
}

enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo // 0
const fooKey = Items[0] // "Foo"

let identifier = 'heora' // let identifier: string
const identifier2 = 'heora' // const identifier2: "heora"

const info = {
  name: 'heora',
  age: 24,
  profile: {
    job: 'fe'
  }
}
// const info: {
//   name: string;
//   age: number;
//   profile: {
//       job: string;
//   };
// }

// interface Tmp {
//   user:
//     | {
//         vip: true
//         expires: string
//       }
//     | {
//         vip: false
//         promotion: string
//       }
// }

// declare var tmp: Tmp

// if (tmp.user.vip) {
//   console.log(tmp.user.expires)
// }

// const foo: (name: string) => number = name => {
//   return name.length
// }

// type FuncFoo = (name: string) => number

// const foo: FuncFoo = name => {
//   return name.length
// }

// interface FuncFooStruct {
//   (name: string): number
// }

// function foo(): void {}

// 调用了 return 语句，但没有返回值
// function bar(): void {
//   return
// }

function bar(): undefined {
  return
}

// function func(foo: number, bar: true): string
// function func(foo: number, bar?: false): number
// function func(foo: number, bar?: boolean): string | number {
//   if (bar) {
//     return String(foo)
//   } else {
//     return foo * 24
//   }
// }

// const res1 = func(24) // number
// const res2 = func(24, true) // string
// const res3 = func(24, false) // number

async function asyncFunc(): Promise<void> {}

function* genFunc(): Iterable<void> {}

async function* asyncGenFunc(): AsyncIterable<void> {}

// class Foo {
//   prop: string

//   constructor(inputProp: string) {
//     this.prop = inputProp
//   }

//   print(addon: string): void {
//     console.log(`${this.prop} and ${addon}`)
//   }

//   get propA(): string {
//     return `${this.prop}+A`
//   }

//   set propA(value: string) {
//     this.prop = `${value}+A`
//   }
// }

// const Foo = class {
//   constructor(public prop: string) {
//     this.prop = prop
//   }

//   print(addon: string): void {
//     console.log(`${this.prop} and ${addon}`)
//   }
// }

// var Foo = /** @class */ (function () {
//   function Foo() {}
//   Foo.staticHandler = function () {}
//   Foo.prototype.instanceHandler = function () {}
//   return Foo
// })()

// class Base {}

// class Derived extends Base {}

// abstract class AbsFoo {
//   abstract absProp: string
//   abstract get absGetter(): string
//   abstract absMethod(name: string): string
// }

// class Foo implements AbsFoo {
//   absProp: string = 'heora'

//   get absGetter() {
//     return 'heora'
//   }

//   absMethod(name: string) {
//     return name
//   }
// }

// interface FooStruct {
//   absProp: string
//   get absGetter(): string
//   absMethod(input: string): string
// }

// class Foo implements FooStruct {
//   absProp: string = 'heora'

//   get absGetter() {
//     return 'heora'
//   }

//   absMethod(name: string) {
//     return name
//   }
// }

// class Foo {}

// interface FooStruct {
//   new (): Foo
// }

// declare const NewableFoo: FooStruct

// const foo = new NewableFoo()

// class Foo {
//   private constructor() {}
// }

class Utils {
  public static identifier = 'heora'

  private constructor() {}

  public static makeUHappy() {}
}

// enum LoginType {
//   WeChat,
//   TaoBao,
//   TikTok
//   // ...
// }

// class Login {
//   public static handler(type: LoginType) {
//     if (type === LoginType.WeChat) {
//     } else if (type === LoginType.TikTok) {
//     } else if (type === LoginType.TaoBao) {
//     } else {
//       throw new Error('Invalid Login Type!')
//     }
//   }
// }

enum LoginType {
  WeChat,
  TaoBao,
  TikTok
  // ...
}

abstract class LoginHandler {
  abstract handler(): void
}

class WeChatLoginHandler implements LoginHandler {
  handler() {}
}

class TaoBaoLoginHandler implements LoginHandler {
  handler() {}
}

class TikTokLoginHandler implements LoginHandler {
  handler() {}
}

class Login {
  public static handlerMap: Record<LoginType, LoginHandler> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.TikTok]: new TikTokLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler()
  }
  public static handler(type: LoginType) {
    Login.handlerMap[type].handler()
  }
}

type log = (message?: any, ...optionalParams: any[]) => void

let unknownVar: unknown
;(unknownVar as { foo: () => {} }).foo()

// const str: string = 'heora'

// ;(str as unknown as { handler: () => {} }).handler()
// ;(<{ handler: () => {} }>(<unknown>str)).handler()

// declare const foo: {
//   func?: () => {
//     prop?: number | null
//   }
// }

// foo.func!().prop!.toFixed()
// foo.func?.().prop?.toFixed()

// const element = document.querySelector('#id')!

// const target = [1, 2, 3, 24].find(item => item === 24)!

// const str: string = 'heora'

// ;(str as string | { handler: () => {} } as { handler: () => {} }).handler()

// type A = string

// type StatusCode = 200 | 301 | 400 | 500 | 502
// type PossibleDataTypes = string | number | (() => unknown)

// type Handler = (e: Event) => void

// const clickHandler: Handler = e => {}
// const moveHandler: Handler = e => {}
// const dragHandler: Handler = e => {}

// type ObjType = {
//   name: string
//   age: number
// }

// type MaybeArray<T> = T | T[]

// function ensureArray<T>(input: MaybeArray<T>): T[] {
//   return Array.isArray(input) ? input : [input]
// }

// interface NameStruct {
//   name: string
// }

// interface AgeStruct {
//   age: number
// }

// type ProfileStruct = NameStruct & AgeStruct

// const profile: ProfileStruct = {
//   name: 'heora',
//   age: 24
// }

// type UnionIntersection1 = (1 | 2 | 3) & (1 | 2) // 1 | 2
// type UnionIntersection2 = (string | number | symbol) & string // string

// interface AllStringTypes {
//   [key: string]: string
// }

// type AllStringTypes = {
//   [key: string]: string
// // }

// interface AnyTypeHere {
//   [key: string]: any
// }

// const foo: AnyTypeHere['heora'] = 'any value'

// interface Foo {
//   heora: 1
//   24: 2
// }

// type FooKeys = keyof Foo // 'heora' | 24

// interface Foo {
//   propA: number
//   propB: boolean
// }

// type PropAType = Foo['propA']
// type PropBType = Foo['propB']

// interface Foo {
//   propA: number
//   propB: boolean
//   propC: string
// }

// type PropTypeUnion = Foo[keyof Foo] //  string | number | boolean

// type Stringify<T> = {
//   [K in keyof T]: string
// }

// interface Foo {
//   prop1: string
//   prop2: number
//   prop3: boolean
//   prop4: () => void
// }

// type StringifiedFoo = Stringify<Foo>
// // type StringifiedFoo = {
// //   prop1: string;
// //   prop2: string;
// //   prop3: string;
// //   prop4: string;
// // }

// interface StringifiedFoo {
//   prop1: string
//   prop2: string
//   prop3: string
//   prop4: string
// }

// type Clone<T> = {
//   [K in keyof T]: T[K]
// }

// type ClonedFoo = Clone<Foo>

// const author = 'heora'

// const authorObj = { name: 'heora' }

// const nullVar = null
// const undefinedVar = undefined

// const func = (input: string) => {
//   return input.length > 10
// }

// type Str = typeof author // "heora"
// type Obj = typeof authorObj // { name: string; }
// type Null = typeof nullVar // null
// type Undefined = typeof undefined // undefined
// type Func = typeof func // (input: string) => boolean

// const func = (input: string) => {
//   return input.length > 10
// }
// // const func: (input: string) => boolean
// const func2: typeof func = (name: string) => {
//   return name === 'heora'
// }

// function foo(input: string | number) {
//   if (typeof input === 'string') {
//   }
//   if (typeof input === 'number') {
//   }
//   // ...
// }

// function isString(input: unknown): input is number {
//   return typeof input === 'string'
// }

// function foo(input: string | number) {
//   if (isString(input)) {
//     // 类型“number”上不存在属性“replace”
//     input.replace('heora', 'heora')
//   }
//   if (typeof input === 'number') {
//   }
//   // ...
// }

// interface Foo {
//   foo: string
//   fooOnly: boolean
//   shared: number
// }

// interface Bar {
//   bar: string
//   barOnly: boolean
//   shared: number
// }

// function handle(input: Foo | Bar) {
//   if ('foo' in input) {
//     input.fooOnly
//   } else {
//     input.barOnly
//   }
// }

// class FooBase {}

// class BarBase {}

// class Foo extends FooBase {
//   fooOnly() {}
// }
// class Bar extends BarBase {
//   barOnly() {}
// }

// function handle(input: Foo | Bar) {
//   if (input instanceof FooBase) {
//     input.fooOnly()
//   } else {
//     input.barOnly()
//   }
// }

// let usernmae: any = 'heora'

// function assertIsNumber(val: any): asserts val is number {
//   if (typeof val !== 'number') {
//     throw new Error('Not a number!')
//   }
// }

// assertIsNumber(usernmae)

// // number 类型！
// usernmae.toFixed()

// type Stringify<T> = {
//   [K in keyof T]: string
// }

// type Clone<T> = {
//   [K in keyof T]: T[K]
// }

// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }

// type IsEqual<T> = T extends true ? 1 : 2

// type A = IsEqual<true> // 1
// type B = IsEqual<false> // 2
// type C = IsEqual<'heora'> // 2

// type Factory<T = boolean> = T | number | string

// type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
//   ? 'success'
//   : 'failure'

// type Res1 = ResStatus<10000> // "success"
// type Res2 = ResStatus<20000> // "failure"

// type Res3 = ResStatus<'10000'> // 类型“string”不满足约束“number”。

// type ResStatus<ResCode extends number = 10000> = ResCode extends
//   | 10000
//   | 10001
//   | 10002
//   ? 'success'
//   : 'failure'

// type Res4 = ResStatus // "success"

// type Conditional<Type, Condition, TruthyResult, FalsyResult> =
//   Type extends Condition ? TruthyResult : FalsyResult

// //  "passed!"
// type Result1 = Conditional<'heora', string, 'passed!', 'rejected!'>

// // "rejected!"
// type Result2 = Conditional<'heora', boolean, 'passed!', 'rejected!'>

// interface IRes<TData = unknown> {
//   code: number
//   error?: string
//   data: TData
// }

// interface UserProfileRes {
//   name: string
//   homepage: string
//   avatar: string
// }

// function fetchUserProfile(): Promise<IRes<UserProfileRes>> {
//   return new Promise(resolve =>
//     resolve({
//       code: 200,
//       data: { name: 'heora', homepage: '', avatar: '' }
//     })
//   )
// }

// type StatusSucceed = boolean
// function handleOperation(): Promise<IRes<StatusSucceed>> {
//   return new Promise(resolve =>
//     resolve({
//       code: 200,
//       data: false
//     })
//   )
// }

// interface IPaginationRes<TItem = unknown> {
//   data: TItem[]
//   page: number
//   totalCount: number
//   hasNextPage: boolean
// }

// function fetchUserProfileList(): Promise<
//   IRes<IPaginationRes<IUserProfileRes>>
// > {}

// function handle<T>(input: T): T {
//   return input
// }

// const author = 'heora'
// const authorAge = 24

// handle(author) // 填充为字面量类型 "heora"
// handle(authorAge) // 填充为基础类型 number

// function swap<T, U>([start, end]: [T, U]): [U, T] {
//   return [end, start]
// }

// const swapped1 = swap(['heora', 24])
// const swapped2 = swap([null, 24])
// const swapped3 = swap([{ name: 'heora' }, {}])

// function handle<T>(payload: T): Promise<[T]> {
//   return new Promise<[T]>((resolve, reject) => {
//     resolve([payload])
//   })
// }

// const handle = <T>(input: T): T => input

// const handle = <T extends unknown>(input: T): T => input

// class Queue<TElement> {
//   private _list: TElement[]

//   constructor(initial: TElement[]) {
//     this._list = initial
//   }

//   enqueue<TType extends TElement>(ele: TType): TElement[] {
//     this._list.push(ele)
//     return this._list
//   }

//   enqueueWithUnknownType<TType>(element: TType): (TElement | TType)[] {
//     return [...this._list, element]
//   }

//   dequeue(): TElement[] {
//     this._list.shift()
//     return this._list
//   }
// }

// class Cat {
//   eat() {}
// }

// class Dog {
//   eat() {}
// }

// function feedCat(cat: Cat) {}

// feedCat(new Dog())

// class Cat {
//   eat(): boolean {
//     return true
//   }
// }

// class Dog {
//   eat(): number {
//     return 24
//   }
// }

// function feedCat(cat: Cat) {}

// // 报错！
// feedCat(new Dog())

// type USD = number
// type CNY = number

// const CNYCount: CNY = 200
// const USDCount: USD = 200

// function addCNY(source: CNY, input: CNY) {
//   return source + input
// }

// addCNY(CNYCount, USDCount)

// class Cat {}
// // 实现一只短毛猫！
// class ShorthairCat extends Cat {}

// declare class TagProtector<T extends string> {
//   protected __tag__: T
// }

// type Nominal<T, U extends string> = T & TagProtector<U>

// type CNY = Nominal<number, 'CNY'>

// type USD = Nominal<number, 'USD'>

// const CNYCount = 100 as CNY

// const USDCount = 100 as USD

// function addCNY(source: CNY, input: CNY) {
//   return (source + input) as CNY
// }

// addCNY(CNYCount, CNYCount)

// // 报错了！
// addCNY(CNYCount, USDCount)

// class CNY {
//   private __tag!: void
//   constructor(public value: number) {}
// }
// class USD {
//   private __tag!: void
//   constructor(public value: number) {}
// }

// const CNYCount = new CNY(100)
// const USDCount = new USD(100)

// function addCNY(source: CNY, input: CNY) {
//   return source.value + input.value
// }

// addCNY(CNYCount, CNYCount)
// // 报错了！
// addCNY(CNYCount, USDCount)

// declare const tag: unique symbol

// declare type Tagged<Token> = {
//   readonly [tag]: Token
// }

// type Opaque<Type, Token = unknown> = Type & Tagged<Token>

// type Result = 'heora' extends string ? 1 : 2

// declare let source: string

// declare let anyType: any
// declare let neverType: never

// anyType = source

// // 不能将类型“string”分配给类型“never”。
// neverType = source

// type Result1 = 'heora' extends string ? 1 : 2 // 1
// type Result2 = 1 extends number ? 1 : 2 // 1
// type Result3 = true extends boolean ? 1 : 2 // 1
// type Result4 = { name: string } extends object ? 1 : 2 // 1
// type Result5 = { name: 'heora' } extends object ? 1 : 2 // 1
// type Result6 = [] extends object ? 1 : 2 // 1

// type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2 // 1
// type Result8 = 'he' extends 'heo' | 'heora' | 'he' ? 1 : 2 // 1
// type Result9 = true extends true | false ? 1 : 2 // 1
// type Result10 = string extends string | false | number ? 1 : 2 // 1

// type Result11 = 'heora' | 'yueluo' extends string ? 1 : 2 // 1
// type Result12 = {} | (() => void) | [] extends object ? 1 : 2 // 1

// type Result14 = string extends String ? 1 : 2 // 1
// type Result15 = String extends {} ? 1 : 2 // 1
// type Result16 = {} extends object ? 1 : 2 // 1
// type Result18 = object extends Object ? 1 : 2 // 1

// type Temp = string extends object ? 1 : 2 // 2

// type Result16 = {} extends object ? 1 : 2 // 1
// type Result18 = object extends {} ? 1 : 2 // 1

// type Result17 = object extends Object ? 1 : 2 // 1
// type Result20 = Object extends object ? 1 : 2 // 1

// type Result19 = Object extends {} ? 1 : 2 // 1
// type Result21 = {} extends Object ? 1 : 2 // 1

// type Result22 = Object extends any ? 1 : 2 // 1
// type Result23 = Object extends unknown ? 1 : 2 // 1

// type Result24 = any extends Object ? 1 : 2 // 1 | 2
// type Result25 = unknown extends Object ? 1 : 2 // 2

// type Result26 = any extends 'heora' ? 1 : 2 // 1 | 2
// type Result27 = any extends string ? 1 : 2 // 1 | 2
// type Result28 = any extends {} ? 1 : 2 // 1 | 2
// type Result29 = any extends never ? 1 : 2 // 1 | 2

// type Result31 = any extends unknown ? 1 : 2 // 1
// type Result32 = unknown extends any ? 1 : 2 // 1

// type Result33 = never extends 'heora' ? 1 : 2 // 1

// type Result34 = undefined extends 'heora' ? 1 : 2 // 2
// type Result35 = null extends 'heora' ? 1 : 2 // 2
// type Result36 = void extends 'heora' ? 1 : 2 // 2

// type TypeChain = never extends 'heora'
//   ? 'heora' extends 'heora' | '24'
//     ? 'heora' | '24' extends string
//       ? string extends String
//         ? String extends Object
//           ? Object extends any
//             ? any extends unknown
//               ? unknown extends any
//                 ? 8
//                 : 7
//               : 6
//             : 5
//           : 4
//         : 3
//       : 2
//     : 1
//   : 0

// type VerboseTypeChain = never extends 'heora'
//   ? 'heora' extends 'heora' | 'yueluo'
//     ? 'heora' | 'yueluo' extends string
//       ? string extends {}
//         ? string extends String
//           ? String extends {}
//             ? {} extends object
//               ? object extends {}
//                 ? {} extends Object
//                   ? Object extends {}
//                     ? object extends Object
//                       ? Object extends object
//                         ? Object extends any
//                           ? Object extends unknown
//                             ? any extends unknown
//                               ? unknown extends any
//                                 ? 8
//                                 : 7
//                               : 6
//                             : 5
//                           : 4
//                         : 3
//                       : 2
//                     : 1
//                   : 0
//                 : -1
//               : -2
//             : -3
//           : -4
//         : -5
//       : -6
//     : -7
//   : -8

// type Result36 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2 // 1
// type Result37 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2 // 1
// type Result38 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2 // 2
// type Result39 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2 // 2

// type Result40 = [number, number] extends number[] ? 1 : 2 // 1
// type Result41 = [number, string] extends number[] ? 1 : 2 // 2
// type Result42 = [number, string] extends (number | string)[] ? 1 : 2 // 1
// type Result43 = [] extends number[] ? 1 : 2 // 1
// type Result44 = [] extends unknown[] ? 1 : 2 // 1
// type Result45 = number[] extends (number | string)[] ? 1 : 2 // 1
// type Result46 = any[] extends number[] ? 1 : 2 // 1
// type Result47 = unknown[] extends number[] ? 1 : 2 // 2
// type Result48 = never[] extends number[] ? 1 : 2 // 1

// type LiteralType<T> = T extends string ? 'string' : 'other'

// type Res1 = LiteralType<'heora'> // "string"
// type Res2 = LiteralType<24> // "other"

// type LiteralType<T> = T extends string
//   ? 'string'
//   : T extends number
//   ? 'number'
//   : T extends boolean
//   ? 'boolean'
//   : T extends null
//   ? 'null'
//   : T extends undefined
//   ? 'undefined'
//   : never

// type Res1 = LiteralType<'heora'> // "string"
// type Res2 = LiteralType<24> // "number"

// function universalAdd<T extends number | bigint | string>(
//   x: T,
//   y: T
// ): number | bigint | string {
//   return x + (y as any)
// }

// type Func = (...args: any[]) => any

// type FunctionConditionType<T extends Func> = T extends (
//   ...args: any[]
// ) => string
//   ? 'A string return func!'
//   : 'A non-string return func!'

// //  "A string return func!"
// type StringResult = FunctionConditionType<() => string>
// // 'A non-string return func!';
// type NonStringResult1 = FunctionConditionType<() => boolean>
// // 'A non-string return func!';
// type NonStringResult2 = FunctionConditionType<() => number>

// type Func = (...args: any[]) => any

// type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
//   ? R
//   : never

// type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T

// type SwapResult1 = Swap<[1, 2]> // 符合元组结构，首尾元素替换[2, 1]
// type SwapResult2 = Swap<[1, 2, 3]> // 不符合结构，没有发生替换，仍是 [1, 2, 3]

// // 提取首尾两个
// type ExtractStartAndEnd<T extends any[]> = T extends [
//   infer start,
//   ...any[],
//   infer end
// ]
//   ? [start, end]
//   : T

// // 调换首尾两个
// type SwapStartAndEnd<T extends any[]> = T extends [
//   infer start,
//   ...infer args,
//   infer end
// ]
//   ? [end, ...args, start]
//   : T

// // 调换开头两个
// type SwapFirstTwo<T extends any[]> = T extends [
//   infer start1,
//   infer start2,
//   ...infer args
// ]
//   ? [start2, start1, ...args]
//   : T

// type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never

// type ArrayItemTypeResult1 = ArrayItemType<[]> // never
// type ArrayItemTypeResult2 = ArrayItemType<string[]> // string
// type ArrayItemTypeResult3 = ArrayItemType<[string, number]> // string | number

// // 提取对象的属性类型
// type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
//   ? R
//   : never

// type PropTypeResult1 = PropType<{ name: string }, 'name'> // string
// type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'> // string | number

// // 反转键名与键值
// type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
//   infer K,
//   infer V
// >
//   ? Record<V & string, K>
//   : never

// type ReverseKeyValueResult1 = ReverseKeyValue<{ key: 'value' }> // { "value": "key" }

// type PromiseValue<T> = T extends Promise<infer V> ? V : T

// type PromiseValueResult1 = PromiseValue<Promise<number>> // number
// type PromiseValueResult2 = PromiseValue<number> // number

// type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>> // Promise<boolean>

// // type PromiseValue<T> = T extends Promise<infer V>
// //   ? V extends Promise<infer N>
// //     ? N
// //     : V
// //   : T

// type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T

// type Condition<T> = T extends 1 | 2 | 3 ? T : never

// // 1 | 2 | 3
// type Res1 = Condition<1 | 2 | 3 | 4 | 5>

// // never
// type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never

// type Naked<T> = T extends boolean ? 'Y' : 'N'
// type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N'

// // "N" | "Y"
// type Res3 = Naked<number | boolean>

// // "N"
// type Res4 = Wrapped<number | boolean>

// type Naked<T> = T extends boolean ? 'Y' : 'N'

// // (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// // "N" | "Y"
// type Res3 = Naked<number | boolean>

// type NoDistribute<T> = T & {}

// type Wrapped<T> = NoDistribute<T> extends [boolean] ? 'Y' : 'N'

// type CompareUnion<T, U> = [T] extends [U] ? true : false

// type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3> // true
// type CompareRes2 = CompareUnion<1 | 2, 1> // false

// type IsNever<T> = [T] extends [never] ? true : false

// type IsNeverRes1 = IsNever<never> // true
// type IsNeverRes2 = IsNever<'heora'> // false

// // 直接使用，返回联合类型
// type Tmp1 = any extends string ? 1 : 2 // 1 | 2

// type Tmp2<T> = T extends string ? 1 : 2

// // 通过泛型参数传入，同样返回联合类型
// type Tmp2Res = Tmp2<any> // 1 | 2

// // 如果判断条件是 any，那么仍然会进行判断
// type Special1 = any extends any ? 1 : 2 // 1
// type Special2<T> = T extends any ? 1 : 2
// type Special2Res = Special2<any> // 1

// // 直接使用，仍然会进行判断
// type Tmp3 = never extends string ? 1 : 2 // 1

// type Tmp4<T> = T extends string ? 1 : 2
// // 通过泛型参数传入，会跳过判断
// type Tmp4Res = Tmp4<never> // never

// // 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
// type Special3 = never extends never ? 1 : 2 // 1

// type Special4<T> = T extends never ? 1 : 2
// type Special4Res = Special4<never> // never

// type Intersection<A, B> = A extends B ? A : never

// type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4> // 2 | 3

// type IsNever<T> = [T] extends [never] ? true : false

// type IsAny<T> = 0 extends 1 & T ? true : false

// type IsUnknown<T> = IsNever<T> extends false
//   ? T extends unknown
//     ? unknown extends T
//       ? IsAny<T> extends false
//         ? true
//         : false
//       : false
//     : false
//   : false

// type IsUnknown<T> = unknown extends T
//   ? IsAny<T> extends true
//     ? false
//     : true
//   : false

// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }

// type Required<T> = {
//   [P in keyof T]-?: T[P]
// }

// type Readonly<T> = {
//   readonly [P in keyof T]: T[P]
// }

// type Mutable<T> = {
//   -readonly [P in keyof T]: T[P]
// }

// type Record<K extends keyof any, T> = {
//   [P in K]: T
// }

// // 键名均为字符串，键值类型未知
// type Record1 = Record<string, unknown>
// // 键名均为字符串，键值类型任意
// type Record2 = Record<string, any>
// // 键名为字符串或数字，键值类型任意
// type Record3 = Record<string | number, any>

// type Dictionary<T> = {
//   [index: string]: T
// }

// type NumericDictionary<T> = {
//   [index: number]: T
// }

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// interface Foo {
//   name: string
//   age: number
//   job: string
// }
// type PickedFoo = Pick<Foo, 'age' | 'job'>

// type Pick<T> = {
//   [P in 'name' | 'age']: T[P]
// }

// type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>
// type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// // 这里就不能用严格 Omit 了
// declare function combineSpread<T1, T2>(
//   obj: T1,
//   otherObj: T2,
//   rest: Omit1<T1, keyof T2>
// ): void

// type Point3d = { x: number; y: number; z: number }

// declare const p1: Point3d

// // 能够检测出错误，rest 中缺少了 y
// combineSpread(p1, { x: 10 }, { z: 2 })

// type Extract<T, U> = T extends U ? T : never

// type Exclude<T, U> = T extends U ? never : T

// type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4> // 1 | 2

// type _AExtractB =
//   | (1 extends 1 | 2 | 4 ? 1 : never) // 1
//   | (2 extends 1 | 2 | 4 ? 2 : never) // 2
//   | (3 extends 1 | 2 | 4 ? 3 : never) // never

// type AExcludeB = Exclude<1 | 2 | 3, 1 | 2 | 4> // 3

// type _AExcludeB =
//   | (1 extends 1 | 2 | 4 ? never : 1) // never
//   | (2 extends 1 | 2 | 4 ? never : 2) // never
//   | (3 extends 1 | 2 | 4 ? never : 3) // 3

// type A = number | never // number

// type Condition<T> = T extends 1 | 2 | 3 ? T : never

// type Res1 = Condition<1 | 2 | 3 | 4 | 5> // // 1 | 2 | 3

// type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never // never

// type Naked<T> = T extends boolean ? 'Y' : 'N'
// type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N'

// type Res3 = Naked<number | boolean> // "N" | "Y"
// type Res4 = Wrapped<number | boolean> // // "N"

// type SetA = 1 | 2 | 3 | 5
// type SetB = 0 | 1 | 2 | 4

// type AExcludeB = Exclude<SetA, SetB> // 3 | 5
// type BExcludeA = Exclude<SetB, SetA> // 0 | 4

// type _AExcludeB =
//   | (1 extends 0 | 1 | 2 | 4 ? never : 1) // never
//   | (2 extends 0 | 1 | 2 | 4 ? never : 2) // never
//   | (3 extends 0 | 1 | 2 | 4 ? never : 3) // 3
//   | (5 extends 0 | 1 | 2 | 4 ? never : 5) // 5

// type _BExcludeA =
//   | (0 extends 1 | 2 | 3 | 5 ? never : 0) // 0
//   | (1 extends 1 | 2 | 3 | 5 ? never : 1) // never
//   | (2 extends 1 | 2 | 3 | 5 ? never : 2) // never
//   | (4 extends 1 | 2 | 3 | 5 ? never : 4) // 4

// // 并集
// type Concurrence<A, B> = A | B

// // 交集
// type Intersection<A, B> = A extends B ? A : never

// // 差集
// type Difference<A, B> = A extends B ? never : A

// // 补集
// type Complement<A, B extends A> = Difference<A, B>

// // type NonNullable<T> = T extends null | undefined ? never : T

// type _NonNullable<T> = Difference<T, null | undefined>

type FunctionType = (...args: any) => any

// // type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
// //   ? P
// //   : never

// // type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
// //   ? R
// //   : any

// type FirstParameter<T extends FunctionType> = T extends (
//   arg: infer P,
//   ...args: any
// ) => any
//   ? P
//   : never

// type FuncFoo = (arg: number) => void
// type FuncBar = (...args: string[]) => void

// type FooFirstParameter = FirstParameter<FuncFoo> // number
// type BarFirstParameter = FirstParameter<FuncBar> // string

// type ClassType = abstract new (...args: any) => any

// type ConstructorParameters<T extends ClassType> = T extends abstract new (
//   ...args: infer P
// ) => any
//   ? P
//   : never

// type InstanceType<T extends ClassType> = T extends abstract new (
//   ...args: any
// ) => infer R
//   ? R
//   : any

// interface ClassType<T = any> {
//   new (...args: any[]): T
// }

// type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
//   ? P
//   : never

// type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
//   ? P extends string
//     ? P
//     : never
//   : never
// type FirstArrayItemType<T extends any[]> = T extends [
//   infer P extends string,
//   ...any[]
// ]
//   ? P
//   : never

// type Tmp1 = FirstArrayItemType<[24, 'heora']> // never
// type Tmp2 = FirstArrayItemType<['heora', 599]> // 'heora'
// type Tmp3 = FirstArrayItemType<['heora']> // 'heora'

// window.onerror = (event, source, line, col, err) => {}

// type CustomHandler = (name: string, age: number) => boolean

// // 也推导出了参数类型
// const handler: CustomHandler = (arg1, arg2) => true

// class Animal {
//   asPet() {}
// }

// class Dog extends Animal {
//   bark() {}
// }

// class Corgi extends Dog {
//   cute() {}
// }

// type DogFactory = (args: Dog) => Dog
// type DogWithAnimalFactory = (args: Dog) => Animal
// type DogWithCorgiFactory = (args: Dog) => Corgi

// type AnimalFactory = (args: Animal) => Animal
// type AnimalWithDogFactory = (args: Animal) => Dog
// type AnimalWithCorgiFactory = (args: Animal) => Corgi

// type CorgiFactory = (args: Corgi) => Corgi
// type CorgiWithAnimalFactory = (agrs: Corgi) => Animal
// type CorgiWithDogFactory = (args: Corgi) => Dog

// function transformDogAndBark(dogFactory: DogFactory) {
//   const dog = dogFactory(new Dog())
//   dog.bark()
// }

// type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T

// type DeepPartial<T extends object> = {
//   [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
// }

// type DeepRequired<T extends object> = {
//   [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]
// }

// type DeepReadonly<T extends object> = {
//   readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
// }

// type DeepMutable<T extends object> = {
//   -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K]
// }

// type NonNullable<T> = T extends null | undefined ? never : T

// type DeepNonNullable<T extends object> = {
//   [K in keyof T]: T[K] extends object
//     ? DeepNonNullable<T[K]>
//     : NonNullable<T[K]>
// }

// type MarkPropsAsOptional<
//   T extends object,
//   K extends keyof T = keyof T
// > = Partial<Pick<T, K>> & Omit<T, K>

// // test
type Flatten<T> = { [K in keyof T]: T[K] }
// type MarkPropsAsOptionalWithFlattern<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<MarkPropsAsOptional<T, K>>

// type MarkPropsAsOptionalStruct = MarkPropsAsOptionalWithFlattern<
//   {
//     foo: string
//     bar: number
//     baz: boolean
//   },
//   'bar'
// >

// type Nullable<T> = T | null
// type Mutable<T> = {
//   -readonly [P in keyof T]: T[P]
// }

// type MarkPropsAsRequired<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & Required<Pick<T, K>>>

// type MarkPropsAsReadonly<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>

// type MarkPropsAsMutable<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & Mutable<Pick<T, K>>>

// type MarkPropsAsNullable<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & Nullable<Pick<T, K>>>

// type MarkPropsAsNonNullable<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & NonNullable<Pick<T, K>>>
