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
