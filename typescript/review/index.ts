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

interface Tmp {
  user:
    | {
        vip: true
        expires: string
      }
    | {
        vip: false
        promotion: string
      }
}

declare var tmp: Tmp

if (tmp.user.vip) {
  console.log(tmp.user.expires)
}

// const foo: (name: string) => number = name => {
//   return name.length
// }

type FuncFoo = (name: string) => number

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
//     return foo * 599
//   }
// }

// const res1 = func(599) // number
// const res2 = func(599, true) // string
// const res3 = func(599, false) // number

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

// const target = [1, 2, 3, 599].find(item => item === 599)!

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
//   599: 2
// }

// type FooKeys = keyof Foo // 'heora' | 599

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

interface Foo {
  prop1: string
  prop2: number
  prop3: boolean
  prop4: () => void
}

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
//     input.replace('linbudu', 'heora')
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

class Queue<TElement> {
  private _list: TElement[]

  constructor(initial: TElement[]) {
    this._list = initial
  }

  enqueue<TType extends TElement>(ele: TType): TElement[] {
    this._list.push(ele)
    return this._list
  }

  enqueueWithUnknownType<TType>(element: TType): (TElement | TType)[] {
    return [...this._list, element]
  }

  dequeue(): TElement[] {
    this._list.shift()
    return this._list
  }
}
