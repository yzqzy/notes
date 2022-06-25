// function patchKeyedChildren (n1, n2, container) {
//   const newChildren = n2.children
//   const oldChildren = n1.children
  
//   // 更新相同的前置节点
//   // 索引 j 指向新旧两组子节点的开头
//   let j = 0
//   let oldVNode = oldChildren[j]
//   let newVNode = newChildren[j]
//   // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
//   while (oldVNode.key === newVNode.key) {
//     // 调用 patch 函数进行更新
//     patch(oldVNode, newVNode, container)
//     // 更新索引 j，让其递增
//     j++
//     oldVNode = oldChildren[j]
//     newVNode = newChildren[j]
//   }

//   // 更新相同的后置节点
//   // 索引 oldEnd 指向旧的一组子节点的最后一个节点
//   let oldEnd = oldChildren.length - 1
//   // 索引 newEnd 指向新的一组子节点的最后一个节点
//   let newEnd = newChildren.length - 1
//   oldVNode = oldChildren[oldEnd]
//   newVNode = newChildren[newEnd]
//   // while 循环从后向前遍历，直到遇到拥有不同的 key 值的节点为止
//   while (oldVNode.key !== newVNode.key) {
//     // 调用 patch 函数进行更新
//     patch(oldVNode, newVNode, container)
//     // 递减 oldEnd 和 newEnd
//     oldEnd--
//     newEnd--
//     oldVNode = oldChildren[oldEnd]
//     newVNode = newChildren[newEnd]
//   }

//   if (j > oldEnd && j <= newEnd) {
//     // 预处理完毕后，如果满足如下条件，则说明 j --> nextEnd 之间的节点应作为新节点插入
//     // 锚点的索引
//     const anchorIndex = newEnd + 1
//     // 锚点元素
//     const anchor = anchorIndex > newChildren.length ? newChildren[anchorIndex].el : null
//     // 采用 while 循环，调用 patch 函数逐个挂载新增节点
//     while (i <= newEnd) {
//       patch(null, newChildren[j++], container, anchor)
//     }
//   } else if (j <= oldEnd) {
//     // j --> oldEnd 之间的节点应该被卸载
//     while (j <= oldEnd) {
//       unmount(oldChildren[j++])
//     }
//   } else {
//     // else 分支处理非理想情况
//     // 新的一组子节点中剩余未处理节点的数量
//     const count = newEnd - j + 1
//     const source = new Array(count)
//     source.fill(-1)

//     // oldStart 和 newStart 分别为起始索引，即 j
//     const oldStart = j
//     const newStart = j
//     // 新增两个变量，moved 和 pos
//     let moved = false
//     let pos = 0
//     // 构建索引表
//     const keyIndx = {}
//     for (let i = newStart; i <= newEnd; i++) {
//       keyIndx[newChildren[i].key] = i
//     }
//     // 新增 patched 变量，代表更新过的节点数量
//     let patched = 0
//     // 遍历旧的一组子节点剩余未处理的节点为止
//     for (let i = oldStart; i <= oldEnd; i++) {
//       const oldVNode = oldChildren[i]

//       if (patched <= count) {
//         // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
//         const k = keyIndx[oldVNode.key]

//         if (typeof k !== 'undefined') {
//           newVNode = newChildren[k]
//           // 调用 patch 进行更新
//           patch(oldVNode, newVNode, container)
//           // 每更新一个节点，将 patched 变量 +1
//           patched++
//           // 最后填充 source 数组
//           source[k - newStart] = i
//           // 判断节点是否需要移动
//           if (k < pos) {
//             moved = true
//           } else {
//             pos = k
//           }
//         } else {
//           // 没找到
//           unmount(oldVNode)
//         }
//       } else {
//         // 如果更新过的节点数量大于需要更新的节点数量，卸载多余的节点
//         unmount(oldVNode)
//       }
//     }

//     if (moved) {
//       // 如果 moved 为真，需要进行 DOM 移动操作
//       // 计算最长递增子序列
//       const seq = lis(source) // [0, 1]

//       // s 指向最长递增子序列的最后一个元素
//       let s = seq.length - 1
//       // i 指向新的一组子节点中的最后一个元素
//       let i = count - 1
//       // for 循环使 i 递减
//       for (i; i >= 0; i--) {
//         if (source[i] === -1) {
//           // 说明索引为 i 的节点是全新的节点，执行挂载操作
//           // 该节点在新的一组子节点中的真实位置索引
//           const pos = i + newStart
//           const newVNode = newChildren[pos]
//           // 该节点的下一个节点的位置索引
//           const nextPos = pos + 1
//           // 锚点
//           const anchor = nextPos < newChildren.length
//             ? newChildren[nextPos].el
//             : null
//           // 挂载
//           patch(null, newVNode, container, anchor)
//         } else if (i !== seq[s]) {
//           // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
//           // 该节点在新的一组子节点中的真实位置索引
//           const pos = i + newStart
//           const newVNode = newChildren[pos]
//           // 该节点的下一个节点的位置索引
//           const nextPos = pos + 1
//           // 锚点
//           const anchor = nextPos < newChildren.length
//             ? newChildren[nextPos].el
//             : null
//           // 挂载
//           insert(newVNode.el, container, anchor)
//         } else {
//           // i === seq[s] 时，说明该位置的节点不需要移动
//           // 只需要让 s 指向下一个位置
//           s--
//         }
//       }
//     }
//   }
// }

function shouldSetAsProps(el, key, value) {
  if (key === 'form' && el.tagName === 'INPUT') return false
  return key in el
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(el, text) {
    el.nodeValue = text
  },
  patchProps(el, key, prevValue, nextValue) {
    if (/^on/.test(key)) {
      const invokers = el._vei || (el._vei = {})
      let invoker = invokers[key]
      const name = key.slice(2).toLowerCase()
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] = (e) => {
            console.log(e.timeStamp)
            console.log(invoker.attached)
            if (e.timeStamp < invoker.attached) return
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach(fn => fn(e))
            } else {
              invoker.value(e)
            }
          }
          invoker.value = nextValue
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
})

// index11 问题案例
// const vnode1 = {
//   type: 'div',
//   children: [
//     { type: 'p', children: '1', key: 1 },
//     { type: 'p', children: '2', key: 2 },
//     { type: 'p', children: 'hello', key: 3 }
//   ]
// }
// renderer.render(vnode1, document.querySelector('#app'))
// const vnode2 = {
//   type: 'div',
//   children: [
//     { type: 'p', children: 'world', key: 3 },
//     { type: 'p', children: '1', key: 1 },
//     { type: 'p', children: '2', key: 2 },
//     { type: 'p', children: '4', key: 4 },
//   ]
// }

// 新增节点
// const vnode1 = {
//   type: 'div',
//   children: [
//     { type: 'p', children: '1', key: 1 },
//     { type: 'p', children: '2', key: 2 },
//     { type: 'p', children: 'hello', key: 3 }
//   ]
// }
// renderer.render(vnode1, document.querySelector('#app'))
// const vnode2 = {
//   type: 'div',
//   children: [
//     { type: 'p', children: 'world', key: 1 },
//     { type: 'p', children: '1', key: 4 },
//     { type: 'p', children: '2', key: 2 },
//     { type: 'p', children: '4', key: 3 },
//   ]
// }

// 删除节点
// const vnode1 = {
//   type: 'div',
//   children: [
//     { type: 'p', children: '1', key: 1 },
//     { type: 'p', children: '2', key: 2 },
//     { type: 'p', children: 'hello', key: 3 }
//   ]
// }
// renderer.render(vnode1, document.querySelector('#app'))
// const vnode2 = {
//   type: 'div',
//   children: [
//     { type: 'p', children: 'world', key: 1 },
//     { type: 'p', children: '4', key: 3 },
//   ]
// }

// DOM 移动
const vnode1 = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: '3', key: 3 },
    { type: 'p', children: '4', key: 4 },
    { type: 'p', children: '6', key: 6 },
    { type: 'p', children: '5', key: 5 },
  ]
}
renderer.render(vnode1, document.querySelector('#app'))
const vnode2 = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '3', key: 3 },
    { type: 'p', children: '4', key: 4 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: '7', key: 7 },
    { type: 'p', children: '5', key: 5 },
  ]
}

setTimeout(() => {
  renderer.render(vnode2, document.querySelector('#app'))
}, 400);
