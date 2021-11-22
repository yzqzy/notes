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

当使用内联样式为元素添加样式时，内联样式会被编译为 JavaScript 代码，通过 JavaScript 代码将样式规则映射到元素的身上，浏览器就会花费更多的时间执行脚本和渲染 UI，从而增加了组件的渲染时间。

```jsx
function App () {
  return <div style={{ backgroundColor: 'skyblue' }}>App works</div>
}
```

在上面的组件中，为元素附加了内联样式，添加的内联样式为 JavaScript 对象，backgroundColor 需要被转换为等效的 CSS 样式规则，然后将其应用到元素，这样涉及到脚本的执行。

更好的方法是将 CSS 文件导入样式组件，能通过 CSS 直接做的事情就不要通过 JavaScript 去做，因为 JavaScript 操作 DOM 很慢。

## 优化条件渲染

频繁的挂载和卸载组件是一项耗性能的操作，为了操作应用程序的性能，应该减少组件卸载和卸载的次数。

在 React 中我们经常会根据条件渲染不同的组件，条件渲染是一项必做的优化操作。

```jsx
function App () {
  if (true) {
    return (
    	<>
      	<AdminHeader />
      	<Header />
        <Content />
      </>
    )
  } else {
    return (
    	<>
      	<Header />
        <Content />
      </>
    )
  }
}
```

上面的代码中，让渲染条件发生变化时，React 内部在做 Virtual DOM 对比时发现，刚刚第一个组件时 AdminHeader，现在第一个组件时 Header，刚刚第二个组件是 Header，现在第二个组件是 Content，组件发生了变化，React 就会卸载 AdminHeader、Header、Content，重新挂载 Header 和 Content，这种挂载和卸载就是没有必须的。

```jsx
function App () {
  return (
    <>
    { true && <AdminHeader /> }
    <Header />
    <Content />
    </>
  )
}
```

## 避免重复无限渲染

当应用程序状态发生更改时，React 会调用 render 方法，如果在 render 方法中继续更改应用程序状态，就会发生 render 方法递归调用导致应用报错。

> 如果重复连续渲染 50 次，就会报错。

与其他生命周期函数不同，render 方法应该被作为纯函数。这意味着，在 render 方法中不要做以下事情，比如不要调用 setState 方法，不要使用其他手段查询更改原生 DOM 元素，以及其他更改应用程序的任何操作。render 方法的执行要根据状态的改变，这样可以保持组件的行为和渲染方式一致。

## 为组件创建错误边界

默认情况下，组件渲染错误会导致整个应用程序中断，创建错误边界可确保在特定组件发生错误时应用程序不会中断。

错误边界是一个 React 组件，可以捕获子级组件在渲染时发生的错误，当错误发生时，可以将错误记录下来，显示在备用 UI 界面。

错误边界涉及到两个生命周期函数，分别为 getDerivedStateFromError 和 componentDidCatch。

getDerivedStateFromError 为静态方法，方法中需要返回一个对象，该对象会和 state 对象进行合并，用于更改应用程序状态。

componentDidCatch 方法用于记录应用程序错误信息，该方法的参数就是错误对象。

**ErrorBoundaries.js**

```jsx
import { Component } from "react";

export default class ErrorBoundaries extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false
    }
  }

  componentDidCatch (error) {
    console.log('error：', error);
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render () {
    if (this.state.hasError) {
      return <div>发生未知错误</div>
    }

    return this.props.children;
  }
}
```

**App.js**

```jsx
import { Fragment } from "react";

function App () {
  throw new Error('error');

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

**index.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundaries from "./ErrorBoundaries";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundaries>
      <App />
    </ErrorBoundaries>
  </React.StrictMode>,
  document.getElementById('root')
);
```

> 注意：错误边界不能捕获异步错误，比如点击按钮时发生的错误。

## 避免数据结构突变

组件 props 和 state 的数据结构应该保持一致，数据结构突变会导致输出不一致。

```jsx
// 错误示范

import { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      employee: {
        name: '张三',
        age: 20
      }
    }
  }

  render () {
    const { name, age } = this.state.employee;

    return (
      <div>
        <p>{ name }-{ age }</p>
        <button
          onClick={() => this.setState({
            ...this.state,
            employee: {
              name: '李四'
            }
          })}
        >Click</button>
      </div>
    )
  }
}

export default App;
```

```jsx
// 正确示范

import { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      employee: {
        name: '张三',
        age: 20
      }
    }
  }

  render () {
    const { name, age } = this.state.employee;

    return (
      <div>
        <p>{ name }-{ age }</p>
        <button
          onClick={() => this.setState({
            ...this.state,
            employee: {
              ...this.state.employee,
              name: '李四'
            }
          })}
        >Click</button>
      </div>
    )
  }
}

export default App;
```

## 优化依赖项大小

应用程序中经常会依赖第三方包，但我们不想引用包中的所有代码，我们只想用到哪些代码就包含哪些代码。

此时可以使用插件对依赖项进行优化。下面以 lodash 举例。

### 操作步骤

```js
yarn add react-app-rewired customize-cra lodash babel-plugin-lodash
```

react-app-rewired: 覆盖 create-react-app 的默认配置。

```js
module.exports = function (oldConfig) {}
```

customize-cra：导出一些辅助方法，可以简化上述写法

* override：可以接收多个参数，每个参数都是一个配置函数，函数接收 oldConfig，返回 newConfig
* useBabelRc：允许使用 .babelrc 文件进行 babel 配置

```js
const { override, useBabelRc } = require('customize-cra');

module.exports = override(
	(oldConfig) => newConfig,
  (oldConfig) => newConfig
)
```

babel-plugin-lodash：对应用中的 lodash 进行精简

### 示例代码

根目录下新建 config-overrides.js，并加入配置代码。

```jsx
const { override, useBabelRc } = require('customize-cra');

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
```

修改 package.json 文件的构建命令。

```jsx
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom",
  "eject": "react-scripts eject"
},
```

创建 .babelrc 文件并加入如下配置

```jsx
{
  "plugins": ["lodash"]
}
```

生产环境下的三种 js 文件

* main.[hash].chunk.js：应用程序代码，App.js 等
* 1.[hash].chunk.js：第三方库的代码，包含 node_modules 中导入的模块
* runtime-main.[hash].js：webpack 运行时代码

App.js

```jsx
import { Component } from "react";
import _ from 'lodash';

class App extends Component {
  render () {
    console.log(_.chunk(['a', 'b', 'c', 'd', 'e'], 2));

    return (
      <div>App Works</div>
    )
  }
}

export default App;
```

