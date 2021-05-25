/**
 * @file JS函数工具库
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