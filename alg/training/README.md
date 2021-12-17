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

## Big O notation

### 常见的时间复杂度

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

### 累加案例

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

### 递归的时间复杂度

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



```js
```

