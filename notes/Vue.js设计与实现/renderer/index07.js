function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    // 封装 patchKeyedChild 函数处理两组子节点
    patchKeyedChildren(n1, n2, container)
  } else {
    // ...
  }
}

function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1

  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较

      // 调用 patch 函数在 oldStartVNode 与 newStartVNode 之间打补丁
      patch(oldStartVNode, newStartVNode, container)
      // 更新索引
      oldStartVNode = oldChildren[++oldStartIdx]
      newStartVNode = newChildren[++newStartIdx]
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较

      // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需要打补丁
      patch(oldEndVNode, newEndVNode, container)
      // 更新索引和头尾部的节点变量
      oldEndVNode = oldChildren[--oldEndIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较

      // 调用 patch 函数在 oldStartVNode 和 newEndVNode 之间打补丁
      patch(oldStartVNode, newEndVNode, container)
      // 将旧的一组子节点的头部节点对应的真实 DOM 节点 oldStartVNode.el 移动到
      // 旧的一组子节点的尾部节点对应的真实 DOM 节点后面
      insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
      // 更新索引
      oldStartVNode = oldChildren[++oldStartIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较

      // 仍然需要调用 patch 函数进行打补丁
      patch(oldEndVNode, newStartVNode, container)
      // 移动 DOM 操作
      // oldEndVNode.el 移动到 oldStartVNode.el 前面
      insert(oldEndVNode.el, container, oldStartVNode.el)
      // 移动 DOM 完成后，更新索引值，并指向下一个位置
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}
