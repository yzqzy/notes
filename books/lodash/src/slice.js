function slice(array, start, end) {
  // 参数合法校验
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  // 设置 start 和 end 默认值
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  // start 为负数 
  // a. 如果 -start 大于数组长度，设置为 0（超过数组长度，start 一定为 0）
  // b. 如果 -start 小于数组长度，start = length + start
  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  // end 
  // a. 确定 end 位置
  // b. 如果 end < 0，end + length
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  // 确定
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}


const arr = [1, , 3, , 6, 7, 8];

console.log(arr.slice(0)); // 

console.log(slice(arr, 0)); // 
