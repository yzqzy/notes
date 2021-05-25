/**
 * @description 生成虚拟DON
 * @param {string} tag - 节点名称
 * @param {object} props - 节点属性
 * @param {number} key - 节点key值
 * @param {object} children - 子节点
 * @param {string} text - 文本
 * @return {object}
 */
export function vnode (tag, props, key, children, text) {
  return {
    tag,
    props,
    key,
    children,
    text
  }
}
