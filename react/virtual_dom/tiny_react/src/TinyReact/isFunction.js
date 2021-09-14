export default function isFunction (virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function';
}