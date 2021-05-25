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