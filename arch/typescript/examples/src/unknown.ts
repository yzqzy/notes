// let x: unknown = 1

// x = true

// let y: string = x // 不能将类型“unknown”分配给类型“string”。

// ----------------------------------------

// function greet(name: string): number {
//   console.log(`Hello, ${name.toUpperCase()} !!`)
// }
// greet(42) // Error

// let x: string = greet('omg') // Error

// ----------------------------------------

// const names = ['Alice', 'Bob', 'Eve']
// names.forEach(s => {
//   console.log(s.toUpperCase()) //
// })

function print(arg1: string, arg2?: string) {
  console.log(arg1, arg2)
}

print('hello', 'world')
print('hello')
