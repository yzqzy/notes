const MyComponent = {
  name: 'MyComponent',
  setup() {
    return {}
  },
  render() {
    return [
      {
        type: 'header',
        children: [this.$slots.header()]
      },
      {
        type: 'div',
        children: [this.$slots.body()]
      },
      {
        type: 'footer',
        children: [this.$slots.footer()]
      }
    ]
  }
}

const handler = (...payload) => {
  console.log('trigger', payload)
}

const CompVNode = {
  type: MyComponent,
  children: {
    header() {
      return { type: 'h1', children: '我是标题' }
    },
    body() {
      return { type: 'section', children: '我是内容' }
    },
    footer() {
      return { type: 'p', children: '我是注脚' }
    }
  }
}

// 调用渲染器渲染组件
renderer.render(
  CompVNode,
  document.querySelector('#app')
)
