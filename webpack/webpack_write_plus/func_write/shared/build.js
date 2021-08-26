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
    // const name = __webpack_require__("./src/login.js");
    // console.log('index：', name);

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