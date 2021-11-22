import { Component } from "react";

export default class ErrorBoundaries extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false
    }
  }

  componentDidCatch (error) {
    console.log('error：', error);
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render () {
    if (this.state.hasError) {
      return <div>发生未知错误</div>
    }

    return this.props.children;
  }
}