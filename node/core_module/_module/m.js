const age = 24

const addFn = (x, y) => x + y

// module.exports = {
//   age,
//   addFn
// }

// 2. module
console.log(module)
// Module {
//   id: '/usr/local/workspace/notes/node/core_module/_module/m.js',
//   path: '/usr/local/workspace/notes/node/core_module/_module',
//   exports: { age: 24, addFn: [Function: addFn] },
//   filename: '/usr/local/workspace/notes/node/core_module/_module/m.js',
//   loaded: false,
//   children: [],
//   paths: [
//     '/usr/local/workspace/notes/node/core_module/_module/node_modules',
//     '/usr/local/workspace/notes/node/core_module/node_modules',
//     '/usr/local/workspace/notes/node/node_modules',
//     '/usr/local/workspace/notes/node_modules',
//     '/usr/local/workspace/node_modules',
//     '/usr/local/node_modules',
//     '/usr/node_modules',
//     '/node_modules'
//   ]
// }

// 3. exports
exports.age = age
exports.addFn = addFn

// 注意，不能能给 epxorts 直接赋值，这样赋值会导致 exports 和 module.exports 引用关系丢失
// exports = {
//   age: 13,
//   name: 'heora'
// }

// 4. 同步加载
const name = 'heora'
const time = new Date()

while (new Date() - time < 4000) {}

exports.name = name

console.log('m.js process')

// 5. 判断是否为主模块
console.log(require.main === module) // false
