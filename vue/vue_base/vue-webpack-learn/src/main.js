function isObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function reactive (target, key) {

}

class Vue {
  constructor (options) {
    const { el, data, template } = options;

    this.$data = data();
    this.$el = document.querySelector(el);

    this.init(this, template);
  }

  init (vm, template) {
    this.render(vm, template);
  }
  
  render (vm, template) {
    const container = document.createElement('div');

    container.innerHTML = template;

    this.compileAttrs(vm, container);

    // this.$el.appendChild(container);
  }

  initData (vm) {
    const _data = vm.$data;

    if(isObject(_data)) {
      reactive(vm, _data);
    }
  }

  compileAttrs (vm, container) {

  }

  render (vm, ) {

  }
}

const vm = new Vue({
  el: '#pp',
  data () {
    return {
      isShow: true,
      hasError: true,
      titleStyle: {
        color: '#fff',
        fontSize: '20px'
      },
      titleShow: true,
      subTitleColor: 'orange'
    }
  },
  template: `
    <div
      :class="[
        'box',
        isShow ? 'show' : '',
        hasError ? 'danger' : ''
      ]"
    >
      <h1
        :style="[
          titleStyle,
          {
            display: titleShow ? 'block' : 'none'
          }
        ]"
      >
        This is title
      </h1>
      <h2
        :style="{
          display: titleShow ? 'block' : 'none',
          color: subTitleColor
        }"
      >
        This is sub_title
      </h2>
      <p
        :class="{
          danger: hasError
        }"
      >
        This is content
      </p>
    </div>
  `
});

vm.hasError = true;
vm.subTitleColor = 'purple';