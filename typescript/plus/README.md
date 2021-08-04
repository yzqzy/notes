# TypeScript

## 概述

TypeScipt 是一门基于 JavaScript 的编程语言，它重点解决 JavaScipt 自有类型系统的问题。

使用 TypeScipt 语言可以大大提高代码的可靠程度。

* 强类型
* 静态类型与动态类型
* JavaScript 自由类型系统的问题
* Flow 静态类型检查方案
* TypeScript 语言规范与基本应用

## 类型系统

### 强类型与弱类型

以类型安全为维度划分，可以分为强类型和弱类型。

强类型：语言层面限制函数的实参类型必须与形参类型相同

```java
class Main {
  static void foo (int num) {
    System.out.println(num);
  }
  
  public static void main (String [] args) {
    Main.foo(100); // ok
    Main.foo('100'); // error "100" is s string
    Main.foo(Integer.parseInt('100')); // ok
  }
}
```

弱类型：弱类型语言层面不会限制实参类型

```js
function foo (num) {
  console.log(num);
}

foo(100); // ok
foo('100'); // ok
foo(parseInt('100')); // ok
```

这种强弱之分并不是某一个权威机构的定义，可能每个人都有自己不同的理解。但整体来说，界定方式基本都是描述强类型具有更强的类型约束，弱类型语言几乎没有什么约束。

**强类型语言中不允许有任意的隐式类型转换，而弱类型语言中则允许任意的数据隐式类型转换。**

变量类型允许随时改变的特点，并不是强弱类型的差异。

### 静态类型与动态类型

以类型检查为维度划分，可以分为静态类型与动态类型。

静态类型：一个变量声明时它的类型就是明确的。声明过后，它的类型不允许再修改。

动态类型：运行阶段才能够明确变量类型，而且变量的类型也可以随时发生变化。

```js
var foo = 100;

foo = 'bar'; // ok

console.log(foo);
```

动态类型语言中的变量没有类型，变量中存放的值是有类型的。

### 总结

从类型安全的角度来说，一般分为强类型和弱类型，两者之间的区别是是否允许存在任意的隐式类型转换。

从类型检查的角度来说，一般分为静态类型和动态类型，两者之间的区别是是否随时改变变量类型。

**弱类型就是动态类型，强类型就是静态类型这种说法是完全不正确的。两者是以不同的维护进行区分。**

## JavaScript 类型系统特征

JavaScript 是弱类型且动态类型的语言。语言本身的类型系统是非常薄弱的。

甚至可以说 JavaScript 并没有类型系统。JavaScript 是灵活多变的，但是也缺失了类型系统的可靠性。

在大规模应用下，JavaScipt 的弱类型且动态类型的优势就变成了短板。

## 弱类型的问题

运行阶段才能发现代码中的类型异常

```js
const obj = {};

obj.foo(); // obj.foo is not a function

setTimeout(() => {
  obj.foo(); // obj.foo is not a function
}, 1000);
```

类名不明确可能导致函数功能发生改变

```js
function sum (a, b) {
  return a + b;
}

console.log(sum(100, 100)); // 200
console.log(sum(100, '100')); // 100100
```

弱类型导致对象索引器的错误用法

```js
const obj = {};

obj[true] = 100;

console.log(obj); // { true: 100 }
console.log(obj['true']); // 100
```

> 君子约定有隐患，强制要求有保障。

## 强类型的优势

* 错误可以更早暴露
* 代码更加智能，编码更加准确（智能提示）

```js
function render (element) {
  element.className = 'container';
  element.innerHtml = 'hello world'; // 由于编辑器检测不出类型，所以不会给出提示
}
```

* 重构更可靠

* 减少不必要的类型判断

```js
function sum (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('arguments must be a number');
  }
  
  return a + b;
}
```

## Flow

### Flow 概述

Flow 是一个 JavaScript 的静态类型检查器。2014 年由 FaceBook 推出的一款工具。

使用它可以弥补 JavaScript 弱类型所带来的弊端。它可以为 JavaScript 提供更完善的类型系统。

React、Vue 源码中都可以见到 Flow 的使用。



```js
function square (n: number) {
  return n * n;
}
```



类型注解

```js
function sum (a: number, b :number) {
	return a + b;
}
```

类型注解可以通过 babel 或者官方提供的模块移除，不会影响生产环境代码。

Flow 并不要求给每一个变量添加类型注解，我们完全可以根据需求添加注解。相比较于 TypeScipt ，Flow 只是一个小工具，很简单。

### Flow 环境配置

```js
npm init -y
```

```js
yarn add flow-bin --dev
yarn flow init
```

```js
// @flow

function sum (a: number, b: number) {
  return a + b;
}

sum(100, 100);

sum('100', '100');
```

### Flow 编译移除注解

#### 官方推荐

```js
yarn add flow-remove-types --dev
```

```js
yarn flow-remove-types . -d dist
```

#### babel 配合 flow 转换插件

```js
yarn add @babel/core @babel/cli @babel/preset-flow --dev
```

.babelrc

```js
{
  "presets": ["@babel/preset-flow"]
}
```

```js
yarn babel src -d dist
```

### Flow 开发工具插件

VS - 查看 - 扩展 - Flow Language Support（Flow 官方提供的插件）。

插件支持情况：https://flow.org/en/docs/editors/

```js
// @flow

function sum (a: number, b: number) {
  return a + b;
}

sum(100, 100);

sum('100', '100');

sum('100', 100);
```

安装插件后直接在代码中就会提示错误，不用使用命令进行检测。代码保存后就会进行检测。

### Flow 类型推断

flow 插件可以进检测出类型，给予提示。

```js
// @flow

function square (n) {
  return n * n;
}

square('100');
```

### Flow 类型注解

```js
// @flow

function square (n: number) {
  return n * n;
}

square('100');


let num: number = 10;

num = 'string';


function foo (): number {
  return 'string';
}
```

```js
// @flow

function foo (): void {}
```

### Flow 原始类型

```js
// @flow

const a: string = 'foo';

const b1: number = 100;
const b2: number = NaN;
const b3: number = Infinity;

const c: boolean = true;

const d: null = null;

const e: void = undefined;

const f: symbol = Symbol();
```

### Flow 数组类型

```js
// @flow

const arr1: Array<number> = [1, 2, 3, 4];

const arr2: string[] = ['1', '2', '3', '4'];

const arr3: [string, number] = ['foo', 1]; // 固定长度的数组一般叫做元组
```

### Flow 对象类型

```js
// @flow

const obj1: { foo: string, bar: number } = { foo: 'string', bar: 100 };

const obj2: { foo?: string, bar: number } = { bar: 100 };

const obj3: { [string]: string | number } = {};

obj3.key1 = 'value1';
obj3.key2 = 100;
obj3.key3 = false;
```

### Flow 函数类型

```js
// @flow

function foo (callback: (string,number) => void) {
  callback('string', 100);
}

foo(function (a, b) { });
```

### Flow 特殊类型

```js
// @flow

const a: 'foo' = 'foo'; // 字面量类型

const type: 'success' | 'warning' | 'danger' = 'success'; // 联合类型

const b: string | number = 2;

type StringOrNumber = string | number;

const c: StringOrNumber = 'string';


// MayBe 类型
const gender1: ?number = null;
const gender2: ?number = undefined;
const gender3: ?number | null | void = undefined;
```

### Flow Mixed 与 Array

```js
// @flow

// Mixied 类型，可以接收任意类型的值，Mixied 代表所有类型联合类型
function passMixied (value: mixed) {}

passMixied('string');
passMixied(1);
passMixied(false);


// Any 类型也可以接收任意类型数据
function passAny (value: any) {}

passAny('string');
passAny(1);
passAny(false);
```

Any 是弱类型，Mixied 是强类型。相比来说，Any 是不安全的，开发中，尽量不要使用 Any 类型。

Any 类型存在的意义主要是为了兼容旧代码，很多陈旧代码可能会借助 JS 动态类型做一些特殊处理。

```js
// @flow

// Mixied 类型，可以接收任意类型的值，Mixied 代表所有类型联合类型
function passMixied (value: mixed) {
  value.substr(1); //语法报错
}

passMixied('string');
passMixied(1);
passMixied(false);


// Any 类型也可以接收任意类型数据
function passAny (value: any) {
  value.substr(1); // 语法不会报错
}

passAny('string');
passAny(1);
passAny(false);
```

使用 typeof 判断，可以使 Mixied 不发生语法错误，兼容多种类型。

```js
// @flow

function passMixied (value: mixed) {
  if (typeof value === 'string') {
    value.substr(1);
  }
  if (typeof value === 'number') {
    value * value;
  }
}

passMixied('string');
passMixied(1);
passMixied(false);
```

### Flow 类型总结

除了上面列举的类型外，Flow 还有很多类型，这里就不一一介绍了。

Flow 官网类型描述文档： https://flow.org/en/docs/types/

第三方类型手册：https://www.saltycrane.com/cheat-sheets/flow-type/latest/

### 运行环境 API

```js
// @flow

// HTMLElement 类型 存在 flow 创建临时目录中

const element: HTMLElement | null = document.getElementById('app'); // 浏览器环境 API 类型限制
```

JavaScript 标准库： https://github.com/facebook/flow/blob/master/lib/core.js

https://github.com/facebook/flow/blob/master/lib/dom.js

https://github.com/facebook/flow/blob/master/lib/bom.js

https://github.com/facebook/flow/blob/master/lib/cssom.js

https://github.com/facebook/flow/blob/master/lib/node.js

## TypeScipt 概述

TypeScript 是一门基于
