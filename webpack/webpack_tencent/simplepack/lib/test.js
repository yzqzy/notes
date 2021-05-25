const { getAST, getDependenceies, transfrom } = require('./parser');
const path = require('path');

const ast = getAST(path.join(__dirname, '../src/index.js'));

const dependencies = getDependenceies(ast);

const source = transfrom(ast);

console.log(source);