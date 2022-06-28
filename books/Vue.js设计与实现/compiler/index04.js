// const FunctionDeclNode = {
//   type: 'FunctionDecl', // 标识该节点是函数声明
//   // 函数名称是一个标识符，标识符本身也是一个节点
//   id: {
//     type: 'Identifier',
//     name: 'render', // name 用来存储标识符的名称，在这里它就是渲染函数的名称 render
//   },
//   parmas: [], // 参数，目前渲染函数还不需要参数，所以这里是一个空数组
//   // 渲染函数的函数体只有一个语句，即 return 语句
//   body: [
//     {
//       type: 'ReturnStatement',
//       return: {
//         type: 'CallExpression',
//         callee: { type: 'Identifier', name: 'h' },
//         arguments: [
//           // 第一个参数是字符串字面量 'div'
//           {
//             type: 'StringLiteral',
//             value: 'div'
//           },
//           // 第二个参数是一个数组
//           {
//             type: 'ArrayExpression',
//             elements: [
//               // 数组的第一个元素是 h 函数的调用
//               {
//                 type: 'CallExpression',
//                 callee: { type: 'Identifier', name: 'h' },
//                 arguments: [
//                   // 该 h 函数调用的第一个参数是字符串字面量
//                   { type: 'StringLiteral', value: 'p' },
//                   // 第二个参数也是一个字符串字面量
//                   { type: 'StringLiteral', value: 'Vue' },
//                 ]
//               },
//                 // 数组的第二个元素也是 h 函数的调用
//                 {
//                   type: 'CallExpression',
//                   callee: { type: 'Identifier', name: 'h' },
//                   arguments: [
//                     // 该 h 函数调用的第一个参数是字符串字面量
//                     { type: 'StringLiteral', value: 'p' },
//                     // 第二个参数也是一个字符串字面量
//                     { type: 'StringLiteral', value: 'Template' },
//                   ]
//                 }
//             ]
//           }
//         ]
//       }
//     }
//   ]
// }


// 用来创建 StringLiteral 节点
function createStringLiteral(value) {
  return {
    type: 'StringLiteral',
    value
  }
}
// 用来创建 Identifier
function createIdentifier(name) {
  return {
    type: 'Identifier',
    name
  }
}
// 用来创建 ArrayExpression 节点
function createArrayExpression(elements) {
  return {
    type: 'ArrayExpression',
    elements
  }
}
// 用来创建 CallExpression 节点
function createCallExpression(callee, arguments) {
  return {
    type: 'CallExpression',
    callee: createIdentifier(callee),
    arguments
  }
}

// 转换文本节点
function transformText(node) {
  // 如果不是文本节点，则什么都不做
  if (node.type !== 'Text') return
  // 文本节点对应的 JavaScript AST 节点其实就是一个字符串字面量，
  // 因此只需要使用 node.content 创建一个 StringLiteral 类型的节点即可
  // 最后将文本节点对应的 JavaScript AST 节点添加到 node.jsNode 属性下
  node.jsNode = createStringLiteral(node.content)
}
// 转换标签节点
function transformElement(node) {
  // 将转换代码编写在退出阶段的回调函数中
  // 这样可以保证该标签节点的子节点全部被处理完毕
  return () => {
    // 如果被转换的节点不是元素节点，则什么都不做
    if (node.type !== 'Element') {
      return
    }

    // 1. 创建 h 函数调用语句，
    // h 函数调用的第一个参数是标签名称，因此我们以 node.tag 来创建一个字符串字面量节点作为第一个参数
    const callExp = createCallExpression('h', [
      createStringLiteral(node.tag)
    ])
    // 2. 处理 h 函数调用的参数
    node.children.length === 1
      // 如果当前标签节点只有一个子节点，则直接使用子节点的 jsNode 作为参数
      ? callExp.arguments.push(node.children[0].jsNode)
      // 如果当前标签节点有多个子节点，则创建一个 ArrayExpression 节点作为参数
      : callExp.arguments.push(
        // 数组的每个元素都是子节点的 jsNode
        createArrayExpression(node.children.map(c => c.jsNode))
      )
    // 3. 将当前标签节点对应的 JavaScript AST 添加到 jsNode 属性下
  }
}
// 转换 Root 根节点
function transformRoot(node) {
  // 将逻辑编写在退出阶段的回调函数中，保证子节点全部被处理完毕
  return () => {
    // 如果不是根节点，则什么都不做
    if (node.type !== 'Root') return
    // node 是根节点，根节点的第一个子节点就是模板的根节点
    // 当然，这里我们暂时不考虑模板存在多个根节点的情况
    const vnodeJSAST = node.children[0].jsNode
    // 创建 render 函数的声明语句节点，将 vnodeJSAST 作为 render 函数体的返回语句
    node.jsNode = {
      type: 'FunctionDecl',
      id: { type: 'Identifier', name: 'render' },
      params: [],
      body: [
        {
          type: 'ReturnStatement',
          return: vnodeJSAST
        }
      ]
    }
  }
}

