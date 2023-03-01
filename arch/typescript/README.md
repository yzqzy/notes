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

```react
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

针对上面的代码其实还有优化空间。`circle` 应该是一种单独的类型，Shape 可能还有 rect 等。

```typescript
interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'quare'
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

