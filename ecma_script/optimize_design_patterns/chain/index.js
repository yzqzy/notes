// const order = (orderType, isPay, count) => {
//   if (orderType === 1) {
//     // 充值 500
//     if (isPay) {
//       // 充值成功，100% 中奖
//       console.log('恭喜中奖 100 优惠券')
//     } else {
//       if (count > 0) {
//         console.log('恭喜中奖 10 优惠券')
//       } else {
//         console.log('很遗憾没有优惠券')
//       }
//     }
//   } else if (orderType === 2) {
//     // 充值 200
//     if (isPay) {
//       // 充值成功，100% 中奖
//       console.log('恭喜中奖 20 优惠券')
//     } else {
//       if (count > 0) {
//         console.log('恭喜中奖 10 优惠券')
//       } else {
//         console.log('很遗憾没有优惠券')
//       }
//     }
//   } else if (orderType === 3) {
//     if (count > 0) {
//       console.log('恭喜中奖 10 优惠券')
//     } else {
//       console.log('很遗憾没有优惠券')
//     }
//   }
// }

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// const order500 = (orderType, isPay, count) => {
//   if (orderType === 1 && isPay) {
//     console.log('恭喜中奖 100 优惠券')
//   } else {
//     order200(orderType, isPay, count)
//   }
// }

// const order200 = (orderType, isPay, count) => {
//   if (orderType === 2 && isPay) {
//     console.log('恭喜中奖 20 优惠券')
//   } else {
//     orderNormal(orderType, isPay, count)
//   }
// }

// const orderNormal = (orderType, isPay, count) => {
//   if (count > 0) {
//     console.log('恭喜中奖 10 优惠券')
//   } else {
//     console.log('很遗憾没有优惠券')
//   }
// }

// order500(1, false, 500)

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

const order500 = (orderType, isPay, count) => {
  if (orderType === 1 && isPay) {
    console.log('恭喜中奖 100 优惠券')
  } else {
    return 'next'
  }
}

const order200 = (orderType, isPay, count) => {
  if (orderType === 2 && isPay) {
    console.log('恭喜中奖 40 优惠券')
  } else {
    return 'next'
  }
}

const orderNormal = (orderType, isPay, count) => {
  if (count > 0) {
    console.log('恭喜中奖 10 优惠券')
  } else {
    console.log('很遗憾没有优惠券')
  }
}

class Chain {
  constructor(fn) {
    this.fn = fn
    this.next = null
  }

  setNext(nextChain) {
    this.next = nextChain
  }

  run() {
    const ans = this.fn.apply(this, arguments)

    if (ans === 'next' && this.next) {
      return this.next.run.apply(this.next, arguments)
    }

    return ans
  }
}

const chainOrder500 = new Chain(order500)
const chainOrder200 = new Chain(order200)
const chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNext(chainOrder200)
chainOrder200.setNext(chainOrderNormal)

chainOrder500.run(2, true, 0)
