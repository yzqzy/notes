# 模块联邦

## 概述

Module Federation 即为模块联邦，是 webpack 5 中新增的一项功能，可以实现跨应用共享模块。

## 快速使用

### 需求

通过模块联邦在容器应用中加载微应用。

### 创建应用结构

```js
products
	package-lock.json
  package.json
	public
  	index.html 
  src
  	index.js
	webpack.config.js
```

### 初始化微应用和容器应用

#### 编写产品列表

```js
import faker from "faker"

let products = ""

for (let i = 1; i <= 5; i++) {
  products += `<div>${faker.commerce.productName()}</div>`
}

document.querySelector("#dev-products").innerHTML = products
```

#### 编写 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>产品列表</title>
  </head>
  <body>
    <div id="dev-products"></div>
  </body>
</html>
```

#### webpack 配置

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  devServer: {
    port: 8081
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

#### 添加应用启动命令

```js
{
  "name": "products",
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
    "faker": "^5.2.0",
    "html-webpack-plugin": "^4.5.1",
    "webpack": "^5.19.0",
    "webpack-cli": "^4.4.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

通过 copy 的方式创建 container 和 cart，端口分别为 8080，8082

```js
yarn start
```

### Module Federation

通过配置模块联邦在容器应用中加载产品列表微应用

#### 模块导出

```js

```

#### 模块导入

### 文件打包加载分析

### 加载 cart 微应用

## 共享模块

