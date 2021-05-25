function loader (sourceCode) {
  let reg = /url\((.+?)\)/g,
      currentResult = '',
      arr = ['let list = []'],
      startIdx = 0,
      result;

  while (currentResult = reg.exec(sourceCode)) {
    let [matchResult, group] = currentResult,
       lastIdx = reg.lastIndex - matchResult.length;

    arr.push(
      `list.push(${JSON.stringify(sourceCode.slice(startIdx, lastIdx))})`
    );
    startIdx = reg.lastIndex;

    arr.push(`list.push('url(' + require(${group}) + ')')`)
  }

  arr.push(`list.push(${JSON.stringify(sourceCode.slice(startIdx))})`);
  arr.push(`module.exports = list.join('')`);
  result = arr.join('\r\n')

  return result;
}

module.exports = loader;