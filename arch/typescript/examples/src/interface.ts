// interface Point {
//   x: number
//   y: number
// }

// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x)
//   console.log("The coordinate's y value is " + pt.y)
// }

// printCoord({ x: 100, y: 100 })

// ------------------------------------

// interface Animal {
//   name: string
// }

// interface Bear extends Animal {
//  honey: boolean
// }

// const bear = getBear()

// bear.name
// bear.honey

type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}

const bear = getBear()

bear.name
bear.honey
