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


const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y))
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y)
  return [...arr].reduce((a, b) => _lcm(a, b))
}

console.log(lcm(12, 7)) // 84
console.log(lcm(...[1, 3, 4, 5])) // 60


const shuffle = (arr: number[]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const foo = [1, 2, 3, 4, 5]
console.log(shuffle(foo)) // [ 5, 1, 4, 2, 3 ]
console.log(shuffle(foo)) // [ 4, 5, 3, 1, 2 ]
console.log(shuffle(foo)) // [ 3, 2, 4, 1, 5 ]


const vectorDistance = (x: number[], y: number[]) => 
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0))

console.log(vectorDistance([10, 0, 5], [20, 0, 10])) // 11.180339887498949


const primeFactors = (n: number) => {
  const ans = []
  let f = 2
  while (n > 1) {
    if (n % f === 0) {
      ans.push(f)
      n /= f
    } else {
      f++
    }
  }
  return ans
}

console.log(primeFactors(147)) // [3, 7, 7]
console.log(primeFactors(245)) // [5, 7, 7]


const linearSearch = (arr: number[], item: number) => {
  for (const i in arr) {
    if (arr[i] === item) return +i
  }
  return -1
}

console.log(linearSearch([2, 9, 9], 9)) // 1
console.log(linearSearch([2, 9, 9], 7)) // -1


const fibonacci = (n: number) =>
  Array.from({ length: n }).reduce(
    (acc: number[], _, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  )

console.log(fibonacci(6)) // [0, 1, 1, 2, 3, 5]


const levenshteinDistance = (s: string, t: string) => {
  if (!s.length) return t.length
  if (!t.length) return s.length
  const arr = []
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i]
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] = 
        i == 0 
          ? j
        : Math.min(
            arr[i - 1][j] + 1,
            arr[i][j - 1] + 1,
            arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
          )
    }
  }
  return arr[t.length][s.length]
}

console.log(levenshteinDistance('duck', 'dark')) // 2
console.log(levenshteinDistance('thanks', 'thank')) // 1

