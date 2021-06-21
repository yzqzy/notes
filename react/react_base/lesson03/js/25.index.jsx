class Test extends React.Component {
  constructor (props) {
    super(props);

    this.divRef = React.createRef();
  }

  render () {
    return (
      <div ref={ this.divRef } >{ this.props.children }</div>
    );
  }
}

function Test2 () {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    console.log(divRef);
  }, []);

  return (
    <div ref={ divRef }>Hello, Function Ref</div>
  );
}

class App extends React.Component {
  state = {
    text: 'Hello Ref'
  }

  constructor (props) {
    super(props);

    this.testRef = React.createRef();
  }

  componentDidMount () {
    console.log(this.testRef);
  }

  render() {
    return (
      <>
        <Test
          ref={ this.testRef }
        >
          { this.state.text }
        </Test>
        <Test2 />
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)