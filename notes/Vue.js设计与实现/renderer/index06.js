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


const oldVnode = { type: 'p', key: 1, children: 'text 1' }
const newVnode = { type: 'p', key: 1, children: 'text 2' }


function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children
    
    const oldLen = oldChildren.length
    const newLen = newChildren.length

    const commonLength = Math.min(oldLen, newLen)

    for (let i = 0; i < commonLength; i++) {
      patch(oldChildren[i], newChildren[i])
    }

    if (newLen > oldLen) {
      for (let i = commonLength; i < newLen; i++) {
        patch(null, newChildren[i], container)
      }
    } else {
      for (let i = commonLength; i < oldLen; i++) {
        unmount(oldChildren[i])
      }
    }
  } else {
    // ...
  }
}