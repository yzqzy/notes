# 基于模块联邦的微前端实现方案

## 微前端应用案例概述

案例中包含三个微应用，分别为 marketing、Authentication 和 Dashboard。

* Marketing：营销微应用，包含首页组件和价格组件
* Authentication：身份验证微应用，包含登录组件
* Dashboard：仪表盘微应用，包含仪表盘组件

<img src="./images/1.png" />

容器应用、营销应用、身份验证应用使用 React 框架，仪表盘使用 Vue 框架。

<img src="./images/2.png" />

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

## Marketing 创建挂载方法

bootstrap.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

function mount (el) {
  ReactDOM.render(<div>Marketing workds</div>, el);
}

if (process.env.NODE_ENV == 'development') {
  const el = document.querySelector('#dev-marketing');

  if (el) mount(el);
}

export { mount };
```

## Marketing 创建路由

### 1. 创建 components 文件夹

### 2. 创建 App 组件，编写路由

```jsx
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Pricing from './components/Pricing';

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function mount (el) {
  ReactDOM.render(<App />, el);
}

if (process.env.NODE_ENV == 'development') {
  const el = document.querySelector('#dev-marketing');

  if (el) mount(el);
}

export { mount };
```

## Container 应用初始化

### 1. 创建应用结构

基于 marking 应用进行拷贝修改。

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

### 2. 修改 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Container</title>
</head>
<body>
  
  <div id="root"></div>

</body>
</html>
```

### 3. 修改 App.js

```js
import React from 'react';

function App () {
  return <div>Container works</div>;
}

export default App;
```

### 4. 修改 bootstrap.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function mount (el) {
  ReactDOM.render(<App />, el);
}

if (process.env.NODE_ENV == 'development') {
  const el = document.querySelector('#root');

  if (el) mount(el);
}

export { mount };
```

### 5. 修改 webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
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

## 容器应用加载 Marketing 应用

### marketing 应用

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
    // 导出模块
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        "./MarketingApp": "./src/bootstrap.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
```

### Container 应用

components/MarketingApp

```js
import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';

export default function MarketingApp () {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, []);

  return (
    <div ref={ ref }></div>
  );
}
```

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
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
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
```

App.js

```js
import React from 'react';
import Marketing from './components/MarketingApp';

function App () {
  return <Marketing />;
}

export default App;
```

