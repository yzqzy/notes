const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}

Module._resolveFilename = function (filename) {
  const absPath = path.resolve(__dirname, filename)

  // 判断当前路径对应的内容是否存在
  if (fs.existsSync(absPath)) {
    // 如果条件成立，则说明 absPath 对应的内容是存在的
    return absPath
  }

  // 1. 源码中需要对文件进行 .js、.json、.node 补足然后判断，
  // 2. 如果补充完路径判断还不存在，会尝试将它当作目录，然后寻找 package.json 的 main 字段
  // 3. 如果 main 对应的文件也不存在，继续寻找 index，如果还不存在，会按照查找路径向上查找

  // 实际解析流程如上所述，这里仅处理文件的情况，尝试补全后缀进行读取
  const suffix = Object.keys(Module._extensions)

  for (let i = 0; i < suffix.length; i++) {
    const newPath = absPath + suffix[i]

    if (fs.existsSync(newPath)) {
      return newPath
    }
  }

  throw new Error(`${filename} is not exist`)
}

Module._extensions = {
  '.js'(module) {
    // 读取
    let content = fs.readFileSync(module.id, 'utf8')
    // 包装
    content = Module.wrapper[0] + content + Module.wrapper[1]

    // vm
    const compileFn = vm.runInThisContext(content)

    // 准备参数值
    let exports = module.exports
    let filename = module.id
    let dirname = path.dirname(module.id)

    // 调用函数
    compileFn.call(exports, exports, $require, module, filename, dirname)
  },
  '.json'(module) {
    module.exports = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
  }
}

Module.wrapper = ['(function (exports, require, module, __filename, __dirname) {', '})']

Module._cache = {}

Module.prototype.load = function () {
  const extname = path.extname(this.id)

  Module._extensions[extname](this)
}

const $require = filename => {
  // 1. 处理路径
  const modulePath = Module._resolveFilename(filename)

  // 2. 缓存优先
  const cacheModule = Module._cache[modulePath]

  if (cacheModule) return cacheModule.exports

  // 3. 创建空对象加载目标模块
  const module = new Module(modulePath)

  // 4. 缓存已加载过的模块
  Module._cache[modulePath] = module

  // 5. 编译执行过程
  module.load()

  // 6. 返回数据
  return module.exports
}

console.log($require('./data'))
console.log($require('./data02'))
