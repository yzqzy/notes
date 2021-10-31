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

通过配置模块联邦在容器应用中加载产品列表微应用。

#### 模块导出

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8081
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEnetry.js",
      exposes: {
        "./Index": "./src/index"
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

#### 模块导入

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8080
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        products: "products@http://localhost:8081/remoteEntry.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

```js
// index.js
import("products/Index").then(products => {
  console.log(products);
});
```

这时就已经可以在 container 容器中加载 products 应用。但是上面这种方式加载在写法上多了一层回调函数，所以一般都会在 src 文件夹中建立 bootstrap.js，这样可以在形式上将写法变成同步。

bootstrap.js

```js
// import("products/Index").then(products => {
//   console.log(products);
// });

import "products/Index";
```

index.js

```js
import("./bootstrap");
```

### 文件打包加载分析

#### products 应用打包分析

<img src="./images/1.png" />

#### container 应用打包分析

<img src="./images/2.png" />

#### 文件加载顺序分析

<img src="./images/3.png" />

### 加载 cart 微应用

**cart 微应用**

```js
import faker from "faker"

document.querySelector("#dev-cart").innerHTML = `在您的购物车中有${ faker.random.number() }件商品`
```

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8082
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./Index": "./src/index"
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

**container 容器**

webpack.config.js

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8080
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        products: "products@http://localhost:8081/remoteEntry.js",
        cart: "cart@http://localhost:8082/remoteEntry.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

bootstrap.js

```js
// import("products/Index").then(products => {
//   console.log(products);
// });

import "products/Index";
import "cart/Index";
```

## 共享模块

### 实现模块共享

**问题：**

在 products 和 cart 中都需要 faker，当 container 加载这两个模块后，faker 被加载两次。

**解决方案：**

分别在 products 和 cart 的 webpack 配置文件中的模块联邦插件中添加以下代码。

> 共享模块需要异步加载，在 product 和 cart 都需要添加 bootstrap.js

**products**

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8081
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./Index": "./src/index"
      },
      shared: ["faker"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

bootstrap.js

```js
import faker from "faker"

let products = ""

for (let i = 1; i <= 5; i++) {
  products += `<div>${faker.commerce.productName()}</div>`
}

document.querySelector("#dev-products").innerHTML = products
```

index.js

```js
import("./bootstrap");
```

**cart**

webpack.config.js

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8082
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./Index": "./src/index"
      },
      shared: ["faker"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
```

bootstrap.js

```js
import faker from "faker"

document.querySelector("#dev-cart").innerHTML = `在您的购物车中有${ faker.random.number() }件商品`
```

index.js

```js
import("./bootstrap");
```

重启应用后，faker 模块只会被加载一次。

### 共享模块版本冲突解决

如果多个微应用之间的共享模块版本不同，通过查看网络控制面板可以发现，共享库还是会被加载多次，模块共享失败。

解决方法是分别在 products 和 cart 中的 webpack 配置中加入如下代码。

```js
shared: {
  faker: {
    singleton: true
  }
}
```

上述配置的含义是如果版本不一致，使用高版本。但同时会在原本使用低版本的共享模块应用的控制台中给与警告提示。

## 开放子应用挂载接口

