import React from 'react';
import ReactDOM from 'react-dom';

let state = [];
let setters = [];
let stateIndex = 0;

function render () {
  stateIndex = 0;
  effectIndex = 0;
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

let prevDeps = [];
let effectIndex = 0;

function useEffect (callback, deps) {
  const toStr = Object.prototype.toString;

  if (toStr.call(callback) !== '[object Function]') {
    throw new Error('useEffect 第一个参数必须是函数');
  }

  if (typeof deps === 'undefined') {
    callback();
  } else {
    if (toStr.call(deps) !== '[object Array]') {
      throw new Error('useEffect 第二个参数必须是数组');
    }

    // 获取上一次的状态值
    const _prevDeps = prevDeps[effectIndex];

    // 判断值是否存在变化
    const hasChanged = _prevDeps ? !deps.every((dep, index) => dep === _prevDeps[index]) : true

    if (hasChanged) {
      callback();
    }

    prevDeps[effectIndex] = deps;
    effectIndex++;
  }
}

function App () {
  const [count, setCount] = useState(0);

  const [name, setName] = useState('yueluo');

  useEffect(() => {
    console.log('hello');
  }, [ count ])

  useEffect(() => {
    console.log('world');
  }, [ name ])

  return (
    <>
      <p>{ count }</p>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <p>{ name }</p>
      <button onClick={() => setName('heora')}>setName</button>
    </>
  );
}

export default App;
