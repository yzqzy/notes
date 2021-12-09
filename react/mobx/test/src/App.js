import React from "react";
import Counter from './components/Counter';
import { RootStoreProvider } from './store/index';

function App () {
  return (
    <RootStoreProvider>
      <Counter />
    </RootStoreProvider>
  );
}

export default App;
