function render() {
  return {
    type: Transtion,
    children: {
      default() {
        return { type: 'div', children: '我是需要过渡的元素' }
      }
    }
  }
}


const Transtion = {
  name: 'Transition',
  setup(props, { slots }) {
    return () => {
      // 通过
    }
  }
}