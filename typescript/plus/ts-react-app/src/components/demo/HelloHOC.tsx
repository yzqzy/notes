import React, { Component } from "react"
import HelloClass from './HelloClass'

interface Loading {
  loading: boolean
}

function HelloHOC<P>(WrapperComponent: React.ComponentType<P>) {
  return class extends Component<P & Loading> {
    render() {
      const { loading, ...props } = this.props
      return loading ? <div>Loading</div> : <WrapperComponent {...props as unknown as P} />
    }
  }
}

export default HelloHOC(HelloClass)
