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

