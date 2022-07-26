const { effect, ref } = VueReactivity

const bol = ref(false)

effect(() => {
  // 创建 vnode
  const vnode = {
    type: 'div',
    props: bol.value ? {
      onClick: () => {
        alert('父元素 clicked')
      }
    } : {},
    children: [
      {
        type: 'p',
        props: {
          onClick: () => {
            bol.value = true
          }
        },
        children: 'text'
      }
    ]
  }

  // 渲染 vnode
  renderer.render(vnode, document.querySelector('#app'))
})


patchProps(el, key, prevValue, nextValue) {
  if (/^on/.test(key)) {
    const invokers = el._vei || (el._vei = {})
    let invoker = invokers[key]
    const name = key.slice(2).toLowerCase()
    if (nextValue) {
      if (!invoker) {
        invoker = el._vei[key] = (e) => {
          // e.timeStamp 是事件发生的时间
          // 如果事件发生的时间早于事件处理函数绑定的事件，则不执行事件处理函数
          if (e.timeStamp < invoker.attached) return
          if (Array.isArray(invoker.value)) {
            invoker.value.forEach(fn => fn(e))
          } else {
            invoker.value(e)
          }
        }
        invoker.value = nextValue
        // 添加 invoker.attached 属性，存储事件处理函数被绑定的时间
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

function mountElement(vnode, container, anchor) {
  const el = vnode.el = createElement(vnode.type)

  // 挂载子节点，首先判断 children 的类型
  if (typeof vnode.children === 'string') {
    // 如果是字符串类型，说明是文本子节点
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    // 如果是数字，说明是多个子节点
    vnode.children.forEach(child => {
      patch(null, child, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key])
    }
  }

  insert(el, container, anchor)
}


function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props
  
  // 第一步：更新 props
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patchProps(el, key, oldProps[key], newProps[key])
    }
  }
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patchProps(el, key, oldProps[key], null)
    }
  }

  // 第二步：更新 children
  patchChildren(n1, n2, el)
}

function patchChildren(n1, n2, container) {
  // 判断新子节点的类型是否是文本节点
  if (typeof n2.children === 'string') {
    // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
    // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况什么都不需要做
    if (Array.isArray(n1.children)) {
      n1.children.forEach((c) => unmount(c))
    }
    // 最后将新的文本子节点内容设置给父元素容器
    setElementText(container, n2.children)
  } else if (Array.isArray(n2.children)) {
    // 说明新子节点是一组子节点

    // 判断旧子节点是否也是一组子节点
    if (Array.isArray(n1.children)) {
      // 代码运行到这里，说明新旧子节点都是一组子节点，这里涉及核心的 diff 算法

      // 临时处理：
      // 1. 将旧的一组子节点全部卸载
      n1.children.forEach(c => unmount(c))
      // 2. 再将新的一组子节点全部挂载到容器中
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 此时：
      // 旧子节点要么是文本子节点，要么不存在
      // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂载
      setElementText(container, '')
      n2.children.forEach(c => patch(null, c, container))
    }
  } else {
    // 代码运行到这里，说明新子节点不存在
    if (Array.isArray(n1.children)) {
      // 旧子节点是一组子节点，只需逐个卸载即可
      n1.children.forEach(c => unmount(c))
    } else if (typeof n1.children === 'string') {
      // 旧子节点是文本子节点，直接清空
      setElementText(container, '')
    }
    // 如果没有旧子节点，那么什么都不需要做
  }
}
