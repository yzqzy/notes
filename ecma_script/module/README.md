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

