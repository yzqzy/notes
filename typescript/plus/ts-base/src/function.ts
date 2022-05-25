console.log('-- function start --')

{ 
  // 函数定义，明确指出函数参数类型，函数返回值可以通过 ts 类型推断得到
  function add1 (x: number, y: number) {
    return x + y
  }

  // 通过变量定义函数类型
  let add2: (x: number, y: number) => number
  // 通过类型别名定义函数类型
  type add3 = (x: number, y: number) => number
  // 通过接口定义函数类型
  interface add4 {
    (x: number, y: number): number
  }
  // 以上三种只是类型类型的定义，并没有具体实现

  // js 中对于函数参数的个数是没有限制的，ts 中形参和实参必须一一对应
  add1(1, 2)

  // 可选参数，可选参数必须位于必选参数之后
  function add5 (x: number, y?: number) {
    return y? x + y : x
  }

  // 参数默认值
  function add6 (x: number, y = 0, z: number, q = 1) {
    return x + y + z + q;
  }

  // 剩余参数
  function add7 (x: number, ...rest: number[]) {
    return x + rest.reduce((pre, cur) => pre + cur);
  }
  console.log(add7(1, 2, 3, 4, 5))

  // 函数重载
  // 两个函数如果名称相同，但是参数个数或者参数类型不同，就可以实现函数重载
  // 函数重载的好处就是不需要为相同作用的函数，定义不同的函数名称，可以增强函数的可读性
  function add8 (...rest: number[]): number
  function add8 (...rest: string[]): string
  function add8 (...rest: any[]): any {
    const first = rest[0]
    if (typeof first === 'string') {
      return rest.join('、')
    }
    if (typeof first === 'number') {
      return rest.reduce((pre, cur) => pre + cur)
    }
  }
  console.log(add8(1, 2, 3, 4, 5))
  console.log(add8('js', 'ts'))
  // ts 编译器在处理重载时，会查询重载列表，并且会尝试第一个定义，如果匹配就是用这个函数定义，如果不匹配，接着往下查找
  // 所以我们可以把最容易匹配的函数定义写在最前面
}

console.log('-- function end --')
