const fs = require('fs')
const vm = require('vm')

const content = fs.readFileSync('test.txt', 'utf-8')

// 1. evea
eval(content)
console.log(age)
// eval 可以执行字符串形式代码，但是如果当前文件中还存在另一个 age 变量，就会报错

// 2. new Function
const fn = new Function('age', 'return age + 1')
console.log(fn(age))
// 使用 new Function 也可以执行字符串形式的代码，但是操作比较繁琐

// 3. vm
vm.runInThisContext(content)
console.log(age)
// 当我们使用 runInThisContext 方式运行代码时，函数内部环境和外部是隔离的
// 不能使用局部变量（const、let），可以使用全局变量
// 如果当前文件中存在 age 变量，不会产生冲突
