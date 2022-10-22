const fs = require('fs')
const path = require('path')

// 递归创建路径
// 1. 接收路径，对路径进行分隔
// 2. 对路径数组进行遍历
// 3. 判断拼接路径是否存在可操作权限
const makeDirSync = dir_path => {
  const items = dir_path.split(path.sep)

  for (let i = 1; i <= items.length; i++) {
    const dir = items.slice(0, i).join(path.sep)

    try {
      fs.accessSync(dir)
    } catch (error) {
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync(path.normalize('a/b/c'))
