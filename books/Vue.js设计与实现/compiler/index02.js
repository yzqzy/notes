// const ast = {
//   type: 'Root',
//   children: [
//     {
//       type: 'Element',
//       tag: 'div',
//       children: [
//         {
//           type: 'Element',
//           tag: 'p',
//           children: [
//             {
//               type: 'Text',
//               content: 'Vue'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       type: 'Element',
//       tag: 'div',
//       children: [
//         {
//           type: 'Element',
//           tag: 'p',
//           children: [
//             {
//               type: 'Text',
//               content: 'Template'
//             }
//           ]
//         }
//       ]
//     },
//   ]
// }


const { tokenzie } = require('./index01')

// const tokens = tokenzie(`<div><p>Vue</p><p>Template</p></div>`)
// [
//   { type: 'tag', name: 'div' },          // div 开始标签节点
//   { type: 'tag', name: 'p' },            // p 开始标签节点
//   { type: 'text', content: 'Vue' },      // 文本节点
//   { type: 'tagEnd', name: 'p' },         // p 结束标签节点
//   { type: 'tag', name: 'p' },            // p 开始标签节点
//   { type: 'text', content: 'Template' }, // 文本节点
//   { type: 'tagEnd', name: 'p' },         // p 结束标签节点
//   { type: 'tagEnd', name: 'div' }        // div 结束标签节点
// ]

// parse 函数接收模板作为参数
function parse(str) {
  // 首先对模板进行标记化，得到 tokens
  const tokens = tokenzie(str)
  //  创建 Root 根节点
  const root = {
    type: 'Root',
    children: []
  }
  // 创建 elementStack 栈
  const elementStack = [root]

  // 开启 while 循环扫描 tokens
  while (tokens.length) {
    // 获取当前栈顶节点作为父节点 parent
    const parent = elementStack[elementStack.length - 1]
    // 当前扫描的 Token
    const t = tokens[0]

    switch (t.type) {
      case 'tag':
        // 如果当前 Token 是开始标签，创建 Element 类型的 AST 节点
        const elementNode = {
          type: 'Element',
          tag: t.name,
          children: []
        }
        // 将其添加到父级节点的 children 中
        parent.children.push(elementNode)
        // 将当前节点压入栈
        elementStack.push(elementNode)
        break;
      case 'text':
        // 如果当前 Token 是文本，创建 Text 类型的 AST 节点
        const textNode = {
          type: 'Text',
          content: t.content
        }
        // 将其添加到父节点的 children 中
        parent.children.push(textNode)
        break;
      case 'tagEnd':
        // 遇到结束标签，将栈顶节点弹出
        elementStack.pop()
        break;
    }

    // 消费已扫描过的 token
    tokens.shift()
  }

  // 返回 ast
  return root
}

const ast = parse('<div><p>Vue</p><p>Template</p></div>')
