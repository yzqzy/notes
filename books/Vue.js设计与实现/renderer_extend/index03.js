function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    if (!n1) {
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2)
    }
  } else if (type === Text) {
    // 如果新的 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
    if (!n1) {
      // 如果没有旧节点，进行挂载
      // 使用 createTextMode 创建文本节点
      const el = n2.el = createText(n2.children)
      // 将文本节点插入到容器中
      insert(el, container)
    } else {
      // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
      const el = n2.el = n1.el
      if (n2.children !== n1.children) {
        setText(el, n2.children)
      }
    }
  } else if (type === Fragment) {
    // 处理 Fragment 类型的 vnode
    if (!n1) {
      // 如果旧 vnode 不存在，则只需要将 Fragment 的 children 逐个挂载即可
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 如果旧 vnode 存在，则只需要更新 Fragment 的 children 即可
      patchChildren(n1, n2, container)
    }
  }
}

function unmount(vnode) {
  // 卸载时，如果卸载的 vnode 类型为 Fragment，则需要卸载其 children
  if (vnode.type === Fragment) {
    vnode.children.forEach(c => unmount(c))
    return
  }
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}
