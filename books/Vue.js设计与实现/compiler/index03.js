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
  const currentNode = ast

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
    node.content = node.content.repeat(2)
  }
}

function transform(ast) {
  // 在 transform 函数内创建 context 对象
  const context = {
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
