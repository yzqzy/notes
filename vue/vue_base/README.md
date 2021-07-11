# Vue

## 渐进式框架、三大框架对比、数据流和绑定

Vue （发音类似于 view），是一套用于构建用户界面的渐进式框架。与其他大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整理。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

> 渐进式框架（progresive framework）：vue 对自己框架和其他框架对比后，生产的一个特定的名词。



Angular 是一个综合性框架，相对于 Vue 来说是一个开发平台。更加关注项目应用，不是只解决视图渲染或者状态管理。适合开发大型应用。项目级别应用。自上而下的开发。

React 仅关注用户界面，view 层，将数据渲染到视图中，它仅关注一个点，即视图，是一个库。不提供状态管理和路由，需要依赖 redux 和 react-router。

Vue 仅关注用户界面，view 层，关注把数据渲染到视图中，仅关注一个点视图。核心库只关心视图层。它和 React 不同的是，还提供了 vuex 、vue-router 库，可以选择集成，没有任何学习难度。



Micro libs 微型库。



React 和 Vue 都是自下向上开发，Angular 是自顶向下开发。

Vue 和 Angular 相对于 React 是强规范，约束性很强。React 没有特殊性，可以使用 class 或者 函数，只是要求使用 JSX 开发视图。

React 比较灵活，可以有自己千变万化的设计思路。

Vue 先给一个关注点视图，如果需要状态管理，路由和 SSR，都可以找到相对应的方案，这就是 Vue 渐进式的思想。



数据绑定和数据流

数据绑定即数据与视图渲染直接的关系

* React 是单向数据绑定，必须通过事件触发数据的修改，导致视图变更；
* Vue  是双向数据绑定，存在 v-model 机制，可以完成视图变化导致 state/data 变更，v-model 封装了事件处理函数；



数据流即父子组件中数据按照什么方向流动。

React 和 Vue 都是单向数据流，父组件传递 state 给子组件作为 props，子组件获取的 props 变更，不能导致 state 变更。只能父组件的 state 变更导致子组件的 props 变更。

>  props：immutable value、state/data：mutable value

## Vue 项目的构建方式

### vite、CDN 的方式

vue3：https://v3.cn.vuejs.org/guide/introduction.html

> https://unpkg.com/browse/vue@3.1.4/dist/

> https://unpkg.com/browse/vue@3.1.2/dist/vue.global.js
>
> 可以选择版本，这里演示的是 vue2 的版本。

```js
yarn add vite -D
```

```js
"scripts": {
  "dev": "vite"
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div id="app"></div>

    <script src="https://unpkg.com/vue@3.1.2/dist/vue.global.js"></script>
    <script type="module" src="./src/main.js"></script>

</body>

</html>
```

```js
// main.js

const { createApp } = Vue;

const App = {
  data () {
    return {
      text: 'Hello Vue！！！'
    }
  },
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  methods: {
    change () {
      this.text = 'Hello Vite';
    }
  }
}

createApp(App).mount('#app');

// vue2
// new Vue({
//  render: h => h(App)
//}).$mount('#app');
```

```js
yarn dev
```



```js
// main.jconst { createApp, ref } = Vue;

const App = {
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  setup () {
    const text = ref('Hello Vue!!!');

    const change = () => {
      text.value = 'Hello Vite!!!'
    };

    return {
      text,
      change
    };
  }
}

createApp(App).mount('#app');s

const { createApp, ref } = Vue;

const App = {
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  setup () {
    const text = ref('Hello Vue!!!');

    const change = () => {
      text.value = 'Hello Vite!!!'
    };

    return {
      text,
      change
    };
  }
}

createApp(App).mount('#app');
```

### vitejs 的方式

可以使用 create-vite-app 的方式创建 vite 项目。

```js
npm init @vitejs/app vue-vite // 使用命令并搭建 vue 项目
```

```js
yarn dev
```

这种构建方式只针对于 vue3，只可以开发 vue 3。



vite 也可以使用 cdn 引入 vue 的方式，可以减少打包体积。

### vue-cli 脚手架

```js
npm i @vue/cli -g
```

```js
vue create vue-cli-demo
```

> 3.x 很大程度上是向后兼容的。

```js
yarn serve
```



改造：NPM 转为 CDN 地址

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>

    <!-- built files will be auto injected -->
    
    <script src="https://unpkg.com/vue@3.1.2/dist/vue.global.js"></script>

  </body>
</html>
```

main.js

```js
// import { createApp } from 'vue'; 引入全局 CDN 文件，不使用 NPM 库

const { createApp } = Vue;

import App from './App.vue'

createApp(App).mount('#app')
```

vue.config.js

```js
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue'
    }
  }
}
```

可以安装 dev-tools ，调试 vue 项目。

## webpack 搭建 vue2/3 项目

```js
mkdir vue-webpack
```

```js
npm init -y
```

```js
yarn add webpack@4.44.2 webpack-cli@3.3.12 webpack-dev-server@3.11.2 -D
```

```js
"dev": "webpack-dev-server"
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app"></div>
	
  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.1.2/dist/vue.global.js"></script>
  
</body>
</html>
```



```js
yarn add vue-loader@next @vue/compiler-sfc vue-template-compiler html-webpack-plugin@4.5.0 -D
```

> vue 2 需要降低 vue-loader 版本，上述配置支持 vue3，测试项目可以自己搭建，生产环境建议还是使用脚手架工具
>
> 低版本：npm i vue-loader -D
>
> 高版本：npm i vue-loader@next -D



```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js'
  },
  externals: {
    'vue': 'Vue'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
```

```js
yarn dev
```

## vue 以及基本用法

