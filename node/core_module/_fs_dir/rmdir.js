const path = require('path')
const fs = require('fs')

// 自定义函数，接收路径，执行删除操作
// 1. 判断当前传入的路径是否为一个文件，删除当前文件
// 2. 如果当前传入的是一个目录，需要继续读取目录中内容，然后再执行删除操作
// 3. 将删除行为定义为一个函数，递归方式进行复用
// 4. 将当前名称拼接成在删除时可使用的路径
const rmdirAsync = (dir_path, cb) => {
  fs.stat(dir_path, (err, statObj) => {
    if (statObj.isDirectory()) {
      fs.readdir(dir_path, (err, files) => {
        const dirs = files.map(item => path.join(dir_path, item))

        let index = 0

        function next() {
          if (index === dirs.length) return fs.rmdir(dir_path, cb)

          const current = dirs[index++]

          rmdirAsync(current, next)
        }

        next()
      })
    } else {
      // remove
      fs.unlink(dir_path, cb)
    }
  })
}

// rmdirAsync('data.txt', () => {
//   console.log('remove dir success')
// })
rmdirAsync('c', () => {
  console.log('remove dir success')
})
