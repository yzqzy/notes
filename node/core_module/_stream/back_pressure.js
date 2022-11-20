const fs = require('fs')

const rs = fs.createReadStream('test1.txt', {
  highWaterMark: 4 // 默认为 64 kb，文件可写流默认为 16 kb，两者之间存在 4:1 的关系
})
const ws = fs.createWriteStream('test2.txt', {
  highWaterMark: 1
})

// 1. 流动模式，一次性写入
// rs.on('data', chunk => {
//   ws.write(chunk, () => {
//     console.log('write done')
//   })
// })

// ----------------------

// let flag = true

// rs.on('data', chunk => {
//   flag = ws.write(chunk, () => {
//     console.log('write done')
//   })

//   if (!flag) rs.pause()
// })

// ws.on('drain', () => {
//   rs.resume()
// })

// ----------------------

rs.pipe(ws)
