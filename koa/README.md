# Koa

## 一、 Kao、MVC、Node中间层、上层设计

Koa 基于 Node.js 平台的下一代 web 开发框架。

### 1. Koa 简介

Kao 是一个新的 web 框架，由 Express 幕后的原班人马打造，致力于成为 web 应用和 API 开发领域中一个更小、更富有表现力、更健壮的基石。
通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。
Koa 并没有捆绑任何中间件，而是提供了一套优雅的解决方案，帮助您快速而愉快地编写服务端应用程序。

Kao 是无上层设计的框架。
EggJS 是基于 Koa 开发的上层框架（MVC 开发模式的上层设计）。

### 2. MVC

#### 2.1  M（model） 模型  

操作数据表/请求数据 （JAVA PHP PYTHON）
前端向 NODE（中间层） 层请求数据，NODE 再向纯后端请求数据。

为什么需要 NODE 做中间层？

* 首屏服务端渲染（server side rendering）。
  前端页面是一个完整页面（非JS在前端获取数据再组装页面）SEO不好。
  Node 作为后端可以组装页面，可以直接将页面返回前端，不需要额外操作。

* Node 发展较晚、数据接口基本都是传统后端语言编写，没有必要用 Node 重构。
  Node 不适用高性能运算、数据分析、访问量大的场景（相比较Java、优势不大）。

为什么不用 JAVA 组装页面？

* 本身希望前后端是分离的，如果使用 JAVA 组装页面，还需要负责样式、JS。
* Node 使用 JS、TS 编写的，完全可以由前端来组装页面。
  后端只负责接口开发，只负责数据部分。
  前端负责交互、后端负责数据。

#### 2.2 V（view）视图

HTML、视图模板。

#### 2.3 C（controller）控制器

数据接口、提供视图数据。

## 二、Koa用法、Node中间层与前端渲染的区别

```js
npm i koa -D
```

listen 监听服务
use 注册中间件函数
on 监听事件

```js
const Kao = require('koa');

const app = new Kao();

app.use((ctx, next) => {
  ctx.body = 'Hello Koa.';
});

app.listen(3000);
```

ctx 是 Koa 的执行期上下文。
req res 都在 ctx 中。原生。
ctx.request ctx.response。封装。
ctx.body === ctx.response.body

## 三、了解Koa的设计、搭建Koa源码架子

```js
// main - lib - application.js
const Koa = require('koa');

// class Application 实例化
const app = new Koa();

/**
 * 三个重要的app对象下的API
 * listen 监听服务
 * use：注册中间件函数
 * on：监听事件
 */

/**
 * @param {object} ctx - 执行期上下文
 *  包含执行期所需要的所有方法和属性
 *  例如：request、response
 */
app.use((ctx) => {
  console.log(ctx.path); // 封装 代理到 ctx.request.path
  console.log(ctx.request.path); // 封装
  console.log(ctx.request.req.url); // 原生
  console.log(ctx.req.url); // 原生
});

app.listen(3000);
```

```js
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
  constructor () {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use (callback) {
    this.callback = callback;
  }

  listen (...args) {
    const httpService = http.createServer(this.handleHttpRequest.bind(this));
    httpService.listen(...args);
  }

  handleHttpRequest (req, res) {
    const ctx = this.createContext(req, res);
    this.callback(ctx);
  }

  createContext (req, res) {
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.request.req = ctx.req = req;
    ctx.response.res = ctx.res = res;
    return ctx;
  }
}

module.exports = Application;
```

## 四、请求拦截与上下文代理方案


```js
const { defineGetter } = require('./utils');
const { PROXY_REQUEST_GETTER_KEYS } = require('./config');

const proto = {};

const defineRequestGetter = defineGetter(proto, 'request');

PROXY_REQUEST_GETTER_KEYS.forEach(key => {
  defineRequestGetter(key);
})

module.exports = proto;

/**
 * ctx.path -> ctx.request.path
 * ctx.url -> ctx.request.url
 * Object.defineProperty
 *  Object.__defineGetter__ 拦截获取值
 *  Object.__defineSetter__ 拦截设置值
 */
```

```js
const url = require('url');

module.exports = {
  get path () {
    return url.parse(this.req.url).pathname;
  },

  get url () {
    return this.req.url
  }
}
```

## 五、响应拦截、响应代理、处理响应内容
