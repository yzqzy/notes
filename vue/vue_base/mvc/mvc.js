(function () {

  function init () {
    model.init(); // 组织数据，数据监听/数据代理
    view.render(); // 组织 HTML 模板，渲染 HTML 模板
    controller.init(); // 事件处理函数定义，事件处理函数绑定
  }

  var model = {
    data: {
      a: 0,
      b: 0,
      s: '+',
      r: 0
    },
    init: function () {
      var _this = this;

      for (var k in _this.data) {
        (function (k) {
          Object.defineProperty(_this, k, {
            get: function () {
              return _this.data[k];
            },
            set: function (newVal) {
              _this.data[k] = newVal;

              view.render()
            }
          })
        })(k);
      }
    }
  }

  var view = {
    el: '#app',
    template: `
      <p>
        <span class="cal-a">{{ a }}</span>
        <span class="cal-s">{{ s }}</span>
        <span class="cal-b">{{ b }}</span>
        <span>=</span>
        <span class="cal-r">{{ r }}</span>
      </p>
      <p>
        <input type="text" placeholder="Number a" class="cal-input a" />
        <input type="text" placeholder="Number b" class="cal-input b" />
      </p>
      <p>
        <button class="cal-btn">+</button>
        <button class="cal-btn">-</button>
        <button class="cal-btn">*</button>
        <button class="cal-btn">/</button>
      </p>
    `,
    render: function (mutedData) {
      if (!mutedData) {
        this.template = this.template.replace(
          /\{\{(.*?)\}\}/g,
          function (node, key) {
            console.log(node, key);
          }
        )
      }
    }
  }

  var controller = {
    init: function () {

    }
  }

  init();

})();