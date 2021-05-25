import React, { Component } from 'react'
import './App.css'

class List extends Component {
  state = {
    a: 1,
    b: 2,
    c: 3,
  }

  handleClick = () => {
    this.setState(oldState => {
      const { a, b, c } = oldState
      return {
        a: a * a,
        b: b * b,
        c: c * c,
      }
    })
  }

  render() {
    const { a, b, c } = this.state
    return [
      <span key="a">{a}</span>,
      <span key="b">{b}</span>,
      <span key="c">{c}</span>,
      <button key="button" onClick={this.handleClick}>
        click me
      </button>,
    ]
  }
}

class Input extends Component {
  state = {
    name: 'jokcy',
  }

  handleChange = e => {
    // 这里如果使用方法设置`state`
    // 那么需要现在外面读取`e.target.value`
    // 因为在React走完整个事件之后会重置event对象
    // 以复用event对象，如果等到方法被调用的时候再读取`e.target.value`
    // 那时`e.target`是`null`
    this.setState({
      name: e.target.value,
    })
  }

  render() {
    return (
      <input
        type="text"
        style={{ color: 'red' }}
        onChange={this.handleChange}
        value={this.state.name}
      />
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="main">
        <Input />
        <List />
      </div>
    )
  }
}

export default App
