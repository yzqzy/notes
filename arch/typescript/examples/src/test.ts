;() => {
  type SomeConstructor = {
    new (s: string): String
  }

  function fn(ctor: SomeConstructor) {
    return new ctor('hello')
  }

  const str = fn(String)
  console.log(str) // hello
}
;() => {
  {
    type SomeConstructor<T> = {
      new (s: number): T
    }

    function fn<T>(ctor: SomeConstructor<T>, n: number) {
      return new ctor(n)
    }

    fn<Array<string>>(Array, 100)
  }
}
;() => {
  function firstElement<Type>(arr: Type[]): Type {
    return arr[0]
  }
}
;() => {
  function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func)
  }

  const parsed = map(['1', '2', '3'], n => parseInt(n))
  // [1, 2, 3]
}
;() => {
  // function minimunLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
  //   if (obj.length >= minimum) return obj
  //   return { length: minimum }
  //   // 不能将类型“{ length: number; }”分配给类型“Type”。
  //   // "{ length: number; }" 可赋给 "Type" 类型的约束，但可以使用约束 "{ length: number; }" 的其他子类型实例化 "Type"。ts(2322)
  // }
  function minimunLength<Type extends { length: number; constructor: Function }>(
    obj: Type,
    minimum: number
  ): Type {
    if (obj.length >= minimum) return obj
    return obj.constructor(minimum)
  }
}
;() => {
  function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2)
  }

  // const arr = combine([1, 2, 3], ['hello'])
  // 不能将类型“string”分配给类型“number”。

  const arr = combine<string | number>([1, 2, 3], ['hello'])
}
;() => {
  function firstElement1<Type>(arr: Type[]) {
    return arr[0]
  }
  function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0]
  }

  function filter1<Type>(arr: Type[], func: (args: Type) => boolean): Type[] {
    return arr.filter(func)
  }
  function filter2<Type, Func extends (args: Type) => boolean>(arr: Type[], func: Func): Type[] {
    return arr.filter(func)
  }

  function greet<Str extends string>(s: Str) {
    console.log('Hello, ' + s)
  }
}
;() => {
  function myForEach(arr: any[], callback: (args: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i)
    }
  }
}
;() => {
  // function add<T>(a: T, b: T) {
  //   return a + b
  //   // 运算符“+”不能应用于类型“T”和“T”。
  // }

  function isSet<T>(x: any): x is Set<T> {
    return x instanceof Set
  }

  function add(a: number, b: number): number
  function add(a: string, b: string): string
  function add<T>(a: Set<T>, b: Set<T>): Set<T>
  function add<T>(a: T, b: T): T {
    if (isSet<T>(a) && isSet<T>(b)) {
      return new Set([...a, ...b]) as any
    }
    return (a as any) + (b as any)
  }

  const a = new Set<string>(['apple', 'redhat'])
  const b = new Set<string>(['google', 'ms'])

  console.log(add(a, b))
  console.log(add(1, 2))
  console.log(add('a', 'k'))
}
;() => {
  type voidFunc = () => void

  const f1: voidFunc = () => {
    return true
  }
  const f2: voidFunc = () => true
  const f3: voidFunc = function () {
    return true
  }
}
;() => {
  function f1(a: any) {
    a.b() // pass
  }
  // function f2(a: unknown) {
  //   a.b()
  //   // 类型“unknown”上不存在属性“b”。
  // }

  function safeParse(s: string): unknown {
    return JSON.parse(s)
  }
  function fail(msg: string) {
    throw new Error(msg)
  }
}
;() => {
  function multiply(n: number, ...m: number[]) {
    return m.map(x => n * x)
  }

  const a = multiply(10, 1, 2, 3, 4)
}
