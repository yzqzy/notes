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