# webpack

模块化的问题

* ES Modules 存在兼容问题。

* 模块文件过多，网络请求频繁。
* 所有的前端资源都需要模块化。

前端领域有一些工具就很好的解决了以上问题，比如 Webpack、Parcel、Rollup。

以 webpack 为例，webpack 模块打包器（module bundler），提供以下功能：

* 模块加载器（Loader）
* 代码拆分（Code Splitting）
* 资源模块（Asset Module）

打包工具解决的是前端整体模块化，并不单指 JavaScript 模块化。

## 快速上手

```js
pnpm i webpack webpack-cli -D
```

```js
pnpm webpack --version

// webpack: 5.74.0
// webpack-cli: 4.10.0
// webpack-dev-server not installed
```



```js
// src/index.js

import createHeading from './headling'

const headling = createHeading()

document.body.append(headling)
```

```js
// src/headling.js

export default () => {
  const element = document.createElement('h2')

  element.textContent = 'Hello World'
  element.addEventListener('click', () => {
    alert('Hello webpack')
  })

  return element
}
```

```
pnpm webpack
```

## 配置文件

webpack 4 之后的版本支持零配置的方式启动打包。

整个打包过程会按照约定将 `src/index.js`  作为打包入口。

`src/index.js` -> `dist/main.js`。

可以在项目根目录下建立 `webpack.config.js` 文件

```js
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

可以配置 scripts 脚本

```json
{
  "name": "01_helloworld",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  }
}
```

运行命令

```js
pnpm build
```

## 工作模式

针对不同环境预设的配置。

production（默认）、development、node

[webpack mode](https://webpack.js.org/configuration/mode/#usage)

[webpack default options](https://github.com/webpack/webpack/blob/main/lib/config/defaults.js)

## 打包结果运行原理

可以先设置 mode 为 none。

> vscode ctrl + k，ctrl + 0 可以折叠代码

<img src="./images/bundle_analysis.png" />

可以使用浏览器单步调试代码执行过程。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack</title>
</head>
<body>
  
  <script src="./dist/bundle.js"></script>

</body>
</html>
```

## 资源模块加载

