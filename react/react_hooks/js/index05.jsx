const { Component, createContext, useContext } = React;

const AppContext = createContext();

class Foo extends Component {
  render () {
    return (
      <AppContext.Consumer>
        {
          value => <div>Foo: { value }</div>
        }
      </AppContext.Consumer>
    );
  }
}

class Bar extends Component {
  static contextType = AppContext;

  render () {
    const value = this.context;

    return <div>Bar: { value }</div>;
  }
}

const Baz = () => {
  const value = useContext(AppContext);

  return <div>Baz: { value }</div>;
}

const Middle = () => {
  return (
    <div>
      <Foo></Foo>      
      <Bar></Bar>
      <Baz></Baz>
    </div>
  )
}

const App = () => {
  return (
    <AppContext.Provider value={'月落'}>
      <Middle></Middle>
    </AppContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));