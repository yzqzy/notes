const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this);

  console.log('author：', name);

  const json = JSON.stringify(source)
        .replace(/\u2028/, '\\u2028')
        .replace(/\u2029/, '\\u2029');

  // return `export defalut ${ json }`;

  const callback = this.async();

  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    if (err) {
      callback(err, '');
      return;
    }

    callback(null, data);
  });
}