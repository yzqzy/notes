# Fiber

## 开发环境配置

### 目录介绍

| 文件/文件夹              | 描述                    |
| ------------------------ | ----------------------- |
| src                      | 源代码                  |
| dist                     | 存储客户端打包文件      |
| build                    | 存储服务端打包文件      |
| server.js                | 服务端代码              |
| webpack.config.server.js | 服务端 webpack 配置文件 |
| webpack.config.client.js | 客户端 webpack 配置文件 |
| babel.config.js          | bable 配置文件          |

### 项目依赖

```js
npm init -y
```

```js
yarn add webpack webpack-cli webpack-node-externals @babel/core @babel/preset-env @babel/preset-react babel-core babel-loader nodemon npm-run-all -D
```

```js
yarn add express -D
```

### 服务端打包配置

.babel.cofig.js

```js
module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

server.js

```js
import express from "express";

const app = express();

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`

app.get("*", (req, res) => {
  res.send(template);
});

app.listen(4000, () => console.log('server is running.'));
```

webpack.config.server.js

```js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: [ nodeExternals() ]
}
```

package.json

```js
{
  "name": "fiber",
  "version": "1.0.0",
  "description": "",
  "main": "babel.config.js",
  "scripts": {
    "dev:serve-compile": "webpack --config webpack.config.server.js --watch",
    "dev:serve": "nodemon ./build/server.js",
    "start": "npm-run-all --parallel dev:*"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.2.2",
    "express": "^4.17.1",
    "nodemon": "^2.0.12",
    "npm-run-all": "^4.1.5",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0",
    "webpack-node-externals": "^3.0.0"
  }
}
```

执行 yarn start 就可以启动本地开发服务器。

### 客户端打包配置

