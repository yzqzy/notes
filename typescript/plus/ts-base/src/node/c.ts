const c1 = require('./a')
const c2 = require('./b')

import c4 from '../es6/d'

console.log('-- commonjs module start --')

console.log(c1)
console.log(c2)

c4();

console.log('-- commonjs module end --')
