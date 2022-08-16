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


## vue


vue 2 parse、optimize、generate

vue 3  parser、transform、generate

### parser 实现原理



### vue.js 3 optimize

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

