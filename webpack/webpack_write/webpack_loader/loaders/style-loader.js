const loaderUtils = require('loader-utils');

function loader (sourceCode) {
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(sourceCode)};
    document.head.appendChild(style);
  `;
  return str;
}

loader.pitch = function (remainingRequest) {
  // css-loader.js!less-loader.js!./index.less

  let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `;
  return str;
}

module.exports = loader;