// const fs = require('fs')

// const rs = fs.createReadStream('test.txt', {
//   flags: 'r',
//   encoding: null,
//   fd: null,
//   mode: 438,
//   autoClose: true,
//   start: 0,
//   // end: 3,
//   highWaterMark: 2
// })

// rs.on('data', chunk => {
//   console.log(chunk.toString())

//   rs.pause() // 切换暂停模式

//   setTimeout(() => {
//     rs.resume() // 切换流动模式
//   }, 1000)
// })

// ------------------------------------------------

// const fs = require('fs')

// const rs = fs.createReadStream('test.txt', {
//   flags: 'r',
//   encoding: null,
//   fd: null,
//   mode: 438,
//   autoClose: true,
//   start: 0,
//   // end: 3,
//   highWaterMark: 4
// })

// rs.on('readable', () => {
//   let data

//   // while ((data = rs.read(2)) !== null) {
//   //   console.log(data.toString())
//   // }

//   // while ((data = rs.read(4)) !== null) {
//   //   console.log(data.toString())
//   // }

//   while ((data = rs.read(1)) !== null) {
//     // _readableState 长度与 highWaterMark 密切相关
//     console.log(data.toString(), rs._readableState.length)
//   }
// })

// ------------------------------------------------

const fs = require('fs')

const rs = fs.createReadStream('test.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  highWaterMark: 4
})

rs.on('open', fd => {
  // open 操作并不是在数据被消费之后才被处理
  // 当我们调用 createReadStream 时就会触发 open 事件
  console.log(fd, 'file open')
})

rs.on('close', () => {
  // 默认情况下并不会被触发
  // 默认情况下为暂停模式，close 必须在数据被消费之后才会被触发
  console.log('file close')
})

let bufferArr = []

rs.on('data', chunk => {
  console.log(chunk)

  bufferArr.push(chunk)
})

rs.on('end', () => {
  // end 在 close 之间被执行
  console.log('file clear')

  console.log(Buffer.concat(bufferArr).toString())
})

rs.on('error', err => {
  console.log('has error', err)
})
