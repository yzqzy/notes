# LeetCode

[https://leetcode.com/heora/](https://leetcode.com/heora/)

## 路径问题

### Unique Paths

[https://leetcode.com/problems/unique-paths/](https://leetcode.com/problems/unique-paths/)

```typescript
function uniquePaths(m: number, n: number): number {
  const grid = Array.from({ length: m }).map(() => new Array(n))
  
  for (let i = 0; i < m; i++) {
    grid[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    grid[0][j] = 1
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] = grid[i - 1][j] + grid[i][j - 1]
    }
  }
  
  return grid[m - 1][n - 1]
}
```

### Unique Paths II

[https://leetcode.com/problems/unique-paths-ii/](https://leetcode.com/problems/unique-paths-ii/)

```typescript
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  const grid: number[][] = Array.from({ length: m }).map(() =>
    new Array(n).fill(0)
  )

  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) break
    grid[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) break
    grid[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        grid[i][j] = 0
      } else {
        grid[i][j] = grid[i - 1][j] + grid[i][j - 1]
      }
    }
  }

  return grid[m - 1][n - 1]
}
```

```typescript
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  const grid: number[][] = Array.from({ length: m }).map(() =>
    new Array(n).fill(0)
  )

  // optimize
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    grid[i][0] = 1
  }
  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    grid[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        grid[i][j] = 0
      } else {
        grid[i][j] = grid[i - 1][j] + grid[i][j - 1]
      }
    }
  }

  return grid[m - 1][n - 1]
}
```

### Minimum Path Sum

[https://leetcode.com/problems/minimum-path-sum/](https://leetcode.com/problems/minimum-path-sum/)

```typescript
```

