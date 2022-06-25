const vnode = {
  type: 'button',
  props: {
    disabled: ''
  }
}
const container = { type: 'root' };

function sholdSetAsProps (el, key, value) {
  if (key === 'form' && el.tagName === 'INPUT') return false
  return key in el;
}

const renderer = createRenderer({
  createElement (tag) {
    console.log(`创建元素 ${ tag }`);

    const elem = { tag };

    elem.setAttribute = (key, value) => {
      console.log(tag, key, value);
    };

    return elem;
  },
  setElementText (el, text) {
    console.log(`设置 ${ JSON.stringify(el) } 的文本内容：${ text }`);
    el.text = text;
  },
  insert (el, parent, anchor = null) {
    console.log(`将 ${ JSON.stringify(el) } 添加到 ${ JSON.stringify(parent) } 下`);
    parent.children = el;
  },
  patchProps (el, key, preValue, nextValue) {
    if (/^on/.test(key)) {
      // 定义 el._vei，存储事件名称到事件处理函数的映射
      const invokers = el._vei || (el._vei = {});
      const name = key.slice(2).toLowerCase();

      // 根据事件名称获取 invoker
      let invoker = in][key];

      if (nextValue) {
        if (!invoker) {
          // 将事件处理函数缓存到 el._vei[key] 下，避免覆盖
          invoker = el._vei[key] = (e) => {
            if (Array.isArray(invoker.value)) {
              // invoker.value 是数组，遍历并逐个调用事件处理函数
              invoker.value.forEach(fn => fn(e))
            } else {
              // 直接作为函数调用
              invoker.value(e);
            }
          }
          invoker.value = nextValue;
          el.addEventListener(name, invoker);
        } else {
          invoker.value = nextValue;
        }
      } else if (invoker) {
        el.removeEventListener(name, invoker);   
      }
    } else if (key === 'class') {
      el.className = nextValue || '';
    } else if (sholdSetAsProps(el, key, nextValue)) {
      const type = typeof el[key];
      if (type === 'boolean' && nextValue === '') {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      el.setAttribute(key, nextValue);
    }
  }
});

renderer.render(vnode, container);