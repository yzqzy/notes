import React, { useRef } from 'react';


function App () {
  const ref = useRef();

  return (
    <div
      ref={ ref }
    >
      App works
      <button onClick={ () => console.log(ref.current) }>获取 DIV</button>
    </div>
  );
}

export default App;