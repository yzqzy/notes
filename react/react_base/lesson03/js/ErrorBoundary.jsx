class ErrorBoundary extends React.Component {
  state = {
    hashError: false
  };

  static getDerivedStateFromError (err) {
    return {
      hashError: true
    };
  }

  componentDidCatch (error, info) {
    console.log(error, info);
  }

  render () {
    if (this.state.hashError) {
      return <h1>
        This is a Error UI
      </h1>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;