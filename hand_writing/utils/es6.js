/**
 * @description 对象冻结
 * @param {object} target - 目标对象
 * @returns {object} 
 */
function freeze (target) {
  Object.freeze(target);

  for (const k in target) {
    if (target.hasOwnProperty(k)) {
      if (isObject(target[k])) {
        freeze(target[k]);
      }
    }
  }
}

/**
 * @description 函数 Promise 化
 * @param {function} func
 * @returns {promise} 
 */
function promisify (func) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    });
  }
}

/**
 * @description 函数集合 Promise 化
 * @param {object} target 
 * @returns {void}
 */
function promisifyAll (target) {
  for (const [key, func] of Object.entries(obj)) {
    if (typeof func === 'function') {
      target[key + 'Promise'] = promisify[func];
    }
  }
}

/**
 * @description 以提供原型创建新对象
 * @param {objejct} proto 
 * @returns {object}
 */
Object.prototype.$create = function (proto) {
  function Buffer () {};
  Buffer.prototype = proto;
  Buffer.prototype.constructor = Buffer;
  return new Buffer();
}