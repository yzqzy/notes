const { parse } = require('../vue/compiler/parse')

function dump(node, indent = 0) {
  // 节点类型
  const type = node.type
  // 节点的描述，如果是根节点，则没有描述
  // 如果是 Element 类型的节点，则使用 node.tag 作为节点的描述
  // 如果是 Text 类型的节点，则使用 ndoe.content 作为节点的描述
  const desc = node.type === 'Root'
    ? ''
    : node.type === 'Element' 
      ? node.tag
      : node.content
  // 打印节点的类型和描述信息
  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)
  // 递归地打印子节点
  if (node.children) {
    node.children.forEach(n => dump(n, indent + 2))
  } 
}

// dump(ast)

function traverseNode(ast, context) {
  // 当前节点，ast 本身就是 Root 节点
  context.currentNode = ast
  // 增加退出阶段的回调函数数组
  const exitFns = []

  // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
  const transforms = context.nodeTransforms || []
  for (let i = 0; i < transforms.length; i++) {
    // 转换函数可以返回另外一个函数，该函数作为退出阶段的回调函数
    const onExit = transforms[i](context.currentNode, context)

    if (onExit) {
      // 将退出阶段的回调函数添加到 exitFns 数组中
      exitFns.push(onExit)
    }
    
    // 由于任何转换函数都可能移除当前节点，因此每个转换函数执行完毕后，
    // 都应该检查当前节点是否以经被移除，如果被移除，直接返回即可
    if (!context.currentNode) return
  }

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = context.currentNode.children
  if (children) {
    children.forEach((cur, i) => {
      // 设置父节点
      context.parent = context.currentNode
      // 设置位置索引
      context.childIndex = i
      // 递归调用
      traverseNode(cur, context)
    })
  }

  // 节点处理的最后阶段执行缓存到 exitFns 中的回调函数
  // tip：这里我们要反序执行
  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}

// function transformElement(node) {
//   if (node.type === 'Element' && node.tag === 'p') {
//     // 将所有 p 标签转换为 h1 标签
//     node.tag = 'h1'
//   }
// }
// function transdormText(node, context) {
//   if (node.type === 'Text') {
//     // 如果当前转换的节点是文本节点，调用 replaceNode 函数将其替换为元素节点
//     context.replaceNode({
//       type: 'Element',
//       tag: 'span'
//     })
//     // 如果是文本节点，直接调用 context.rmeoveNode 函数将其移除即可
//   }
// }
function transformElement(node) {
  // 进入节点

  // 返回一个会在退出节点执行的回调函数
  return () => {
    // 在这里编写退出节点的逻辑，当这里的代码运行时，当前转换的子节点一定处理完毕了
  }
}
function transdormText(node, context) {
  if (node.type === 'Text') {
    // 如果是文本节点，直接调用 context.rmeoveNode 函数将其移除即可
    context.removeNode()
  }
}

function transform(ast) {
  // 在 transform 函数内创建 context 对象
  const context = {
    // 增加 currentNode，存储当前正在转换的节点
    currentNode: null,
    // 增加 childIndex，存储当前节点在父节点的 children 中的位置索引
    childIndex: 0,
    // 增加 parent，存储当前转换节点的父节点
    parent: null,
    // 用于替换节点的函数，接收新节点作为参数
    replaceNode(node) {
      // 为了替换节点，我们需要修改 AST
      // 找到当前节点在父节点的 children 中的位置：context.childIndex
      // 然后使用新节点替换即可
      context.parent.children[context.childIndex] = node
      // 由于当前新节点已经被新节点替换掉，因此我们需要将 currentNode 更新为新节点
      context.currentNode = node
    },
    // 删除当前节点
    removeNode() {
      if (context.parent) {
        // 调用数组的 splice 方法，根据当前节点的索引删除当前节点
        context.parent.children.splice(context.childIndex, 1)
        // 将 context.currentNode 置空
        context.currentNode = null
      }
    },
    // 注册 nodeTransforms 数组
    nodeTransforms: [
      transformElement,
      transdormText
    ]
  }

  // 调用 traverseNode 完成转换
  traverseNode(ast, context)
  // 打印 AST 信息
  dump(ast)
}

const ast = parse('<div><p>Vue</p><p>Template</p></div>')
transform(ast)
