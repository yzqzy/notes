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

function knapsack2 (items, n, w) {
  const states = new Array(w + 1).fill(false); // 默认值 false

  states[0] = true; // 第一行的数据特殊处理，利用哨兵优化

  if (items[0] <= w) {
    states[items[0]] = true;
  }

  for (let i = 0; i < n; i++) { // 动态规划
    for (let j = w - items[i]; j >= 0; j--) { // 把第 i 个物品放入背包
      if (states[i]) states[j + items[i]] = true;
    }
  }

  for (let i = w; i >= 0; i--) {
    if (states[i]) return i;
  }

  return 0;
}

function knapsack3 (weight, value, n, w) {
  const states = new Array(n).fill(new Array(w + 1).fill(-1));

  states[0][0] = 0;

  if (weight[0] <= w) {
    states[0][weight[0]] = value[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (states[i - 1][j] >= 0) states[i][j] = states[i - 1][j];
    }

    for (let j = 0; j < w - weight[i]; j++) {
      if (states[i - 1] >= 0) {
        const v = states[i - 1][j] + value[i];

        if (v > states[i][j + weight[i]]) {
          states[i][j + weight[i]] = v;
        }
      }
    }
  }

  let maxValue = -1;

  for (let j = 0; j <= w; j++) {
    if (states[n - 1][j] > maxValue) maxValue = states[n - 1][j];
  }

  return maxValue;
}



const maxV = Number.MIN_VALUE; // 结果放到 maxV 中
const items = [2, 2, 4, 6, 3]; // 物品重量
const value = [3, 4, 8, 9, 6]; // 物品价值
const n = 5; // 物品个数
const w = 9; // 背包承受的最大重量

function f (i, cw, cv) {
  if (cw == w || i == n) { // cw == w 表示装满了，i === n 表示物品都考察完了
    if (cv > maxV) maxV = cv;
    return;
  }

  f(i + 1, cw, cv); // 选择不装第 i 个物品

  if (cw + items[i] <= w) {
    f(i + 1, cw + items[i], cv + value[i]); 
  }
}




/**
 * @param {array} items - 商品价格
 * @param {number} n - 商品个数
 * @param {number} w - 满减条件，比如 200
 */
function double11advance (items, n, w) {
  const states = new Array(n).fill(new Array(3 * w + 1).fill(false)); // 超过 3 倍就没有薅羊毛的价值了

  states[0][0] = true;

  if (items[0] < 3 * w) {
    states[0][items[0]] = true;
  }

  for (let i = 1; i < n; i++) { // 动态规划
    for (let j = 0; j < 3 * w; j++) { // 不购买第 i 个商品
      if (states[i - 1][j]) states[i][j] = states[i - 1][j];
    }
    for (let j = 0; j <= 3 * w - items[i]; j++) { // 购买第 i 个商品
      if (states[i - 1][j]) states[i][j + items[i]] = true;
    }
  }

  let j;

  for (j = w; j < 3 * w + 1; j++) {
    if (states[n-1][j]) break; // 输出结果大于等于w的最小值
  }

  if (j == 3 * w + 1) return; // 没有可行解

  for (let i = n - 1; i >= 1; --i) { // i表示二维数组中的行，j表示列
    if (j - items[i] >= 0 && states[i-1][j-items[i]]) { 
      console.log(items[i] + " "); // 购买这个商品
      j = j - items[i];
    } // else 没有购买这个商品，j不变。
  }

  if (j != 0) console.log(items[0]);
}



function minDistDp (matrix, n) {
  const states  = new Array(n).fill(new Array(n));

  let sum = 0;

  for (let j = 0; j < n; j++) {
    sum += matrix[0][j];
    states[0][j] = sum;
  }

  sum = 0;

  for (let i = 0; i < n; i++) {
    sum += matrix[i][0];
    states[i][0] = sum;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      states[i][j] = matrix[i][j] + Math.min(states[i][j - 1], states[i - 1][j]);
    }
  }

  return states[n - 1][ - 1];
}




function lwstDP(a, n, b, m) {
  const minDist = new Array(n).fill(new Array(m));

  for (let j = 0; j < m; ++j) { // 初始化第0行:a[0..0]与b[0..j]的编辑距离
    if (a[0] == b[j]) minDist[0][j] = j;
    else if (j != 0) minDist[0][j] = minDist[0][j-1]+1;
    else minDist[0][j] = 1;
  }
  for (let i = 0; i < n; ++i) { // 初始化第0列:a[0..i]与b[0..0]的编辑距离
    if (a[i] == b[0]) minDist[i][0] = i;
    else if (i != 0) minDist[i][0] = minDist[i-1][0]+1;
    else minDist[i][0] = 1;
  }
  for (let i = 1; i < n; ++i) { // 按行填表
    for (let j = 1; j < m; ++j) {
      if (a[i] == b[j]) minDist[i][j] = min(
          minDist[i-1][j]+1, minDist[i][j-1]+1, minDist[i-1][j-1]);
      else minDist[i][j] = min(
          minDist[i-1][j]+1, minDist[i][j-1]+1, minDist[i-1][j-1]+1);
    }
  }
  return minDist[n-1][m-1];
}

function min(x, y, z) {
  let minv = Number.MAX_VALUE;
  if (x < minv) minv = x;
  if (y < minv) minv = y;
  if (z < minv) minv = z;
  return minv;
}





function lcs (a, n, b, m) {
  const maxlcs = new Array(n).fill(new Array(m));
  for (let j = 0; j < m; ++j) {//初始化第0行：a[0..0]与b[0..j]的maxlcs
    if (a[0] == b[j]) maxlcs[0][j] = 1;
    else if (j != 0) maxlcs[0][j] = maxlcs[0][j-1];
    else maxlcs[0][j] = 0;
  }
  for (let i = 0; i < n; ++i) {//初始化第0列：a[0..i]与b[0..0]的maxlcs
    if (a[i] == b[0]) maxlcs[i][0] = 1;
    else if (i != 0) maxlcs[i][0] = maxlcs[i-1][0];
    else maxlcs[i][0] = 0;
  }
  for (let i = 1; i < n; ++i) { // 填表
    for (let j = 1; j < m; ++j) {
      if (a[i] == b[j]) maxlcs[i][j] = max(
          maxlcs[i-1][j], maxlcs[i][j-1], maxlcs[i-1][j-1]+1);
      else maxlcs[i][j] = max(
          maxlcs[i-1][j], maxlcs[i][j-1], maxlcs[i-1][j-1]);
    }
  }
  return maxlcs[n-1][m-1];
}

function max (x, y, z) {
  let maxv = Number.MIN_VALUE;
  if (x > maxv) maxv = x;
  if (y > maxv) maxv = y;
  if (z > maxv) maxv = z;
  return maxv;
}