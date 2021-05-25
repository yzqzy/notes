import React from 'react'

let promise = null
let data = {}

const getData = id => {
  if (id === 0 || id === 10) return `data is ${id}`
  if (data[id]) return data[id]
  if (promise) throw promise
  promise = new Promise(resolve => {
    setTimeout(() => {
      data[id] = `data is ${id}`
      resolve()
      promise = null
    }, 3000)
  })
  throw promise
}

export default class Comp extends React.Component {
  state = {
    num: 0,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ num: this.state.num + 1 })
    }, 100)
    setTimeout(() => {
      this.setState({ num: 10 })
    }, 500)
  }

  count = () => {
    this.setState({ num: this.state.num + 1 })
  }

  render() {
    const data = getData(this.state.num)
    return <span onClick={this.count}>{data}</span>
  }
}
