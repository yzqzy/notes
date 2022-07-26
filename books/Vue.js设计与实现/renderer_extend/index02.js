// 文本节点的 type 标识
const Text = Symbol()
const newVNode = {
  type: Text,
  children: '我是文本内容'
}

// 注释节点的 type 标识
const Comment = Symbol()
const newVNode = {
  type: Comment,
  children: '我是注释内容'
}


// function patch(n1, n2, container, anchor) {
//   if (n1 && n1.type !== n2.type) {
//     unmount(n1)
//     n1 = null
//   }

//   const { type } = n2

//   if (typeof type === 'string') {
//     if (!n1) {
//       mountElement(n2, container, anchor)
//     } else {
//       patchElement(n1, n2)
//     }
//   } else if (type === Text) {
//     // 如果新的 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
//     if (!n1) {
//       // 如果没有旧节点，进行挂载
//       // 使用 createTextMode 创建文本节点
//       const el = n2.el = document.createTextNode(n2.children)
//       // 将文本节点插入到容器中
//       insert(el, container)
//     } else {
//       // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
//       const el = n2.el = n1.el
//       if (n2.children !== n1.children) {
//         el.nodeValue = n2.children
//       }
//     }
//   }
// }
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
    // 如果新的 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
    if (!n1) {
      // 如果没有旧节点，进行挂载
      // 使用 createTextMode 创建文本节点
      const el = n2.el = createText(n2.children)
      // 将文本节点插入到容器中
      insert(el, container)
    } else {
      // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
      const el = n2.el = n1.el
      if (n2.children !== n1.children) {
        setText(el, n2.children)
      }
    }
  }
}

const renderer = createRenderer({
  createElement(tag) {
    // ...
  },
  setElementText(el, text) {
    // ...
  },
  insert(el, parent, anchor = null) {
    // ...
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(el, text) {
    el.nodeValue = text
  },
  patchProps(el, key, prevValue, nextValue) {
    // ...
  }
})
