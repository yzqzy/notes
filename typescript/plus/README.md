# TypeScript

## 基础知识 

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
```

ts 基础类型完全覆盖了 ES6 的基础类型，并且通过 any 类型实现了对 JS 的兼容。

