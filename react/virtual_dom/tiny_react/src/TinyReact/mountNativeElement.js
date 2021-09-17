import createDOMElement from "./createDOMElement";

export default function mountNativeElement (virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM);

  // 将转化之后的 DOM 对象放置在页面中
  container.appendChild(newElement);

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement);
  }
}