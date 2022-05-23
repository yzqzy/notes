function createRenderer (options) {
  const { createElement, insert, setElementText, patchProps } = options;

  function mountElement (vnode, container) {
    // 让 vnode.el 引用真实 DOM 元素
    const el = vnode.el = createElement(vnode.type);

    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => patch(null, child, el))
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key]);
      }
    }

    insert(el, container);
  }

  function patch (n1, n2, container) {
    // 如果 n1 存在，对比 n1 和 n2 类型
    if (n1 && n1.type !== n2.type) {
      // 如果新旧 vnode 的类型不同，直接将旧 vnode 卸载
      unmount(n1);
      n1 = null;
    }

    // n1 和 n2 所描述的内容相同
    const { type } = n2;

    if (typeof type === 'string') {
      if (!n1) {
        mountElement(n2, container);
      } else {
        patchElement(n1, n2);
      }
    } else if (typeof type === 'object') {
      // 如果 n2.type 值的类型是对象，则描述的是组件
    } else if (type === 'xxx') {
      // 处理其他类型的 vnode
    }
  }

  function unmount (vnode) {
    const parent = vnode.el.parentNode;
    if (parent) {
      parent.removeChild(vnode.el);
    }
  }

  function render (vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 调用 unmount 函数卸载 vnode
        unmount(container._vnode);
      }
    }
    container._vnode = vnode;
  }

  function hydrate (vnode, container) { }

  return {
    render,
    hydrate
  };
}
