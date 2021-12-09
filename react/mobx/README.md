# Mobx 6

## 概述

Mobx 是一个简单的可扩展的状态管理库，无样板代码，=风格简约。

目前最新版本是 6，版本 4 和版本 5 已不再支持。

Mobx 6 中不推荐使用装饰器语法，因为它不是 ES 标准，并且标准化过程要花费很长时间，但是通过配置仍然可以启用装饰器语法。

Mobx 可以运行在任何支持 ES5 的环境中，包含浏览器和 Node。

Mobx 通过和 React 配合使用，但是在 Angular 和 Vue 中也可以使用。

## 核心概念

observable：被 Mobx 跟踪的状态

action：允许修改状态的方法，在严格模式下只有 action 方法被允许修改状态

computed：根据现有状态衍生出来的状态

flow：执行副作用，它是 generator 函数。可以更改状态值。

## 工作流程

<img src="../images/mobx.png" style="zoom: 70%" />

* mobx：Mobx 核心库
* mobx-react-lite：仅支持函数组件
* mobx-react：既支持函数组件也支持类组件

```js
yarn add mobx mobx-react-lite
```

## 计数器案例

**创建用于存储状态的 store，创建用于修改状态的方法**

```js
export default class CounterStore {
  constructor () {
    this.count = 0;
  }

  increment () {
    this.count += 1;
  }

  decrement () {
    this.count -= 1;
  }
}
```

**让 Mobx 可以追踪状态变化**

* 通过 observable 标识状态，使状态可观察
* 通过 action 标识修改状态的方法，状态只有通过 action 方法修改后才会通知视图更新

```js
import { action, makeObservable, observable } from "mobx";

export default class CounterStore {
  constructor () {
    this.count = 0;

    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action
    });
  }

  increment () {
    this.count += 1;
  }

  decrement () {
    this.count -= 1;
  }
}
```

**创建 Store 类的实例对象并将实例对象传递给组件**

```js
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
```

**组件中通过 Store 实例对象获取状态以及操作状态的方法**

```jsx
function Counter ({ store }) {
  return (
    <div>
      <button onClick={ () => store.increment() }>+</button>
      <span>{ store.count }</span>
      <button onClick={ () => store.decrement() }>-</button>
    </div>
  )
}

export default Counter;
```

**当组件中使用到的 Mobx 管理的状态发生变化后，使视图更新。通过 observer 方法包裹组件**

```jsx
import { observer } from "mobx-react-lite";

function Counter ({ store }) {
  return (
    <div>
      <button onClick={ () => store.increment() }>+</button>
      <span>{ store.count }</span>
      <button onClick={ () => store.decrement() }>-</button>
    </div>
  )
}

export default observer(Counter);
```

**修改 action this 指向**

```js
import { action, makeObservable, observable } from "mobx";

export default class CounterStore {
  constructor () {
    this.count = 0;

    makeObservable(this, {
      count: observable,
      increment: action.bound,
      decrement: action.bound
    });
  }

  increment () {
    this.count += 1;
  }

  decrement () {
    this.count -= 1;
  }
}
```

```jsx
import { observer } from "mobx-react-lite";

function Counter ({ store }) {
  const { count, increment, decrement } = store;

  return (
    <div>
      <button onClick={ increment }>+</button>
      <span>{ count }</span>
      <button onClick={ decrement }>-</button>
    </div>
  )
}

export default observer(Counter);
```

**使用总结**

状态变化更新视图的必要条件

* 状态必须被标记为 observable
* 更改状态的方法必须被标记为 action
* 组件必须通过 observer 方法包裹

**创建 RootStore**

在应用中可以存在多个 Store，多个 Store 最终要通过 RootState 管理，在每个组件都需要获取到 RootState（状态共享）。

```js
```

