const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;
// https://regex101.com/

/**
 * @description 编译节点
 * @param {HTMLElement} node - 选中的根节点
 * @param {Object} vm - vue实例
 * @return {void}
 */
export function compiler (node, vm) {
  let childNodes = node.childNodes,
      childNodeArr = [...childNodes];

  childNodeArr.forEach(child => {
    if (child.nodeType === 1) {
      // 元素节点处理-递归处理
      compiler(child, vm);
    } else if (child.nodeType === 3) {
      // 文本节点处理
      compileText(child, vm);
    }
  });
}

/**
 * @description 编译文本节点
 * @param {HTMLElement} node - 需要处理的文本节点
 * @param {Object} vm - vue实例
 * @return {void}
 */
export function compileText (node, vm) {
  if (!node.exp) {
    node.exp = node.textContent; // 保存 {{ message }}
  }
  node.textContent = node.exp.replace(reg, (...args) => {
    let key = trimSpace(args[1]);
    return getValue(key, vm);
  });
}

/**
 * @description 根据表达式获取内容
 * @param {string | object} key 
 * @param {Object} vm - vue实例
 * @return {void}
 */
export function getValue (exp, vm) {
  let keys = exp.split('.');

  return keys.reduce((prevValue, curValue) => {
    prevValue = prevValue[curValue];
    return prevValue;
  }, vm);
}

/**
 * @description 去除空格
 * @param {string} str - 待处理字符串
 * @return {string} 
 */
export function trimSpace (str) {
  return str.replace(/\s+/g, '');
}