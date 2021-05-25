const loaderUtils = require('loader-utils');

module.exports = function (soucre) {
  console.log('a-loader process');

  const url = loaderUtils.interpolateName(this, '[name].[ext]', soucre);

  console.log(url);

  this.emitFile(url, soucre);

  return soucre;
}