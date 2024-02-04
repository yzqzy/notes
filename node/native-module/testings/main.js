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

core.callback(msg => {
  console.log('callback called:', msg)
})

// -------------------------------

const stu01 = core.createObject('heora', 25)
const stu02 = core.createObject('yzqzy', 25)

console.log(stu01.name, stu01.age, typeof stu01.age) // heora 25 number
console.log(stu02.name, stu02.age, typeof stu02.age) // yzqzy 25 number
console.log(stu01.age + stu02.age) // 50

// -------------------------------
