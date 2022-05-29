console.log('-- type-check start --')

{
  // 类型推断

  // 根据表达式值推断表达式类型，
  // 基础类型推断
  let a = 1 // number
  let b = [] // any[]
  let c = [1] // number[]
  const d = (x = 1) => {} // const d: (x?: number) => void
  const e = (x = 1) => x // const e: (x?: number) => number

  // 最佳通用类型推断，从右到左
  let c1 = [1, null, '1'] // let c1: (string | number)[]

  // 上下文类型推断，从左到右
  // ts 根据左侧事件绑定，推断右侧事件类型，(parameter) event: KeyboardEvent
  window.onkeydown = (event) => {}
}

{
  // 类型断言
  // 类型断言可以增加代码灵活性，改造旧代码很有效，但是不能滥用类型断言
  // 你需要对上下文的环境有充分的预判，没有任何根据的类型断言会给代码带来安全隐患

  interface Foo {
    bar: number
  }

  // 类型断言配合接口类型
  const foo = {} as Foo
  foo.bar = 1
}

{
  // 类型兼容性

  // strictNullChecks false 情况下，字符串类型兼容 null 类型
  // null 是 字符串类型的子类型，之所以要讨论这些兼容性问题，是因为 ts 允许把一些类型不同的变量相互赋值
  // 虽然在某种程度来讲，可能会产生一些不可靠的行为，但可以增加语言的灵活性
  let s: string = 'a'
  // s = null

  // 类型兼容性的例子广泛存在于接口、函数、类中

  // 接口兼容
  interface X {
    a: any
    b: any
  }
  interface Y {
    a: any
    b: any
    c: any
  }
  let x: X = { a: 1, b: 2 }
  let y: Y = { a: 1, b: 2, c:3 }
  x = y 
  // y = x // Property 'c' is missing in type 'X' but required in type 'Y'.
  // Y 接口具备 X 接口所有的属性，Y 可以被视为 X 类型，X 类型可以兼容 Y 类型
  // 源类型必须具备目标类型的必要属性，就可以进行赋值，接口之间相互兼容，成员少的会兼容成员多的

  // 函数兼容性
  // 判断函数的兼容性，一般是在函数作为参数的情况下
  type Handler = (a: number, b: number) => void
  function hof(handler: Handler) {
    return handler
  }

  // 函数兼容需要满足三个条件
  {
    // 1. 参数个数要求
    // 参数个数：目标函数的参数个数一定要多余原函数的参数个数
    let handler1 = (a: number) => {}
    hof(handler1)
    let handler2 = (a: number, b: number, c: number) => {}

    // 可选参数和剩余参数：
    let a = (p1: number, p2: number) => {}
    let b = (p1?: number, p2?: number) => {}
    let c = (...args: number[]) => {}
    // 1) 固定参数可以兼容可选参数和剩余参数
    a = b 
    a = c
    // 2) 可选参数不兼容固定参数和剩余参数
    // b = c
    // b = a
    // 3) 剩余参数可以兼容固定参数和可选参数
    c = a
    c = b
  }
  {
    // 2. 参数类型，参数类型必须要匹配
    let handler3 = (a: string) => {}
    // hof(handler3) // a: string) => void' is not assignable to parameter of type 'Handler'.  

    interface Point3D {
      x: number
      y: number
      z: number
    }
    interface Point2D {
      x: number
      y: number
    }
    let p3d = (point: Point3D) => {}
    let p2d = (point: Point2D) => {}
    p3d = p2d 
    // p2d 不兼容 p3d，成员个数多的会兼容个数少，少的不能兼容成员个数多的，与接口的结论正好相反
    // p2d = p3d
    // Type '(point: Point3D) => void' is not assignable to type '(point: Point2D) => void'.
    // Types of parameters 'point' and 'point' are incompatible.
    // 函数参数相互赋值的情况叫做函数的双向协变，这种情况允许我们把一个精确的类型赋值给一个不那么精确的类型
  }
  {
    // 3. 返回值类型，ts 要求目标函数的返回值必须与原函数的返回值类型相同，或者是其子类型
    let f = () => ({ name: 'heora' })
    let g = () => ({ name: 'heora', location: 'Beijing' })
    f = g // f 兼容 g
    // g = f // g 不兼容 f，成员少的会兼容成员多的
  }

  // 函数重载：函数重载分为两部分，一个是函数重载列表，一个是
  // 1) 函数重载列表
  function overload(a: number, b: number): number
  function overload(a: string, b: string): string
  // function overload(a: any, b: any, c: any): any{} 
  // This overload signature is not compatible with its implementation signature.
  function overload(a: any, b: any): any{}

  // 枚举兼容性
  enum Fruit { Apple, Banana }
  enum Color { Red, Yellow }
  // 枚举和 number 是可以完全兼容的
  let fruit: Fruit.Apple = 3
  let no: number = Fruit.Apple
  // 枚举之间是完全不兼容的
  // let color: Color.Red = Fruit.Apple // Type 'Fruit.Apple' is not assignable to type 'Color.Red'.

  // 类兼容性
  class A {
    constructor(p: number, q: number) {}
    id: number = 1
  }
  class B {
    static s = 1
    constructor(p: number) {}
    id: number = 2
  }
  let a = new A(1, 2)
  let b = new B(1)
  // 类和接口比较相似，它们也只比较结构
  // 比较两个类是否兼容时，静态属性和构造函数是不参与比较的
  // 如果两个类具有相同的实例成员，那么它们的实例就可以完全相互兼容
  a = b
  b = a
  // 如果两个类中含有私有成员，那么这两个类就不兼容了，这时只有父类和子类之间是可以相互兼容的
  class C {
    constructor(p: number, q: number) {}
    id: number = 1
    private name: string = ''
  }
  class D {
    static s = 1
    constructor(p: number) {}
    id: number = 2
  }
  let c = new C(1, 2)
  let d = new D(1)
  // c = d // Property 'name' is missing in type 'D' but required in type 'C'.
  class E extends C {}
  let e = new E(1, 2)
  c = e
  e = c

  // 泛型兼容性
  interface Empty<T> {
    value: T
  }
  let obj1: Empty<number> = { value: 1 }
  let obj2: Empty<string> = { value: '1' }
  // 泛型接口没有任何成员是可以兼容的，当添加成员后就不兼容了
  // obj1 = obj2
  // obj2 = obj1
  // 只有类型参数 T 被接口使用的时候，才会影响泛型的兼容性

  // 泛型函数
  let log1 = <T>(x: T): T => {
    console.log('x')
    return x
  }
  let log2 = <U>(x: U): U => {
    console.log('x')
    return x
  }
  // 如果两个泛型函数的定义相同，没有指定类型参数，它们之间是可以相互兼容的
  log1 = log2
  log2 = log1
} 

{
  // 类型保护
  enum Type { Strong, Week }
  class Java {
    helloJava() {
      console.log('hello java')
    }
    java: any
  }
  class JavaScript {
    helloJavaScript() {
      console.log('hello javascript')
    }
    javascript: any
  }
  function getLanguage(type: Type, x?: string | number) {
    const lang = type === Type.Strong ? new Java() : new JavaScript()

    // 不推荐
    if ((lang as Java).helloJava) {
      (lang as Java).helloJava()
    } else {
      (lang as JavaScript).helloJavaScript()
    }
    
    // 1. instanceof 判断实例是否属于某个类
    if (lang instanceof Java) {
      lang.helloJava()
    } else {
      lang.helloJavaScript()
    }

    // 2. in 关键字
    if ('javascript' in lang) {
      lang.helloJavaScript()
    } else {
      lang.helloJava()
    }

    // 3. typeof
    if (typeof x === 'string') {
      x.length
    } else {
      x?.toFixed(2)
    }

    // 4. 通过类型保护函数
    if (isJava(lang)) {
      lang.helloJava()
    } else {
      lang.helloJavaScript()
    }

    return lang
  }
  // 类型谓词用法
  function isJava(lang: Java | JavaScript): lang is Java {
    return (lang as Java ).helloJava !== undefined
  }
  getLanguage(Type.Strong)
}

console.log('-- type-check end --')
