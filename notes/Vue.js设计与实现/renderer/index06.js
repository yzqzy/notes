// const oldVnode = {
//   type: 'div',
//   children: [
//     { type: 'p', children: '1' },
//     { type: 'p', children: '2' },
//     { type: 'p', children: '3' }
//   ]
// }
// const newVnode = {
//   type: 'div',
//   children: [
//     { type: 'p', children: '4' },
//     { type: 'p', children: '5' },
//     { type: 'p', children: '6' }
//   ]
// }


// [
//   { type: 'p', children: '1' },
//   { type: 'div', children: '2' },
//   { type: 'span', children: '3' }
// ]
// [
//   { type: 'span', children: '3' },
//   { type: 'p': children: '1' },
//   { type: 'div', children: '2' }
// ]


// const oldVnode = { type: 'p', key: 1, children: 'text 1' }
// const newVnode = { type: 'p', key: 1, children: 'text 2' }


const oldVnode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: 'hello', key: 3 }
  ]
}

const newVnode = {
  type: 'div',
  children: [
    { type: 'p', children: 'world', key: 3 },
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
  ]
}

renderer.renderer(oldVnode, document.querySelector('#app'))
setTimeout(() => {
  renderer.renderer(newVnode, document.querySelector('#app'))
}, 1000)



function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children

    const oldLen = oldChildren.length
    const newLen = newChildren.length

    // 存储寻找过程中遇到的最大索引值
    let lastIndex = 0

    for (let i = 0; i < newChildren.length; i++) {
      const newVnode = newChildren[i]
      let j = 0;
      for (j; j < oldChildren.length; j++) {
        const oldVnode = oldChildren[j]

        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVnode.key === oldVnode.key) {
          patch(oldVnode, newVnode, container)

          if (j < lastIndex) {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
            // 说明该节点对应的真实 DOM 需要移动
            // 获取 newVNode 的前一个 vnode，即 prevVNode
            const prevVNode = newChildren[i - 1]
            // 如果 prevVnode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            if (prevVNode) {
              // 由于我们要将 newVnode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面
              // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
              const anchor = prevVNode.el.nextSibling
              // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面
              // 也就是 prevVNode 对应的真实 DOM 后面
              insert(newVnode.el, container, anchor)
            }
          } else {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值
            // 则更新 lastIndex 的值
            lastIndex = j
          }
          break;
        }
      }
    }
  } else {
    // ...
  }
}