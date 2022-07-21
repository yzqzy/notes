const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted 1')
    })

    onMounted(() => {
      console.log('mounted 2')
    })

    return {}
  },
  render() {
    return { type: 'div', children: 'hello world' }
  }
}


const node = {
  type: MyComponent,
}

// 调用渲染器渲染组件
renderer.render(
  node,
  document.querySelector('#app')
)
