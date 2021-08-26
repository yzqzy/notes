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
    return Object.prototype.hasOwnProperty(object, property);
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

