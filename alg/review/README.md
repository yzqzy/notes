# LeetCode

[https://leetcode.com/heora/](https://leetcode.com/heora/)

## 路径问题

### Unique Paths

[https://leetcode.com/problems/unique-paths/](https://leetcode.com/problems/unique-paths/)

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

