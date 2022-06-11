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

## 二分查找

