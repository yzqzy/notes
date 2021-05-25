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


/**
 * @author yueluo <yueluo.yang@qq.com>
 */


const test1 = '123';

/**
 * @borrows test1 as test
 */
var obj = {
  test: test1
}



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


/**
 * @param {test~testCallback} cb - xxx 
 */
function test (cb) {
  cb();
}


/**
 * @class Test - xxx
 * @classdesc xxxx
 */
class Test {

}

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


/**
 * @constant {string}
 * @description xxx
 */
const TEST = 'xxx';


/**
 * @file xxx
 * @copyright xxx
 */


/**
 * @requires module:html-webpack-plugin
 * @description xxx
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');


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


function test () {
  /**
   * xxxxxx
   * @summary
   */
  xxx
}


/**
 * @file xxx
 * @version 0.1.0
 */


/**
 * @file 轮播图插件
 * @author yueluo <yueluo.yang@qq.com>
 * @version 0.1.0
 * @dataTime 2020-05-16 17:12
 */


/**
 * @class 轮播图插件
 * @module IndexPage/Croousel
 * @description xxx
 */


/**
 * HTML模板替换
 * 
 * @param {function}} template - HTML字符串模板
 * @param {Object} replaceObject - 要替换的字段
 * @return {string} html - 模板变量被替换后的HTML字符串
 * @description xxxx
 */
function tplReplace (template, replaceObject) {
  return template().replace(/{{(.*?)}}/g, (node, key) => {
    return replaceObject[key];
  });
}


/**
 * @module 选项卡模块
 * @description xxx
 */