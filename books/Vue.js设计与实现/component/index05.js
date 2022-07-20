// const Comp = {
//   setup() {
//     // setup 函数可以返回一个函数，该函数将作为组件的渲染函数
//     return () => {
//       return { type: 'div', children: 'hello' }
//     }
//   }
// }


// const Comp = {
//   setup() {
//     const count = 5

//     return {
//       count
//     }
//   },
//   render() {
//     // 通过 this 可以访问 setup 暴露出的响应式数据
//     return { type: 'div', children: `count is：${ this.count }` }
//   }
// }


const Comp = {
  props: {
    count: Number
  },
  setup(props, setupContext) {
    // 访问传入的 props 数据
    props.count 
    // setupContext 中包含与组件接口相关的重要数据
    const { slots, emit, attrs, expose } = setupContext
    // ...
    return {
      count: props.count
    }
  },
  render() {
    // 通过 this 可以访问 setup 暴露出的响应式数据
    return { type: 'div', children: `count is：${ this.count }` }
  }
}

// 调用渲染器渲染组件
renderer.render(
  {
    type: Comp,
    props: {
      count: 5
    }
  },
  document.querySelector('#app')
)
