const obfuscator = require('javascript-obfuscator')

const code = `
  const x  = 'l' + 1
  console.log('x', x)
`

const options = {
  compact: true, // 是否压缩成一行
  // controlFlowFlattening: true // 控制流平坦化
  identifierNameGenerator: 'mangled'
}

const obfuscate = (code, options) => obfuscator.obfuscate(code, options).getObfuscatedCode()
console.log(obfuscate(code, options))
