import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent (virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null;
  let component = null;

  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
    component = nextVirtualDOM.component;
  }

  if (isFunction(nextVirtualDOM)) {
    // 函数组件
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    // 挂载组件
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }

  if (component) {
    component.componentDidMount();

    // props 属性处理
    if (component.props && component.props.ref) {
      component.props.ref(component);
    }
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}