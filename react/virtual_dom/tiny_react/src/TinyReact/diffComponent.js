import mouneElement from './mountElement';
import updateComponent from './updateComponent';

export default function diffComponent (virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 同组件，组件更新
    updateComponent(virtualDOM, oldComponent, oldDOM, container);
  } else {
    // 非同组件
    mouneElement(virtualDOM, container, oldDOM);
  }
}

// 判断是否是同一个组件
function isSameComponent (virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor;
}