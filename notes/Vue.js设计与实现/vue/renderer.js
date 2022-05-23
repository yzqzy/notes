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
    if (!n1) {
      mountElement(n2, container);
    } else {
    }
  }

  function render (vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 根据 vnode 获取要卸载的真实 DOM 元素
        const el = container._vnode.el;
        // 获取 el 的父元素
        const parent = el.parentNode;
        // 调用 removeChild 移除元素
        if (parent) parent.removeChild(el);
        container.innerHTML = '';
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
