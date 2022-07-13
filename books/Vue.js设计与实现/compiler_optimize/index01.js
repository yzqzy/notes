cosnt PatchFlags = {
  TEXT: 1, // 代表节点有动态的 textContent
  CLASS: 2, // 代表元素有动态的 class 绑定
  STYLE: 3, // 代表元素有动态的 style 绑定
  // ....
}


// 动态节点栈
const dynamicChildrenStack = []
// 当前动态节点集合
let currentDynamicChildren = null
// openBlock 用来创建一个新的动态节点集合，并将该集合压入栈中
function openBlock() {
  dynamicChildrenStack.push({currentDynamicChildren = []})
}
// closeBlock 用来将通过 openBlock 创建的动态节点集合从栈中弹出
function closeBlock() {
  currentDynamicChildren = dynamicChildrenStack.pop()
}


function createVNode(tag, props, children, flags) {
  const key = props && props.key
  props && delete props.key
  
  const vnode = {
  	tag,
    props,
    children,
    key,
    patchFlags: flags
  }

  if (typeof flags !== 'undefined' && currentDynamicChildren) {
    // 动态节点，将其添加到当前动态集合中
    currentDynamicChildren.push(vnode)
  }

  return vnode
}


function createBlock(tag, props, children) {
  // block 本质上也是一个 vnode
  const block - createVNode(tag, props, children)
  // 将当前动态节点集合作为 block.dynamicChildren
  block.dynamicChildren = currentDynamicChildren

  // 关闭 block
  closeBlock()
  // 返回 block
  return block
}

render() {
  // 1. 使用 createBlock 代替 createVNode 来创建 Block
  // 2. 每当调用 createBlock 之前，先调用 openBlock
  return (openBlock(), createBlock('div', null, [
    createVNode('p', { class: 'foo' }, null, 1),
    createVNode('p', { class: 'bar' }, null)
  ]))
}


function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props

  if (n2.patchFlags) {
    // 靶向更新
    if (n2.patchFlags === 2) {
      // 只需要更新 class
    } else if (n2.patchFlags === 4) {
      // 只需要更新 style
    } else if (...) {
      // ...
    }
  } else {
    // 全量更新
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
  }

  if (n2.dynamicChildren) {
    // 调用 patchBlockChildren 函数，只会更新动态节点
    patchBlockChildren(n1, n2)
  } else {
    patchChildren(n1, n2, el)
  }
}

function patchBlockChildren(n1, n2) {
  // 只更新动态节点即可
  for (let i = 0; i < n2.dynamicChildren.length; i++) {
    patchElement(n1.dynamicChildrenp[i], n2.dynamicChildren[i])
  }
}

