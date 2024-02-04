const core = require('../build/Release/core')

console.log(core.hello()) // hello world

// -------------------------------

let sum = 0

sum = core.add(2.5, 3)
console.log(sum) // 5

sum = core.doubleAdd(2.3, 3)
console.log(sum) // 5.3
sum = core.doubleAdd(0.1, 0.2)
console.log(sum) // 0.30000000000000004

// -------------------------------
