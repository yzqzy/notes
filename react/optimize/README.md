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

使用组件懒加载可以减少 bundle 文件大小，加快组件渲染速度。



