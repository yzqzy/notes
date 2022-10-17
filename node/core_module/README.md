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

[代码地址](https://github.com/yw0525/notes/tree/master/node/core_module/_path)

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







