const MyComponent = {
  name: 'MyComponent',
  // 用 data 函数定义组件自身状态
  data() {
    return {
      foo: 'hello world'
    }
  },
  render() {
    // 渲染函数中使用组件状态
    return {
      type: 'div',
      children: `foo 的值是：${ this.foo }`
    }
  }
}

// 用来描述组件的 VNode 对象，type 属性值为组件的选项对象
const CompVNode = {
  type: MyComponent
}
// 调用渲染器渲染组件
renderer.render(CompVNode, document.querySelector('#app'))
