# React 性能优化

React 组件性能优化的核心是减少渲染真实 DOM 节点的频率，减少 Virtual DOM 比对的频率。

## 组件卸载前进行清理操作

组件中 window 注册的全局事件，以及定时器，在组件卸载前要清理掉，防止组件卸载后继续执行影响应用性能。

Timer.js

```jsx
import { useEffect } from 'react';

function Timer () {
  useEffect(() => {
    setInterval(() => {
      console.log('timer running.');
    }, 1000);
  }, []);

  return (
    <div>Timer Test</div>
  )
}

export default Timer;
```

App.js

```jsx
import { useState } from "react";
import Timer from "./Timer";

function App() {
  const [flag, setFlag] = useState(false);

  return (
    <div className="App">
      { flag && <Timer /> }
      <button onClick={ () => setFlag(!flag) }>Click</button>
    </div>
  );
}

export default App;
```

如果在组件卸载时不清除定时器，定时器会继续执行。

```jsx
import { useEffect } from 'react';

function Timer () {
  useEffect(() => {
    let timer = setInterval(() => {
      console.log('timer running.');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>Timer Test</div>
  )
}

export default Timer;
```

## 纯组件提升组件性能（类组件）

纯组件会对组件输入数据进行浅层比较，如果当前输入数据和上次输入数据相同，组件不会重新渲染。

> 浅层比较：在比较引用数据类型在内存中的引用地址是否相同，比较基本数据类型的值是否相同。
>
> 浅层比较相对于 diff 操作，会减少性能消耗。diff 操作会重新遍历整棵 virtualDOM 树，浅层比较只操作当前组件的 state 和 props。

实现纯组件：类组件继承 PureComponent 类，函数组件使用 memo 方法。

```jsx
import { Component, PureComponent } from "react";

class ReguarComponent extends Component {
  render () {
    console.log('ReguarComponent')
    return (
      <div>ReguarComponent:{ this.props.name }</div>
    )
  }
}

class PureComponentDemo extends PureComponent {
  render () {
    console.log('PureComponentDemo')
    return (
      <div>PureComponentDemo:{ this.props.name }</div>
    )
  }
}

class App extends Component {
  constructor () {
    super();

    this.state = {
      name: '月落'
    }
  }

  updateName () {
    setInterval(() => {
      this.setState({
        name: '月落'
      });
    }, 1000)
  }

  componentDidMount() {
    this.updateName();
  }

  render() {
    return (
      <>
        <ReguarComponent name={ this.state.name } />
        <PureComponentDemo name={ this.state.name } />
      </>
    )
  }
}

export default App;
```

非纯组件每次都会重新渲染。纯组件只会在数据发生变化时才会重新渲染。

## 纯组件提升组件性能（函数组件）

memo 可以将函数组件变为纯组件，将当前 props 和上一次的 props 进行浅层比较，如果相同就阻止组件重新渲染。

```jsx
import { useEffect, useState, memo } from "react";

const ShowName = memo(function ({ name }) {
  console.log('rendering');

  return (
    <div>{ name }</div>
  )
});

function App () {
  const [name] = useState('heora');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  return (
    <div>
      { count }
      <ShowName name={ name } />
    </div>
  )
}

export default App;
```

## shouldComponentUpdate

纯组件只能进行浅层比较，要进行深层比较，使用 shouldComponentUpdate，可以用它编写自定义比较逻辑。返回 true 重新渲染组件，返回 false 阻止重新渲染。

函数的第一个参数为 nextProps，第二个参数为 nextState。

```jsx
import { Component } from "react";

class App extends Component {
  constructor () {
    super();

    this.state = {
      person: {
        name: '月落',
        age: 23,
        job: 'waiter'
      }
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        person: {
          ...this.state.person,
          job: 'chef'
        }
      })
    }, 2000)
    setTimeout(() => {
      this.setState({
        person: {
          ...this.state.person,
          name: 'heora'
        }
      })
    }, 4000)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.person.name !== this.state.person.name || nextState.person.age !== this.state.person.age) {
      return true;
    }

    return false;
  }

  render() {
    const { name, age } = this.state.person;

    console.log('render');

    return (
      <div>
        { name }{ age }
      </div>
    )
  }
}

export default App;
```

## memo 方法 - 自定义比较逻辑

memo 方法第二个参数返回 false 重新渲染，返回 true 不会重新渲染。与 shouldComponentUpdate 正好相反。

```jsx
import { useEffect, useState, memo } from "react";

function compare (prevProps, nextProps) {
  if (prevProps.person.name !== nextProps.person.name || prevProps.person.age !== nextProps.person.age) {
    return false;
  }
  return true;
}

const ShowPerson = memo(function ({ person }) {
  console.log('rendering');

  return (
    <div>{ person.name }</div>
  )
}, compare);

function App () {
  const [person, setPerson] = useState({
    name: '月落',
    age: 23,
    job: 'waiter'
  });

  useEffect(() => {
    setInterval(() => {
      setPerson({
        ...person,
        job: 'chef'
      });
    }, 1000);
  }, []);

  return (
    <div>
      <ShowPerson person={person} />
    </div>
  )
}

export default App;
```

memo 方法内部仍然是浅层比较，如果是引用数据类型，需要传递自定义比较逻辑。

## 组件懒加载

使用组件懒加载可以减少 bundle 文件大小，加快首屏渲染速度。

### 路由懒加载

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: "home" */'./pages/Home'));
const List = lazy(() => import(/* webpackChunkName: "list" */'./pages/List'));

function App () {
  return (
    <BrowserRouter>
      <Link to="/">首页</Link>
      <Link to="/list">列表页</Link>

      <Switch>
        <Suspense fallback={ <div>loading...</div> }>
          <Route path="/" component={ Home } exact />
          <Route path="/list" component={ List } />
        </Suspense>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
```

### 条件判断懒加载

适用于组件不会随条件频繁切换的场景。

```jsx
import { lazy, Suspense } from 'react';

function App () {
  let LazyComponent = null;

  if (true) {
    LazyComponent = lazy(() => import(/* webpackChunkName: "home" */'./pages/Home'));
  } else {
    LazyComponent = lazy(() => import(/* webpackChunkName: "list" */'./pages/List'));
  }

  return (
    <div>
      <Suspense fallback={ <div>loading...</div> }>
        <LazyComponent />
      </Suspense>
    </div>
  )
}

export default App;
```

## 占位符标记提升渲染性能

React 组件中返回的 JSX 如果存在多个同级元素，多个同级元素必须要由一个共同的父级。

为了满足这个条件通常我们都会在最外层添加一个 div，但是这样就会多出一个无意义的标记，如果每个组件都多出一个无意义标记，浏览器渲染引擎的负担就会加重。

为了解决这个问题，React 推出了 fragment 占位符标记，使用占位符标记既满足了拥有相同父级的要求又不会多出额外的无意义标记。

```jsx
import { Fragment } from "react";

function App () {
  return (
    <>
      <Fragment>
        <div>Box1</div>
        <div>Box2</div>
      </Fragment>
      <>
        <div>Box3</div>
        <div>Box4</div>
      </>
    </>
  )
}

export default App;
```

## 构造函数中进行 this 指向更正

在类组件中如果使用 fn() {} 这种方式定义函数，函数 this 默认指向 undefined，函数内部的 this 指向需要被更正。

可以在构造函数中对函数的 this 进行更正，也可以在行内进行更正，两者看起来没有很大区别，但是对性能的影响是不同的。

```jsx
export default class App extends React.Component {
  construator () {
    super();
    // 构造函数只执行一次，所以函数 this 指向更正的代码也只执行一次
    this.handleClick = this.changeClik.bind(this);
  }
  
  handleClick () {
    console.log(this);
  }
  
  render () {
    // render 方法每次执行时都会调用 bind 方法生成新的函数实例
    return <button onClick={ this.handleClick.bind(this) }>Click</button>
  }
}
```

## 类组件中的箭头函数

类组件中使用箭头函数不会存在 this 指向问题，因为箭头函数本身并不绑定 this。

```jsx
export default class App extends React.Component {
  handleClick = () => {
    console.log(this);
  }
  
  render () {
    return <button onClick={ this.handleClick }>Click</button>
  }
}
```

箭头函数在 this 指向问题上很占优势，但是同时也存在不利的一面。

当使用箭头函数时，该函数被添加为类的实例对象属性，而不是原型对象属性。如果组件被多次重用，每个组件实例对象中都将有一个相同的函数实例，降低了函数实例的可重用性，造成了资源浪费。

综上所述，更正函数内部 this 的指向的最佳做法仍然是在构造函数中使用 bind 方法进行绑定。

## 避免使用内联函数

在使用内联函数后，render 方法每次运行时都会创建该函数的新实例，导致 React 在运行 Virtual DOM 比对时，新旧函数比对不相等，导致 React 总是为元素绑定新的函数实例，而旧的函数实例又要交给垃圾回收器处理。

```jsx
// 错误示范

<input onChange={() => console.log('')} />
```

```jsx
// 正确示范

handleChange = () => {}

<input onChange={ handleChange } />
```

正确的方法是在组件中单独定义函数，将函数绑定给事件。

## 避免使用内联样式属性

