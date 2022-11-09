// const fs = require('fs')

// const rs = fs.createReadStream('test.txt')
// const ws = fs.createWriteStream('test1.txt')

// rs.pipe(ws)

const { Readable } = require('stream')

// 定义数组存放数据，模拟底层数据
const source = ['yueluo', 'heora', 'yzq']

class $Readable extends Readable {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    this.push(this.source.shift() || null)
  }
}

const readIns = new $Readable(source)

readIns.on('readable', () => {
  let data = null

  while ((data = readIns.read()) !== null) {
    console.log('readable', data.toString())
  }
})

readIns.on('data', data => {
  console.log('data', data.toString())
})
