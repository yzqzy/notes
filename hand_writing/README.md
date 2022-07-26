### typeof 

了解 JS 方法特性，手写源码应当是信手拈来，这也是一名合格的前端工程师基本素养之一。

```js
/**
 * @description 检测数据类型
 * @param {any} value 
 * @returns {string}
 */
function $typeof (value) {
  if (value === null) {
    return 'null';
  }

  return typeof value === 'object' ? {
    '[object Object]': 'Object',
    '[object Array]': 'Array',
    '[object Number]': 'Number',
    '[object String]': 'String',
    '[object Boolean]': 'Boolean'
  }[({}).toString.call(value)] : typeof value;
}

```

### 防抖、节流

#### 防抖

```js
// 函数防抖
// 1. 初次触发事件，执行执行
// 2. 对于在事件被触发 n 秒后再执行的回调，延迟执行
// 3. 如果 n 秒内再次触发事件，重新开始计时
// 应用场景：ajax 请求数据，输入验证

/**
 * @description 防抖函数
 * @param {function} fn - 目标函数 
 * @param {number} delay - 延迟时间
 * @param {boolean} triggerNow - 是否立即执行
 * @returns {function}
 */
function debounce (fn, delay, triggerNow) {
  var t = null;

  var debounce = function () {
    var that = this,
        args = arguments;

    if (t) {
      clearTimeout(t);
    }

    if (triggerNow) {
      var exec = !t;

      t = setTimeout(function () {
        t = null;
      }, delay);

      if (exec) {
        fn.apply(that, args);
      }
    } else {
      t = setTimeout(function () {
        fn.apply(that, args);
      }, delay);
    }
  }

  debounce.remove = function () {
    clearTimeout(t);
    t = null;
  }

  return debounce;
}
```

#### 节流

```js
// 函数节流
// 事件被触发、n 秒之内只执行一次事件处理函数
// 输入检查、Ajax 请求

function throttle (fn, delay) {
  var t = null,
      begin = new Date().getTime();

  return function () {
    var that = this,
        args = arguments;

    var cur = new Date().getTime();

    clearTimeout(t);
    
    if (cur - begin >= delay) {
      fn.apply(that, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
        fn.apply(that, args);
      }, delay);
    }
  }
}
```

### 浅拷贝、深拷贝

#### 浅拷贝

```js
/**
 * @description 浅拷贝（对象）
 * @param {object} origin - 源对象
 * @param {object} target - 目标对象
 * @returns {object}
 */
function clone (origin, target) {
  var tar = target || {};

  for (var k in origin) {
    if (origin.hasOwnProperty(k)) {
      tar[k] = origin[k];
    }
  }

  return tar;
}
```

#### 深拷贝

```js
function isArray (target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}

function isObject (target) {
  return typeof target === 'object' && target !== null;
}

/**
 * @description 深拷贝（对象）
 * @param {object} origin - 源对象
 * @param {object} target - 目标对象
 * @returns {object}
 */
function deepClone (origin, target) {
  var tar = target || {};

  for (var k in origin) {
    if (origin.hasOwnProperty(k)) {
      if (isObject(origin[k])) {
        tar[k] = isArray(origin[k]) ? [] : {};
        deepClone(origin[k], tar[k]);
      } else {
        tar[k] = origin[k];
      }
    }
  }

  return tar;
}
```

### new 关键字

```js
/**
 * @description 自定义实现 new 关键字
 *  生成 this 指向，包含属性及 __proto__
 *  构造函数如果返回对象，new 出的实例也返回对象，否则返回构造的 this 对象
 */
function $new () {
  var constructor = [].shift.call(arguments),
      _this = {};

  _this.__proto__ = constructor.prototype;
  var res = constructor.apply(_this, arguments);

  return $typeof(res) === 'Object' ? res : _this;
} 
```

### instanceof 关键字

```js
/**
 * @description 判断 target 是否是 type 的实例
 * @param {any} target 
 * @param {any} type 
 * @returns {boolean}
 */
function $instanceof (target, type) {
  var p = target;

  while (p) {
    if (p === type.prototype) {
      return true;
    }
    p = p.__proto__;
  }

  return false;
}
```

### Object.create

```js
/**
 * @description 以提供的原型创建新对象
 * @param {objejct} proto 
 * @returns {object}
 */
Object.prototype.$create = function (proto) {
  function Buffer () {};
  Buffer.prototype = proto;
  Buffer.prototype.constructor = Buffer;
  return new Buffer();
}
```

### call/apply/bind

#### call

```js
/**
 * @description 自定义实现 call
 * @param {object} ctx - 上下文 
 * @returns {any}
 */
Function.prototype.$call = function (ctx) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  var args = [];
  
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');  
  }

  var ret = eval('ctx.originFn(' + args + ')');
  delete ctx.originFn;

  return ret;
}
```

#### apply

```js
/**
 * @description 自定义实现 apply
 *  只取到第二个参数, 后面的参数忽略；
 *  第二个参数： string、number、boolean、symbol -> reateListFromArrayLike called on non-object；
 *  第二个参数： {}、fn、null、undefined -> arguments -> length 0；
 *  第二个参数： [] -> 实参列表；
 * @param {object} ctx - 上下文
 * @param {array} args - 参数列表 
 * @returns {any}
 */
Function.prototype.$apply = function (ctx, args) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  if (
    typeof args === 'string' || 
    typeof args === 'number' ||
    typeof args === 'boolean' || 
    typeof args === 'symbol'
  ) {
    throw new TypeError(' CreateListFromArrayLike called on non-object');
  }

  if ($typeof(args) !== 'Array') {
    return ctx.originFn();
  }

  var ret = eval('ctx.originFn(' + args + ')');
  
  delete ctx.originFn;

  return ret;
}
```

#### bind

```js
/**
 * @description 自定义实现 bind
 *  执行bind 后会创建一个绑定函数
 *  第一个参数用来改变 this 指向
 *  bind 可以分离原函数的参数，bind 接收一部分参数，返回的新函数接收一部分参数
 *  bind 和 call 的函数传递参数是一致的
 *  实例化返回的新函数 this 指向的是原函数构造出来的实例
 *  实例应该继承原函数的原型属性
 * @param {object} ctx - 上下文 
 * @returns {any}
 */
Function.prototype.$bind = function (ctx) {
  var originFn = this,
      args = [].slice.call(arguments, 1);

  var newFn = function () {
    var newArgs = [].slice.call(arguments);
    var context = this instanceof newFn ? this : ctx;

    return originFn.apply(context, args.concat(newArgs));
  }

  var Buffer = function () {};
  Buffer.prototype = originFn.prototype;
  newFn.prototype = new Buffer();
  newFn.prototype.constructor = newFn;

  return newFn;
}
```


### ES5 方法

#### forEach

```js
/**
 * @description 自定义实现 forEach 函数
 * @param {function} fn - 回调函数
 * @returns {void} 
 */
Array.prototype.$forEach = function (fn) {
  var that = this,
      len = that.length,
      ctx = arguments[1] || window;
  
  for (var i = 0; i < len; i++) {
    var item = deepClone(that[i]);

    fn.apply(ctx, [ item, i, that ]);
  }
}
```

#### map

```js
/**
 * @description 自定义实现 map 函数
 * @param {function} fn - 回调函数
 * @returns {void} 
 */
Array.prototype.$map = function (fn) {
  var that = this,
      len = that.length,
      ctx = arguments[1] || window;

  let newArr = [];

  for (var i = 0; i < len; i++) {
    var item = deepClone(that[i]);

    newArr.push(
      fn.apply(ctx, [ item, i, that ])
    );
  }

  return newArr;
}
```

#### filter

```js
/**
 * @description 自定义实现 filter 函数
 * @param {function} fn - 回调函数
 * @returns {void} 
 */
Array.prototype.$filter = function (fn) {
  var that = this,
      len = that.length,
      ctx = arguments[1] || window;

  var newArr = [];

  for (var i = 0; i < len; i++) {
    var item = deepClone(that[i]);

    fn.apply(ctx, [ item, i, that ]) && newArr.push(item);
  }

  return newArr;
}
```

####  every

```js
/**
 * @description 自定义实现 every 函数
 * @param {function} fn - 回调函数
 * @returns {void} 
 */
Array.prototype.$every = function (fn) {
  var that = this,
      len = that.length,
      ctx = arguments[1] || window;

  for (var i = 0; i < len; i++) {
    var item = deepClone(that[i]);

    if (!fn.apply(ctx, [ item, i, that ])) {
      return false;
    }
  }

  return true;
}
```

#### some

```js
/**
 * @description 自定义实现 some 函数
 * @param {function} fn - 回调函数
 * @returns {void} 
 */
Array.prototype.$some = function (fn) {
  var that = this,
      len = that.length,
      ctx = arguments[1] || window;

  for (var i = 0; i < len; i++) {
    var item = deepClone(that[i]);

    if (fn.apply(ctx, [ item, i, that ])) {
      return true;
    }
  }

  return false;
}
```

#### reduce

```js
/**
 * @description 自定义实现 reduce 函数
 * @param {function} fn - 回调函数
 * @param {any} initialVal - 初始值
 * @returns {void} 
 */
Array.prototype.$reduce = function (fn, initialVal) {
  var that = this,
      len = that.length,
      ctx = arguments[2] || window;

  initialVal = initialVal || 0;

  for (var i = 0; i < len; i++) {
    var item = deepClone(that[i]);

    initialVal = fn.apply(ctx, [ initialVal, item, i, that ]);
  }

  return initialVal;
}
```

#### reduceRight

```js
/**
 * @description 自定义实现 reduceRight 函数
 * @param {function} fn - 回调函数
 * @param {any} initialVal - 初始值
 * @returns {void} 
 */
Array.prototype.$reduceRight = function (fn, initialVal) {
  var that = this,
      len = that.length,
      ctx = arguments[2] || window;

  initialVal = initialVal || 0;

  for (var i = len - 1; i >= 0; i--) {
    var item = deepClone(that[i]);

    initialVal = fn.apply(ctx, [ initialVal, item, i, that ]);
  }

  return initialVal;
}
```

### ES6 方法

#### fill

```js

```

#### find

```js

```

#### findIndex

```js

```

### ES7 方法

#### flat

```js

```

### promise

```js
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #[$Promise]'));
  }

  let called = false;

  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class $Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof $Promise) {
        return value.then(resolve, reject);
      }

      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new $Promise((resolve, reject) => {
      switch (this.state) {
        case FULFILLED:
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          break;
      }
    });

    return promise2;
  }

  catch (errorCallback) {
    return this.then(null, errorCallback);
  }

  finally (finallyCallback) {
    return this.then((value) => {
      return $Promise.resolve(finallyCallback()).then(() => value);
    }, (reason) => {
      return $Promise.resolve(finallyCallback()).then(() => {
        throw reason;
      });
    });
  }

  static resolve (value) {
    return new $Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject (reason) {
    return new $Promise((resolve, reject) => {
      reject(reason);
    });
  }

  static all (promiseArr) {
    let resArr = [],
        idx = 0;

    return new $Promise((resolve, reject) => {
      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(value => 
            formatResArr(value, index, resolve), reject);
        } else {
          formatResArr(promise, index, resolve);
        }
      });
    });

    function formatResArr (value, index, resolve) {
      resArr[index] = value;

      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static allSettled (promiseArr) {
    let resArr = [],
        idx = 0;

    if (!isIterable(promiseArr)) {
      throw new TypeError(`${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`);
    };

    return new Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        return resolve([]);
      }

      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(value => {
            formatResArr('fulfilled', value, index, resolve);
          }, (reason) => {
            formatResArr('rejected', reason, index, resolve);
          });
        } else {
          formatResArr('fulfilled', promise, index, resolve);
        }
      });
    });

    function formatResArr (status, value, index, resolve) {
      switch (status) {
        case 'fulfilled':
          resArr[index] = {
            status,
            value
          }
          break;
        case 'rejected':
          resArr[index] = {
            status,
            reason: value
          }
          break;
        default:
          break;
      }

      if (++idx == promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static race (promiseArr) {
    return new $Promise((resolve, reject) => {
      promiseArr.forEach(promise => {
        if (isPromise(promise)) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      });
    });
  }
}

function isPromise (x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then;
    return typeof then === 'function';
  }
  return false;
}

function isIterable (value) {
  return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}

// 脚本检测
$Promise.defer = $Promise.deferred = function () {
  let deferred = {};

  deferred.promise = new $Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

module.exports = $Promise;
```

### async/await

async 本质就是 generator 生成器函数，是一种语法糖。

可以使用 Co 配合 generator 函数实现 async/await 类似的功能。

```js
/**
 * @description 迭代 generator 函数
 * @param {iterator} iter 
 * @returns {angy}
 */
function Co (iter) {
  return new Promise((resolve, reject) => {
    const next = (data) => {
      const { value, done } = iter.next(data);

      if (done) {
        resolve(data);
      } else {
        value.then(val => next(val));
      }
    }

    next();
  });
}
```

```js
const addOne = (val) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val + 1);
    }, 1000);
  });
}

function * addThree (num) {
  const val1 = yield addOne(num);
  const val2 = yield addOne(val1);
  yield addOne(val2);
}

Co(addThree(0)).then(val => {
  console.log('执行完成', val);
});

```
### ajax 请求

```js
const $ = (function () {
  const randomNum = () => {
    let num = 0;
    for (let i = 0; i < 20; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  const formatData = (obj) => {
    let str = '';
    for (let key in obj) {
      str += `${key}=${obj[key]}&`;
    }
    return str.replace(/&$/, '');
  }

  const ajax = (options = {}) => {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest()
                                    : new ActiveXObject('Microsoft.XMLHTTP');

    if (!xhr) {
      throw new Error('您的浏览器不支持异步发起 HTTP 请求');
    } 

    let type = (options.type || 'GET').toUpperCase(),
        dataType = options.dataType && options.dataType.toUpperCase() || 'JSON',
        url = options.url,
        data = options.data || null,
        fail = options.fail || function () {},
        success = options.success || function () {},
        complete = options.complete || function () {},

        timeout = options.timeout || 3 * 10 * 1000,
        jsonp = options.jsonp || 'cb',
        jsonpCallback = options.jsonpCallback || `Jquery${randomNum()}_${Date.now()}`,
        async = options.async === false ? false : true;

    if (!url) {
      throw new Error('您没有填写 URL');
    }

    if (dataType === 'JSONP') {
      if (type !== 'GET') {
        throw new Error('JSONP 格式必须是 GET 请求');
      }

      const oScript = document.createElement('script');

      oScript.src = !!~url.indexOf('?') ? `${url}&${jsonp}=${jsonpCallback}`
                                        : `${url}?${jsonp}=${jsonpCallback}`;

      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      window[jsonpCallback] = function (data) {
        success(data);
      }

      return;
    }

    t = setTimeout(() => {
      xhr.abort();
      fail();
      complete();
      clearTimeout(t);
      t = null;
      xhr = null;
    }, timeout);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          switch (dataType) {
            case 'JSON':
              success(JSON.parse(xhr.responseText));
              break;
            case 'TEXT':
              success(xhr.responseText);
              break;
            case 'XML':
              success(xhr.responseXML);
              break;
            default:
              success(JSON.parse(xhr.responseText));
              break;
          }
        } else {
          fail();
        }

        complete();
        clearTimeout(t);
        t = null;
        xhr = null;
      }
    }

    xhr.open(type, url, async);
    type === 'POST' && xhr.setRequestHeader('Content-type', 'appliction/x-www-form-urlencoded');
    xhr.send(type === 'GET' ? null : formatData(data));
  }

  const post = ({ url, data, success, fail, complete }) => {
    ajax({
      type: 'POST',
      url,
      data,
      success,
      fail,
      complete
    });
  }

  const get = ({ url, success, fail, complete }) => {
    ajax({
      type: 'GET',
      url,
      success,
      fail,
      complete
    });
  }

  return {
    ajax,
    get,
    post
  }
})();
```
