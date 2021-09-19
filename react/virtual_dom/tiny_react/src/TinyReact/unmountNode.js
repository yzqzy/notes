export default function unmountNode (node) {
  const virtualDOM = node._virtualDOM;

  // 1. 文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    node.remove();
    return;
  }

  // 2. 判断元素节点是否由组件生成
  const component = virtualDOM.component;

  if (component) {
    // 节点由组件生成
    component.componentWillUnmount();
  }

  // 3. 判断节点是否存在 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null);
  }

  // 4. 节点的属性中是否存在事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLocaleLowerCase().slice(2);
      const eventHandler = virtualDOM.props[propName];

      node.removeEventListener(eventName, eventHandler);
    }
  });

  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i]);
      i--;
    }
  }

  // 删除节点
  node.remove();
}