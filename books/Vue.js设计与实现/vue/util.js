const isPlainObject = (data) => typeof data === 'object' && data !== null;
const isPlainSet = (obj) => Object.prototype.toString.call(obj) === '[object Set]';
const isPlainMap = (obj) => Object.prototype.toString.call(obj) === '[object Map]';

module.exports = {
  isPlainObject,
  isPlainSet,
  isPlainMap
};