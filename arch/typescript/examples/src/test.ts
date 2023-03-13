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
  function minimunLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
    if (obj.length >= minimum) return obj
    return obj.constructor(minimum)
  }
}
