import React, { useEffect } from 'react';

function getData () {
  return new Promise(resolve => {
    resolve({ message: 'hello' });
  });
}

function App () {
  useEffect(() => {
    (async () => {
      const result = await getData();

      console.log(result);
    })();
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default App;