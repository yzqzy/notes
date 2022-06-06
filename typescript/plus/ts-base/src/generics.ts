console.log('-- generics start --')

{
  // 函数支持传入多种类型
  // 1. 函数重载实现
  function log1(value: string): string
  function log1(value: string[]): string
  function log1(value: any) {
    console.log(value)
    return value
  }
  // 2. 联合类型实现
  function log2(value: string | string []): string | string[] {
    console.log(value)
    return value
  }
  // 3. 支持任意类型 any。 any 类型会丢失类型信息，没有类型之间的约束关系
  function log3(value: any) {
    console.log(value)
    return value
  }
  // 4. 泛型实现
  function log4<T>(value: T): T {
    console.log(value)
    return value
  }
  // 显式声明
  log4<String[]>(['a', 'b', 'c'])
  // 利用 ts 类型推断，直接传入数组，推荐使用
  log4(['a', 'b', 'c'])

  // type Log = <T>(value: T) => T
  // const logger: Log = log1

  // 泛型接口
  // 这种实现和类型别名的方式是等价的
  interface Log{
    <T>(value: T): T
  }
  // 上述泛型实现仅仅约束了一个函数，我们也可以用泛型约束接口其他成员
  // 当使用泛型约束整个接口之后，实现的时候必须指定一个类型或者在接口的定义中指定一个默认类型
  interface Log2<T = string> {
    (value: T): T
  }
  const logger: Log2<number> = log4
  logger(1)
  const looger2: Log2 = log4
  looger2('1')
}

{
  class Log<T> {
    run(value: T) {
      console.log(value)
      return value
    }
    // Static members cannot reference class type parameters.
    // 泛型不能应用于类的静态成员
    // static run(value: T) {
    //   console.log(value)
    //   return value
    // }
  }
  // 指定类型参数
  const logger1 = new Log<number>();
  logger1.run(1)
  // 我们也可以不指定类型参数，这时 value 的值可以是任意的值
  const logger2 = new Log()
  logger2.run({ a: 1 })
  logger2.run('2')
}

{
  // 泛型约束
  interface Length {
    length: number
  }
  // 当我们不仅想使用 value，还想使用 value.length
  function log<T extends Length>(value: T): T {
    console.log(value, value.length)
    return value
  }
  // 当我们使用 T 继承 Length 之后，就添加了约束，就不是所有类型都可以传了，输入的类型必须带有 length 属性
  log('1')
  // log(1) // Argument of type 'number' is not assignable to parameter of type 'Length'.
  log([1])
  // log({}) // Argument of type '{}' is not assignable to parameter of type 'Length'.
}

console.log('-- generics end --')
