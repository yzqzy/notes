import React from 'react'

export default function TestIndeterminateComponent() {
  return {
    componentDidMount() {
      console.log('invoker')
    },
    render() {
      return <span>aaa</span>
    },
  }
}
