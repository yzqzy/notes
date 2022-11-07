const fs = require('fs')

const rs = fs.createReadStream('test.txt')
const ws = fs.createWriteStream('test1.txt')

rs.pipe(ws)
