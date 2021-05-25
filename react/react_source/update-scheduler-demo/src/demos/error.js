import React from 'react'

function Child() {
  throw new Error('mememe')
}

export default class ErrorDemo extends React.Component {
  state = {
    didThrow: false,
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError')
    return {
      didThrow: true,
    }
  }

  componentDidCatch() {
    console.log('componentDidCatch')
  }

  render() {
    console.log(this.state.didThrow)
    if (!this.state.didThrow) {
      return <Child />
    }
    return <span>normal</span>
  }
}
