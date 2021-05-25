import React from 'react'

export default class Comp extends React.Component {
  state = {
    count: 1,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 2000)
  }

  render() {
    return <span>{this.state.count}</span>
  }
}
