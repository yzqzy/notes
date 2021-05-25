# JS DOC

[JS DOC](https://jsdoc.zcopy.site/)

增强代码可读性的注释系统（注释规范），目的是增强代码的可读性。

通过注释，可以导出一个比较规范的API文档。

vscode：Add jsdoc comments

## 基本注释

```js
/**
 * content
 */
function test () {
  // 打印字符串123
  console.log('123');  
}
```

## 常用标签

### @alias 函数与变量别名

第一种场景：

```js
;(function () {
  /**
   * @alias test
   */
  function test1 () {}

  window.test = test1;
})();
```

第二种场景：

```js
function test (a) {
  a += 1;

  return function () {
    return a * a;
  }
}

/**
 * @alias test1 - test
 */
const test1 = test(5);

test1();
```

### @constructor 构造函数

第一种场景：

```js
;(function () {

  /**
   * @constructor Test
   */
  var Test = function () {

  }

  window.Test = Test;
});

const test1 = new Test();
```

第二种场景：

```js
class Test {

  /**
   * @constructor Test
   * 
   */
  constructor (a, b) {

  }
}
```

### @description 描述

```js
/**
 * @description 这是一个HTML模板替换函数
 */
function tplReplace (tmp, rep) {

  /**
   * @description 内容描述
   */
  xxxxxxx
}
```

###   @example 例子

```js
/**
 * @example 
 *  var t = new Test(1, 2);
 *  t.plus(); // 1 + 2 的结果
 */
function Test (a, b) {
  this.a = a;
  this.b = b;
}

Test.prototype.plus = function () {
  return this.a + this.b;
}
```

### @extends 继承关系

```js
import React, { Component } from 'react';

/**
 * @extends {React.component}
 */
class Test extends Component {

}

export default Test;
```

### @params 参数

```js
/**
 * @description 这是一个做加法运算的函数
 * @param {number} a - 加法中的第一个数字
 * @param {number} b - 加法中的第二个数字
 */
function test (a, b) {
  return a + b;
} 
```

params（number string boolean function undefined object Array Object Null）

###  @property 属性

```js
/**
 * @property {string} type - 轮播图类型
 *  slide(default)：无缝轮播
 *  fade：淡入淡出
 * @property {number} duration - 轮播图轮播等待时间
 * @property {boolean} autoplay - 是否设置自动轮播
 *  true：加载后自动轮播
 *  false：加载后手动切换
 */
var obj = {
  type: 'slide',
  duration: 3000,
  autoplay: true
}
```

### @return 返回值 

无返回 Void 或者 undefined。

```js
/**
  * @description 这是一个做加法运算的函数
  * @param {number} a 第一个数字
  * @param {number} b 第二个数字
  * @return {number}
  */
function test (a, b) {
  return a + b;
}
```

### @type 变量类型

```js
/**
 * @type {number} a - xxx
 * @type {string} b - xxx
 * @type {boolean} c - xxx
 * @type {function} d - xxx
 */
var a = 1,
    b = '2',
    c = true,
    d = function () {};
```

###  @module 模块

```js
/**
 * @module IndexPage/test
 * @module ListPage/test
 * @description xxx
 * @param {string} a - xxx
 * @param {number} b - xxx
 */
export default function (a, b) {

}

// 表明模块归属于哪个页面，或者可以被哪一个页面引用。

/**
 * @module Common/test
 * @description xxx
 * @param {string} a - xxx
 * @param {number} b - xxx
 */
export default function (a, b) {

}

/// 如果是通用的模块，可以使用Common（大小写任意，最好是大写）。
```

### ``{Array.<number>}`` 具体类型的数组，数字类型的数组。

```js
/**
 * @type {Array.<number>} arr - xxx
 * @type {number[]} arr - xxx
 */
const arr = [1, 2, 3, 4, 5];

/**
 * @type {Array.<object>} arr - xxx
 * @type {Object[]} arr - xxx
 */
const arr = [
  {},
  {}
]
```

### @access 访问等级 主要针对于类

private 私有
protected 受保护的
public 公有

第一种场景：

```js
class Test {
  /** @access private a - xxx */
  #a = 0;
  
  constructor () {
    /**
     * @access protected b - xxx
     * @access public c - xxx
     */
    this._b = 1;
    this.c = 2;
  }
}
```

第二种场景：

```js
class Test {
  /** @private a - xxx */
  #a = 0;
  
  constructor () {
    /**
     * @protected b - xxx
     * @public c - xxx
     */
    this._b = 1;
    this.c = 2;
  }
}
```

### @author 作者

```js
/**
 * @author yueluo <yueluo.yang@qq.com>
 */
```

### @borrows 改变标识符 不常用

```js
const test1 = '123';

/**
 * @borrows test1 as test
 */
var obj = {
  test: test1
}
```

### @callback 回调函数

第一种场景：

```js
function Test () {}

/**
 * @param {Test~testCallback} cb
 * 
 */
Test.prototype.a = function (cb) {
  cb();
}

/**
 * @callback Test~testCallback
 */
function b () {

}
```

 第二种场景：

```js
/**
 * @param {test~testCallback} cb - xxx 
 */
function test (cb) {
  cb();
}
```

### @class 类 

```js
/**
 * @class Test - xxx
 * @classdesc xxxx
 */
class Test {
  
}
```

### @constant 常量

第一种场景：

```js
/**
 * @constant {string}
 * @description xxx
 */
const TEST = 'xxx';
```

第二种场景：

```js
/**
 * @constant {Object}
 * @description xxx
 * 
 * @property {string} BASE_URL xxx
 * @property {string} GET_COURSE_DATA xxx
 */
const API = {
  BASE_URL: 'xxx',
  GET_COURSE_DATA: 'xxx'
}
```

### @file 文件描述 + @copyright 版权描述

每一个文件的最上方都应该有文件描述。

```js
/**
 * @file xxx
 * @copyright xxx
 */
```

### @requires 依赖模块

```js
/**
 * @requires module:html-webpack-plugin
 * @description xxx
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

### @see 知名文档位置 并没有实际作用

```js
/**
 * @description 加法运算
 * @param {number} a - 加法运算的第一个值
 * @param {number} b - 加法运算的第二个值
 */
function sum (a, b) {
  console.log(a + b);
}

/**
 * @see sum
 */
function sum (a, b) {

}
```

### @summary 总结描述

```js
function test () {
  /**
   * xxxxxx
   * @summary
   */
  xxx
}
```

### @verson 版本

一般来说都是在文件最上方，对于模块和插件来说比较重要。

```js
/**
 * @file xxx
 * @version 0.1.0
 */
```

## 常用注释组合

### 文件头注释

```js
/**
 * @file 轮播图插件
 * @author yueluo <yueluo.yang@qq.com>
 * @version 0.1.0
 * @dataTime 2020-05-16 17:12
 */
```

### class 注释

```js
/**
 * @class 轮播图插件
 * @module IndexPage/Croousel
 * @description xxx
 */
```

### 方法注释

```js
/**
 * HTML模板替换
 * 
 * @param {function} template - HTML字符串模板
 * @param {Object} replaceObject - 要替换的字段
 * @return {string} html - 模板变量被替换后的HTML字符串
 * @description xxxx
 */
function tplReplace (template, replaceObject) {
  return template().replace(/{{(.*?)}}/g, (node, key) => {
    return replaceObject[key];
  });
}
```

### 模块注释

```js
/**
 * @module 选项卡模块
 * @description xxx
 */
```

## 文件注释实例

### 工具类

```js
/**
 * @file JS 函数工具库
 * @module libs/utils
 * @version 0.1.0
 * @author yueluo <yueluo.yang@qq.com>
 * @time 2020-02-17
 */

/**
 * @description 替换HTML模板中{{}}的处理函数
 * @param {function} template - template需要执行才会导出HTML字符串模板
 * @param {object} replaceObject - 传入的模板中需要替换的变量字段
 */
function tplReplace (template, replaceObject) {
  /**
   * 1. 正则匹配出{{}}以及其内部的变量字符串
   * 2. 利用replace方法将匹配的内容与对象键值对应
   * 3. 将匹配出的{{}}及其内部的内容一并替换成对象键值
   */
  return template().replace(/\{\{(.*?)}\}/g, (node, key) => {
    return replaceObject[key];
  });
}

// 导出工具方法集合
export {
  tplReplace
};
```

### 页面文件

```js
/**
 * @file 选项卡组件/页面子组件
 * @module components/TabPage/Page
 * @version 0.1.0
 * @author yueluo <yueluo.yang@qq.com>
 * @time 2020-02-17
 */

/**
 * @requires Page/pageItem - 选项卡显示内容模板
 * @requires Page/style - 选项卡内容模板样式
 * @requires libs/utils - 解构tplReplace
 */
import tpl from './pageItem.tpl';
import './index.scss';
import { tplReplace } from '../../../libs/utils';

/**
 * @module components/Page
 * @description Page组件出口文件
 * @param {Array.<Object>}  cityData - 城市信息集合数据
 */
export default (cityData) => {

  /**
   * @description 模块初始化函数
   * @return {string} - page组件的HTML字符串
   */
  const init = () => {
    /** @see _makePage */
    return _makePage();
  }

  /**
   * @description 组装内容显示HTML
   * @return {string} - html字符串
   */
  function _makePage () {
    /** @type {string} 拼接内容显示子项HTML字符串 */
    let list = '';

    // 遍历城市集合数据
    cityData.forEach((item, index) => {
      /**
       * @property {string} itemClassName - page子项的样式类
       * @property {string} name - 城市名称
       * @property {string} imgUrl - 城市图片远程网络地址
       * @property {string} intro - 城市简介
       */
      list += tplReplace(tpl, {
        itemClassName: !index ? 'page-item page-current' : 'page-item',
        name: item.name,
        imgUrl: item.img_url,
        intro: item.intro
      });
    });

    /**
     * @see _createWrapper
     */
    return tplReplace(_createWrapper, {
      list
    });
  }

  /**
   * @description 创建选项卡内容显示容器
   * @return {string} pageWrapper HTML字符串
   */
  function _createWrapper () {
    return '<div class="page-wrapper">{{list}}</div>'
  }

  // 返回该组件抛出的方法集合
  return {
    init
  };
};
```