/**
 * @file 深度优先遍历
 */

const { graph } = require('./data');

const visited = new Set();

const dfs = (n) => {
  console.log(n);

  visited.add(n);

  graph[n].forEach(c => {
    if (!visited.has(c)) {
      dfs(c);
    }
  });
}

dfs(2);