const obfuscator = require('javascript-obfuscator')

const code = `
  const x  = 'l' + 1
  console.log('x', x)
`

// const options = {
//   compact: true, // 是否压缩成一行
//   controlFlowFlattening: true // 控制流平坦化
// }

// const options = {
//   compact: true, // 是否压缩成一行
//   identifierNamesGenerator: 'mangled' // 普通混淆
// }

// 字符串混淆
// const options = {
//   stringArray: true,
//   rotateStringArray: true,
//   stringArrayEncoding: ['base64'], // none, base64, rc4
//   stringArrayThreshold: 1
// }
// const options = {
//   compact: false,
//   unicodeEscaoeSequence: true
// }

// 自我保护
// const options = {
//   selfDefending: true
// }

// 控制流平坦化
// const options = {
//   compact: false,
//   controlFLowFlattening: true
// }

// 对象键名替换
// const options = {
//   compact: true,
//   transformObjectKeys: true
// }

// 禁用控制台输出
const options = {
  disableConsoleOutput: true
}

const obfuscate = (code, options) => obfuscator.obfuscate(code, options).getObfuscatedCode()
console.log(obfuscate(code, options))
