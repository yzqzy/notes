const MyComponent = {
  name: 'MyComponent',
  // 组件接收名为 title 的 props，并且该 props 的类型为 string
  props: {
    title: String
  },
  render() {
    return {
      type: 'div',
      // 访问 props 数据
      children: `count is: ${ this.title }`
    }
  }
}

const node = {
  type: MyComponent,
  props: {
    title: 'A Big Title',
    other: this.val
  }
}

// 调用渲染器渲染组件
renderer.render(node, document.querySelector('#app'))

const newNode = {
  type: MyComponent,
  props: {
    title: 'A Small Title',
    other: this.val
  }
}

setTimeout(() => {
  renderer.render(newNode, document.querySelector('#app'))
}, 1000)
