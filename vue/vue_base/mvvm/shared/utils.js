export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

export function hasOwnProperty (target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual (newVal, oldVal) {
  return newVal === oldVal;
}