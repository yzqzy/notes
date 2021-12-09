import React from "react";
import Counter from './components/Counter';
import CounterStore from './store/CounterStore';

const counterStore = new CounterStore();

function App () {
  return (
    <Counter store={ counterStore } />
  );
}

export default App;
