import React, { useState } from 'react';

function App () {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState({ name: '张三', age: 20 });
  
  return (
    <div>
      <span>{ count } { person.name } { person.age }</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setPerson({ name: '李四', age: 30 })}>setPerson</button>
    </div>
  );
}

export default App;
