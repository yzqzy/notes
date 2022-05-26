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
  s = null

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
  
}

console.log('-- type-check end --')
