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
(function (modules) {
  // 缓存被加载的模块
  const installedModules = {};

  // 定义 __webpack_require__ 方法替换 require
  function __webpack_require__ (moduleId) {
    // 判断当前缓存中是否存在要被加载的模块内容，如果存在，直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    // 如果当前缓存中不存在，定义对象
    const module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // 调用当前 moduleId 对应的函数，完成内容加载
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 当上述方法调用完成之后，就可以修改 l 的值用于表示当前模块内容已加载完成
    module.l = true;

    // 加载完成之后，将模块内容返回至调用位置

    return module.exports;
  }

  // 定义 m 属性保存 modules
  __webpack_require__.m = modules;

  // 定义 c 属性保存 cache
  __webpack_require__.c = installedModules;

  // 定义 o 方法用于对象身上是否存在指定属性
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }

  // 定义 d 方法用于在对象身上添加指定属性及 getter
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  }

  // 定义 r 方法用于标识当前模块是 ES6 类型
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  // 定义 n 方法用于设置具体 getter
  __webpack_require__.n = function (module) {
    let getter = module && module.__esModule ? (
      function getDefault () { return module['default'] }
    ) : (
      function getModuleExports () { return module }
    );

    __webpack_require__.d(getter, 'a', getter);

    return getter;
  }

  // 定义 p 属性用于保存资源访问路径
  __webpack_require__.p = "";

  // 调用 __webpack_require__ 方法执行模块导入与加载操作
  return __webpack_require__(__webpack_require__.s = './src/index.js');
})
({
  "./src/index.js": (function (module, exports, __webpack_require__) {
    // commonjs 规范
    // const name = __webpack_require__("./src/login.js");
    // console.log('index：', name);
	
    // esmodule 规范
    "use strict";
    __webpack_require__.r(exports);
    var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/login.js");
    var _login__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_login__WEBPACK_IMPORTED_MODULE_0__);
    // const name = require('./login');

    console.log('index：', _login__WEBPACK_IMPORTED_MODULE_0___default.a);
  }),
  "./src/login.js": (function (module, exports) {
    module.exports = 'education';
  })
});
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

## 懒加载实现流程梳理

login.js

 ```js
 export default 'yueluo';
 export const age = 23;
 ```

index.js

```js
const oBtn = document.getElementById('J-btn');

console.log('index');

oBtn.addEventListener('click', () => {
  import(/*webpackChunkName: 'login'*/'./login.js')
    .then(login => {
      console.log(login);
    })
    .catch(err => {
      console.log(err);
    })
});
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

  <button id="J-btn">Click</button>
  
</body>
</html>
```

dist/build.js

```js
(function(modules) { // webpackBootstrap
	// install a JSONP callback for chunk loading
	function webpackJsonpCallback(data) {
		var chunkIds = data[0];
		var moreModules = data[1];

		// add "moreModules" to the modules object,
		// then flag all "chunkIds" as loaded and fire callback
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
				resolves.push(installedChunks[chunkId][0]);
			}
			installedChunks[chunkId] = 0;
		}
		for(moduleId in moreModules) {
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
		}
		if(parentJsonpFunction) parentJsonpFunction(data);
		while(resolves.length) {
			resolves.shift()();
		}
	};

	// The module cache
	var installedModules = {};
	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
	};

	// script path function
	function jsonpScriptSrc(chunkId) {
		return __webpack_require__.p + "" + chunkId + ".build.js"
	}

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

	// This file contains only the entry chunk.
	// The chunk loading function for additional chunks
	__webpack_require__.e = function requireEnsure(chunkId) {
		var promises = [];
		// JSONP chunk loading for javascript
		var installedChunkData = installedChunks[chunkId];
		if(installedChunkData !== 0) { // 0 means "already installed".
			// a Promise means "currently loading".
			if(installedChunkData) {
				promises.push(installedChunkData[2]);
			} else {
				// setup Promise in chunk cache
				var promise = new Promise(function(resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				});
				promises.push(installedChunkData[2] = promise);
				// start chunk loading
				var script = document.createElement('script');
				var onScriptComplete;
				script.charset = 'utf-8';
				script.timeout = 120;
				if (__webpack_require__.nc) {
					script.setAttribute("nonce", __webpack_require__.nc);
				}
				script.src = jsonpScriptSrc(chunkId);
				// create error before stack unwound to get useful stacktrace later
				var error = new Error();
				onScriptComplete = function (event) {
					// avoid mem leaks in IE.
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var chunk = installedChunks[chunkId];
					if(chunk !== 0) {
						if(chunk) {
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
							error.name = 'ChunkLoadError';
							error.type = errorType;
							error.request = realSrc;
							chunk[1](error);
						}
						installedChunks[chunkId] = undefined;
					}
				};
				var timeout = setTimeout(function(){
					onScriptComplete({ type: 'timeout', target: script });
				}, 120000);
				script.onerror = script.onload = onScriptComplete;
				document.head.appendChild(script);
			}
		}
		return Promise.all(promises);
	};
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
	// on error function for async loading
	__webpack_require__.oe = function(err) { console.error(err); throw err; };
	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	jsonpArray.push = webpackJsonpCallback;
	jsonpArray = jsonpArray.slice();
	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
	var parentJsonpFunction = oldJsonpFunction;
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({

  "./src/index.js":
  (function(module, exports, __webpack_require__) {

    const oBtn = document.getElementById('J-btn');

    console.log('index');

    oBtn.addEventListener('click', () => {
      __webpack_require__.e(/*! import() | login */ "login").then(__webpack_require__.bind(null, /*! ./login.js */ "./src/login.js"))
        .then(login => {
          console.log(login);
        })
        .catch(err => {
          console.log(err);
        })
    });
  })

});
```

dist/login.build.js

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login"],{

  "./src/login.js":
  (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "age", function() { return age; });
    __webpack_exports__["default"] = ('yueluo');
    const age = 23;

  })

}]);
```

import 可以实现指定模块的懒加载操作，懒加载的核心原理就是 JSONP。

t 方法可以针对内容进行不同的处理，处理方式取决于传入的数值（8，6，3，7，2，1）。

## t 方法分析及实现

### 方法分析

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
    // 接收两个参数，value 是被加载的模块 ID，第二个值是二进制的数值
    // t 方法内部做的第一件事就是调用自定义 require 方法，加载对应内容重新赋值给 value
    // 当获取到 value 值之后，余下的 8、4、2 都是对当前的内容进行加工处理，然后返回使用
    //  1. 当 mode & 8 成立，直接将 value 返回（1、8 同时成立，相当于加载 commonjs 规范内容）
    //  2. 当 mode & 4 成立，直接将 value 返回（1、3 同时成立，相当于加载 esmodule 规范内容）
    //  3. 上述条件不成立，首先定义 ns 空对象
    //     3.1 如果 value 是一个可以用直接使用的值，例如字符串，将 value 挂载到 default 属性上
    //     3.2 如果 value 是一个对象，遍历对象，调用 d 方法，将对象属性定义到 ns 上
    //     3.3 返回 ns 对象
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

    console.log('index');
    console.log(name);
  }),

  "./src/login.js":
  (function(module, exports) {

    module.exports  = 'education';

  })

});
```

```js
let mode = 0b1001;

if (mode & 1) {
  console.log('第四位上的值是 1');
}

if (mode & 8) {
  console.log('第一位上的值是 1');
}
```

### 方法实现

 ```js
 (function (modules) {
   // 缓存被加载的模块
   const installedModules = {};
 
   // 定义 __webpack_require__ 方法替换 require
   function __webpack_require__ (moduleId) {
     // 判断当前缓存中是否存在要被加载的模块内容，如果存在，直接返回
     if (installedModules[moduleId]) {
       return installedModules[moduleId].exports;
     }
 
     // 如果当前缓存中不存在，定义对象
     const module = installedModules[moduleId] = {
       i: moduleId,
       l: false,
       exports: {}
     };
 
     // 调用当前 moduleId 对应的函数，完成内容加载
     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 
     // 当上述方法调用完成之后，就可以修改 l 的值用于表示当前模块内容已加载完成
     module.l = true;
 
     // 加载完成之后，将模块内容返回至调用位置
 
     return module.exports;
   }
 
   // 定义 m 属性保存 modules
   __webpack_require__.m = modules;
 
   // 定义 c 属性保存 cache
   __webpack_require__.c = installedModules;
 
   // 定义 o 方法用于对象身上是否存在指定属性
   __webpack_require__.o = function (object, property) {
     return Object.prototype.hasOwnProperty.call(object, property);
   }
 
   // 定义 d 方法用于在对象身上添加指定属性及 getter
   __webpack_require__.d = function (exports, name, getter) {
     if (!__webpack_require__.o(exports, name)) {
       Object.defineProperty(exports, name, { enumerable: true, get: getter });
     }
   }
 
   // 定义 r 方法用于标识当前模块是 ES6 类型
   __webpack_require__.r = function (exports) {
     if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
       Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
     }
     Object.defineProperty(exports, '__esModule', { value: true })
   }
 
   // 定义 n 方法用于设置具体 getter
   __webpack_require__.n = function (module) {
     let getter = module && module.__esModule ? (
       function getDefault () { return module['default'] }
     ) : (
       function getModuleExports () { return module }
     );
 
     __webpack_require__.d(getter, 'a', getter);
 
     return getter;
   }
 
   // 定义 t 方法用于加载指定 value 的模块内容，对内容进行处理并返回
   __webpack_require__.t = function (value, mode) {
     // 加载 value 对应的模块内容（value 通常是模块 ID）
 
     if (mode & 1) {
       value = __webpack_require__(value);
     }
 
     // commonjs
     if (mode & 8) {
       return value;
     }
 
     // esmodule
     if ((mode & 4 && typeof value === 'object' && value && value.__esModule)) {
       return value;
     }
 
     // 如果 8 和 4 都不成立，则需要自定义 ns，通过 default 属性返回内容
     const ns = Object.create(null);
 
     __webpack_require__.r(ns);
 
     Object.defineProperty(ns, 'default', { enumerable: true, value });
 
     if (mode & 2 && typeof value !== 'string') {
       for (const k in value) {
         __webpack_require__.d(ns, k, function (key) {
           return value[key];
         }.bind(null, k));
       }
     }
 
     return ns;
   }
 
   // 定义 p 属性用于保存资源访问路径
   __webpack_require__.p = "";
 
   // 调用 __webpack_require__ 方法执行模块导入与加载操作
   return __webpack_require__(__webpack_require__.s = './src/index.js');
 })
 ({
   "./src/index.js": (function (module, exports, __webpack_require__) {
     // const name = __webpack_require__("./src/login.js");
     // console.log('index：', name);
 
     "use strict";
     // __webpack_require__.r(exports);
     // var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/login.js");
     // var _login__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_login__WEBPACK_IMPORTED_MODULE_0__);
     // const name = require('./login');
     const name = __webpack_require__.t("./src/login.js", 0b0111);
 
     console.log(name);
 
     // console.log('index：', _login__WEBPACK_IMPORTED_MODULE_0___default.a);
   }),
   "./src/login.js": (function (module, exports) {
     module.exports = {
       name: 'yueluo',
       age: 23
     };
   })
 });
 ```

## 单文件懒加载源码分析

login.js

```js
module.exports  = 'lazy load';
```

index.js

```is
const oBtn = document.getElementById('J-btn');

oBtn.addEventListener('click', function () {
  import(/* webpackChunkName: "login" */ './login.js').then(content => {
    console.log(content);
  })
});

console.log('index');
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

  <button id="J-btn">Click</button>

</body>
</html>
```

dist/login.build.js

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login"],{

  "./src/login.js":
  (function(module, exports) {

    module.exports  = 'lazy load';

  })

}]);
```

dist/build.js

```js
(function(modules) { // webpackBootstrap
	// install a JSONP callback for chunk loading
	// 模块依赖关系合并、将 promise 变成成功态，方便调用
	function webpackJsonpCallback(data) {
		var chunkIds = data[0];
		var moreModules = data[1];
		// add "moreModules" to the modules object,
		// then flag all "chunkIds" as loaded and fire callback
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
				resolves.push(installedChunks[chunkId][0]);
			}
			installedChunks[chunkId] = 0;
		}
		for(moduleId in moreModules) {
			// 模块合并
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
		}
		if(parentJsonpFunction) parentJsonpFunction(data);
		while(resolves.length) {
			resolves.shift()();
		}
	};
	// The module cache
	var installedModules = {};
	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
	};
	// script path function
	function jsonpScriptSrc(chunkId) {
		return __webpack_require__.p + "" + chunkId + ".build.js"
	}
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
	// This file contains only the entry chunk.
	// The chunk loading function for additional chunks
	__webpack_require__.e = function requireEnsure(chunkId) {
		var promises = [];
		// JSONP chunk loading for javascript
		var installedChunkData = installedChunks[chunkId];
		if(installedChunkData !== 0) { // 0 means "already installed".
			// a Promise means "currently loading".
			if(installedChunkData) {
				promises.push(installedChunkData[2]);
			} else {
				// setup Promise in chunk cache
				var promise = new Promise(function(resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				});
				promises.push(installedChunkData[2] = promise);
				// start chunk loading
				var script = document.createElement('script');
				var onScriptComplete;
				script.charset = 'utf-8';
				script.timeout = 120;
				if (__webpack_require__.nc) {
					script.setAttribute("nonce", __webpack_require__.nc);
				}
				script.src = jsonpScriptSrc(chunkId);
				// create error before stack unwound to get useful stacktrace later
				var error = new Error();
				onScriptComplete = function (event) {
					// avoid mem leaks in IE.
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var chunk = installedChunks[chunkId];
					if(chunk !== 0) {
						if(chunk) {
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
							error.name = 'ChunkLoadError';
							error.type = errorType;
							error.request = realSrc;
							chunk[1](error);
						}
						installedChunks[chunkId] = undefined;
					}
				};
				var timeout = setTimeout(function(){
					onScriptComplete({ type: 'timeout', target: script });
				}, 120000);
				script.onerror = script.onload = onScriptComplete;
				document.head.appendChild(script);
			}
		}
		return Promise.all(promises);
	};
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
	// on error function for async loading
	__webpack_require__.oe = function(err) { console.error(err); throw err; };
	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	jsonpArray.push = webpackJsonpCallback;
	jsonpArray = jsonpArray.slice();
	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
	var parentJsonpFunction = oldJsonpFunction;
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({

  "./src/index.js":
  (function(module, exports, __webpack_require__) {
    const oBtn = document.getElementById('J-btn');

    oBtn.addEventListener('click', function () {
      __webpack_require__.e(/*! import() | login */ "login").then(__webpack_require__.t.bind(null, /*! ./login.js */ "./src/login.js", 7)).then(content => {
        console.log(content);
      })
    });

    console.log('index');

  })

});
```

## 单文件懒加载实现

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
  
  <button id="J-btn">Click</button>

<script src="../shared/build.js"></script></body>
</html>
```

dist/login.build.js

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login"],{

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports  = 'lazy load';

/***/ })

}]);
```

shared/build.js

```js
(function (modules) {
  // 定义 webpackJsonpCallback：合并模块定义、改变 Promise 状态，执行后续行为
  function webpackJsonpCallback (data) {
    // 获取需要被加载的模块 ID
    const chunkIds = data[0];
    // 获取需要被动态加载的模块依赖关系对象
    const moreModules = data[1];

    let chunkId, resolves = [];

    // 循环判断 chunkIds 里对应的模块内容是否已经完成加载
    for (let i = 0; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];

      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }

      // 更新当前 chunk 状态
      installedChunks[chunkId] = 0;
    }

    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }

    while (resolves.length) {
      resolves.shift()();
    }
  }


  // 缓存被加载的模块
  const installedModules = {};

  // 定义 installedChunks 对于用于标识某个 chunkId 对应 chunk 是否完成加载
  // 0 已加载过、promises 正在加载、null/undefiend 未加载
  var installedChunks = {
    main: 0 
  }

  // 定义 __webpack_require__ 方法替换 require
  function __webpack_require__ (moduleId) {
    // 判断当前缓存中是否存在要被加载的模块内容，如果存在，直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    // 如果当前缓存中不存在，定义对象
    const module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // 调用当前 moduleId 对应的函数，完成内容加载
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 当上述方法调用完成之后，就可以修改 l 的值用于表示当前模块内容已加载完成
    module.l = true;

    // 加载完成之后，将模块内容返回至调用位置

    return module.exports;
  }

  // 定义 m 属性保存 modules
  __webpack_require__.m = modules;

  // 定义 c 属性保存 cache
  __webpack_require__.c = installedModules;

  // 定义 o 方法用于对象身上是否存在指定属性
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }

  // 定义 d 方法用于在对象身上添加指定属性及 getter
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  }

  // 定义 r 方法用于标识当前模块是 ES6 类型
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  // 定义 n 方法用于设置具体 getter
  __webpack_require__.n = function (module) {
    let getter = module && module.__esModule ? (
      function getDefault () { return module['default'] }
    ) : (
      function getModuleExports () { return module }
    );

    __webpack_require__.d(getter, 'a', getter);

    return getter;
  }

  // 定义 jsonpScriptSrc 实现 src 的处理
  function jsonpScriptSrc (chunkId) {
    return __webpack_require__.p + "" + chunkId + '.build.js';
  }

  // 定义 e 方法用于实现 jsonp 来加载内容，利用 promise 实现异步加载操作
  __webpack_require__.e = function (chunkId) {
    // 定义一个数组用于存放 promise
    let promises = [];

    // 获取 chunkId 对应的 chunk 是否已经完成加载
    let installedChunkData = installedChunks[chunkId];

    // 根据当前是否已完成加载的状态来执行后续逻辑
    if (installedChunkData !== 0) {
      if (installedChunkData) {
        promises.push(installedChunkData[2]); 
      } else {
        const promise = new Promise((resolve, reject) => {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);

        // 创建标签
        const script = document.createElement('script');

        // 设置 src
        script.src = jsonpScriptSrc(chunkId);

        // 写入 scrpit 标签
        document.head.appendChild(script);
      }
    }

    // 执行 promise
    return Promise.all(promises);
  }

  // 定义 t 方法用于加载指定 value 的模块内容，对内容进行处理并返回
  __webpack_require__.t = function (value, mode) {
    // 加载 value 对应的模块内容（value 通常是模块 ID）

    if (mode & 1) {
      value = __webpack_require__(value);
    }

    // commonjs
    if (mode & 8) {
      return value;
    }

    // esmodule
    if ((mode & 4 && typeof value === 'object' && value && value.__esModule)) {
      return value;
    }

    // 如果 8 和 4 都不成立，则需要自定义 ns，通过 default 属性返回内容
    const ns = Object.create(null);

    __webpack_require__.r(ns);

    Object.defineProperty(ns, 'default', { enumerable: true, value });

    if (mode & 2 && typeof value !== 'string') {
      for (const k in value) {
        __webpack_require__.d(ns, k, function (key) {
          return value[key];
        }.bind(null, k));
      }
    }

    return ns;
  }

  // 定义 p 属性用于保存资源访问路径
  __webpack_require__.p = "";

  // 定义变量存放数组
  const jsonpArray = window['webpackJsonp'] = window['webpackJsonp'] || [];

  // 保存原生的 push 方法
  const oldJsonpFunction = jsonpArray.push.bind(jsonpArray);

  // 重写原生的 push 方法
  jsonpArray.push = webpackJsonpCallback;

  // 调用 __webpack_require__ 方法执行模块导入与加载操作
  return __webpack_require__(__webpack_require__.s = './src/index.js');
})
({

  "./src/index.js":
  (function(module, exports, __webpack_require__) {

    const oBtn = document.getElementById('J-btn');

    oBtn.addEventListener('click', function () {
      __webpack_require__.e(/*! import() | login */ "login").then(__webpack_require__.t.bind(null, /*! ./login.js */ "./src/login.js", 7)).then(content => {
        console.log(content);
      })
    });

    console.log('index');

  })

});
```

## webpack 与 tapable

### webpack 编译过程

* 配置初始化
* 内容编译
* 输出编译后内容

这三个过程的整体执行过程可以看作是一种事件驱动型的事件工作流机制，这个机制可以将不同的插件串联起来，最后完成所有的工作。
其中最核心的两个部分就是负责编译的 compiler 和负责创建 bundles 的 compilation。

### tapable

tapable 本身是一个独立的库。

#### 工作流程

* 实例化 hook 注册事件监听
* 通过 hook 触发事件监听
* 执行懒编译生成的可执行代码

hook 本质是 tapable 实例对象，也成为钩子。

hook 执行机制可以分为同步和异步，异步的钩子也可以分为并行和串行两种模式。

#### hook 执行特点

* Hook：普通钩子，监听器之间互相独立互不干扰
* BailHook：熔断钩子，某个钩子监听返回非 undefiend 时，后续监听的钩子不执行
* WaterfallHook：瀑布钩子，上一个监听的返回值可传递至下一个
* LoopHook：循环钩子，如果当前未返回 false 则一直执行

#### tapable 库同步钩子

* SynckHook
* SyncBailHook
* SyncWaterfallHook
* SyncLoopHook

#### tapable 库异步串行钩子

* AsyncSeriesHook
* AsyncSeriesBailHook
* AsyncSeriesWaterfallHook

#### tapable 库异步钩子

* AsyncParalleHook
* AsyncParalleBailhook

### 同步钩子使用

#### SyncHook

```js
const { SyncHook } = require('tapable');

const hook = new SyncHook(['name', 'age']);

hook.tap('fn1', function (name, age) {
  console.log('fn1--> ', name, age);
});

hook.tap('fn2', function (name, age) {
  console.log('fn2--> ', name, age);
});

hook.tap('fn3', function (name, age) {
  console.log('fn3--> ', name, age);
});

hook.call('yueluo', 18);

// yueluo 18
// yueluo 18
// yueluo 18
```

#### SyncBailHook

```js
const { SyncBailHook } = require('tapable');

const hook = new SyncBailHook(['name', 'age']);

hook.tap('fn1', function (name, age) {
  console.log('fn1--> ', name, age);
});

hook.tap('fn2', function (name, age) {
  console.log('fn2--> ', name, age);
  return 'result 2';
});

hook.tap('fn3', function (name, age) {
  console.log('fn3--> ', name, age);
});

hook.call('heora', 100);

// heora 100
// hrora 100
```

熔断钩子，如果某一个事件监听是非 undefined，后续逻辑不会使用

#### SyncWaterfallHook

```js
const { SyncWaterfallHook } = require('tapable');

const hook = new SyncWaterfallHook(['name', 'age']);

hook.tap('fn1', function (name, age) {
  console.log('fn1--> ', name, age);
  return 'ret1';
});

hook.tap('fn2', function (name, age) {
  console.log('fn2--> ', name, age);
  return 'ret2';
});

hook.tap('fn3', function (name, age) {
  console.log('fn3--> ', name, age);
  return 'ret3';
});

hook.call('heora', 33);

// fn1-->  heora 33
// fn2-->  ret1 33
// fn3-->  ret2 33
```

可以在上一个钩子返回某个值，交给下一个钩子使用。

#### SyncLoopHook

```js
const { SyncLoopHook } = require('tapable');

const hook = new SyncLoopHook(['name', 'age']);

let count1 = 0;
let count2 = 0;
let count3 = 0;

hook.tap('fn1', function (name, age) {
  console.log('fn1--> ', name, age);

  if (++count1 === 1) {
    count1 = 0;
    return undefined;
  } else {
    return true;
  }
});

hook.tap('fn2', function (name, age) {
  console.log('fn2--> ', name, age);

  if (++count2 === 2) {
    count2 = 0;
    return undefined;
  } else {
    return true;
  }
});

hook.tap('fn3', function (name, age) {
  console.log('fn3--> ', name, age);
});

hook.call('heora', 33);
```

如果钩子内部返回非 undefined 值，就会从新开始循环执行钩子。

根据其实就是 do while 循环，如果返回非 undefined，会循环执行钩子函数。

### 异步钩子使用

#### AsyncParallelHook

```js
const { AsyncParallelHook } = require('tapable');

const hook = new AsyncParallelHook(['name']);

// 对于异步钩子使用，添加事件时存在三种方式：tap/tapAsync/tapPromise

// hook.tap('fn1', function (name) {
//   console.log('fn1--> ', name);
// });

// hook.tap('fn2', function (name) {
//   console.log('fn2--> ', name);
// });

// hook.callAsync('yueluo', function () {
//   console.log('callback exec')
// });


// console.time('time');
// hook.tapAsync('fn1', function (name, callback) {
//   setTimeout(() => {
//     console.log('fn1--> ', name);
//     callback();
//   }, 1000)
// });

// hook.tapAsync('fn2', function (name, callback) {
//   setTimeout(() => {
//     console.log('fn2--> ', name);
//     callback();
//   }, 2000)
// });

// hook.callAsync('yueluo', function () {
//   console.log('callback exec')
//   console.timeEnd('time');
// });


console.time('time');
hook.tapPromise('fn1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn1--> ', name);
      resolve();
    }, 1000)
  })
});

hook.tapPromise('fn2', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn2--> ', name);
      resolve();
    }, 2000)
  })
});

hook.promise('yueluo').then(() => {
  console.log('callback exec')
  console.timeEnd('time');
});

// fn1-->  yueluo
// fn2-->  yueluo
// callback exec
// time: 2017.780ms
```

#### AsyncParallelBailHook

```js
const { AsyncParallelBailHook } = require('tapable');

const hook = new AsyncParallelBailHook(['name']);

console.time('time');
hook.tapPromise('fn1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn1--> ', name);
      resolve();
    }, 1000)
  })
});

hook.tapPromise('fn2', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn2--> ', name);
      resolve(false);
    }, 2000)
  })
});

hook.tapPromise('fn3', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn3--> ', name);
      resolve();
    }, 3000)
  })
});

hook.promise('yueluo').then(() => {
  console.log('callback exec')
  console.timeEnd('time');
});

// fn1-->  yueluo
// fn2-->  yueluo
// callback exec
// time: 2016.021ms
// fn3-->  yueluo
```

#### AsyncSeriesHook

```js
const { AsyncSeriesHook } = require('tapable');

const hook = new AsyncSeriesHook(['name']);

console.time('time');
hook.tapPromise('fn1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn1--> ', name);
      resolve();
    }, 1000)
  })
});

hook.tapPromise('fn2', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn2--> ', name);
      resolve(false);
    }, 2000)
  })
});

hook.tapPromise('fn3', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn3--> ', name);
      resolve();
    }, 3000)
  })
});

hook.promise('yueluo').then(() => {
  console.log('~~~~~~')
  console.timeEnd('time');
});

// fn1-->  yueluo
// fn2-->  yueluo
// fn3-->  yueluo
// ~~~~~~
// time: 6050.305ms
```

### SyncHook 源码

#### 测试代码

```js
const { SyncHook } = require('tapable');

const hook = new SyncHook(['name', 'age']);

hook.tap('fn1', function (name, age) {
  console.log('fn1--> ', name, age);
});

hook.tap('fn2', function (name, age) {
  console.log('fn2--> ', name, age);
});

hook.tap('fn3', function (name, age) {
  console.log('fn3--> ', name, age);
});

hook.call('yueluo', 18);
```

#### 源码分析

SyncHook.js

```js
"use strict";

// Hook 是所有钩子类的父类
const Hook = require("./Hook");
// 钩子代码工厂，生成不同钩子所需要的执行代码
const HookCodeFactory = require("./HookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

// 实例化工厂
const factory = new SyncHookCodeFactory();

const TAP_ASYNC = () => {
	throw new Error("tapAsync is not supported on a SyncHook");
};

const TAP_PROMISE = () => {
	throw new Error("tapPromise is not supported on a SyncHook");
};

// 编译 
const COMPILE = function(options) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncHook(args = [], name = undefined) {
	const hook = new Hook(args, name);
	hook.constructor = SyncHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncHook.prototype = null;

module.exports = SyncHook;
```

Hook.js

```js
"use strict";

const util = require("util");

const deprecateContext = util.deprecate(() => {},
"Hook.context is deprecated and will be removed");

const CALL_DELEGATE = function(...args) {
  // 创建
	this.call = this._createCall("sync");
	return this.call(...args);
};
const CALL_ASYNC_DELEGATE = function(...args) {
	this.callAsync = this._createCall("async");
	return this.callAsync(...args);
};
const PROMISE_DELEGATE = function(...args) {
	this.promise = this._createCall("promise");
	return this.promise(...args);
};

class Hook {
	constructor(args = [], name = undefined) {
		this._args = args;
		this.name = name;
		this.taps = [];
		this.interceptors = [];
		this._call = CALL_DELEGATE;
		this.call = CALL_DELEGATE;
		this._callAsync = CALL_ASYNC_DELEGATE;
		this.callAsync = CALL_ASYNC_DELEGATE;
		this._promise = PROMISE_DELEGATE;
		this.promise = PROMISE_DELEGATE;
		this._x = undefined;

		this.compile = this.compile;
		this.tap = this.tap;
		this.tapAsync = this.tapAsync;
		this.tapPromise = this.tapPromise;
	}

	compile(options) {
		throw new Error("Abstract: should be overridden");
	}

	_createCall(type) {
    // 编译对象，类型是传入的类型
		return this.compile({
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		});
	}

	_tap(type, options, fn) {
		if (typeof options === "string") {
			options = {
				name: options.trim()
			};
		} else if (typeof options !== "object" || options === null) {
			throw new Error("Invalid tap options");
		}
		if (typeof options.name !== "string" || options.name === "") {
			throw new Error("Missing name for tap");
		}
		if (typeof options.context !== "undefined") {
			deprecateContext();
		}
    // 合并对象
		options = Object.assign({ type, fn }, options);
    // 注册拦截器
		options = this._runRegisterInterceptors(options);
    // 添加 options 
		this._insert(options);
	}

	tap(options, fn) {
		this._tap("sync", options, fn);
	}

	tapAsync(options, fn) {
		this._tap("async", options, fn);
	}

	tapPromise(options, fn) {
		this._tap("promise", options, fn);
	}

	_runRegisterInterceptors(options) {
		for (const interceptor of this.interceptors) {
			if (interceptor.register) {
				const newOptions = interceptor.register(options);
				if (newOptions !== undefined) {
					options = newOptions;
				}
			}
		}
		return options;
	}

	withOptions(options) {
		const mergeOptions = opt =>
			Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);

		return {
			name: this.name,
			tap: (opt, fn) => this.tap(mergeOptions(opt), fn),
			tapAsync: (opt, fn) => this.tapAsync(mergeOptions(opt), fn),
			tapPromise: (opt, fn) => this.tapPromise(mergeOptions(opt), fn),
			intercept: interceptor => this.intercept(interceptor),
			isUsed: () => this.isUsed(),
			withOptions: opt => this.withOptions(mergeOptions(opt))
		};
	}

	isUsed() {
		return this.taps.length > 0 || this.interceptors.length > 0;
	}

	intercept(interceptor) {
		this._resetCompilation();
		this.interceptors.push(Object.assign({}, interceptor));
		if (interceptor.register) {
			for (let i = 0; i < this.taps.length; i++) {
				this.taps[i] = interceptor.register(this.taps[i]);
			}
		}
	}

	_resetCompilation() {
		this.call = this._call;
		this.callAsync = this._callAsync;
		this.promise = this._promise;
	}
	
	_insert(item) {
    // 初始化参数
		this._resetCompilation();
		let before;
		if (typeof item.before === "string") {
			before = new Set([item.before]);
		} else if (Array.isArray(item.before)) {
			before = new Set(item.before);
		}
		let stage = 0;
		if (typeof item.stage === "number") {
			stage = item.stage;
		}
		let i = this.taps.length;
		while (i > 0) {
			i--;
			const x = this.taps[i];
			this.taps[i + 1] = x; // 提前占位，数组长度加 1
			const xStage = x.stage || 0;
			if (before) {
				if (before.has(x.name)) {
					before.delete(x.name);
					continue;
				}
				if (before.size > 0) {
					continue;
				}
			}
			if (xStage > stage) {
				continue;
			}
			i++;
			break;
		}
    // 向 taps 里增加 item，即传入的 options
		this.taps[i] = item;
	}
}

Object.setPrototypeOf(Hook.prototype, null);

module.exports = Hook;
```

HookCodeFactory.js

```js
class HookCodeFactory {
	constructor(config) {
		this.config = config;
		this.options = undefined;
		this._args = undefined;
	}
	
	create(options) {
		this.init(options);
		let fn;
    
    // 根据 type 生成不同的代码
		switch (this.options.type) {
			case "sync":
				fn = new Function(
					this.args(),
					'"use strict";\n' +
						this.header() +
						this.contentWithInterceptors({
							onError: err => `throw ${err};\n`,
							onResult: result => `return ${result};\n`,
							resultReturns: true,
							onDone: () => "",
							rethrowIfPossible: true
						})
				);
				break;
			case "async":
				fn = new Function(
					this.args({
						after: "_callback"
					}),
					'"use strict";\n' +
						this.header() +
						this.contentWithInterceptors({
							onError: err => `_callback(${err});\n`,
							onResult: result => `_callback(null, ${result});\n`,
							onDone: () => "_callback();\n"
						})
				);
				break;
			case "promise":
				let errorHelperUsed = false;
				const content = this.contentWithInterceptors({
					onError: err => {
						errorHelperUsed = true;
						return `_error(${err});\n`;
					},
					onResult: result => `_resolve(${result});\n`,
					onDone: () => "_resolve();\n"
				});
				let code = "";
				code += '"use strict";\n';
				code += this.header();
				code += "return new Promise((function(_resolve, _reject) {\n";
				if (errorHelperUsed) {
					code += "var _sync = true;\n";
					code += "function _error(_err) {\n";
					code += "if(_sync)\n";
					code +=
						"_resolve(Promise.resolve().then((function() { throw _err; })));\n";
					code += "else\n";
					code += "_reject(_err);\n";
					code += "};\n";
				}
				code += content;
				if (errorHelperUsed) {
					code += "_sync = false;\n";
				}
				code += "}));\n";
				fn = new Function(this.args(), code);
				break;
		}
    // 重置参数
		this.deinit();
		return fn;
	}

	setup(instance, options) {
    // 向 hook 身上挂载 _x 属性
		instance._x = options.taps.map(t => t.fn);
	}

	/**
	 * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
	 */
	init(options) {
		this.options = options;
		this._args = options.args.slice();
	}

	deinit() {
		this.options = undefined;
		this._args = undefined;
	}

	contentWithInterceptors(options) {
		if (this.options.interceptors.length > 0) {
			const onError = options.onError;
			const onResult = options.onResult;
			const onDone = options.onDone;
			let code = "";
			for (let i = 0; i < this.options.interceptors.length; i++) {
				const interceptor = this.options.interceptors[i];
				if (interceptor.call) {
					code += `${this.getInterceptor(i)}.call(${this.args({
						before: interceptor.context ? "_context" : undefined
					})});\n`;
				}
			}
			code += this.content(
				Object.assign(options, {
					onError:
						onError &&
						(err => {
							let code = "";
							for (let i = 0; i < this.options.interceptors.length; i++) {
								const interceptor = this.options.interceptors[i];
								if (interceptor.error) {
									code += `${this.getInterceptor(i)}.error(${err});\n`;
								}
							}
							code += onError(err);
							return code;
						}),
					onResult:
						onResult &&
						(result => {
							let code = "";
							for (let i = 0; i < this.options.interceptors.length; i++) {
								const interceptor = this.options.interceptors[i];
								if (interceptor.result) {
									code += `${this.getInterceptor(i)}.result(${result});\n`;
								}
							}
							code += onResult(result);
							return code;
						}),
					onDone:
						onDone &&
						(() => {
							let code = "";
							for (let i = 0; i < this.options.interceptors.length; i++) {
								const interceptor = this.options.interceptors[i];
								if (interceptor.done) {
									code += `${this.getInterceptor(i)}.done();\n`;
								}
							}
							code += onDone();
							return code;
						})
				})
			);
			return code;
		} else {
			return this.content(options);
		}
	}

	header() {
		let code = "";
		if (this.needContext()) {
			code += "var _context = {};\n";
		} else {
			code += "var _context;\n";
		}
		code += "var _x = this._x;\n";
		if (this.options.interceptors.length > 0) {
			code += "var _taps = this.taps;\n";
			code += "var _interceptors = this.interceptors;\n";
		}
		return code;
	}

	needContext() {
		for (const tap of this.options.taps) if (tap.context) return true;
		return false;
	}

	callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
		let code = "";
		let hasTapCached = false;
		for (let i = 0; i < this.options.interceptors.length; i++) {
			const interceptor = this.options.interceptors[i];
			if (interceptor.tap) {
				if (!hasTapCached) {
					code += `var _tap${tapIndex} = ${this.getTap(tapIndex)};\n`;
					hasTapCached = true;
				}
				code += `${this.getInterceptor(i)}.tap(${
					interceptor.context ? "_context, " : ""
				}_tap${tapIndex});\n`;
			}
		}
		code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
		const tap = this.options.taps[tapIndex];
		switch (tap.type) {
			case "sync":
				if (!rethrowIfPossible) {
					code += `var _hasError${tapIndex} = false;\n`;
					code += "try {\n";
				}
				if (onResult) {
					code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
				} else {
					code += `_fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
				}
				if (!rethrowIfPossible) {
					code += "} catch(_err) {\n";
					code += `_hasError${tapIndex} = true;\n`;
					code += onError("_err");
					code += "}\n";
					code += `if(!_hasError${tapIndex}) {\n`;
				}
				if (onResult) {
					code += onResult(`_result${tapIndex}`);
				}
				if (onDone) {
					code += onDone();
				}
				if (!rethrowIfPossible) {
					code += "}\n";
				}
				break;
			case "async":
				let cbCode = "";
				if (onResult)
					cbCode += `(function(_err${tapIndex}, _result${tapIndex}) {\n`;
				else cbCode += `(function(_err${tapIndex}) {\n`;
				cbCode += `if(_err${tapIndex}) {\n`;
				cbCode += onError(`_err${tapIndex}`);
				cbCode += "} else {\n";
				if (onResult) {
					cbCode += onResult(`_result${tapIndex}`);
				}
				if (onDone) {
					cbCode += onDone();
				}
				cbCode += "}\n";
				cbCode += "})";
				code += `_fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined,
					after: cbCode
				})});\n`;
				break;
			case "promise":
				code += `var _hasResult${tapIndex} = false;\n`;
				code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined
				})});\n`;
				code += `if (!_promise${tapIndex} || !_promise${tapIndex}.then)\n`;
				code += `  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${tapIndex} + ')');\n`;
				code += `_promise${tapIndex}.then((function(_result${tapIndex}) {\n`;
				code += `_hasResult${tapIndex} = true;\n`;
				if (onResult) {
					code += onResult(`_result${tapIndex}`);
				}
				if (onDone) {
					code += onDone();
				}
				code += `}), function(_err${tapIndex}) {\n`;
				code += `if(_hasResult${tapIndex}) throw _err${tapIndex};\n`;
				code += onError(`_err${tapIndex}`);
				code += "});\n";
				break;
		}
		return code;
	}

	callTapsSeries({
		onError,
		onResult,
		resultReturns,
		onDone,
		doneReturns,
		rethrowIfPossible
	}) {
		if (this.options.taps.length === 0) return onDone();
		const firstAsync = this.options.taps.findIndex(t => t.type !== "sync");
		const somethingReturns = resultReturns || doneReturns;
		let code = "";
		let current = onDone;
		let unrollCounter = 0;
		for (let j = this.options.taps.length - 1; j >= 0; j--) {
			const i = j;
			const unroll =
				current !== onDone &&
				(this.options.taps[i].type !== "sync" || unrollCounter++ > 20);
			if (unroll) {
				unrollCounter = 0;
				code += `function _next${i}() {\n`;
				code += current();
				code += `}\n`;
				current = () => `${somethingReturns ? "return " : ""}_next${i}();\n`;
			}
			const done = current;
			const doneBreak = skipDone => {
				if (skipDone) return "";
				return onDone();
			};
			const content = this.callTap(i, {
				onError: error => onError(i, error, done, doneBreak),
				onResult:
					onResult &&
					(result => {
						return onResult(i, result, done, doneBreak);
					}),
				onDone: !onResult && done,
				rethrowIfPossible:
					rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
			});
			current = () => content;
		}
		code += current();
		return code;
	}

	callTapsLooping({ onError, onDone, rethrowIfPossible }) {
		if (this.options.taps.length === 0) return onDone();
		const syncOnly = this.options.taps.every(t => t.type === "sync");
		let code = "";
		if (!syncOnly) {
			code += "var _looper = (function() {\n";
			code += "var _loopAsync = false;\n";
		}
		code += "var _loop;\n";
		code += "do {\n";
		code += "_loop = false;\n";
		for (let i = 0; i < this.options.interceptors.length; i++) {
			const interceptor = this.options.interceptors[i];
			if (interceptor.loop) {
				code += `${this.getInterceptor(i)}.loop(${this.args({
					before: interceptor.context ? "_context" : undefined
				})});\n`;
			}
		}
		code += this.callTapsSeries({
			onError,
			onResult: (i, result, next, doneBreak) => {
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += "_loop = true;\n";
				if (!syncOnly) code += "if(_loopAsync) _looper();\n";
				code += doneBreak(true);
				code += `} else {\n`;
				code += next();
				code += `}\n`;
				return code;
			},
			onDone:
				onDone &&
				(() => {
					let code = "";
					code += "if(!_loop) {\n";
					code += onDone();
					code += "}\n";
					return code;
				}),
			rethrowIfPossible: rethrowIfPossible && syncOnly
		});
		code += "} while(_loop);\n";
		if (!syncOnly) {
			code += "_loopAsync = true;\n";
			code += "});\n";
			code += "_looper();\n";
		}
		return code;
	}

	callTapsParallel({
		onError,
		onResult,
		onDone,
		rethrowIfPossible,
		onTap = (i, run) => run()
	}) {
		if (this.options.taps.length <= 1) {
			return this.callTapsSeries({
				onError,
				onResult,
				onDone,
				rethrowIfPossible
			});
		}
		let code = "";
		code += "do {\n";
		code += `var _counter = ${this.options.taps.length};\n`;
		if (onDone) {
			code += "var _done = (function() {\n";
			code += onDone();
			code += "});\n";
		}
		for (let i = 0; i < this.options.taps.length; i++) {
			const done = () => {
				if (onDone) return "if(--_counter === 0) _done();\n";
				else return "--_counter;";
			};
			const doneBreak = skipDone => {
				if (skipDone || !onDone) return "_counter = 0;\n";
				else return "_counter = 0;\n_done();\n";
			};
			code += "if(_counter <= 0) break;\n";
			code += onTap(
				i,
				() =>
					this.callTap(i, {
						onError: error => {
							let code = "";
							code += "if(_counter > 0) {\n";
							code += onError(i, error, done, doneBreak);
							code += "}\n";
							return code;
						},
						onResult:
							onResult &&
							(result => {
								let code = "";
								code += "if(_counter > 0) {\n";
								code += onResult(i, result, done, doneBreak);
								code += "}\n";
								return code;
							}),
						onDone:
							!onResult &&
							(() => {
								return done();
							}),
						rethrowIfPossible
					}),
				done,
				doneBreak
			);
		}
		code += "} while(false);\n";
		return code;
	}

	args({ before, after } = {}) {
		let allArgs = this._args;
		if (before) allArgs = [before].concat(allArgs);
		if (after) allArgs = allArgs.concat(after);
		if (allArgs.length === 0) {
			return "";
		} else {
			return allArgs.join(", ");
		}
	}

	getTapFn(idx) {
		return `_x[${idx}]`;
	}

	getTap(idx) {
		return `_taps[${idx}]`;
	}

	getInterceptor(idx) {
		return `_interceptors[${idx}]`;
	}
}

module.exports = HookCodeFactory;
```

Hook 提供所有内容，HookCodeFactory 进行代码拼接的工厂，SyncHook 是一个 Hook 之上的特定普通钩子。

#### 源码实现

Hook、SyncHook、HookCodeFactory

测试代码

```js
const SyncHook = require('./shared/SyncHook');

const hook = new SyncHook(['name', 'age']);

hook.tap('fn1', function (name, age) {
  console.log('fn1--> ', name, age);
});

hook.tap('fn2', function (name, age) {
  console.log('fn2--> ', name, age);
});

hook.tap('fn3', function (name, age) {
  console.log('fn3--> ', name, age);
});

hook.call('yueluo', 18);
```

shared/SyncHook

```js
const Hook = require('./Hook.js');

class HookCodeFactory {
  // 准备后续需要使用的数据
  setup (instance, options) {
    this.options = options; // 源码中是通过 init 方法实现
    instance._x = options.taps.map(o => o.fn);
  }

  args () {
    return this.options.args.join(',');
  }

  head () {
    return `var _x = this._x;`;
  }

  content () {
    let code = '';

    for (var i = 0; i < this.options.taps.length; i++) {
      code += `var _fn${i} = _x[${i}]; _fn${i}(${this.args()});`;
    }

    return code;
  }

  // 创建一段可执行的代码体并返回
  create (options) {
    let fn = undefined;

    fn = new Function(
      this.args(),
      this.head() + this.content()
    )

    return fn;
  }
}

const factory = new HookCodeFactory();

class SyncHook extends Hook {
  constructor (args) {
    super(args);
  }

  compile (options) { // { taps: [], args: [name, age] }
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = SyncHook;
```

shared/Hook.js

```js
class Hook {
  constructor (args = []) {
    this.args = args;
    this.taps = []; // 用于存放组装好的对象信息
    this._x = undefined; // 用于在代码工厂函数中使用
  }

  tap (options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }
    options = Object.assign({ fn }, options); // { fn, name: fn1 }

    // 将组装好的 options 添加至数组中
    this._insert(options);
  }

  _insert (options) {
    this.taps[this.taps.length] = options;
  }

  call (...args) {
    // 创建具体要执行的函数代码结构
    let callFn = this._createCall();

    // 调用上述函数，传参
    return callFn.apply(this, args);    
  }

  _createCall () {
    return this.compile({
      taps: this.taps,
      args: this.args
    });
  }
}

module.exports = Hook;
```

### AsyncParallelHook 源码

#### 测试代码

```js
const AsyncParallelHook = require('./lib/AsyncParallelHook.js')

const hook = new AsyncParallelHook(['name', 'age']);

hook.tapAsync('fn1', function (name, age, callback) {
  console.log('fn1--> ', name, age);
  callback();
});

hook.tapAsync('fn2', function (name, age, callback) {
  console.log('fn2--> ', name, age);
  callback();
});

hook.tapAsync('fn3', function (name, age, callback) {
  console.log('fn3--> ', name, age);
  callback();
});

hook.callAsync('yueluo', 18, function () {
  console.log('end');
});
```

#### 源码实现

lib/AsyncParallelHook.js

```js
const Hook = require('./Hook.js');

class HookCodeFactory {
  setup (instance, options) {
    this.options = options;
    instance._x = options.taps.map(o => o.fn);
  }

  args ({ after, before } = {}) {
    let allArgs = this.options.args;

    if (before) allArgs = [before].concat(allArgs);
    if (after) allArgs = allArgs.concat(after);

    return allArgs.join(',');
  }

  head () {
    return `"use strict"; var _context; var _x = this._x;`;
  }

  content () {
    let code = '';

    code += `
      var _counter = ${ this.options.taps.length };
      var _done = (function () {
        _callback();
      });
    `

    for (var i = 0; i < this.options.taps.length; i++) {
      code += `
        var _fn${i} = _x[${i}];
        
        _fn${i}(name, age, (function () {
          if (--_counter === 0) _done();
        }))
      `;
    }

    return code;
  }

  // 创建一段可执行的代码体并返回
  create (options) {
    let fn = undefined;

    fn = new Function(
      this.args({
        after: '_callback'
      }),
      this.head() + this.content()
    )

    return fn;
  }
}

const factory = new HookCodeFactory();

class AsyncParallelHook extends Hook {
  constructor (args) {
    super(args);
  }

  compile (options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = AsyncParallelHook;
```

lib/Hook.js

```js
class Hook {
  constructor (args = []) {
    this.args = args;
    this.taps = []; // 用于存放组装好的对象信息
    this._x = undefined; // 用于在代码工厂函数中使用
  }

  tap (options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }
    options = Object.assign({ fn }, options); // { fn, name: fn1 }

    this._insert(options);
  }

  tapAsync (options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }
    options = Object.assign({ fn }, options);

    this._insert(options);
  }

  _insert (options) {
    this.taps[this.taps.length] = options;
  }

  call (...args) {
    // 创建具体要执行的函数代码结构
    let callFn = this._createCall();

    // 调用上述函数，传参
    return callFn.apply(this, args);    
  }

  callAsync (...args) {
    let callFn = this._createCall();

    return callFn.apply(this, args);    
  }

  _createCall () {
    return this.compile({
      taps: this.taps,
      args: this.args
    });
  }
}

module.exports = Hook;
```

## 定位 webpack 打包入口

```js
const webpack = require('webpack');
const options = require('./webpack.config.js');

let compiler = webpack(options);

compiler.run(function (err, stats) {
  console.log(err);
  console.log(stats.toJson());
});
```

定义 webpack.config.js 文件，执行 npx webpack 和手动引入会产生一样的效果。

执行 npx webpack 会找 node_modules 下 bin 目录下的 webpack 命令。



webpack.cmd

```js
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../webpack/bin/webpack.js" "$@"
  ret=$?
else 
  node  "$basedir/../webpack/bin/webpack.js" "$@"
  ret=$?
fi
exit $ret
```

=>  node webpack/bin/webpack.js

cmd 文件核心作用就是使用 node 命令执行 webpack/bin/webpack.js 文件。



webpack/bin/webpack.js

```js
#!/usr/bin/env node

// @ts-ignore
process.exitCode = 0;

/**
 * @param {string} command process to run
 * @param {string[]} args commandline arguments
 * @returns {Promise<void>} promise
 */
const runCommand = (command, args) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
		const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true
		});

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

/**
 * @param {string} packageName name of the package
 * @returns {boolean} is the package installed?
 */
const isInstalled = packageName => {
	try {
		require.resolve(packageName);

		return true;
	} catch (err) {
		return false;
	}
};

/**
 * @typedef {Object} CliOption
 * @property {string} name display name
 * @property {string} package npm package name
 * @property {string} binName name of the executable file
 * @property {string} alias shortcut for choice
 * @property {boolean} installed currently installed?
 * @property {boolean} recommended is recommended
 * @property {string} url homepage
 * @property {string} description description
 */

/** @type {CliOption[]} */
const CLIs = [
	{
		name: "webpack-cli",
		package: "webpack-cli",
		binName: "webpack-cli",
		alias: "cli",
		installed: isInstalled("webpack-cli"),
		recommended: true,
		url: "https://github.com/webpack/webpack-cli",
		description: "The original webpack full-featured CLI."
	},
	{
		name: "webpack-command",
		package: "webpack-command",
		binName: "webpack-command",
		alias: "command",
		installed: isInstalled("webpack-command"),
		recommended: false,
		url: "https://github.com/webpack-contrib/webpack-command",
		description: "A lightweight, opinionated webpack CLI."
	}
];

const installedClis = CLIs.filter(cli => cli.installed);

if (installedClis.length === 0) {
	const path = require("path");
	const fs = require("fs");
	const readLine = require("readline");

	let notify =
		"One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:";

	for (const item of CLIs) {
		if (item.recommended) {
			notify += `\n - ${item.name} (${item.url})\n   ${item.description}`;
		}
	}

	console.error(notify);

	const isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock"));

	const packageManager = isYarn ? "yarn" : "npm";
	const installOptions = [isYarn ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)}".`
	);

	const question = `Do you want to install 'webpack-cli' (yes/no): `;

	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});
	questionInterface.question(question, answer => {
		questionInterface.close();

		const normalizedAnswer = answer.toLowerCase().startsWith("y");

		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);
			process.exitCode = 1;

			return;
		}

		const packageName = "webpack-cli";

		console.log(
			`Installing '${packageName}' (running '${packageManager} ${installOptions.join(
				" "
			)} ${packageName}')...`
		);

		runCommand(packageManager, installOptions.concat(packageName))
			.then(() => {
				require(packageName); //eslint-disable-line
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
			});
	});
} else if (installedClis.length === 1) {
	const path = require("path");
  // 取出数据第一项，即 webpack-cli/package.json
	const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	require(path.resolve(
		path.dirname(pkgPath), // webpack-cli
		pkg.bin[installedClis[0].binName] // bin/cli.js
	));
} else {
	console.warn(
		`You have installed ${installedClis
			.map(item => item.name)
			.join(
				" and "
			)} together. To work with the "webpack" command you need only one CLI package, please remove one of them or use them directly via their binary.`
	);

	// @ts-ignore
	process.exitCode = 1;
}
```

webpack.js 核心作用就是 require 了 node_modules/webapck-cli/bin/cli.js。



webpack-cli/bin/cli.js

```js
#!/usr/bin/env node

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

const { NON_COMPILATION_ARGS } = require("./utils/constants");

(function() {
	// wrap in IIFE to be able to use return

	const importLocal = require("import-local");
	// Prefer the local installation of webpack-cli
	if (importLocal(__filename)) {
		return;
	}

	require("v8-compile-cache");

	const ErrorHelpers = require("./utils/errorHelpers");

	const NON_COMPILATION_CMD = process.argv.find(arg => {
		if (arg === "serve") {
			global.process.argv = global.process.argv.filter(a => a !== "serve");
			process.argv = global.process.argv;
		}
		return NON_COMPILATION_ARGS.find(a => a === arg);
	});

	if (NON_COMPILATION_CMD) {
		return require("./utils/prompt-command")(NON_COMPILATION_CMD, ...process.argv);
	}

	const yargs = require("yargs").usage(`webpack-cli ${require("../package.json").version}

Usage: webpack-cli [options]
       webpack-cli [options] --entry <entry> --output <output>
       webpack-cli [options] <entries...> --output <output>
       webpack-cli <command> [options]

For more information, see https://webpack.js.org/api/cli/.`);

	require("./config/config-yargs")(yargs);

	// yargs will terminate the process early when the user uses help or version.
	// This causes large help outputs to be cut short (https://github.com/nodejs/node/wiki/API-changes-between-v0.10-and-v4#process).
	// To prevent this we use the yargs.parse API and exit the process normally
	yargs.parse(process.argv.slice(2), (err, argv, output) => {
		Error.stackTraceLimit = 30;

		// arguments validation failed
		if (err && output) {
			console.error(output);
			process.exitCode = 1;
			return;
		}

		// help or version info
		if (output) {
			console.log(output);
			return;
		}

		if (argv.verbose) {
			argv["display"] = "verbose";
		}

		let options;
		try {
			options = require("./utils/convert-argv")(argv);
		} catch (err) {
			if (err.code === "MODULE_NOT_FOUND") {
				const moduleName = err.message.split("'")[1];
				let instructions = "";
				let errorMessage = "";

				if (moduleName === "webpack") {
					errorMessage = `\n${moduleName} not installed`;
					instructions = `Install webpack to start bundling: \u001b[32m\n  $ npm install --save-dev ${moduleName}\n`;

					if (process.env.npm_execpath !== undefined && process.env.npm_execpath.includes("yarn")) {
						instructions = `Install webpack to start bundling: \u001b[32m\n $ yarn add ${moduleName} --dev\n`;
					}
					Error.stackTraceLimit = 1;
					console.error(`${errorMessage}\n\n${instructions}`);
					process.exitCode = 1;
					return;
				}
			}

			if (err.name !== "ValidationError") {
				throw err;
			}

			const stack = ErrorHelpers.cleanUpWebpackOptions(err.stack, err.message);
			const message = err.message + "\n" + stack;

			if (argv.color) {
				console.error(`\u001b[1m\u001b[31m${message}\u001b[39m\u001b[22m`);
			} else {
				console.error(message);
			}

			process.exitCode = 1;
			return;
		}

		/**
		 * When --silent flag is present, an object with a no-op write method is
		 * used in place of process.stout
		 */
		const stdout = argv.silent ? { write: () => {} } : process.stdout;

		function ifArg(name, fn, init) {
			if (Array.isArray(argv[name])) {
				if (init) init();
				argv[name].forEach(fn);
			} else if (typeof argv[name] !== "undefined") {
				if (init) init();
				fn(argv[name], -1);
			}
		}

		function processOptions(options) {
			// process Promise
			if (typeof options.then === "function") {
				options.then(processOptions).catch(function(err) {
					console.error(err.stack || err);
					// eslint-disable-next-line no-process-exit
					process.exit(1);
				});
				return;
			}

			const firstOptions = [].concat(options)[0];
			const statsPresetToOptions = require("webpack").Stats.presetToOptions;

			let outputOptions = options.stats;
			if (typeof outputOptions === "boolean" || typeof outputOptions === "string") {
				outputOptions = statsPresetToOptions(outputOptions);
			} else if (!outputOptions) {
				outputOptions = {};
			}

			ifArg("display", function(preset) {
				outputOptions = statsPresetToOptions(preset);
			});

			outputOptions = Object.create(outputOptions);
			if (Array.isArray(options) && !outputOptions.children) {
				outputOptions.children = options.map(o => o.stats);
			}
			if (typeof outputOptions.context === "undefined") outputOptions.context = firstOptions.context;

			// ...
	
      // 引入 webpack
			const webpack = require("webpack");

			let lastHash = null;
			let compiler;
			try {
				compiler = webpack(options);
			} catch (err) {
				if (err.name === "WebpackOptionsValidationError") {
					if (argv.color) console.error(`\u001b[1m\u001b[31m${err.message}\u001b[39m\u001b[22m`);
					else console.error(err.message);
					// eslint-disable-next-line no-process-exit
					process.exit(1);
				}

				throw err;
			}

			if (argv.progress) {
				const ProgressPlugin = require("webpack").ProgressPlugin;
				new ProgressPlugin({
					profile: argv.profile
				}).apply(compiler);
			}
			if (outputOptions.infoVerbosity === "verbose") {
				if (argv.w) {
					compiler.hooks.watchRun.tap("WebpackInfo", compilation => {
						const compilationName = compilation.name ? compilation.name : "";
						console.error("\nCompilation " + compilationName + " starting…\n");
					});
				} else {
					compiler.hooks.beforeRun.tap("WebpackInfo", compilation => {
						const compilationName = compilation.name ? compilation.name : "";
						console.error("\nCompilation " + compilationName + " starting…\n");
					});
				}
				compiler.hooks.done.tap("WebpackInfo", compilation => {
					const compilationName = compilation.name ? compilation.name : "";
					console.error("\nCompilation " + compilationName + " finished\n");
				});
			}

			function compilerCallback(err, stats) {
				if (!options.watch || err) {
					// Do not keep cache anymore
					compiler.purgeInputFileSystem();
				}
				if (err) {
					lastHash = null;
					console.error(err.stack || err);
					if (err.details) console.error(err.details);
					process.exitCode = 1;
					return;
				}
				if (outputOptions.json) {
					stdout.write(JSON.stringify(stats.toJson(outputOptions), null, 2) + "\n");
				} else if (stats.hash !== lastHash) {
					lastHash = stats.hash;
					if (stats.compilation && stats.compilation.errors.length !== 0) {
						const errors = stats.compilation.errors;
						if (errors[0].name === "EntryModuleNotFoundError") {
							console.error("\n\u001b[1m\u001b[31mInsufficient number of arguments or no entry found.");
							console.error(
								"\u001b[1m\u001b[31mAlternatively, run 'webpack(-cli) --help' for usage info.\u001b[39m\u001b[22m\n"
							);
						}
					}
					const statsString = stats.toString(outputOptions);
					const delimiter = outputOptions.buildDelimiter ? `${outputOptions.buildDelimiter}\n` : "";
					if (statsString) stdout.write(`${statsString}\n${delimiter}`);
				}
				if (!options.watch && stats.hasErrors()) {
					process.exitCode = 2;
				}
			}
			if (firstOptions.watch || options.watch) {
				const watchOptions =
					firstOptions.watchOptions || options.watchOptions || firstOptions.watch || options.watch || {};
				if (watchOptions.stdin) {
					process.stdin.on("end", function(_) {
						process.exit(); // eslint-disable-line
					});
					process.stdin.resume();
				}
				compiler.watch(watchOptions, compilerCallback);
				if (outputOptions.infoVerbosity !== "none") console.error("\nwebpack is watching the files…\n");
			} else {
        // compiler.run 
				compiler.run((err, stats) => {
					if (compiler.close) {
						compiler.close(err2 => {
							compilerCallback(err || err2, stats);
						});
					} else {
						compilerCallback(err, stats);
					}
				});
			}
		}
		processOptions(options);
	});
})();
```

cli.js 

* 当前文件一般存在两个操作，处理参数，将参数交给不同的逻辑（业务分发）
* options 处理 options
* compiler 加载 webpack 配置
* compiler.run() 执行

## webpack 主流程分析

测试代码

```js
const webpack = require('webpack');
const options = require('./webpack.config.js');

let compiler = webpack(options);

compiler.run(function (err, stats) {
  console.log(err);
  console.log(stats.toJson());
});
```



node_modules/webpack/lib/webpack.js

```js
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Compiler = require("./Compiler");
const MultiCompiler = require("./MultiCompiler");
const NodeEnvironmentPlugin = require("./node/NodeEnvironmentPlugin");
const WebpackOptionsApply = require("./WebpackOptionsApply");
const WebpackOptionsDefaulter = require("./WebpackOptionsDefaulter");
const validateSchema = require("./validateSchema");
const WebpackOptionsValidationError = require("./WebpackOptionsValidationError");
const webpackOptionsSchema = require("../schemas/WebpackOptions.json");
const RemovedPluginError = require("./RemovedPluginError");
const version = require("../package.json").version;

/** @typedef {import("../declarations/WebpackOptions").WebpackOptions} WebpackOptions */

/**
 * @param {WebpackOptions} options options object
 * @param {function(Error=, Stats=): void=} callback callback
 * @returns {Compiler | MultiCompiler} the compiler object
 */
const webpack = (options, callback) => {
	const webpackOptionsValidationErrors = validateSchema(
		webpackOptionsSchema,
		options
	);
	if (webpackOptionsValidationErrors.length) {
		throw new WebpackOptionsValidationError(webpackOptionsValidationErrors);
	}
  
	let compiler; // 定义 compiler 变量
  
  // 用户传入的 options
	if (Array.isArray(options)) {
		compiler = new MultiCompiler(
			Array.from(options).map(options => webpack(options))
		);
	} else if (typeof options === "object") {
    // 通过 process 方法合并默认配置
		options = new WebpackOptionsDefaulter().process(options);
		// 实例化 Compiler
		compiler = new Compiler(options.context);
    // 缓存 options
		compiler.options = options;
    	
    // 使用插件，调用 apply 方法
    // 经过 NodeEnvironmentPlugin 处理后，compiler 具备文件读写能力
		new NodeEnvironmentPlugin({
			infrastructureLogging: options.infrastructureLogging
		}).apply(compiler);
    
    // 获取用户自定义配置的 plugins 
		if (options.plugins && Array.isArray(options.plugins)) {
      // 循环执行 plugin
			for (const plugin of options.plugins) {
				if (typeof plugin === "function") {
					plugin.call(compiler, compiler);
				} else {
					plugin.apply(compiler);
				}
			}
		}
    // 触发事件监听
		compiler.hooks.environment.call();
		compiler.hooks.afterEnvironment.call();
    // 对默认插件进行挂载，同时可以确认打包入口
		compiler.options = new WebpackOptionsApply().process(options, compiler);
	} else {
		throw new Error("Invalid argument: options");
	}
  
	if (callback) {
		if (typeof callback !== "function") {
			throw new Error("Invalid argument: callback");
		}
		if (
			options.watch === true ||
			(Array.isArray(options) && options.some(o => o.watch))
		) {
			const watchOptions = Array.isArray(options)
				? options.map(o => o.watchOptions || {})
				: options.watchOptions || {};
			return compiler.watch(watchOptions, callback);
		}
		compiler.run(callback);
	}
  
  // 返回 compiler 对象
	return compiler;
};

exports = module.exports = webpack;
exports.version = version;

webpack.WebpackOptionsDefaulter = WebpackOptionsDefaulter;
webpack.WebpackOptionsApply = WebpackOptionsApply;
webpack.Compiler = Compiler;
webpack.MultiCompiler = MultiCompiler;
webpack.NodeEnvironmentPlugin = NodeEnvironmentPlugin;
// @ts-ignore Global @this directive is not supported
webpack.validate = validateSchema.bind(this, webpackOptionsSchema);
webpack.validateSchema = validateSchema;
webpack.WebpackOptionsValidationError = WebpackOptionsValidationError;

const exportPlugins = (obj, mappings) => {
	for (const name of Object.keys(mappings)) {
		Object.defineProperty(obj, name, {
			configurable: false,
			enumerable: true,
			get: mappings[name]
		});
	}
};

exportPlugins(exports, {
	AutomaticPrefetchPlugin: () => require("./AutomaticPrefetchPlugin"),
	BannerPlugin: () => require("./BannerPlugin"),
	CachePlugin: () => require("./CachePlugin"),
	ContextExclusionPlugin: () => require("./ContextExclusionPlugin"),
	ContextReplacementPlugin: () => require("./ContextReplacementPlugin"),
	DefinePlugin: () => require("./DefinePlugin"),
	Dependency: () => require("./Dependency"),
	DllPlugin: () => require("./DllPlugin"),
	DllReferencePlugin: () => require("./DllReferencePlugin"),
	EnvironmentPlugin: () => require("./EnvironmentPlugin"),
	EvalDevToolModulePlugin: () => require("./EvalDevToolModulePlugin"),
	EvalSourceMapDevToolPlugin: () => require("./EvalSourceMapDevToolPlugin"),
	ExtendedAPIPlugin: () => require("./ExtendedAPIPlugin"),
	ExternalsPlugin: () => require("./ExternalsPlugin"),
	HashedModuleIdsPlugin: () => require("./HashedModuleIdsPlugin"),
	HotModuleReplacementPlugin: () => require("./HotModuleReplacementPlugin"),
	IgnorePlugin: () => require("./IgnorePlugin"),
	LibraryTemplatePlugin: () => require("./LibraryTemplatePlugin"),
	LoaderOptionsPlugin: () => require("./LoaderOptionsPlugin"),
	LoaderTargetPlugin: () => require("./LoaderTargetPlugin"),
	MemoryOutputFileSystem: () => require("./MemoryOutputFileSystem"),
	Module: () => require("./Module"),
	ModuleFilenameHelpers: () => require("./ModuleFilenameHelpers"),
	NamedChunksPlugin: () => require("./NamedChunksPlugin"),
	NamedModulesPlugin: () => require("./NamedModulesPlugin"),
	NoEmitOnErrorsPlugin: () => require("./NoEmitOnErrorsPlugin"),
	NormalModuleReplacementPlugin: () =>
		require("./NormalModuleReplacementPlugin"),
	PrefetchPlugin: () => require("./PrefetchPlugin"),
	ProgressPlugin: () => require("./ProgressPlugin"),
	ProvidePlugin: () => require("./ProvidePlugin"),
	SetVarMainTemplatePlugin: () => require("./SetVarMainTemplatePlugin"),
	SingleEntryPlugin: () => require("./SingleEntryPlugin"),
	SourceMapDevToolPlugin: () => require("./SourceMapDevToolPlugin"),
	Stats: () => require("./Stats"),
	Template: () => require("./Template"),
	UmdMainTemplatePlugin: () => require("./UmdMainTemplatePlugin"),
	WatchIgnorePlugin: () => require("./WatchIgnorePlugin")
});
exportPlugins((exports.dependencies = {}), {
	DependencyReference: () => require("./dependencies/DependencyReference")
});
exportPlugins((exports.optimize = {}), {
	AggressiveMergingPlugin: () => require("./optimize/AggressiveMergingPlugin"),
	AggressiveSplittingPlugin: () =>
		require("./optimize/AggressiveSplittingPlugin"),
	ChunkModuleIdRangePlugin: () =>
		require("./optimize/ChunkModuleIdRangePlugin"),
	LimitChunkCountPlugin: () => require("./optimize/LimitChunkCountPlugin"),
	MinChunkSizePlugin: () => require("./optimize/MinChunkSizePlugin"),
	ModuleConcatenationPlugin: () =>
		require("./optimize/ModuleConcatenationPlugin"),
	OccurrenceOrderPlugin: () => require("./optimize/OccurrenceOrderPlugin"),
	OccurrenceModuleOrderPlugin: () =>
		require("./optimize/OccurrenceModuleOrderPlugin"),
	OccurrenceChunkOrderPlugin: () =>
		require("./optimize/OccurrenceChunkOrderPlugin"),
	RuntimeChunkPlugin: () => require("./optimize/RuntimeChunkPlugin"),
	SideEffectsFlagPlugin: () => require("./optimize/SideEffectsFlagPlugin"),
	SplitChunksPlugin: () => require("./optimize/SplitChunksPlugin")
});
exportPlugins((exports.web = {}), {
	FetchCompileWasmTemplatePlugin: () =>
		require("./web/FetchCompileWasmTemplatePlugin"),
	JsonpTemplatePlugin: () => require("./web/JsonpTemplatePlugin")
});
exportPlugins((exports.webworker = {}), {
	WebWorkerTemplatePlugin: () => require("./webworker/WebWorkerTemplatePlugin")
});
exportPlugins((exports.node = {}), {
	NodeTemplatePlugin: () => require("./node/NodeTemplatePlugin"),
	ReadFileCompileWasmTemplatePlugin: () =>
		require("./node/ReadFileCompileWasmTemplatePlugin")
});
exportPlugins((exports.debug = {}), {
	ProfilingPlugin: () => require("./debug/ProfilingPlugin")
});
exportPlugins((exports.util = {}), {
	createHash: () => require("./util/createHash")
});

const defineMissingPluginError = (namespace, pluginName, errorMessage) => {
	Object.defineProperty(namespace, pluginName, {
		configurable: false,
		enumerable: true,
		get() {
			throw new RemovedPluginError(errorMessage);
		}
	});
};

// TODO remove in webpack 5
defineMissingPluginError(
	exports.optimize,
	"UglifyJsPlugin",
	"webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead."
);

// TODO remove in webpack 5
defineMissingPluginError(
	exports.optimize,
	"CommonsChunkPlugin",
	"webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead."
);
```



node_modules/webpack/lib/Compiler.js

```js
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const parseJson = require("json-parse-better-errors");
const asyncLib = require("neo-async");
const path = require("path");
const { Source } = require("webpack-sources");
const util = require("util");
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");

const Compilation = require("./Compilation");
const Stats = require("./Stats");
const Watching = require("./Watching");
const NormalModuleFactory = require("./NormalModuleFactory");
const ContextModuleFactory = require("./ContextModuleFactory");
const ResolverFactory = require("./ResolverFactory");

const RequestShortener = require("./RequestShortener");
const { makePathsRelative } = require("./util/identifier");
const ConcurrentCompilationError = require("./ConcurrentCompilationError");
const { Logger } = require("./logging/Logger");

/** @typedef {import("../declarations/WebpackOptions").Entry} Entry */
/** @typedef {import("../declarations/WebpackOptions").WebpackOptions} WebpackOptions */

/**
 * @typedef {Object} CompilationParams
 * @property {NormalModuleFactory} normalModuleFactory
 * @property {ContextModuleFactory} contextModuleFactory
 * @property {Set<string>} compilationDependencies
 */

class Compiler extends Tapable {
	constructor(context) {
		super();
    // compiler.hooks.
    // 默认初始化很多钩子
		this.hooks = {
			/** @type {SyncBailHook<Compilation>} */
			shouldEmit: new SyncBailHook(["compilation"]),
			/** @type {AsyncSeriesHook<Stats>} */
			done: new AsyncSeriesHook(["stats"]),
			/** @type {AsyncSeriesHook<>} */
			additionalPass: new AsyncSeriesHook([]),
			/** @type {AsyncSeriesHook<Compiler>} */
			beforeRun: new AsyncSeriesHook(["compiler"]),
			/** @type {AsyncSeriesHook<Compiler>} */
			run: new AsyncSeriesHook(["compiler"]),
			/** @type {AsyncSeriesHook<Compilation>} */
			emit: new AsyncSeriesHook(["compilation"]),
			/** @type {AsyncSeriesHook<string, Buffer>} */
			assetEmitted: new AsyncSeriesHook(["file", "content"]),
			/** @type {AsyncSeriesHook<Compilation>} */
			afterEmit: new AsyncSeriesHook(["compilation"]),

			/** @type {SyncHook<Compilation, CompilationParams>} */
			thisCompilation: new SyncHook(["compilation", "params"]),
			/** @type {SyncHook<Compilation, CompilationParams>} */
			compilation: new SyncHook(["compilation", "params"]),
			/** @type {SyncHook<NormalModuleFactory>} */
			normalModuleFactory: new SyncHook(["normalModuleFactory"]),
			/** @type {SyncHook<ContextModuleFactory>}  */
			contextModuleFactory: new SyncHook(["contextModulefactory"]),

			/** @type {AsyncSeriesHook<CompilationParams>} */
			beforeCompile: new AsyncSeriesHook(["params"]),
			/** @type {SyncHook<CompilationParams>} */
			compile: new SyncHook(["params"]),
			/** @type {AsyncParallelHook<Compilation>} */
			make: new AsyncParallelHook(["compilation"]),
			/** @type {AsyncSeriesHook<Compilation>} */
			afterCompile: new AsyncSeriesHook(["compilation"]),

			/** @type {AsyncSeriesHook<Compiler>} */
			watchRun: new AsyncSeriesHook(["compiler"]),
			/** @type {SyncHook<Error>} */
			failed: new SyncHook(["error"]),
			/** @type {SyncHook<string, string>} */
			invalid: new SyncHook(["filename", "changeTime"]),
			/** @type {SyncHook} */
			watchClose: new SyncHook([]),

			/** @type {SyncBailHook<string, string, any[]>} */
			infrastructureLog: new SyncBailHook(["origin", "type", "args"]),

			// TODO the following hooks are weirdly located here
			// TODO move them for webpack 5
			/** @type {SyncHook} */
			environment: new SyncHook([]),
			/** @type {SyncHook} */
			afterEnvironment: new SyncHook([]),
			/** @type {SyncHook<Compiler>} */
			afterPlugins: new SyncHook(["compiler"]),
			/** @type {SyncHook<Compiler>} */
			afterResolvers: new SyncHook(["compiler"]),
			/** @type {SyncBailHook<string, Entry>} */
			entryOption: new SyncBailHook(["context", "entry"])
		};
		// TODO webpack 5 remove this
		this.hooks.infrastructurelog = this.hooks.infrastructureLog;

		this._pluginCompat.tap("Compiler", options => {
			switch (options.name) {
				case "additional-pass":
				case "before-run":
				case "run":
				case "emit":
				case "after-emit":
				case "before-compile":
				case "make":
				case "after-compile":
				case "watch-run":
					options.async = true;
					break;
			}
		});

		/** @type {string=} */
		this.name = undefined;
		/** @type {Compilation=} */
		this.parentCompilation = undefined;
		/** @type {string} */
		this.outputPath = "";

		this.outputFileSystem = null;
		this.inputFileSystem = null;

		/** @type {string|null} */
		this.recordsInputPath = null;
		/** @type {string|null} */
		this.recordsOutputPath = null;
		this.records = {};
		this.removedFiles = new Set();
		/** @type {Map<string, number>} */
		this.fileTimestamps = new Map();
		/** @type {Map<string, number>} */
		this.contextTimestamps = new Map();
		/** @type {ResolverFactory} */
		this.resolverFactory = new ResolverFactory();

		this.infrastructureLogger = undefined;

		// TODO remove in webpack 5
		this.resolvers = {
			normal: {
				plugins: util.deprecate((hook, fn) => {
					this.resolverFactory.plugin("resolver normal", resolver => {
						resolver.plugin(hook, fn);
					});
				}, "webpack: Using compiler.resolvers.normal is deprecated.\n" + 'Use compiler.resolverFactory.plugin("resolver normal", resolver => {\n  resolver.plugin(/* … */);\n}); instead.'),
				apply: util.deprecate((...args) => {
					this.resolverFactory.plugin("resolver normal", resolver => {
						resolver.apply(...args);
					});
				}, "webpack: Using compiler.resolvers.normal is deprecated.\n" + 'Use compiler.resolverFactory.plugin("resolver normal", resolver => {\n  resolver.apply(/* … */);\n}); instead.')
			},
			loader: {
				plugins: util.deprecate((hook, fn) => {
					this.resolverFactory.plugin("resolver loader", resolver => {
						resolver.plugin(hook, fn);
					});
				}, "webpack: Using compiler.resolvers.loader is deprecated.\n" + 'Use compiler.resolverFactory.plugin("resolver loader", resolver => {\n  resolver.plugin(/* … */);\n}); instead.'),
				apply: util.deprecate((...args) => {
					this.resolverFactory.plugin("resolver loader", resolver => {
						resolver.apply(...args);
					});
				}, "webpack: Using compiler.resolvers.loader is deprecated.\n" + 'Use compiler.resolverFactory.plugin("resolver loader", resolver => {\n  resolver.apply(/* … */);\n}); instead.')
			},
			context: {
				plugins: util.deprecate((hook, fn) => {
					this.resolverFactory.plugin("resolver context", resolver => {
						resolver.plugin(hook, fn);
					});
				}, "webpack: Using compiler.resolvers.context is deprecated.\n" + 'Use compiler.resolverFactory.plugin("resolver context", resolver => {\n  resolver.plugin(/* … */);\n}); instead.'),
				apply: util.deprecate((...args) => {
					this.resolverFactory.plugin("resolver context", resolver => {
						resolver.apply(...args);
					});
				}, "webpack: Using compiler.resolvers.context is deprecated.\n" + 'Use compiler.resolverFactory.plugin("resolver context", resolver => {\n  resolver.apply(/* … */);\n}); instead.')
			}
		};

		/** @type {WebpackOptions} */
		this.options = /** @type {WebpackOptions} */ ({});

		this.context = context;

		this.requestShortener = new RequestShortener(context);

		/** @type {boolean} */
		this.running = false;

		/** @type {boolean} */
		this.watchMode = false;

		/** @private @type {WeakMap<Source, { sizeOnlySource: SizeOnlySource, writtenTo: Map<string, number> }>} */
		this._assetEmittingSourceCache = new WeakMap();
		/** @private @type {Map<string, number>} */
		this._assetEmittingWrittenFiles = new Map();
	}

	/**
	 * @param {string | (function(): string)} name name of the logger, or function called once to get the logger name
	 * @returns {Logger} a logger with that name
	 */
	getInfrastructureLogger(name) {
		if (!name) {
			throw new TypeError(
				"Compiler.getInfrastructureLogger(name) called without a name"
			);
		}
		return new Logger((type, args) => {
			if (typeof name === "function") {
				name = name();
				if (!name) {
					throw new TypeError(
						"Compiler.getInfrastructureLogger(name) called with a function not returning a name"
					);
				}
			}
			if (this.hooks.infrastructureLog.call(name, type, args) === undefined) {
				if (this.infrastructureLogger !== undefined) {
					this.infrastructureLogger(name, type, args);
				}
			}
		});
	}

	watch(watchOptions, handler) {
		if (this.running) return handler(new ConcurrentCompilationError());

		this.running = true;
		this.watchMode = true;
		this.fileTimestamps = new Map();
		this.contextTimestamps = new Map();
		this.removedFiles = new Set();
		return new Watching(this, watchOptions, handler);
	}

	run(callback) {
		if (this.running) return callback(new ConcurrentCompilationError());

		const finalCallback = (err, stats) => {
			this.running = false;

			if (err) {
				this.hooks.failed.call(err);
			}

			if (callback !== undefined) return callback(err, stats);
		};

		const startTime = Date.now();

		this.running = true;

		const onCompiled = (err, compilation) => {
			if (err) return finalCallback(err);

			if (this.hooks.shouldEmit.call(compilation) === false) {
				const stats = new Stats(compilation);
				stats.startTime = startTime;
				stats.endTime = Date.now();
				this.hooks.done.callAsync(stats, err => {
					if (err) return finalCallback(err);
					return finalCallback(null, stats);
				});
				return;
			}

			this.emitAssets(compilation, err => {
				if (err) return finalCallback(err);

				if (compilation.hooks.needAdditionalPass.call()) {
					compilation.needAdditionalPass = true;

					const stats = new Stats(compilation);
					stats.startTime = startTime;
					stats.endTime = Date.now();
					this.hooks.done.callAsync(stats, err => {
						if (err) return finalCallback(err);

						this.hooks.additionalPass.callAsync(err => {
							if (err) return finalCallback(err);
							this.compile(onCompiled);
						});
					});
					return;
				}

				this.emitRecords(err => {
					if (err) return finalCallback(err);

					const stats = new Stats(compilation);
					stats.startTime = startTime;
					stats.endTime = Date.now();
					this.hooks.done.callAsync(stats, err => {
						if (err) return finalCallback(err);
						return finalCallback(null, stats);
					});
				});
			});
		};

		this.hooks.beforeRun.callAsync(this, err => {
			if (err) return finalCallback(err);

			this.hooks.run.callAsync(this, err => {
				if (err) return finalCallback(err);

				this.readRecords(err => {
					if (err) return finalCallback(err);

					this.compile(onCompiled);
				});
			});
		});
	}

	runAsChild(callback) {
		this.compile((err, compilation) => {
			if (err) return callback(err);

			this.parentCompilation.children.push(compilation);
			for (const { name, source, info } of compilation.getAssets()) {
				this.parentCompilation.emitAsset(name, source, info);
			}

			const entries = Array.from(
				compilation.entrypoints.values(),
				ep => ep.chunks
			).reduce((array, chunks) => {
				return array.concat(chunks);
			}, []);

			return callback(null, entries, compilation);
		});
	}

	purgeInputFileSystem() {
		if (this.inputFileSystem && this.inputFileSystem.purge) {
			this.inputFileSystem.purge();
		}
	}

	emitAssets(compilation, callback) {
		let outputPath;
		const emitFiles = err => {
			if (err) return callback(err);

			asyncLib.forEachLimit(
				compilation.getAssets(),
				15,
				({ name: file, source }, callback) => {
					let targetFile = file;
					const queryStringIdx = targetFile.indexOf("?");
					if (queryStringIdx >= 0) {
						targetFile = targetFile.substr(0, queryStringIdx);
					}

					const writeOut = err => {
						if (err) return callback(err);
						const targetPath = this.outputFileSystem.join(
							outputPath,
							targetFile
						);
						// TODO webpack 5 remove futureEmitAssets option and make it on by default
						if (this.options.output.futureEmitAssets) {
							// check if the target file has already been written by this Compiler
							const targetFileGeneration = this._assetEmittingWrittenFiles.get(
								targetPath
							);

							// create an cache entry for this Source if not already existing
							let cacheEntry = this._assetEmittingSourceCache.get(source);
							if (cacheEntry === undefined) {
								cacheEntry = {
									sizeOnlySource: undefined,
									writtenTo: new Map()
								};
								this._assetEmittingSourceCache.set(source, cacheEntry);
							}

							// if the target file has already been written
							if (targetFileGeneration !== undefined) {
								// check if the Source has been written to this target file
								const writtenGeneration = cacheEntry.writtenTo.get(targetPath);
								if (writtenGeneration === targetFileGeneration) {
									// if yes, we skip writing the file
									// as it's already there
									// (we assume one doesn't remove files while the Compiler is running)

									compilation.updateAsset(file, cacheEntry.sizeOnlySource, {
										size: cacheEntry.sizeOnlySource.size()
									});

									return callback();
								}
							}

							// TODO webpack 5: if info.immutable check if file already exists in output
							// skip emitting if it's already there

							// get the binary (Buffer) content from the Source
							/** @type {Buffer} */
							let content;
							if (typeof source.buffer === "function") {
								content = source.buffer();
							} else {
								const bufferOrString = source.source();
								if (Buffer.isBuffer(bufferOrString)) {
									content = bufferOrString;
								} else {
									content = Buffer.from(bufferOrString, "utf8");
								}
							}

							// Create a replacement resource which only allows to ask for size
							// This allows to GC all memory allocated by the Source
							// (expect when the Source is stored in any other cache)
							cacheEntry.sizeOnlySource = new SizeOnlySource(content.length);
							compilation.updateAsset(file, cacheEntry.sizeOnlySource, {
								size: content.length
							});

							// Write the file to output file system
							this.outputFileSystem.writeFile(targetPath, content, err => {
								if (err) return callback(err);

								// information marker that the asset has been emitted
								compilation.emittedAssets.add(file);

								// cache the information that the Source has been written to that location
								const newGeneration =
									targetFileGeneration === undefined
										? 1
										: targetFileGeneration + 1;
								cacheEntry.writtenTo.set(targetPath, newGeneration);
								this._assetEmittingWrittenFiles.set(targetPath, newGeneration);
								this.hooks.assetEmitted.callAsync(file, content, callback);
							});
						} else {
							if (source.existsAt === targetPath) {
								source.emitted = false;
								return callback();
							}
							let content = source.source();

							if (!Buffer.isBuffer(content)) {
								content = Buffer.from(content, "utf8");
							}

							source.existsAt = targetPath;
							source.emitted = true;
							this.outputFileSystem.writeFile(targetPath, content, err => {
								if (err) return callback(err);
								this.hooks.assetEmitted.callAsync(file, content, callback);
							});
						}
					};

					if (targetFile.match(/\/|\\/)) {
						const dir = path.dirname(targetFile);
						this.outputFileSystem.mkdirp(
							this.outputFileSystem.join(outputPath, dir),
							writeOut
						);
					} else {
						writeOut();
					}
				},
				err => {
					if (err) return callback(err);

					this.hooks.afterEmit.callAsync(compilation, err => {
						if (err) return callback(err);

						return callback();
					});
				}
			);
		};

		this.hooks.emit.callAsync(compilation, err => {
			if (err) return callback(err);
			outputPath = compilation.getPath(this.outputPath);
			this.outputFileSystem.mkdirp(outputPath, emitFiles);
		});
	}

	emitRecords(callback) {
		if (!this.recordsOutputPath) return callback();
		const idx1 = this.recordsOutputPath.lastIndexOf("/");
		const idx2 = this.recordsOutputPath.lastIndexOf("\\");
		let recordsOutputPathDirectory = null;
		if (idx1 > idx2) {
			recordsOutputPathDirectory = this.recordsOutputPath.substr(0, idx1);
		} else if (idx1 < idx2) {
			recordsOutputPathDirectory = this.recordsOutputPath.substr(0, idx2);
		}

		const writeFile = () => {
			this.outputFileSystem.writeFile(
				this.recordsOutputPath,
				JSON.stringify(this.records, undefined, 2),
				callback
			);
		};

		if (!recordsOutputPathDirectory) {
			return writeFile();
		}
		this.outputFileSystem.mkdirp(recordsOutputPathDirectory, err => {
			if (err) return callback(err);
			writeFile();
		});
	}

	readRecords(callback) {
		if (!this.recordsInputPath) {
			this.records = {};
			return callback();
		}
		this.inputFileSystem.stat(this.recordsInputPath, err => {
			// It doesn't exist
			// We can ignore this.
			if (err) return callback();

			this.inputFileSystem.readFile(this.recordsInputPath, (err, content) => {
				if (err) return callback(err);

				try {
					this.records = parseJson(content.toString("utf-8"));
				} catch (e) {
					e.message = "Cannot parse records: " + e.message;
					return callback(e);
				}

				return callback();
			});
		});
	}

	createChildCompiler(
		compilation,
		compilerName,
		compilerIndex,
		outputOptions,
		plugins
	) {
		const childCompiler = new Compiler(this.context);
		if (Array.isArray(plugins)) {
			for (const plugin of plugins) {
				plugin.apply(childCompiler);
			}
		}
		for (const name in this.hooks) {
			if (
				![
					"make",
					"compile",
					"emit",
					"afterEmit",
					"invalid",
					"done",
					"thisCompilation"
				].includes(name)
			) {
				if (childCompiler.hooks[name]) {
					childCompiler.hooks[name].taps = this.hooks[name].taps.slice();
				}
			}
		}
		childCompiler.name = compilerName;
		childCompiler.outputPath = this.outputPath;
		childCompiler.inputFileSystem = this.inputFileSystem;
		childCompiler.outputFileSystem = null;
		childCompiler.resolverFactory = this.resolverFactory;
		childCompiler.fileTimestamps = this.fileTimestamps;
		childCompiler.contextTimestamps = this.contextTimestamps;

		const relativeCompilerName = makePathsRelative(this.context, compilerName);
		if (!this.records[relativeCompilerName]) {
			this.records[relativeCompilerName] = [];
		}
		if (this.records[relativeCompilerName][compilerIndex]) {
			childCompiler.records = this.records[relativeCompilerName][compilerIndex];
		} else {
			this.records[relativeCompilerName].push((childCompiler.records = {}));
		}

		childCompiler.options = Object.create(this.options);
		childCompiler.options.output = Object.create(childCompiler.options.output);
		for (const name in outputOptions) {
			childCompiler.options.output[name] = outputOptions[name];
		}
		childCompiler.parentCompilation = compilation;

		compilation.hooks.childCompiler.call(
			childCompiler,
			compilerName,
			compilerIndex
		);

		return childCompiler;
	}

	isChild() {
		return !!this.parentCompilation;
	}

	createCompilation() {
		return new Compilation(this);
	}

	newCompilation(params) {
		const compilation = this.createCompilation();
		compilation.fileTimestamps = this.fileTimestamps;
		compilation.contextTimestamps = this.contextTimestamps;
		compilation.name = this.name;
		compilation.records = this.records;
		compilation.compilationDependencies = params.compilationDependencies;
		this.hooks.thisCompilation.call(compilation, params);
		this.hooks.compilation.call(compilation, params);
		return compilation;
	}

	createNormalModuleFactory() {
		const normalModuleFactory = new NormalModuleFactory(
			this.options.context,
			this.resolverFactory,
			this.options.module || {}
		);
		this.hooks.normalModuleFactory.call(normalModuleFactory);
		return normalModuleFactory;
	}

	createContextModuleFactory() {
		const contextModuleFactory = new ContextModuleFactory(this.resolverFactory);
		this.hooks.contextModuleFactory.call(contextModuleFactory);
		return contextModuleFactory;
	}

	newCompilationParams() {
		const params = {
			normalModuleFactory: this.createNormalModuleFactory(),
			contextModuleFactory: this.createContextModuleFactory(),
			compilationDependencies: new Set()
		};
		return params;
	}

	compile(callback) {
		const params = this.newCompilationParams();
		this.hooks.beforeCompile.callAsync(params, err => {
			if (err) return callback(err);

			this.hooks.compile.call(params);

			const compilation = this.newCompilation(params);

			this.hooks.make.callAsync(compilation, err => {
				if (err) return callback(err);

				compilation.finish(err => {
					if (err) return callback(err);

					compilation.seal(err => {
						if (err) return callback(err);

						this.hooks.afterCompile.callAsync(compilation, err => {
							if (err) return callback(err);

							return callback(null, compilation);
						});
					});
				});
			});
		});
	}
}

module.exports = Compiler;

// ...
```

hooks 执行顺序

```js
shouldEmit
done
additionalPass
beforeRun
run
emit
assetEmitted
afterEmit
thisCompilation
compilation
normalModuleFactory
contextModuleFactory
beforeCompile
compile
make
afterCompile
watchRun
failed
invalid
watchClose
infrastructureLog
```

webpack 初始化的时候，就已经定义好一系列钩子供我们使用。

beforeRun、run、thisCompilation、compilation、beforeCompile、compile、make、afterCompile 等。

```js
开始 -> 配置合并 -> 实例化 compiler -> 初始化 node 文件读写能力 -> 挂载 plugins -> 处理 wbepack 内部插件（入口文件处理）
```

```js
开始 -> compiler.beforeRun -> compiler.run -> compiler.beforeComile -> compiler.compile -> compiler.make
```

## webpack.js 主流程实现

主要分为 pack 目录和测试文件 run.js 以及 webpack.config.js。



webpack.config.js

```js
const path = require('path');

module.exports = {
  devtool: 'none',
  mode: 'development',
  entry: './src/index.js',
  context: process.cwd(),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

run.js

```js
// const webpack = require('webpack');
// const options = require('./webpack.config.js');

// let compiler = webpack(options);

// compiler.run(function (err, stats) {
//   console.log(err);
//   console.log(stats.toJson());
// }); 

const webpack = require('./pack');
const options = require('./webpack.config.js');

let compiler = webpack(options);

compiler.run(function (err, stats) {
  console.log(err);
  console.log(stats.toJson());
}); 
```



pack/package.json

```js
{
  "name": "pack",
  "version": "1.0.0",
  "description": "",
  "main": "lib/webpack.js",
  "directories": {
    "lib": "lib"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "tapable": "1"
  }
}
```

pack/lib/webpack.js

```js
const Compiler = require('./Compiler');
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin');

const webpack = function (options) {
  // 实例化 compiler 对象
  const compiler = new Compiler(options.context);
  compiler.options = options;

  // 初始化 NodeEnvironmentPlugin
  new NodeEnvironmentPlugin().apply(compiler);

  // 挂载所有的 plugins 插件至 compiler 对象身上
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(compiler);
    }
  }

  // 挂载所有的 webpack 内置插件
  // compiler.options = new WebpackOptionApply().process(options, compiler);

  // 返回 compiler 对象
  return compiler;
}

module.exports = webpack;
```

pack/lib/Compiler.js

```js
const {
  Tapable,
  AsyncSeriesHook
} = require('tapable');

class Compiler extends Tapable {
  constructor (context) {
    super();
    this.context = context;
    this.hooks = {
      done: new AsyncSeriesHook(['stats'])
    }
  }

  run (callback) {
    callback && callback(null, {
      toJson () {
        return {
          entries: [], // 入口信息
          chunks: [], // chunk 信息
          modules: [], // 模块信息
          assets: [], // 最终生成资源
        }
      }
    });
  }
}

module.exports = Compiler;
```

pack/lib/node/NodeEnvironmentPlugin.js

> 简单实现，了解逻辑即可。

```js
const fs = require('fs');

class NodeEnvironmentPlugin {
  constructor (options) {
    this.options = options || {};
  }

  apply (compiler) {
    compiler.inputFileSystem = fs;
    compiler.outputFileSystem = fs;
  }
}

module.exports = NodeEnvironmentPlugin;
```

## EntryOptionPlugin 分析

new WebpackOptionsApply().process(options, compiler)，对 webpack 默认插件进行挂载



webpack/lib/WebpackOptionsApply

```js
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

// ...

const { cachedCleverMerge } = require("./util/cleverMerge");

/** @typedef {import("../declarations/WebpackOptions").WebpackOptions} WebpackOptions */
/** @typedef {import("./Compiler")} Compiler */

class WebpackOptionsApply extends OptionsApply {
	constructor() {
		super();
	}

	/**
	 * @param {WebpackOptions} options options object
	 * @param {Compiler} compiler compiler object
	 * @returns {WebpackOptions} options object
	 */
	process(options, compiler) {
		let ExternalsPlugin;
		compiler.outputPath = options.output.path;
		compiler.recordsInputPath = options.recordsInputPath || options.recordsPath;
		compiler.recordsOutputPath =
			options.recordsOutputPath || options.recordsPath;
		compiler.name = options.name;
		// TODO webpack 5 refactor this to MultiCompiler.setDependencies() with a WeakMap
		// @ts-ignore TODO
		compiler.dependencies = options.dependencies;
		
    // ...

		let noSources;
		let legacy;
		let modern;
		let comment;
		if (
			options.devtool &&
			(options.devtool.includes("sourcemap") ||
				options.devtool.includes("source-map"))
		) {
			const hidden = options.devtool.includes("hidden");
			const inline = options.devtool.includes("inline");
			const evalWrapped = options.devtool.includes("eval");
			const cheap = options.devtool.includes("cheap");
			const moduleMaps = options.devtool.includes("module");
			noSources = options.devtool.includes("nosources");
			legacy = options.devtool.includes("@");
			modern = options.devtool.includes("#");
			comment =
				legacy && modern
					? "\n/*\n//@ source" +
					  "MappingURL=[url]\n//# source" +
					  "MappingURL=[url]\n*/"
					: legacy
					? "\n/*\n//@ source" + "MappingURL=[url]\n*/"
					: modern
					? "\n//# source" + "MappingURL=[url]"
					: null;
			const Plugin = evalWrapped
				? EvalSourceMapDevToolPlugin
				: SourceMapDevToolPlugin;
			new Plugin({
				filename: inline ? null : options.output.sourceMapFilename,
				moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate,
				fallbackModuleFilenameTemplate:
					options.output.devtoolFallbackModuleFilenameTemplate,
				append: hidden ? false : comment,
				module: moduleMaps ? true : cheap ? false : true,
				columns: cheap ? false : true,
				lineToLine: options.output.devtoolLineToLine,
				noSources: noSources,
				namespace: options.output.devtoolNamespace
			}).apply(compiler);
		} else if (options.devtool && options.devtool.includes("eval")) {
			legacy = options.devtool.includes("@");
			modern = options.devtool.includes("#");
			comment =
				legacy && modern
					? "\n//@ sourceURL=[url]\n//# sourceURL=[url]"
					: legacy
					? "\n//@ sourceURL=[url]"
					: modern
					? "\n//# sourceURL=[url]"
					: null;
			new EvalDevToolModulePlugin({
				sourceUrlComment: comment,
				moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate,
				namespace: options.output.devtoolNamespace
			}).apply(compiler);
		}

		new JavascriptModulesPlugin().apply(compiler);
		new JsonModulesPlugin().apply(compiler);
		new WebAssemblyModulesPlugin({
			mangleImports: options.optimization.mangleWasmImports
		}).apply(compiler);

    // 
		new EntryOptionPlugin().apply(compiler);
		compiler.hooks.entryOption.call(options.context, options.entry);

	 // ...
}

module.exports = WebpackOptionsApply;
```

webpack/lib/EntryOptionPlugin

```js
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const SingleEntryPlugin = require("./SingleEntryPlugin");
const MultiEntryPlugin = require("./MultiEntryPlugin");
const DynamicEntryPlugin = require("./DynamicEntryPlugin");

/** @typedef {import("../declarations/WebpackOptions").EntryItem} EntryItem */
/** @typedef {import("./Compiler")} Compiler */

/**
 * @param {string} context context path
 * @param {EntryItem} item entry array or single path
 * @param {string} name entry key name
 * @returns {SingleEntryPlugin | MultiEntryPlugin} returns either a single or multi entry plugin
 */
const itemToPlugin = (context, item, name) => {
	if (Array.isArray(item)) {
		return new MultiEntryPlugin(context, item, name);
	}
  // 返回实例对象
	return new SingleEntryPlugin(context, item, name);
};

module.exports = class EntryOptionPlugin {
	/**
	 * @param {Compiler} compiler the compiler instance one is tapping into
	 * @returns {void}
	 */
	apply(compiler) {
    // tap EntryOptionPlugin，注册事件监听
		compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
			if (typeof entry === "string" || Array.isArray(entry)) {
				itemToPlugin(context, entry, "main").apply(compiler);
			} else if (typeof entry === "object") {
				for (const name of Object.keys(entry)) {
					itemToPlugin(context, entry[name], name).apply(compiler);
				}
			} else if (typeof entry === "function") {
				new DynamicEntryPlugin(context, entry).apply(compiler);
			}
			return true;
		});
	}
};
```

webpack/lib/SingleEntryPlugin

```js
"use strict";
const SingleEntryDependency = require("./dependencies/SingleEntryDependency");

/** @typedef {import("./Compiler")} Compiler */

class SingleEntryPlugin {
	/**
	 * An entry plugin which will handle
	 * creation of the SingleEntryDependency
	 *
	 * @param {string} context context path
	 * @param {string} entry entry path
	 * @param {string} name entry key name
	 */
	constructor(context, entry, name) {
		this.context = context;
		this.entry = entry;
		this.name = name;
	}

	/**
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"SingleEntryPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					SingleEntryDependency,
					normalModuleFactory
				);
			}
		);
	
		compiler.hooks.make.tapAsync(
			"SingleEntryPlugin",
			(compilation, callback) => {
				const { entry, name, context } = this;

				const dep = SingleEntryPlugin.createDependency(entry, name);
        
        // 开始执行编译，交由 comilation
        // compiler 主要是做编译前的准备，比如订阅钩子
				compilation.addEntry(context, dep, name, callback);
			}
		);
	}

	/**
	 * @param {string} entry entry request
	 * @param {string} name entry name
	 * @returns {SingleEntryDependency} the dependency
	 */
	static createDependency(entry, name) {
		const dep = new SingleEntryDependency(entry);
		dep.loc = { name };
		return dep;
	}
}

module.exports = SingleEntryPlugin;
```

## EntryOptionPlugin 实现

