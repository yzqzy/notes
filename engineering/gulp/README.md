# Gulp

## 自动化构建概述

自动化构建就是把我们开发阶段写出来的源代码自动化的转换成生产代码的代码。

一般我们会把这个转化过程叫做自动化构建工作流。可以帮助我们尽可能脱离运行环境兼容带来的问题。

在开发阶段使用提高效率的语法、规范和标准。

* ECMAScript Next
* Sass
* 模板引擎

这些用法大都不被浏览器直接支持。自动化构建工具可以构建那些不被支持的特性。



## 自动化构建: css 转化案例

### 编写样式文件

```scss
$body-bg: #f8f9fb;
$body-color: #333;

body {
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
  background-color: $body-bg;
  color: $body-color;
}
```

### 安装 sass

```js
yarn add sass --dev
```

### 执行 sass 命令，构建样式

```js
.\node_modules\.bin\sass scss/main.scss css/style.css
```

### NPM Scripts

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/styles.css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "sass": "^1.37.5"
  }
}
```

script 会自动发现 node_modules 里面的命令

```js
yarn build
```

npm scripts 是实现自动化构建工作流的最简方式。

### 安装 browser-sync

```js
yarn add browser-sync --dev
```

```js
yarn serve
```

启动服务之前，可能样式还没有构建，我们可以使用 npm scrtips 的钩子机制。

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css",
    "preserve": "yarn build",
    "serve": "browser-sync ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "sass": "^1.37.5"
  }
}
```

### 实时监听文件变化

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "preserve": "yarn build",
    "serve": "browser-sync ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "sass": "^1.37.5"
  }
}
```

这样会存在问题，sass 监听会阻塞 serve 执行，我们需要 build 和 serve 同时执行。

```js
yarn add npm-run-all --dev
```

编写 scripts

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync .",
    "start": "run-p build serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "npm-run-all": "^4.1.5",
    "sass": "^1.37.5"
  }
}
```

```js
yarn start
```

实时监听文件变化并自动刷新

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync . --files \"css/*.css\"",
    "start": "run-p build serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "npm-run-all": "^4.1.5",
    "sass": "^1.37.5"
  }
}
```

## 常见的自动化构建工具

npm scripts 可以解决一定的自动化任务，但是针对于复杂的过程，npm scripts 就很吃力，这里我们就需要更加专业的构建工具。

* Grunt
  * 最早的前端构建系统，插件生态非常完善
  * Grunt 的插件几乎可以帮你完成任何事情，但是工作过程是基于临时文件（磁盘读写）实现的，构建速度相对较慢
* Gulp
  * 很好地解决了 Grunt 构建速度慢的问题，基于内存实现
  * 默认支持同时执行多个任务，效率比较高，使用方式相对 Grunt 更加直观易懂
  * 插件生态同样十分完善，目前市面上最流行的前端构建系统
* FIS
  * 百度的前端团队推出的一款构建系统
  * 相对于 Grunt 和 Gulp 微内核的特点，FIS 更像是一种捆绑套餐，把项目中典型需求集成到内部

初学者，可以使用 FIS，如果要求灵活多变，Gulp、Grunt 是更好的选择。

> 严格来说，webpack 是一个模块打包工具，不在讨论范围之类。

## Grunt

### 基本使用





