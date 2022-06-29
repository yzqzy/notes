const { parse } = require('../vue/compiler/parse')
const { transform } = require('../vue/compiler/transform')

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

function genFunctionDecl() {
  // 从 conext 对象中取出工具函数
  const { push, indent, deIndent } = context
  // node.id 是一个标识符，用来描述函数的名称，即 node.id.name
  push(`function ${node.id.name}`)
  push(`(`)
  // 调用 genNodeList 为函数的参数生成代码
  genNodeList(node.params, context)
  push(`)`)
  push(`{`)
  // 缩进
  indent()
  // 为函数体生成代码，递归地调用 genNode 函数
  node.body.forEach(n => genNode(n, context))
  // 取消缩进
  deIndent()
  push(`}`)
}

function genNode(node, context) {
  switch (node.type) {
    case 'FunctionDecl':
      genFunctionDecl(node, context)
      break;
    case 'ReturnStatement':
      genRturnStateMent(node, context)
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
      context.code += '\m' + `  `.repeat(context.currentIndent)
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

function compiler(template) {
  // 模板 AST
  const ast = parse(template)
  // 将模板 AST 转换为 javaScript AST
  transform(ast)
  // 代码生成
  const code = genertae(ast.JjsNode)
  return code
}

compiler('<div><p>Vue</p><p>Template</p></div>')