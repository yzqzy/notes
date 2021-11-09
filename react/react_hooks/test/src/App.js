import React, { useState, memo, useCallback } from 'react';

const Foo = memo(function Foo (props) {
  console.log('foo render');

  return (
    <div>
      <span>Foo 组件</span>
      <button onClick={ props.resetCount }>resetCount</button>
    </div>
  )
});


function App () {
  const [count, setCount] = useState(0);
  const resetCount = useCallback(() => setCount(0), [setCount]);

  return (
    <div>
      <span>{ count }</span>
      <button onClick={ () => setCount(count + 1) }>Add</button>
      <Foo resetCount={ resetCount } />
    </div>
  );
}

export default App;