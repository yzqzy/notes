const fs = require('fs')
const path = require('path')

const data_path = path.resolve('data.txt')

{
  const buffer = Buffer.alloc(10)

  // read 读操作就是将数据从磁盘文件写入到 buffer 中
  fs.open(data_path, 'r', (err, fd) => {
    // fd: 定位当前被打开的文件
    // buffer：用于表示当前缓冲区
    // offset：偏移量，表示从 buffer 的哪一个位置开启写入
    // length：长度，表示当前次写入的长度
    // position：表示当前从文件哪个位置开始读取
    fs.read(fd, buffer, 1, 3, 0, (err, readBytes, data) => {
      console.log(readBytes) // 3
      console.log(data) // <Buffer 00 31 32 33 00 00 00 00 00 00>
      console.log(data.toString()) // 123

      // close
      fs.close(fd)
    })

    console.log('----------------------------------')
  })
}

{
  // write 将缓存区内容写入到磁盘文件中
  const buffer = Buffer.from('10987654321')

  fs.open(path.resolve('test.txt'), 'w', (err, fd) => {
    // fd: 定位当前被打开的文件
    // buffer：用于表示当前缓冲区
    // offset：偏移量，表示从 buffer 的哪一个位置开始取数据
    // length：长度，表示当前次写入的长度
    // position：表示当前从文件哪个位置开始执行写操作
    fs.write(fd, buffer, 0, 4, 0, (err, written, buffer) => {
      // 实际写入字节数
      console.log(written)
      // buffer 仅代表文件实际内容
      console.log(buffer)
      console.log(buffer.toString())

      // close
      fs.close(fd)
    })
  })
}
