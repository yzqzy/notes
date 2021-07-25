var Vue = (function () {
  /**
   * total: {
   *  value：函数执行返回的结果
   *  get：get
   *  dep：['a', 'b']
   * }
   */
  var computedData = {};
  var reg_var = /\{\{(.+?)\}\}/g;

  var dataPool = {};

  var Vue = function (options) {
    this.$el = document.querySelector(options.el);
    this.$data = options.data();

    this._init(this, options.computed, options.template);
  }

  Vue.prototype._init = function (vm, computed, template) {
    dataReactive(vm);
    computedReactive(vm, computed)
    render(vm, template);
  }

  function render (vm, template) {
    var container = document.createElement('div');
    var _el = vm.$el;

    container.innerHTML = template;

    var domTree = _compileTemplate(vm, container);

    _el.appendChild(domTree);
  }

  function update (vm, key) {
    dataPool[key].textContent = vm[key];
  }

  function _compileTemplate (vm, container) {
    var allNodes = container.getElementsByTagName('*');
    var nodeItem = null;

    for (var i = 0; i < allNodes.length; i++) {
      nodeItem = allNodes[i];

      var matched = nodeItem.textContent.match(reg_var);

      if (matched) {
        nodeItem.textContent = nodeItem.textContent.replace(reg_var, function (node, key) {
          dataPool[key.trim()] = nodeItem;
          return vm[key.trim()];
        });
      }
    }

    return container;
  }

  function dataReactive (vm) {
    var _data = vm.$data;

    for (var key in _data) {
      (function (k) {
        Object.defineProperty(vm, k, {
          get: function () {
            return _data[k];
          },
          set: function (newVal) {
            _data[k] = newVal;

            update(vm, k);
            _updateComputedData(vm, k, function (key) {
              update(vm, key);
            })
          }
        })
      })(key);
    }
  }

  function computedReactive (vm, computed) {
    _initComputedData(vm, computed);

    for (var key in computedData) {
      (function (k) {
        Object.defineProperty(vm, k, {
          get () {
            return computedData[k].value;
          },
          set (newVal) {
            computedData[k].value = newVal;
          }
        })
      })(key);
    }
  }

  function _initComputedData (vm, computed) {
    for (var key in computed) {
      var descriptor = Object.getOwnPropertyDescriptor(computed, key);
      var descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value;

      computedData[key] = {
        value: descriptorFn.call(vm),
        get: descriptorFn.bind(vm),
        dep: _collectDep(descriptorFn)
      };
    }
  }

  function _collectDep (fn) {
    var _collection = fn.toString().match(/this.(.+?)/g);

    if (_collection.length > 0) {
      for (var i = 0; i < _collection.length; i++) {
        _collection[i] = _collection[i].split('.')[1];
      }
    }

    return _collection;
  }

  function _updateComputedData (vm, key, update) {
    var _dep = null;

    for (var _key in computedData) {
      _dep = computedData[_key].dep;

      for (var i = 0; i < _dep.length; i++) {
        if (_dep[i] === key) {
          vm[_key] = computedData[_key].get();
          update(_key);
        }
      }
    }
  }

  return Vue;
})();

var vm = new Vue({
  el: '#app',
  template: `
    <span>{{ a }}</span>
    <span>+</span>
    <span>{{ b }}</span>
    <span>=</span>
    <span>{{ total }}</span>
  `,
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    total () {
      console.log('computed total');
      return this.a + this.b;
    }
  }
});

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.a = 100;

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);