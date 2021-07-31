const REG_SPACE = /\s+/g;
const REG_OBJ = /^\{(.+?)\}$/;
const REG_ARR = /^\[(.+?)\]$/;
const REG_UPPERCASE = /([A-Z])/g;

import './main.scss';

function isObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function transformToKebab (k) {
  return k.replace(REG_UPPERCASE, '-$1').toLowerCase();
}

function attrUpdate (vm, key) {
  const _stylePool = vm.$stylePool;

  for (let [ k, v ] of _stylePool) {
    if (v.expression.indexOf(key) != -1) {
      compileAttr(vm, k, v.type, v.expression);
    }
  }
}

function reactive (vm, target) {
  for (let key in target) {
    Object.defineProperty(vm, key, {
      get () {
        return target[key];
      },
      set (newVal) {
        if (target[key] === newVal) return;

        target[key] = newVal;

        attrUpdate(vm, key);
      }
    })
  }
}

function renderArr (vm, value) {
  const _arr = (new Function (
    'vm',
    `with (vm) {
      return ${value};
    }`
  ))(vm);

  return _arr.filter(item => item)
}

function renderObj (vm, value) {
  return (new Function(
    'vm',
    `with (vm) {
      return ${value};
    }`
  ))(vm);
}

function compileAttr (vm, el, name, value) {
  value = value.replace(REG_SPACE, '');
  name = name.replace(':', '');

  vm.$stylePool.set(el, {
    type: name,
    expression: value
  });

  switch (name) {
    case 'class':
      if (REG_OBJ.test(value)) {
        const keyArr = value.match(REG_OBJ)[1].split(',');
        let classStr = '';

        keyArr.forEach(item => {
          const [key, value] = item.split(':');

          if (vm[value.trim()]) {
            classStr += ` ${key.trim()}`;
          }
        });

        el.setAttribute('class', classStr.trim());       
      } else if (REG_ARR.test(value)) {
        const classArr = renderArr(vm, value);

        el.setAttribute('class', classArr.join(' ').trim());
      }
      break;
    case 'style':
      let styleStr = '';

      if (REG_OBJ.test(value)) {
        const styleObj = renderObj(vm, value);

        for (let key in styleObj) {
          styleStr += `${transformToKebab(key)}:${styleObj[key]};`;
        }
      } else if (REG_ARR.test(value)) {
        const styleArr = renderArr(vm, value);

        styleArr.forEach(item => {
          for (let k in item) {
            styleStr += `${transformToKebab(k)}:${item[k]};`
          }
        });
      }

      el.setAttribute('style', styleStr);
      break;
    default:
      break;
  }
}

class Vue {
  constructor (options) {
    const { el, data, template } = options;

    this.$data = data();
    this.$el = document.querySelector(el);
    this.$stylePool = new Map();

    this.init(this, template);
  }

  init (vm, template) {
    this.initData(vm);
    this.render(vm, template);
  }
  
  render (vm, template) {
    const container = document.createElement('div');

    container.innerHTML = template;

    this.compileAttrs(vm, container);

    this.$el.appendChild(container);
  }

  initData (vm) {
    const _data = vm.$data;

    if(isObject(_data)) {
      reactive(vm, _data);
    }
  }

  compileAttrs (vm, container) {
    const allNodes = [...container.getElementsByTagName('*')];

    allNodes.forEach(el => {
      const attrs = [...el.attributes];

      attrs.forEach(attr => {
        const { name, value } = attr;

        compileAttr(vm, el, name, value);
      });

      el.removeAttribute(':class');
      el.removeAttribute(':style');
    })
  }
}

const vm = new Vue({
  el: '#app',
  data () {
    return {
      isShow: true,
      hasError: false,
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

setTimeout(() => {
  vm.hasError = true;
  vm.subTitleColor = 'purple';
}, 2 * 2000);