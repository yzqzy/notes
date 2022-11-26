// const fs = require('fs')

// const rs = fs.createReadStream('./test04.txt', {
//   highWaterMark: 4 // default: 64kb
// })
// const ws = fs.createWriteStream('./test05.txt', {
//   highWaterMark: 1 // default: 16kb
// })

// rs.pipe(ws)

// ----------------------------------

const fs = require('fs')
const { $ReadStream } = require('./read_stream')

const rs = new $ReadStream('./test04.txt', {
  highWaterMark: 4 // default: 64kb
})
const ws = fs.createWriteStream('./test05.txt')

rs.pipe(ws)
