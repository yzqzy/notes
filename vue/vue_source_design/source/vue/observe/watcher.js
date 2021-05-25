import { pushTarget, popTarget } from './dep';
import { getValue} from '../utils';
 
let id = 0;

class Watcher {
  /**
   * @constructor 构造器
   * @param {object} vm - vue实例 
   * @param {string | function} exp - 表达式或者函数
   * @param {function} cb - 回调函数（可选）
   * @param {object} options - 配置项
   * @param {number} id - watcher id 
   */
  constructor (vm, exp, cb = () => {}, options = {}) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.options = options;
    this.deps = [];
    this.depsId = new Set();
    this.id = id++;

    // watch 
    if (options.user) {
      this.user = true;
    }
    // computed
    this.lazy = options.lazy;
    this.dirty = this.lazy;

    if (typeof exp === 'function') {
      this.getter = exp;
    } else {
      this.getter = function () {
        return getValue(exp, vm);
      }
    }
    
    this.value = this.lazy ? undefined : this.get();
  }

  get () {
    // 入栈 Dep.target = watcher
    pushTarget(this); 
    // 渲染页面
    let value = this.getter.call(this.vm);
    // 出栈 指向前一个watcher
    popTarget(); 
    return value;
  }

  /**
   * @description computed 取值
   */
  evaluate () {
    this.value = this.get();
    this.dirty = false;
  }

  /**
   * @description 更新
   * @return {void}
   */
  update () {
    if (this.lazy) {
      // 计算属性watcher，重新取值
      this.dirty = true;
    } else {
      // this.get(); // 立即更新 -> 更新队列处理
      queryWatcher(this);
    }
  }

  /**
   * @description 立即更新视图
   * @return {void}
   */
  run () {
    let value = this.get();

    if (this.value != value) {
      this.cb(value, this.value);
    }
  }

  /**
   * @description computed属性更新
   *  将渲染watcher添加到计算属性中的deps
   *  用于计算属性watcher出栈后的数据更新操作
   */
  depend () {
    let i = this.deps.length;

    while (i--) {
      this.deps[i].depend();
    }
  }

  /**
   * @description
   *  用于处理订阅事件重复问题
   *  wacther和dep互相依赖
   * @param {object} dep - 发布订阅类
   * @return {void}
   */
  addDep (dep) {
    let id = dep.id;

    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      // dep存入到watcher中
      this.deps.push(dep);
      // watcher存入到dep中
      dep.addSub(this);
    }
  }
}

let has  = {},
    queue = [];

/**
 * @description 保存所有的更新，更新完毕后，执行所有的watcher
 * @return {void}
 */
function flushQueue () {
  queue.forEach(watcher => watcher.run());
  has = {};
  queue = [];
}

/**
 * @description 异步批量更新策略
 * @param {object} watcher 
 * @return {void}
 */
function queryWatcher (watcher) {
  let id = watcher.id;
  
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);

    // 延迟清空队列
    // setTimeout(flushQueue, 0);
    nextTick(flushQueue);
  }
}

let callbacks = [];

/**
 * @description 刷新callback数组
 * @return {void}
 */
function flushCallbacks () {
  callbacks.forEach(cb => cb());
}

/**
 * @description 执行异步函数
 * @param {function} cb - 回调函数
 * @return {void}
 */
function nextTick (cb) {
  callbacks.push(cb);

  let timerFunction = () => {
    flushCallbacks();
  }

  if (Promise) {
    return Promise.resolve().then(timerFunction);
  }

  if (MutationObserver) {
    // html5中的API
    let observe = new MutationObserver(timerFunction);
    let textNode = document.createElement(10);
    observe.observe(textNode, { characterData: true });
    textNode.textContent = 20;
    return;
  }

  if (setImmediate) {
    // 性能比setTimeout好，老版本不支持
    return setImmediate(timerFunction);
  }

  // 必选项
  setTimeout(timerFunction);
}

// 用户使用的nextTick
// 需要保证页面更新之后再访问页面元素
// Vue.nextTick(() => {

// });

export default Watcher;