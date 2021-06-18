/**
 * @param {array} weight - 物品重量
 * @param {number} n - 物品个数
 * @param {number} w - 背包可承载重量
 */
function knapsack (weight, n, w) {
  const states = new Array(n).fill(new Array(w + 1).fill(false));

  states[0][0] = true; // 第一行的数据特殊处理，利用哨兵优化

  if (weight[0] <= w) {
    states[0][weight[0]] = true;
  }

  for (let i = 1; i < n; i++) { // 动态规划转移
    for (let j = 0; i <= w; j++) { // 不把第 i 个物品放入背包
      if (states[i - 1][j]) states[i][j] = states[i - 1][j];
    }

    for (let j = 0; j < w - weight[i]; j++) { // 把第 i 个物品放入背包
      if (states[i = 1][j]) states[i][j + weight[i]] = true;
    }
  }

  for (let i = w; i >= 0; i--) { // 输出结果
    if (states[n - 1][i]) return i;
  }

  return 0;
}