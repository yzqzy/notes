function reactive (vm, __get__, __set__) {
  const _data = vm.$data;

  for (let key in _data) {
    Object.defineProperty(vm, key, {
      get () {
        __get__(key, _data[key]);
        return _data[key];
      },
      set (newVal) {
        const oldVal = _data[key];
        _data[key] = newVal;
        __set__(key, newVal, oldVal)
      }
    })
  }
}

class Computed {
  constructor () {
    this.computedData = [];
  }

  addComputed (vm, computed, key) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key);
    const descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value;
    const value = descriptorFn.call(vm);
    const get = descriptorFn.bind(vm);
    const dep = this._collectDep(descriptorFn);
    
    this._addComputedProp({
      key,
      value,
      get,
      dep
    });

    const dataItem = this.computedData.find(item => item.key === key);

    Object.defineProperty(vm, key, {
      get () {
        return dataItem.value;
      },
      set () {
        dataItem.value = dataItem.get();
      }
    })
  }

  update (key, invokeWatch) {
    this.computedData.map(item => {
      const dep = item.dep;
      const hasKey = dep.includes(key);

      if (hasKey) {
        const oldVal = item.value;
        item.value = item.get();
        invokeWatch(item.key, item.value, oldVal);
      }
    });
  }

  _addComputedProp (computedProp) {
    this.computedData.push(computedProp);
  }

  _collectDep (fn) {
    const matched = fn.toString().match(/this\.(.+?)/g);
    return matched.map(item => item.split('.')[1]);
  }
}

class Watcher {
  constructor () {
    this.watchers = [];
  }

  addWatcher (vm, watcher, key) {
    this._addWatchProp({
      key,
      fn: watcher[key].bind(vm)
    });


  }

  invoke (key, newVal, oldVal) {
    this.watchers.map(item => {
      if (item.key === key) {
        item.fn(newVal, oldVal);
      }
    })
  }

  _addWatchProp (watch) {
    this.watchers.push(watch);
  }
}

class Vue {
  constructor (options) {
    const { data, computed, watch } = options;

    this.$data = data();

    this.init(this, computed, watch);
  }

  init (vm, computed, watch) {
    this.initData(vm);

    const computedIns = this.initComputed(vm, computed);
    const watcherIns = this.initWatcher(vm, watch);

    this.$updateComputed = computedIns.update.bind(computedIns);
    this.$invokeWatcher = watcherIns.invoke.bind(watcherIns);
  }

  initData (vm) {
    reactive(vm, (key, val) => {
      // console.log(key, val);
    }, (key, newVal, oldVal) => {
      // console.log(key, newVal, oldVal);
      if (newVal === oldVal) return;

      this.$updateComputed(key, this.$invokeWatcher);
      this.$invokeWatcher(key, newVal, oldVal);
    });
  }

  initComputed (vm, computed) {
    const computedIns = new Computed();

    for (let k in computed) {
      computedIns.addComputed(vm, computed, k);
    }

    return computedIns;
  }

  initWatcher (vm, watch) {
    const watcherIns = new Watcher();

    for (let k in watch) {
      watcherIns.addWatcher(vm, watch, k);
    }

    return watcherIns;
  }
}

const vm = new Vue({
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    total () {
      console.log('compoted');
      return this.a + this.b;
    }
  },
  watch: {
    total (newVal, oldVal) {
      console.log('total', newVal, oldVal);
    },
    a (newVal, oldVal) {
      console.log('a', newVal, oldVal);
    }, 
    b (newVal, oldVal) {
      console.log('b', newVal, oldVal);
    },
  }
});

console.log(vm);
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.a = 100;

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.b = 200;

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);