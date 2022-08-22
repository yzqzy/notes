// import { name, age } from './module.js'

// console.log(name, age)

// setTimeout(() => {
//   console.log(name, age)

//   age = 34
// }, 2000)


// import { name, age } from './module'
// console.log(name, age)


// import { name, age } from 'module.js'
// console.log(name, age)


// import { name, age } from './module.js'
// console.log(name, age)
// import { name, age } from '/ecma_script/module/module.js'
// console.log(name, age)
// import { name, age } from 'http://127.0.0.1:5500/ecma_script/module/module.js'
// console.log(name, age)


// import { } from './module.js'
// import './module.js'


// import * as module from './module.js'
// console.log(module.name, module.age)


// var modulePath = './module.js'
// import { name } from modulePath

// if (true) {
//   import { name } from './module.js'
// }

// var modulePath = './module.js'
// import(modulePath).then(modue => {
//   console.log(modue)
// })


// import { name, age, default as title } from './module.js'
// console.log(name, age, title)
import title, { name, age } from './module.js'
console.log(name, age, title)
