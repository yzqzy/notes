const babel = require('@babel/core'),
      loaderUtils = require('loader-utils');

function loader (sourceCode) {
  let options = loaderUtils.getOptions(this),
      callback = this.async();

  babel.transform(sourceCode, {
    ...options,
    sourceMap: true, // 是否开启源码
    filename: this.resourcePath.split('/').pop() // sourceMap 的名称
  }, (err, result) => {
    if (err) {
      return callback(err);
    }

    callback(null, result.code, result.map);
  });
}

module.exports = loader;