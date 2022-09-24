# LeetCode

[https://leetcode.com/heora/](https://leetcode.com/heora/)

## 路径问题

### Unique Paths

[https://leetcode.com/problems/unique-paths/](https://leetcode.com/problems/unique-paths/)

给你一个二维数组，问题是从左上角移动到右下角总共有多少条不同的路径。

这个问题其实很简单，我们只需要从左上角递推到右下角即可。

这里有一个优化点是可以事先初始化首行首列的值为 1，这样在循环中我们就不需要反复判断边界条件。

```typescript
function uniquePaths(m: number, n: number): number {
  const dp: number[][] = Array.from({ length: m }).map(() => new Array(n))
  
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  
  return dp[m - 1][n - 1]
}
```

### Unique Paths II

[https://leetcode.com/problems/unique-paths-ii/](https://leetcode.com/problems/unique-paths-ii/)

不同路径的进阶问题，与上一题的不同点就是需要考虑遇到障碍物时，后续的路径都为 0。

所以我们在初始化 dp 数组时，需要事先填充初始值为 0，这样后面就不必考虑赋值问题。

然后同样的方法初始化首行首列，需要判断障碍物是否存在，障碍物后续的元素都不需要再被处理。

```typescript
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  const dp: number[][] = Array.from({ length: m }).map(() =>
    new Array(n).fill(0)
  )

  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) break
    dp[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) break
    dp[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[m - 1][n - 1]
}
```

初始化首行首列时，判断障碍物的逻辑还可以优化下，就是将判断条件提升到 for 循环本身。

```typescript
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  const dp: number[][] = Array.from({ length: m }).map(() =>
    new Array(n).fill(0)
  )

  // optimize
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1
  }
  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[m - 1][n - 1]
}
```

### Minimum Path Sum

[https://leetcode.com/problems/minimum-path-sum/](https://leetcode.com/problems/minimum-path-sum/)

同样是从左上角移动到右下角，不过这里是求一条总和最小的路径。

首先同样初始化首行首列，初始化时我们需要计算累加值，因为循环是从 1 开始。

然后迭代二维数组，每次求得当前元素与 dp 数组左边和上边取最小值 的和，最后将返回右下角元素即可。

```typescript
function minPathSum(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length

  const dp: number[][] = Array.from({ length: m }).map(() => new Array(n))

  dp[0][0] = grid[0][0]

  for (let i = 1; i < m; i++) {
    dp[i][0] = grid[i][0] + dp[i - 1][0]
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = grid[0][j] + dp[0][j - 1]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1])
    }
  }

  return dp[m - 1][n - 1]
}
```

### Triangle

[https://leetcode.com/problems/triangle/](https://leetcode.com/problems/triangle/)

求三角形的最小路径和，我们可以从右下角向左上角遍历，这样就不用考虑一些边界问题。

```typescript
// o(m * m) extra space

function minimumTotal(triangle: number[][]): number {
  const n = triangle.length

  const dp: number[][] = Array.from({ length: n }).map(() => new Array(n))

  for (let i = 0; i < n; i++) {
    dp[n - 1][i] = triangle[n - 1][i]
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1])
    }
  }

  return dp[0][0]
}
```

我们还可以将 dp 数组优化至 O(n)。

```typescript
// o(n) extra space

function minimumTotal(triangle: number[][]): number {
  const n = triangle.length

  const dp: number[] = new Array(n)

  for (let i = 0; i < n; i++) {
    dp[i] = triangle[n - 1][i]
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1])
    }
  }

  return dp[0]
}
```

### Minimum Falling Path Sum

[https://leetcode.com/problems/minimum-falling-path-sum/](https://leetcode.com/problems/minimum-falling-path-sum/)

这道题目和之前都不一样，我们需要求多条路径的最小和。

所以我们也不能向之前那样初始化首行首列的值，而是需要动态判断边界条件，进行求值。

其次我们还需要比较三个数，即上+中，上+左，上+右，然后将最小值赋值给 `dp[i][j]`。

最后需要比较 dp 数组最后一行数组，取它们的最小值。

```typescript
function minFallingPathSum(matrix: number[][]): number {
  const m = matrix.length
  const n = matrix[0].length

  const dp: number[][] = Array.from({ length: m }).map(() => new Array(n))

  for (let i = 0; i < n; i++) {
    dp[0][i] = matrix[0][i]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const curr = matrix[i][j]

      dp[i][j] = dp[i - 1][j] + curr

      if (j - 1 >= 0) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1] + curr)
      if (j + 1 < n) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j + 1] + curr)
    }
  }

  return Math.min(...dp[n - 1])
}
```

## 背包问题

背包问题是动态规划中十分经典的一类题目，背包问题本身智本质上属于组合优化的 NP 完全问题。

> NP 完全问题可以简单理解为 无法直接求解问题，我们只能通过 穷举 + 验证 的方式进行求解。
>
> 背包问题满足无后效性要求，所以我们可以使用动态规划来求解。
>
> 动态规划：最优子结构、无后效性、重复子问题

### 01-背包

01 背包是指给定物品价值与体积，在规定容量下如何使得所选物品的总价值最大。

有 N 件物品和一个容量是 V 的背包。每件物品有且只有一件。

第 i 件物品的体积是 v[i]，价值是 w[i]。

求解将哪些物品装入背包，使这些物品的总体积不超过背包容量且总价值最大。

```
输入：N = 3, V = 4, v = [4, 2, 3], w = [4, 2, 3]
输出：4
解释：只选第一件物品，可使价值最大
```

```
输入：N = 3, V = 5, v = [4, 2, 3], w = [4, 2, 3]
输出：5
解释：不选第一件物品，选择第二件和第三件物品，可使价值最大
```

#### `dp[N][C + 1]` 解法

如果要我们设计一个 DFS 函数对所有方案进行枚举，大概是这么一个函数签名：

```typescript
function dfs(v: number[], w: number[], i: number, c: number): number
```

* v：物品体积
* w：物品价值
* i：当前枚举到哪件物品
* c：目前的剩余容量
* 返回值为最大价值

根据变化参数和返回值，可以抽象出我们的 dp 数组：

一个二维数组，其中一维代表当前枚举到哪件物品，另外一维代表现在的剩余容量，数组装的是最大价值。

根据 dp 数组我们可以得出状态定义：考虑前 i 件物品，使用容量不超过 C 的条件下的背包最大值。

有了状态定义之后，我们来推导状态转移方程。我们只需要考虑第 i 件物品如何选择即可，对于第 i 件物品，我们有选与不选两种决策。

* 不选其实就是 `dp[i - 1][c]` ，等效于我们只考虑前 `i - 1` 件物品，当前容量为 c 的情况下的最大值。

* 如果我们选第 i 件物品，代表消耗了 `v[i]` 的背包容量，获取 `w[i]` 的价值，那么留给前 `i - 1` 件物品的背包容量就只剩 `c - v[i]`。即最大价值为 `dp[i - 1][c - v[i]] + w[i]`。

> 选择第 `i` 件有一个前提：当前剩余的背包容量 >= 物品的体积。

在选与不选之间取最大值，就是我们考虑前 i 件物品，使用容量不超过 C 的条件下的背包最大价值。

即可得状态转移方程为：

```
dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - v[i]] + w[i])
```

代码实现如下：

```typescript
```



