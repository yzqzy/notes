// type Padding = number | string

// function padLeft(padding: Padding, input: string): string {
//   // ...
// }

// let x: number | string = 1
// x = 'Hello'

// ---------------------------

// function padLeft(padding: number | string, input: string) {
//   return new Array(padding + 1).join(' ') + input
//   // 运算符“+”不能应用于类型“string | number”和“number”。
// }

function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input
  }
  return padding + input
}
