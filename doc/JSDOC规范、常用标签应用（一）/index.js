/**
 * content
 * 
 */


function test () {
  // 打印字符串123
  console.log('123');  
}

;(function () {
  /**
   * @alias test
   */
  function test1 () {}

  window.test = test1;
})();


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


;(function () {

  /**
   * @constructor Test
   */
  var Test = function () {

  }

  window.Test = Test;
});

const test1 = new Test();


class Test {

  /**
   * @constructor Test
   * 
   */
  constructor (a, b) {

  }

}


/**
 * @description 这是一个HTML模板替换函数
 */
function tplReplace (tmp, rep) {

  /**
   * @description 内容描述
   */
  xxxxx2q1e121e21
}


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


import React, { Component } from 'react';

/**
 * @extends {React.component}
 */
class Test extends Component {

}

export default Test;


/**
 * @description 这是一个做加法运算的函数
 * @param {number} a - 加法中的第一个数字
 * @param {number} b - 加法中的第二个数字
 */
function test (a, b) {
  return a + b;
}


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


/**
 * @description 这是一个做加法运算的函数
 * @param {number} a 第一个数字
 * @param {number} b 第二个数字
 * @return {number}
 */
function test (a, b) {
  return a + b;
}


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

/**
 * @module IndexPage/test
 * @module ListPage/test
 * @description xxx
 * @param {string} a - xxx
 * @param {number} b - xxx
 */
export default function (a, b) {

}

/**
 * @module Common/test
 * @description xxx
 * @param {string} a - xxx
 * @param {number} b - xxx
 */
export default function (a, b) {

}