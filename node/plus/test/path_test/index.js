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