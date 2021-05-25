const { createRef, forwardRef, useRef } = React;

const Foo = forwardRef((params, inputRef) => {
  return <input type="text" ref={ inputRef } />;
});

const App = () => {
  const inputRef = useRef();

  const onClick = () => {
    inputRef.current.focus();
  }

  return <div>
    <Foo ref={ inputRef } />
    <button onClick={ onClick }>button</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));