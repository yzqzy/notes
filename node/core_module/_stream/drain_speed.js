// 假设我们有一组数据，我们需要讲数据写入指定文件
// 1. 一次性写入，调用 write 方法
// 2. 分批写入

const fs = require('fs')

// 1. 一次性写入。针对大内存来说，这种操作是不友好的，会存在短时间溢出，瞬间撑满的情况
// const ws = fs.createWriteStream('test.txt')
// ws.write('月落森森')

// ------------------------

// 2. 分批执行写入
// const ws = fs.createWriteStream('test.txt')

// const source = '月落森森'.split('')

// // 其实还是一次性写入
// const executeWrite = () => {
//   while (source.length) {
//     ws.write(source.shift())
//   }
// }

// executeWrite()

// ------------------------

// 3. 控制写入速度
const ws = fs.createWriteStream('test.txt', {
  highWaterMark: 3
})

const source = '月落森森'.split('')

let falg

const executeWrite = () => {
  falg = true
  while (source.length && falg) {
    falg = ws.write(source.shift())
  }
}

executeWrite()

ws.on('drain', () => {
  console.log('darin trigger')

  setTimeout(executeWrite, 1 * 1000)
})
