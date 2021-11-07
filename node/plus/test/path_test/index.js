const path = require('path');

console.log(__filename); // D:\workspace\notes\node\plus\test\path_test\index.js

// 获取路径中基础名称
// 1. 返回路径中最后一部分（不区分文件或者目录）
// 2. 第二个参数表示扩展名，如果没有设置则返回完整的文件后缀名称带后缀
// 3. 第二个参数作为后缀时，如果没有在当前路径中被匹配到，会忽略后缀
// 4. 处理目录路径的时候，如果结尾存在路径分隔符，会忽略路径分隔符
console.log(path.basename(__filename)); // index.js
console.log(path.basename(__filename, '.js')); // index
console.log(path.basename(__filename, '.css')); // index.js
console.log(path.basename('/a/b/c')); // c
console.log(path.basename('/a/b/c/')); // c


// 获取路径目录名（路径）
// 1. 返回路径中最后一部分的上一层目录所在路径
// 2. 处理目录路径的时候，如果结尾存在路径分隔符，会忽略路径分隔符
console.log(path.dirname(__filename)); // D:\workspace\notes\node\plus\test\path_test
console.log(path.dirname('/a/b/c')); // /a/b
console.log(path.dirname('/a/b/c/')); // /a/b


// 获取路径扩展名
// 1. 返回路径中相应文件的后缀名
// 2. 如果路径中存在多个"."，返回最后一个点到结尾的位置
console.log(path.extname(__filename)); // .js
console.log(path.extname('/a/b')); // ""
console.log(path.extname('/a/b/')); // ""
console.log(path.extname('/a/b/index.html.js.css')); // .css
console.log(path.extname('/a/b/index.html.js.')); // .


// 解析路径
// 1. 接收路径，返回一个对象包含不同信息
// 2. root dir base ext name 
console.log(path.parse('/a/b/c/index.html')); // { root: '/', dir: '/a/b/c', base: 'index.html', ext: '.html', name: 'index' } 
console.log(path.parse('/a/b/c')); // { root: '/', dir: '/a/b', base: 'c', ext: '', name: 'c' }
console.log(path.parse('./a/b/c/')); // { root: '', dir: './a/b', base: 'c', ext: '', name: 'c' }


// 序列化路径
console.log(path.format(path.parse('./a/b/c'))); // ./a/b\c


// 判断当前路径是否为绝对路径
console.log(path.isAbsolute('foo')); // false
console.log(path.isAbsolute('/foo')); // true
console.log(path.isAbsolute('///foo')); // true
console.log(path.isAbsolute('')); // false
console.log(path.isAbsolute('.')); // false
console.log(path.isAbsolute('../bar')); // false


// 拼接路径
console.log(path.join('a/b', 'c', 'index.html')); // a\b\c\index.html
console.log(path.join('/a/b', 'c', 'index.html')); // \a\b\c\index.html
console.log(path.join('/a/b', 'c', '../', 'index.html')); // \a\b\index.html
console.log(path.join('/a/b', 'c', './', 'index.html')); // \a\b\c\index.html
console.log(path.join('/a/b', 'c', '', 'index.html')); // \a\b\c\index.html
console.log(path.join('')); // .


// 规范化路径
console.log(path.normalize('')); // .
console.log(path.normalize('a/b/c/d')); // a\b\c\d
console.log(path.normalize('a///b/c../d')); // a\b\c..\d
console.log(path.normalize('a//\\b/c\\/d')); // a\b\c\d
console.log(path.normalize('a//\\\b/c\\/d')); // a\c\d


// 返回绝对路径
console.log(path.resolve()); // D:\workspace\notes\node\plus\test\path_test
console.log(path.resolve('')); // D:\workspace\notes\node\plus\test\path_test
console.log(path.resolve('a', 'b')); // D:\workspace\notes\node\plus\test\path_test\a\b
console.log(path.resolve('a', '/b')); // D:\b
console.log(path.resolve('/a', '/b')); // D:\b
console.log(path.resolve('/a', 'b')); // D:\a\b
console.log(path.resolve('index.html')); // D:\workspace\notes\node\plus\test\path_test\index.html