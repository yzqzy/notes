const path = require('path')
const fs = require('fs')

const data_path = path.resolve(__dirname, 'data.txt')

// readFile 读取文件
fs.readFile(data_path, 'utf8', (err, data) => {
  if (!err) {
    console.log(data)
  }
})

// writeFile
// 1. 默认使用覆盖写操作
// 2. 如果路径不存在，会执行创建操作
fs.writeFile(
  data_path,
  'hell node.js',
  {
    mode: 438,
    flag: 'r+',
    encoding: 'utf-8'
  },
  err => {
    if (!err) {
      console.log('write success')
    }
  }
)

// appendFile 追加写入操作
fs.appendFile(data_path, ' yueluo', err => {
  if (!err) {
    console.log('append success')
  }
})

// copyFile 拷贝文件
fs.copyFile(data_path, path.resolve(__dirname, 'test.txt'), () => {
  console.log('copy succes')
})

// watchFile 对目标文件进行监控
fs.watchFile(
  data_path,
  {
    interval: 300 // 每 300 ms 检测一次
  },
  (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log('data.txt has been modified')

      // 取消文件监控
      fs.unwatchFile(data_path)
    }
  }
)
