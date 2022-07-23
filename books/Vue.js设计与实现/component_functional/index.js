function MyFuncComp(props) {
  return { type: 'h1', children: props.title }
}

// 定义 props
MyFuncComp.props = {
  title: String
}

const node = {
  type: MyFuncComp,
  props: {
    title: 'functional component'
  }
}

// 调用渲染器渲染组件
renderer.render(
  node,
  document.querySelector('#app')
)
