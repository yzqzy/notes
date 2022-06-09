const isPrime = (num: number) => {
  const boundary = Math.floor(Math.sqrt(num))
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false
  return num > 2
}

console.log(isPrime(11)) // true


const distance = (x0: number, y0: number, x1: number, y1: number) => Math.hypot(x1 - x0, y1 - y0)

console.log(distance(1, 1, 2, 3)) // 2.23606797749979
console.log(distance(1, 1, 1, 2)) // 1


// const factorial = (n: number): number => {
//   if (n < 0) throw new TypeError('Negative numbers are not allowed!')
//   return n <= 1 ? 1 : n * factorial(n - 1)
// }

// console.log(factorial(6)) // 720

// const factorial = (n: bigint): bigint => {
//   if (n < 0n) throw new TypeError('Negative numbers are not allowed!')
//   return n <= 1 ? 1n : n * factorial(n - 1n)
// }

// console.log(factorial(10000n)) // 720n

// const factorial = (n: bigint): bigint => {
//   if (n < 0) throw new TypeError('Negative numbers are not allowed!')

//   let ans = n

//   if (n <= 1) return 1n

//   while (n > 1) {
//     ans *= --n
//   }

//   return ans
// }

// console.log(factorial(20000n)) // 720

// const factorial = (n: bigint): bigint => {
//   if (n < 0) throw new TypeError('Negative numbers are not allowed!')

//   if (n <= 1) return 1n

//   for (let i = n - 1n; i >= 1; i--) {
//     n *= i
//   }
  
//   return n
// }

// console.log(factorial(20000n)) // 720


// const factorial = (n: bigint): bigint => {
//   if (n < 0) throw new TypeError('Negative numbers are not allowed!')

//   if (n <= 1) return 1n

//   for (let i = n - 1n; i >= 1; i--) {
//     n *= i
//   }
  
//   return n
// }

// console.log(factorial(20000n))


const binomiaCoefficient = (n: number, k: number) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN
  if (k < 0 || k > n) return 0
  if (k === 0 || k === n) return 1
  if (k === 1 || k === n - 1) return n
  if (n - k < k) k = n - k
  let ans = n
  for (let j = 2; j <= k; j++) ans *= (n - j + 1) / j
  return Math.round(ans)
}

console.log(binomiaCoefficient(8, 2)) // 28


const hammingDistance = (n1: number, n2: number) =>
  ((n1 ^ n2).toString(2).match(/1/g) || '').length

console.log(hammingDistance(2, 3)) // 1
