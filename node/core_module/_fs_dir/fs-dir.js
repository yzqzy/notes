const fs = require('fs')
const path = require('path')

const data_path = path.resolve(__dirname, 'data.txt')

// 1. access
fs.access(data_path, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('有操作权限')
})

// 2. stat
fs.stat(data_path, (err, statObj) => {
  console.log(statObj.size)
  console.log(statObj.isFile())
  console.log(statObj.isDirectory())
})

// 3. mkdir
// 默认情况下只能创建最后一级路径
fs.mkdir(path.resolve(__dirname, 'a/b/c'), { recursive: true }, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('mkdir success')
})

// 4. rmdir
// 默认情况下只能删除非空目录，且只删除最后一级目录
fs.rmdir(path.resolve(__dirname, 'a/b/c'), { recursive: true }, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('remove dir success')
})

// 5. readdir
fs.readdir(path.resolve(__dirname, 'test'), (err, files) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(files)
})

// 6. unlink
fs.unlink(path.resolve(__dirname, 'test/data.txt'), err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('unlink success')
})
