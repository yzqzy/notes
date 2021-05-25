/**
 * @file 选项卡组件/选项导航子组件
 * @module components/TabPage/Tab
 * @version 0.1.0
 * @author yueluo <yueluo.yang@qq.com>
 * @time 2020-02-17
 */

/**
 * @requires Tab/tplItem - 选项卡导航子项模板
 * @requires Tab/style - 导航样式
 * @requires libs/utils - 解构tplReplace
 */
import tpl from './tabItem.tpl';
import './index.scss';
import { tplReplace } from '../../../libs/utils';

/**
 * @class Tab
 * @classdesc 选项卡导航类
 */
export default class Tab {

  /**
   * @constructor Tab
   * @param {Array.<Object>} tabData - 选项卡导航数据 
   */
  constructor (tabData) {
    /** @private _tabData - 选项卡导航数据 */
    this._tabData = tabData;
  }

  /**
   * @description 模块初始化函数
   * @public init
   * @return {string} - 选项卡导航部分HTML字符串
   */
  init () {
    /** @see _makeTab */
    return this._makeTab();
  }

  /**
   * @description 组装导航HTML
   * @private _makeTab
   * @return {string} - html字符串
   */
  _makeTab () {
    /** @type {string} 拼接导航子项HTML字符串 */
    let list = '';

    // 遍历导航数据
    this._tabData.forEach((item, index) => {
      /**
       * @property {string} itemClassName - 导航子项样式类
       * @property {string} title - 导航子项标题
       */
      list += tplReplace(tpl, {
        itemClassName: !index ? 'tab-item tab-current' : 'tab-item',
        title: item.title
      });
    });

    /**
     * @see _createWrapper
     */
    return tplReplace(this._createWrapper, {
      list
    });
  }

  /**
   * @description 创建选项卡导航容器
   * @private _createWrapper
   * @return {string} tabWrapper HTML字符串
   */
  _createWrapper () {
    return '<div class="tab-wrapper">{{list}}</div>';
  } 
}