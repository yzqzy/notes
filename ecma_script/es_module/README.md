# 模块化开发

模块化开发是当下最重要的前端开发范式之一。

模块化是一种最主流的代码组织方式。通过把复杂代码按照功能不同划分为不同模块单独维护的方式去提高开发效率，降低维护成本。

## 早期模块化演变过程

**1. 文件划分方式**

web 中最原始的模块系统。

将每个功能以及相关的状态数据单独存放到不同的文件中，约定每个文件都是一个独立的模块。

使用模块就是将模块引入到页面中，一个 script 标签就代表一个模块。

* 污染全局作用域
* 命名冲突问题
* 无法管理模块依赖关系

早期模块化完全依靠约定。

```js
// module-a.js

var name = 'module-a'

function method1() {}
function method2() {}
```

```html
<script src="module-a.js"></script>
<script src="module-b.js"></script>
```

**2. 命名空间方式**

每一个模块只暴露一个全局对象，所有模块成员都挂载到对象下面。

```js
var moduleA = {
  name: 'module-a',
  method1: function() {},
  method2: function() {}
}
```

减小命名冲突可能，模块成员仍可以被修改，无法管理模块依赖关系。

**3. IIFE**

使用立即执行函数的方式为模块提供私有空间。

```js
;(funtion() {
  var name = 'method-a'
  
  function method1() {} 
  function method2() {}
	
	window.moduleA = {
    method1: method1,
    method2: method2
  }
})()
```

实现了私有成员的概念。

```js
;(funtion($) {
  var name = 'method-a'
  
  function method1() {
    $('body').animate({ margin: '200px' })
  }
  
  function method2() {}
	
	window.moduleA = {
    method1: method1,
    method2: method2
  }
})(jQuery)
```

较明确的模块依赖关系。

## 模块化规范的出现

早期模块化通过约定的方式实现模块代码组织，不同的开发者去实现会存在细微差别，为了消除这种差异，我们就需要一个标准来规范化模块化的实现方式。

早期模块化在模块加载的时候都是通过 script 手动引入每个需要的模块，需要自主管理依赖，有较大的心智负担。

* 模块内使用某个引用，但是忘记在 html 中添加引用
* 模块内移除引用，忘记在 html 移除相关引用

我们需要一些基础的公共代码帮我们加载模块，即模块化标准和模块加载器。

### CommonJS 规范

* 一个文件就是一个模块
* 每个模块都有单独的作用域
* 通过 `module.exports` 导出成员
* 通过 `require` 函数载入模块

 ### AMD 规范

AMD （Asynchronous Module Definition），异步模块定义规范。

同期有一个著名的库，叫做 `Require.js`，它实现了 AMD 规范，同时它本身也是非常强大的模块加载器。

```js
// 定义模块

define('moduleB', ['jquery', './module-a'], function ($, moduleA) {
  return {
    start: function() {
      $('body').animate({ margin: '200px' }),
      moduleA()
    }
  }
})
```

约定每个模块都必须通过 define 函数定义，函数默认接收两个参数，也可以传递三个参数。

```js
// 载入模块

require(['./moduel-b'], function (moduleB) {
  moduleB.start()
})
```

自动创建 script 标签去发送对应脚本文件请求，并且执行相应的模块代码。目前绝大多数第三方库都支持 AMD 规范。

* AMD 使用相对复杂
* 模块 JS 文件请求频繁

### CMD 规范

通用模块定义规范。淘宝 Sea.js 实现了 CMD 规范。

```js
// CMD 规范（类似 CommonJS 规范），减少心智负担

define(function (require, exports, module) {
	var $ = require('jquery')
  
  module.exports = function () {
    console.log('module')
    $('body').append('<p>module</p>')
  }
})
```

## 模块化标准规范

Node 环境中使用 CommonJS 规范，浏览器环境中使用 ES Modules。

## ES Modules

### 基本特性

只需要给页面的 script 标签增加 type=module 的属性，就可以使用 ES Module 标准执行 JS 代码。

```html
<script type="module">
  console.log('this is es module')
</script>
```

* ESM 自动采用严格模式，忽略 'use strict'
* 每个 ESM 都是单独的私有作用域
* ESM 通过 CORS 的方式请求外部 JS 模块的（web 地址必须支持 cors）
* ESM 的 script 标签会自动延迟执行脚本（等同于 script 标签的 defer 属性，不会阻塞 HTML 解析）

### 导出

```js
// ./module.js
const foo = 'es modules'
export { foo }

// ./app.js
import { foo } from './module.js'
console.log(foo)
```

导入模块，浏览器会自动发起网络请求获取对应资源。

```js
var name = 'foo module'

function hello() {}

export {
	name as fooName,
  hello as fooHello
}
```



模块导入不等于字面量对象

```js
var name = 'heora'
var age = 18

export { name, age } // 固定语法，不是对象字面量
```

```js
import { name, age } from './module.js' // 并不是解构，固定用法

console.log(name, age)
```

`export {}` 只是一种固定语法，如果确实想要导出对象，需要使用默认导出

```js
var name = 'heora'
var age = 18

export default { name, age } // 对象字面量
```



导出的是成员的引用，即引用关系

```js
let name = 'heora'
let age = 24

export { name, age }

setTimeout(() => {
  name = 'yueluo'
}, 1000)
```

```js
import { name, age } from './module.js'

console.log(name, age) // heora 24

setTimeout(() => {
  console.log(name, age) // yueluo 24
}, 2000)
```



导出的引用关系是只读的

```js
let name = 'heora'
let age = 24

export { name, age }
```

```js
import { name, age } from './module.js'

setTimeout(() => {
  age = 34 //  Uncaught TypeError: Assignment to constant variable.
}, 2000)
```

### 导入

import 导入模块时 from 后面的是一个路径，字符串必须是完整的名称，不能省略文件扩展名

```js
import { name, age } from './module' // 404 (Not Found)

console.log(name, age)

import utils from './utils' // 报错
```

对于路径名称，当使用打包工具时，可以省略扩展名和文件夹的默认文件名



相对路径，不能省略 `./`

```js
import { name, age } from 'module.js'
console.log(name, age)
//  Failed to resolve module specifier "module.js". 
// Relative references must start with either "/", "./", or "../".
```



可以使用绝对路径或者完整的 URL

```js
import { name, age } from './module.js'
console.log(name, age)
```

```js
import { name, age } from '/ecma_script/module/module.js'
console.log(name, age)
```

```js
import { name, age } from 'http://127.0.0.1:5500/ecma_script/module/module.js'
console.log(name, age)
```



如果只是想执行模块，不使用模块内容

```js
import { } from './module.js'
```

```js
import './module.js'
```



如果导入模块特别多，并且模块内容都要使用

```js
import * as module from './module.js'
console.log(module.name, module.age)
```



import 关键字需要在开发阶段就明确路径

```js
var modulePath = './module.js'
import { name } from modulePath
// app.js:37 Uncaught SyntaxError: Unexpected identifier
```

```js
if (true) {
  import { name } from './module.js'
}
// Uncaught SyntaxError: Unexpected token '{'
```

如果遇到以上两种情况，需要动态导入模块，使用全局 import 函数

```js
var modulePath = './module.js'
import(modulePath).then(modue => {
  console.log(modue)
})
```



如果一个模块中同时导出命名成员和默认成员

```js
let name = 'heora'
let age = 24

export { name, age }
export default 'default'
```

```js
import { name, age, default as title } from './module.js'
console.log(name, age, title)
```

```js
import title, { name, age } from './module.js'
console.log(name, age, title)
```

### 导出导入成员

```js
export { name, age } from './module.js'
```



```js
// src/components/button.js
export const Button = 'Button Component'

// src/components/avatar.js
export const Avatar = 'Avatar Component'

// src/components/index.js
export { Button } from './button.js'
export { Avatar } from './avatar.js'

// app.js
import { Buttpn, Avatar } from './component/index.js'
```



```js
// src/components/button.js
export default Button = 'Button Component'

// src/components/index.js
export { default as Button } from './button.js'
```

### Polyfill

早期浏览器不支持 ES Module 。

```html
<script type="module">
  console.log('this is es module')
</script>
```

Polyfill 可以在浏览器直接支持 ES Module 中绝大多数特性。

[https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/](https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/)

```bash
npm install browser-es-module-loader
```

```html
<script src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
<script src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
```

如果提示不支持 Promise，还需要引入 Promise 的 Polyfill。

[https://unpkg.com/promise-polyfill@8.2.3/dist/polyfill.min.js](https://unpkg.com/promise-polyfill@8.2.3/dist/polyfill.min.js)



支持 ES Module 特性的浏览器代码会被执行两次，可以借助 script 标签的 nomodule 机制。

```js
<script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
<script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
```



这种兼容 ES Module 的方式只适合本地测试，不建议生产环境使用。

## ES Modules in Node.js

### 支持情况

Node.js 已经开始逐步支持 ES Module 特性。

Node.js 8.5 版本之后，就已经以实验特性的方式去支持 ES Module。

[https://github.com/nodejs/node/tree/main/lib/internal/modules](https://github.com/nodejs/node/tree/main/lib/internal/modules)



在 node 环境中直接使用 ES Module 需要使用 `.mjs` 扩展名。

```js
// module.mjs

const name = 'heora'
const age = 24

export { name, age }
```

```js
// index.mjs

import { name, age } from './module.mjs'

console.log(name, age)
```



导入原生模块

```js
// index.mjs

import fs from 'fs'

const md = fs.readFileSync('README.md')
console.log(md.toString())
```



导入第三方 NPM 模块

```bash
pnpm install lodash -D
```

```js
// index.mjs

import _ from 'lodash'

console.log(_.camelCase('ES Module')) // esModule
```

```js
import { camelCase } from 'lodash'
console.log(camelCase('ES Module'))
// SyntaxError: Named export 'camelCase' not found. The requested module 'lodash' is a CommonJS module, which may not support all module.exports as named exports.

// import {} 并不是解构，第三方模块都是导出一个对象，必须使用默认导入的方式导入成员
```

```js
const { readFileSync } = fs

const readme = readFileSync('README.md')
console.log(readme.toString())

// 可以通过 {} 的方式提取系统内置模块中的成员，系统内置模块官方都做了兼容
```

### 与 CommonJS 交互

```js
// commonjs

module.exports = {
  foo: 'commonjs exports value'
}

exports.foo = 'commonjs exports value'
```

```js
// es module

import mod from './commonjs.js'
console.log(mod)
```

可以直接提取 common.js 模块内容。

```js
// es module

import { foo } from './commonjs.js'

console.log(foo)
```



```js
// es_module.mjs

export const foo = 'commonjs exports value'
```

```js
// commonjs.js

const mod = require('./es_module.mjs')
console.log(mod)
```

> throw new ERR_REQUIRE_ESM(filename, true);

不能在 common js 模块中通过 require 载入 es module（node 原生环境）

### 与 CommonJS 差异

```js
// cjs.js

// 加载模块函数
console.log(require)

// 模块对象
console.log(module)

// 导出对象别名
console.log(exports)

// 当前文件的绝对路径
console.log(__filename)

// 当前文件所在目录
console.log(__dirname)
```



es module 中无法使用以下成员，这些成员实际是函数的形参，伪全局对象。

> [cjs loader.js](https://github.com/nodejs/node/blob/main/lib/internal/modules/cjs/loader.js#L208)

```js
// esm.mjs

// 加载模块函数
console.log(require)

// 模块对象
console.log(module)

// 导出对象别名
console.log(exports)

// 当前文件的绝对路径
console.log(__filename)

// 当前文件所在目录
console.log(__dirname)
```

可以使用 import、export 代替 require 与 exports。可以使用以下方法获取文件绝对路径和目录。

```js
// 获取文件路径
import { fileURLToPath } from 'url'
console.log(fileURLToPath(import.meta.url))

// 获取文件所在目录
import { dirname } from 'path'
console.log(dirname(fileURLToPath(import.meta.url)))
```

### 新版本支持

可以给当前工作目录的 `package.json` 增加 type 字段

```json
// package.json

{
  "type": "module"
}
```

这样当前目录下所有 js 文件也都是以 es module 的方式进行工作，不需要再修改扩展名。

如果当前目录下还想使用 common js 内置模块，需要修改扩展名为 `.cjs`。

### Babel 兼容方案

如果使用早期 node.js 版本，可以使用 babel 实现兼容。

```bash
pnpm i @babel/node @babel/core @babel/preset-env -D
```

```
pnpm babel-node .\index.mjs
```



