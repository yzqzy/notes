let uid = 0;

export default class Dep {
  constructor () {
    this.id = uid++;
    this.subs = [];
  }

  addSub (watcher) {
    this.subs.push(watcher);
  }

  notify () {
    this.subs.forEach(watcher => watcher.update());
  }

  // depend 方法会把 watcher 存到 dep 中，会把 dep 存入到 watcher 中。
  // 对比对的关系。
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
};

let targetStack = [];

export function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}