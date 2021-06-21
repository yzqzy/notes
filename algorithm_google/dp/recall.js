// const maxW = Number.MIN_VALUE;
// const weight = [2, 2, 4, 6, 3]; // 物品重量
// const n = 5; // 物品个数
// const w = 8; // 背包承受的最大重量

// function f (i, cw) {
//   if (cw == w || i == n) { // cw = w 表示装满了，i == n 表示物品都考察完了
//     if (cw > maxW) maxW = cw;
//   }

//   f(i + 1, cw); // 选择不装 i 个物品

//   if (cw + weight[i] < w) {
//     f(i + 1, cw + weight[i]); // 选择装第 i 的物品
//   }
// }

const maxW = Number.MIN_VALUE;
const weight = [2, 2, 4, 6, 3]; // 物品重量
const n = 5; // 物品个数
const w = 8; // 背包承受的最大重量
const mem = new Array(5).fill(new Array(10).fill(false));

function f (i, cw) {
  if (cw == w || i == n) { // cw = w 表示装满了，i == n 表示物品都考察完了
    if (cw > maxW) maxW = cw;
  }

  if (mem[i] && mem[i][cw]) return; // 重复状态

  mem[i][cw] = true; // 记录 (i, cw) 状态

  f(i + 1, cw); // 选择不装 i 个物品

  if (cw + weight[i] < w) {
    f(i + 1, cw + weight[i]); // 选择装第 i 的物品
  }
}



let minDist = Number.MAX_VALUE;

function minDistBT (i, j, dist, w, n) {
  if (i == n && j == n) {
    if (dist < minDist) minDist = dist;
    return;
  }

  if (i < n) {
    minDistBT(i + 1, j, dist + w[i][j], w, n);
  }
  if (j < n) {
    minDistBT(i, j + 1, dist + w[i][j], w, n);
  }
}




const matrix = [
  [1, 3, 5, 9],
  [2, 1, 3, 4],
  [5, 2, 6, 7],
  [6, 8, 4, 3]
];
const n = 4;
const men = new Array(4).fill(new Array(4));

function minDist (i, j) { // minDist(n - 1, n - 1)
  if (i == 0 && j == 0) {
    return mem[i][j];
  }

  if (men[i][j] > 0) {
    return men[i][j];
  }

  let minLeft = Number.MAX_VALUE;

  if (j - 1 >= 0) {
    minLeft = minDist(i, j - 1);
  }

  let minUp = Number.MAX_VALUE;

  if (i - 1 >= 0) {
    minUp = minDist(i - 1, j);
  }

  const currMinDist = matrix[i][j] + Math.min(minLeft, minUp);

  mem[i][j] = currMinDist;

  return currMinDist;
}