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


    // 1. 将拥有 key 属性的子元素放置在一个单独的对象中
    const keyedElements = {};

    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i];
      
      // 元素节点
      if (domElement.nodeType === 1) {
        const key = domElement.getAttribute('key');

        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0;

    if (hasNoKey) {
      // 递归判断，对比子节点
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      });
    } else {
      // 2. 循环 virtualDOM 的子元素，获取子元素的 key 属性
      virtualDOM.children.forEach((child, idx) => {
        const key = child.props.key;

        if (key) {
          const domElement = keyedElements[key];

          if (domElement) {
            // 3. 判断当前位置元素是不是期望元素
            if (oldDOM.childNodes[idx] && oldDOM.childNodes[idx] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[idx]);
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[idx]);
          }
        }
      });
    }

    // 获取旧节点
    const oldChildNodes = oldDOM.childNodes;

    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 存在节点需要被删除
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过 key 属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          const oldChild = oldChildNodes[i];
          const oldChildKey = oldChild._virtualDOM.props.key;

          let found = false;

          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true;
              break;
            }
          }

          if (!found) {
            unmountNode(oldChild);
          }
        }
      }
    }
  }
}