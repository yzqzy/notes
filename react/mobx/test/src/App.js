import React from "react";
import Counter from './components/Counter';
import Todo from "./components/Todo";
import { RootStoreProvider } from './store/index';

function App () {
  return (
    <RootStoreProvider>
      <Counter />
      <Todo />
    </RootStoreProvider>
  );
}

export default App;
