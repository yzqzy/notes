# interview

## personal blog

* 代码优化
  * remove axios，use $fetch
  * remove highlight.js
  * remove alicdn, use custom cdn
* 自定义拆包
  * `rollupOptions.output.manualChunks`
* preload
  * 字体文件预加载
* Accessiblity 优化
  * `<a class="pc" aria-label="website">`
* 代理服务器缓存
  * nginx 反向代理设置缓存
* cdn 缓存
  * 静态资源开启 cdn 缓存
* redis 缓存
  * 相同请求使用 redis 缓存处理
  * 更新/添加/删除文章，删除缓存

## network

### TCP/IP 网络分层模型

从下向上划分。

* 链接层（link layer）
  * 以太网、Wifi 底层网络发送原始数据包，工作在网卡层次，使用 MAC 标记网络设备
* 网际层或者网络互联层（internet layer），IP 协议就处于这一层
  * IP 协议定义了 IP 地址，可以在链接层基础上，用 IP 地址取代 MAC 地址
* 传输层（transport layer）
  * TCP、UDP 协议工作层次
* 应用层（application layer）
  * HTTP、Telnet、SSH、FTP、SMTP 等

### OSI 网络分层模型

开放式系统互通通信参考模型（Open System Interconnection Reference Model）。仅是一个参考，并不是强制标准。

从下向上划分。

* 物理层，网络的物理形式
* 数据链路层，相当于 TCP/IP 的链接层
* 网络层，相当于 TCP/IP 的网际层
* 传输层，相当于 TCP/IP 的传输层
* 会话层，维护网络中连接状态，保持会话和同步
* 表示层，把数据转换为合适、可理解的语法和语义
* 应用层，面向具体的应用传输协议

五六七层统一对应 TCP/IP 的应用层。

### HTTP

HTTP（HyperText Transfer Protocol） 是一个在计算机世界里用于专门在两点之间传输文本、图片、音频、视频等超文本数据的约定和规范。

HTTP 跑在 TCP/IP 协议栈之上，依靠 IP 协议实现寻址和路由、TCP 协议实现可靠数据传输、DNS 协议实现域名查找、SSL/TLS 协议实现安全通信。

特点：灵活可扩展、可靠的传输协议、应用层协议、使用请求-应答模式、无状态协议、明文传输（不安全）

### WebSocket

WebSocket 协议依赖于 HTTP。

WebSocket 是一个 “全双工” 的通讯协议，与 TCP 一样，客户端和服务端都可以随时向对方发送数据。

WebSocket 握手是一个标准的 HTTP Get 请求。

但是要带上两个协议升级的头字段：

* Connection: Upgrade，表示要求协议升级
* Upgrade: websocket，表示要升级成 WebSocker 协议

还增加了两个额外的认证头字段：

* Sec-WebSocket-Key：一个 base64 编码的 16 字节随机数，作为简单的认证密钥
* Sec-WebSocket-Version：协议版本号，当前必须是 13

服务端会返回特殊的 “101 Switching Protocols” 响应报文，接下来请求就用 HTTP，改用 WebSocket 协议进行通信。

### 状态码

1xx：提示信息，目前是协议处理的状态，需要后续操作

* 101 Switch Protocols，客户端使用 Upgrade 头字段，要求协议升级，比如 WebSocket 。

2xx：成功态，报文已经收到并被正确处理

* 200 OK，常见成功状态码，响应头后通常存在 body 数据
* 204 No Content，常见成功状态码，响应头通常不存在 body 数据
* 206 Partial Content，HTTP 分块下载或断点续传的基础，客户端发送范围请求，服务端成功处理后，返回部分资源
  * 206 通常伴随头字段 Content-Range

3xx：重定向，资源位置发生变动，需要客户端发送请求

* 301 永久重定向
* 302 临时重定向
* 304 Not Modified 表示资源未修改

4xx：客户端错误，请求报文错误，服务器无法处理

* 400 Bad Request，通用的错误，表示请求报文错误
* 403 Forbidden，服务端禁止访问资源
* 404 Not Found，本意服务器无法提供资源，未找到资源
* 405 Method Not Allowed，不允许使用某些方法操作资源
* 408 Request Timeout，请求超时

5xx：服务端错误，服务器处理时内部发生错误

* 500 Internal Server Error，通用错误码
* 502 Bad Gateway，服务器网关错误或者代理错误
* 503 Service Unavailable，服务器正忙，无法响应服务，503 是一个临时状态

## browser

### cache

ETag: W/"29322-09SpAhH3nXWd8KIVqB10hSSz66"

`w/` 代表当前是弱 eTag，弱 eTag 只用于提示资源是否相同，只要求资源在语义上没有变化即可，只有资源发生根本改变，才会改变 eTag 值

> 语义没有变化，内容可能会有变化，例如 HTML 里的标签顺序调整，或者多出几个空格。



缓存新鲜度 = max-age || (expires - date)

当响应报文中没有 max-age、s-maxage 或 expries 字段值，但又存在强缓存控制字段时，这时会触发启发式缓存。

缓存新鲜度 = max(0,（date - last-modified)) * 10%

> 根据响应头报文中 date 与 last-modified 值之差与 0 取最大值取其值的百分之十作为缓存时间。
>
> [Caching in HTTP](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2FProtocols%2Frfc2616%2Frfc2616-sec13.html%23sec13.2.4) 



频繁变动的资源，比如 HTML，采用协商缓存。CSS、JS、图片等资源采用强缓存，使用 hash 命名。

### chrome cache

#### 正常模块加载

```
Mac：Command + R
Windows：Ctrl + R（F5）
```

刷新网页，该模式下大多数资源会命中强缓存（memory cache）。

#### 硬盘重新加载

```
Mac：Command + shift + R
Windows：Ctrl + shift + R（Ctrl + F5）
```

这种模式会在资源请求头部增加 `cache-control: no-cache` 和 `pragma: no-cache`，向源服务器发起请求，确认是否存在新版本，不存在新版本使用本地缓存。

> pragma 字段是为了兼容 HTTP/1.0，不推荐使用

硬盘重新加载不会清空缓存而是禁用缓存，类似开发者工具 Network 面板的 Disable cache 选项。

## vue

### cli

#### vue-cli

vue-cli 创建的项目使用 webpack 打包构建。

目前处于维护状态，不会进行特性更新，推荐使用 create-vue 。

> Vue CLI is now in maintenance mode. For new projects, please use [create-vue](https://github.com/vuejs/create-vue) to scaffold [Vite](https://vitejs.dev/)-based projects. `create-vue` supports both Vue 2 and Vue 3.

cli：[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

模板是动态创建的。

```js
npm install -g @vue/cli
```

```js
vue create hello-world
```

#### create-vue

create-vue 创建的项目使用 vite 打包构建

```js
npm init vue@3 // vue3 项目
npm init vue@2 // vue2 项目
```

cli：[https://github.com/vuejs/create-vue](https://github.com/vuejs/create-vue)

template：[https://github.com/vuejs/create-vue-templates](https://github.com/vuejs/create-vue-templates)

### 响应式原理

### compiler  过程

vue 2 parse、optimize、generate

[compiler](https://github.com/vuejs/vue/blob/main/src/compiler/index.ts)

vue 3  parse（baseParse）、transform、generate

[compiler](https://github.com/vuejs/core/blob/main/packages/compiler-core/src/compile.ts#L85)

### parser  实现原理

对于 HTML 解析是有规范可循的，即 WHATWG 关于 HTML 的解析规范，其中定义了完整的错误处理和状态机的状态迁移过程。

vue.js 3 模板解析器使用递归下降算法构造模板 AST。

通过递归调用 parseChildren 函数不断地消费模板内容，返回解析得到的子节点，最终得到一棵树形结构的模板 AST。

[vue3 baseParse](https://github.com/vuejs/core/blob/main/packages/compiler-core/src/parse.ts#L104)

[解释器原理](https://www.yueluo.club/detail?articleId=62cd9984397c3e0980cd0e6a)

### optimize

#### 响应式系统

* vue.js 2 响应系统和核心是 defineProperty
  * 初始化时就遍历所有属性，包括用不到的属性
* vue.js 3 使用 Proxy 对象重写响应式系统
  * 不需要遍历所有属性，当访问到某个属性时才会递归处理，收集依赖
  * 可以监听动态新增属性
  * 可以监听删除属性
  * 可以监听数组的索引和 length 属性

#### 编译优化

[编译优化](https://www.yueluo.club/detail?articleId=62d0ab22397c3e0980cd2090)

[https://v2.template-explorer.vuejs.org](https://v2.template-explorer.vuejs.org)

[https://template-explorer.vuejs.org](https://template-explorer.vuejs.org)

优化思路：尽可能区分动态内容和静态内容，并针对不同的内容采用不同的优化策略。

vue.js 3 编译器会把编译时关键信息添加到虚拟 DOM 上，渲染器会根据这些关键信息进行优化。

* vue.js 2 通过标记静态根节点，优化 diff 过程
  * diff 时仍需要进行判断，存在一定的性能开销

* vue.js 3 标记和提升所有的静态根节点，diff 的过程中只需要对比动态节点内容
  * 动态节点收集与补丁标志（Patch Flag、Block）
    * 只要存在 patchFlag 节点，就认为它是动态节点，pacthFlag 即补丁标志
    * 虚拟节点的创建阶段会根据 patchFlag 提取动态子节点，并存储到 dynamicChildren 数组中，带有该属性的虚拟节点就是 块（Block）。
    * Block 既可以收集自身动态子节点，还可以收集子代节点的动态子节点。
    * 渲染器更新会以 Block 为维度进行更新。忽略 children 数组，直接寻找 dynamicChildren 数组进行更新。
    * 除了根节点之外，任何带有结构化指令的节点都是 Block，比如 v-if、v-for。
  * 静态提升
    * 将静态节点提升到渲染函数之外，仅保持引用，渲染函数执行时，不会重新创建静态虚拟节点，避免额外性能开销
  * 预字符串化
    * 基于静态提升的优化策略
    * 将大量连续静态标签节点序列化字符串，生成 static vnode
  * 缓存内联事件处理函数
    * `cache[0] || (cache[0] = ($event) => (ctx.a + ctx.b))`

#### 优化打包体积

* vue.js 3 中移除了一些不常用的 API
  * inline-template、filter 等
* Tree-shaking
  * 基于 ES Module 规范，支持静态分析，进行 Tree-shaking


### vuex、pinia

[https://github.com/yw0525/notes/tree/master/vue/vuex/src/store/vuex](https://github.com/yw0525/notes/tree/master/vue/vuex/src/store/vuex)

[https://github.com/yw0525/notes/tree/master/hand_writing/vuex_with_pinia](https://github.com/yw0525/notes/tree/master/hand_writing/vuex_with_pinia)

### vue-router

[https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow](https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow)

[https://github.com/yw0525/notes/blob/master/vue/vue_router_plus/test/src/vue-router/index.js](https://github.com/yw0525/notes/blob/master/vue/vue_router_plus/test/src/vue-router/index.js)

[https://github.com/yw0525/notes/blob/master/vue/vue_router/src/router/vue-router.js](https://github.com/yw0525/notes/blob/master/vue/vue_router/src/router/vue-router.js)

## build tools

