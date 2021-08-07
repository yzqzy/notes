# Yeoman

## 工程化

### 前端工程化

前端工程化是指遵循一定标准和规范，通过工具提高效率、降低成本的一种手段。



遇到的问题

* 想使用 ES6+ 新特性，但是兼容有问题
* 想使用 Less/Sass/PostCSS 增强 CSS 的编程性，但是运行环境不能直接支持
* 想使用模块化的方式提高项目的可维护性，但运行环境不能直接支持
* 部署上线前需要手动压缩代码及资源文件，部署过程中需要手动上传代码到服务器
* 多人协作开发，无法硬性统一大家的代码风格，质量无法保证
* 部分功能开发时需要等待后端服务接口提前完成

主要解决的问题

* 传统语言或语法弊端
* 无法使用模块化/组件化
* 重复的机械式工作
* 代码风格统一、质量保证
* 依赖后端服务接口支持
* 整体依赖后端项目

### 工程化表现

一切以提高效率、降低成本、质量保证为目的的手段都属于“工程化”。

一切重复的工作都应该被自动化。



<img src="./images/front.png" style="zoom: 60%" />



创建项目

* 自动创建项目结构
* 创建特定类型文件

编码

* 自动化格式化代码
* 校验代码风格
* 编译/构建/打包

预览/测试

* WebServer / Mock
* Live Reloading / HMR
* Source Map

提交

* Git Hooks
* Lint-staged
* 持续集成

部署

* CI/CD
* 自动发布

### 工程化不等于工具

工具并不是工程化的核心，工程化的核心应该是对象项目整体的规划和架构。工具只是实现工程化的手段。



<img src="./images/ci.png" style="zoom: 60%" />



成熟的工程化集成方案

* creat-react-app
* vue-cli
* angular-cli
* gatsby-cli



> 前端工程化是由 NodeJS 强力驱动的。

## 脚手架工具概要

脚手架可以帮助我们自动的创建项目基础结构、提供项目规范和约定。

* 相同的组织结构
* 相同的开发范式
* 相同的模块依赖
* 相同的工具配置
* 相同的基础代码

IDE 创建项目的过程就是一个脚手架的工作流程。

## 常见的脚手架工具

* 根据信息创建对应的项目基础结构。
  * React：creat-reacta-pp
  * Vue：vuec-li
  * Angular：angular-cli

* Yeoman

  根据一套模板生成对应的项目结构。比较灵活，易扩展。

* Plop

  项目开发过程中创建特定类型的文件，例如创建一个组件/模板所需要的文件

## Yeoman

Yeoman 是一款创建现代化应用的脚手架工具。不同于 Vue-cli 这类工具，Yeoman 更像是一个脚手架运行平台。我们可以通过 Yeoman 搭配不同的 Generator 去创建任何类型的项目。我们可以创建自己的 Generator，从而定义自己的脚手架。在专注于框架开发的人眼中，Yeoman 过于通用，不够专注，所以可能 vue-cli 这样的脚手架更容易被接受。

## Yeoman 基础使用

Yeoman 是基于 NodeJS 开发的工具模块。

全局范围安装 yo

```js
npm install yo -g
```

安装对应的 generator

```js
npm install generator-node -g
```

通过 yo 运行 generator 项目

```js
yo node
```

## Sub Generator

sub generator。

```js
yo node:cli
```

链接到全局

```js
yarn link
```

