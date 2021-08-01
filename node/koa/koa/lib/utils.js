/**
 * @param {object} proto - ctx.__proto__.__proto__ === proto / context
 * @param {object} target - request
 * @param {any} key 
 */
function defineGetter (proto) {
  return function (target) {
    return function (key) {
      proto.__defineGetter__(key, function () {
        return this[target][key];
      });
    }
  }
}

function defineSetter (proto) {
  return function (target) {
    return function (key) {
      proto.__defineSetter__(key, function (newValue) {
        // ctx.body = 'hello' -> ctx.response.body = 'hello'
        this[target][key] = newValue;
      });
    }
  }
}

function typeOf (value) {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'object') {
    var toStr = Object.prototype.toString;

    switch (toStr.call(value)) {
      case  '[object Object]':
        return 'Object';
      case '[object Array]':
        return 'Array';
    }
  } else {
    return typeof value;
  }
}

module.exports = {
  defineGetter,
  defineSetter,
  typeOf
}