# Webpack 源码

webpack 本质就是一个模块打包器，loader 与 plugin 是打包过程中额外完成的事情。

```js
yarn add webpack@^4.44.2 webpack-cli@^3.3.12 html-webpack-plugin@^4.5.0 -D
```

## 打包文件分析

webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'none',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

package.json

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
  }
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test</title>
</head>
<body>
  
</body>
</html>
```

index.js

```js
console.log('index.js');

module.exports = 'main entry file';
```

运行打包命令

```js
npx webpack
```

dist/build.js

```js
(function(modules) { // webpackBootstrap
	// The module cache 缓存被加载的模块
	var installedModules = {};
  
	// The require function
  // webpack 自定义方法，核心作用就是返回模块的 exports
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;
	// expose the module cache
	__webpack_require__.c = installedModules;
	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, 					function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__
	__webpack_require__.p = "";
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})

({
	
  // 定义模块路径
  "./src/index.js":
	// 类似 commonjs 加载
  (function(module, exports) {
    console.log('index.js');
    module.exports = 'main entry file';
  })

});
```

打包后的文件就是一个函数自调用，当前函数调用时传入一个对象。这个对象我们我们可以称之为模块定义。
键名是当前被加载模块的文件名与目录的拼接；键值就是一个函数，和 nodejs 里的模块加载有一些类似，会将被加载模块中的内容包裹于一个函数中，这个函数在将来某个时间点上会被调用，同时会接收到一定参数，利用这些参数可以实现模块的加载操作。

针对于上述代码相当于将 {}（模块定义） 传递给 modules 。

## 单文件打包后源码调试

vscode 对 dist/build.js 进行单文件调试。

## 功能函数说明

index.js

```js
const name = require('./login');

console.log('index.js');
console.log(name);

module.exports = 'main entry file';
```

login.js

```js
module.exports = 'education';
```

dist/build.js

```js
(function(modules) { // webpackBootstrap
	// The module cache
  // 定义对象，用于缓存已加载过的模块
	var installedModules = {};

	// The require function 
  // Webpack 自定义加载模块方法，核心功能就是返回被加载模块的导出内容
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}

	// expose the modules object (__webpack_modules__)
  // 保存模块定义，通过 m 挂载到自定义方法上
	__webpack_require__.m = modules;

	// expose the module cache
  //保存已经在模块，通过 c 挂载到自定义方法上
	__webpack_require__.c = installedModules;

  // Object.prototype.hasOwnProperty.call
  // 判断当前被传入的对象，是否存在指定的属性
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// define getter function for harmony exports
  // 为 exports 定义属性，提供访问 getter 
	__webpack_require__.d = function(exports, name, getter) {
    // 如果当前 exports 不具备 name 属性，则条件成立
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
  // 给 exports 添加标记，通过标记我们可以知道当前是 ES Modue，还是非 ES Modue
	__webpack_require__.r = function(exports) {
    // 如果成立说明是 ES Module
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      // Object.prototype.toString.call(exports) => Module
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
    // 为 exports 添加 __esModule 属性，值为 true
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	
  // create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
  // 调用 t 方法之后，我们可以拿到被加载模块的内容 value
  // 针对 value，可以直接返回，也可以处理之后再返回
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
  // 定义 getter，返回 getter
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
      // ES Module 返回 module.default 属性
			function getDefault() { return module['default']; } :
      // 非 ES Module，返回 module 
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// __webpack_public_path__
  // 共有路径
	__webpack_require__.p = "";

	// Load entry module and return exports
  // .s 缓存主入口文件值
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})

({

  "./src/index.js":
  (function(module, exports, __webpack_require__) {

    const name = __webpack_require__(/*! ./login */ "./src/login.js");

    console.log('index.js');
    console.log(name);

    module.exports = 'main entry file';

  }),

  "./src/login.js":
  (function(module, exports) {

    module.exports = 'education';

  })

});
```

## CommonJS 模块打包

webpack 默认支持的就是 common.js 规范，建议日常开发也使用 common.js 规范。

```js
const name = require('./login');

console.log('index.js');
console.log(name);

module.exports = 'main entry file';
```

```js
// commonjs 规范
module.exports = 'education';
```

```js
(function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};

	// The require function
	function __webpack_require__(moduleId) {

		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.l = true;

		// Return the exports of the module
		return module.exports;
	}


	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "";

	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({

  "./src/index.js":
  (function(module, exports, __webpack_require__) {
    const name = __webpack_require__(/*! ./login */ "./src/login.js");

    console.log('index.js');
    console.log(name);

    module.exports = 'main entry file';
  }),

  "./src/login.js":
  (function(module, exports) {
    // commonjs 规范
    module.exports = 'education';
  })

});
```

## ES Module 模块打包 

```js
// es module 规范

export default 'yueluo';
export const age = 23;
```

```js
const obj = require('./login');

console.log('index.js');
console.log(obj.default, '---', obj.age);

export default 'main entry file';
```

```js
(function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;
	// expose the module cache
	__webpack_require__.c = installedModules;
	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__
	__webpack_require__.p = "";
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})

({

 "./src/index.js":
 (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  const obj = __webpack_require__(/*! ./login */ "./src/login.js");

  console.log('index.js');
  console.log(obj.default, '---', obj.age);

  __webpack_exports__["default"] = ('main entry file');

 }),

 "./src/login.js":
 (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  __webpack_require__.d(__webpack_exports__, "age", function() { return age; });
  // es module 规范

  __webpack_exports__["default"] = ('yueluo');
  const age = 23;

 })

});
```

对于 webpack 打包操作来说，我们可以使用 commonjs 规范，也可以使用 esmodule 规范。不过在最终打包处理时，针对于产出内容，采用 commonjs 规范，加载 commonjs 规范导出的内容生成的代码是最少的。不过也要看实际情况，推荐使用 commonjs 规范进行打包处理。

## 功能函数手写实现

src/login.js

```js
module.exports = 'education';
```

src/index.js

```js
const name = require('./login');

console.log('index：', name);
```

shared/build.js

```js
```

dist/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test</title>
</head>
<body>
  
<script src="../shared/build.js"></script></body>
</html>
```

