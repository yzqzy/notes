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

// ------------------------------------------------

// const fs = require('fs')

// // 1. 创建可读流，生产数据
// const rs = fs.createReadStream('test.txt')

// // 2. 修改字符编码，便于后续使用
// rs.setEncoding('utf-8')

// // 3. 创建可写流，消费数据
// const ws = fs.createWriteStream('test2.txt')

// // 4. 监听事件调用方法完成数据的消费
// rs.on('data', chunk => {
//   // 执行数据写入
//   ws.write(chunk)
// })

const { Writable } = require('stream')

class $Writeable extends Writable {
  constructor() {
    super()
  }

  _write(chunk, _, done) {
    process.stdout.write(chunk.toString() + '-')
    process.nextTick(done)
  }
}

// 创建可写流用于消费数据
const ws = new $Writeable()

ws.write('yzq is a boy', 'utf-8', () => {
  console.log('write success')
})
