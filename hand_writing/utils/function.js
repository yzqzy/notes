/**
 * @description 原型继承
 * @param {object} Origin - 源对象
 * @param {object} Target - 目标对象 
 * @returns {void}
 */
function inherit (Origin, Target) {
  function Buffer () {};
  Buffer.prototype = Origin.prototype;
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target;
  Target.prototype.super_class = Origin;
}

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

  var ret = eval(' ctx.originFn(' + args + ')');
  delete ctx.originFn;

  return ret;
}

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

Array.prototype.$fill = function (value) {

}

Array.prototype.$findIndex = function () {

}

Array.prototype.$find = function () {

}

Array.prototype.$flat = function () {
  
}

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