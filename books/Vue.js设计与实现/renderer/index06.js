// const oldVNode = {
//   type: 'div',
//   children: [
//     { type: 'p', children: '1' },
//     { type: 'p', children: '2' },
//     { type: 'p', children: '3' }
//   ]
// }
// const newVNode = {
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


// const oldVNode = { type: 'p', key: 1, children: 'text 1' }
// const newVNode = { type: 'p', key: 1, children: 'text 2' }


const oldVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: 'hello', key: 3 }
  ]
}

const newVNode = {
  type: 'div',
  children: [
    { type: 'p', children: 'world', key: 3 },
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
  ]
}

renderer.renderer(oldVNode, document.querySelector('#app'))
setTimeout(() => {
  renderer.renderer(newVNode, document.querySelector('#app'))
}, 1000)


function patch (n1, n2, container, anchor) {
  // ...
  if (typeof type === 'string') {
    if (!n1) {
      // 挂载时将锚点元素作为第三个参数传递给 mountElement 函数
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2)
    }
  } else if (type === Text) {
    // ...
  } else if (type === Fragment) {
    // ...
  }
}

function mountElement (vnode, container, anchor) {
  // ...

  // 插入节点时，将锚点元素透传给 insert 函数
  insert(el, container, anchor)
}

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
      const newVNode = newChildren[i]
      let j = 0;

      // 第一层循环中定义变量 find，代表是否在旧的一组子节点中找到可复用的节点，
      // 初始值为 false，代表没找到
      let find = false

      for (j; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]

        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
          // 找到可复用的节点，将变量 find 的值设置为 true
          find = true

          patch(oldVNode, newVNode, container)

          if (j < lastIndex) {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
            // 说明该节点对应的真实 DOM 需要移动
            // 获取 newVNode 的前一个 vnode，即 prevVNode
            const prevVNode = newChildren[i - 1]
            // 如果 prevVnode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            if (prevVNode) {
              // 由于我们要将 newVNode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面
              // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
              const anchor = prevVNode.el.nextSibling
              // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面
              // 也就是 prevVNode 对应的真实 DOM 后面
              insert(newVNode.el, container, anchor)
            }
          } else {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值
            // 则更新 lastIndex 的值
            lastIndex = j
          }
          break;
        }
      }

      // 如果代码运行到这里，find 仍然是 false
      // 说明当前 newVNode 没有在旧的一组子节点中找到可复用的节点
      // 也就是说，当前 newVNode 是新增节点，需要挂载
      if (!find) {
        // 为了将节点挂载到正确位置，我们需要先获取锚点元素
        // 首先获取当前 newVNode 的前一个 vnode 节点
        const parentVNode = newChildren[i - 1]
        
        let anchor = null

        if (prevVNode) {
          // 如果存在前一个 vnode 节点，则使用它的下一个兄弟节点作为锚点元素
          anchor = prevVNode.el.nextSibling
        } else {
          // 如果没有前一个 vnode 节点，说明即将挂载的新节点是第一个子节点
          // 这时我们使用容器元素的 fristChild 作为锚点
          anchor = container.firstChild
        }

        // 挂载 newVNode
        patch(null, newVNode, container, anchor)
      }
    }

    // 上一步得更新操作完成后
    // 遍历旧的一组子节点
    for (let i = 0; i < oldChildren.length; i++) {
      const oldVNode = oldChildren[i]
      // 拿旧子节点 oldVNode 去新的一组子节点中寻找具有相同 key 值得节点
      const has = newChildren.find(vnode => vnode.key === oldVNode.key)
      if (!has) {
        // 如果没有找到具有相同 key 值得节点，则说明需要删除该节点
        // 调用 unmount 函数将其卸载
        unmount(oldVNode)
      }
    }
  } else {
    // ...
  }
}