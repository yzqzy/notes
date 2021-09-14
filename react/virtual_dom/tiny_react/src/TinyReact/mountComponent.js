import isFunctionComponent from "./isFunctionComponent";

export default function mountComponent (virtualDOM, container) {
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    console.log('函数组件');
  } else {
    // 类组件
    console.log('类组件');
  }
}