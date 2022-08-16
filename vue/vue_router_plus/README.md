# Vue Router 源码实现

$route：路由规则，存储当前路由数据。

> 可以通过 $route 的 currentRoute 属性获取 router 实例

$router：VueRouter 实例，即路由对象。

 ## Hash 模式与 History 模式

### 路径区别

Hash 模式

```
https://test.yueluo.club/#/paylist?id=123456
```

History 模式

```
https://test.yueluo.club/paylist?id=123456
```

### 原理区别

Hash 模式是基于锚点，以及 `onhashchange` 事件

History 模式是基于 HTML5 的 History API

* `history.pushState()`，IE10 以后才支持
* `history.replaceState()`

### History 模式使用

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



