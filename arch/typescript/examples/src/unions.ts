// interface Shape {
//   kind: 'circle' | 'square'
//   radius?: number
//   sideLength: number
// }

// function getArea(shape: Shape) {
//   return Math.PI * shape.radius ** 2
// }

// function getArea(shape: Shape) {
//   if (shape.kind === 'circle') {
//     return Math.PI * shape.radius ** 2
//   }
// }

// function getArea(shape: Shape) {
//   if (shape.kind === 'circle') {
//     return Math.PI * shape.radius! ** 2
//   }
// }

// ----------------------

interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'quare'
  sideLength: number
}

type Shape = Circle | Square

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    // Narrowing
    return Math.PI * shape.radius ** 2
  }
}
