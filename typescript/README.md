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

### 概述

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

### 环境配置

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

### 编译移除注解

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

### 开发工具插件

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

### 类型推断

flow 插件可以进检测出类型，给予提示。

```js
// @flow

function square (n) {
  return n * n;
}

square('100');
```

### 类型注解

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

### 原始类型

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

### 数组类型

```js
// @flow

const arr1: Array<number> = [1, 2, 3, 4];

const arr2: string[] = ['1', '2', '3', '4'];

const arr3: [string, number] = ['foo', 1]; // 固定长度的数组一般叫做元组
```

### 对象类型

```js
// @flow

const obj1: { foo: string, bar: number } = { foo: 'string', bar: 100 };

const obj2: { foo?: string, bar: number } = { bar: 100 };

const obj3: { [string]: string | number } = {};

obj3.key1 = 'value1';
obj3.key2 = 100;
obj3.key3 = false;
```

### 函数类型

```js
// @flow

function foo (callback: (string,number) => void) {
  callback('string', 100);
}

foo(function (a, b) { });
```

### 特殊类型

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

### Mixed 与 Array

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

### 类型总结

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

## TypeScript

### 概述

TypeScript 是一门基于 JavaScript 基础之上的编程语言，是 JavaScript 的超集（扩展特性）。

Angular / Vue 3.0 都已经使用 TypeScript。

#### 优点

* 避免开发过程中可能出现的类型异常、提高编码效率以及代码可靠程度
* TypeScript 可以用来转换 ES 的新特性，而不是使用 babel 进行转换，最低可以编译 ES3 版本代码
* 任何一种 JavaScript 运行环境都支持，TypeScript 最终也会编译成 JavaScript 代码
* 相对于 Flow，TypeScript 的功能更为强大，生态也更健全、更完善
* TypeScript 属于渐进式，可以随着学习进一步使用

#### 缺点

* 语言本身多了很多概念，接口、泛型、枚举等
* 项目初期，TypeScript 会增加成本，早期会编写很多类型声明

### 环境配置

初始化项目

```js
yarn init --yes
```

安装 typescript 模块，提供 tsc 命令

```js
yarn add typescript --dev
```

```js
const hello = name => {
  console.log(`Hello ${name}`)
}

hello('TypeScript');
```

执行编译命令

```js
yarn tsc index.ts
```



VsCode 自带类型检查

```js
const hello = (name: string) => {
  console.log(`Hello ${name}`)
}

hello(123);
```

### 配置文件

生成配置文件

```js
yarn tsc --init
```

修改配置文件

```js
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                                   /* Specify library files to be included in the compilation. */
    // "allowJs": true,                             /* Allow javascript files to be compiled. */
    // "checkJs": true,                             /* Report errors in .js files. */
    // "jsx": "preserve",                           /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    // "declaration": true,                         /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                      /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true,                           /* Generates corresponding '.map' file. */
    // "outFile": "./",                             /* Concatenate and emit output to single file. */
    "outDir": "dist",                              /* Redirect output structure to the directory. */
    "rootDir": "src",                             /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                           /* Enable project compilation */
    // "tsBuildInfoFile": "./",                     /* Specify file to store incremental compilation information */
    // "removeComments": true,                      /* Do not emit comments to output. */
    // "noEmit": true,                              /* Do not emit outputs. */
    // "importHelpers": true,                       /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,                  /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,                     /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                                 /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                       /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                    /* Enable strict null checks. */
    // "strictFunctionTypes": true,                 /* Enable strict checking of function types. */
    // "strictBindCallApply": true,                 /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,        /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                      /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                        /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                      /* Report errors on unused locals. */
    // "noUnusedParameters": true,                  /* Report errors on unused parameters. */
    // "noImplicitReturns": true,                   /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,          /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,            /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                  /* Ensure overriding members in derived classes are marked with an 'override' modifier. */
    // "noPropertyAccessFromIndexSignature": true,  /* Require undeclared properties from index signatures to use element accesses. */

    /* Module Resolution Options */
    // "moduleResolution": "node",                  /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                             /* Base directory to resolve non-absolute module names. */
    // "paths": {},                                 /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                              /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                             /* List of folders to include type definitions from. */
    // "types": [],                                 /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,        /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,                    /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,                /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                            /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                               /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                     /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                       /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}
```

运行命令

```js
yarn tsc
```

### 原始类型

```js
// 相比较于 Flow，ts 这三种原始类型允许为空，可以赋值为 null 或者 undefined
const a: string = 'foo';
const b: number = 100; // NaN、Infinity
const c: boolean = false; // true

// 严格模式下不能赋值为空
const d: string = null;

// 严格模式下只能是 undefined
const e: void = undefined; // null、undefined

const f: null = null;

const g: undefined = undefined;

// 直接声明会报错
const h: symbol = Symbol();
```

### 标准库声明

Symbol 是 JavaScript 内置的标准对象，是 ES6 新增的。

```js
const h: symbol = Symbol(); // 直接声明会报错
```

对于配置文件 target 是 es5 的情况，只有引入 es5 的标准库，只有将 target 设置为 es6，才会引入 es6 的标准库。

任何一个在 ES6 新增的对象，直接使用也会报错，比如 Promise。解决这个问题的方法有两种。

* 修改 target 为 es2015，默认标准库会引入 es6 标准库
* 配置 lib 选项，手动引入 es6 标准库和其他标准库

```js
{
  "compilerOptions": {
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["ES2015", "DOM"],                                      /* Specify library files to be included in the compilation. */
  }
}
```

标准库就是内置对象所对应的声明文件。

### 中文错误消息

ts 可以显示中文错误信息，默认支持多语言。

```js
yarn tsc --locale zh-CN
```

vscode 中的错误消息，可以配置 typescript locale，设置为 zh-CN。



虽然 ts 和 vscode 都可以设置中文错误消息，但是并不推荐这样做，很多情况下对于一些不理解错误，我们会使用 chrome 这类的搜索引擎搜索相关错误，如果使用中文提示的内容，很难搜索到相关问题。

### 作用域问题

两个文件定义同一变量会报错。有两种方式可以解决。

第一种

```js
(function () {
  const a: string = "foo";
})();
```

第二种

```js
const a = 123;

export {};
```

### Object 类型

TypeScript 中的 Object 类型并不仅指对象类型，而是泛指所有的非原始对象，即对象、数组、函数。

```js
const foo: object = {}; // {}、array、function () {}
```

对象的定义可以使用字面量的方式，更好的方式是使用接口。

```js
const obj: { foo: number, bar: number } = { foo: 1, bar: 2 }; // 对象类型，类型结构完全一致
```

### 数组类型

```js
const arr: Array<number> = [1, 2, 3, 4];

const arr2: number[] = [1, 2, 3];

function sum (...args: number[]) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

sum(1, 2, 3, 4);
```

### 元组类型

元组类型是一种特殊的数据结构，元组就是一个明确元素数量及元素类型的数组。

```js
const tuple: [number, string] = [18, 'foo'];

const tuple2: [number, string] = [18, 'foo', 1]; // 报错


const age = tuple[0];
const name = tuple[1];

const [v1, v2] = tuple;

export {}; // 确保跟其他实例没有成员冲突
```

### 枚举类型

* 枚举类型可以给一组数据分别起一个别名
* 一个枚举中只会存在固定的值，不存在超出范围的可能性

```js
// const PostStatus = {
//   Draft: 0,
//   Uppublished: 1,
//   Published: 2
// }

// enum PostStatus {
//   Draft =  0,
//   Uppublished = 1,
//   Published = 2
// }

// 数字枚举会自动在前者基础上加一
// enum PostStatus {
//   Draft = 0,
//   Uppublished,
//   Published
// }

enum PostStatus {
  Draft = 'foo',
  Uppublished = 'bar',
  Published = 'ccc'
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of JavaScript.',
  status: PostStatus.Draft
}
```

枚举类型会入侵运行时代码，影响编译结果，不会被移除掉

```js
enum PostStatus {
  Draft = 'foo',
  Uppublished = 'bar',
  Published = 'ccc'
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of JavaScript.',
  status: PostStatus.Draft
}
```

=> 

```js
var PostStatus;
(function (PostStatus) {
    PostStatus["Draft"] = "foo";
    PostStatus["Uppublished"] = "bar";
    PostStatus["Published"] = "ccc";
})(PostStatus || (PostStatus = {}));
var post = {
    title: 'Hello TypeScript',
    content: 'TypeScript is a typed superset of JavaScript.',
    status: PostStatus.Draft
};
//# sourceMappingURL=index.js.map
```

常量枚举不能使用下标访问，编译后会被移除掉

```js
// 枚举，可以用下标访问
enum PostStatus {
  Draft = 'foo',
  Uppublished = 'bar',
  Published = 'ccc'
}

// 常量枚举不能使用下标访问
const enum PostStatus2 {
  Draft = 'foo',
  Uppublished = 'bar',
  Published = 'ccc'
}

PostStatus[0];
PostStatus2[0];
```

### 函数类型

```js
function func1 (a: number, b: number): string {
  return  'func';
}

function func2 (a: number, b?: number): string {
  return  'func';
}

function func3 (a: number, b: number = 2): string {
  return  'func';
}

function func4 (a: number, b: number = 2, ...rest: number[]): string {
  return  'func';
}


const func5: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'func';
}
```

### 任意类型

any 类型属于动态类型，特点和普通 JavaScript 对象是一致的。

```js
function stringify (value: any) {
  return JSON.stringify(value);
}

stringify('string'); 
stringify(0); 
stringify(true); 
```

typescript 不会对 any 进行类型检查，这也意味着我们仍然可以像原生 JS 那样调用任意成员，语法上不会报错。

```js
let foo: any = 'string';

foo = 100;
```

### 隐式类型推断

不推荐使用，尽可能添加类型。

```js
let age = 18; // 类型推断为 number 类型

age = 'string'; // 报错，age 为 number 类型


let foo; // 如果 typescript 无法推断出类型，就会标记为 any
```

### 类型断言

类型断言并不会类型转换，类型转换是代码运行时的概念，类型断言是代码编译时的概念，编译后会移除。

```js
const nums = [110, 120, 119, 112];

const res = nums.find(i => i > 0);

// const sequare = res * res;

const num1 = res as number;
const num2 = <number>res; // 类型断言的另一种方式，编写 JSX 时会与标签产生冲突，推荐使用第一种
```

### 接口

规范或者契约，用来约定对象结构。

```js
interface Post {
  title: string;
  content: string;
}

function printPost (post: Post) {
  console.log(post.title);
  console.log(post.content);
}

printPost({
  title: 'Hello TypeScript',
  content: 'a javascript superset'
})
```

可选成员、只读成员

```js
interface Post {
  title: string;
  content: string;
  subtitle?: string; // 可选
  readonly summary: string; // 定义后不能再次修改
}

function printPost (post: Post) {
  console.log(post.title);
  console.log(post.content);
}

const hello = {
  title: 'Hello TypeScript',
  content: 'a javascript superset',
  summary: ''
};

const hello2 = {
  title: 'Hello TypeScript',
  content: 'a javascript superset',
  subtitle: 'typescipt',
  summary: ''
};
```

动态成员

```js
interface $Cache {
  [key: string]: string;
}

const cache: $Cache = {};

cache.foo = 'foo';
```

### 类

