function loader (sourceCode) {
  console.log('loader one!');
  return sourceCode;
}

loader.pitch = function () {
  console.log('loader one pitch phase!');
}

module.exports = loader;