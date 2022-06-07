import React, { Component } from "react"
import { Button } from 'antd'

interface Greeting {
  name: string;
  firstName?: string;
  lastName?: string;
}

interface State {
  count: number
}

class HelloClass extends Component<Greeting, State> {
  state: State = {
    count: 0
  }

  static defaultProps = {
    firstName: '',
    lastName: ''
  }

  setCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <>
        <p>点击了 { this.state.count }</p>
        <Button onClick={ this.setCount}>Hello { this.props.name }</Button>
      </>
    )
  }
}

export default HelloClass
