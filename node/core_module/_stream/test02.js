// const fs = require('fs')

// const ws = fs.createWriteStream('test3.txt', {
//   flags: 'w',
//   mode: 438,
//   fd: null,
//   encoding: 'utf8',
//   start: 0,
//   highWaterMark: 3 // default 16
// })

// // 因为我们使用过的是 fs 下的可写流
// // 所以写入的内容通常是 字符串或者 buffer
// ws.write('月落01', () => {
//   console.log('write success')
// })
// ws.write('月落02', () => {
//   console.log('write success')
// })

// ----------------

const fs = require('fs')

const ws = fs.createWriteStream('test3.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf8',
  start: 0,
  highWaterMark: 3 // default 16
})

ws.on('open', fd => {
  console.log('file open', fd)
})

ws.write('heora')

// 对于文件可写流来说，只有在调用 end 数据写入操作全部完成之后才会执行
ws.on('close', () => {
  console.log('file close')
})

// end 执行意味数据写入操作完成
ws.end()

ws.on('error', () => {
  console.log('file error')
})
