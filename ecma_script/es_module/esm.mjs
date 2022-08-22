// // 加载模块函数
// console.log(require)

// // 模块对象
// console.log(module)

// // 导出对象别名
// console.log(exports)

// // 当前文件的绝对路径
// console.log(__filename)

// // 当前文件所在目录
// console.log(__dirname)

// 获取文件路径
import { fileURLToPath } from 'url'
console.log(fileURLToPath(import.meta.url))

// 获取文件所在目录
import { dirname } from 'path'
console.log(dirname(fileURLToPath(import.meta.url)))
