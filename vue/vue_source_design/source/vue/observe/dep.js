let id = 0;

class Dep {
  constructor () {
    this.id = id++;
    this.subs = [];
  }

  /**
   * @description 订阅
   * @param {object} watcher 
   * @return {void}
   */
  addSub (watcher) {
    this.subs.push(watcher);
  }

  /**
   * @description 发布
   * @return {void}
   */
  notify () {
    this.subs.forEach(watcher => watcher.update());
  }

  /**
   * @description 
   *  将watcher保存到dep中
   *  将dep保存到watcher中
   *  多对多的关系
   * @return {void}
   */
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

let stack = [];

export function pushTarget (watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget () {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;