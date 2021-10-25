export const mapArr = (arr) => {
  if (Array.isArray(arr)) {
    return arr.reduce((prev, item) => {
      prev[item.id] = item;
      return prev;
    }, {});
  }
  return [];
}

export const objToArr = (obj) => {
  return Object.values(obj);
}