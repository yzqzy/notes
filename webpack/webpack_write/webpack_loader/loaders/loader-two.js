function loader (sourceCode) {
  console.log('loader two!');
  return sourceCode;
}

// loader.pitch = function () {
//   console.log('loader two pitch phase!');
// }

loader.pitch = function () {
  console.log('loader two pitch phase!');
  return 'hello';
}

module.exports = loader;