const fs = require('fs')
const path = require('path')

const data_path = path.resolve('data.txt')

// open 打开文件
fs.open(data_path, 'r', (err, fd) => {
  console.log(fd)
})

fs.open(data_path, 'r', (err, fd) => {
  console.log(fd)

  // close 关闭文件
  fs.close(fd, err => {
    if (!err) {
      console.log('close sucess')
    }
  })
})
