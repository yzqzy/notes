/**
 * @file 深度优先遍历
 */

const { tree } = require('./data');

const dfs = (root) => {
  console.log(root.val);
  root.children.forEach(dfs);
}

dfs(tree);