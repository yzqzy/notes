import { vnode } from './create-element';

/***
 * @description 生成虚拟节点
 * @property {string} tag - 节点名
 * @property {object} props - 节点属性
 * @property {array} children - 子节点
 * @return {object}
 */
export default function h (tag, props, ...children) {
 let key = props.key;

 delete props.key;

 children = children.map(child => {
   if (typeof child === 'object') {
     return child;
   } else {
     return vnode(undefined, undefined, undefined, undefined, child);
   }
 });

 return vnode(tag, props, key, children);
}
