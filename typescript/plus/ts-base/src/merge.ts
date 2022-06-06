console.log('-- declare merge end --')

{
  // 非函数成员
  interface A {
    x: number
    // y: string 
    // Type 'number' is not assignable to type 'string'.
    // 相同属性必须类型一致
  }
  interface A {
    y: number
  }
  const a: A = {
    x: 1,
    y: 1 
  }

  // 函数成员
  // 每一个函数都会被声明为一个函数重载
  interface B {
    foo (bar: number): number // 5
    foo (bar: 'b1'): number // 2
  }
  interface B {
    foo (bar: string): string // 3
    foo (bar: number[]): number[] // 4
    foo (bar: 'b2'): number // 1 
  }
  const b = {
    foo(bar: any): any {
      return bar
    }
  }
  // 函数重载的时候需要注意函数重载的顺序，因为编译器会按顺序进行匹配
  // 那么接口合并如何确认顺序？
  // 接口内部按书写顺序来确定，接口之间后面的接口会排在前面（顺序排名已标在代码后）
  // 如果函数参数是字符串字面量，那么这个声明就会被提升到整个函数声明的最顶端
  // 上述规则就是接口之前的声明合并

  // 命名空间合并
  // 命名空间中导出的成员是不可以重复定义的
}

// 命名空间与函数的合并
// 在 JS 中创建一个函数，给他增加一些属性是很常见的一个模式
// 通过命名空间和函数的声明也可以实现这个模式
function Lib() {}
namespace Lib {
  export let version = '1.0'
}
console.log(Lib)
console.log(Lib.version)

// 命名空间与类的声明合并
// 以下代码相当于给类添加了一些静态属性
class C {}
namespace C {
  export let state = 1
}
console.log(C)
console.log(C.state)

// 命令空间与枚举合并
// 以下代码相当于给枚举增加了一个方法
enum Color {
  Red,
  Yellow,
  Bule
}
namespace Color {
  export function mix() {}
}
console.log(Color)
// {0: 'Red', 1: 'Yellow', 2: 'Bule', Red: 0, Yellow: 1, Bule: 2, mix: ƒ}

// ★ 命名空间与函数/类时一定要放到函数/类定义之后，否则就会报错
// 枚举和命名空间的定义位置无关，没有要求
// 为什么会产生这个问题？
// 从编译结果来看，class 是重复声明，function 是内容覆盖，枚举则是创建对象并添加属性，
// 命名空间也是创建对象并添加属性，所以枚举可以在命名空间后面，因为它们本质上都是看全局是否存在同名对象，
// 如果有直接添加属性，如果没有则创建并添加属性

// 在我们的程序中如果存在多处同名的声明，并不是一个好的做法，最好还是将它们封装到一个模块中
// ts 拥有这种特性，只是为了兼容旧的开发模式，这使得 ts 可以与老的代码共存，并且还可以帮助发现一些设计缺陷

console.log('-- declare merge end --')
