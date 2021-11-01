# 基于模块联邦的微前端实现方案

## 微前端应用案例概述

案例中包含三个微应用，分别为 marketing、Authentication 和 Dashboard。

* Marketing：营销微应用，包含首页组件和价格组件
* Authentication：身份验证微应用，包含登录组件
* Dashboard：仪表盘微应用，包含仪表盘组件

TODO

容器应用、营销应用、身份验证应用使用 React 框架，仪表盘使用 Vue 框架。

TODO

## Marketing - 应用初始化

### 1. 创建应用解构

```js
public
	index.html
src
	bootstrap.js
	index.js
package-lock.json
package.json
webpack.config.js
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marketing</title>
</head>
<body>
  
  <div id="dev-marketing"></div>

</body>
</html>
```

src/bootstrap.js

```js
console.log('marketing');
```

src/index.js

```js
import("./bootstrap");
```

### 2. 配置 webpack

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
    // 使用 html5 history API 时，所有的 404 请求都会响应 index.html 文件 
    historyApiFallback: true 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // 1. 避免 babel 语法转义后，函数重复
            // 2. 避免 babel polyfill 将 API 添加到全局
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
```

### 3. 添加启动命令

```js
"scripts": {
  "start": "webpack serve"
}
```

## Marketing - 创建挂载方法

