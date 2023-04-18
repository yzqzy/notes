# TypeScript

## 01. 类型的重要性

类型的思维方式在函数式和面向对象是高度统一的。

### 关于类型的思考

**1. 分类思维：什么是什么？**

* Integer/Strings is Comparable
* Array is Enumerable
* React.ComponentType is not React.ComponentClass

```typescript
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>0
```

**2. 类型映射**

* 可以转换：ComponentClass => Component
* 因此： `Array<ComponentClass>` => `Array<Component />`

**3. 类型演化**

* 开始时：React 组建是 ComponentClass，现在是 ElementType，因为 ElementType 不仅仅有 ComponentClass
* 开始时：Skedo 渲染的基本单位是 Node，后来是 Node | LinkedNode，再后来是 NodeType

**通过类型的演进不断让系统进化（领域驱动开发最核心的理念）。**

### 类型是检查利器

每次类型检查都可以帮助减少程序错误。

设计的好的类型系统可以做到编译时检查通过既可上线，虽然可能仍存在一些小问题。

### 总结

* 类型是人的思考方式，类型可以帮助人思考（好的程序设计可以帮助人更好的思考）；
* 类型可以帮助检查错误（减少 90% 以上的运行时 bug，编写完即上线）；
* 类型可以帮助系统演进。

## 02. TS 介绍

 2012 年微软发布的一门编程语言。发布时就提供了将 TypeScript 翻译到 JS 的翻译编译器（transcompiler）。

* TypeScript 是 JS 的一个超集；
* TS 同时支持 Client Side 和 Server Side；
* TS 是一个多范式语言；
* TS 同时支持 Duck Typing，Gradual Typing 和 Strict Typing。

 学习目标

* 理解 TS 的原理（编译时、运行时）
* 掌握常见用法
  * 阅读源码水平
  * 编写 TS 程序
* 能够帮助团队成员配置 TS
* 熟悉 TS 生态

> 如果你不能给团队成员讲 TS，那就是没有学会。

## 03. 环境配置

### 基础配置

#### 概要

* ts-node
* tsc
* t s config.json
* vscode
* 和 webpack 搭配使用

#### ts-node

Node 环境的 typescript 解释执行器。REPL（Read eval print loop）。

```bash
npm i -g ts-node
# yarn global add ts-node
```

使用 ts-node 执行文件

```bash
ts-node smoe.ts
```

#### 配置文件

tsconfig.json

```json
{
  "compilerOptions": {}
}
```

#### tsc

一个 ts 的编译器。

```bash
npm i -g tsc
# yarn global add tsc
```

可以指定编译某个 ts 文件：

```bash
tsc hello.ts
```

也可以通过 tsconfig.json 配置。

* 可以用 outDir 配置项配置 js 文件输出的位置；
* tsc 作为一个指令，可以用 --help 查看用法；
* 可以用 module 指定生成模块的类型。

当存在 tsconfig.json 时，可以在项目根目录下可以直接运行 tsc 命令对文件进行编译。

```json
{
  "compilerOptoins": {
    "outDir": "dist"
  }
}
```

#### 与 webpack 搭配使用

初始化项目

```bash
mkdir ts-webpack
cd ts-webpack
npm init -y
```

安装依赖

```bash
npm install webpack webpack-cli ts-loader typescript --save-dev
# yarn add webpack webpack-cli ts-loader typescript 
```

编写测试文件

```typescript
// src/index.ts

export class TreeNode<T> {
  left: TreeNode<T>
  right: TreeNode<T>
  data: T

  constructor(data: T) {
    this.data = data
  }
}

function log(x) {
  console.log(x)
}

const node = new TreeNode<number>(100)

log(node.data)
```

编写 webpack 配置文件

```js
// webpack.config.js

const path = require('path')

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

编写 npm 脚本

```json
{
  "name": "ts-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start:dev": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.5",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1"
  }
}
```

运行测试脚本

```bash
yarn start:dev
node dist/bundle.index.js
```

### 进阶配置

#### 概要

* react + ts-loader 配置
* react + babel 配置
* vue + vue-loader 配置
* vue + babel 配置

核心问题：preset 的顺序有关系吗？preset 的作用是什么？

#### react + ts-loader

安装 npm 包

```bash
pnpm i react react-dom
```

```bash
pnpm i @types/react @types/react-dom --save-dev
```

```bash
pnpm i awesome-typescript-loader --save-dev
```

> ts-loader 已经安装过，这里不再安装。

```bash
pnpm i webpack-dev-server html-webpack-plugin -D
```

编写 react 文件

```tsx
// src/ReactHello.tsx

import React from 'react'
import ReactDOM from 'react-dom'

const App: () => JSX.Element = () => {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

编写 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "esModuleInterop": true, // 支持多套编码风格
    "jsx": "react" // react, div => React.createElement
  }
}
```

编写 template 模板文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

编写 webpack.react.js 文件

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/ReactHello.tsx'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    })
  ]
}
```

编写测试脚本

```bash
"scripts": {
  "start:dev": "webpack",
  "start:react": "webpack --config webpack.react.js"
}
```

运行测试脚本

```bash
yarn start:react
```

这样运行命令并不会启动开发服务器，我们需要修改 scripts 脚本。

```bash
"scripts": {
  "start:dev": "webpack",
  "start:react": "webpack server --config webpack.react.js"
}
```

重新运行脚本，就可以看到开发服务器被启动，可以正常访问。

#### react + babel preset

babel-preset 和 ts-loader 的区别是什么？

* babel 作用

  * The Compiler for next generation Javascript
  * 所有编译 JS 的事情，babel 都干
  * es6 => es5 => es3 => polyfill

* 缓存 + 优化

* 插件 + 生态

两者本质区别不大，不过从生态和优化上来看，babel 更优。

**babel-loader 背后是 babel，ts-loader 背后是 tsc 编译器。**

```bash
pnpm i babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript --save-dev
```

 Babel 有两套机制，一套是 preset，一套是 plugin。我们可以认为 preset 是 plugin 的集合，其实就是预选项的概念。

编写 webpack.react.withbabel.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// ...
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react', // 不使用 ts-loader 的情况下，需要使用
              '@babel/preset-env'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
	// ...
}
```

编写 scripts 脚本

```json
{
   "scripts": {
    "start:dev": "webpack",
    "start:react": "webpack server --config webpack.react.js",
    "start:babel": "webpack server --config webpack.react.withbabel.js"
  }
}
```

#### vue + loader

增加 vue 依赖

```bash
pnpm i vue@next -D
pnpm i @vue/compiler-sfc -D

pnpm i vue-loader -D
```

> sfc：Single File Component，单文件组件

编写 vue sfc 及 bootstraper

```vue
<template>
  <h1>Hello Vue!</h1>
</template>

<script lang="ts">
export default {
  setup() {
    return {}
  }
}
</script>
```

```typescript
// src/main.ts

import { createApp } from 'vue'
import HelloVue from './VueHello.vue'

createApp(HelloVue).mount('#root')
```

```typescript
// src/shims-vue.d.ts

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

vue 需要增加 shims-vue.d.ts 文件，否则 main.ts 中引入 .vue 文件会报错。

> shim（垫片），通常为了处理兼容而命名。上面这个 shim 的目标是让 vscode 和 webpack 知道 .vue 的文件可以被当作一个组件定义文件来使用。

编写 webpack.vue.js 文件

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    index: './src/main.ts'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        options: {
          // 无法识别 vue 转换的 ts 文件，需要配置该规则添加后缀
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    }),
    new VueLoaderPlugin()
  ]
}
```

编写 script 脚本

```json
{
  "scripts": {
    "start:dev": "webpack",
    "start:react": "webpack server --config webpack.react.js",
    "start:babel": "webpack server --config webpack.react.withbabel.js",
    "start:vue": "webpack server --config webpack.vue.js"
  }
}
```

#### vue + babel preset

安装依赖

```bash
pnpm i babel-preset-typescript-vue3 -D
```

编写 webpack.vue.withbabel.js 文件

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    index: './src/main.ts'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', 'babel-preset-typescript-vue3', '@babel/preset-typescript']
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    }),
    new VueLoaderPlugin()
  ]
}
```

编写 script 脚本文件

```json
{
  "scripts": {
    "start:dev": "webpack",
    "start:react": "webpack server --config webpack.react.js",
    "start:react-babel": "webpack server --config webpack.react.withbabel.js",
    "start:vue": "webpack server --config webpack.vue.js",
    "start:vue-babel": "webpack server --config webpack.vue.withbabel.js"
  }
}
```

### 技术拓展

**Babel preset 执行顺序有关系吗？**

存在顺序关系，真正执行时可能存在多种执行顺序。

**preset-react 和 preset-vue 的作用是什么？**

@babel/preset-react：集成更多的 plugin，让我们可以使用，其实就是一个 plugin 包。

Preset-typescript-vue3 只增加了 typescript 的转换能力。

**实战建议**

实际开发时，还是推荐使用官方脚手架 react-create- app、vue 或者 vite。

我们学习环境配置只是作为架构师的一项基本技能。当你架构项目时，我们需要的是一个成熟的脚手架，推荐使用第三方的工具。

## 04. 日常类型

### 基础类型

string, number, boolean, null, undefined

### 数组类型

`Array<T>` ，T 代表数组中的元素类型。

**为什么要求数组中元素类型统一？优势是什么？**

这个优势其实在于我们百分之99的需求，我们使用数组的时候，通常也是一个类型。

```typescript
function useState(x) {
  return [x, setState]
}
```

这种情况我们才会有数组中不同类型的需求，但是这样本身也不是当作数组来用。在编程领域这样叫做记录，是当作值类型在用。

### any/unknown/noImplictAny

```typescript
let obj: any = { x: 0 }
// any 屏蔽了所有类型检查，相当于你对程序的理解是高于 TS，不需要检查

obj.foo()
obj()
obj.bar = 100
obj = 'hello'
const n: number = obj
```

> Implict：隐式、explict：显式

配置项：noImplictAny，建议开启。

* 当不给变量声明类型时，如果  noImplictAny = false，那么他就是 any；
* 如果 noImplictAnt = true，就会报错。

```typescript
function foo(x) {
	console.log(x)
}

// =>

function foo(x: number) {
  console.log(x)
}
```

起初 ts 中没有 unknown 类型，是后来新加的类型。

```typescript
let x: unknown = 1

x = true

let y: string = x // 不能将类型“unknown”分配给类型“string”。
```

通常情况下，我们需要使用 any 的地方，使用 unknown 就足够了。

**为什么要提供 unknown 类型？**

unknown 其实是 any 的替代品，它是一个类型安全的 any 的替代品。unknown 的值可以随便设置，但是将 unknown 赋值给别的值就会报错。  把一个 unknown 赋值给其他值本身也是一个比较危险的事情。

### 类型标注

使用 `:` 用于类型标注。

```typescript
let myName01: string = 'Alice'
let myName02 = 'Alice' // 类型推断是 string
```

### 函数

```typescript
function greet(name: string): number {
  console.log(`Hello, ${name.toUpperCase()} !!`)
}
greet(42) // Error

let x: string = greet('omg') // Error
```

```typescript
const names = ['Alice', 'Bob', 'Eve']
names.forEach(s => {
  console.log(s.toUpperCase())
  // typescript 会根据上下文类型推测类型
})
```

```typescript
function print(arg1: string, arg2?: string) {
  console.log(arg1, arg2)
}

print('hello', 'world')
print('hello')
```

### 对象类型

对象如果描述类型也需要严格执行。

```typescript
const pt: {
  x: number
  y: number
} = { x: 100, y: 100 }

pt.z = 1998 // Error
```

可选项：

```typescript
function printName(obj: { first: string; last?: string }) {}

printName({ first: 'Bob' })
printName({ first: 'Alice', last: 'Alisson' })
```

`?` 表达式：`?` 代表可能是 undefined，但是安全很多。

```typescript
const o: {
  a: string
  b?: {
    c: string
  }
} = { a: '1' }

// console.log(o.b.c) // Cannot read properties of undefined (reading 'c')
console.log(o.b?.c) // undefined

o.b.c = 'Hello' // Error
```

### 联合类型

所谓联合类型，就是多个类型组合成一个新的类型。

`|` 取自于 IFSTMT，即 if {} | if {} else {}，其实是或的关系。

```typescript
function printId(id: number | string) {
  console.log("your id is：" + id)
}

printId(101)
printId("202")
printId({ id: 303 }) // Error
```

联合类型只能使用两个类型的公共操作。

```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase())
  // 类型“string | number”上不存在属性“toUpperCase”。类型“number”上不存在属性“toUpperCase”。
}
```

ts 会针对联合类型做排除法，其实这是类型守卫的一种实现，用于窄化类型。

```typescript
function printId(id: number | string) {
  if (typeof id === 'number') {
    console.log(id)
    return
  }
  console.log(id.toUpperCase())
}
```

### 类型别名

别名可以理解成字符串的查找和替换。

```typescript
type Point = {
  x: number
  y: number
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })
```

类型别名也可以使用联合：

```typescript
type ID = number | string
```

别名只是 “别名”，不是一种类型：

```typescript
let x: ID = 100
typeof x // number
```

别名也可以和它代表的类型一起工作（别名并不是创建新的类型）

```typescript
let id: ID = 'abc'
id = 456 // ok
```

### 接口

```typescript
interface Point {
  x: number
  y: number
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })
```

interface 与 type 有很多相似之处，但是它作为一个接口，也承担着一些特殊的含义在里面。

```typescript
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear()

bear.name
bear.honey

// ----------

type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}

const bear = getBear()

bear.name
bear.honey
```

两者看起来实现效果基本一样，但是在语义上是不同的，interface 是继承，type 是类型组合。

**接口的声明合并（Declaration Merging）**

```typescript
interface Box {
  width: number
  height: number
}
interface Box {
  scale: number
}

const box: Box = { width: 5, height: 10, scale: 3 }
```

如果接口被定义两次并不是覆盖，而是合并的关系。

### 类型断言（assertion）

```tsx
const canvas = document.getElementById("main_canvas") as HTMLCanvasElement
```

通常 ts 会接收 “说的通” 的类型断言，但是有的类型断言 ts 会拒绝。

```typescript
const x = "hello" as number
// 类型 "string" 到类型 "number" 的转换可能是错误的，因为两种类型不能充分重叠。
// 如果这是有意的，请先将表达式转换为 "unknown"。
```

你可以使用 any as T 来 “欺骗” TS：

```typescript
const a = (expr as unknown) as T
```

> as 并不是类型的转化，其本质还是类型断言。

### 字面类型

对于常量，在 TS 中实际上是 Literal Type。

```typescript
const someStr = "abc"
// someStr 的类型是 “abc”，它的值只能是 abc

const foo = 1
// foo 的类型是 1（不代表是整数）

// 对于 ts 理解是这样，如果我们使用 typeof 操作符也可以得到正确的结果
// typeof someStr // 'string'
// typeof foo // 1

// 对于 let
let foo = 1 // foo: number
```

> const 和 let 对于 ts 来说，其实是区分对待的，const 定义的数据对于 ts 来说其实就是一种类型，所以不能修改。

我们可以用字面类型来约束一些特殊的函数，比如：

```typescript
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1
}
```

下面是一个更贴近真实场景的案例：

```typescript
interface Options {
  width: number
}

function configure(x: Options | 'auto') {
  // ...
}

configure({ width: 100 })
configure('auto')
configure('automatic') // 类型“"automatic"”的参数不能赋给类型“Options | "auto"”的参数。
```

字面类型可以起到纠正参数的作用。

**字面类型的坑：**

```typescript
function handleRequest(url: string, method: 'GET' | 'POST') {
  // do ...
}

const req = { url: 'https://example.com', method: 'GET' }
handleRequest(req.url, req.method)
// 类型“string”的参数不能赋给类型“"GET" | "POST"”的参数。
// 这里提示是正确的，method 是字面量类型，但是我们定义的 req 中的 method 是字符串类型，而且还有可能被修改成别的值
```

我们可以这样解决：

```typescript
const req = { url: 'https://example.com', method: 'GET' as 'GET' }
handleRequest(req.url, req.method)
```

or

```typescript
const req = { url: 'https://example.com', method: 'GET' }
handleRequest(req.url, req.method as 'GET')
```

or

```typescript
const req = { url: 'https://example.com', method: 'GET' } as const
handleRequest(req.url, req.method)
```

### null/undefined

null 和 undefined 是 JavaScript 的两种基础类型（Primtive type），它们描述的是不同的行为：

* undefined 是一个没有被分配值的变量
* null 是一个被人为分配的空值

TypeScript 有一个配置项，叫做 strictNullChecks，这个配置项设置为 `on` 的时候，在使用有可能是 null 值时，需要显式检查。

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase())
  }
}
```

另外，我们可以用 `! `操作符，来断言某个值不是空值：

> ! 代表非空断言。

```typescript
function doSomething(x: string | null) {
  console.log("Hello, " + x!.toUpperCase())
}
```

### 枚举类型

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

枚举类型最后会被翻译成整数，因此枚举的很多性质和整数相似。

比如 Down.toString() 会返回 2，而不是 Down。正因为如此，枚举类型的效率很高。

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

console.log(Direction.Up) // 1
```

如果你想 ts 返回字符串，还可以像这样做。这样叫做反向映射。

```typescript
console.log(Direction[Direction.Up]) // Up
```

当然如果你想用字符串类的枚举，就需要显示的为每一项赋值，不过这样意义并不大，因为 enum 已经提供了反向操作的方式。

```typescript
enum Direction {
  Up = 'UP',
  Down = "Down",
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

我们还可以混合使用，不过这样不仅没有意义，而且还会减少代码可读性。

```typescript
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES'
}
```

在运行时，Enum 会被解释成对象，Enum 的每项都会被解释成常数。例如下面这个例子：

```typescript
enum E {
  X,
  Y,
  Z
}

function f(obj: { X: number }) {
  return obj.X
}

console.log(f(E)) // 0
```

可以用下面这个语法提取 Enum 中的字符串，这个也叫 Reverse Mapping。刚才我们也提到过。

```typescript
console.log(E[E.X]) // X
```

## 05. 泛型

### 泛型概念

泛型，可以说是提取了一类事物的共性特征的一种抽象。比如说，松树、柳树都是树，在程序里有 3 种表达：

* 接口（Interface）
* 继承（Ineritance）
* 泛型（Generics）

**继承是一种强表达。**

松树继承于树，松树同时也是木材。这样关系的表达，可以让松树多重继承（树、木材），要么松树 < 树 < 木材。

无论哪种，增加程序设计复杂度，也加强了继承关系的维护成本（或者说耦合）。这样看，关系太强，其实并不好。

**接口是一种方面（Aspect）描述**。比如松树可以生长，那么松树是：Growable；动植物都可以进化，那么它们是 Evolvable。

一个类型可以拥有多个方面的特性：

**泛型（Generics）**是对共性的提取（不仅仅是描述）。

```typescript
class BedMaker<t> {
  make() {}
}

const A = new BedMaker<红木>()
const B = new BedMaker<桃木>()
```

* 木头可以制造床，但不是所有的木头都可以制造床；
* 制造床这个方法，放进木头类中就会很奇怪，因为木头不仅仅可以制造床；
* 同理，让木头继承于 “可以制造床” 这个接口也很奇怪。

```typescript
// 奇怪的代码展示

class 红木 implements IMakedBed {
  makeBed() { ... }
}
```

设计 `IMakedBed` 的目标是为了拆分描述事物不同的方面（Aspect），还有一个更专业的词汇 - 关注点（Interest Point）。拆分关注点的技巧，叫做关注点分离。如果仅仅用接口，不用泛型，那么关注点就没有做到完全解耦。

**泛型是一种抽象共性（本质）的编程手段，它允许将类型作为其他类型的参数（表现形式），从而分离不同关注点的实现（作用）**。

* `Array<T>` 分离的是数据可以被线性访问、存储的共性。

* `Stream<T>` 分离的是数据可以随着时间产生的共性。
* `Promsie<T>` 分离的是数据可以被异步计算的特性。

### Hello 泛型

```typescript
// 一个 identity 函数是自己返回自己的函数
// 可以声明它是：number - number
function identity(arg: number): number {
  return arg
}

// 为了可以让 identity 支持更多类型，可以声明它是 any
function identity(arg: any): any {
  return arg
}

// any 会丢失后续所有的检查，这时我们可以考虑使用泛型
function identity<Type>(arg: Type): Type {
  return arg
}

let output = identity<string>("MyString")
// 不同显示的指定 <> 中的类型
// let output = identity("MyString")

output = 100 // Error
```

`<>` 叫做钻石操作符，代表传入的类型参数

### 泛型类

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType
  add: (x: NumType, y: NumType) => NumType
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}

let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = function (x, y) {
  return x + y
}
```

推荐将声明（Declaration）和定义（Definition）写到一起：

```typescript
class GenericNumber<T> {
  private zeroValue: T

  constructor(v: T) {
    this.zeroValue = v
  }

  public add(x: T, y: T) {
    return x + y
  }
}
```

### 泛型约束（Generic Constraints）

下面的程序会报错：

```typescript
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length)
  // 类型“Type”上不存在属性“length”。
  return arg
}
```

我们可以考虑为 arg 增加约束：

```typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length)
  return arg
}
```

我们还可以用 keyof 关键字作为泛型约束：

```typescript
type Point = { x: number; y: number }
type P = keyof Point // “x” | “y”
```

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

const x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a')
getProperty(x, 'm') // 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数
```

不过 ts 为什么可以这么做？因为对 TS 而言所有对象的 key 都是静态的。

```typescript
const a = { x: 1, y: 2 }
a.z = 3 // Error
```

因为是静态的，所以可以用 keyof 操作符求所有的 key。如果一个对象的类型是 any，那么 keyof 也就没有意义了。

### 实例化泛型类型（将类作为参数）

```typescript
function create<Type>(c: { new (): Type }): Type {
  return new c()
}

create(Foo) // Foo 的实例
```

不错的例子：

```typescript
class BeeKeeper {
  hasMask: boolean = true
}

class ZooKeeper {
  nametag: string = 'Mike'
}

class Animal {
  numLegs: number = 4
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper()
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
```

### 总结

**什么时候用接口？什么时候用泛型？**

接口是用来约束一个类型的行为；泛型实在提取某些共性，做成类似模板一样的语法，将共性抽象成泛型。

**将类型作为参数传递，并实例化有哪些应用场景？**

例如 React.createClass("")，其实应用场景也有很多。

## 06. 类型窄化

TS中的类型是可以组合使用的。

### 联合和窄化

```typescript
type Padding = number | string

function padLeft(padding: Padding, input: string): string {
  // ...
}
```

当我们编写上述代码会遇到一个问题，我们需要用 typeof 判断 padding 的类型。

当然作为一个 number | string 的联合类型可以赋值成 number 或者 string。

```typescript
let x: number | string = 1
x = 'Hello'
```

如果不判断：

```typescript
function padLeft(padding: number | string, input: string) {
  return new Array(padding + 1).join(' ') + input
  // 运算符“+”不能应用于类型“string | number”和“number”。
}
```

于是我们可以增加 typeof 的判断：

```typescript
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input
  }
  return padding + input
}
```

当进行 `if + typeof` 操作后，ts 可以识别变窄后的类型，称为窄化（Narrowing）。上面 Narrowing 的能力，可以让 TS 清楚的知道 padding 是数字还是字符串。

在实现层面，TS 会认为 `typeof padding = "number"` 。这样的表达式是一种类型守卫（type guard）表达式。 当然这是纯粹实现层面的概念，准确来说是 `if + type guard` 实现了 Narrowing。

**类型窄化（Type Narrowing）根据类型守卫（Type Guard）在子语句块重新定义更具体的类型。**

### typeof 守卫

```typescript
// 返回值
"string"
"number"
"bigint"
"boolean"
"symbol"
"undefined"
"object"
"function"
```

注意，因为 `typeof null === 'object'`。因此：

```typescript
function printAll(strs: string | string[] | null) {
  if (typeof strs === 'object') {
    for (const s of strs) {
      // Object is possibly 'null'
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    console.log(strs)
  } else {
    // do nothing
  }
}
```

### 真值窄化

真值窄化（Truthiness narrowing）。

Javascript 有一张复杂的真值表，总结下来这些值都会拥有 false 的行为：

```typescript
0
NaN
"" （the empty string）
0n  (the bigint version of zero)
null
undefined
```

我们也可以通过真值实现窄化。例如我们可以避免：TypeError：null is not iterable 错误。

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      // Object is possibly 'null'
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    console.log(strs)
  } else {
    // do nothing
  }
}
```

再举个例子：

```typescript
function multiplyAll(values: number[] | undefined, factor: number) {
  if (!values) {
    return values
  }
  return values.map(x => x * factor)
}
```

**真值（Truthiness narrowing）窄化可以帮助我们更好的应对 null/undefined/0 等值**。

### 相等性窄化

在窄化中有一类隐式的窄化方法，就是想等性窄化。`===`，`!==`，`==` 和 `!=` 都可以用来窄化类型。例如：

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // s is string
  } else {
    // x is string | number
    // y is string | boolean
  }
}
```

再看一个例子：

```typescript
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === 'object') {
      for (const s of strs) {
      }
    } else if (typeof strs === 'string') {
    }
  }
}
```

```typescript
interface Container {
  value: number | null | undefined
}

function multiplyValue(container: Container, factor: number) {
  if (container.value != null) {
    container.value *= factor
  }
}
```

### in 操作符窄化

in 操作符的作用是检验对象中是否有属性。

```typescript
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}
```

不过我们为什么不用 `instaceof Fish` ？因为 type 没有运行时，代码转化后就不存在了。

### instanceof 窄化

`instanceof` 也可以做窄化，不过类型不能是 type，而是真实存在的 Function 类型。

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // s is Date
  } else {
    // x is string
  }
}
```

### 组合类型推导

有时候 TypeScript 会推导出组合类型。

```typescript
let x = Math.random() < 0.5 ? 10 : 'hello world!'
```

这个时候 x 是 `number | string`。当然，这里有个问题是 `number | string`  的类型可以赋值成 `number`  或者 `string`。

**控制流分析**

TypeScript 是如何做到类型窄化的？

首先在语法分析阶段，Typescrpt 的编译器会识别出类型卫兵表达式。包括一些隐性的类型卫兵，比如真值表达式、instaceof 等等。然后在语法分析的时候，Typescript 遇到控制流关键字 `if/while` 等，就会看看这里有没有需要分析的窄化操作。例如：

```typescript
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input
  }
  return padding + input
}
```

* 首先 ts 会看到一个卫兵表达式：`typeof padding === 'number'`；
* 然后 ts 会对返回值 `return padding + input` 以及 `return new` 分别做窄化；
* 窄化的本质是重新定义类型。

很多语句都会触发窄化：

```typescript
function example() {
  let x: string | number | boolean

  x = Math.random() < 0.5
  // x = boolean

  if (Math.random() < 0.5) {
    x = 'Hello'
    // x:string
  } else {
    x = 100
    // x: number
  }

  return x
  // x: string | number
}
```

### 类型断言

类型断言（Type Assertions/Predicate）。

Assertion 和 predicate 翻译过来都是断言。在计算机中，Assertion 通常是断言某个表达式的值是不是 true/false。Assertion 在很多的测试库中被使用，比如 `asset.equals(a, 1)` 。从语义上，这里在断言 a 的值是 1 （a === 1 是 true）。

**Assertion 在说某个东西是什么。**

Predicate 通常是一个函数，返回值是 true/false，比如说 list.filter(x => x.score > 500)，`x => s.score > 500` 这个函数是一个 predicate 函数。

**Prediate 是一个返回 true/false 的函数。**

TS 中有两个断言操作符，`Assertion` 操作符 `as` 和 `predicate` 操作符 `is`。

as 操作符提示 TypeScript 某种类型是什么（当用户比 TypeScript 更了解类型的时候使用）。is 操作符是用户自定义的类型守卫，用于帮助 TypeScript Narrowing。

案例：

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

let pet = {
  fly: () => {}
}

if (isFish(pet)) {
  // isFish 成为了 Type Guard
  pet.swim()
} else {
  pet.fly()
}
```

`pet is Fish` 让 `isFish` 具有的窄化功能，如果不定义，会直接报错。

那么 as/is 符不符合计算机标准语言中 Assertion/Predicate 的含义？

* as 是比较符合 assertion 的含义的
* is 如果是一个 predicate，是应该返回一个值的。不过 pet is Fish 在这只是起到类型卫兵的作用，含义略微有些差别。

### 判别的联合

判别的联合（Discriminated unions）。

```typescript
interface Shape {
  kind: 'circle' | 'square'
  radius?: number
  sideLength: number
}

function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2
}
```

这样判断有什么问题吗？如果是下面这样呢？

```typescript
function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
}
```

上面这两种写法都存在问题，因为 radius 可能不存在。我们可以使用非 Null 断言操作符强制判断 radius 不能为空。

```typescript
function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius! ** 2
  }
}
```

针对上面的代码其实还有优化空间。`Circle` 应该是一种单独的类型，Shape 可能还有 rect 等。

```typescript
interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    // Narrowing
    return Math.PI * shape.radius ** 2
  }
}
```

再整理下：

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
  }
}
```

### never 类型

Never，即不应该出现的意思。Never 类型代表一个不应该出现的类型。因此对 Never 的赋值，都会报错。

比如下面处理 default 的逻辑：

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape
      // Type ... is not assignable to type never
      return _exhaustiveCheck
  }
}
```

### 总结

类型窄化解决了联合类型校验的问题。TS 是 JS 的超集，TS 会尽量避免新增特性。

## 07. React Latest

React 从 16 开始，不断给我们眼前一亮的新特性，例如：

* Fiber
* React Hooks
* Suspense
* React 17 对渲染的启发性优化
* ...

React 是一个渲染引擎，所有更新的特性都是为了更好的渲染页面。所有 React 的努力，其实就是两方面的事情：

* 改进体验
* 提升开发效率

Fiber 是 React 16 之后对体验改进的核心；React Hooks 是 16 之后对工程效率提升的核心。

### React Hooks 介绍

React Hooks 可以从两个方面理解：

* 作用：
  * 让 React 更好的拥抱函数式
  * 更好的解决组合问题（关注点分离）
* 工作原理：
  * 从原理上看它们是钩子（hook），当 React 生命周期发生变化的时候，会触发它们。

#### 作用角度

首先是 Hooks 出现之前 Class 风格的 React 组件：

```jsx
class Foo extends Component {
  constructor() {
    this.sttate = {}
  }

  componentDidMount() {}
  shouldComponentUpdate() {}

  render() {
    return <div></div>
  }
}
```

Hooks 出现后，我们可以将 React 组件看作是一个函数：

```jsx
function Foo() {
  return <div></div>
}
```

没有生命周期函数，使用 Hooks 去替代。例如下面的累加器案例：

```tsx
function Foo() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    timer(0, 1000)
      .subscribe(i => setCount(i))
  }, [])

  return <div>{count}</div>
}
```

上面这段程序中没有 class，只有函数。这是一种编程风格的变化：

* 组件是一个用来渲染的纯函数（重新定义）：不再关注生命周期，不需要理解生命周期，更接近于 React `compoent = f(data)` 的定义；
* 细化解决用户痛点：针对状态、作用、上下文、缓存等方面，为用户量身定做 hook 函数；而不是像之前都需要用户自己在类中实现程序；
* 让用户以最小的代价实现关注点分离。

关注点分离的例子：

```tsx
function HomePage() {
  const [productList, load] = useService('product').get()
  const [ads, loadAds] = useService('ads').get()
  const [suppestions, loadSuggs] = useService('suggestion').get()

  return <>
    <TitleBar />
    <ProductList list={productList} loadFN={load} />
    <Ads ads={ads} />
    <Suggestions list={suppestions} />
    <FootBar />
  </>

```

上面程序在一个页面中对应 3 个关注点进行分析，非常干净。

* 产品列表
* 广告
* 推荐列表

`useService` 是一个自定义的 hook，可以由用户自己来实现。

**Hooks 更好地拥抱了函数式，彻底改变了 React 的编程风格，简化了用户的理解，并且可以很好的帮助用户实现关注点分分离。**

#### 原理角度

钩子（Hooks）是什么？

* Git 的 Web hooks 是什么？
* 杀毒软件监控操作系统的 Hooks 是什么？
* React 的 Hooks 是什么？

Hooks 本质是一种消息机制。

Hooks 的作用是从系统外部监听某个系统内部的变化，并和某种特定事件挂钩。比如 Git 的 Web Hooks 看到 Git 有提交，就会触发一个 HTTP 请求。操作系统给的进程 Hook，看到新进程就发送一条消息，然后杀毒软件就可以获取这条消息。

Hook 的实现是两个方面：

* 被监听的实体在特定情况下发送消息给 Hook（比如打开文件、Git 提交、新建进程 ...）
* Hook 对象收到这种消息完成某个具体的工作（比如发送 Http 请求、开始杀毒、Hot Reload）

 React Hook 一方面在 React 在某种特定状态发生变化的时候会通知 Hook，然后 Hook 再完成某个特定行为。

例如 `useEffect`，当 React 渲染的时候会触发这个 Hook，如果这个 Hook 的依赖发生变化，就会执行这个 Hook 上关联的函数。`useState` 是一个反向的 Hook，当用户设置状态变更的时候，会反向触发 React 的更新。

**Hooks 是一种通知机制**。

#### 总结

**关于 React Hooks 的理解？**

钩子是一种消息通知机制。列举 Git Hook、Web Hook、Webpack Hook 机制等概念。

函数式编程的拥抱，拥抱的特性，更好支持关注点分离等。

### React 基础

#### 创建项目

推荐使用 create-reacta-app 直接创建。

```shell
npm i create-react-app -g
create-react-app hooks-example --template typescript
```

#### 函数组件

函数组件的输入是 props 对象，输出是一个 JSX 对象。

一个函数组件可以这样写：

```tsx
function App () {
  return <h2>Hello world !!!</h2>
}
```

你可以看到 `h2` 是一个 JSX 类型，`<h2/>` 是一个 JSX Element，因此，APP 的返回值类型也是一个 JSX Element，准确来说是 `React.JSX`。

`h2` 也是一个组件，是一个 React 内置的组件，准确来说这个组件是 `React.IntrinsicElements.h2`。例如 Java 的 synchronized 关键字也被称为 Intrinsic Lock。

> Intrinsic 内部的、External 外部的。

**函数即组件。**

在 React 中，可以向组件传递属性：

```tsx
export default function App() {
  return <Grettings message="Hello React！！！" />
}

function Grettings({ message }: { message: string }) {
  return <h2>{message}</h2>
}
```

**属性就是函数的参数，JSX=f(props)**

输入决定输出叫做：纯（Pure），没有副作用（Side Effect）。

#### 组件和列表关系

组合关系：多个组件组成一个。

```typescript
function ComposedComponent() {
  return (
    <>
      <A></A>
      <B></B>
    </>
  )
}

function A() {
  return <h2>A</h2>
}

const B = () => {
  return <h2>B</h2>
}
```

**React 用 JSX 实现组合关系，比较直观。**

#### 数据映射成列表

```tsx
function List({ data }: { data: Array<string> }) {
  return (
    <ul>
      {data.map(word => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  )
}

export default function App() {
  return <List data={['a', 'b', 'c']} />
}
```

`key` 是 React 渲染机制的一环，不需要在属性中声明（不可以自定义名叫 key 的属性）。当 React 渲染的时候，就会调用组件函数。只要组件的 `key` 属性发生变化，React 就会重绘组件。如果 key 不变，且其他属性也不变，那么就不会发生重绘。

* `['a', 'b', 'c']` => `['a', 'b', 'c', 'd']` （只有一个 li 新增，但是没有 li 重绘）
* `['a', 'b', 'c']` => `['c', 'a']` （a,c 不重绘，删除 b）

属性或 key 发生变化才会导致组件重绘，父组件（List）重绘，子组件（li）不一定需要重绘。

#### 容器组件

有的组件是一个容器，比如说一个支持 flexbox 的盒子：

```tsx
type Children = JSX.Element | JSX.Element[] | null
const Box = ({ children }: { children: Children }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Box>
      <h2>Hello!</h2>
      <h2>Hello!</h2>
    </Box>
  )
}
```

Event

```tsx
function App() {
  return <div onClick={() => alert(1)}>
  	点我
  </div>
}
```

#### ReactDOM

React 在 DOM（浏览器文本对象模型）下的渲染需要引入 `react-dom`。

```typescript
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
```

之所以要在这样设计，是因为 JSX 的结构是一个`Virtual DOM`，可以渲染在各个端：

* React Native
* Canavas
* Web
* ......

#### 总结

React 的核心设计原则是什么？

* Learn once Write Anywhere；
* 专注做好渲染工作；
* Uniform：最简化、标准化的表达。

### React Hooks API

#### useState

管理状态，当状态发生变化的时候反向通知 React 重绘。

通知方向：state hook => React Component => render

```tsx
import { useState } from 'react'

export default function Aop() {
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState<number>(0)
  const [count, setCount] = useState(() => 0)

  return (
    <div>
      {count}
      {/* Race Condition */}
      <button onClick={() => setCount(x => x + 1)}>+</button>
    </div>
  )
}
```

#### useEffect

当 React 渲染时，hook 中的函数根据依赖变化发生调用。

```tsx
import { useEffect, useState } from 'react'
import { timer } from 'rxjs'

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const subscription = timer(0, 1000).subscribe(() => setCount(x => x + 1))
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('count changed to', count)
  }, [count])

  return (
    <div>
      {count}
      <button onClick={() => setCount(x => x + 1)}>+</button>
    </div>
  )
}
```

每当渲染的时候 `useEffect` 都会调用，React 通过判断依赖（deps）有无变化决定是否调用 `useEffect` 中的函数。这样就将函数调用和声明式的编程同意。

**那么 react 可不可以这样写？**

```tsx
if (a === 1) {
  useEffect(() => {
    // ...
  }, [deps])
}
```

不能。

**思考：能不能在 React 函数之外的地方使用 hooks？**

不能。

**思考：为什么叫做 effect？**

去掉  `useEffect`，函数组件看起来很纯，像是靠 props 和 state 渲染，加上 effect 函数就不纯了，因为做了渲染之外的事情，比如设置定时器、打印日志、网络请求 ......

至于为什么叫做 Effect？我们通常将计算函数返回值之外的事情都称作 Effect。当这种 Effect 会产生负面效果，就称作 Side Effect。

`useEffect` 将渲染之外的事情收敛，集中管理。

 #### useRef

这个 Hook 让函数组件可以在多次渲染间同步引用值。不过它为什么是钩子？谁触发它？其实就是每次渲染的时候触发这个 hook，然后它负责再保存一个引用。

```tsx
function LogBottonClicks() {
  const countRef = useRef(0)

  const handle = () => {
    countRef.current++
    console.log(`Clicked ${countRef.current} times`)
  }

  console.log('rendered')

  return <button onClick={handle}>Click me</button>
}
```

利用这种机制，子组件可以向父组件同步数据：

```tsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null)

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus()
  }

  return(
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

思考：`useRef` 每次渲染的时候都调用，是如何做到只初始化一次的？

例如下面这个程序：

```tsx

function LogButtonClicks() {
  const countRef = useRef(0)
  const [_, setVer] = useState(0)

  const handle = () => {
    countRef.current++
    console.log(`Clicked ${countRef.current} times`)
    setVer(ver => ver + 1)
  }

  return <button onClick={handle}>Click me</button>
}
```

React 通过记录 useRef 的序号同步引用。比如 countRef 是函数组件的第 0 个 Ref，存放在位置 0。第一次渲染的时候，React 查看位置 0 中是否有值，如果没有初始化，就调用初始化函数/使用初始值。如果有，就不再初始化。

那么，我们这样使用可以的？答案是不可以。

```tsx
let ref = null
if (a > 0) {
  ref = useRef(true)
} else {
  ref = useRef((false))
}
```

**hooks 本质也是一种对行为的描述，不可以在任何流程控制语句中使用。**

#### 总结

**请求数据逻辑放哪里？**

useEffect 中。

**React 父组件传递值给子组件如何做？子组件传递值给父组件如何做？**

父传子：props。子传父：ref 或传递回调函数。

## 08. 类型计算

TypeScript 提供了强大的类型计算能力。

```typescript
type A1 = string | number // union
type B1 = string & number // never

type Point = { x: number; y: number }
type StateDesc = { state: string }

type X1 = Point | StateDesc
const ins01: X1 = { x: 1, y: 2 }
const ins02: X1 = { state: 'hello', y: 2 }

type X2 = Point & StateDesc
const ins03: X2 = { x: 1, y: 2, state: 'hello' }
// const ins04: X2 = { state: 'hello', y: 2 }
// 不能将类型“{ state: string; y: number; }”分配给类型“X2”。
// 类型 "{ state: string; y: number; }" 中缺少属性 "x"，但类型 "Point" 中需要该属性。

interface A2 {
  foo(): void
}
interface A2 {
  bar(): void
}
```

**使用复杂的 infer。**

我们应该如何解决这个问题的描述？

```typescript
function flattern(arr) {}
```

首先我们可以这样描述：

```typescript
function flattern(arr: Array<any>): Array<any> {}
```

但是这并不完整，还存在很多 any。那么这样呢？

```typescript
type Flattened<T> = T extends V[] ? V : T
// 找不到名称“V”。
```

这句已经非常接近我们的语义。ts 提供了一个关键字 infer，供我们推导类型。

```typescript
type Flattened<T> = T extends Array<infer V> ? V : T
type D = Flattened<Array<number>> // number
```

我们还可以递归推导：

```typescript
type Flattened<T> = T extends Array<infer V> ? Flattened<V> : T
type D = Flattened<Array<Array<number>>> // number
```

flattern 函数实现：

```typescript
function flattern<T extends Array<any>>(arr: T): Array<Flattened<T>> {
  return new Array<Flattened<T>>().concat(...arr.map(x => (Array.isArray(x) ? flattern(x) : x)))
}

flattern([1, 2, 3, [3, 4, [5]]])
```

优化

```typescript
type Atom = string | boolean | number | bigint
type Nested<T> = (T | (T | T[])[])[]

function flattern<T extends Atom>(arr: Nested<Atom>): Atom[] {
  return new Array<Atom>().concat(...arr.map(x => (Array.isArray(x) ? flattern(x) : x)))
}
```

或者这样实现也可以：

```typescript
type Nested = Array<Atom | Nested>
const target: Nested = [1, 2, 3, [3, 4, [5]]]
```

这其实就是一个递归的思考方式。

其他有意思的用法：

```typescript
type Unwrapped<T> = T extends (infer U)[] ? U : T
type T0 = Unwrapped<Array<string>> // string
```

```typescript
type Unwrapped<T> = T extends Promise<infer U> ? U : T
type T0 = Unwrapped<Promise<string>> // string
```

如果我们有一个 promise 数组，我们想把它拆成 string 的数组，应该如何做？

```typescript
type Unwrapped<T> = T extends Array<infer U> ? (U extends Promise<infer R> ? R[] : U) : T
```

上面这种实现方式是可以的，不过这种写法整个类型体系不够模块化，那么我们应该如何去写？

```typescript
type Unwrap<T> = T extends Promise<infer U>
  ? Unwrap<U>
  : T extends Array<infer V>
  ? UnwrapArray<T>
  : T
type UnwrapArray<T> = T extends Array<infer U> ? { [P in keyof T]: Unwrap<T[P]> } : T

type T0 = Unwrap<Promise<string>[]> // string[]
type T1 = Unwrap<Promise<Promise<number>>[]> // number[]
```

## 09. Vue Latest

### 基本介绍

Vue 是一个让然充满惊喜的框架，也是目前国内使用人数最多的前端框架。

* 更快（[https://github.com/vuejs/rfcs/issues/89](https://github.com/vuejs/rfcs/issues/89)）；
* 更小（Treeshakable）；
* 更好用、易维护（Composition API + reactive + JSX + typescript）。

在 vue 3 之后，写出的程序，很多时候已经和 react 看不出明显的区别。

例如下面这段程序：

```tsx
type HelloWorldProps = {
	msg: string
}
export default ({ msg }: HelloWorldProps) => {
	return <h1>{ msg }</h1>
}

// babel/ts 支持 JSX
// JSX 并不意味着 react，JSX 是 HTTP 0.9 就设计出来的 HTML
// 程序语言本身扩展性是最好的
```

react 和 vue 并不决定你的前端架构，它只是作为一个工具去支持你的渲染。MVVM 和 函数式都是前端框架中重要的组成部分。

### 特性解读

vue 3，即 vue-next。

vue 3 可以说是对 vue 的程序应该如何写，重新下了定义：

* JSX
* Typescript
* Composition API
* reactivity

上面这几个更新并不全是 vue3 带来的，但是我们可以放到一起分析，算是对 vue-next 程序的定义。

**why not sfc**

可能有人会问？SFC 不香嘛？

首先我们来看一下，在 TS 环境下，SFC 需要一个 `shim` 文件：

```tsx
declare module "*.vue" {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent
  export default Component
}
```

declare 的作用：告诉 TypeScript 编译器 declare 的部分在源代码之外提供，不需要编译器处理。当遇到 `*.vue` 文件的时候，TS 编译时会将他们当作一个会 `export default Component` 的类型。

如果用 tsx 写，就不需要这个 shim。不过多一个 shim 少一个 shim 重要吗？

从架构角度来说很重要。通常你的项目概念越多，意味着设计越差。

在 SFC 中编写 template 和 script 标签，这个方式有两个缺点：

* 不够灵活
  * 需要 v-show/v-if/v-for 等；
  * 关注点被分离（模板也好、script 也好，都是解决某个关注点的一部分，在 SFC 中被强行分离）；
* ts 类型检查
  * 函数组件可以在最大程度作用 TS 的类型检查（比如属性检查）

我们来看一个 vue 的计时器程序：

```tsx
function useCounter(): [Ref<number>, () => void] {
  const counter = ref(0)
  
  function increment() {
  	counter.value++
  }
  
  return [counter, increment]
}

export default {
  setup() {
    const [counter, increment] = useCounter()
    return () => <div>
    	count is: {counter.value}
      <button onClick={increment}add></button>
    </div>
  }
}
```

在这个程序中，我们可以看到：

* counter 逻辑的集中管理；
* 强大的封装能力；
* 少量的记忆要求。

### compostion api

composition api 是一系列函数式 API 的合集。

有用来初始化的、定义组件的：

* setup
* defineComponent

有支持响应式数据的：

* ref
* reactive
* toRefs
* computed
* watch
* watchEffect

有支持生命周期管理的：

* onMounted
* onUnmounted

总结来说，Composition API：

* 提升组合能力（自定义的 Composition API）
* 提供 Reactive Programming
* 提供函数式（简化 API 设计）

### vue 3.0 性能

Vue3 并没有很很明显的提升性能，这个和 vue3 的渲染机制有关（没有时间切片）。

在一些大型前端系统，没有时间切片会导致页面打开执行周期过久。

### Reactivity

R eactivity 是 Vue3 提供的核心能力，配合函数式的 Composition API 使用非常方便。

#### 响应式编程

Reactive Programming - 让类型自发的响应环境的变化。

**Reactive：**一个值是 Reactive，那么这个值可以被监听；一个对象是 Reactive，那么这个对象可以被监听。一个函数是 Reactive，那么这个函数在提供 Reactive 的能力，比如创造一个 Reactive 的值或者对象。

**Be Reactive !!**

让程序变的 Reactive 是很好的一个思路。程序如果不是 Reactive，那么往往是 Passive（被动的）。响应的的反义词为什么是被动？因为 Reactive 代表一部分程序（类型）主动的去通知周边自己做了什么，另一部分类型主动监听变化，主动做出判断并完成操作。

程序变的 Reactive 之后，每个模块**好像就活了一样**，不需要程序主动下命令，而是程序主动完成工作。从这个角度来看 Reactive 的反义词就是 Passive。

#### 声明式（Declarative）

Reactive 的程序往往就是声明式的。所谓声明式，就是程序员的声明要做什么？不重要做什么？而不是写一大堆计算逻辑。

**声明式需要更好的封装：**

```typescript
const arr = []
for (let i = 0; i < 1000; i++) {
	arr[i] = i  
}

// 声明式
const arr = range(0, 1000)
```

**声明式会创造语言：**

```typescript
const div = document.createElement('div')
div.style.width = 100

// 声明式
const div = <div style={{ width: 100 }} />
```

> 创造这个词并不够贴切。

**声明式往往是 Reactive：**

```tsx
export default {
  setup() {
    const logined = ref(userStore.logined())
    
    useStore.on(e) {
      switch (e.type) {
        case 'logined':
          logined.value = true
          break
        case 'logout':
          logined.value = false
          break
      }
    }
    
    return () => {
      if (logined.value) {
        return <div>您好，欢迎光临</div>
      } else {
        return <div>请登录...</div>
      }
    }
  }
}
```

在上面的程序中组件在响应全局用户状态的变化，这样就将组件和全局状态解耦：

* 组件迭代不用关心 useStore 迭代；
* useStore 迭代，组件不需要调整。

其实上面代码还可以做优化，可以实现业务逻辑和组件的强分离：

```tsx
function useLoginStatus() {
 	const logined = ref(userStore.logined())
    
  useStore.on(e) {
    switch (e.type) {
      case 'logined':
        logined.value = true
        break
      case 'logout':
        logined.value = false
        break
    }
  }
  
  return login.value
}

export default  {
  setup() {
    const loggedIn = useLoginStatus()
    return () => <LoginStatus loggedIn={loggedIn} />
  }
}

const LoginStatus = ({ loggedIn }) => {if 
```

还有一个最大的好处就是声明式可以帮助我们更好的阅读代码。

最后也是最重要的、上升到哲学高度的思考：Reactive 让程序模块自己懂得如何做事。

#### 总结

**从前端看：如何理解 Reactivity？和 React 是一个词义吗？**

从哲学角度去看，Reactivity 就是让程序知道如何自主做事，应该怎样去做。

个人认为 React 在设计之初就是期望程序可以 Reactivity，所以可以认为是一个词义。

**组合能力是什么？Compostion API 提供更好的组合能力，这样说对吗？**

组合能力其实就是最大能力的复用，即 “搭积木” 能力。这样肯定是对的。

### Ref 和 Reactive

一个值如果是 Reactive，那么这个值应该：

* 可以通知（trigger）
  * vue 更新
  * vue 做其他标准行为
  * 完成自定义行为
* 可以监听（track）
  * vue 发生的变化（依赖）

#### ref（referece）

ref 是一个工厂方法，本质是创造一个 Ref 对象。ref 的目标是管理值。

首先，ref 可以像一个正常值一样被使用：

```tsx
import { ref } from 'vue'

export default {
  setup() {
    const msg = ref('hello')
    return () => {
      return <div>{msg.value}</div>
    }
  }
}
```

在上面的程序中：

* setup 是一个 vue3 新特性（初始化组件）；
* setup 可以返回一个 render 函数，render 函数返回的 VNode。

jsx 的语法 div 会被 babel 翻译成 createVNode。

##### ref 是值的代理

ref 是一个 setter 和 getter，例如下面这段代码就可以很好诠释 ref 的内部实现：

```tsx
function createRef<T>(val: T) {
  let _val: T = val
  	
  const refObj = {
    set value(v: T) {
      console.log('setter called')
      _val = v
    },
    get value() {
      console.log('getter called')
      return _val
    }
  }
  return refObj
}

const a = createRef(0)
a.value = 10
a.value++ // 非原子操作，一次读写操作
console.log(a.value)
```

不过仅有 setter 和 getter 是不够的，还需要一些 reactive 的机制：

```tsx
function trigger() {}
function track() {}

// ...

const refObj = {
  set value(v: T) {
    console.log('setter called')
    _val = v
    trigger()
  },
  get value() {
    console.log('getter called')
    track()
    return _val
  }
}
```

当 set 的时候 trigger，get 的时候 track。

* trigger：驱动 vue 更新
* track：跟踪 vue 更新
  * 一个 ref 可以给多个 vue 组件使用，因此依赖是不确定的；
  * 依赖（Deps）
    * vue 组件依赖 ref，因此是 ref 的依赖；
    * ref 的依赖应该是一个数组。
  * 为什么不能在 ref 的构造函数中确定依赖？
    * 构造函数和实际使用可能并不是一个位置，或同一个组件。
  * 为什么不自己操作依赖而是封装一个 track 方法？
    * 只有 get 的时候才需要操作依赖，实际时机很重要。
  * 为什么不是 vue 检查依赖，而是 ref track 更新依赖？
    * 发现能力更出色，更 Reactive。

##### ref 驱动更新示例

```tsx
import { ref } from 'vue'

export default {
  setup() {
    const counter = ref(0)
    return () => (
    	<div>
      	{counter.value}
        <button onClick={() => counter.value++}>add</button>
      </div>
    )
  }
}
```

#### Reactive

Reactive 和 Ref 类似，都是代理模式的 Reactive 值。

代理一个值用 getter 和 setter 很方便，代理一个对象，js 提供了 Proxy 类。

##### 如何代理一个对象

```tsx
function createReactive(obj: any) {
  return new Proxy(obj, {
    get: (target, name, receiver) => {
      if (name ==== 'c') {
        return 'this is a proxy value'
      }
      return Reflect.get(target, name, receiver)
    },
    set: (target, name, value, receiver): boolean => {
      if (!(name in target)) return false
      Reflect.set(target, name, receiver)
      return true
    }
  })
}

const o = createReactive({
  a: 1,
  b: 2,
  foo: function() {
    console.log('a is', this.a)
  }
})

o.a = 100
console.log(o.c)

o.foo()
```

为什么用 Reflect.set、Reflect.get 而不用 target[name] 这种形式？

* 可以在 getter 和 setter 间同步 receiver（this 指针）

比较坑的地方：

```tsx
const p = new Proxy({
  a: 1
}, {
  get(target, property, receiver) {
    console.log('get trap', ...arguments)
    return Reflect.get(receiver, property, receiver)
  }
})
```

上面这段程序会造成栈溢出，因为 receiver 其实就是 proxy 代理对象，会造成循环读取。

##### Reactive 是一个代理对象

```tsx
const state = reactive({
  counter: 0
})

state.counter++
```

上面的程序首先会触发代理对象的 getter，然后再触发 setter，因为 ++ 不是 atomic 原子操作。

具体实现和 ref 一致，Reactive 也会在 getter 中 track，在 setter 中 trigger。

##### Reactive 实现 Counter

```tsx
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      counter: 0
    })
    
    return () => {
      <div>
      	{state.counter}
        <button
          onClick={() => {
            state.counter++
          }}
        >
          add
        </button>
      </div>
    }
  }
}
```

#### Reactive vs Ref

它们都是 vue 提供的 reactive 值，Ref 维护一个值/对象，Reactive 维护一个对象的所有成员。

```tsx
const obj = ref({
  a: 1,
  b: 2
})

obj.value.a++ // 不会触发重绘
obj.value = { ...obj.value, a: 1 } // 触发重绘

const obj1 = reactive({
  a: 1,
  b: 2
})
obj1.a++ // 触发重绘
```

有一个函数叫做 toRef，还有一个函数叫做 toRefs，这两个函数可以将值转换为 ref。

```tsx
import { defineComponent, reactive, toRef, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      a: 1,
      b: '-'
    })
    
    const aRef = toRef(state, 'a')
    const bRef = toRef(state, 'b')
    // =>
    // const refs = toRefs(state)
    // const aRef === refs.a
    // cosnt bRef === refs.b
    
    return () => {
      return <>
      	<h1>aRef: { aRef.value }</h1>
        <h1>aRef: { aRef }</h1>
        <h1>bRef: { bRef.value }</h1>
        <h1>bRef: { bRef }</h1>
      	<button onClick={() => state.a++}>state.a++</button>
      	<button onClick={() => aRef.value++}>aRef.a++</button>
      </>
    }
  }
})
```

#### Reactive 和 Ref 的类型

在 Reactive 和 Ref 中，通过 UnwrapRef 的定义配合 infer 关键字，可以做到两种类型合一。

因此从类型的角度来看 ref 和 reactive 是同一类东西。

```tsx
export declare function ref<T>(value: T): Ref<UnwrapRef<T>>
export declare function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
 
export declare type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>
 
// 拆包
export declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefsSimple<V> : UnwrapRefSimple<T>
  
declare type UnwrapRefSimple<T> = 
	T extends
		Function |
		CollectionTypes |
		BaseTypes |
		Ref |
		RefUnwrapBailTypes[keyof RefUnwrapbBailTypes] ? 
			T :
			T extends Array<any> ?
				{
          [K in keyof T]: UnwraoRefSimple<T[K]>
        } : 
				T extends object ? UnwrappedObject<T>: T
```

#### 总结

vue 3 提供的 Reactive 这种编程模式和之前 vue.observable 有什么区别？

> 其实是整体编程风格的转变。

```tsx
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: {
        click: () => { state.count++ }
      },
      `count is: ${ state.count }`
    })
  }
}
```

什么是 observable？reactive is observable？

* 可以被观察到的（observable）；
  * rxjs 中一个 observable 同时依然是 observer。
* 可以观察别人（observer）。

## 10. 函数补充部分

### 构造函数表达

```typescript
type SomeConstructor = {
  new (s: string): String
}

function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}

const str = fn(String)
console.log(str) // hello
```

```typescript
type SomeConstructor<T> = {
  new (s: number): T
}

function fn<T>(ctor: SomeConstructor<T>, n: number) {
  return new ctor(n)
}

fn<Array<string>>(Array, 100)
```

### 泛型函数

```typescript
function firstElement<Type>(arr: Type[]): Type {
  return arr[0]
}
```

### 关于推导

```typescript
// map: a => b
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func)
}

const parsed = map(['1', '2', '3'], n => parseInt(n))
// [1, 2, 3]
```

### 泛型约束

巨坑：

```typescript
function minimunLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
  if (obj.length >= minimum) return obj
  return { length: minimum }
  // 不能将类型“{ length: number; }”分配给类型“Type”。
  // "{ length: number; }" 可赋给 "Type" 类型的约束，但可以使用约束 "{ length: number; }" 的其他子类型实例化 "Type"。ts(2322)
}
```

原因：

* 泛型约束约束的是 Type 必须具有 length 属性；
* 有 length 属性，不代表一定是目标 Type。

```typescript
function minimunLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
  if (obj.length >= minimum) return obj
  return obj.constructor(minimum)
}
```

我们可以使用 constructor 解决上述问题。

```typescript
function minimunLength<Type extends { length: number; constructor: Function }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) return obj
  return obj.constructor(minimum)
}
```

### 手动指定类型

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}

const arr = combine([1, 2, 3], ['hello'])
// 不能将类型“string”分配给类型“number”。
```

这种时候可以手动指定类型：

```typescript
const arr = combine<string | number>([1, 2, 3], ['hello'])
```

### 使用泛型的一些规范

对比下面这一组，哪种比较好？

```typescript
function firstElement1<Type>(arr: Type[]) {
  return arr[0]
}
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0]
}
```

**利用好推导（infer）能力，避免使用 any。**



对比下面这一组，哪种比较好？

```typescript
function filter1<Type>(arr: Type[], func: (args: Type) => boolean): Type[] {
  return arr.filter(func)
}
function filter2<Type, Func extends (args: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func)
}
```

**减少泛型参数的使用，除非有必要。**



下面这个程序好嘛？

```typescript
function greet<Str extends string>(s: Str) {
  console.log('Hello, ' + s)
}
```

不好，s 本来就是 string 类型。

### 可选参数

用 `?` 描述函数的可选参数。

```typescript
function myForEach(arr: any[], callback: (args: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}
```

### 函数重载

```typescript
function add<T>(a: T, b: T) {
  return a + b
  // 运算符“+”不能应用于类型“T”和“T”。
}
```

修改办法：

```typescript
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
```

**利用重载约束跨类型方法的使用。**

### 操作符重载

[参考资料：babel-plugin-overload-operator](https://npmjs.com/package/babel-plugin-overload-operator)

Typescript 并不支持操作符重载，我们可以借助 babel 插件来实现。

### THIS

```typescript
interface DB {
  exec(sql: string): any
}
function runSql(this: DB, sql: string) {
  this.exec(sql)
}

runSql('select * from user')
```

> this 和 new 都是 typescript 提供的关键字。

### void vs unknown

函数不返回参数用 void，返回的值类型不确定用 unkown。

下面的定义会报错吗？

```typescript
type voidFunc = () => void

const f1: voidFunc = () => {
  return true
}
const f2: voidFunc = () => true
const f3: voidFunc = function () {
  return true
}
```

上面这三条都不会报错。但是类型推导的返回值并不能使用。



unknown 可以让代码更安全。

```typescript
function f1(a: any) {
  a.b() // pass
}
function f2(a: unknown) {
  a.b()
  // 类型“unknown”上不存在属性“b”。
}
```



为什么会写下面这样的程序：

```typescript
function safeParse(s: string): unknown {
  return JSON.parse(s)
}
function fail(msg: string) {
  throw new Error(msg)
}
```

### rest params

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map(x => n * x)
}

const a = multiply(10, 1, 2, 3, 4)
```

### 总结

泛型帮助我们让类型检查更加严格，更加智能。

泛型不是让写程序更舒服的一种方式，而是让你的程序更加可预测。

## 11. 类型计算

### Keyof 操作符

```typescript
type Point = { x: number; y: number }
type P = keyof Point // "x" | "y"

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish // number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish // string | number
```

`M`  类型是 `string | number` ，因为对于对象来说，虽然规定 k 是 string，但是也可以使用数字作为键。

### typeof

```typescript
console.log(typeof 'xxx') // string

let s = 'hello'
let n: typeof s // string
```

`typeof` 在 javascript 是计算操作符，不过在 ts 中，属于类型操作符（不是运行时执行，coding 时也会检查）。

### Partial Type

部分类型，ts 的延伸能力。

```typescript
interface Todo {
  title: string
  description: string
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return {
    ...todo,
    ...fieldsToUpdate
  }
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter'
}
const todo2 = updateTodo(todo1, {
  description: 'throw out trash'
})
```

如何实现？

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

### Required

```typescript
interface Props {
  a?: number
  b?: number
}

const obj: Props = { a: 5 }
const obj2: Required<Props> = { a: 5 }
// 类型 "{ a: number; }" 中缺少属性 "b"，但类型 "Required<Props>" 中需要该属性。
```

如何实现？

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

### Readonly

```typescript
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users'
}

todo.title = 'Hello'
// 无法为“title”赋值，因为它是只读属性。
```

如何实现？

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### Record

记录。描述 key value 值的类型。

```typescript
interface CatInfo {
  age: number
  breed: string
}

type CateName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CateName, CatInfo> = {
  miffy: { age: 10, breed: 'persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 10, breed: 'Britsh Shorthair' }
}
```

如何实现？

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

日常使用：

```typescript
const obj = Record<string, object>
```

### Pick

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

如何实现？

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Exclude

```typescript
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'
type T2 = Exclude<string | number | (() => void), Function> // string | number
```

如何实现？

```typescript
type Exclude<T, U> = T extends U ? never : T
```

### Omit

省略。与 Pick 是相反的操作。

Exclude 操作的是联合类型，Omit 操作的是接口。

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

type TodoPreview = Omit<Todo, 'description'>
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
  createdAt: 1681344482208
}

type TodoInfo = Omit<Todo, 'completed' | 'createdAt'>
const todoInfo: TodoInfo = {
  title: 'Pick up kids',
  description: 'Kindergarten closes at 5pm'
}
```

如何实现：

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

### Extract

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // 'a'
type T1 = Extract<string | number | (() => void), Function> // () => void
```

如何实现？

```typescript
type Extract<T, U> = T extends U ? T : never
```

可以看到，Extract 和 Exclude 是一对组合；Pick 和 Omit 是一对组合。

### NonNullable

```typescript
type T0 = NonNullable<string | number | undefined> // string | number
type T1 = NonNullable<string[] | null | undefined> // string[]
```

如何实现:

```typescript
 type NonNullable<T> = T extends null | undefined ? never : T
```

### Parmameters

```typescript
declare function f1(args: { a: number; b: string }) : void

type T0 = Parameters<() => string> // []
type T1 = Parameters<(s: string) => void> // [s: string]
type T2 = Parameters<<T>(args: T) => T> // [args: unknown]
type T3 = Parameters<typeof f1> // [args: { a:number; b: string }]
```

如何实现：

```typescript
type Parameters<T extends (...args: any) => any> = 
	T extends (...args: infer P) => any ? P : never 
```

### ConstructorParameters

```typescript
type T0 = ConstructorParameters<ErrorConstructor> // [message?: string | undefiend]
type T1 = ConstructorParameters<FunctionConstructor> // string[]
type T2 = ConstructorParameters<RegExpConstructor> // [pattern: string | RegExp, flags?: string | undefined]
type T3 = ConstructorParameters<any> // unkown[]

type T4 = ConstructorParameters<Function>
// 类型“Function”不满足约束“abstract new (...args: any) => any”。
// 类型“Function”提供的内容与签名“new (...args: any): any”不匹配。
```

如何实现：

```typescript
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never
```

### ReturnType

```typescript
declare function f1(): { a: number; b: string }

type T0 = ReturnType<() => string> // string
type T1 = ReturnType<(s: string) => void> // void
type T2 = ReturnType<<T>() => T> // unkown
type T3 = ReturnType<<T extends U, U extends number[]>() => T> // number[]
type T4 = ReturnType<typeof f1> // { a: number; b: string }
type T5 = ReturnType<any> // any
type T6 = ReturnType<never> // never
type T7 = ReturnType<string> // 类型“string”不满足约束“(...args: any) => any”。
type T8 = ReturnType<Function> // 类型“Function”不满足约束“(...args: any) => any”。
```

如何实现：

```typescript
type ReturnType<T extends (...args: any) => any> = 
	T extends (...args: any) => infer R ? R : any
```

### InstanceType

```typescript
class C {
  x = 0
  y = 0
}

type T0 = InstanceType<typeof C> // C
type T1 = InstanceType<any> // any
type T2 = InstanceType<never> // never
type T3 = InstanceType<string> // 类型“string”不满足约束“abstract new (...args: any) => any”。
type T4 = InstanceType<Function> // 类型“Function”不满足约束“abstract new (...args: any) => any”。
```

如何实现？

```typescript
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any
```

### ThisParameterType

```typescript
function toHex(this: Number) {
  return this.toString(16)
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}
```

如何实现？

```typescript
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
```

### OmitThisParameter

 ```typescript
 function toHex(this: Number) {
   return this.toString(16)
 }
 
 const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)
 console.log(fiveToHex())
 ```

如何实现？

```typescript
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T
```

### ThisType

提供 this 提示。

```typescript
type ObjectDescriptor<D, M> = {
  data?: D
  methods: M & ThisType<D & M>
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return {
    ...data,
    ...methods
  } as D & M
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx
      this.y += dy
    }
  }
})

obj.x = 10
obj.y = 20
obj.moveBy(5, 5)
```

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es6",
    "lib": ["es6"],
    "esModuleInterop": true,
    "noImplicitThis": true, // 需要打开这个配置
    "downlevelIteration": true,
    "module": "CommonJS"
  }
}
```

如何实现？

```typescript
interface ThisType<T> {}
```

### Uppercase/LowerCase

```typescript
type Greeting = 'Hello, world'
type ShoutGreeting = Uppercase<Greeting> // HELLO, WORLD

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<'my_app'> // ID-MY_APP

type QuietGreeting = Lowercase<ShoutGreeting> // hello, world
```

如何实现？

```typescript
type Uppercase<S extends string> = intrinsic
type Lowercase<S extends string> = intrinsic
type Capitalize<S extends string> = intrinsic
type Uncapitalize<S extends string> = intrinsic
```

intrinsic 代表这个实现是内部实现，不是 ts 直接可以使用。

### 总结

类型是可以计算的吗？答案当然是肯定的。

* &
* -
* ?
* infer
* ......

