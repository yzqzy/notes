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

// readIns.on('readable', () => {
//   let data = null

//   // 打印值可能存在与预期不符的情况
//   // 这其实是因为 read 的工作机制问题
//   // 调用 read 时缓存区已经存在值，所以第一次打印的时候会打印出两个值
//   // read 方法可以传入指定数据长度，这样打印时会和预期会一致
//   // 暂停模式，我们需要手动调用 read 读取数据
//   while ((data = readIns.read()) !== null) {
//     console.log('readable', data.toString())
//   }
// })

// 流动模式，这种读取方式会依次读取数据，更符合预期
readIns.on('data', data => {
  console.log('data', data.toString())
})
