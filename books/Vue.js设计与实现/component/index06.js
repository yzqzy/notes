const MyComponent = {
  name: 'MyComponent',
  setup(props, { emit }) {
    // 发生 change 事件，并传递给事件处理函数两个参数
    emit('change', 1, 2)

    return () => {
      return { type: 'div', children: 'hello world' }
    }
  }
}

const handler = (...payload) => {
  console.log('trigger', payload)
}

const CompVNode = {
  type: MyComponent,
  props: {
    onChange: handler
  }
}

// 调用渲染器渲染组件
renderer.render(
  CompVNode,
  document.querySelector('#app')
)
