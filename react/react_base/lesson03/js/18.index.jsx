const AContext = React.createContext('default a');
const BContext = React.createContext('default b');

AContext.displayName = 'MyAContext';

class App extends React.Component {
  state = {
    a: 'a context',
    b: 'b context'
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        b: 'bb context'
      });
    }, 1000);
  }

  render () {
    return (
      <AContext.Provider value={this.state.a}>
        <BContext.Provider value={this.state.b}>
          <Test />
        </BContext.Provider>
      </AContext.Provider>
    );
  }
}

class Test extends React.Component {
  shouldComponentUpdate () {
    console.log('repaint');
  }

  render () {
    return (
      <AContext.Consumer>
        {
          value => (
            <BContext.Consumer>
              {
                value => (
                  <div>{ value }</div>
                )
              }
            </BContext.Consumer>
          )
        }
      </AContext.Consumer>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);