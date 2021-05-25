/**
 * @description 获取子元素集合
 * @param {object} node - 元素节点
 * @returns {object}
 */
function elemChildren (node) {
  var temp = {
        'length': 0,
        'push': Array.prototype.push,
        'splice': Array.prototype.splice
      },
      len = node.childNodes.length;
  
  for (var i = 0; i < len; i++) {
    var childItem = node.childNodes[i];

    if (childItem.nodeType === 1) {
      temp.push(childItem);
    }
  }

  return temp;
}

/**
 *  查看滚动条高度
 */
function getScrolloffset () {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

/**
 * 获取浏览器视口大小
 */
function getViewportSize () {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

/**
 * 获取滚动区域大小
 */
function getScrollSize () {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

/**
 * 获取元素距边框距离
 * 
 * @param {*} el 
 */
function getElemDocPosition (el) {
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

/**
 * 获取鼠标位置（鼠标行为坐标系）
 * 
 * @param {*} e 
 */
function pagePos (e) {
  var sLeft = getScrolloffset().left,
      sTop = getScrolloffset().top,
      cLeft = document.documentElement.clientLeft || 0,        
      cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }     
}

/**
 * 拖拽函数（没有限制元素移动范围）
 * 
 * @param {*} elem 
 */
function elemDrag (elem) {
  var x,
      y;

  addEvent(elem, 'mousedown', function (ev) {
    var e = e || window.event;

    x = pagePos(e).X - parseInt(getStyles(elem, 'left'));
    y = pagePos(e).Y - parseInt(getStyles(elem, 'top'));

    addEvent(document, 'mousemove', mouseMove);
    addEvent(document, 'mouseup', mouseUp);
    cancelBubble(e);
    preventDefaultEvent(e);
  });

  function mouseMove (ev) {
      var e = ev || window.event;

      elem.style.left = pagePos(e).X - x + 'px';
      elem.style.top = pagePos(e).Y - y + 'px';
    }

    function mouseUp () {
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
}

/**
 * 获取元素计算样式
 * 
 * @param {*} elem 
 * @param {*} prop width height
 */
function getStyles (elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop];
    } else {
      return window.getComputedStyle(elem, null);
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop];
    } else {
      return elem.currentStyle;
    }
  }
}

/**
 * 绑定事件处理函数
 * 
 * @param {*} el 
 * @param {*} type 
 * @param {*} fn 
 */
function addEvent (el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el);
    });
  } else {
    el['on' + type] = fn;
  }
}

/**
 * 移除事件处理函数
 * 
 * @param {*} el 
 * @param {*} type 
 * @param {*} fn 
 */
function removeEvent (el, type, fn) {
  if (el.addEventListener) {
    el.removeEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.detachEvent('on' + type, fn);
  } else {
    el['on' + type] = null;
  }
}

/**
 * 阻止冒泡事件
 * 
 * @param {*} ev 
 */
function cancelBubble (ev) {
  var e = ev || window.event;

  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

/**
 * 阻止默认事件
 * 
 * @param {*} ev 
 */
function preventDefaultEvent (ev) {
  var e = ev || window.event;

  if (e.preventDefault) {
      e.preventDefault();
  } else {
    e.returnValue = false;
  }
};

/**
 * 判断文档解析完毕
 * 
 * @param {*} fn 
 */
function domReady (fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false);
      fn();
    }, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (this.readyState === 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee);
        fn();
      }
    })
  } 

  // 判断不在iframe中、兼容IE67
  if (document.documentElement.doScroll && 
        typeof(window.frameElement) === 'undefined') {
          
    try {
      document.documentElement.doScroll('left');
    } catch (e) {
      return setTimeout(arguments.callee, 20);
    }

    fn();
  }
}

/**
 * 检测当前网络类型（移动端）
 */
function networkType () {
  var type = navigator.connection.effectiveType;
  
  switch (type) {
    case 'slow-2g':
      return '2G-';
    case '2g':
      return '2G';
    case '3g':
      return '3G';
    case '4g': 
      return '4G';
    default:
      return 'Unknown network';
  }
}

/**
 * JS继承 - 圣杯模式
 * 
 * @param {*} Target 继承方 
 * @param {*} Origin 被继承方
 */
function inherit0 (Target, Origin) {
  function Buffer() {}
  Buffer.prototype = Origin.prototype;
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target; // 还原构造器
  Target.prototype.super_class = Origin; // 设置继承源
}

/**
 * JS继承 - 圣杯模式
 */
var inherit =  (function () {
  var Buffer = function () {}
  return function (Target, Origin) {
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer();
    Target.prototype.constructor = Target;
    Target.prototype.super_class = Origin;
  }
})();

/**
 * 浅拷贝
 * 
 * @param {*} origin 源对象
 * @param {*} target 目标对象
 */
function clone (origin, target) {
  var tar = target || {};
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      tar[key] = origin[key];
    }
  }
  return tar;
}

/**
 * 深拷贝
 * 
 * @param {*} origin 源对象
 * @param {*} target 目标对象
 */
function deepClone (origin, target) {
  var tar = target || {},
      toStr = Object.prototype.toString,
      arrType = '[object Array]';
      
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof(origin[key]) === 'object' && origin[key] != null) {
        if (toStr.call(origin[key]) === arrType) {
          tar[key] = [];
        } else {
          tar[key] = {};
        }
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
}

/**
 * 对象冻结
 * 
 * @param {*} obj 
 */
function freeze (obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (typeof(obj[key]) === 'object' && obj[key] !== null) {
      freeze(obj[key]);
    }
  }
}

/**
 * promisify 
 * 
 * @param {*} func 
 */
function promisify (func) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}

/**
 * 函数promsie化
 * 
 * @param {*} obj 
 */
function promisifyAll (obj) {
  for (let [key, func] of Object.entries(obj)) {
    if (typeof func === 'function') {
      obj[key + 'Promise'] = promisify(func);
    }
  }
}

/**
 * Co
 * 
 * @param {*} iter 
 */
function Co (iter) {
  return new Promise((resolve, reject) => {
    let next = (data) => {
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