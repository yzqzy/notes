# 碎片知识

## 同步与异步加载

### 异步加载

  1. 异步加载，指加载 JS 脚本，我们可以设置属性，浏览器帮我们执行加载操作。
  2. 可以自己写一个异步加载方法，执行异步加载操作。

### 企业级工具函数写法

命名空间写法。

命名空间写法可以让我们知道方法出自于哪里，把某些功能封装在一起。

```js
var utils = {
  func1: function () { },
  func2: function () { }
}

utils.func1();
```

```js
Element.prototype = {
  func1: function () { },
  func2: function () { }
}

elem.func1();
```

###探究同步加载

可以在head标签内或者 body 标签内引入外部脚本文件。

**为什么外部 JS 脚本引入放在 body 标签最底部？CSS 脚本引入可以放在 head 标签内？**

当浏览器遇到 CSS 外部样式引入，会新开辟新线程加载文件，不会影响 DOM 解析。
当浏览器遇到未设置异步的 script 标签，会阻塞 DOM 解析，等到 JS 加载并且执行完毕，才会继续解析 DOM。
这种加载 script 标签的方式，叫做同步加载（阻塞加载、同步模式、阻塞模式）。
放在页面最后，可以极大的减少阻塞，不能完全解决解决阻塞问题（多个 script 标签存在，会有阻塞现象）。

**为什么加载JS脚本默认是同步的？**

JS 中常常存在修改 DOM 结构、重定向、对 DOM 的增加删除，如果异步，会产生 DOM 冲突。

###探究异步加载

异步加载（defer、async），就是浏览器会并行加载 scrip t脚本，和 link 标签差不多。

异步加载同时，不会阻塞解析 CSS，解析 DOM 结构，不会阻塞浏览器后续处理。

* defer
  * IE8 及以下至 IE4 都可以使用，IE4 已经存在该方法。异步加载，不阻塞后续处理
  * 但是加载完不会立即执行。DOM 树构建完毕后会顺序执行 script 脚本
* async
  * W3C 标准，HTML5 新增属性，IE9 及以上支持该属性
  * 异步加载，不阻塞后续处理，加载完毕会立刻执行 script 脚本

异步加载 JS 脚本是不能对文档进行操作的，异步加载会存在 DOM 冲突。

defer 和 async 同时设置，也是异步加载的，除 IE8之 下，优先判断为 async。

异步加载不常用，一般工具函数、与 DOM 操作无关的 JS 脚本、按需加载的才会使用异步加载。

按需加载，比如点击反馈效果，封装一个模块，点击时，按需加载，然后实现对应效果。

### 企业级异步加载

```js
var s = document.createElement('script'); // 主动创建就是异步加载

s.type = 'text/javascript';
s.async = true; // 无实际作用，只是在标签上添加async属性
s.src = 'js/index.js'; // src引入时已经在下载（加载）JS脚本，不会执行

document.body.appendChild(s); // 放入html中，执行JS脚本
```

异步加载时，不会触发 window.onload 方法，建议在 window.onload 之后进行异步加载。

```js
;(function () {
  function async_load () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'js/index.js';
    document.body.appendChild(s);
  }

  if (window.attachEvent) {
    window.attachEvent('onload', async_load);
  } else {
    window.addEventListener('load', async_load, false);
  }
})();
```

一般来说，异步加载一般写在最上面，一般企业会在head标签内放一个关于页面配置的脚本文件。
可以借助这个 script 脚本文件，把异步加载的 script 脚本放到 head 标签内。

```js
;(function () {
  function async_load () {
    var s = document.createElement('script'),
        oScript = document.getElementsByTagName('script')[0];

    s.type = 'text/javascript';
    s.async = true;
    s.src = 'js/index.js';

    oScript.parentNode.insertBefore(s, oScript);
  }

  if (window.attachEvent) {
    window.attachEvent('onload', async_load);
  } else {
    window.addEventListener('load', async_load, false);
  }
})();
```

如果又要进行异步加载，又要立刻执行 JS 脚本内方法，如何实现？

> readyState onreadystatechange IE 提出的事件
>
> s.onload 事件 W3C浏览器存在该方法，IE不存在

```js
function async_exec (url, fn) {
  var s = document.createElement('script'),
      oScript = document.getElementsByTagName('script')[0];

  s.type = 'text/javascript';
  s.async = true;

  if (s.readyState) {
    s.onreadystatechange = function () {
      var state = s.readyState;

      if (state === 'complate' || state === 'loaded') {
        utils[fn]();
      }
    }
  } else {
    s.onload = function () {
      utils[fn]();
    }
  }

  s.src = url;
  oScript.parentNode.insertBefore(s, oScript);
}

async_exec('js/index.js', 'test1');
```

微信的 SDK 是放在最上边的，所以每次加载都会由一定的延迟，页面阻塞产生白屏现象（同步加载）。
PC 端可以放在上面，移动端移动不要把 script 引入写在最上面，2.5 s 之内如果用户看不到页面，就是失败的。

  ## 放大模式、宽放大模式

window.frameElement 返回当前window对象的元素，chrome没有反应，IE、火狐有反应。

### 模块

 方法集合

```js
var utils = (function () {
  function test1 () { }
  function test2 () { }

  return {
    test1: test1,
    test2: test2
  }
})();
```

功能体

```js
function init_modules () {
  initCompute();
}

var initCompute = (function () {
  function init () {
    bindEvent();
  }

  function bindEvent () { }

  return function () {
    init();
  }
})();
```

### 模块间继承（模块依赖）

```js
var mod1 = (function () {
  var test1 = function () {
    console.log('test1');
  },

      test2 = function () {
        console.log('test2');
      },

      test3 = function () {
        console.log('test3');
      }

  return {
    test1: test1,
    test2: test2,
    test3: test3
  }
})();

var mod2 = (function (mod) {
  var test4 = function () {
    mod.test1();
  },

      test5 = function () {
        mod.test2();
      },

      test6 = function () {
        mod.test3();
      }

  return {
    test4: test4,
    test5: test5,
    test6: test6
  }
})(mod1);

mod2.test5();
mod2.test6();
mod2.test7();
```

这种写模块的方式就是模块化的放大模式（augmentation），可以进行多人协作开发。

###放大模式

module_1.js

```js
var mod = {};

mod = (function (module) {
  module.a = 1;

  module.test1 = function () {
    console.log('test1');
  }

  return module;
})(mod);
```

module_2.js

```js
var mod = (function (module) {
  module.b = 2;

  module.test2 = function () {
    console.log('test2');
  }

  return module;
})(mod);
```

index.html

```js
mod.test1();
mod.test2();
```

###宽放大模式 (Loose augmentation)

module_1.js

```js
var mod = (function (module) {
  module.a = 1;

  module.test1 = function () {
    console.log('test1');
  }

  return module;
})(mod || {});
```

 module_2.js

```js
var mod = (function (module) {
  module.b = 2;

  module.test2 = function () {
    console.log('test2');
  }

  return module;
})((mod || {});
```

index.html

```js
mod.test1();
mod.test2();
```

模块化外层一般是存在全局变量的，可以注入全局变量。

## JS 精度丢失、解决方法

### 精度丢失原因

IEEE 754 规范，JavaScript 采用 64 位双精度浮点数方式存储数字。

```js
10 // 十进制 

10 / 2 = 5 ... 0
5 / 2 = 2  ... 1
2 / 2 = 1  ... 0
1 / 2 = 0  ... 1

1010 // 二进制
```

计算机底层存储二进制数据不是直接存储，而是将数据转换成科学计数法存储。

```js
15000 -> 1.5 * 10^4
1200 -> 1.2 * 10^3
```

```js
// 二进制
1010 -> 1.01 * 2^3
```



<img src="./images/js01.png" style="zoom: 80%" />



64位：

* 最高 1 位，符号位。0 表示整数，1 表示负数；
* 往后 11 位，指数位。如 2^3，指数位就要存 3 + （2^11  - 1）；
  * 3 + 1023 = 1026 十进制数据，转换为二进制存储
* 最后 52 位，有效数。小数部分。

| 符号位 | 指数位      | 有效数                                  |
| ------ | ----------- | --------------------------------------- |
| 0      | 10000000010 | 010000000000000000000000000000000000... |



0.1 转换成二进制，0.00011001100110011... 。

> -4 + 1023 = 1019

```js
0 01111111011 10011001100110011...（52 位）
```

计算机会截取 52 位，会 0 舍 1 入（二进制 0 舍 1 入，十进制 4 舍 5 入）。

> 1001 -> 9
>
> 1010 -> 10

0.1 在计算机存储时，实际的值会比 0.1 大。



0.2

> 0.2 * 2 = 0.4
>
> 0.4 * 2 = 0.8
>
> 0.8 * 2 = 1.6
>
> 0.6 * 2 = 0.2
>
> 
>
> 0.2 *  2 = 0.4
>
> ...

```js
0.0011001100110011...
1.1 * 2^-3

0 01111111100 1001100110011001...(52位)
```

0.2 在计算机存储时，实际的值比 0.2 大。



所以最终结果 0.1 + 0.2 > 0.3。

> 1.1001 * 2^-4 + 1.1001 * 2^-3
>
> => 0.110011001 * 2^-3 + 1.001 * 2^3

### 解决方法

#### toFixed

```js
19.99 + 20.00

=> (19.99 + 20.00).toFixed(2)
=> parseFloat("39.99");
=> 39.99
```

#### 倍数（乘以 100）

```js
19.99 + 20.00

=> 19.99 * 100 + 20.00 * 100
=> 3999 / 100
=> 39.99
```

#### 第三方库

npm 仓库 搜索 js 精度。

## 前端模块化

模块化开发是当下最重要的前端开发范式之一。

模块化是一种最主流的代码组织方式。通过把复杂代码按照功能不同划分为不同模块单独维护，去提高开发效率，降低维护成本。

模块化只是思想，并不包括具体实现。

### 模块化演进过程

#### 1. 基于文件划分模块

web 中最原始的模块系统。将每个功能以及相关状态数据存放到不同文件中，约定每个文件就是独立的模块。

使用模块时，将模块引入到页面中，一个 script 标签对应一个模块。

```js
// module a 相关状态数据和功能函数

var name = 'module-a'

function method1 () {
  console.log(name + '#method1')
}

function method2 () {
  console.log(name + '#method2')
}

```

```js
// module b 相关状态数据和功能函数

var name = 'module-b'

function method1 () {
  console.log(name + '#method1')
}

function method2 () {
  console.log(name + '#method2')
}

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Modular evolution stage 1</title>
</head>
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    // 命名冲突
    method1()
    // 模块成员可以被修改
    name = 'foo'
  </script>
</body>
</html>

```

缺点十分明显，所有模块都直接在全局工作，没有私有空间，所有成员都可以在模块外部被访问或者修改，而且模块一段多了过后，容易产生命名冲突，另外无法管理模块与模块之间的依赖关系

* 污染全局作用域
* 命名冲突问题
* 无法管理模块依赖关系

早期模块化完全依赖约定。

#### 2. 命名空间方式

每个模块只暴露一个全局对象，所有模块成员都挂载到这个对象中。具体做法就是在第一阶段的基础上，通过将每个模块「包裹」为一个全局对象的形式实现，有点类似于为模块内的成员添加了「命名空间」的感觉。

```js
// module a 相关状态数据和功能函数

var moduleA = {
  name: 'module-a',

  method1: function () {
    console.log(this.name + '#method1')
  },

  method2: function () {
    console.log(this.name + '#method2')
  }
}
```

```js
// module b 相关状态数据和功能函数

var moduleB = {
  name: 'module-b',

  method1: function () {
    console.log(this.name + '#method1')
  },

  method2: function () {
    console.log(this.name + '#method2')
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Modular evolution stage 2</title>
</head>
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    moduleA.method1()
    moduleB.method1()
    // 模块成员可以被修改
    moduleA.name = 'foo'
  </script>
</body>
</html>
```

通过「命名空间」减小了命名冲突的可能，但是同样没有私有空间，所有模块成员也可以在模块外部被访问或者修改，而且也无法管理模块之间的依赖关系。

#### 3. IIFE 方式

使用立即执行函数表达式（IIFE：Immediately-Invoked Function Expression）为模块提供私有空间。
具体做法就是将每个模块成员都放在一个函数提供的私有作用域中，对于需要暴露给外部的成员，通过挂在到全局对象上的方式实现。

```js
// module a 相关状态数据和功能函数

;(function () {
  var name = 'module-a'
  
  function method1 () {
    console.log(name + '#method1')
  }
  
  function method2 () {
    console.log(name + '#method2')
  }

  window.moduleA = {
    method1: method1,
    method2: method2
  }
})()
```

```js
// module a 相关状态数据和功能函数

;(function ($) {
  var name = 'module-a'
  
  function method1 () {
    console.log(name + '#method1')
    $('body').animate({ margin: '200px' })
  }
  
  function method2 () {
    console.log(name + '#method2')
  }

  window.moduleA = {
    method1: method1,
    method2: method2
  }
})(jQuery)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Modular evolution stage 3</title>
</head>
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    moduleA.method1()
    moduleB.method1()
    // 模块私有成员无法访问
    console.log(moduleA.name) // => undefined
  </script>
</body>
</html>
```

有了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问。确保私有变量安全。

还可以用自执行函数的参数作为依赖声明使用，具体做法就是在第三阶段的基础上，利用立即执行函数的参数传递模块依赖项。可以使模块依赖关系更加明显。这使得每一个模块之间的关系变得更加明显。

```js
// module a 相关状态数据和功能函数

;(function ($) {
  var name = 'module-a'
  
  function method1 () {
    console.log(name + '#method1')
    $('body').animate({ margin: '200px' })
  }
  
  function method2 () {
    console.log(name + '#method2')
  }

  window.moduleA = {
    method1: method1,
    method2: method2
  }
})(jQuery)
```

#### 4. 总结

以上这几种方式就是早期没有工具和规范的情况下，对模块化的落地方式。

模块加载方式都是通过 `<script></script>` 标签去引入每一个模块，这也就意味着模块加载不受代码控制。

如果开发时间跨度很长，维护非常麻烦。

如果代码中依赖一个模块，但是 `html` 中未引用模块，这时就会出现问题。

如果在模块中移除了某个模块的引用，但是未在 `html` 中删除引用，就会产生问题。

### 模块化规范的出现

模块化标准 + 模块加载器。

#### CommonJS 规范

NodeJS 所提出的一套标准，NodeJS 中所有的模块代码必须遵循 CommonJS 规范。

* 每一个文件就是一个模块
* 每个模块都有单独的作用域
* 通过 module.exports 导出成员
* 通过 require 函数载入模块

CommonJS 约定以同步方式加载模块。NodeJS 的执行机制是在启动时加载模块，执行过程中不需要加载，只会使用模块。

CommonJS 规范在浏览器端使用，必然会导致效率低下，因为每次页面加载都会导致大量的同步模块请求出现。

所以说在早期的浏览器前端模块化规范中，并没有选择 CommonJS 规范，而是专门为浏览器新定义了规范，AMD 规范。同时还推出了一个非常出名的库，Require.js。Require.js 实现了 AMD 规范，其本身也是非常强大的模块加载器。

#### AMD 规范

AMD（Asynchronous Module Definition），即异步模块定义规范。

Require.js 提供了 AMD 模块化规范，以及一个自动化模块加载器。

```js
// 因为 jQuery 中定义的是一个名为 jquery 的 AMD 模块
// 所以使用时必须通过 'jquery' 这个名称获取这个模块
// 但是 jQuery.js 并不在同级目录下，所以需要指定路径
define('module1', ['jquery', './module2'], function ($, module2) {
  return {
    start: function () {
      $('body').animate({ margin: '200px' })
      module2()
    }
  }
})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Modular evolution stage 5</title>
</head>
<body>
  <script src="lib/require.js" data-main="main"></script>
</body>
</html>
```

```js
require.config({
  paths: {
    // 因为 jQuery 中定义的是一个名为 jquery 的 AMD 模块
    // 所以使用时必须通过 'jquery' 这个名称获取这个模块
    // 但是 jQuery.js 并不一定在同级目录下，所以需要指定路径
    jquery: './lib/jquery'
  }
})

require(['./modules/module1'], function (module1) {
  module1.start()
}) 
```

目前绝大多数第三方库都支持 AMD 规范。但是使用起来相对比较复杂，模块 JS 文件请求频繁（根据文件划分模块）。

AMD 只能算是前端模块化演进过程中的一步，是一种妥协的实现方式，并不是最终的解决方案。在当时的环境背景下，还是很有意义的，它为前端模块化提供了一个标准。

```js
require(['./modules'], function (module1) {
	module1.start();
})
```

```js
// 兼容 CMD 规范（类似 CommonJS 规范）
define(function (require, exports, module) {
	// 通过 require 引入依赖
  var $ = require('jquery')
  // 通过 exports 或者 module.exports 对外暴露成员
  module.exports = function () {
    console.log('module 2~')
    $('body').append('<p>module2</p>')
  }
})
```

#### CMD 规范

Sea.js 和 CMD（Common Module Definition） 规范。

```js
define(function (require, exports, module) {
  var a = [1, 2, 3, 4, 5];

  return {
    a: a.reverse()
  }
});
```

```js
seajs.use(['module_a.js'], function (moduleA) {
  console.log(moduleA.a);
});
```

```html
<script type="text/javascript" src="js/sea.js" />
<script type="text/javascript" src="js/index.js" />
```

CMD 是依赖就近，按需加载模块，与 CommonJS、AMD 有本质区别; AMD 是依赖前置，CMD 是需要的时候去加载模块；

### 模块化标准规范

NodeJS 开发中遵循 CommonJS 规范去组织模块。浏览器环境中会采用 ES Module 规范。

ES Module 是 ECMAScript 2015（ES6）中定义的最新的模块系统，它是最近几年定义的标准，所以也存在环境兼容问题。

各浏览器支持情况：https://caniuse.com/#feat=es6-module

### ES Module

#### 基本特性

通过给 script 标签添加 `type = module` 的属性，就可以直接使用 ES Module 的标准执行 JS 代码。

```html
<script type="module">
	console.log('this is es module')
</script>
```

ES Module 自动采用严格模式，忽略 `'use strict'`，每个 ES Module 都由自己的私有作用域。

```html
<script type="module">
	console.log('this is es module')
  
  var foo = 100;
  
  console.log(foo); // 100
</script>

<script type="module">
	console.log('this is es module')
  
  console.log(foo); // 报错
</script>
```

ES Module 通过 CORS 的方式请求外部 JS 模块

```html
<script type="module" src="https://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script> 报错
```

```html
<script type="module" src="https://unpkg.com/jquery@3.4.1/dist/jquery.min.js"></script>
```

ES Module 的 script 标签会自动延迟执行脚本，等同于 script 的 defer 属性



* 自动采用严格模式，忽略 `use strict`
* 每个 ES Module 模块都是单独的私有作用域
* ES Module 通过 CORS 去请求外部 JS 模块
* ES Module 的 script 标签会延迟执行脚本，等同于 defer 属性

#### 导入、导出

