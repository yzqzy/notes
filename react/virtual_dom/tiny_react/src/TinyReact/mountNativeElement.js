import createDOMElement from "./createDOMElement";
import unmountNode from './unmountNode';

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM);

  // 如果存在旧的 DOM 对象，进行删除
  if (oldDOM) {
    unmountNode(oldDOM);
  }

  // 将转化之后的 DOM 对象放置在页面中
  container.appendChild(newElement);

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement);
  }
}