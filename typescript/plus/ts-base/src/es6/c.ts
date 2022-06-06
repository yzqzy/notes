// 批量导入
import { a, b, c } from './a'
// 导入接口
import { P } from './a'
// 导入时起别名
import { f as F } from './a'
// 导入模块的所有成员，绑定到 All 上
import * as All from './a'
// 不加 {}，导入默认
import defaultFunction from './a'

console.log('-- es6 module start --')

console.log(a, b, c)

const p: P = {
  x: 1,
  y: 2
}

console.log(F)

console.log(All)

defaultFunction()

console.log('-- es6 module end --')
