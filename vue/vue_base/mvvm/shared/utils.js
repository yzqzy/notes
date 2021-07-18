const reg_check_str = /^[\'|\"].+?[\'|\"]$/;
const reg_str = /[\'|\"]/g;

export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

export function hasOwnProperty (target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual (newVal, oldVal) {
  return newVal === oldVal;
}

export function randomNum () {
  return new Date().getTime() + parseInt(Math.random() * 10000);
}

export function formatData (str) {
  if (reg_check_str.test(str)) {
    return str.replace(reg_str, '');
  }

  switch (str) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      break;
  }

  return Number(str);
}