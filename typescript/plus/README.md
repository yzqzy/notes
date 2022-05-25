# TypeScript

## TypeScript 基础

### 简介

TypeScipt 是拥有类型系统的 JavaScript 的超集，可以编译成纯 JavaScript。

* 类型检查：编译代码时进行严格的静态类型检查，编码阶段可以发现代码隐患；
* 语言扩展：包括 ES6 及未来提案的特性，比如异步操作和装饰器；其他语言的特性，接口和抽象类；
* 工具属性：可以编译成标签的 JavaScript，可以在任何浏览器、操作系统允许，无须任何运行时额外开销。

其他好处：

* vscode 具备强大的自动补全，导航和重构功能，使得接口定义可以直接代替文档，可以提高开发效率，降低维护成本；
* typescript 可以帮助团队重塑 "类型思维"，接口提供方将被迫去思考 API 的边界，从代码编写者蜕变为代码的设计者。

> 思维方式决定编程习惯，编程习惯决定工程质量，工程质量划定能力边界。

### 类型基础

#### 强类型与弱类型

> 在强类型语言中，当一个对象从调用函数传递到被调用函数时，其类型必须与被调用函数中声明的类型兼容。 -- Liskov, Zilles 1974

强类型语言：不允许改变变量的数据类型，除非进行强制类型转换。

```java
int x = 1;
boolean y = true;

// x = y; // boolean cannot be converted to int

char z = 'a';
x = z; // 97，会进行强制类型转换，将字符转换为 ASCII 码传递给 x
```

弱类型语言：变量可以被赋予不同的数据类型。

```js
let x = 1;
let y = true;
x = y; // true

let z = 'a';
x = z; // 'a'
```

**强类型语言对于变量的类型转换具有严格的限制，不同类型的变量无法相互赋值，可以避免许多低级错误。**

**弱类型预览相对灵活，基本没有约束，容易产生 BUG。**

> 在线编码平台：https://tool.lu/coderunner/

#### 静态类型与动态类型

静态类型语言：编译阶段确定所有变量的类型

动态类型语言：执行阶段确定所有变量的类型

```js
class c {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

function add (a, b) {
  return a.x + a.y + b.x + b.y;
}

// Js 引擎只有在实际运行时才可以确定参数类型
```

```c++
class c {
  public: 
  	int x;
  	int y;
}

int add (C a, C b) {
  return a.x + a.y + b.x + b.y;
}

// 编译阶段就可以确定参数类型，类型一定是整型
```

执行 add 方法时，两种语言都会创建实例对象 a 和 b。不同的是 js 需要在程序运行时，动态计算属性偏移量（相对于对象基地址的偏移量），需要额外的空间存储属性名，并且所有的的偏移量信息各存一份。C++ 可以在编译阶段确定属性偏移量，用偏移量访问代表属性名访问，并且所有偏移量信息是共享的。

<img src="./images/memory.png" />

静态类型与动态类型对比：

| 静态类型语言   | 动态类型语言             |
| -------------- | ------------------------ |
| 对类型极度严格 | 对类型非常宽松           |
| 立即发现错误   | BUG 可能隐藏数月甚至数年 |
| 运行时性能良好 | 运行时性能差             |
| 自文档化       | 可读性差                 |

动态类型语言：

* 性能是可以改善的（V8 引擎），语言的灵活性更重要；
* 隐藏的错误可以通过单元测试发现；
* 文档可以通过工具生成。

关于静态类型语言和动态类型语言不能一概而论，要看具体的场景和性价比，比如 js 就是一门动态弱类型语言，应用场景也十分广泛。

#### 其他定义

> 仅供参考。

强类型语言：不允许程序在发生错误后继续执行 

争议：C/C++ 是强类型还是弱类型？

按照这个定义 C/C++ 就成了弱类型语言，它们没有对数组越界进行检查，由此可能导致程序崩溃。

#### 总结

<img src="./images/lang.png" />

### 基础类型

最新的 ECMAScript 标准定义了8种数据类型：

* 基本数据类型：Boolean、null、undefined、Number、BigInt、String、Symbol
* 引用类型：Object

ES 数据类型：

```js
Boolen、null、undefined、Number、String、Symbol、Object、Array、Function
```

TypeScript 数据类型：

```js
Boolen、null、undefined、Number、String、Symbol、Object、Array、Function
void、any、never、元组、枚举、高级类型等
```

类型注解

作用：相当于强类型语言中的类型声明

语法：(变量/函数)：type

```ts
console.log('-- datatype start --')

// 原始类型
const bool: boolean = true
const num: number = 123
const str: string = 'abc'

// 数组
const arr: number[]  = [1, 2, 3]
const arr2: Array<number> = [1, 2, 3]
const arr3: Array<number | string> = [1, 2, 3, '4']

// 元组：特殊的数组，限定数组元素类型和个数
const tuple: [number, string] = [0, '1']
tuple.push(2); // 原则上不可以改变，允许 push 应该是一个TypeScript 的一个缺陷
console.log(tuple)// [0, '1', 2]
// console.log(tuple[2])// 无法越界访问

// 函数
const add = (x: number, y: number) => x + y 
const add2 = (x: number, y: number): number => x + y 
const compute: (x: number, y: number) => number = (a, b) => a + b

// 对象
const obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x  = 3

// symbol
const s1: Symbol = Symbol()
const s2 = Symbol()
console.log(s1 === s2) // false

// undefiend、null 无法赋值其他数据类型
// 官方定义，undefine、null 是任何类型的子类型，理论上可以赋值给其他类型（需要配置 tsconfig.json "strictNullChecks" 配置为 false）
const un: undefined = undefined
const nu: null = null
const num_nu: number | null = nu

// void
// js 中 void 是一种操作符，可以让任何表达式返回 undefined
// void 0 => undefiend，undefined 在 js 中并不是一个保留字，我们可以自定义 undefined 变量覆盖全局的 undefined
;(() => {
  var undefined = 0;
})();
console.log(undefined, '22222')
// 用 void 可以确保返回的值一定是 undefined
const noReturn = () => {}

// any
// ts 中如果不指定数据类型，默认就是 any 类型，非特殊情况不推荐使用 any 类型
let x

// never
// 永远不会存在返回值的类型
const error = () => {
  throw new Error('error')
}
const endless = () => {
  while(true) {}
}

console.log('-- datatype end --')
```

ts 基础类型完全覆盖了 ES6 的基础类型，并且通过 any 类型实现了对 JS 的兼容。

### 枚举类型

先来看一段代码。

```js
function initByRole (role) {
  if (role === 1 || role === 2) {
    // ...
  } else if (role === 3 || role === 4) {
    // ...
  } else if (role === 5) {
    // ...
  } else {
    // do sth
  }
}
```

上面这段代码存在以下问题：

* 可读性差：很难记住数字的含义；
* 可维护性差：硬编码，牵一发而动全身；

要想解决上述问题，我们可以使用 ts 的枚举类型。

**枚举：一组有名字的常量集合。**

```ts
console.log('-- enum start --')

// 数字枚举
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role.Reporter);
console.log(Role);
// 枚举会被编译成一个对象，既可以用名称索引，也可以用值来索引
// {0: 'Reporter', 1: 'Developer', 2: 'Maintainer', 3: 'Owner', 4: 'Guest', Reporter: 0, Developer: 1, Maintainer: 2, Owner: 3, Guest: 4}
// 我们可以用 ts playground 来查看其实现，https://www.typescriptlang.org/play。
// "use strict";
// var Role;
// (function (Role) {
//     Role[Role["Reporter"] = 0] = "Reporter";
//     Role[Role["Developer"] = 1] = "Developer";
//     Role[Role["Maintainer"] = 2] = "Maintainer";
//     Role[Role["Owner"] = 3] = "Owner";
//     Role[Role["Guest"] = 4] = "Guest";
// })(Role || (Role = {}));
// 上面这种代码实现方式叫做反向映射，这就是枚举的实现原理。

// 字符串枚举
enum Message {
  Success = 'success',
  Fail = 'fail'
}
// 字符串枚举不可以反向映射
// "use strict";
// var Message;
// (function (Message) {
//     Message["Success"] = "success";
//     Message["Fail"] = "fail";
// })(Message || (Message = {}));

// 异构枚举
// 不推荐使用，容易引起混淆
enum Answer {
  N,
  Y = 'yes'
}
// "use strict";
// var Answer;
// (function (Answer) {
//     Answer[Answer["N"] = 0] = "N";
//     Answer["Y"] = "yes";
// })(Answer || (Answer = {}));

// 枚举成员
// 枚举成员的值是一个只读类型，定义后无法修改
// Role.Reporter = 2 // 'Reporter' because it is a read-only property.
// 枚举成员分为两类：
//  一类是常量枚举（const enum），它会在编译的时候计算出结果，然后以常量的形式出现在运行时环境
//  一类是计算枚举（computed enum），是一些非常量的表达式 ，这些类型的值不会再编译时计算，而是会保留到程序的执行阶段
enum Char {
  // const 
  a, // 1. 无初始值
  b = Char.a, // 2. 已有常量的引用
  c = 1 + 3, // 3. 常量表达式
  // computed
  d = Math.random(),
  e = '123'.length,
  // f //  Enum member must have initializer.  computed enum 后面的成员必须赋初始值
}
// "use strict";
// var Char;
// (function (Char) {
//     // const 
//     Char[Char["a"] = 0] = "a";
//     Char[Char["b"] = 0] = "b";
//     Char[Char["c"] = 4] = "c";
//     // computed
//     Char[Char["d"] = Math.random()] = "d";
//     Char[Char["e"] = '123'.length] = "e";
// })(Char || (Char = {}));

// 常量枚举
// const 关键字声明的枚举就是常量枚举，常量枚举会在编译阶段被移除
// "use strict"; 编译后没有任何代码，也不存在反向映射，因为已经被移除掉
const enum Month {
  Jan,
  Feb,
  Mar
}
// 当我们不需要一个对象，而需要对象的值时，可以使用常量枚举，这样会减少编译后的代码
let month = [Month.Jan, Month.Feb]
// "use strict";
// let month = [0 /* Jan */, 1 /* Feb */];
// 编译后，枚举会直接被替换成常量，这样在编译后代码就会变得非常简洁

// 枚举类型
// 某些情况下，枚举和枚举成员都可以作为一种单独的类型存在
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// e == f //  This condition will always return 'false' since the types 'E' and 'F' have no overlap. 两种不同类型的枚举是不可以比较的

let e1: E.a
let e2: E.b
let e3: E.a
// e1 === e2 // 不可以比较
// e1 === e3 // 相同类型可以进行比较

let g1: G
let g2: G.a
// 字符串类型枚举只能是枚举成员的类型

console.log('-- enum end --')
```

我们需要将程序中不容易记忆的硬编码或者在未来中可能改变的常量，抽离出来定义成枚举类型，可以提高程序的可读性和可维护性。

**技术拓展**

将 enum 类型，转换为一个 string iteator type。

```ts
enum Test {
  A = 'a',
  B = 'b',
  C = 'c'
}

type TestValue = keyof Record<Test, string>
```

给定字符串 “a”，获取 `Test.A`

```ts
function getKey (value: string) {
  let key: keyof typeof Test

  for (key in Test) {
    if (value === Test[key]) return key
  }

  return null
}
```

### 接口

接口可以用来约束对象、函数以及类的结构和类型，它是一种代码协作的契约，我们必须遵守，而且不能改变。

#### 对象类型接口

```ts
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
// 两种索引签名是可以混用的
interface Names {
  [x: string]: string;
  [z: number]: string
}
```

#### 函数类型接口

```ts
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
```

#### 总结

我们用接口分别定义了对象和函数，除此之外，接口还可以定义类的结构和类型，后面我们再去讲解它。

> type和interface 多数情况下有相同的功能，就是定义类型。但有一些小区别： 
>
> type：不是创建新的类型，只是为一个给定的类型起一个名字。type还可以进行联合、交叉等操作，引用起来更简洁。 
> interface：创建新的类型，接口之间还可以继承、声明合并。 如果可能，建议优先使用 interface。

> 混合接口一般是为第三方类库写声明文件时会用到，很多类库名称可以直接当函数调用，也可以有些属性和方法。
> 例子你可以看一下@types/jest/index.d.ts 里面有一些混合接口。

> 用混合接口声明函数和用接口声明类的区别是，接口不能声明类的构造函数（既不带名称的函数），但混合接口可以，其他都一样。

### 函数

```ts
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
```

如果不使用函数重载，也可以实现功能，那函数重载声明的意义是什么？

> TS在编译的时候要做类型检查，如果没有前面的函数声明，就会由于参数是 any 类型而忽略类型检查，这样类型检查的工作就转移到了运行时环境，而这不符合TS的设计目标。 TS在处理重载时，会去查询声明列表，并且尝试使用第一个声明的类型定义，如果匹配就使用，如果不匹配就继续向后查询。

### 类

ES6 引入了 class 关键字，我们可以像传统的面向对象语言一样去创建一个类。
总体来讲， ts 的类覆盖了 ES6 的类，同时也引入其他特性。

#### 继承成员和成员修饰符

```ts
// 类的成员修饰符
// public 公有成员，类的所有属性默认都是 public，也可以显示声明
// private 私有成员，私有成员只能在类本身调用，不能被类的实例调用，也不能被子类调用
// - 如果用 private 修饰 constructor，意味着这个类既不能被实例化也不能被继承
// protected 受保护成员，只能在类或者子类中访问，不能在类的实例中访问
// - 如果用 protected 修饰 constructor，意味着这个类不能被实例化，只能被继承， 可以用来声明基类
// readonly 只读属性，只读属性不可以被更改，同样，只读属性必须初始化
class Dog {
  public name: string
  readonly legs: number = 4
  // 类的静态成员只能通过类名调用
  static food: string = 'bones'
  
  constructor (name: string) {
    this.name = name
  }
  
  run () {}

  private print () {}
  protected pro () {}
}
// 无论 ES6 还是 TS 中，类成员的属性都是实例属性，不是原型属性，类成员的方法都是原型方法
// 与 ES6 不同的是，实例必须存在初始值或在构造函数中被初始化
const dog = new Dog('dog')
console.log(dog)

// 类的继承
class Husky extends Dog {
  color: string

  // 除了类的成员可以添加修饰符之外，构造函数的参数也可以添加修饰符
  // 它可以将参数自动变为实例属性，我们可以省略在类中的定义，看起来会更加简洁
  constructor (name: string, color: string, public sex: string) {
    super(name)
    this.color = color
    this.sex = sex
  }
}
```

> S 的继承方式是原型式继承，原型上的属性和方法是所有实例共享的，不需要共享的就放在构造函数中（也就是实例自己的属性和方法）。当调用实例的属性或方法时，先看实例自身有没有，如果没有就会沿着原型链查找。

派生类必须调用super，调用super之后才能使用this，这是为什么？

```js
// 传统 JavaScript 的继承：
function Animal(name) {
    this.name = name;
}
function Dog(name) {
    Animal.call(this, name);
}

// ES6的继承：
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}

// super 的作用是调用父类 Animal 的构造函数来初始化子类 Dog，等价于 Animal.call(this, ...)。
// 也就是说，只有相关的实例属性被绑定到 this 上后，才能调用 this.xxx。
```

#### 抽象类与多态

ES 中并没有引入抽象类的概念，抽象类是 TS 对 ES 的扩展。所谓抽象类，就是只能被继承，不能被实例化的类。

```ts
// 抽象类
// 抽象类可以抽离出一些事物的共性，有利于代码复用和扩展
// 抽象类可以实现多态
// 多态指在父类中定义抽象方法，可以在多个子类中对抽象方法有不同的实现，可以在程序运行时根据不同的实现执行不同的操作，这样就实现了运行时的绑定
abstract class Animal {
  eat () {
    console.log('eat')
  }

  // 抽象方法，不实现方法
  // 使用抽象方法，可以明确知道子类可以有其他的实现，不需要在父类中实现
  abstract sleep (): void
} 

// 抽象类不能被实例化
// const animal = new Animal() // Cannot create an instance of an abstract class.

class Dog extends Animal {
  constructor (public name: string) {
    super()
    this.name = name
  }

  run () {}

  sleep () {
    console.log('sleep')
  }
}
const dog = new Dog('wangwang')
dog.eat()

class Cat extends Animal {
  sleep () {
    console.log('cat sleep')
  }
}
const cat = new Cat()
cat.sleep()

// 多态运行示例
const animals: Animal[] = [dog, cat]
animals.forEach(cur => {
  cur.sleep()
})


// 类的成员方法可以直接返回一个 this，可以很方便的实现链式调用
class WorkFlow {
  step1 () {
    return this
  }
  setp2 () {
    return this
  }
}
new WorkFlow().step1().setp2()

// 继承时 this 类型也可以表现出多态，这里的多态指 this 既可以是父类型，也可以是子类型
class MyFlow extends WorkFlow {
  next () {
    return this
  }
}
new MyFlow().next().step1().next()
```

#### 总结

ts 为 es 扩展了许多特性，ts 更像是一种面向对象 “语言” 。

> ts 是一门编程语言，但它不是一个独立的编程语言，而是基于 JavaScript 拓展的语言。

### 类与接口的关系



## TypeScript 进阶

