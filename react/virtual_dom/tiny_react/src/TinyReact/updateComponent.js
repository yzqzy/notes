import diff from "./diff";

// 组件更新
export default function updateComponent (virtualDOM, oldComponent, oldDOM, container) {
  oldComponent.componentWillReceiveProps(virtualDOM.props);

  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    const prevProps = oldComponent.props; // 未更新前 props

    oldComponent.componentWillUpdate(virtualDOM.props);

    // 组件属性更新
    oldComponent.updateProps(virtualDOM.props);
  
    // 获取组件返回的最新的 virtual DOM
    const nextVirtualDOM  = oldComponent.render();
    // 更新 component 组件实例对象
    nextVirtualDOM.component = oldComponent;
    
    diff(nextVirtualDOM, container, oldDOM);

    oldComponent.componentDidUpdate(prevProps);
  }
}