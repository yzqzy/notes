# 核心模块

## path

`node.js` 内置模块，可以使用 require 导入并使用，用来处理文件/目录的路径。

比如提取文件路径、后缀，资源路径拼接等。

### 常用 API 介绍

* `basename()` 获取路径中基础名称
* `dirname()` 获取路径中目录名称
* `extname()` 获取路径中扩展名称
* `isAbsolute()` 获取路径是否为绝对路径
* `join()` 拼接多个路径判断
* `resolve()` 返回绝对路径
* `parse()` 解析路径
* `format()` 序列化路径
* `normalize()` 规范化路径

### 代码案例

获取路径基础名称

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
console.log(path.basename('/a/b/c/')) // c
```



获取路径目录名（路径）

```js
// 返回路径中最后一个部分的上一层目录所在路径
console.log(path.dirname(__filename)) // D:\workspace\notes\node\core_module\_path

console.log(path.dirname('/a/b/c')) // /a/b
console.log(path.dirname('/a/b/c/')) // /a/b
```



获取路径扩展名

```js
console.log(path.extname(__filename)) // .js
console.log(path.extname('/a/b/c')) // 空字符串

// 匹配最后一个 . 出现的位置，然后返回 “.” 到结尾的内容
console.log(path.extname('/a/b/index.html.js.css')) // .css
console.log(path.extname('/a/b/index.html.js.')) // .
```

