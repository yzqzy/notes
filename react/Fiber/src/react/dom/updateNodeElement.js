export default function updateNodeElement (newElement, virtualDOM, oldVirtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {};
  // 获取旧节点对应的属性对象
  const oldProps = oldVirtualDOM && oldVirtualDOM.props || {};

  if (virtualDOM.type === 'text') {
    if (newProps.textContent !== oldProps.textContent) {
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(
          document.createTextNode(newProps.textContent)
        );
      } else {
        virtualDOM.parent.stateNode.replaceChild(
          document.createTextNode(newProps.textContent),
          oldVirtualDOM.stateNode
        );
      }
    }
    return;
  }

  Object.keys(newProps).forEach(propName => {
    // 获取新的属性值
    const newPropsValue = newProps[propName];
    // 获取旧的属性值
    const oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否事件属性 onClick
      if (propName.slice(0, 2) === 'on') {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2);
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue);
        // 删除原有的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropsValue;
      } else if (propName !== 'children') {
        if (propName === 'classname') {
          newElement.setAttribute('class', newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];

    // 原有属性被删除
    if (!newPropsValue) {
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2);
        newElement.removeListener(eventName, oldPropsValue);
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName);
      }
    }
  });
}