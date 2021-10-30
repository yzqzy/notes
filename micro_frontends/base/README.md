# 微前端

## 什么是微前端

微前端是一种软件架构，可以将前端应用拆解成一些更小的能够独立开发部署的微型应用，然后再将这些微应用进行组合使其成为整体应用的架构模式。

微前端架构类似于组件架构，不同的是，组件不能独立构建和发布，但是微前端中的应用是可以的。

微前端架构与框架无关，每个微应用都可以使用不同的框架。

## 微前端的价值

### 增量迁移

迁移是一项非常耗时且艰难的任务，比如有一个管理系统使用 AngularJS 开发维护已经有三年时 间，但是随时间的推移和团队成员的变更，无论从开发成本还是用人需求上，AngularJS 已经不能 满足要求，于是团队想要更新技术栈，想在其他框架中实现新的需求，但是现有项目怎么办？直接 迁移是不可能的，在新的框架中完全重写也不太现实。

使用微前端架构就可以解决上述问题，在保留原有项目的同时，可以完全使用新的框架开发新的需求，然后再使用微前端架构将旧项目和新项目进行整合。这样既可以使产品得到更好的用户体验，也可以使团队成员在技术上得到进步，产品开发成本也讲到最低。

### 独立发布

在目前的单页应用架构中，使用组件构建用户界面，应用中的每个组件或功能开发完成或者bug修 复完成后，每次都需要对整个产品重新进行构建和发布，任务耗时操作上也比较繁琐。

 使用微前端架构后，可以将不能的功能模块拆分成独立的应用，此时功能模块就可以单独构建单独发布了，构建时间也会变得非常快，应用发布后不需要更改其他内容应用就会自动更新，这意味着你可以进行频繁的构建发布操作了。

### 利于技术决策

因为微前端构架与框架无关，当一个应用由多个团队进行开发时，每个团队都可以使用自己擅长的技术栈进行开发，也就是它允许适当的让团队决策使用哪种技术，从而使团队协作变得不再僵硬。

## 微前端的使用场景

* 拆分巨型应用，使应用变得更加可维护
* 兼容历史应用，实现增量开发

## 如何实现微前端

### 1. 多个微应用如何进行组合 ?

在微前端架构中，除了存在多个微应用以外，还存在一个容器应用，每个微应用都需要被注册到容器应用中。

 微前端中的每个应用在浏览器中都是一个独立的 JavaScript 模块，通过模块化的方式被容器应用启 动和运行。

使用模块化的方式运行应用可以防止不同的微应用在同时运行时发生冲突。

### 2. 在微应用中如何实现路由 ？

在微前端架构中，当路由发生变化时，容器应用首先会拦截路由的变化，根据路由匹配微前端应 用，当匹配到微应用以后，再启动微应用路由，匹配具体的页面组件。

### 3. 微应用与微应用之间如何实现状态共享 ?

在微应用中可以通过发布订阅模式实现状态共享，比如使用 RxJS。

### 4. 微应用与微应用之间如何实现框架和库的共享？

通过 import-map 和 webpack 中的 externals 属性。

## system.js

微前端架构中，微应用被打包成模块，但浏览器不支持模块化，需要使用 system.js 实现浏览器中的模块化。

system.js 是一个用于实现模块化的 JavaScript 库，有属于自己的模块化规范。

开发阶段我们可以使用 ES 模块规范，然后使用 webpack 将其转换为 systemjs 支持的模块。

**通过 webpack 将 react 应用打包成 systemjs 模块，通过 system.js 在浏览器中加载模块 **

```js
npm install webpack@5.17.0 webpack-cli@4.4.0 webpack-dev-server@3.11.2 html-webpack-plugin@4.5.1 @babel/core@7.12.10 @babel/cli@7.12.10 @babel/preset-env@7.12.11  @babel/preset-react@7.12.10 babel-loader@8.2.2
```

```json
// package.json
{
  "name": "systemjs-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@babel/preset-react": "^7.12.10",
    "babel-loader": "^8.2.2",
    "html-webpack-plugin": "^4.5.1",
    "webpack": "^5.17.0",
    "webpack-cli": "^4.4.0",
    "webpack-dev-server": "^3.11.2"
  }
}

```

```js
// webpack.config.js
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "system"
 },
  devtool: "source-map",
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true
 },
  module: {
    rules: [
     {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"]
         }
       }
     }
    ]
 },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html"
   })
 ],
  externals: ["react", "react-dom", "react-router-dom"]
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>systemjs-react</title>
    <script type="systemjs-importmap">
      {
        "imports": {
          "react": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
          "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
          "react-router-dom": "https://cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js"
        }
      }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.0/dist/system.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      System.import("./index.js")
    </script>
  </body>
</html>
```

## single-spa

### 概述

single-spa 是一个实现微前端架构的框架。

在 single-spa 框架中有三种类型的微前端应用：

* single-spa-application / parcel：微前端架构中的微应用，可以使用 vue、react、angular 等框架。
* single-spa root config：创建微前端容器应用。
* unility modules：公共模块应用，非渲染组件，用于跨应用共享 javascript 逻辑的微应用。

### 创建容器应用

#### 1. 安装 single-spa 脚手架工具

安装脚手架

```js
npm install create-single-spa -g
```

查看当前安装脚手架的版本

```js
npm info create-single-spa
```

#### 2. 创建微前端应用目录

```js
mkdir workspace
```

#### 3. 创建微前端容器应用

```js
create-single-spa
```

* 应用文件名写 container

* 应用选择 single-spa root config

* 组织名称填写 yueluo

  组织名称可以理解为团队名称，微前端架构允许多团队共同开发应用，组织名称可以标识应用由那个团队开发。

  应用名称的命名规则为 @组织名称/应用名称。比如 @yueluo/todos

#### 4. 启动应用

```js
npm start
```

#### 5. 访问应用

```js
localhost:9000
```

#### 6. 默认代码解析

root-config.js

```js
import { registerApplication, start } from "single-spa";

// 注册微应用
registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/"],
});

// registerApplication({
//   name: "@yueluo/navbar",
//   app: () => System.import("@yueluo/navbar"),
//   activeWhen: ["/"]
// });

// 启动应用
start({
  urlRerouteOnly: true,
});
```

index.ejs

```html
<!-- 导入微前端容器应用 -->
<script>
  System.import("@study/root-config")
</script>
<!-- 
 import-map-overrides 可以覆盖导入映射
 当前项目中用于配合 single-spa Inspector 调试工具使用.
 可以手动覆盖项目中的 JavaScript 模块加载地址, 用于调试.
-->
<import-map-overrides-full show-when-local-storage="devtools" dev-libs></import-map-overrides-full>
```

```html
<!-- 模块加载器 -->
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.0/dist/system.min.js"></script>
<!-- systemjs 用来解析 AMD 模块的插件 -->
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.0/dist/extras/amd.min.js"></script>
<!-- 用于覆盖通过 import-map 设置的 JavaScript 模块下载地址 -->
<script src="https://cdn.jsdelivr.net/npm/import-mapoverrides@2.2.0/dist/import-map-overrides.js"></script>
<!-- 用于支持 Angular 应用 -->
<script src="https://cdn.jsdelivr.net/npm/zone.js@0.10.3/dist/zone.min.js"></script>
```

```html
<!-- single-spa 预加载 -->
<link
 	rel="preload"
  href="https://cdn.jsdelivr.net/npm/single-spa@5.8.3/lib/system/singlespa.min.js"
  as="script"
/>
```

```html
<!-- JavaScript 模块下载地址 此处可放置微前端项目中的公共模块 -->
<script type="systemjs-importmap">
 {
   "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/singlespa@5.8.3/lib/system/single-spa.min.js"
   }
 }
</script>
```

### 创建不基于框架的微应用

#### 1. 应用初始化

container 容器同级目录

```js
mkdir test
```

#### 2. 配置package.json

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.12.10",
    "single-spa": "^5.9.3",
    "webpack": "^5.51.1",
    "webpack-cli": "^4.8.0",
    "webpack-config-single-spa": "^5.0.0",
    "webpack-dev-server": "^4.0.0",
    "webpack-merge": "^5.8.0"
  }
}
```

#### 3. 配置 webpack

```js
const singleSpaDefaults = require('webpack-config-single-spa');
const { merge } = require('webpack-merge');

module.exports = () => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'yueluo',
    projectName: 'test'
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9001
    }
  });
}
```

#### 4. 编写生命周期钩子函数

src/yueluo-test.js

```js
let testContainer = null

export async function bootstrap () {
  console.log('应用正在启动');
}

export async function mount () {
  console.log('应用正在挂载');

  testContainer = document.createElement('div');
  testContainer.id = 'test-container';
  testContainer.innerHTML = 'hello, single spa test！'
}

export async function unmount () {
  console.log('应用正在卸载');
}
```

#### 5. 前端容器注册前端微应用

src/yueluo-root-config.js

```js
import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: ,
//   activeWhen: ["/"],
// });

registerApplication(
  "@single-spa/welcome", 
  () => System.import("https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"),
  (location) => location.pathname === '/'
);

registerApplication({
  name: "@yueluo/test",
  app: () => System.import("@yueluo/test"),
  activeWhen: ["/test"],
});

// registerApplication({
//   name: "@yueluo/navbar",
//   app: () => System.import("@yueluo/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
```

#### 6. 模板文件中指定模块地址

src/index.ejs

```html
<% if (isLocal) { %>
<script type="systemjs-importmap">
  {
    "imports": {
      "@yueluo/root-config": "//localhost:9000/yueluo-root-config.js",
      "@yueluo/test": "//localhost:9001/yueluo-test.js"
    }
  }
</script>
<% } %>
```

### 创建基于 react 框架的微应用

