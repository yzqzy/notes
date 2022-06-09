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

