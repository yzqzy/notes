const path = require('path')

// 1. 获取路径基础名称
console.log(__filename) // D:\workspace\notes\node\core_module\_path\index.js
console.log(path.basename(__filename)) // index.js

// 支持传入第二个参数，表示扩展名，如果没有设置返回完整文件名称带后缀
// 第二个参数作为后缀时，如果匹配，不会返回该后缀
console.log(path.basename(__filename, '.js')) // index
console.log(path.basename(__filename, '.ts')) // index.js

// basename 同样可以用来解析文件夹路径
console.log(path.basename('/a/b/c')) // c
// 如果目录中存在路径分隔符，会忽略掉
console.log(path.basename('/a/b/c/')) // c

console.log('---------------------------------------------------------------------')

// 2. 获取路径目录名（路径）
// 返回路径中最后一个部分的上一层目录所在路径
console.log(path.dirname(__filename)) // D:\workspace\notes\node\core_module\_path

console.log(path.dirname('/a/b/c')) // /a/b
console.log(path.dirname('/a/b/c/')) // /a/b

console.log('---------------------------------------------------------------------')

// 3. 获取路径扩展名
console.log(path.extname(__filename)) // .js
console.log(path.extname('/a/b/c')) // 空字符串

// 匹配最后一个 . 出现的位置，然后返回 “.” 到结尾的内容
console.log(path.extname('/a/b/index.html.js.css')) // .css
console.log(path.extname('/a/b/index.html.js.')) // .

console.log('---------------------------------------------------------------------')

// 4. 解析路径
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

console.log('---------------------------------------------------------------------')

// 5. 序列化路径
console.log(path.format(path.parse('./a/b/c/'))) // ./a/b\c

console.log('---------------------------------------------------------------------')

// 6. 判断当前路径是否为绝对路径
console.log(path.isAbsolute('foo')) // false
console.log(path.isAbsolute('/foo')) // true
console.log(path.isAbsolute('///foo')) // true

console.log(path.isAbsolute('')) // false
console.log(path.isAbsolute('.')) // false
console.log(path.isAbsolute('../bar')) // false

console.log('---------------------------------------------------------------------')

// 7. 拼接路径
console.log(path.join('a/b', 'c', 'index.html')) // a\b\c\index.html
console.log(path.join('/a/b', 'c', 'index.html')) // \a\b\c\index.html

console.log(path.join('/a/b', 'c', '../', 'index.html')) // \a\b\index.html
console.log(path.join('/a/b', 'c', './', 'index.html')) // \a\b\c\index.html
console.log(path.join('/a/b', 'c', '', 'index.html')) // \a\b\c\index.html
console.log(path.join('')) // .

console.log('---------------------------------------------------------------------')

// 8. 规范化路径
console.log(path.normalize('a/b/c/d')) // a\b\c\d
console.log(path.normalize('a////b/c../d')) // a\b\c..\d
console.log(path.normalize('a//\\//b/c\\/d')) // a\b\c\d
console.log(path.normalize('a//\\\b/c\\/d')) // a\c\d
console.log(path.normalize('')) // .

console.log('---------------------------------------------------------------------')

// 9. 返回绝对路径
console.log(path.resolve('')) // D:\workspace\notes
console.log(path.resolve('a', 'b')) // D:\workspace\notes\a\b

// resolve([from], to)
// 如果传入多个参数，不要在第二个参数前面添加路径分隔符
console.log(path.resolve('a', '/b')) // D:\b
console.log(path.resolve('/a', '/b')) // D:\b
console.log(path.resolve('/a', 'b')) // D:\a\b
console.log(path.resolve('/a', '../b')) // D:\b
console.log(path.resolve('/a', './b')) // D:\a\b

// 正常用法
console.log(path.resolve('index.html')) // D:\workspace\notes\index.html
