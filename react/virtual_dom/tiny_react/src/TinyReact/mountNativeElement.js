import mountElement from "./mountElement";

export default function mountNativeElement (virtualDOM, container) {
  let newElement = null;

  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
  }

  // 递归创建子节点
  virtualDOM.children.forEach(child => mountElement(child, newElement));
  // 将转化之后的 DOM 对象放置在页面中
  container.appendChild(newElement);
}