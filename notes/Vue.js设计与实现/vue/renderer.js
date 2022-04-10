
function createRenderer (options) {
  const { createElement, insert, setElementText } = options;

  function mountElement (vnode, container) {
    // 调用 createElement 创建 DOM 元素
    const el = createElement(vnode.type);
    // 处理子节点，如果子节点是字符串，代表元素具有文本节点
    if (typeof vnode.children === 'string') {
      // 调用 setElementText 设置元素的文本节点
      setElementText(el, vnode.children)
    }
    // 调用 insert 函数将元素插入到容器内
    insert(el, container);
  }

  function patch (n1, n2, container) {
    if (!n1) {
      // 如果 n1 不存在，意味着挂载，则调用 mountElement 函数完成挂载
      mountElement(n2, container);
    } else {
      // n1 存在，意外着打补丁 TODO
    }
  }

  function render (vnode, container) {
    if (vnode) {
      // 新 node 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 旧 vnode 存在且新 vnode 不存在，说明是卸载（unmount）操作
        // 只需要将 container 内的 DOM 清空即可
        container.innerHTML = '';
      }
    }
    // 把 vnode 存在到 container._vnode 下，这里就是后续渲染中的旧 vnode
    container._vnode = vnode;
  }


  function hydrate (vnode, container) { }

  return {
    render,
    hydrate
  };
}
