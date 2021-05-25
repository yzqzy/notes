import React from 'react'

let promise = null
let data

const getData = id => {
  if (data) return data
  if (promise) throw promise
  promise = new Promise(resolve => {
    setTimeout(() => {
      data = `data is ${id}`
      resolve()
    }, 500)
  })
  throw promise
}

export default class Comp extends React.Component {
  state = {
    num: 0,
  }

  render() {
    const data = getData(this.state.num)
    return <span onClick={this.count}>{data}</span>
  }
}
