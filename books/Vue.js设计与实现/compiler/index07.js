const { parse } = require('../vue/compiler/parse')
const { transform } = require('../vue/compiler/transform')
const { genertae } = require('../vue/compiler/generate')

function compiler(template) {
  // 模板 AST
  const ast = parse(template)
  // 将模板 AST 转换为 javaScript AST
  transform(ast)
  // 代码生成
  const code = genertae(ast.jsNode)
  return code
}

const jsAST = compiler('<div><p>Vue</p><p>Template</p></div>')

console.log(jsAST)