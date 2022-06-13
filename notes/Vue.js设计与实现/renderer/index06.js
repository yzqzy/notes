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

    // 判断是否可以复用
    for (let i = 0; i < newChildren.length; i++) {
      const newVnode = newChildren[i]
      for (let j = 0; j < oldChildren.length; j++) {
        const oldVnode = oldChildren[j]
        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVnode.key === oldVnode.key) {
          patchChildren(oldVnode, newVnode, container)
          break;
        }
      }
    }

    // const commonLength = Math.min(oldLen, newLen)

    // for (let i = 0; i < commonLength; i++) {
    //   patch(oldChildren[i], newChildren[i])
    // }

    // if (newLen > oldLen) {
    //   for (let i = commonLength; i < newLen; i++) {
    //     patch(null, newChildren[i], container)
    //   }
    // } else {
    //   for (let i = commonLength; i < oldLen; i++) {
    //     unmount(oldChildren[i])
    //   }
    // }
  } else {
    // ...
  }
}