function shouldSetAsProps(el, key, value) {
  if (key === 'form' && el.tagName === 'INPUT') return false
  return key in el
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(el, text) {
    el.nodeValue = text
  },
  patchProps(el, key, prevValue, nextValue) {
    if (/^on/.test(key)) {
      const invokers = el._vei || (el._vei = {})
      let invoker = invokers[key]
      const name = key.slice(2).toLowerCase()
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] = (e) => {
            console.log(e.timeStamp)
            console.log(invoker.attached)
            if (e.timeStamp < invoker.attached) return
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach(fn => fn(e))
            } else {
              invoker.value(e)
            }
          }
          invoker.value = nextValue
          invoker.attached = performance.now()
          el.addEventListener(name, invoker)
        } else {
          invoker.value = nextValue
        }
      } else if (invoker) {
        el.removeEventListener(name, invoker)
      }
    } else if (key === 'class') {
      el.className = nextValue || ''
    } else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key]
      if (type === 'boolean' && nextValue === '') {
        el[key] = true
      } else {
        el[key] = nextValue
      }
    } else {
      el.setAttribute(key, nextValue)
    }
  }
})

// diff 问题案例
// 单纯算法比较是没问题的，有问题的是第一次 diff 的时候，key 为 3 的节点的真实 DOM 已经移动到顶部，
// 然后最后新增 key 为 4 的节点时，取的是 oStartVNode 作为锚点，这时 oStartVNode 指向的就是 key 为 3 的节点。所以就插入到顶部了。
// vue2 会判断新增节点的下一个节点，如果下一个节点的真实 DOM 为空，那么就会父级追加节点。否则就会插入到下一个节点的前面。总之最后一个节点都是空。并不是执行 patch 逻辑。
const vnode1 = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: 'hello', key: 3 }
  ]
}
renderer.render(vnode1, document.querySelector('#app'))
const vnode2 = {
  type: 'div',
  children: [
    { type: 'p', children: 'world', key: 3 },
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: '4', key: 4 },
  ]
}

setTimeout(() => {
  renderer.render(vnode2, document.querySelector('#app'))
}, 400);