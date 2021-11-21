import { useEffect, useState, memo } from "react";

const ShowName = memo(function ({ name }) {
  console.log('rendering');

  return (
    <div>{ name }</div>
  )
});

function App () {
  const [name] = useState('heora');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  return (
    <div>
      { count }
      <ShowName name={ name } />
    </div>
  )
}

export default App;
