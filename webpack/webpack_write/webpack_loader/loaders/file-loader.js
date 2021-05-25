const loaderUtils = require('loader-utils');

function loader (sourceCode) {
  const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
    content: sourceCode
  });

  this.emitFile(filename, sourceCode);

  console.log(filename);

  return `module.exports = "${filename}"`;
}

// 二进制数据设置
loader.raw = true;

module.exports = loader;