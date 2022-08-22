import { name, age } from './module.mjs'

console.log(name, age)

import fs from 'fs'

const md = fs.readFileSync('README.md')
console.log(md.toString())


import _ from 'lodash'
console.log(_.camelCase('ES Module'))


// import { camelCase } from 'lodash'
// console.log(camelCase('ES Module'))
// SyntaxError: Named export 'camelCase' not found. The requested module 'lodash' is a CommonJS module, which may not support all module.exports as named exports.


const { readFileSync } = fs

const readme = readFileSync('README.md')
console.log(readme.toString())