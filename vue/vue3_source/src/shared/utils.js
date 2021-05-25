export const isObject = (val) => typeof val === 'object' && val !== null;

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (val, key) => hasOwnProperty.call(val, key);

export const hasChanged = (val, oldVal) => val !== oldVal;

export const isFunction = (val) => typeof(val) === 'function';