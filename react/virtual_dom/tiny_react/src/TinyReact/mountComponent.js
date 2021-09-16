import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent (virtualDOM, container) {
  let nextVirtualDOM = null;

  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
  }

  if (isFunction(nextVirtualDOM)) {
    // 函数组件
    mountComponent(nextVirtualDOM, container);
  } else {
    // 挂载组件
    mountNativeElement(nextVirtualDOM, container);
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  return component.render();
}