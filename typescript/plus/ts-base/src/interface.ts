console.log('-- interface start --')

{
  interface List {
    readonly id: number;
    name: string;
    age?: number // 可选属性，表示这个属性可以存在，也可以不存在
  }
  
  interface Result {
    data: List[]
  }
  
  function render (result: Result) {
    result.data.forEach(value => {
      console.log(value.id, value.name)
  
      if (value.age) {
        console.log(value.age)
      }
  
      // value.id = 3 // 只读属性是不允许修改的
    })
  }
  
  // ts 允许定义不存在属性，这是因为 ts 使用了一种鸭式辩型法，这是一种动态类型预览的风格
  // 一种比较形象的说法就是，一只鸟如果看起来像鸭子，游起来像鸭子，叫起来像鸭子，那么就可以被视为一个鸭子
  // 只要我们传入的对象符合接口的必要条件，就是被允许的，即使传入多余的字段也可以通过类型检查
  const result = {
    data: [
      { id: 1, name: 'A', sex: 'male' },
      { id: 2, name: 'B' },
    ]
  }
  
  render(result)
  // 如果直接传入对象字面量，ts 会对额外的字段进行类型检查
  // render({
  //   data: [
  //     { id: 1, name: 'A', sex: 'male' },
  //     { id: 2, name: 'B' },
  //   ]
  // })
  
  // 绕过类型检查的方式一共有三种
  // 1. 将对象字面量赋值给变量
  // 2. 使用类型断言，下面两种使用方式是等价的，建议使用第一种，第二种在 react 中会产生歧义
  render({
    data: [
      { id: 1, name: 'A', sex: 'male' },
      { id: 2, name: 'B' },
    ]
  } as Result)
  render(<Result>{
    data: [
      { id: 1, name: 'A', sex: 'male' },
      { id: 2, name: 'B' },
    ]
  })
  // 3. 使用字符串索引签名，可以用任意的字符串去索引类型，可以得到任意的结果，这样可以支持多个属性
  // 当你不确定接口中属性的个数，就可以使用可索引的接口，可索引的接口可以用数字去索引，也可以用字符串去索引
  interface List2 {
    id: number;
    name: string;
    [x: string]: any;
  }
  
  
  // 任意一个数字去索引 StringArray 都会得到一个 string，相当于声明了一个字符串类型的数组
  interface StringArray {
    [index: number]: string
  }
  let chars: StringArray = ['A', 'B']
  
  // 任意的字符串去索引 Names，得到的结果都是 string，只能声明 string 类型的成员
  // 两种索引签名是可以混用的，不过设置索引类型的返回为 string 后，就无法设置 number
  // 如果使用两种类型的索引，数字索引的返回值必须是字符串索引返回值类型的子类型，
  // 因为数字索引编译时会转化为字符串索引，转化的这部分对应的类型范围超过了字符串索引的范围，就会报错
  interface Names {
    [x: string]: string;
    [z: number]: string
  }
  const names: Names = { xxx: '', zzzz: '' }
}

{
  let add: (x: number, y: number) => number
  interface Add {
    (x: number, y: number): number
  }
  // 上面这两种定义方式是等价的，除此之外还有一种更简洁的定义方式，就是使用类型别名
  type Div = (x: number, y: number) => number
  const div: Div = (a, b) => a / b

  // 混合类型接口
  // 所以混合类型接口就是指一个接口既可以定义一个函数，也可以像对象一样，具有属性和方法
  interface Lib {
    (): void; // 没有返回值，也没有参数
    version: String;
    doSomething(): void;
  }
  // const lib: Lib = (() => {}) as Lib
  // lib.version = '0.0.1';
  // lib.doSomething = () => {}
  // 这样我们就实现了一个接口，但是这样就对全局暴露了一个变量 lib，如果我们想创建多个 lib，我们可以用函数封装一下
  function getLib () {
    const lib: Lib = (() => {}) as Lib
    lib.version = '0.0.1';
    lib.doSomething = () => {}
    return lib
  }
  const lib1 = getLib()
  lib1()
  lib1.doSomething()
  const lib2 = getLib()
  lib1()
  lib1.doSomething()
}

console.log('-- interface end --')
