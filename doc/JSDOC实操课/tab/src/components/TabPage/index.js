/**
 * @file 选项卡组件出口文件
 * @module components/TabPage
 * @version 0.1.0
 * @author yueluo <yueluo.yang@qq.com>
 * @time 2020-02-17
 */

/**
 * @requires components/Tab - 选项卡导航组件
 * @requires components/Page - 选项卡内容展示组件
 */
import TabComponent from './Tab';
import PageComponent from './Page';

/**
 * @requires data/tab - 选项卡导航数据
 * @requires data/city - 城市信息集合数据
 */
import tabData from '../../data/tab';
import cityData from '../../data/city';

/** @requires TabPage/style - index.scss */
import './index.scss';

/** @requires TabPage/tpl - index.tpl */
import tpl from './index.tpl';

/** @requires libs/utils - 解构tplReplace */
import { tplReplace } from '../../libs/utils';

/**
 * TabPage组件
 * @description 整合Tab组件和Page组件的容器组件
 * @description 当前组件将插入到app节点中
 * @param {HTMLElement} app - index页面内的根节点元素
 */
export default (app) => {
  /** @type {number} 当前导航聚焦项的下标 */
  let curIdx = 0;

  /**
   * @description 组件初始化函数
   * @return {void}
   */
  const init = () => {
    // 执行渲染函数
    render();
    // 执行事件处理函数绑定的管理函数
    bindEvent();
  };

  /**
   * @description 组件渲染函数
   * @return {void}
   */
  function render () {
    /**
     * @property {string} tab - 选项卡导航HTML字符串
     * @property {string} page - 选项卡显示内容HTML字符串
     */
    const html = tplReplace(tpl, {
      tab: new TabComponent(tabData).init(),
      page: PageComponent(cityData).init()
    });

    // 将组装后的html交给app根节点
    app.innerHTML = html;
  }

  /**
   * @description 绑定事件处理函数的管理函数
   * @return {void} 
   */
  function bindEvent () {

    /**
     * @type {HTMLElement} oTabWrapper 导航器节点
     * @type {HTMLCollection} oTabItems 导航子项集合
     * @type {HTMLCollection} oPageItems 页面显示子项集合
     */
    const oTabWrapper = app.getElementsByClassName('tab-wrapper')[0],
          oTabItems = oTabWrapper.getElementsByClassName('tab-item'),
          oPageIems = app.getElementsByClassName('page-item');

    // 在oTabWrapper上绑定事件处理函数onTabClick - 事件代理
    oTabWrapper.addEventListener(
      'click',
      onTabClick.bind(null, oTabItems, oPageIems),
      false
    );
  }

  /**
   * @description oTabWrapper点击事件处理函数
   * @param {HTMLCollection} oTabItems
   * @param {HTMLCollection} oPageItems
   * @see bindEvent
   * @return {void}
   */
  function onTabClick (oTabItems, oPageIems) {
    // 获取事件源对象及其样式类名
    const tar = arguments[2].target,
          className = tar.className;

    // 当点击元素类名为tab-item，证明点击到目标元素，并执行导航切换功能函数
    className === 'tab-item' && tabChange(tar, oTabItems, oPageIems);
  }

  /**
   * @description 执行导航切换功能函数
   * @param {HTMLElement} target - 点击目标元素  
   * @see onTabClick
   * @return {void}
   */
  function tabChange (target, oTabItems, oPageIems) {
    // 将原curIdx对应的tab与page元素去掉current样式类
    oTabItems[curIdx].className = 'tab-item';
    oPageIems[curIdx].className = 'page-item';
    // 将当前目标元素的下标赋值给curIdx
    curIdx = [].indexOf.call(oTabItems, target);
    // 将新的curIdx对应的tab与page元素增加current样式类
    oTabItems[curIdx].className += ' tab-current';
    oPageIems[curIdx].className += ' page-current';
  }

  // 返回该组件抛出的方法集合
  return {
    init
  };
};