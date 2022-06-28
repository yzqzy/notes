const { parse } = require('../vue/compiler/parse')
const { transform } = require('../vue/compiler/transform')

function compiler(template) {
  // 模板 AST
  const ast = parse(template)
  // 将模板 AST 转换为 javaScript AST
  transform(ast)
}

compiler('<div><p>Vue</p><p>Template</p></div>')