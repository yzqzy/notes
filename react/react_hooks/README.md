# React Hooks

## 功能介绍

对函数组件进行增强，让函数组件可以存储状态，可以拥有处理副作用的能力。

使开发者在不使用类组件的情况下，实现相同的功能。

> 副作用：组件中只要不是把组件转换为视图的代码，都是副作用（定时器、设置 DOM 元素的点击事件等等）。

## 类组件的不足

**1. 缺少逻辑复用机制**

为了复用逻辑增加无实际渲染效果的组件，增加了组件层级，显得十分臃肿。增加了调试的难度以及运行效率的降低。

**2. 类组件经常变得复杂难以维护**

将一组相干的业务逻辑拆分到多个生命周期函数中。

在一个生命周期内存在多个不相干的业务逻辑。

**3. 类成员方法不能保证 this 指向的正确性**

## useState

Hooks 即钩子，React Hooks 就是一堆钩子函数，React 通过这些钩子函数对函数型组件进行增强，不同的钩子函数提供不同的功能。

```js
useState()
useEffect()
useReducer()
useRef()
useCallback()
useContext()
useMemo()
```

### 基础使用

useState 为函数组件引入状态。

```jsx
import React, { useState } from 'react';

function App () {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span>{ count }</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default App;
```

### 使用细节

接收唯一的参数即状态初始值，初始值可以是任意数据类型。

返回值为数组，数组中存储状态值和更改状态值的方法，方法名称约定以 set 开头，后面加上状态名称。

方法可以被调用多次，用以保存不同状态值。

参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况。



设置状态值方法的参数可以是一个值也可以是一个函数。

设置状态值方法的方法本身是异步的。

```js
setCount(count => {
  const newCount = count + 1;
  
  document.title = newCount;
  
  return newCount;
})
```

## useReducer

useReducer 是一种让函数组件保存状态的方式。

```jsx
import React, { useReducer } from 'react';

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

function App () {
  const [count, dispatch] = useReducer(reducer, 0);
  
  return (
    <div>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <span>{ count }</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
    </div>
  );
}

export default App;
```

## useContext

跨组件层级获取数据时简化获取数据的代码。

```jsx
import React, { createContext } from 'react';
 
const countContext = createContext();

function Foo () {
  return (
    <countContext.Consumer>
      {
        (value) => (
          <div>{ value }</div>
        )
      }
    </countContext.Consumer>
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
```

简化操作如下：

```jsx
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
```

## useEffect

让函数型组件拥有处理副作用的能力，类似生命周期函数。

### 基础使用

useEffect 看作是 componentDidMount、componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

```js
useEffect(() => {});				=> componentDidMount、componentDidUpdate
useEffect(() => {}, []);    => componentDidMount
useEffect(() => () => {});  => componentWillUnmount
```

```jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  });

  useEffect(() => {
    console.log(count);
  }, [])
  
  useEffect(() => {
    return () => {
      console.log('unmount：', count);
    }
  })

  return (
    <div>
      <span>{ count }</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    </div>
  );
}

export default App;
```

### 使用细节

**window 对象添加滚动事件、设置定时器让 count 数值每隔一秒增加 1**

```jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function App () {
  function onScroll () {
    console.log('change');
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  return (
    <div>
      <span>works</span>
      <span>{ count }</span>
      <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    </div>
  );
}

export default App;
```

### 优点

可以将按照用途将代码进行分类（将一组相干的业务逻辑归置到同一个副作用函数中）。

简化重复代码，使组件内部代码更加清晰。

### 数据检测

useEffect 第二个参数是一个数组，可以指定依赖项。只有指定依赖数据发生变化时会触发 effect。

```jsx
import React, { useEffect, useState } from 'react';

function App () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = count;
  }, [count]);

  return (
    <div>
      <span>{ count }</span>
      <button onClick={ () => setCount(count => count + 1) }>+1</button>
    </div>
  );
}

export default App;
```

### 结合异步函数

useEffect 中的参数函数不能是异步函数，因为 useEffect 函数要返回清理资源的函数，如果是异步函数就变成了返回 Promise。

```jsx
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
```

## useMemo

useMemo 类似于 Vue 中的计算属性，可以检测某个值的变化，根据变化值计算新值。useMemo 会缓存计算结果，如果检测值没有发生变化，即使组件重新渲染，也不会重新计算。此行为可以有助于避免在每个渲染上进行大量计算。

```jsx
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
```

## memo

性能优化，如果本组件中的数据没有发生变化，阻止组件更新，类似类组件中 PureComponent 和 shouldComponentUpdate。

 ```jsx
 import React, { useState, memo } from 'react';
 
 const Foo = memo(function Foo () {
   console.log('foo render');
 
   return (
     <div>Foo 组件</div>
   )
 });
 
 
 function App () {
   const [count, setCount] = useState(0);
 
   return (
     <div>
       <span>{ count }</span>
       <button onClick={ () => setCount(count + 1) }>Add</button>
       <Foo />
     </div>
   );
 }
 
 export default App;
 ```

## useCallback

性能优化，缓存函数，组件重新渲染时得到相同的函数实例。

```jsx
import React, { useState, memo, useCallback } from 'react';

const Foo = memo(function Foo (props) {
  console.log('foo render');

  return (
    <div>
      <span>Foo 组件</span>
      <button onClick={ props.resetCount }>resetCount</button>
    </div>
  )
});


function App () {
  const [count, setCount] = useState(0);
  const resetCount = useCallback(() => setCount(0), [setCount]);

  return (
    <div>
      <span>{ count }</span>
      <button onClick={ () => setCount(count + 1) }>Add</button>
      <Foo resetCount={ resetCount } />
    </div>
  );
}

export default App;
```

使用 useCallback 可以避免在父组件重新渲染时，导致 memo 缓存的子组件缓存失效。

## useRef

获取 DOM 元素对象。

### 基本使用

```jsx
import React, { useRef } from 'react';


function App () {
  const ref = useRef();

  return (
    <div
      ref={ ref }
    >
      App works
      <button onClick={ () => console.log(ref.current) }>获取 DIV</button>
    </div>
  );
}

export default App;
```

### 保存数据

useRef 保存的数据是跨组件周期的，即使组件重新渲染，保存的数据仍然还在，保存的数据被更改不会触发组件重新渲染。

```jsx
import React, { useState, useEffect, useRef } from 'react';



function App () {
  const [count, setCount] = useState(0);

  let timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000)
  }, []);

  const stopCount = () => {
    clearInterval(timerId.current);
  }

  return (
    <div>
      { count }
      <button onClick={stopCount}>停止</button>
    </div>
  );
}

export default App;
```

## 自定义 hook

自定义 hook 是标准的封装和共享逻辑的方式。

自定义 hook 是一个函数，其名称以 use 开头。

自定义 hook 其实就是逻辑和内置 Hook 的组合。

```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useGetPost () {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        setPost(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return [post, setPost];
}

function App () {
  const [post] = useGetPost();

  return (
    <div>
      <div>{ post.title }</div>
      <div>{ post.body }</div>
    </div>
  );
}

export default App;
```

```jsx
import React, { useEffect, useState } from 'react';

const useUpdateInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: event => setValue(event.target.value)
  }
}

function App () {
  const usenameInput = useUpdateInput('');
  const passwordInput = useUpdateInput('');

  const submitForm = (e) => {
    e.preventDefault();
    console.log(usenameInput.value, passwordInput.value);
  }

  return (
    <form onSubmit={ submitForm }>
      <input type="text" name="username" { ...usenameInput } />
      <input type="text" name="password" { ...passwordInput } />
      <button type="submit">提交</button>
    </form>
  );
}

export default App;
```

## 路由钩子函数

react-router-dom 路由提供的钩子函数。

```js
useHistory、useLocation、useRouteMatch、useParams
```

```js
npm install react-router react-router-dom@5.1.0
```

src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

src/App.js

```jsx
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';

function App () {
  return (
    <>
      <div>
        <Link to="/home">首页</Link>
        <Link to="/list">列表页</Link>
      </div>
      <div>
        <Route path="/home" component={ Home } />
        <Route path="/list" component={ List } />
      </div>
    </>
  );
}

export default App;
```

src/pages/Home.js

```jsx
import React from 'react';
import { useHistory, useLocation, useRouteMatch, useParams } from 'react-router-dom';

export default function Home (props) {
  console.log(props);
  console.log(useHistory())
  console.log(useLocation())
  console.log(useRouteMatch())
  console.log(useParams())

  return <div>Home</div>;
}
```

src/pages/List.js

```jsx
import React from 'react';

export default function List (props) {
  console.log(props);
  return <div>List</div>;
}
```

## useState 实现

```jsx
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
```

## useEffect 实现

```jsx
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
```

## useReducer 实现

