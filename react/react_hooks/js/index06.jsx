const { useState, memo, useCallback, useMemo } = React;

const Foo = memo(props => {
  console.log('foo trigger')

  return <div>
    <ul>{ props.render }</ul>
  </div>;
});

function App () {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);

  const render = useMemo(() => {
    const list = [];

    console.log('tigger');

    for (let i = 0; i < range.max; i++) {
      list.push(<li key={ i }>{ i }</li>);
    }

    return list;
  }, [range]);

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => { setRange({
        ...range,
        max: range.max + 1
      }) }}>add</button>
      <Foo render={ render }></Foo>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));