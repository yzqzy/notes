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

