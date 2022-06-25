function createRenderer(options) {
  const {
    createElement,
    insert,
    setElementText,
    patchProps,
    createText,
    setText
  } = options

  function mountElement(vnode, container, anchor) {
    const el = vnode.el = createElement(vnode.type)
    
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        patch(null, child, el)
      })
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }

    insert(el, container, anchor)
  }

  function patchChildren(n1, n2, container) {
    if (typeof n2.children === 'string') {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c))
      }
      setElementText(container, n2.children)
    } else if (Array.isArray(n2.children)) {
      patchKeyedChildren(n1, n2, container)
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach(c => unmount(c))
      } else if (typeof n1.children === 'string') {
        setElementText(container, '')
      }
    }
  }

  // 双端 Diff
  // function patchKeyedChildren (n1, n2, container) {
  //   const oldChildren = n1.children
  //   const newChildren = n2.children
  
  //   let oldStartIdx = 0
  //   let oldEndIdx = oldChildren.length - 1
  //   let newStartIdx = 0
  //   let newEndIdx = newChildren.length - 1
  
  //   let oldStartVNode = oldChildren[oldStartIdx]
  //   let oldEndVNode = oldChildren[oldEndIdx]
  //   let newStartVNode = newChildren[newStartIdx]
  //   let newEndVNode = newChildren[newEndIdx]
  
  //   while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  //     // 增加两个判断分支，如果头尾部节点为 undefined，说明该节点已经被处理过，直接跳到下一个位置
  //     if (!oldStartVNode) {
  //       oldStartVNode = oldChildren[++oldStartIdx]
  //     } else if (!oldEndVNode) {
  //       oldEndVNode = newChildren[--oldEndIdx]
  //     } else if (oldStartVNode.key === newStartVNode.key) {
  //       // 第一步：oldStartVNode 和 newStartVNode 比较
  
  //       // 调用 patch 函数在 oldStartVNode 与 newStartVNode 之间打补丁
  //       patch(oldStartVNode, newStartVNode, container)
  //       // 更新索引
  //       oldStartVNode = oldChildren[++oldStartIdx]
  //       newStartVNode = newChildren[++newStartIdx]
  //     } else if (oldEndVNode.key === newEndVNode.key) {
  //       // 第二步：oldEndVNode 和 newEndVNode 比较
  
  //       // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需要打补丁
  //       patch(oldEndVNode, newEndVNode, container)
  //       // 更新索引和头尾部的节点变量
  //       oldEndVNode = oldChildren[--oldEndIdx]
  //       newEndVNode = newChildren[--newEndIdx]
  //     } else if (oldStartVNode.key === newEndVNode.key) {
  //       // 第三步：oldStartVNode 和 newEndVNode 比较
  
  //       // 调用 patch 函数在 oldStartVNode 和 newEndVNode 之间打补丁
  //       patch(oldStartVNode, newEndVNode, container)
  //       // 将旧的一组子节点的头部节点对应的真实 DOM 节点 oldStartVNode.el 移动到
  //       // 旧的一组子节点的尾部节点对应的真实 DOM 节点后面
  //       insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
  //       // 更新索引
  //       oldStartVNode = oldChildren[++oldStartIdx]
  //       newEndVNode = newChildren[--newEndIdx]
  //     } else if (oldEndVNode.key === newStartVNode.key) {
  //       // 第四步：oldEndVNode 和 newStartVNode 比较
  
  //       // 仍然需要调用 patch 函数进行打补丁
  //       patch(oldEndVNode, newStartVNode, container)
  //       // 移动 DOM 操作
  //       // oldEndVNode.el 移动到 oldStartVNode.el 前面
  //       insert(oldEndVNode.el, container, oldStartVNode.el)
  //       // 移动 DOM 完成后，更新索引值，并指向下一个位置
  //       oldEndVNode = oldChildren[--oldEndIdx]
  //       newStartVNode = newChildren[++newStartIdx]
  //     } else {
  //       // 乱序比较
  
  //       // 遍历旧的一组子节点，寻找与 newStartVNode 拥有相同 key 值的节点
  //       // idxInOld 就是新的一组子节点的头部节点在旧的一组子节点中的索引
  //       const idxInOld = oldChildren.findIndex(node => node.key === newStartVNode.key)
  
  //       // idxInOld 大于 0，说明找到了可复用的节点，并且需要将其对应的真实 DOM 移动到头部
  //       if (idxInOld > 0) {
  //         // idxInOld 位置对应的 vnode 就是需要移动的节点
  //         const vnodeToMove = oldChildren[idxInOld]
  //         // 打补丁操作
  //         patch(vnodeToMove, newStartVNode, container)
  //         // 将 vnodeToMove.el 移动到头部节点 oldStartVNode.el 之前，因此使用后者作为锚点
  //         insert(vnodeToMove.el, container, oldStartVNode.el)
  //         // 由于位置 idxInOld 处的节点所对应的真实 DOM 已经移动到别处，因此将其设置为 undefined
  //         oldChildren[idxInOld] = undefined
  //       } else {
  //         // 将 newStartVNode 作为新节点挂载到头部，使用当前头部节点 oldStartVNode.el 作为锚点
  //         patch(null, newStartVNode, container, oldStartVNode.el)
  //       } 
           
  //       // 更新 newStartIdx 到下一个位置
  //       newStartVNode = newChildren[++newStartIdx]
  //     }   
  //   }
  
  //   // 循环结束检查索引值的情况
  //   if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
  //     // 如果满足条件，则说明有新的节点遗漏，需要挂载它们
  //     for (let i = newStartIdx; i <= newEndIdx; i++) {
  //       patch(null, newChildren[i], container, oldStartVNode.el)
  //     }
  //   } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
  //     // 移除操作
  //     for (let i = oldStartIdx; i <= oldEndIdx; i++) {
  //       unmount(oldChildren[i])
  //     }
  //   }
  // }

  // 快速 Diff
  function patchKeyedChildren (n1, n2, container) {
    const newChildren = n2.children
    const oldChildren = n1.children

    // 更新相同的前置节点
    // 索引 j 指向新旧两组子节点的开头
    let j = 0
    let oldVNode = oldChildren[j]
    let newVNode = newChildren[j]
    // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
    while (oldVNode.key === newVNode.key) {
      // 调用 patch 函数进行更新
      patch(oldVNode, newVNode, container)
      // 更新索引 j，让其递增
      j++
      oldVNode = oldChildren[j]
      newVNode = newChildren[j]
    }

    // 更新相同的后置节点
    // 索引 oldEnd 指向旧的一组子节点的最后一个节点
    let oldEnd = oldChildren.length - 1
    // 索引 newEnd 指向新的一组子节点的最后一个节点
    let newEnd = newChildren.length - 1
    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]
    // while 循环从后向前遍历，直到遇到拥有不同的 key 值的节点为止
    while (oldVNode.key === newVNode.key) {
      // 调用 patch 函数进行更新
      patch(oldVNode, newVNode, container)
      // 递减 oldEnd 和 newEnd
      oldEnd--
      newEnd--
      oldVNode = oldChildren[oldEnd]
      newVNode = newChildren[newEnd]
    }
  
    if (j > oldEnd && j <= newEnd) {
      // 预处理完毕后，如果满足如下条件，则说明 j --> nextEnd 之间的节点应作为新节点插入
      // 锚点的索引
      const anchorIndex = newEnd + 1
      // 锚点元素
      const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
      // 采用 while 循环，调用 patch 函数逐个挂载新增节点
      while (j <= newEnd) {
        patch(null, newChildren[j++], container, anchor)
      }
    } else if (j > newEnd && j <= oldEnd) {
      // j --> oldEnd 之间的节点应该被卸载
      while (j <= oldEnd) {
        unmount(oldChildren[j++])
      }
    } else {
      // else 分支处理非理想情况
      // 新的一组子节点中剩余未处理节点的数量
      const count = newEnd - j + 1
      const source = new Array(count)
      source.fill(-1)
  
      // oldStart 和 newStart 分别为起始索引，即 j
      const oldStart = j
      const newStart = j
      // 新增两个变量，moved 和 pos
      let moved = false
      let pos = 0
      // 构建索引表
      const keyIndx = {}
      for (let i = newStart; i <= newEnd; i++) {
        keyIndx[newChildren[i].key] = i
      }
      // 新增 patched 变量，代表更新过的节点数量
      let patched = 0
      // 遍历旧的一组子节点剩余未处理的节点为止
      for (let i = oldStart; i <= oldEnd; i++) {
        const oldVNode = oldChildren[i]
  
        if (patched <= count) {
          // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
          const k = keyIndx[oldVNode.key]
  
          if (typeof k !== 'undefined') {
            newVNode = newChildren[k]
            // 调用 patch 进行更新
            patch(oldVNode, newVNode, container)
            // 每更新一个节点，将 patched 变量 +1
            patched++
            // 最后填充 source 数组
            source[k - newStart] = i
            // 判断节点是否需要移动
            if (k < pos) {
              moved = true
            } else {
              pos = k
            }
          } else {
            // 没找到
            unmount(oldVNode)
          }
        } else {
          // 如果更新过的节点数量大于需要更新的节点数量，卸载多余的节点
          unmount(oldVNode)
        }
      }
  
      if (moved) {
        // 如果 moved 为真，需要进行 DOM 移动操作
        // 计算最长递增子序列
        const seq = getSequence(source) // [0, 1]
  
        // s 指向最长递增子序列的最后一个元素
        let s = seq.length - 1
        // i 指向新的一组子节点中的最后一个元素
        let i = count - 1
        // for 循环使 i 递减
        for (i; i >= 0; i--) {
          if (source[i] === -1) {
            // 说明索引为 i 的节点是全新的节点，执行挂载操作
            // 该节点在新的一组子节点中的真实位置索引
            const pos = i + newStart
            const newVNode = newChildren[pos]
            // 该节点的下一个节点的位置索引
            const nextPos = pos + 1
            // 锚点
            const anchor = nextPos < newChildren.length
              ? newChildren[nextPos].el
              : null
            // 挂载
            patch(null, newVNode, container, anchor)
          } else if (i !== seq[s]) {
            // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
            // 该节点在新的一组子节点中的真实位置索引
            const pos = i + newStart
            const newVNode = newChildren[pos]
            // 该节点的下一个节点的位置索引
            const nextPos = pos + 1
            // 锚点
            const anchor = nextPos < newChildren.length
              ? newChildren[nextPos].el
              : null
            // 挂载
            insert(newVNode.el, container, anchor)
          } else {
            // i === seq[s] 时，说明该位置的节点不需要移动
            // 只需要让 s 指向下一个位置
            s--
          }
        }
      }
    }
  }
  
  function patchElement(n1, n2) {
    const el = n2.el = n1.el
    const oldProps = n1.props
    const newProps = n2.props
    
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key])
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null)
      }
    }

    patchChildren(n1, n2, el)
  }

  const Fragment = Symbol()

  function unmount(vnode) {
    if (vnode.type === Fragment) {
      vnode.children.forEach(c => unmount(c))
      return
    }
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }

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
      if (!n1) {
        const el = n2.el = createText(n2.children)
        insert(el, container)
      } else {
        const el = n2.el = n1.el
        if (n2.children !== n1.children) {
          setText(el, n2.children)
        }
      }
    } else if (type === Fragment) {
      if (!n1) {
        n2.children.forEach(c => patch(null, c, container))
      } else {
        patchChildren(n1, n2, container)
      }
    }
  }

  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }

  function hydrate (vnode, container) {

  }
  
  return {
    render,
    hydrate
  }
}

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}