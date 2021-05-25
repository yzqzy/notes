/**
 * @file 广度优先遍历
 */

const { tree } = require('./data');

const bfs = (root) => {
  const queue = [root];

  while (queue.length) {
    const n = queue.shift();

    console.log(n.val);

    n.children.forEach(child => {
      queue.push(child);
    });
  }
}

bfs(tree);