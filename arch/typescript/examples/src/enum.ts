// enum Direction {
//   Up = 1,
//   Down,
//   Left,
//   Right
// }

// console.log(Direction.Up) // 1

// console.log(Direction[Direction.Up]) // Up

// enum BooleanLikeHeterogeneousEnum {
//   No = 0,
//   Yes = 'YES'
// }

// ---------------------

enum E {
  X,
  Y,
  Z
}

function f(obj: { X: number }) {
  return obj.X
}

console.log(f(E)) // 0
console.log(E[E.X]) // X
