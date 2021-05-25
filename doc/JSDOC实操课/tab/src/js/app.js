/**
 * @file 项目根模块 app
 * @module app
 * @version 0.1.0
 * @author yueluo <yueluo.yang@qq.com>
 * @time 2020-02-17
 */

/** @requires components/TabPage - 城市信息选项卡组件 */
import TabPage from '../components/TabPage';

/**
 * @description 根模块 - app
 * @param {document} doc
 */
;((doc) => {

  /** @type {HTMLElement} 页面根节点 - app */
  const app = doc.getElementById('app');

  /** 
   * @description 根模块初始化函数
   * @return {void}
   */
  const init = () => {
    // 启动TabPage组件
    TabPage(app).init();
  };

  // 根模块初始化
  init();

})(document);