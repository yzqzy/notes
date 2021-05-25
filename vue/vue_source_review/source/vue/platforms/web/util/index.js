export function query (el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}