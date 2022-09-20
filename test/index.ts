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
