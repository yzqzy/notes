# Vue 源码重写

## 搭建 webpack 开发环境

### 安装环境

```js
npm iniy -y
```

```js
npm i webpack webpack-cli webpack-dev-server -D
```

```js
npm i html-webpack-plugin -D
```

### 编写脚本文件

```js
"scripts": {
  "dev": "webpack serve",
  "build": "webpack"
},
```

### 编写配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 代码调试，配置源代码映射
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
```

source-map 生效的前提是入口文件中存在 js 代码。

编写 resolve 解析配置，指向本地源码路径 source。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 代码调试，配置源代码映射
  devtool: 'source-map',
  // 解析路径配置
  resolve: {
    modules: [
      path.resolve(__dirname, 'source'),
      path.resolve('node_modules')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
```

### 编写 html 文件

根目录下建立 public 目录，创建 index.html。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>手写 Vue</title>
</head>
<body>
  
  <div id="app"></div>

</body>
</html>
```

## 编写 vue 测试用例

src/index.js

```js
import Vue from 'vue';

let vm = new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello Vue',
      nums: [ 1, 5, 7 ],
      person: {
        name: 'Mike',
        age: 20
      }
    }
  },
  computed: {},
  watch: {}
});
```

## 编写 vue 源码



### 对象劫持，访问属性代理

```js

```

### 数组劫持

```js

```

### 数组劫持缺点

* 数组索引修改元素，无效；
* 数组长度修改，无效；