/**
 * @file 广度优先遍历
 */

const { graph } = require('./data');

const bfs = (root) => {
  const visited = new Set();
  const queue = [root];

  visited.add(root);

  while (queue.length) {
    const n = queue.shift();

    console.log(n);

    graph[n].forEach(c => {
      if (!visited.has(c)) {
        queue.push(c);
        visited.add(c);
      }
    });
  }
}

bfs(2);