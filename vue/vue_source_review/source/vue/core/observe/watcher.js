import { pushTarget, popTarget } from './dep';
import { queueWatcher } from './scheduler';

let uid = 0;

class Watcher {
  constructor (vm, expOrFn, cb, options) {
    this.id = ++uid;
    this.vm = vm;
    this.cb = cb;
    this.deps = [];
    this.depsId = new Set();

    if (options) {

    }

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    }

    this.get();
  }

  get () {
    pushTarget(this);
    this.getter();
    popTarget(this);
  }

  update () {
    // 单次更新
    // this.get();
    // 批量更新
    queueWatcher(this);
  }

  run () {
    this.get();
  }

  // watcher 和 dep 互相依赖
  addDep (dep) {
    const id = dep.id;

    if (!this.depsId.has(id)) {
      // 把 dep 存入到 watcher 中
      this.depsId.add(id);
      this.deps.push(dep);
      // 把 watcher 存入到 dep 中
      dep.addSub(this);
    }
  }
 }

export default Watcher;