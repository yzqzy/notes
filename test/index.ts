// function minFallingPathSum(matrix: number[][]): number {
//   const m = matrix.length
//   const n = matrix[0].length

//   const dp: number[][] = Array.from({ length: m }).map(() => new Array(n))

//   for (let i = 0; i < n; i++) {
//     dp[0][i] = matrix[0][i]
//   }

//   for (let i = 1; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       const curr = matrix[i][j]

//       dp[i][j] = dp[i - 1][j] + curr

//       if (j - 1 >= 0) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1] + curr)
//       if (j + 1 < n) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j + 1] + curr)
//     }
//   }

//   return Math.min(...dp[n - 1])
// }

function dfs(v: number[], w: number[], i: number, c: number): number
function dfs(v: number[], w: number[], i: number, c: number) {
  return 0
}

function maxValue(N: number, V: number, v: number[], w: number[]) {
  const dp = Array.from({ length: N }).map(() => new Array(V))

  for (let i = 0; i <= V; i++) {
    dp[0][i] = i > v[0] ? w[0] : 0
  }

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < V + 1; j++) {
      let x = dp[i - 1][j]
      let y = j >= v[i] ? dp[i - 1][j - v[i]] + w[i] : 0

      dp[i][j] = Math.max(x, y)
    }
  }

  return dp[N - 1][V]
}

console.log(maxValue(3, 4, [4, 2, 3], [4, 2, 3]))
