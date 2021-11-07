import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  });

  useEffect(() => {
    console.log(count);
  }, [])
  
  useEffect(() => {
    return () => {
      console.log('unmount：', count);
    }
  })

  return (
    <div>
      <span>{ count }</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    </div>
  );
}

export default App;