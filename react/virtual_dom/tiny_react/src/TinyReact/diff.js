import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (oldVirtualDOM && oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 递归判断
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))
  }
}