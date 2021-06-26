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
      * windows https://www.apachelounge.com/download/
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

需要使用 node-gyp 编译 .node 文件。

.node 文件是和平台相关联的，在其他平台无法使用。.node 文件和 node 版本也有关系，必须指定版本。

```js
node-gyp -v
ndoe-gyp list
```

#### C++ Addons

binding.gyp

```c++
{
	'targets': [{
		'target_name': 'test',
		'sources': [ './index.cc' ]
	}]
}
```

index.cc

```c++
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "world", NewStringType::kNormal).ToLocalChecked());
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace demo
```



编译 C++ 模块

```js
node-gyp rebuild
```



index.js

```js
const test = require('./build/Release/test/node');

console.log(
    test.hello()
);
```



使用 bindins 优化引入路径

```js
npm i bindings
```

```js
const test = require('bindings')('test');

console.log(
    test.hello()
);
```

#### C++ Addons - N-API

可以通过一套 API 兼容各个版本的 V8。

#### 为什么使用 C++ 插件

将计算量转移到 C++ 运行

* 收益：C++ 运算比 JavaScript 更快的部分
* 成本：C++ 变量和 v8 变量的转换

C++ 插件不一定更快，还要考虑运算的成本。收益是否抵得过成本？

## 多进程优化

### Node.js 子进程与线程

进程

* 操作系统挂载运行程序的单元
* 拥有一些独立的资源，如内存等

线程

* 进行运算调度的单元
* 进程内的线程共享进程内的资源

>  进程类似 “公司”，线程类似公司的 “职员”。

事件循环

* 主线程运行  v8 与 javascript
* 多个子线程（一般是 4 个）通过事件循环被调度



使用子进程或线程利用更多 CPU 资源。



子进程：child_process

```js
// child.js

process.on('message', (msg) => {
  console.log('child：', msg);

  process.send('hehe');
});
```

```js
// master.js

const cp = require('child_process');
const path = require('path');

const child_process = cp.fork(path.resolve(__dirname, './child.js'));

child_process.send('hello');

child_process.on('message', (msg) => {
  console.log('master：', msg);
});
```



子线程：Worker Threads

```js
const worker = require('worker_threads');
```

### Node.js cluster

cluster 可以快速创建一个拥有多核能力的网络服务。



压测脚本

```js
ab -c50 -n400 http://127.0.0.1:3000/
```



```js
// app.js

const fs = require('fs');
const http = require('http');
const path = require('path');

http.createServer((req, res) => {
  res.writeHead(200, { 
    'content-type': 'text/html'
  });
  res.end(
    fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
  )
}).listen(3000, () => {
  console.log(`listening 3000`);
});
```

```js
// index.js

const cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  require('./app');
}
```

使用 ab 对两个服务分别压测，cluster 的性能明显好于直接启动 http 服务。



代码优化。

```js

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length / 2; i++) {
    cluster.fork();
  }  
} else {
  require('./app');
}
```



cluster 源码阅读

src：C++ 代码、lib：JS 代码

### Node.js 进程守护与管理

```js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // 子进程心跳检测
  for (let i = 0; i < os.cpus().length / 2; i++) {
    const worker = cluster.fork();

    let missedPing = 0;
    
 
    const inter = setInterval(() => {
      worker.send('ping');
      missedPing++;

      if (missedPing >= 3) {
        clearInterval(inter);
        process.kill(worker.process.pid);
      }
    }, 3000);

    worker.on('message', (msg) => {
      if (msg === 'pong') {
        missedPing--;
      }
    });
  }

  // 子进程退出后，新开子进程
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });

 

} else {
  require('./app');

  // 心跳处理
  process.on('message', (msg) => {
    if (msg === 'ping') {
      process.send('pong');
    }
  });

  // 错误捕获
  process.on('uncaughtException', (err) => {
    console.error(err);

    process.exit(1);
  });

  // 内存泄漏监控
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom');
      process.exit(1);
    }
  }, 5000);
}
```

## 架构优化

### 动静分离

静态内容

* 基本不会变动，也不会因为请求参数不同而变化
* CDN 分发，HTTP 缓存等
* 使用 nginx 输出静态文件比 node 服务器快很多，还可以使用 nginx 配置 cdn 动态加速完成达到更好的效果

动态内容

* 各种因为请求参数不同而变动，且变种的数量几乎不可枚举
* 用大量的源站机器承载，结合反向代理进行负载均衡



linux 安装 ab

```js
yum install httpd-tools 
```

### 反向代理与缓存服务

反向代理与负载均衡。

```nginx
http {
  upstream node.server {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
  }
  
  server {
    root /www/static/;

    # location ~ /node/(\d*) {
    #  proxy_pass http://127.0.0.1:3000/detail?columid=$1;
    # }
    
    location ~ /node/(\d*) {
      proxy_pass http:/node.server/detail?columid=$1;
      # proxy_cache 反向代理缓存 
    }
  }
}
```



koa 洋葱模型配合 redis 实现缓存和备份功能

```js
app.use(async (ctx, next) => {
  const result = await cacheRedis(ctx.url);
  	
  // 命中缓存直接返回
  if (result) {
    ctx.body = result;
    return;
  }
  
  await next();
  
  // 缓存
  if (ctx.status == 200) {
    cachedRedis.set(ctx.url, ctx.body, {
      expire: 1000 * 60 * 60
    });
    backupRedis.set(ctx.url, ctx.body, {
      expire: 1000 * 60 * 60
    });
  }
  	
  // 请求失败，备份兜底
  if (ctx.status != 200) {
    const result = await backupRedis(ctx.url);
    
    ctx.status = 200;
    ctx.body = result;
  }
});
```



请求

* 动
  * nginx 反向代理
    * node
      * redis
      * koa
    * node
      * reids
      * koa
* 静
  * CDN

