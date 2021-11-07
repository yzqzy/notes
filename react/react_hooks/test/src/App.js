import React, { createContext, useContext } from 'react';
 
const countContext = createContext();

function Foo () {
  const value = useContext(countContext);

  return (
    <div>{ value }</div>
  )
} 

function App () {
  return (
    <countContext.Provider value={ 100 }>
      <Foo />
    </countContext.Provider>
  )
}

export default App;
