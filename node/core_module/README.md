# node.js 核心模块

## path

### 基本概念

`node.js` 内置模块，可以使用 require 导入并使用，用来处理文件/目录的路径。

比如提取文件路径、后缀，资源路径拼接等。

### 常用 API 介绍

* `basename()` 获取路径中基础名称
* `dirname()` 获取路径中目录名称
* `extname()` 获取路径中扩展名称
* `isAbsolute()` 获取路径是否为绝对路径
* `join()` 拼接多个路径片段
* `resolve()` 返回绝对路径
* `parse()` 解析路径
* `format()` 序列化路径
* `normalize()` 规范化路径

### 案例分析

#### 获取路径基础名称

```js
console.log(__filename) // D:\workspace\notes\node\core_module\_path\index.js
console.log(path.basename(__filename)) // index.js

// 支持传入第二个参数，表示扩展名，如果没有设置返回完整文件名称带后缀
// 第二个参数作为后缀时，如果匹配，不会返回该后缀
console.log(path.basename(__filename, '.js')) // index
console.log(path.basename(__filename, '.ts')) // index.js

// basename 同样可以用来解析文件夹路径
console.log(path.basename('/a/b/c')) // c
// 如果目录中存在路径分隔符，会忽略掉
console.log(path.basename('/a/b/c/')) // 
```

#### 获取路径目录名（路径）

```js
// 返回路径中最后一个部分的上一层目录所在路径
console.log(path.dirname(__filename)) // D:\workspace\notes\node\core_module\_path

console.log(path.dirname('/a/b/c')) // /a/b
console.log(path.dirname('/a/b/c/')) // /a/b
```

#### 获取路径扩展名

```js
console.log(path.extname(__filename)) // .js
console.log(path.extname('/a/b/c')) // 空字符串

// 匹配最后一个 . 出现的位置，然后返回 “.” 到结尾的内容
console.log(path.extname('/a/b/index.html.js.css')) // .css
console.log(path.extname('/a/b/index.html.js.')) // .
```

#### 解析路径

```js
console.log(path.parse('/a/b/c/index.html'))
// {
//   root: '/',
//   dir: '/a/b/c',
//   base: 'index.html',
//   ext: '.html',
//   name: 'index'
// }

console.log(path.parse('/a/b/c'))
// { root: '/', dir: '/a/b', base: 'c', ext: '', name: 'c' }
console.log(path.parse('/a/b/c/'))
// 路径结尾分隔符会被忽略
// { root: '/', dir: '/a/b', base: 'c', ext: '', name: 'c' }

console.log(path.parse('./a/b/c/'))
// { root: '', dir: './a/b', base: 'c', ext: '', name: 'c' }
```

#### 序列化路径

```js
console.log(path.format(path.parse('./a/b/c/'))) // ./a/b\c
```

#### 判断当前路径是否为绝对路径

```js
console.log(path.isAbsolute('foo')) // false
console.log(path.isAbsolute('/foo')) // true
console.log(path.isAbsolute('///foo')) // true

console.log(path.isAbsolute('')) // false
console.log(path.isAbsolute('.')) // false
console.log(path.isAbsolute('../bar')) // false
```

#### 拼接路径

```js
console.log(path.join('a/b', 'c', 'index.html')) // a\b\c\index.html
console.log(path.join('/a/b', 'c', 'index.html')) // \a\b\c\index.html

console.log(path.join('/a/b', 'c', '../', 'index.html')) // \a\b\index.html
console.log(path.join('/a/b', 'c', './', 'index.html')) // \a\b\c\index.html
console.log(path.join('/a/b', 'c', '', 'index.html')) // \a\b\c\index.html
```

#### 规范化路径

```js
console.log(path.normalize('a/b/c/d')) // a\b\c\d
console.log(path.normalize('a////b/c../d')) // a\b\c..\d
console.log(path.normalize('a//\\//b/c\\/d')) // a\b\c\d
console.log(path.normalize('a//\\\b/c\\/d')) // a\c\d
console.log(path.normalize('')) // .
```

#### 返回绝对路径

```js
console.log(path.resolve('')) // D:\workspace\notes
console.log(path.resolve('a', 'b')) // D:\workspace\notes\a\b

// resolve([from], to)
// 如果传入多个参数，不要在第二个参数前面添加路径分隔符
console.log(path.resolve('a', '/b')) // D:\b
console.log(path.resolve('/a', '/b')) // D:\b
console.log(path.resolve('/a', 'b')) // D:\a\b
console.log(path.resolve('/a', '../b')) // D:\b

// 正常用法
console.log(path.resolve('index.html')) // D:\workspace\notes\index.html
```

[代码地址](https://github.com/yw0525/notes/tree/master/node/core_module/_path/index.js)

## buffer

### 基本概念

Buffer 是 `node.js` 中除 `process` 之外，另外一个非常重要的全局变量，通常我们称之为 Buffer 缓冲区。

Buffer 可以让 JavaScript 操作二进制数据。

JavaScript 语言起初服务于浏览器平台，  Node.js 的出现让我们可以在服务端直接使用 js 进行编程。

我们可以采用 JavaScript 实现 IO 操作，例如文件读写，网络服务中数据传输，在这个过程中我们就使用到了 Buffer。

对于计算机来说，最终都是处理二进制数据，即 IO 行为操作的就是二进制数据。

Stream 流操作并非 `node.js` 独创的概念，可以用于存储数据，分段处理。当我们进行大数据传输时，就可以使用流操作，这样就可以避免因为操作数据内存过大，出现将内存短时间内占满的情况。

当我们使用流操作配置管道技术，就可以将流中的数据，一段一段的传给下一个端，这样就可以完成大数据传输。例如，当我们观看在线视频时，都是边下载边看的过程。

**流操作配合管道可以实现数据分段传输。**

数据的端到端传输会有生产者和消费者，中间可以使用流和管道进行数据连接。当进行数据传输时，总会存在等待的过程，等待时的数据就可以存放在 Buffer 中。

**在 `node.js` 中Buffer 就是一片内存空间，Buffer 属于 V8 之外的空间，不占据 V8 堆内存大小。**

Buffer 的内存申请不是由 node 来完成的，在使用它的空间分配可以由我们的 js 代码来控制。因此在空间回收时，它还是由 V8 的 `GC` 进行数据的管理和回收。

### 特性

* 无须 require， Buffer 是全局变量；
* 实现 `node.js` 平台下的二进制数据操作；
* 不占据 V8 堆内存大小，直接由 C++ 进行内存分配；
* 内存使用由 Node 来控制，由 V8 的 `GC` 回收；
* 一般匹配 Stream 流来使用，充当数据缓存区（例如文件读写操作）。

### 创建 Buffer

创建 Buffer 实例：

* `alloc`：创建指定字节大小的 buffer
* `allocUnsafe`：创建指定字节大小的 buffer（不安全）
* `form`：接收数据，创建 buffer

Node.js `v6` 版本之前我们可以通过 new 操作实例化 buffer 对象，但是这种操作由于给对象实例权限太大，后续在高版本的 Node.js 进行处理，并不建议直接对 Buffer 进行实例化操作。

#### alloc

```js
const b1 = Buffer.alloc(10)
// 16 进制数据
console.log(b1) // <Buffer 00 00 00 00 00 00 00 00 00 00>

const b2 = Buffer.allocUnsafe(10)
// 可能存在未回收的空间用来创建新空间
console.log(b2) // <Buffer 08 00 00 00 00 00 00 00 00 00> 
```

#### from

```js
// 第一个参数可以接收三种类型，分别是字符串类型、数组类型、或者 buffer 类型
// 第二个参数是字符编码，默认是 utf-8
const b1 = Buffer.from('1')
console.log(b1) // <Buffer 31>

const b2 = Buffer.from('中')
console.log(b2) // <Buffer e4 b8 ad>
console.log(b2.toString()) // 中

const b3 = Buffer.from([1, 2, 3])
console.log(b3) // <Buffer 01 02 03>

const b4 = Buffer.from([1, 2, '中'], 'utf-8')
// 对于数组类型，如果我们想要使用中文，需要事先把中文转成十六进制数字
console.log(b4) // <Buffer 01 02 00>

const b5 = Buffer.from([0xe4, 0xb8, 0xad], 'utf-8')
// 对于数组类型，如果我们想要使用中文，需要事先把中文转成十六进制数字
console.log(b5) //<Buffer e4 b8 ad>
console.log(b5.toString()) // 中

const b6 = Buffer.from([0x60, 0b1001, 12])
console.log(b6) // <Buffer 60 09 0c>
console.log(b6.toString()) // `

const b7 = Buffer.alloc(3)
const b8 = Buffer.from(b7)
console.log(b7) // <Buffer 00 00 00>
console.log(b8) // <Buffer 00 00 00>

b7[0] = 1
// from 使用 buffer 类型，并不是共享空间，而是利用原有长度创建新空间
console.log(b7) // <Buffer 01 00 00>
console.log(b8) // <Buffer 00 00 00>
```

### Buffer 实例方法

* `fill`：使用数据填充 buffer
* `write`：向 buffer 中写入数据
* `toString`：从 buffer  中提取数据
* `slice`：截取 buffer
* `indexOf`：在 buffer 中查找数据
* `copy`：拷贝 buffer 中的数据

#### fill

 ```js
 const buffer = Buffer.alloc(6)
 
 // 将给定数据填充到 buffer 中
 // 如果给定数据不能全部填充，这时会将数据反复填充
 buffer.fill('123')
 
 console.log(buffer) // <Buffer 31 32 33 31 32 33>
 console.log(buffer.toString()) // 123123
 ```

```js
const buffer = Buffer.alloc(6)

// 如果填充数据超出最大长度，会截断
buffer.fill('123456789')
console.log(buffer) // <Buffer 31 32 33 34 35 36>
console.log(buffer.toString()) // 123
```

```js
const buffer = Buffer.alloc(6)

// fill 第二个参数代表起始位置
buffer.fill('123', 1)
console.log(buffer) // <Buffer 00 31 32 33 31 32>
console.log(buffer.toString()) // 12312
```

```js
const buffer = Buffer.alloc(6)

// fill 第三个参数代表结束位置
buffer.fill('123', 1, 3)
console.log(buffer) // <Buffer 00 31 32 00 00 00>
console.log(buffer.toString()) // 12
```

```js
const buffer = Buffer.alloc(6)

// 7b (16 进制)
buffer.fill(123)
console.log(buffer) // <Buffer 7b 7b 7b 7b 7b 7b>
console.log(buffer.toString()) // {{{{{{
```

#### write

```js
const buffer = Buffer.alloc(6)

// 和 fill 不同点在于不会重复写入数据
buffer.write('123')

console.log(buffer) // <Buffer 31 32 33 00 00 00>
console.log(buffer.toString()) // 123
```

```js
const buffer = Buffer.alloc(6)

// 第二个参数代表从 buffer 哪个位置开始写入
// 第三个参数代表当前要写入的长度
buffer.write('123', 1, 2)

console.log(buffer) // <Buffer 00 31 32 00 00 00>
console.log(buffer.toString()) // 12
```

#### toString

以我们指定的编码格式从 buffer 中提取相应的数据。

```js
const buffer = Buffer.from('月落')

console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
console.log(buffer.toString()) // 月落
```

```js
const buffer = Buffer.from('月落')

console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
console.log(buffer.toString('utf-8')) // 月落
```

```js
const buffer = Buffer.from('月落')

console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
// utf-8 编码值，一个汉字三个子节
console.log(buffer.toString('utf-8', 3)) // 落
```

```js
const buffer = Buffer.from('月落')

console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
console.log(buffer.toString('utf-8', 3, 9)) // 落
```

#### slice

可以传入起始位置和结束位置，支持正数和负数。

```js
const buffer1 = Buffer.from('月落')
console.log(buffer1) // <Buffer e6 9c 88 e8 90 bd>
console.log(buffer1.toString()) // 月落

const buffer2 = buffer1.slice()
console.log(buffer2) // <Buffer e6 9c 88 e8 90 bd>
console.log(buffer2.toString()) // 月落

const buffer3 = buffer1.slice(3)
console.log(buffer3) // <Buffer e8 90 bd>
console.log(buffer3.toString()) // 落

const buffer4 = buffer1.slice(-6)
console.log(buffer4) // <Buffer e6 9c 88 e8 90 bd>
console.log(buffer4.toString()) // 月落
```

#### indexOf

在 buffer 中查找目标数据。

```js
const buffer = Buffer.from('月落月落月落')
console.log(buffer) // <Buffer e6 9c 88 e8 90 bd e6 9c 88 e8 90 bd e6 9c 88 e8 90 bd>
console.log(buffer.toString()) // 月落月落月落

console.log(buffer.indexOf('月')) // 0
console.log(buffer.indexOf('月', 3)) // 6

console.log(buffer.indexOf('月H', 3)) // -1
```

#### copy

拷贝 buffer 数据。

```js
const buffer1 = Buffer.from('月落')
const buffer2 = Buffer.alloc(6)

// 将 buufer1 的数据拷贝到 buffer2 中
buffer1.copy(buffer2)

console.log(buffer1.toString()) // 月落
console.log(buffer2.toString()) // 月落
```

```js
const buffer1 = Buffer.from('月落')
const buffer2 = Buffer.alloc(6)

// 第二个参数代表需要填充的起始位置
buffer1.copy(buffer2, 3)

console.log(buffer1.toString()) // 月落
console.log(buffer2.toString()) // 月
```

```js
const buffer1 = Buffer.from('月落')
const buffer2 = Buffer.alloc(6)

// 第三个参数代表原数据的开始读取位置
buffer1.copy(buffer2, 3, 3)

console.log(buffer1.toString()) // 月落
console.log(buffer2.toString()) // 落
```

```js
const buffer1 = Buffer.from('月落')
const buffer2 = Buffer.alloc(6)

// 第四个参数代表原数据的结束读取位置
buffer1.copy(buffer2, 3, 3, 6)

console.log(buffer1.toString()) // 月落
console.log(buffer2.toString()) // 落
```

```js
const buffer1 = Buffer.from('月落月落')
const buffer2 = Buffer.alloc(9)

// 第四个参数代表原数据的结束读取位置
buffer1.copy(buffer2, 3, 3, 9)

console.log(buffer1.toString()) // 月落月落
console.log(buffer2.toString()) // 落月
```

### Buffer 静态方法

* `concat`：将多个 buffer 拼接成一个新的 buffer
* `isBuffer`：判断当前数据是否为 buffer

#### concat

```js
const buffer1 = Buffer.from('月落')
const buffer2 = Buffer.from(' heora')

const buffer3 = Buffer.concat([buffer1, buffer2])

console.log(buffer3) // <Buffer e6 9c 88 e8 90 bd 20 68 65 6f 72 61>
console.log(buffer3.toString()) // 月落 heora
```

```js
const buffer1 = Buffer.from('月落')
const buffer2 = Buffer.from(' heora')

// 可以使用第二个参数限制 buffer 长度
const buffer3 = Buffer.concat([buffer1, buffer2], 9)

console.log(buffer3) // <Buffer e6 9c 88 e8 90 bd 20 68 65>
console.log(buffer3.toString()) // 月落 he
```

#### isBuffer

```js
const buffer1 = Buffer.alloc(3)
console.log(Buffer.isBuffer(buffer1)) // true

const buffer2 = 3
console.log(Buffer.isBuffer(buffer2)) // false
```

### Buffer 拆分 - 自定义 split

Buffer 的长度是固定的，当 Buffer 创建后，长度是无法被修改的。 

```js
Buffer.prototype.split = function (sep) {
  const len = Buffer.from(sep).length
  const ans = []

  let start = 0
  let offset = 0

  while ((offset = this.indexOf(sep, start)) !== -1) {
    ans.push(this.slice(start, offset))
    start = offset + len
  }

  ans.push(this.slice(start))

  return ans
}
```

```js
const buffer = Buffer.from('月落爱学习爱工作爱骑行爱健身爱')

const bufferArr = buffer.split('爱')

console.log(bufferArr)
// [
//   <Buffer e6 9c 88 e8 90 bd>,
//   <Buffer e5 ad a6 e4 b9 a0>,
//   <Buffer e5 b7 a5 e4 bd 9c>,
//   <Buffer e9 aa 91 e8 a1 8c>,
//   <Buffer e5 81 a5 e8 ba ab>,
//   <Buffer >
// ]

console.log(bufferArr.map(buf => buf.toString())) // [ '月落', '学习', '工作', '骑行', '健身', '' ]
```

[代码地址](https://github.com/yw0525/notes/tree/master/node/core_module/_buffer/index.js)

## fs

### 基本概念

Node.js 中存在 Buffer 和 Stream 两个非常重要的概念，一个缓冲区，一个是数据流。

Buffer、Stream、FS 关系：

* Buffer 和 Stream 操作的是二进制数据。
* FS 是内置核心模块，提供文件系统操作的 API。 如果我们想要操作文件中的二进制数据，就需要使用 FS 提供的 API。

### 模块结构

<img src="./images/fs.png" />

### 前置知识

**权限位**

用户对于文件所具备的操作权限。

<img src="./images/permission.png" style="zoom: 80%" />

上图代表满级权限 777。

**标识位**

Node.js 中 flag 表示对文件的操作方式。

* r：表示可读
* w：表示可写
* s：表示同步
* +：表示执行相反操作
* x：表示排它操作
* a：表示追加操作

**文件操作符**

fd 即操作系统分配给被打开文件的标识。

### 文件操作

#### 常用 API

Node.js 中 fs 任意 API 都有同步和异步两种操作方式。

* readFile：从指定文件中读取数据
* writeFile：向指定文件中写入数据
* appendFile：以追加的方式向指定文件中写入数据
* copyFile：将某个文件中的数据拷贝至另一文件
* watchFile：对指定文件进行监控

```js
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
```



#### 文件打开与关闭

readFile、writeFile 都是将文件中内容一次性全部读取或者写入到内存中，这种方式对于大体积的文件来讲是不合理的。

因此我们需要一种边读边写或者编写边读的操作方式。

我们需要将文件打开，写入，关闭看作是独立的环节，这也是我们为什么要使用 open 和 close。

```js
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
```

#### 大文件读写操作

```js
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
```

#### 文件拷贝自定义实现

Node.js 已经提供 `copyFile` API，不过这个 API 是基于 `writeFile` 和 `readFile` 的一次性读写操作，针对大体积文件是不合适的。

简单案例

```js
const fs = require('fs')
const path = require('path')

const data_file = path.resolve(__dirname, 'a.txt')
const dest_file = path.resolve(__dirname, 'b.txt')

const buffer = Buffer.alloc(10)

// 1. 打开指定文件，读取内容
fs.open(data_file, 'r', (err, rfd) => {
  // 2. 打开目标文件，用于执行数据写入操作
  fs.open(dest_file, 'w', (err, wfd) => {
    // 3. 从打开文件中读取数据
    fs.read(rfd, buffer, 0, 10, 0, (err, readBytes) => {
      // 4. 将 buffer 中数据写入到目标文件中
      fs.write(wfd, buffer, 0, 10, 0, (err, wriiten) => {
        console.log('write success')
      })
    })
  })
})
```

代码封装

```js
// 文件拷贝
function copyFile(origin, target, size) {
  const buffer = Buffer.alloc(size)

  let readOffset = 0

  fs.open(origin, 'r', (err, rfd) => {
    fs.open(target, 'w', (err, wfd) => {
      const next = () => {
        fs.read(rfd, buffer, 0, size, readOffset, (err, readBytes) => {
          if (!readBytes) {
            fs.close(rfd, () => {})
            fs.close(wfd, () => {})
            console.log('copy success')
            return
          }

          readOffset += readBytes

          fs.write(wfd, buffer, 0, readBytes, (err, wriiten) => {
            next()
          })
        })
      }
      next()
    })
  })
}

copyFile(data_file, dest_file, 20)
```

除了这种方式，我们还可以通过流的方式去操作大文件。

### 目录操作 

#### 常用 API

* access：判断文件或目录是否具有操作权限
* stat：获取目录及文件信息
* mkdir：创建目录
* rmdir：删除目录
* readdir：读取目录中内容
* unlink：删除指定文件

```js
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
```

#### 创建目录

> 模拟 API 实现

**同步方法**

```js
// 递归创建目录
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
```

**异步方法**

```js
// 异步处理 1

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

makeDirAsync('c/b/a', () => {
  console.log('create success')
})
```

```js
// 异步处理 2

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
```

#### 删除目录

> 模拟 API 实现

```js
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
```

## 模块化相关

### 为什么需要模块化

**传统开发常见问题**

* 命名冲突和污染
* 代码冗余，无效请求多
* 文件间的依赖关系复杂

项目难以维护不方便复用。

**模块与模块化**

模块就是小而精且利于维护的代码片段。

模块化开发就是对这些代码片段进行组合使用，从而完成业务逻辑。

**模块化历程**

早期利用函数、对象、自执行函数实现分块。

模块化规范：

* Commonjs 规范
  * 规定每个 js 文件都是一个模块，且每个模块都有自己的作用域
  * 模块内部可以使用变量、函数、类等，都是内部私有，外部无法访问
  * 提供 `module.exports` 、`exports` 方式导出变量，使用 `require` 进行加载
  * Node.js 就是使用的 Commonjs  规范
    * Commonjs 规范是一个超集，是语言层面上的规范，类似于 ECMAScript 规范
    * 模块化规范只是其中一种，它还定义了 IO 流、二进制操作，或者 Buffer 规范等
    * Commonjs 规范模块加载都是同步完成的，并不适用于浏览器，因此后面又出现 AMD 异步加载规范
* AMD
  * 提供  `define`、`require`  关键字
  * 经典实现就是 RequireJS
* CMD 规范
  * 整合 Commonjs 和 AMD 特点，专门用来实现浏览器异步加载
  * 最经典的就是 CJS
* ES Moudle 规范
  * 15 年 TC39 发布，即 ESM
  * 正式将模块化纳入到规范中，支持导入导出

模块化规范是前端走向工程化的一环。早期 JavaScript 语言层面并没有模块化规范。

最早都是由程序员自己利用函数、对象、自执行函数实现代码分块管理。

然后经过社区或者个人推动，产出 Commonjs，AMD，CMD，UMD 等模块化规范。分别有自己的特点和优势。

最后在 ES6 中将模块化纳入标准规范。当前常用规范就是 Commonjs 和 ES Module。

### Commonjs 规范

