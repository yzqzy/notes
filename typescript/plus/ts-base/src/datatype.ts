console.log('-- datatype start --')

// 原始类型
const bool: boolean = true
const num: number = 123
const str: string = 'abc'

// 数组
const arr: number[]  = [1, 2, 3]
const arr2: Array<number> = [1, 2, 3]
const arr3: Array<number | string> = [1, 2, 3, '4']

// 元组：特殊的数组，限定数组元素类型和个数
const tuple: [number, string] = [0, '1']
tuple.push(2); // 原则上不可以改变，允许 push 应该是一个TypeScript 的一个缺陷
console.log(tuple)// [0, '1', 2]
// console.log(tuple[2])// 无法越界访问

// 函数
const add = (x: number, y: number) => x + y 
const add2 = (x: number, y: number): number => x + y 
const compute: (x: number, y: number) => number = (a, b) => a + b

// 对象
const obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x  = 3

// symbol
const s1: Symbol = Symbol()
const s2 = Symbol()
console.log(s1 === s2) // false

// undefiend、null 无法赋值其他数据类型
// 官方定义，undefine、null 是任何类型的子类型，理论上可以赋值给其他类型（需要配置 tsconfig.json "strictNullChecks" 配置为 false）
const un: undefined = undefined
const nu: null = null
const num_nu: number | null = nu

// void
// js 中 void 是一种操作符，可以让任何表达式返回 undefined
// void 0 => undefiend，undefined 在 js 中并不是一个保留字，我们可以自定义 undefined 变量覆盖全局的 undefined
;(() => {
  var undefined = 0;
})();
console.log(undefined, '22222')
// 用 void 可以确保返回的值一定是 undefined
const noReturn = () => {}

// any
// ts 中如果不指定数据类型，默认就是 any 类型，非特殊情况不推荐使用 any 类型
let x

// never
// 永远不会存在返回值的类型
const error = () => {
  throw new Error('error')
}
const endless = () => {
  while(true) {}
}

console.log('-- datatype end --')
