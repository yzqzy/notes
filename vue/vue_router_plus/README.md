# Vue Router 源码实现

$route：路由规则，存储当前路由数据。

> 可以通过 $route 的 currentRoute 属性获取 router 实例

$router：VueRouter 实例，即路由对象。

 ## Hash 模式与 History 模式

### 路径对比

Hash 模式

```
https://test.yueluo.club/#/paylist?id=123456
```

History 模式

```
https://test.yueluo.club/paylist?id=123456
```

### 原理对比

Hash 模式是基于锚点，以及 `onhashchange` 事件

History 模式是基于 HTML5 的 History API

* `history.pushState()`，IE10 以后才支持
* `history.replaceState()`

### History 模式

* History 需要服务器的支持。

* 单页应用中，服务端不存在 `https://test.yueluo.club/login` 这样的地址，刷新时会找不到该页面。

* 在服务器端需要配置除了静态应用外都返回单页应用的 index.html。

vue-cli 自带的服务器已经配置到对 history 模式的支持。

#### Node.js 配置

```js
const path = require('path')
const express = require('express')

const history = require('connect-history-api-fallback')

const app = express()

app.use(history()) // support history

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.listen(3000, () => {
  console.log('server listening port: 3000')
})
```

#### Nginx 配置

```shell
start nginx 
nginx -s reload
nginx -s stop
```

```nginx
server {
  listen       80;
  server_name  localhost;

  #charset koi8-r;

  #access_log  logs/host.access.log  main;

  location / {
    root   html;
    index  index.html index.htm;
    # support history
    try_files $uri $uri/ /index.html; 
  }
}
```

## 实现原理

### Hash 模式

* URL 中 # 后面的内容作为路径地址
* 监听 hashchange 事件
* 根据当前路由地址找到对应组件重新渲染

### History 模式

* 通过 history.pushState() 方法改变地址栏
  * 仅改变地址栏，并把当前路由记录到浏览器的访问历史中，不会跳转到指定路径
* 监听 popstate 事件
* 根据当前路由地址找到对应组件重新渲染

## 源码实现

### install

```js
let _Vue = null

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true

    // 2. 缓存 Vue 构造函数
    _Vue = Vue

    // 3. router 对象注入到 Vue 实例上
    _Vue.mixin({
      beforeCreate() {
        // 根实例才混入 $router 
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }
}
```

### 构造函数

```js
let _Vue = null

export default class VueRouter {
  static install(Vue) {
		// ...
  }

  constructor(options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }
}
```

### createRouteMap

```js
let _Vue = null

export default class VueRouter {
  static install(Vue) {
		// ...
  }

  constructor(options) {
		// ...
  }

  createRouteMap() {
    // 将所有路由规则解析成键值对形式，存储到 routeMap 中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }
}
```

### initComponents

```js
let _Vue = null

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true

    // 2. 缓存 Vue 构造函数
    _Vue = Vue

    // 3. router 对象注入到 Vue 实例上
    _Vue.mixin({
      beforeCreate() {
        // 根实例才混入 $router 
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
  }

  createRouteMap() {
    // 将所有路由规则解析成键值对形式，存储到 routeMap 中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,            
          }
        }, [ this.$slots.default ])
      }
    })
  }
}
```

声明 vue.component 时，如果不想写 render 函数，可以在项目根目录的配置使用 runtime 版本的 vue。

```js
// vue.config.js

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // runtimeCompiler: true
})
```

### router-view

```js
export default class VueRouter {
	// ...

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,            
          },
          on: {
            click: this.clickHandler
          }
        }, [ this.$slots.default ])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })

    const _self = this
    Vue.component('router-view', {
      render(h) {
        const component = _self.routerMap[_self.data.current]
        return h(component)
      }
    })
  }
}
```

### initEvent

处理后退前进等事件。

```js
export default class VueRouter {
	// ...
  
  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.bindEvent()
  }

  bindEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
```

### 完整代码

```js
let _Vue = null

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true

    // 2. 缓存 Vue 构造函数
    _Vue = Vue

    // 3. router 对象注入到 Vue 实例上
    _Vue.mixin({
      beforeCreate() {
        // 根实例才混入 $router 
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.bindEvent()
  }

  createRouteMap() {
    // 将所有路由规则解析成键值对形式，存储到 routeMap 中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,            
          },
          on: {
            click: this.clickHandler
          }
        }, [ this.$slots.default ])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })

    const _self = this
    Vue.component('router-view', {
      render(h) {
        const component = _self.routerMap[_self.data.current]
        return h(component)
      }
    })
  }

  bindEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
```



