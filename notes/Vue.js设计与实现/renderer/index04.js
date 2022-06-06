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
  // patchProps (el, key, preValue, nextValue) {
  //   if (/^on/.test(key)) {
  //     // 根据属性名称得到对应的事件名称
  //     const name = key.slice(2).toLowerCase();
  //     // 移除上一次绑定的事件处理函数
  //     preValue && el.removeEventListener(name, preValue);
  //     // 绑定事件，nextValue 为事件处理函数
  //     el.addEventListener(name, nextValue);
  //   } else if (key === 'class') {
  //     el.className = nextValue || '';
  //   } else if (sholdSetAsProps(el, key, nextValue)) {
  //     const type = typeof el[key];
  //     if (type === 'boolean' && nextValue === '') {
  //       el[key] = true;
  //     } else {
  //       el[key] = nextValue;
  //     }
  //   } else {
  //     el.setAttribute(key, nextValue);
  //   }
  // }
  patchProps (el, key, preValue, nextValue) {
    if (/^on/.test(key)) {
      // 获取为该元素伪造的事件处理函数 invoker
      const invoker = el._vei;
      const name = key.slice(2).toLowerCase();

      if (nextValue) {
        if (!invoker) {
          // 如果没有 invoker，则将一个伪造的 invoker 缓存到 el._vei 中
          // vei 是 vue event invoker 的首字母缩写
          invoker = el._vei = (e) => {
            // 当伪造的事件处理函数执行时，会执行真正的事件处理函数
            invoker.value(e);
          }
          // 将真正的事件处理函数赋值给 invoker.value
          invoker.value = nextValue;
          // 绑定 invoker 作为事件处理函数
          el.addEventListener(name, invoker);
        } else {
          // 如果 invoker 存在，意味着更新，只需要更新 invoker.value 的值即可
          invoker.value = nextValue;
        }
      } else if (invoker) {
        // 新事件绑定函数不存在，且之前绑定的 invoker 存在，移除绑定
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