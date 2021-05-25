function loader (sourceCode) {
  console.log('loader three!');
  return sourceCode;
}

loader.pitch = function () {
  console.log('loader three pitch phase!');
}

module.exports = loader;