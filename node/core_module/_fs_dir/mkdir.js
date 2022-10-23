const fs = require('fs')
const path = require('path')
const util = require('util')

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

// makeDirSync(path.normalize('a/b/c'))

const makeDirAsync = (dir_path, cb) => {
  const items = dir_path.split(path.sep)

  let index = 1

  console.log(items.length, 1)

  const next = () => {
    if (index > items.length) return cb && cb()

    let current = items.slice(0, index++).join(path.sep)

    fs.access(current, err => {
      if (err) {
        fs.mkdir(current, next)
      } else {
        next()
      }
    })
  }

  next()
}

// makeDirAsync('c/b/a', () => {
//   console.log('create success')
// })

const access = util.promisify(fs.access)
const mkdir = util.promisify(fs.mkdir)

const makeDirAsyncWithPromise = async (dir_path, cb) => {
  const items = dir_path.split(path.sep)

  for (let i = 1; i <= items.length; i++) {
    const current = items.slice(0, i).join('/')

    try {
      await access(current)
    } catch (error) {
      await mkdir(current)
    }
  }

  cb && cb()
}

makeDirAsyncWithPromise('b/c/d')
