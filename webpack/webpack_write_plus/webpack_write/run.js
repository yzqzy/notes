// const webpack = require('webpack');
// const options = require('./webpack.config.js');

// let compiler = webpack(options);

// compiler.run(function (err, stats) {
//   console.log(err);
//   console.log(stats.toJson());
// }); 

const webpack = require('./pack');
const options = require('./webpack.config.js');

let compiler = webpack(options);

compiler.run(function (err, stats) {
  console.log(err);
  console.log(stats);
}); 