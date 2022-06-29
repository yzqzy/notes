function genNodeList(nodes, context) {
  const { push } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    genNode(node, context)
    if (i < nodes.length - 1) {
      push(', ')
    }
  }
}

function genFunctionDecl(node, context) {
  // 从 context 对象中取出工具函数
  const { push, indent, deIndent } = context
  // node.id 是一个标识符，用来描述函数的名称，即 node.id.name
  push(`function ${node.id.name} `)
  push(`(`)
  // 调用 genNodeList 为函数的参数生成代码
  genNodeList(node.params, context)
  push(`) `)
  push(`{`)
  // 缩进
  indent()
  // 为函数体生成代码，递归地调用 genNode 函数
  node.body.forEach(n => genNode(n, context))
  // 取消缩进
  deIndent()
  push(`}`)
}

function genArrayExpression(node, context) {
  const { push } = context
  // 追加方括号
  push('[')
  // 调用 genNodeList 为数组元素生成代码
  genNodeList(node.elements, context)
  // 补全方括号
  push(']')
}

function genReturnStateMent(node, context) {
  const { push } = context
  // 追加 return 关键字和空格
  push(`return `)
  // 调用 genNode 函数递归生成返回值代码
  genNode(node.return, context)
}

function genStringLiteral(node, context) {
  const { push } = context
  // 对于字符串字面量，只需要追加与 node.value 对应的字符串即可
  push(`'${node.value}'`)
}

function genCallExpression(node, context) {
  const { push } = context
  // 取得被调用函数名称和参数列表
  const { callee, arguments: args } = node
  // 生成函数调用代码
  push(`${callee.name}(`)
  // 调用 genNodeList 生成参数代码
  genNodeList(args, context)
  // 补全括号
  push(`)`)
}

function genNode(node, context) {
  switch (node.type) {
    case 'FunctionDecl':
      genFunctionDecl(node, context)
      break;
    case 'ReturnStatement':
      genReturnStateMent(node, context)
      break;
    case 'CallExpression':
      genCallExpression(node, context)
      break;
    case 'StringLiteral':
      genStringLiteral(node, context)
      break;
    case 'ArrayExpression':
      genArrayExpression(node, context)
      break;
  }
}

function genertae(node) {
  const context = {
    // 存储最终生成的渲染函数代码
    code: '',
    // 生成代码时，通过调用 push 函数完成代码拼接
    push(code) {
      context.code += code
    },
    // 当前缩进级别，初始值为 0，即没有缩进
    currentIndent: 0,
    // 该函数用来换行，即在代码字符串的后买你追加 \n 字符
    // 另外，换行时应该保留缩进，所以我们还要追加 currentIdent * 2 个空格字符
    newLine() {
      context.code += '\n' + `  `.repeat(context.currentIndent)
    },
    // 用来缩进，即让 currentIdent 自增后，调用换行函数
    indent() {
      context.currentIndent++
      context.newLine()
    },
    // 取消缩进，即让 currentIdent 自减后，调用换行函数
    deIndent() {
      context.currentIndent--
      context.newLine()
    }
  }

  // 调用 genNode 函数完成代码生成工作
  genNode(node, context)

  // 返回渲染函数代码
  return context.code
}

module.exports = {
  genertae
}