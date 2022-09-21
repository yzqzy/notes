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

