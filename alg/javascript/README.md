# JavaScript 算法

## 数是质数

判断是否为质数：

* 检查从 2 到指定平方根的数字
* 如果目标数字与上述数字相除，余数为 0，那么就返回 false，否则就返回 true（排除小于 2 的数字）。

```typescript
const isPrime = (num: number) => {
  const boundary = Math.floor(Math.sqrt(num))
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false
  return num > 2
}

console.log(isPrime(11)) // true
```

## 两点之间的距离

计算两个点之间的距离：

* 可以使用 `Math.hypot()` 来计算两点之间的欧式距离（Euclidean distance）。

```typescript
const distance = (x0: number, y0: number, x1: number, y1: number) => Math.hypot(x1 - x0, y1 - y0)

console.log(distance(1, 1, 2, 3)) // 2.23606797749979
console.log(distance(1, 1, 1, 2)) // 1
```

## 数的阶乘

计算数字的阶乘：

* 使用递归算法
* 如果 n 小于或者等于 1，返回 1
* 除此之外，返回 n 与 n - 1 阶乘的乘积
* 如果 n 是一个负数，抛出错误

```typescript
const factorial = (n: number): number => {
  if (n < 0) throw new TypeError('Negative numbers are not allowed!')
  return n <= 1 ? 1 : n * factorial(n - 1)
}

console.log(factorial(6)) // 720
```

当我们实现 10000 的阶乘时，结果是 `Infinity` 。

这是因为 JavaScript 中的最大安全整数为 `2 ^ 53 - 1`，10000！结果超过安全范围。

我们可以使用 `BigInt` 解决上述问题。

```typescript
const factorial = (n: bigint): bigint => {
  if (n < 0n) throw new TypeError('Negative numbers are not allowed!')
  return n <= 1 ? 1n : n * factorial(n - 1n)
}

console.log(factorial(10000n)) // 720n
```

这个解法仍有问题，当求 20000 的阶乘时，会出现栈溢出的情况。

我们可以使用 while 循环的方式来解决这个问题。

```typescript
const factorial = (n: bigint): bigint => {
  if (n < 0) throw new TypeError('Negative numbers are not allowed!')

  let ans = n

  if (n <= 1) return 1n

  while (n > 1) {
    ans *= --n
  }

  return ans
}

console.log(factorial(20000n))
```

同理，我们也可以使用 for 循环。

```typescript
const factorial = (n: bigint): bigint => {
  if (n < 0) throw new TypeError('Negative numbers are not allowed!')

  if (n <= 1) return 1n

  for (let i = n - 1n; i >= 1; i--) {
    n *= i
  }
  
  return n
}

console.log(factorial(20000n))
```

## 二项式系数

> 二项式系数（binomial coefficient），或[组合数](https://baike.baidu.com/item/组合数/2153250)，在[数学](https://baike.baidu.com/item/数学/107037)里表达为：(1 + x)ⁿ展开后x的系数（其中n为自然数）。从定义可看出二项式系数的值为整数。

计算从第 n 个元素中选择 k 个的方法次数，要求不能重复且没有顺序。

* 使用 `isNaN` 检查数字是否是 `NaN` 
* 边界判断
  * 如果 k 小于 0 或者 k 大于 n，返回 0
  * 如果 k 等于 0 或者 k 等于 n ，返回 1
  * 如果 k 等于 1 或者 k 等于 n - 1，返回 n
* 检查 n - k 是否小于 k，并且切换对应的值
* 从 2 到 k 循环，并计算二项式系数
* 使用 `Math.round` 计算返回值

```typescript
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
```

## 汉明距离

> 汉明距离是以理查德·卫斯里·汉明的名字命名的。在信息论中，两个等长字符串之间的汉明距离是两个字符串对应位置的不同字符的个数。换句话说，它就是将一个字符串变换成另外一个字符串所需要替换的字符个数。

计算两个数值之间的汉明距离：

* 使用 XOR 操纵符（^）找到两个数字之间的位差
* 使用 `Number.prototype.toString()` 转换二进制字符串
* 使用 `String.prototype.match()` 计数并返回字符串中的 `1s` 数

```typescript
const hammingDistance = (n1: number, n2: number) =>
  ((n1 ^ n2).toString(2).match(/1/g) || '').length

console.log(hammingDistance(2, 3)) // 1
```

## 最小公倍数

> 几个数共有的倍数叫做这几个数的公倍数，其中除 0 以外最小的一个公倍数，叫做这几个数的最小公倍数。

计算两个或多个数字之间的最小公倍数。

* 使用最常见的（`GCD`）公式以及  `lcm(x, y) = x * y / gcd(x, y)` 确定最小公倍数

* 递归使用 `GCD` 公式

> GCD：Greatest Common Divisor，
>
> 最大公约数是能够同时整除 number1 和 number2 而没有余数的最大整数。
>
> 如果数a能被数b整除，a就叫做b的 [倍数](https://baike.baidu.com/item/倍数)，b就叫做a的[约数](https://baike.baidu.com/item/约数)。约数和倍数都表示一个[整数](https://baike.baidu.com/item/整数)与另一个整数的关系，不能单独存在。如只能说16是某数的倍数，2是某数的约数，而不能孤立地说16是倍数，2是约数。

```typescript
const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y))
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y)
  return [...arr].reduce((a, b) => _lcm(a, b))
}

console.log(lcm(12, 7)) // 84
console.log(lcm(...[1, 3, 4, 5])) // 60
```

## 数组随机排序

按随机顺序返回一个新数组。

* 使用 [Fisher-Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method) 算法重新排序数组中的元素

> Fisher–Yates shuffle 算法是一个用来将一个有限集合生成一个随机排列的算法（数组随机排序）。

```typescript
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
```

## 向量距离

计算两个向量之间的距离。

* 使用 `Array.prototype.reduce()` ，`Math.row()` 和 `Math.sqrt()` 计算两个向量之间的欧几里得距离。

```typescript
const vectorDistance = (x: number[], y: number[]) => 
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0))

console.log(vectorDistance([10, 0, 5], [20, 0, 10])) // 11.180339887498949
```

## 数字的主要因子

使用试除法寻找数组的主要因子。

* 从 2 开始，使用 while 循环迭代所有可能的元素
* 如果当前因子 `f` 恰好可以整除 `n`, 则将 `f` 添加到因子数组中，并将 `n` 除以 `f`。否则，递增 `f`

```typescript
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
```

## 线性查找

使用线性搜索算法在数组中找到目标元素的第一个索引。

* 使用 `for...in` 循环迭代给定数组的索引
* 检查对应索引元素是否等于目标元素
* 如果找到元素，使用 unary + 运算符转换字符串为数字，并返回其索引
* 如果数组迭代完毕，还没有找到目标元素，返回 `-1`

```typescript
const linearSearch = (arr: number[], item: number) => {
  for (const i in arr) {
    if (arr[i] === item) return +i
  }
  return -1
}

console.log(linearSearch([2, 9, 9], 9)) // 1
console.log(linearSearch([2, 9, 9], 7)) // -1
```

## 斐波那契数列

生成一个直到第 n 项的包含斐波那契数列的数组。

* 使用 `Array.form()` 初始化一个长度为 n 的空数组,初始化前两个值，分别是 0 和 1
* 使用 `Array.prototype.reduce()` 和 `Array.prototype.concat()` 方法，计算前两个元素的值的和，添加到数组中

```typescript
const fibonacci = (n: number) =>
  Array.from({ length: n }).reduce(
    (acc: number[], _, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  )

console.log(fibonacci(6)) // [0, 1, 1, 2, 3, 5]
```

## 编辑距离

使用 [Levenshtein 距离算法](https://en.wikipedia.org/wiki/Levenshtein_distance) 计算两个字符串之间的差异。

* 如果两个字符串任意一个的长度为零，返回另一个字符串的长度
* 使用 for 循环迭代目标字符串的字母及玄幻嵌套迭代源字符串的字母
* 计算目标和源字符串对应 `i - 1` 和 `j - 1`  替换对应字母的成本（如果相同为 0，否则为 1）
* 使用 `Math.min()` 在 二维矩阵中填充每个元素，其中一个单元格的最小值由一个元素增量，左侧的单元格向左，由一个或单元格到左上角的计算结果累加
* 返回数组的最后一行的以后一个元素

```typescript
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
```

## 最大公约数

计算两个或多个数字之间的最大公约数。

* 内部 `_gcd` 函数使用递归；
* 当 y 等于 0 时，返回 x；
* 否则返回 `gcd(y, x % y)`。

```js
const gcd = (...arr: number[]): number => {
  const _gcd = (x: number, y: number) => (!y ? x : gcd(y, x % y))
  return [...arr].reduce((a: number, b: number) => _gcd(a, b))
}

console.log(gcd(8, 36)) // 4
console.log(gcd(...[12, 8, 32])) // 4
console.log(gcd(...[3, 9, 27])) // 3
```

## 等比数列

初始化一个包含指定范围内（start-end）数字的数组，使用 step 作为步长。如果步长为 1，抛出错误信息。

* 使用 `Array.form`，`Math.log()` 和 `Math.floor()` 创建数组，并使用 `Array.prototype.map()` 填充它；
* start 的默认值是 1，step 的默认值是 2。

```js
const geometricProgression = (end: number, start = 1, step = 2) => 
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1
  }).map((_, i) => start * step ** i)

console.log(geometricProgression(256)) // [1, 2, 4, 8, 16, 32, 64, 128, 256]
console.log(geometricProgression(256, 3)) // [3, 6, 12, 24, 48, 96, 192]
console.log(geometricProgression(256, 1, 4)) // [1, 4, 16, 64, 256]
```

## 幂集

> 所谓幂集（Power Set）， 就是原集合中所有的子集（包括全集和空集）构成的集族。

返回给定数组的幂集。

* 使用 `Array.prototype.reduce()` 结合 `Array.prototype.map()` 迭代所有元素，并将它们组合成包含所有组合的数组。

```js
const powerset = (arr: number[]): number[][] => 
  arr.reduce((a: number[][], v: number) => a.concat(a.map((r: number[]) => r.concat(v))), [[]])

console.log(powerset([1, 2])) // [[], [1], [2], [1, 2]]
```

## 二分查找

使用二分搜索算法在排序的数组中找到给定元素的索引。

* 初始化左右搜索边界条件 l 和 r，分别初始化为 0 和数组的长度；
* 使用 `Math.floor()` 将其分成两半，然后使用 while 循环逐步缩小搜索范围；
* 如果找到元素返回元素索引，否则返回 `-1` 。

```js
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
```

## 插入排序

使用插入排序算法对数字数组进行排序。

* 使用 `Array.prototype.reduce()` 迭代数组；
* 使用 `Array.prototype.some()` 迭代 `acc`，直到找到正确的位置；
* 使用 `Array.prototyoe.splice()` 将当前元素插入到累加器中。

```js
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
```

## 冒泡排序

使用冒泡排序算法对数字数组进行排序。

* 声明一个变量 `swapped`，该变量表明在当前迭代期间是否交换过值；
* 使用拓展运算符克隆原数组；
* 使用 for 循环迭代数组；
* 使用嵌套循环在，如果满足条件，交换元素并设置 `swapped` 的值为 true；
* 如果首次迭代后，`swapped` 仍为 false，返回克隆数组。

```js
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
```

## 归并排序

使用归并排序算法对数字数组进行排序。

* 使用递归；
* 如果数组长度小于 2，直接返回数组；
* 使用 `Math.floor()` 计算数组的中间位置；
* 使用 `Array.prototype.slice()` 分割数组并递归调用 `mergeSort()` 方法；
* 最后，使用 `Array,form()` 和 `Array.prototype.shift()` 合并子序列。

```js
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
```

## 选择排序

使用选择排序算法对数字数字进行排序。

* 使用扩展运算符克隆数组；
* 使用 for 循环迭代数组；
* 使用 `Array.prototype.slice()` 和 `Array.prototype.reduce()` 在当前索引的右侧子数组中找到最小元素的索引。如果有必要，执行交换。

```js
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
```

## 快速排序

使用快速排序算法对数字数组进行排序。

* 使用递归；

* 使用扩展运算符克隆数组；

* 如果数组长度小于 2，直接返回克隆后的数组；

* 使用 `Math.floor()` 计算数组的中间位置；

* 使用 `Array.prototype.reduce()` 和 `Array.prototype.push()` 将数组分割为两个子数组。

  第一个包含小于等于中间位置的元素，第二个包含其他元素。

* 递归调用 `quickSort()` 创建子数组。

```js
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
```

## 桶排序

使用桶排序算法对数字数组进行排序。

* 使用 `Math.min()` , `Math.max()` 和拓展运算符找到给定数组的最小值和最大值；
* 使用 `Array.from()` 和 `Math.floor()` 创建适当数量的存储桶（空数组）；
* 使用 `Array.prototype.forEach()` 用数组中的适当元素填充每个存储桶；
* 使用 `Array.prototype.reduce()` 对每个存储桶进行排序并合并到结果上。

```js
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
```

## 堆排序

使用堆排序算法对数字数组进行排序。

* 使用递归；
* 使用拓展运算符克隆原数组；
* 声明闭包来声明变量 l 和 函数 `heapify`；
* 使用 for 循环和 `Math.floor()` 与 `heapify` 结合使用，创建大顶堆；
* 使用 for 循环缩小范围，并根据需要使用 `heapify` 和数值交换对克隆后的数组进行排序。

```js
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
```

## 欧几里得距离

TODO
