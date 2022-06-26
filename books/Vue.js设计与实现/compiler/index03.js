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

const ast = parse('<div><p>Vue</p><p>Template</p></div>')

// dump(ast)

function traverseNode(ast, context) {
  // 当前节点，ast 本身就是 Root 节点
  context.currentNode = ast

  // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
  const transforms = context.nodeTransforms || []
  transforms.forEach(cur => {
    // 将当前节点 currentNode 和 context 都传递给 nodeTransforms 中注册的回调函数
    cur(currentNode, context)
  })

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = currentNode.children
  if (children) {
    children.forEach(cur => {
      // 设置父节点
      context.parent - context.currentNode
      // 设置位置索引
      context.childIndex = i
      // 递归调用
      traverseNode(cur, context)
    })
  }
}

function transformElement(node) {
  if (node.type === 'Element' && node.tag === 'p') {
    // 将所有 p 标签转换为 h1 标签
    node.tag = 'h1'
  }
}
function transdormText(node) {
  if (node.type === 'Text') {
    // 如果当前转换的节点是文本节点，调用 replaceNode 函数将其替换为元素节点
    node.content = node.content.repeat(2)
    content.replaceNode({
      type: 'Element',
      tag: 'span'
    })
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

transform(ast)
