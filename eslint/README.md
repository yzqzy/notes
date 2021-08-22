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

## ESLint 配置文件解析

