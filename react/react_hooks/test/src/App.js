import React, { useState, memo } from 'react';

const Foo = memo(function Foo () {
  console.log('foo render');

  return (
    <div>Foo 组件</div>
  )
});


function App () {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{ count }</span>
      <button onClick={ () => setCount(count + 1) }>Add</button>
      <Foo />
    </div>
  );
}

export default App;