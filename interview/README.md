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

