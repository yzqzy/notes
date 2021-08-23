# ESLint

## 规范化介绍

规范化是我们践行前端工程化中重要的一部分。

* 为什么要有规范化标准
* 哪里需要规范化标准
* 实施规划化的方法

### 为什么要有规范化标准

* 软件开发需要多人协同
* 不同开发者具有不同的编码习惯和喜好
* 不同的喜好增加项目维护成本
* 每个项目或者团队需要明确统一的标准

### 哪里需要规范化标准

* 代码、文档、提交日志等
* 开发过程中人为编写的成果
* 代码标准化规范最为重要

### 实施规范化的方法

* 编码前人为的标准约定
* 通过工具实现 Lint

## ESLint 介绍

目前最为主流的 JavaScript Lint 工具，用来检测 JS 代码质量。

ESLint 很容易统一开发者的编码风格。

ESLint 可以帮助开发者提升编码能力。

## ESLint 安装

* 初始化项目
* 安装 ESLint 模块为开发依赖
* 通过 CLI 命令验证安装结果

```js
yarn add eslint --save-dev
```

查看 eslint 版本号，可以使用多种方式

```js
.\node_modules\.bin\eslint -v

npx eslint -v
yarn eslint -v
```

## ESLint 快速上手

ESLint 检查步骤

* 编写 “问题” 代码
* 使用 eslint 执行检测
* 完成 eslint 配置

index.js

```js
const foo = 123;

function fn () {
  console.log('hello');

    console.log('eslint');
}

fn(;

syy();
```

初始化 eslint 配置，命令行交互的方式进行选择。

```js
npx eslint --init
```

使用 eslint 检查代码

```js
npx eslint .\index.js
```

修正后代码

```js
const foo = 123

console.log(foo)

function fn () {
  console.log('hello')
  console.log('eslint')
}

fn()

```

```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  }
}

```

## ESLint 配置文件解析

可以同时设置多个属性，以下属性不是互斥的。

| 属性                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| browser             | 浏览器中的全局变量                                           |
| node                | Node.js 全局变量和 Node.js 作用域                            |
| common.js           | CommonJS 全局变量和 CommonJS 作用域（用于 Broserify/Webpack 打包的只在浏览器运行的代码） |
| shared_node_browser | Node.js 和 Browser 通用全局变量                              |
| es6                 | 启动除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6） |
| worker              | Web Workers 全局变量                                         |
| amd                 | 将 requre() 和 define() 定义为像 amd 一样的全局变量          |
| mocha               | 添加所有的 Mocha 测试全局变量                                |
| jasmine             | 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量            |
| jest                | Jest 全局变量                                                |
| protractor          | Protractor 全局变量                                          |
| qunit               | Quint 全局变量                                               |
| jquery              | Jquery 全局变量                                              |
| prototype.js        | Prototype.js 全局变量                                        |
| shelljs             | ShellJS全局变量                                              |
| meteor              | Meteor 全局变量                                              |
| mongo               | MongoDB 全局变量                                             |
| applescript         | AppleScript 全局变量                                         |
| nashorn             | Java 8 Nashron 全局变量                                      |
| serviceworker       | Service Worker 全局变量                                      |
| atomtest            | Atom 全局变量                                                |
| embertest           | Ember 全局变量                                               |
| webextensions       | WebExtensions 全局变量                                       |
| greasemonkey        | GreaseMonkey 全局变量                                        |

## ESLint 配置注释

