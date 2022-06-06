// 导出
export const a = 1

// 批量导出
const b = 2
const c = 3
export { b, c }

// 导出接口
export interface P {
  x: number
  y: number
}

// 导出函数
export function f() {}

// 导出时起别名
function g() {}
export { g as G }

// 默认导出，无需函数函数名
export default function() {
  console.log('default')
}

// 引入外部模块，重新导出
export { str as hello } from './b'
