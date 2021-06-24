## RPC 调用

Remote Rroducture Call（远程过程调用）。

RPC 与 Ajax 对比

* 相同点
  * 都是两个计算机之间的网络通信
  * 需要双方约定一个数据格式

* 不同点
  * 不一定使用 DNS 作为寻址服务
  * 应用层协议一般不使用 HTTP
  * 基于 TCP 或 UDP 协议

  

寻址/负载均衡

> Ajax：使用 DNS 进行寻址、RPC：使用特有服务进行寻址



TCP 通讯方式

> 单工通信。半双工通信。全双工通信。



二进制协议

> 更小的数据包体积。更快的编解码速率。



RPC 通信一般用于服务端与服务端通信。

##静态资源渲染

```js
const koa = require('koa');
const fs = require('fs');
const path = require('path');
const mount = require('koa-mount');
const static = require('koa-static');

const app = new koa();

app.use(
  static(path.join(__dirname, '/source/'))
);

app.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(path.join(__dirname, '/source/index.htm'), 'utf-8')
  })
);

app.listen(4000);

module.exports = app;
```

## ES6 模板字符串改造为模板引擎

```js
const user = {
  name: 'yueluo<sciprt></sciprt>'
};

const vm = require('vm');

const normalizeStr = (markup) => {
  if (!markup) return '';

  return String(markup)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

const templateMap = {
  templateA: '`<h2>${ _(user.name) }</h2>`',
  templateB: '`<h2>${ _(user.name) }</h2>`'
}

const context = {
  user,
  include: (name) => {
    return templateMap[name];
  },
  helper: () => {},
  _: normalizeStr
}

Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key];

  templateMap[key] = vm.runInNewContext(`
    (function () {
      return ${temp}
    });
  `, context);
});

console.log(templateMap['templateA']());
```

## 前后端同构

```js
ReactDOMServer.renderToString()
VueServerRenderer.renderToString()
```

```js
npm i react react-dom
npm i @babel/register @babel/preset-react @babel/core
```

```js
require('@babelregister')({
  presets: ['@babel/preset-react']
});

const ReactDOMServer = require('react-dom/server');

ReactDOMServer.renderToString({
  require('./index.jsx')
});
```



React/Vue 同构的最大难题是数据部分。

Next.js React 服务端渲染问题。



同构的关键：

* 注重职责的分离

## 性能工具：Http 服务性能测试

项目开发 => 性能优化 => 项目上线。

* 优化性能，首先要做性能检查
  * 压力测试工具
    * ab
    * webbench

```js
// ab

ab -c200 -n1600 http://127.0.0.1:3000/download/
```

* 找到性能瓶颈所在地
  * top：检测 cpu 和 内存使用情况
  * iostat：检测 IO 设备带宽，硬盘 IO。
  * 后端服务器可能存在性能瓶颈（不是 node 中间层问题）

> 一般性能瓶颈都在 node cpu 运算能力上，做一些 js 运算 等操作。

## 性能工具：NodeJs 性能分析工具

工具

* Node.js 自带 profile 工具

```html
node --prof index.js

ab -c50 -t http://127.0.0.1:3000/hello
```

```html
node --prof-process *.log > profile.txt
```

* Chrome devtool

```html
node --inspect -brk index.js
```

然后打开 chrome 浏览器，输入网址 `chrome://inspect`，查看 Remote Target。然后压测，查看分析报告。

* Clinic.js  提供更多可视化图标

```js
npm i -g clinic
```

## 代码优化

### JS 代码优化

ctx.body 底层还是会将返回内容转换为 buffer，这部分可以提前做。

```js
const str = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');

app.use(
	mount('/', async (ctx) => {
    ctx.body = str;
  });
)
```

```js
const buffer = fs.readFileSync(__dirname + '/source/index.html');

app.use(
	mount('/', async (ctx) => {
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = buffer;
  });
)
```

性能优化

* 减少不必要的计算
* 空间换时间

在用户能感知到的时间里，哪些计算是不必要的？



Node.js HTTP 服务性能优化准则：

* 提前计算

### 内存管理优化

垃圾回收

* 新生代
  * 容量小，垃圾回收更快
* 老生代
  * 容量大，垃圾回收更慢



减少内存使用，也是提高服务性能的手段。

* Node.js Buffer 的内存分配策略

  * 大于 8 kb、小于 8 kb  

  * buffer 对应 c++ 中的 char []  数组，对于小于 8 kb 的buffer，会复用内存空间
* 使用 ”池“



如果存在内存泄漏，会导致服务性能大大降低。

> 可以使用 chrome devtool 查看内存是否泄露。

### Node.js C++ 插件
