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

// function padLeft(padding: number | string, input: string) {
//   if (typeof padding === 'number') {
//     return new Array(padding + 1).join(' ') + input
//   }
//   return padding + input
// }

// function printAll(strs: string | string[] | null) {
//   if (strs && typeof strs === 'object') {
//     for (const s of strs) {
//       // Object is possibly 'null'
//       console.log(s)
//     }
//   } else if (typeof strs === 'string') {
//     console.log(strs)
//   } else {
//     // do nothing
//   }
// }

// function multiplyAll(values: number[] | undefined, factor: number) {
//   if (!values) {
//     return values
//   }
//   return values.map(x => x * factor)
// }

// function example(x: string | number, y: string | boolean) {
//   if (x === y) {
//     // s is string
//   } else {
//     // x is string | number
//     // y is string | boolean
//   }
// }

function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === 'object') {
      for (const s of strs) {
      }
    } else if (typeof strs === 'string') {
    }
  }
}

interface Container {
  value: number | null | undefined
}

function multiplyValue(container: Container, factor: number) {
  if (container.value != null) {
    container.value *= factor
  }
}

type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}

function logValue(x: Date | string) {
  if (x instanceof Date) {
    // s is Date
  } else {
    // x is string
  }
}

let x = Math.random() < 0.5 ? 10 : 'hello world!'

function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input
  }
  return padding + input
}

function example() {
  let x: string | number | boolean

  x = Math.random() < 0.5
  // x = boolean

  if (Math.random() < 0.5) {
    x = 'Hello'
    // x:string
  } else {
    x = 100
    // x: number
  }

  return x
  // x: string | number
}
