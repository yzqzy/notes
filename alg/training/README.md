# 算法训练

<img src="./images/outline.png" />

## 准备工作

### 学习方法

改变学习习惯（不要死磕）。多写多练，但不是每次花很多时间。看高票代码和高质量题解。

#### Chunk it up 庖丁解牛

* 数据结构分类
  * 一维
    * 基础：数组 array、链表 linked lis
    * 高级：栈 stack、队列 queue、双端队列 deque、集合 set、map（hash or map）、etc
  * 二维
    * 基础：树 tree、graph 图
    * 高级：二叉搜索树 binary search tree（red-black tree、AV）L、堆 heap、并查集 disjoint set、字典树 Trie、etc
  * 特殊
    * 位运算 Bitwise、布隆过滤器 BloomFilter
    * LRU Cache
* 算法
  * if-else、switch -> branch
  * for，while loop -> iteration
  * 递归 Recursion（Divide & Conquer，Backtrace ）
  * 搜索 Search：深度优先搜索 Depth first search，广度优先搜索 Breadth first search，A*，etc
  * 动态规划 Dynamic Programing
  * 二分查找 Binary Search
  * 贪心 Greedy
  * 数学 Math，几何 Geometry

#### Deliberate Practicing 刻意练习

* 分解和反复练习，过遍数，最少刷五遍
* 练习缺陷、弱点

#### Feedback 反馈

* 及时反馈
* 主动型反馈
  * 高手代码（Github，Leetcode，etc）
  * 第一视角直播
* 被动式反馈
  * code review

### 五步刷题法

**第一遍**

5 分钟：读题和思考。

没有思路，直接看解法，比较解法优劣。

背诵、默认最好的解法。 

**第二遍**

自己写代码，LeetCode 提交验证。

对多种解法比较、体会 -> 优化。

**第三遍**

过一天，重复做题。

根据不同解法的熟练程度进行专项联系。

**第四遍**

过一周之后，反复回来练习相同题目。

**第 5 遍**

面试前一周或者多周恢复性训练。

### 环境配置

Google 浏览器。

VSCode 配合 LeetCode 插件。

https://leetcode-cn.com、https://leetcode.com 。

leetcode-cn.com 和 题解、leetcode.com 和 Discuss board。

> 中文网站和英文网站的题目除了 `-cn`，其他都一致。尽量在中文站做完题，再去看国际站的讨论区。

## 时间复杂度和空间复杂度

### Big O notation

#### 常见的时间复杂度

O(1)：Constant Complexity 常数复杂度

O(log n)：Logarithmic Complexity 对数复杂度

O(n)：Linear Complexity 线性时间复杂度

O(n^2)：N square Complexity  平方

O(n^3)：N cubic Complexity  立方

O(2^n)：Exponential Growth 指数

O(n!)：Factorial 阶乘

>  注意：只需要看最高复杂度的运算，不考虑前面的系数。

```js
// O(1)

const n = 100;

console.log(n);
```

```js
// O(1)

const n = 100;

console.log(n);
console.log(n);
console.log(n);
```

```js
// O(n) 

for (let i = 0; i <= n; i++) {
  console.log(i);
}
```

```js
// O(n) 

for (let i = 0; i <= n; i++) {
  console.log(i);
}

for (let j = 0; j <= n; j++) {
  console.log(i, j);
}
```

```js
// O(n^2)	

for (let i = 0; i <= n; i++) {
  for (let j = 0; j <= n; j++) {
    console.log(i, j);
  }
}
```

```js
// O(log(n))

for (let i = 1; i < n; i = i * 2) {
	console.log(i);
}
```

```js
// O(k^n)

function fib (n) {
  if (n < 2) return n;
  
  return fib(n - 1) + fib(n - 2);
}
```



<img src="./images/big_O_chart.png" />



写程序的时候一定要对自己程序的时间和空间复杂度有所了解，写完程序可以下意识的分析时间和空间复杂度。

能够用最简洁的时间和空间复杂度完成程序。

#### 累加案例

计算 1+ 2 +  3 + 4 + ...n 。

```js
// 方法1：循环累加

y = 0;

for i = 1 to n
	y += i
```

```js
// 方法2：求和公式 sum = n(n + 1) / 2

y = n * (n + 1) / 2
```

#### 递归的时间复杂度

将递归代码转化为递归树。



Fib: 0, 1, 2, 3, 5, 8, 13, 21 ...

F(n) = F(n - 1) + F(n - 2)

```js
// 最简单递归写法

function fib (n) {
  if (n < 2) return n;
  
  return fib(n - 1) + fib(n -2);
}
```



<img src="./images/fib.png" />



每一层的节点数也就是执行次数，是按照指数级递增的，当下到最后一层，就变成 2 的 n 次方。就是总的执行次数就是指数级。

其次我们可以观察到重复的节点。

面试中不要这么写上述的代码，可以采用加缓存处理或者用循环的写法。

### Master Theorem

用来解决如何计算递归函数的时间复杂度。



<img src="./images/master_theorem.png" />



> Binary Search	二分查找
>
> Binary tree traversal	二叉树
>
> Optimal Sorted Martrix Search	排好序的二维矩阵
>
> Merge Sort	归并排序



**二叉树的遍历 - 前序、中序、后序：时间复杂度是多少？**

O(n)，n 代表二叉树里面的树的节点总数。

不管是前序、中序、后序遍历二叉树的时候，每个节点会访问一次仅访问一次。

所以它的时间复杂度就是线性于二叉树的节点总数，也就是 O(n) 的时间复杂度。

**图的遍历：时间复杂度是多少？**

图里面的每个节点访问一次且仅访问一次，所以它的时间复杂度为 O(n)。n 指图里面的节点总数。

**搜索算法：DFS，BFS 时间复杂度是多少？**

访问的节点只访问一次，所以时间复杂度都为 O(n)。n 指搜索空间的节点总数。

**二分查找：时间复杂度是多少？**

O(log n)。



### 空间复杂度

空间复杂度其实和时间复杂度的情况类似，但它更加简单。


如果代码中存在数组，那么数组的长度基本是就是空间复杂度。

如果开辟一个一维数组，长度为传入的元素的个数，一般来说，空间复杂度就是 O(n)。

如果开辟一个二维数组，它的长度数组的长度为 n 平方，空间复杂度基本上就是 n 平方。



如果存在递归，那么它递归的深度，就是空间复杂度的最大值。


如果又是递归又是开辟新数组，那么两者之间的最大值就是空间复杂度。



**爬楼梯问题**

本身就是斐波那契数列求值，F(n) = F(n-1) + F(n-2)。

https://leetcode-cn.com/problems/climbing-stairs/

```js
// 暴力法，递归解法且没有任何缓存，存在大量的重复计算
// 时间复杂度：O(2^n)，树形递归的大小为 2^n。
// 空间复杂度：O(n)，递归树的深度可以达到 n。

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const _climbStairs = (i, n) => {
    if (i > n) {
      return 0;
    }

    if (i == n) {
      return 1;
    }

    return _climbStairs(i + 1, n) + _climbStairs(i + 2, n);
  }

  return _climbStairs(0, n);
};
```

```js
// 记忆化递归，通过 memo 数组，我们可以得到一个修复的递归树，其大小减少到 n。
// 时间复杂度：O(n)，树形递归的大小可以达到 n
// 空间复杂度：O(n)，递归树的深度可以达到 n。

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const memo = [];

  const _climbStairs = (i, n, memo) => {
    if (i > n) {
      return 0;
    }

    if (i == n) {
      return 1;
    }

    if (memo[i] > 0) {
      return memo[i];
    }

    return memo[i] = _climbStairs(i + 1, n, memo) + _climbStairs(i + 2, n, memo);
  }

  return _climbStairs(0, n, memo);
};
```

```js
// 动态规划
// 时间复杂度：O(n)
// 空间复杂度：O(n)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if (n == 1) {
    return 1;
  }

  const dp = [];

  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};
```

```js
// 斐波那契树
// 上述方法，我们使用 dp 数组，但其实我们并不需要存储所有的状态，只需要存储 n-1 和 n-2 就可以。
// 时间复杂度：O(n)
// 空间复杂度：O(1)，常量级时间

/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  if (n == 1) {
    return 1;
  }

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    let thrid = first + second;

    first = second;
    second = thrid;
  }

  return second;
};
```

## 数组、链表、跳表

