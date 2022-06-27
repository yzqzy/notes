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

console.log('---------------------')


const binarySearch = (arr: number[], item: number) => {
  let l = 0
  let r = arr.length - 1

  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    const guess = arr[mid]

    if (guess === item) return mid

    if (guess > item) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }

  return -1
}

console.log(binarySearch([1, 2, 3, 4, 5], 1)) // 0
console.log(binarySearch([1, 2, 3, 4, 5], 5)) // 4
console.log(binarySearch([1, 2, 3, 4, 5], 6)) // -1

console.log('---------------------')

const geometricProgression = (end: number, start = 1, step = 2) => 
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1
  }).map((_, i) => start * step ** i)

console.log(geometricProgression(256)) // [1, 2, 4, 8, 16, 32, 64, 128, 256]
console.log(geometricProgression(256, 3)) // [3, 6, 12, 24, 48, 96, 192]
console.log(geometricProgression(256, 1, 4)) // [1, 4, 16, 64, 256]

console.log('---------------------')

const insertionSort = (arr: number[]) =>
  arr.reduce((acc: number[], x: number) => {
    if (!acc.length) return [x]
    acc.some((y, j) => {
      if (x < y) {
        acc.splice(j, 0, x)
        return true
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x)
        return true
      }
      return false
    })
    return acc
  }, [])

console.log(insertionSort([6, 3, 4, 1])) // [1, 3, 4, 6]
console.log(insertionSort([1, 3, 4, 1])) // [1, 1, 3, 4]

console.log('---------------------')

const gcd = (...arr: number[]): number => {
  const _gcd = (x: number, y: number) => (!y ? x : gcd(y, x % y))
  return [...arr].reduce((a: number, b: number) => _gcd(a, b))
}

console.log(gcd(8, 36)) // 4
console.log(gcd(...[12, 8, 32])) // 4
console.log(gcd(...[3, 9, 27])) // 3

console.log('---------------------')

const bubbleSort = (arr: number[]) => {
  let swapped = false
  const a = [...arr]
  
  for (let i = 1; i < a.length; i++) {
    swapped = false

    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true
      }
    }

    if (!swapped) return a
  }

  return a
}

console.log(bubbleSort([1, 1, 8, 7, 3])) // [ 1, 1, 3, 7, 8 ]
console.log(bubbleSort([2, 1, 4, 3])) // [1, 2, 3, 4]

console.log('---------------------')

const powerset = (arr: number[]): number[][] => 
  arr.reduce((a: number[][], v: number) => a.concat(a.map((r: number[]) => r.concat(v))), [[]])

console.log(powerset([1, 2])) // [[], [1], [2], [1, 2]]

console.log('---------------------')

const mergeSort = (arr: number[]): number[] => {
  if (arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const l = mergeSort(arr.slice(0, mid))
  const r = mergeSort(arr.slice(mid, arr.length))
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) {
      return r.shift()
    } else if (!r.length) {
      return l.shift()
    } else {
      return l[0] > r[0] ? r.shift() : l.shift()
    }
  }) as number[]
}

console.log(mergeSort([5, 1, 4, 2, 3])) // [1, 2, 3, 4, 5]

console.log('---------------------')

const selectionSort = (arr: number[]) => {
  const a = [...arr]

  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i)
    if (min !== i) [a[i], a[min]] = [a[min], a[i]]
  }

  return a
}

console.log(selectionSort([5, 1, 4, 2, 3])) // [1, 2, 3, 4, 5]

console.log('---------------------')

const quickSort = (arr: number[]): number[] => {
  const a = [...arr]

  if (a.length < 2) return a

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = a[pivotIndex]

  const [lo, hi] = a.reduce(
    (acc: number[][], val: number, i: number) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val)
      } else if (val > pivot) {
        acc[1].push(val)
      }
      return acc
    },
    [[], []]
  )

  return [...quickSort(lo), pivot, ...quickSort(hi)]
}

console.log(quickSort([1, 6, 1, 5, 3, 2, 1, 4])) // [1, 1, 1, 2, 3, 4, 5, 6]

console.log('---------------------')

const bucketSort = (arr: number[], size = 5) => {
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  ) as number[][]

  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val)
  })
  
  console.log(buckets)
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], [])
}

console.log(bucketSort([6, 3, 4, 1])) // [1, 3, 4, 6]
console.log(bucketSort([1, 6, 1, 5, 3, 2, 1, 4])) // [1, 1, 1, 2, 3, 4, 5, 6]

console.log('---------------------')

const heapsort = (arr: number[]) => {
  const a = [...arr]
  let l = a.length

  const heapify = (a: number[], i: number) => {
    const left = 2 * i + 1
    const right = 2 * i + 2

    let max = i

    if (left < l && a[left] > a[max]) max = left
    if (right < l && a[right] > a[max]) max = right
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]]
      heapify(a, max)
    }
  }

  let i

  for (i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i)
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]]
    l--
    heapify(a, 0)
  }

  return a
}

console.log(heapsort([6, 3, 4, 1])) // [1, 3, 4, 6]
console.log(heapsort([1, 6, 1, 5, 3, 2, 1, 4])) // [1, 1, 1, 2, 3, 4, 5, 6]

console.log('---------------------')