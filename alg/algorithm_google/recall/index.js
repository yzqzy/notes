// 全局或成员变量，下标表示行，值表示 queen 存储在哪一列
let result = new Array(8);

function cal8queens (row) {
  if (row === 8) {
    printQueens(result);
    return;
  }

  // 每一行都有 8 种方法
  for (let column = 0; column < 8; column++) {
    // 有些方法不满足要求
    if (isOk(row, column)) {
      // 第 row 行的棋子放到 column 列
      result[row] = column;
      // 考察下一行
      cal8queens(row + 1);
    }
  }
}

// 判断 row 行 column 列放置是否合适
function isOk (row, column) {
  let leftup = column - 1,
      rightup = column + 1;

  // 逐行往上考察每一行
  for (let i = row - 1; i >= 0; i--) {
    if (result[i] === column) return false; // 第 i 行的 column 列有棋子吗？

    if (leftup > 0) {
      // 考察左上对角线：第 i 行 leftup 列有棋子吗？
      if (result[i] === leftup) return false;
    }
    if (rightup < 8) {
      // 考察右上对角线：第 i 行 rightup 列有棋子吗？
      if (result[i] === rightup) return false;
    }

    leftup--;
    rightup++;
  }

  return true;
}

function printQueens (result) {
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      if (result[row] == column) {
        process.stdout.write("Q ")
      } else {
        process.stdout.write("* ");
      }
    }
    console.log(" ");
  }
  console.log(" ");
}

cal8queens(0);









// 背包
const maxN = Number.MAX_SAFE_INTEGER; // 存储背包中物品总重量的最大值
// cw 表示当前已经装进去的物品的重量和；i 表示考察到哪个物品了；
// w 背包重量；items 表示每个物品的重量； n表示物品个数
// 假设背包可承受重量 100，物品个数 10，物品重量存储在数组 a 中，那可以这样调用函数：
// f(0, 0, a, 10, 100)

function f (i, cw, items, n, w) {
  if (cw == w || i == n) {
    // cw == w 表示装满了; i == n 表示已经考察完所有的物品
    if (cw > maxN) maxN = cw;
    return;
  }

  f(i + 1, cw, items, n, w);

  if (cw + items[i] <= w) {
    // 已经超过可以背包承受的重量的时候，就不要再装了
    f(i + 1, cw + items[i], items, n, w);
  }
}





class Pattern {
  matched = false;
  pattern; // 正则表达式
  plen; // 正则表达式长度

  constructor (pattern, plen) {
    this.pattern = pattern;
    this.plen = plen;
  }

  match (text, tlen) {
    this.matched = false;
    this.rematch(0, 0, text, tlen);
    return this.matched;
  }

  rematch (ti, pj, text, tlen) {
    if (this.matched) return; // 已经匹配，不再递归

    if (pj == this.plen) { // 正则表达式到结尾
      if (ti == tlen) this.matched = true; // 文本串到结尾
      return;
    }

    if (this.pattern[pj] == '*') { // * 匹配任意个字符
      for (let k = 0; k <= tlen - ti; k++) {
        this.rematch(ti + k, pj + 1, text, tlen);
      }
    } else if (this.pattern[pj] == '?') { // 匹配 0 个或者 1 个字符
      this.rematch(ti, pj + 1, text, tlen);
      this.rematch(ti + 1, pj + 1, text, tlen);
    } else if (ti < tlen && this.pattern[pj] === text[ti]) { // 纯字符匹配
      this.rematch(ti + 1, pj + 1, text, tlen);
    }
  }
}