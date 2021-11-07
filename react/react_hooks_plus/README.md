# React-Hoos

[官方文档](https://react.docschina.org/docs/hooks-intro.html)

## hooks 简介

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

> Hook 就是一个函数，它可以返回状态及更改状态的方法。

```jsx
import React, { useState } from 'react';

function Example () {
  const [count, setCount] = useState(0);
  
  return (
  	<div>
    	<p>You Clicked { count } times</p>
      <button
      	onClick={ () => setCount(count + 1) }  
      >
      	Click
      </button>
    </div>
  );
}
```

### 无破坏性改动

hook 是 100% 向后兼容的，是可选的，React 没有计划移除 class。

Hook 不会影响你对 React 概念的理解。Hook 为已知的 React 概念提供了更直接的 API。

### 动机

Hook 主要是用来解决传统类组件中存在的问题。

* 组件之间复用状态逻辑很难；
* 复杂组件变得难以理解；
* 难以理解的 class（this 指向）；

## Hook 规则

Hook 本质就是 JavaScript 函数，但是在使用时需要遵循两条规则。可以使用 linter 插件来强制执行这些规则。

### 只在最顶层使用 Hook

不要在循环时，条件或嵌套函数中调用 Hook。

> 不允许出现顺序颠倒的情况。

### 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以这样做：

* 在 React 的函数组件中调用 Hook
* 在自定义 Hook 中调用其他 Hook

## State Hook

Hook 指在不编写类的情况下来写组件。

### hook 与 类写法对比

hook 写法：

```js
const { useState } = React;

function App () {
  const [count, setCount] = useState(0);
  
  return (
  	<div>
    	<p>You Clicked { count } times</p>
      <button
      	onClick={ () => setCount(count + 1) }  
      >
      	Click me
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
```

类写法：

```js
const { Component } = React;

class App extends Component {
  state = {
    count: 0
  }

  render () {
    const { count } = this.state;

    return (
      <div>
        <p>You Clicked { count } times</p>
        <button
          onClick={ () => this.setState({ count: count + 1 }) }  
        >
          Click me
        </button>
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
```

### Hook 和函数组件

```jsx
const App = (props) => {
  return <div />;
}
```

```jsx
function App (props) {
  return <div />;
}
```

你之前可能把它们叫做 ”无状态组件“（木偶组件、呆组件），当我们为它们引入 React state 能力后，可以叫做 ”函数组件“。

Hook 在 class 内部是不起作用的，但是可以使用它们取代 class。

### Hook 是什么

Hook 是一个特殊函数，它可以让你 ”钩入“ React 的特性。例如 useState 是允许你在 React 函数组件中添加 state 的 Hook。

如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其转换为 class，现在就可以在函数组件中使用 Hook。

### 声明 State 变量

```jsx
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```

```js
import React, { useState } from 'react';

function App () {
  const [count, setCount] = useState(0);
}
```

### 读取 State

class：

```jsx
<p>You clicked { this.state.count } times</p>
```

函数：

```js
<p>You clicked { count } times</p>
```

### 更新 State

class：

```jsx
<button
	onClick={() => this.setState({ count: this.state.count + 1 })}  
>
	Click me
</button>
```

函数：

```jsx
<button
	onClick={() => setCount(count + 1 )}  
>
	Click me
</button>
```

### 使用多个 state 变量

```jsx
const { useState } = React;

function App () {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  console.log('render');
  
  return (
  	<div>
    	<p>You Clicked { count1 } times</p>
      <button onClick={ () => setCount1(count1 + 1) }>Click me</button>
    </div>
  );
};
```

初次渲染（app 挂载时），执行 render。点击时，也执行 render。意味着 App 重新执行一遍。

```js
function App () {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  console.log('render');
  
  return (
  	<div>
    	<p>You Clicked { count1 } times</p>
    	<p>You Clicked { count2 } times</p>
    	<p>You Clicked { count3 } times</p>
      <button onClick={ () => setCount1(count1 + 1) }>Click me</button>
      <button onClick={ () => setCount2(count2 + 1) }>Click me</button>
      <button onClick={ () => setCount3(count3 + 1) }>Click me</button>
    </div>
  );
};
```

运行同一个钩子，返回不同的结果，而且不同的结果在运行时依旧可以保持顺序的一致性。

> 记忆单元格（状态数组，状态列表）。

<img src="./images/usestate01.png" />

如果使用循环、条件、嵌套函数中调用 Hook，会报错（`hook is not defined`）。

### state hook 重点

```js
const [count, setCount] = useState(0);
```



**1. useState 返回的 setCount 函数无论 render 多少次，都是一个函数（唯一变量，优化内存空间）。**

count 变量不是同一个变量。

> useState 返回的数组第二个参数引用是一致的。



**2. 使用 setCount 赋值相同的值，函数组件不会渲染。类组件（父组件）对于修改相同值，会重新渲染。**

> React 对于变量的比较方式是 Object.is。



**3. 函数更新问题。**

> 函数更新（上一次的 state，更新的最新的 state）和不同的返回值更新。

```js
const [count, setCount] = useState(0);

const onClick = params => {
  setCount(count + 1);
  console.log(count); // 0
  // 内部采用闭包的方式实现类似异步的效果。
}

console.log(count); // 1
```

```js
const [count, setCount] = useState(0);

const onClick = params => {
  setCount(count + 1);
  setCount(count + 1);
  // 触发 click 事件后，render 时 count 为 1，两次都是拿到旧的值
}


const onClick = params => {
  setCount(count => count + 1);
  setCount(count => count + 1);
  // 使用箭头函数可以解决上述问题
}
```



**4. 多次赋值渲染时会合并处理。性能优化的手段。**

```js
const onClick = params => {
  setCount(count + 1);
  setCount(count + 1);
}
```



**5. 类组件设置 state 状态会合并，函数组件中不会合并。**

```jsx
function App () {
  const [counter, setCount] = useState({ count: 0 });
  
  console.log('render');
  
  const onClick = params => {
    setCount({
      count: counter.count + 1
    });
  }
  
  return (
 		<div>
      <p>{ counter.count }</p>
      <div>
        <button onClick={ onClick }>Click me</button>
      </div>
    </div>
  )
}
```

```js
function App () {
  const [counter, setCount] = useState({ count: 0 });
  
  console.log('render');
  
  const onClick = params => {
    setCount({
      count1: counter.count + 1
    });
    // setCount 时传入新对象，会以新对象为主，不会合并对象。
  }
  
  return (
 		<div>
      <p>{ counter.count }</p>
      <div>
        <button onClick={ onClick }>Click me</button>
      </div>
    </div>
  )
}
```



**6. 强制刷新组件**

```jsx
// 类组件

class App extends Component {
  state = {
    count: 0
  }

  shouldComponentUpdate () {
    console.log('before update');

    return true;
  }
  
  render () {
  	console.log('render');
    const { count } = this.state;

  	return (
      <div>
        <button onClick={ () => {
        	console.log(1);
        	this.forceUpdate();
          // this.setState({
          //   count: count + 1
          // })
      	} }>Click me</button>
      </div>
    )
  }
}

// 状态没有更新，不会触发 render。
// 可以使用 this.forceUpdate() 方法进行强制刷新；
// 强制刷新不会触发 shouldComponentUpdate 方法。
```

```jsx
// 函数组件

function App () {
  const [count, setCount] = useState(0);
  const [, _setCount] = useState({});

  console.log('render');

  const onClick = params => {
    _setCount({});
  }
  
  return (
  	<div>
    	<p>You Clicked { count } times</p>
      <button onClick={ onClick }>Click me</button>
    </div>
  );
};

// 函数组件可以定义内部的方法，使用方法赋值为空对象，进行强制刷新。
```



**7.  所有 hook 不能在 if、switch、for 中使用**

**8. 只能在组件中使用 hook （可以在自定义组件）**

**9. 所有的 hook 必须定义在最开始位置，方便阅读**

**10. 惰性初始化 state**

```js
const [count, setCount] = useState(() => {
  return 0;
});
```

## Effect Hook

### 副作用

Effect Hook 可以在函数组件中执行副作用操作。

> 纯函数只要和外部存在交互，就存在副作用。
>
> 1. 引用外部变量；
> 2. 调用外部函数；
>
> 相同的输入一定会引起相同的输出（纯函数）。

react 中，只要不是在组件渲染使用到的值，都是副作用。

> 副作用：修改 DOM，修改全局变量，ajax 等，计时器，存储相关。

### 副作用对比

**hooks**

```js
const [count, setCount] = useState();

useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

**class**

```js
componentDidMount () { }

componentDidUpdate () { }
```

hooks 中的 effect hook 相当于把 componentDidMount 和 componentDidUpdate 进行简单的合并。

### 执行时机

```js
function App () {
  console.log('render');
  
  useEffect(() => {
    console.log('effect');
  });
}
```

初次渲染之后，执行 useEffect。数据更新完成后，也会执行 useEffect。

> effect 在真实 DOM 的完成渲染执行。
>
> componentDidMount 、componentDidUpdate  在真实 DOM 渲染之前执行。

effect hook 中的钩子执行是异步的。

### effect 作用

告诉 React 组件需要在渲染后执行某些操作。React 会保存传递的函数，在 DOM 更新之后调用它。

在组件内部使用 effect 可以获取 state 变量。

useEffect 默认在第一次渲染之后和每次更新之后都会执行。React 保证每次运行 effect 时，DOM 都已经更新完毕。

> componentDidMount 、componentDidUpdate  会阻塞页面执行，effect 不会阻塞浏览器更新屏幕。
>
> 如果想在 DOM 更新之后使用 effect，需要用到 useLayoutEffect Hook API。

### effect 清除

```js
useEffect(() => {
  let timer = setInterval(() => {
    setCount(count + 1);
  });
  
  return () => {
    
  };
});
```

render 时，先执行清理函数，然后执行 render。

```js
render、useEffect -> render + 清理函数 + useEffect
									-> render + 清理函数 + useEffect
```

存在清理函数时，清理函数在每一次运行副作用函数之前执行。

每一次执行的副作用函数都是不同的函数，和上次的函数没有任何关系。

清理函数在组件销毁（移除）的时候也会执行。

### effect 第二个参数

指定当前 effect 函数所需要的依赖项。

如果依赖是空数组，只会在挂载（初次渲染）和卸载的时候执行。

如果存在依赖项并且依赖项不一致会重新执行 effect。

### 多个 effect 实现关注点分离

```jsx
useEffect(() => {
  document.title = 'You clicked ${count} times';
  console.log('effect');
})
```

=>

```js
useEffect(() => {
  document.title = 'You clicked ${count} times';
});

useEffect(() => {
  console.log('effect');
});
```

只需要保证 effect 的调用顺序，就可以实现关注点分离。

=> 

```js
// 自定义 hook

const useCount = params => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = 'You clicked ${count} times';
  });
  
  return [count, setCount];
}

const Foo = params => {
  const [count, setCount] = useCount();
  
  console.log('render');
  
  useEffect(() => {
    console.log('effect');
  });
}
```

### 竞态问题

```jsx
const API = {
  async queryEmployeesById (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id, currentDeparment: `currentDeparment: ${ id }` })
      }, 1000 / (5 - id));
    });
  }
};

const Deparment = props => {
  const [id] = props;
  const [employees, setEmployees] = useState({});
  
  useEffect(() => {
    (async function fetchDate () {
      const employees = await API.queryEmployeesById(id);
      setEmployees(employees);
    })();
  }, [id]);
  
  return (
  	<div>
    	<p>{ employees.currentDeparment }</p>
    </div>
  );
}

const App = params => {
  const [id, setId] = useState(1);
  
  return (
   <div>
   	<div>id: { id }</div>
    <Deparment id={ id }></Deparment>
    <button onClick={() => setId(id + 1)}>增加 ID</button>
   </div>
  );
}
```

可以在请求前给 effect 标识。

```js
const Deparment = props => {
  const [id] = props;
  const [employees, setEmployees] = useState({});
  
  useEffect(() => {
    let didCancel = false;
    
    (async function fetchDate () {
      const employees = await API.queryEmployeesById(id);
      
      if (!didCancel) {
        setEmployees(employees);
      }
    })();
    
    return () => {
      didCancel = true;
    };
  }, [id]);
  
  return (
  	<div>
    	<p>{ employees.currentDeparment }</p>
    </div>
  );
}
```

## 自定义 Hook

### 案例代码 1

```jsx
class App extends React.Component {
  state = {
    info: []
  };

  componentDidMount () {
    ;(async () => {
      const res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());

      this.setState({
        info: res
      });
    })();
  }

  itemTpl = item => {
    let tpl = '';

    for (var [key, value] of Object.entries(item)) {
      if (typeof value === 'object') {
        tpl += `<ul><li>${ key }: ${ this.itemTpl(value) }</li></ul>`;
      } else {
        tpl += `<li>${ key }: ${ value }</li>`;
      }
    }

    return tpl;
  }

  render () {
    const { info } = this.state;

    return <div>
      <ul dangerouslySetInnerHTML={{
        __html: info.map(item => this.itemTpl(item))
      }}></ul>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

### 案例代码 2

```jsx
function withInfo (Com) {
  return class extends React.Component {
    state = {
      info: []
    };
  
    componentDidMount () {
      ;(async () => {
        const res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());
  
        this.setState({
          info: res
        });
      })();
    }

    render () {
      return <Com {...this.state}></Com>;
    }
  }
}

export { withInfo };
```

```jsx
import { withInfo } from '../service/index';

class List extends React.PureComponent {
  render () {
    const { info, render } = this.props;

    return (
      <div>
        <ul dangerouslySetInnerHTML={{
          __html: info.map(item => render(item))
        }}></ul>
      </div>
    )
  }
}

class App extends React.Component {
  itemTpl = item => {
    let tpl = '';

    for (var [key, value] of Object.entries(item)) {
      if (typeof value === 'object') {
        tpl += `<ul><li>${ key }: ${ this.itemTpl(value) }</li></ul>`;
      } else {
        tpl += `<li>${ key }: ${ value }</li>`;
      }
    }

    return tpl;
  }

  render () {
    return <div>
      <List { ...this.props } render={ this.itemTpl } />
    </div>;
  }
}

const WithInfoApp = withInfo(App);

ReactDOM.render(<WithInfoApp />, document.getElementById('app'));
```

### 案例代码 3

```js
import { withInfo } from '../service/index';

class List extends React.PureComponent {
  render () {
    const { info, render } = this.props;

    return (
      <div>
        <ul dangerouslySetInnerHTML={{
          __html: info.map(item => render(item))
        }}></ul>
      </div>
    )
  }
}

class App extends React.Component {
  itemTpl = item => {
    return Object.entries(item).reduce((prev, [key, value]) => {
      if (typeof value === 'object') {
        prev += `<ul><li>${ key }: ${ this.itemTpl(value) }</li></ul>`;
      } else {
        prev += `<li>${ key }: ${ value }</li>`;
      }
      return prev;
    }, '');
  }

  render () {
    return <div>
      <List { ...this.props } render={ this.itemTpl } />
    </div>;
  }
}

const WithInfoApp = withInfo(App);

ReactDOM.render(<WithInfoApp />, document.getElementById('app'));
```

### 案例代码 4

```js
import { withInfo } from '../service/index';

class List extends React.PureComponent {
  render () {
    const { info, render } = this.props;

    return (
      <div>
        <ul dangerouslySetInnerHTML={{
          __html: info.map(item => render(item))
        }}></ul>
      </div>
    )
  }
}

class App extends React.Component {
  itemTpl = item => {
    return Object.entries(item).reduce((prev, [key, value]) => {
      return typeof value === 'object' 
        ? prev += `<ul><li>${ key }: ${ this.itemTpl(value) }</li></ul>`
        : prev += `<li>${ key }: ${ value }</li>`;
    }, '');
  }

  render () {
    return <div>
      <List { ...this.props } render={ this.itemTpl } />
    </div>;
  }
}

const WithInfoApp = withInfo(App);

ReactDOM.render(<WithInfoApp />, document.getElementById('app'));
```

### 案例代码 5

```js
const { useState, useEffect } = React;

const useList = (info, itemTpl) => {
  return (
    <ul dangerouslySetInnerHTML={{
      __html: info.map(item => itemTpl(item))
    }}></ul>
  )
}

const App = params => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    ;(async () => {
      const res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());

      setInfo(res);
    })();
  }, []);

  function itemTpl (item) {
    return Object.entries(item).reduce((prev, [key, value]) => {
      return typeof value === 'object' 
        ? prev += `<ul><li>${ key }: ${ itemTpl(value) }</li></ul>`
        : prev += `<li>${ key }: ${ value }</li>`;
    }, '');
  }

  return useList(info, itemTpl);
}

ReactDOM.render(<App />, document.getElementById('app'));
```

### 案例代码 6

```js
const { useState, useEffect } = React;

function useInfo () {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    ;(async () => {
      const res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());

      setInfo(res);
    })();
  }, []);

  return info;
}

export { useInfo };
```

```jsx
import { useInfo } from '../service/index';

const useList = (info, itemTpl) => {
  return (
    <ul dangerouslySetInnerHTML={{
      __html: info.map(item => itemTpl(item))
    }}></ul>
  )
}

const App = () => {
  const info = useInfo();

  function itemTpl (item) {
    return Object.entries(item).reduce((prev, [key, value]) => {
      return typeof value === 'object' 
        ? prev += `<ul><li>${ key }: ${ itemTpl(value) }</li></ul>`
        : prev += `<li>${ key }: ${ value }</li>`;
    }, '');
  }

  return useList(info, itemTpl);
}

ReactDOM.render(<App />, document.getElementById('app'));
```

### 总结

自定义 hook 是一种自然遵循 Hook 设计的约定，并不是 React 的特性。

自定义 hook 必须以 "use" 开头，这是一个约定。

> 如果不遵循此约定，React 无法自动检测 Hook 是否违反了 Hook 的规则。

多个组件使用相同的 hook 不会共享 state。

每次调用 Hook，都会获取独立的 state。

## Reducer Hook

```js
const { useState } = React;

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function useReducer (reducer, initialVal) {
  const [val, setVal] = useState(initialVal);

  const dispatch = (action) => {
    const newVal = reducer(val, action);
    setVal(newVal);
  }

  return [ val, dispatch ];
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      Count: { state.count }
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```jsx
const { useState, useReducer } = React;

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      Count: { state.count }
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

useReducer 有两种初始化 state 的方式。

```jsx
// 指定初始 state
const [state, dispatch] = useReducer(reducer, { count: initialCount });

// 惰性化 state，不常用
function init (initialCount) {
  return { count: initialCount };
}
const [state, dispatch] = useReducer(reducer, initialCount, init);
```

跳过 dispatch。

> 如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。
>
> React 使用 Object.is 比较算法来比较 state。

## Context Hook

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前值由上层组件距离当前组件最近的 `<MyContext.Provider>`  的 value prop 决定。

```jsx
const { Component, createContext, useContext } = React;

const AppContext = createContext();

class Foo extends Component {
  render () {
    return (
      <AppContext.Consumer>
        {
          value => <div>Foo: { value }</div>
        }
      </AppContext.Consumer>
    );
  }
}

class Bar extends Component {
  static contextType = AppContext;

  render () {
    const value = this.context;

    return <div>Bar: { value }</div>;
  }
}

const Baz = () => {
  const value = useContext(AppContext);

  return <div>Baz: { value }</div>;
}

const Middle = () => {
  return (
    <div>
      <Foo></Foo>      
      <Bar></Bar>
      <Baz></Baz>
    </div>
  )
}

const App = () => {
  return (
    <AppContext.Provider value={'月落'}>
      <Middle></Middle>
    </AppContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## useMemo、useCallback

把 ”创建“ 函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免每次渲染时都进行高开销的计算。传入 useMemo 的函数会在渲染期间执行。

> 不要在 useMemo 这个函数内部执行与渲染无关的操作，比如副作用这类的操作（useEffec）等。

```jsx
const { useState } = React;

const Foo = props => {
  return <ul>{ props.render() }</ul>;
}

function App () {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);

  const render = () => {
    const list = [];

    console.log('tigger');

    for (let i = 0; i < range.max; i++) {
      list.push(<li key={ i }>{ i }</li>);
    }

    return list;
  }

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => { setCount(count + 1) }}>add</button>
      <Foo render={ render }></Foo>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

=>

```jsx
const { useState, memo } = React;

// memo 是函数组件优化的一种方式，不希望子组件运行，不是 useMemo
const Foo = memo(props => {
  return <div>
    { props.count }
    <ul>{ props.render() }</ul>
  </div>;
});

function App () {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);

  const render = () => {
    const list = [];

    console.log('tigger');

    for (let i = 0; i < range.max; i++) {
      list.push(<li key={ i }>{ i }</li>);
    }

    return list;
  }

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => { setCount(count + 1) }}>add</button>
      <Foo count={ count } render={ render }></Foo>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

=> 

```jsx
const { useState, memo, useCallback } = React;

const Foo = memo(props => {
  console.log('foo trigger')

  return <div>
    <ul>{ props.render() }</ul>
  </div>;
});

function App () {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);
 
  // useCallback 可以确定一个函数，将函数固定
  const render = useCallback(() => {
    const list = [];

    console.log('tigger');

    for (let i = 0; i < range.max; i++) {
      list.push(<li key={ i }>{ i }</li>);
    }

    return list;
  }, [range]);

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => { setCount(count + 1) }}>add</button>
      <Foo render={ render }></Foo>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

=> 

```jsx
const { useState, memo, useCallback, useMemo } = React;

const Foo = memo(props => {
  console.log('foo trigger')

  return <div>
    <ul>{ props.render }</ul>
  </div>;
});

function App () {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);
 
  // useMemo 用来修饰值，固定值
  const render = useMemo(() => {
    const list = [];

    console.log('tigger');

    for (let i = 0; i < range.max; i++) {
      list.push(<li key={ i }>{ i }</li>);
    }

    return list;
  }, [range]);

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => { setCount(count + 1) }}>add</button>
      <Foo render={ render }></Foo>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```jsx
const { useState, memo, useCallback, useMemo } = React;

const Foo = memo(props => {
  console.log('foo trigger')

  return <div>
    <ul>{ props.render }</ul>
  </div>;
});

function App () {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);

  const render = useMemo(() => {
    const list = [];

    console.log('tigger');

    for (let i = 0; i < range.max; i++) {
      list.push(<li key={ i }>{ i }</li>);
    }

    return list;
  }, [range]);

  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={() => { setRange({
        ...range,
        max: range.max + 1
      }) }}>add</button>
      <Foo render={ render }></Foo>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```



memo 用于组件优化、函数组件使用 memo，类组件使用 PureComponent。

useMemo 用来固定值，类组件传递固定值就可以。

> 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。初次渲染。

useCallback 用来固定函数，类组件使用箭头函数的形式传递固定函数引用。

> useCallback(fn. dps)，相当于 useMemo(() => fn, deps)。

## useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
返回的 ref 对象在组件的整个生命周期内保持不变。

```jsx
const { createRef } = React;

class App extends React.Component {
  inputRef = createRef();

  onClick = () => {
    this.inputRef.current.focus();
  }

  render () {
    return <div>
      <input type="text" ref={ this.inputRef } />
      <button onClick={ this.onClick }>button</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```js
const { createRef } = React;

class Foo extends React.Component {
  inputRef = createRef();

  focus = () => {
    this.inputRef.current.focus();
  }

  render () {
    return <input type="text" ref={ this.inputRef } />;
  }
}

class App extends React.Component {
  inputRef = createRef();

  onClick = () => {
    this.inputRef.current.focus();
  }

  render () {
    return <div>
      <Foo ref={ this.inputRef } />
      <button onClick={ this.onClick }>button</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

类组件中，ref 可以是原生 DOM，也可以是子组件。

```jsx
const { createRef, forwardRef } = React;

const Foo = forwardRef((params, inputRef) => {
  return <input type="text" ref={ inputRef } />;
});

class App extends React.Component {
  inputRef = createRef();

  onClick = () => {
    this.inputRef.current.focus();
  }

  render () {
    return <div>
      <Foo ref={ this.inputRef } />
      <button onClick={ this.onClick }>button</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

函数组件中没有 ref，可以通过函数转发。

```jsx
const { createRef, forwardRef } = React;

const Foo = forwardRef((params, inputRef) => {
  return <input type="text" ref={ inputRef } />;
});

const App = () => {
  const inputRef = createRef();

  const onClick = () => {
    inputRef.current.focus();
  }

  return <div>
    <Foo ref={ inputRef } />
    <button onClick={ onClick }>button</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```jsx
const { createRef, forwardRef, useRef } = React;

const Foo = forwardRef((params, inputRef) => {
  return <input type="text" ref={ inputRef } />;
});

const App = () => {
  const inputRef = useRef();

  const onClick = () => {
    inputRef.current.focus();
  }

  return <div>
    <Foo ref={ inputRef } />
    <button onClick={ onClick }>button</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
```

钩子在每次执行时，都返回同一个引用。函数组件更新时会执行整个函数进行更新。

父组件通过 fowardRef 的方式获取到子组件的原生 DOM。可以删除原生 DOM（不太友好，权限太大）。

##useImperativeHandle

useImperativeHandle 可以让你在使用 ref 时自定义暴露出父组件的实例值。可以有效控制父组件范围。

```jsx
const { createRef, forwardRef, useRef, useImperativeHandle } = React;

const Foo = forwardRef((params, inputRef1) => {
  const inputRef = useRef();

  useImperativeHandle(inputRef1, () => ({
    focus () {
      inputRef.current.focus();
    }
  }));

  return <input type="text" ref={ inputRef } />;
});

const App = () => {
  const inputRef = useRef();

  const onClick = () => {
    inputRef.current.focus();
  }

  return <div>
    <Foo ref={ inputRef } />
    <button onClick={ onClick }>button</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
```

=>

```jsx
const { createRef, forwardRef, useRef } = React;

// 自定义实现 ref
const useImperativeHandle = (ref, cb) => {
  ref.current = cb();
}

const Foo = forwardRef((params, inputRef1) => {
  const inputRef = useRef();

  useImperativeHandle(inputRef1, () => ({
    focus () {
      inputRef.current.focus();
    }
  }));

  return <input type="text" ref={ inputRef } />;
});

const App = () => {
  const inputRef = useRef();

  const onClick = () => {
    inputRef.current.focus();
  }

  return <div>
    <Foo ref={ inputRef } />
    <button onClick={ onClick }>button</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
```



```js
const { useRef, createRef, useState } = React;

window.arr = [];

const App = params => {
  const [count, setCount] = useState(0);

  const useRef1 = useRef();
  const createRef1 = createRef();

  window.arr.push(useRef1, createRef1);

  return (
    <div>
      { count }
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

// 每次刷新时，useRef 是同一引用，createRef 不是同一引用。
// arr[0] === arr[2];
// arr[1] !== arr[3];

// 
```



```js
class App extends React.Component {
  inputRef;

  onClick = () => {
    console.log(this.inputRef);
  }

  render () {
    return (
      <div>
        <input type="text" ref={ ref => this.inputRef = ref } />
        <button onClick={ this.onClick }>add</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```js

const App = params => {
  let inputRef;

  const onClick = () => {
    console.log(inputRef);
  }

  return (
    <div>
      <input type="text" ref={ ref => inputRef = ref } />
      <button onClick={ onClick }>add</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## useLayoutEffect

其用法和 useEffect 一致，不同的是它会在所有的 DOM 变更之后同步调用 effect。可以使用它读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新将被同步刷新。

> 如果将 class 组件迁移至 Hook 组件，useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的。不过推荐先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。

尽可能使用标准的 useEffect 以避免阻塞视觉更新。useEffect 在 DOM 渲染完成之后执行。

```jsx
// useEffect

const { useState, useEffect } = React;

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(count);
    }, 3 * 1000); 
  }, [count]);

  return (
   <div>
     <p>{ count }</p>
     <button
      onClick={() => setCount(count + 1)}
     >
       add
     </button>
   </div> 
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```jsx
// useEffect 存在动画效果

const { useState, useEffect, useRef } = React;

const App = () => {
  const ref = useRef();
  const [, setCount] = useState({});

  useEffect(() => {
    setTimeout(() => {
      ref.current.style.transform = 'translate(500px)';
      ref.current.style.transition = 'all .5s';
    }, 3 * 1000);

    return () => {
      ref.current.style.transform = 'translate(0px)';
      ref.current.style.transition = 'all .5s';
    }
  });

  let styleObj = {
    width: '100px',
    height: '100px',
    background: 'orange'
  };

  return <div>
    <div style={ styleObj } ref={ ref }></div>
      <button onClick={ () => setCount({}) }>Click</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));

// useLayoutEffect 无动画效果
const { useState, useEffect, useRef, useLayoutEffect } = React;

const App = () => {
  const ref = useRef();
  const [, setCount] = useState({});

  useLayoutEffect(() => {
    ref.current.style.transform = 'translate(500px)';
    ref.current.style.transition = 'all .5s';

    return () => {
      ref.current.style.transform = 'translate(0px)';
      ref.current.style.transition = 'all .5s';
    }
  });

  let styleObj = {
    width: '100px',
    height: '100px',
    background: 'orange'
  };

  return <div>
    <div style={ styleObj } ref={ ref }></div>
      <button onClick={ () => setCount({}) }>Click</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
```

如果使用服务端渲染，useLayoutEffect 和 useEffect 都无法使用。

## useDebugValue

useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

```jsx
useDebugValue('这是重要的信息，不允许改动');
```

不推荐向每个自定义 hook 添加 debug 值，当它作为共享库的一部分时才最有价值。

## Hook 原理

React 保持对当前渲染中的组件的追踪，Hook 只会在 React 组件中被调用。

每个组件内部都有一个记忆单元格。它们用来存储一些数据的 JavaScript 对象。当你用 useState 调用一个 Hook 时，它会读取当前的单元格（首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。