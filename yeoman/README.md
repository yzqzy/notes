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
npm link
```

## Yeoman 使用步骤

1. 明确需求；
2. 找到合适的 Generator；
3. 全局范围安装找到的 Generator；
4. 通过 Yo 运行对应的 Generator；
5. 通过命令行交互填写选项；
6. 生成你的所需要的项目结构；



例如创建一个网页应用

1. 通过 yeoman 官网（https://yeoman.io/generators/）找到 webapp
2. `npm install generator-webapp`
3. `yo webapp`

## 自定义 Generator

我们可以基于 Yeoman 搭建自己的脚手架。

Generator 本质上就是一个 NPM 模块。

### Generator 基本结构

generator



<img src="./images/generator.png" style="zoom: 60%" />



sub generator



<img src="./images/sub_generator.png" style="zoom: 60%" />



### `generator-<name>`

名称必须是 `generator-<name>` 格式。如果不按照格式开发，yeoman 使用 generator 会找不到模块。

```js
npm init -y
```

```js
npm install yeoman-generator --save-dev
```

generators/app/index.js

```js
// Generator 核心入口

// 需要导出一个继承自 Yeoman Generator 的类型，Yeoman Generator 工作时会自动调用在此类型中的生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入等

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing () {
    // Yeoman 在生成文件阶段会自动调用次方法，我们这里尝试往项目目录中写入文件
    this.fs.write(
      this.destinationPath('test.txt'),
      Math.random().toString()
    );
  }
}
```

链接命令到全局

```js
npm link
```

使用 generator

```js
yo sample
```

## 根据模板创建文件

generators/app/templates/foo.txt

```js
模板文件，内部使用 EJS 模板标记输出数据
例如：<%= title %>
 
其他的 EJS 语法也支持

<% if (success) { %>
  Hello Foo.
<% } %>
```

generators/app/index.js

```js
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing () {
    // 通过模板方式写入文件到目标目录
    const tmpl = this.templatePath('foo.txt');
    // 输出目录
    const output = this.destinationPath('foo.txt');
    // 模板数据上下文
    const context = { title: 'Hello ~', success: false };

    this.fs.copyTpl(tmpl, output, context);
  }
}
```

相对于手动创建每一个文件，模板的方式可以大大提高效率。
