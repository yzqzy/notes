const fs = require('fs')

const ws = fs.createWriteStream('test3.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf8',
  start: 0,
  highWaterMark: 3 // default 16
})

ws.write('月落01', () => {
  console.log('write success')
})
ws.write('月落02', () => {
  console.log('write success')
})
