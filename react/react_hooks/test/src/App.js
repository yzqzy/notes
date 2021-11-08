import React, { useMemo, useState } from 'react';

function App () {
  const [count, setCount] = useState(0);

  const [bool, setBool] = useState(true);

  const result = useMemo(() => {
    console.log(1);
    return count * 2;
  }, [count])

  return (
    <div>
      <span>{ result }</span> - <span>{ count }</span>
      <span>{ bool ? '真' : '假' }</span>
      <button onClick={ () => setCount(count + 1) }>Add</button>
      <button onClick={ () => setBool(!bool) }>setBool</button>
    </div>
  );
}

export default App;