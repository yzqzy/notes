import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};
  const oldComponent = oldVirtualDOM.component;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 递归判断，对比子节点
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))

    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 存在节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}