import React from 'react';
import ReactDOM from 'react-dom';

let state = [];
let setters = [];
let stateIndex = 0;

function render () {
  stateIndex = 0;
  ReactDOM.render(<App />, document.getElementById('root'));
}

function createSetter (index) {
  return function (newVal) {
    state[index] = newVal;
    render();
  }
}

function useState (initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;

  setters.push(createSetter(stateIndex))

  const value = state[stateIndex];
  const setter = setters[stateIndex];

  stateIndex++;

  return [value, setter];
}

function App () {
  const [count, setCount] = useState(0);

  const [name, setName] = useState('yueluo');

  return (
    <>
      <p>{ count }</p>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <p>{ name }</p>
      <button onClick={() => setName('heore')}>setName</button>
    </>
  );
}

export default App;
