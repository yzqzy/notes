# Mobx 6

## 概述

Mobx 是一个简单的可扩展的状态管理库，无样板代码，风格简约。

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

### 创建存储状态

创建用于存储状态的 store，创建用于修改状态的方法

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

### 追踪状态变化

让 Mobx 可以追踪状态变化

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

### 传递状态

创建 Store 类的实例对象并将实例对象传递给组件

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

### 获取、操作状态

组件中通过 Store 实例对象获取状态以及操作状态的方法

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

### 更新视图

当组件中使用到的 Mobx 管理的状态发生变化后，使视图更新。通过 observer 方法包裹组件

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

### 修改 action this 指向

修改 action this 指向

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

### 使用总结

状态变化更新视图的必要条件

* 状态必须被标记为 observable
* 更改状态的方法必须被标记为 action
* 组件必须通过 observer 方法包裹

### 创建 RootStore

在应用中可以存在多个 Store，多个 Store 最终要通过 RootState 管理，在每个组件都需要获取到 RootState（状态共享）。

```jsx
// store/idnex.js

import CounterStore from "./CounterStore";
import { createContext, useContext } from "react";

class RootStore {
  constructor () {
    this.counterStore = new CounterStore();
  }
}

const rootStore = new RootStore();

const RootStoreContext = createContext();

export const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContext.Provider value={ rootStore }>{ children }</RootStoreContext.Provider>
  )
};

export const useRootStore = () => {
  return useContext(RootStoreContext);
}
```

```jsx
// App.js

import React from "react";
import Counter from './components/Counter';
import { RootStoreProvider } from './store/index';

function App () {
  return (
    <RootStoreProvider>
      <Counter />
    </RootStoreProvider>
  );
}

export default App;
```

```jsx
// components/Counter.js

import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";

function Counter () {
  const { counterStore } = useRootStore();
  const { count, increment, decrement } = counterStore;

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

## todo 案例

### 创建 todo 状态

store/Todo.js

```js
import { makeObservable, observable } from "mobx";

export default class Todo {
  constructor (todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.isCompleted = todo.isCompleted || false;
    this.isEditing = false;

    makeObservable(this, {
      title: observable,
      isCompleted: observable,
      isEditing: observable
    });
  }
}
```

src/TodoStore.js

```js
import { makeObservable, observable } from "mobx";

export default class TodoStore {
  constructor () {
    this.todos = []

    makeObservable(this, {
      todos: observable
    })
  }
}
```

store/index.js

```js
import CounterStore from "./CounterStore";
import TodoStore from "./TodoStore";
import { createContext, useContext } from "react";

class RootStore {
  constructor () {
    this.counterStore = new CounterStore();
    this.todoStore = new TodoStore();
  }
}

const rootStore = new RootStore();

const RootStoreContext = createContext();

export const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContext.Provider value={ rootStore }>{ children }</RootStoreContext.Provider>
  )
};

export const useRootStore = () => {
  return useContext(RootStoreContext);
}
```

### 添加任务

components/Todo/Header.js

```jsx
import { useState } from "react"
import { useRootStore } from "../../store";

function Header () {
  const [title, setTitle] = useState('');
  const { todoStore } = useRootStore();
  const { addTodo } = todoStore;

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="what needs to be done?"
        autoFocus
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
        onKeyUp={e => {
          if (e.key !== 'Enter') return;

          addTodo(title);
          setTitle('');
        }}
      />
    </header>
  )
}

export default Header;
```

components/Todo/index.js

```jsx
import Header from "./Header";

const Todo = () => {
  return (
    <Header />
  )
}

export default Todo;
```

store/TodoStore.js

```js
import { action, makeObservable, observable } from "mobx";
import Todo from './Todo';

export default class TodoStore {
  constructor () {
    this.todos = []

    makeObservable(this, {
      todos: observable,
      addTodo: action.bound
    });
  }

  addTodo (title) {
    this.todos.push(new Todo({
      title,
      id: this.createId() 
    }));

    console.log(this.todos);
  }

  createId () {
    if (!this.todos.length) return 1;

    return this.todos.reduce((id, todo) => (id < todo.id ? todo.id : id), 0) + 1;
  }
}
```

App.js

```jsx
import React from "react";
import Counter from './components/Counter';
import Todo from "./components/Todo";
import { RootStoreProvider } from './store/index';

function App () {
  return (
    <RootStoreProvider>
      <Counter />
      <Todo />
    </RootStoreProvider>
  );
}

export default App;
```

### 展示任务列表

components/Todos/Main.js

```jsx
import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

function Todo ({ todo }) {
  return (
    <li>
      <label>{ todo.title }</label>
    </li>
  )
}

function Main () {
  const { todoStore } = useRootStore();
  const { todos } =  todoStore;

  return (
    <section>
      <ul>
        {
          todos.map(todo => <Todo todo={ todo } key={ todo.id } />)
        }
      </ul>
    </section>
  )
}

export default observer(Main);
```

components/Todos/index.js

```jsx
import Header from "./Header";
import Main from "./Main";

const Todo = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default Todo;
```

### 加载远端任务

**mock 数据**

db.json

```js
{
  "todos": [
    {
      "id": 1,
      "title": "吃饭",
      "isCompleted": false
    },
    {
      "id": 2,
      "title": "睡觉",
      "isCompleted": false
    },
    {
      "id": 3,
      "title": "打豆豆",
      "isCompleted": false
    }
  ]
}
```

**package.json**

```js
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "server": "json-server --watch ./db.json --port 3001"
},
```

src/store/TodoStore.js

```js
import { action, flow, makeObservable, observable } from "mobx";
import Todo from './Todo';
import axios from 'axios';

export default class TodoStore {
  constructor () {
    this.todos = []

    makeObservable(this, {
      todos: observable,
      addTodo: action.bound,
      loadTodos: flow.bound
    });

    this.loadTodos();
  }

  *loadTodos () {
    const response = yield axios.get('http://localhost:3001/todos');

    response.data.forEach(todo =>  this.todos.push(new Todo(todo)));
  }

  addTodo (title) {
    this.todos.push(new Todo({
      title,
      id: this.createId() 
    }));

    console.log(this.todos);
  }

  createId () {
    if (!this.todos.length) return 1;

    return this.todos.reduce((id, todo) => (id < todo.id ? todo.id : id), 0) + 1;
  }
}
```

### 更改任务完成状态

components/Todo/Main.js

```jsx
import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

const TodoCompleted = observer(({ todo }) => {
  const { isCompleted, modifyTodoIsCompleted } = todo;

  return (
    <input
      type="checkbox"
      checked={ isCompleted }
      onChange={ modifyTodoIsCompleted }
    />
  )
});

function Todo ({ todo }) {
  return (
    <li>
      <TodoCompleted todo={ todo } />
      <label>{ todo.title }</label>
    </li>
  )
}

function Main () {
  const { todoStore } = useRootStore();
  const { todos } =  todoStore;

  return (
    <section>
      <ul>
        {
          todos.map(todo => <Todo todo={ todo } key={ todo.id } />)
        }
      </ul>
    </section>
  )
}

export default observer(Main);
```

store/Todo.js

```js
import { action, makeObservable, observable } from "mobx";

export default class Todo {
  constructor (todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.isCompleted = todo.isCompleted || false;
    this.isEditing = false;

    makeObservable(this, {
      title: observable,
      isCompleted: observable,
      isEditing: observable,
      modifyTodoIsCompleted: action.bound
    });
  }

  modifyTodoIsCompleted () {
    this.isCompleted = !this.isCompleted;
  }
}
```

### 删除任务

components/Todo/Main.js

```jsx
import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

const TodoCompleted = observer(({ todo }) => {
  const { isCompleted, modifyTodoIsCompleted } = todo;

  return (
    <input
      type="checkbox"
      checked={ isCompleted }
      onChange={ modifyTodoIsCompleted }
    />
  )
});

const TodoRemove = observer(({ id }) => {
  const { todoStore } = useRootStore();
  const { removeTodo } = todoStore;

  return (
    <button onClick={ () => removeTodo(id) } >Delete</button>
  )
});

function Todo ({ todo }) {
  return (
    <li>
      <TodoCompleted todo={ todo } />
      <label>{ todo.title }</label>
      <TodoRemove id={ todo.id } />
    </li>
  )
}

function Main () {
  const { todoStore } = useRootStore();
  const { todos } =  todoStore;

  return (
    <section>
      <ul>
        {
          todos.map(todo => <Todo todo={ todo } key={ todo.id } />)
        }
      </ul>
    </section>
  )
}

export default observer(Main);
```

store/TodoStore.js

```js
import { action, flow, makeObservable, observable } from "mobx";
import Todo from './Todo';
import axios from 'axios';

export default class TodoStore {
  constructor () {
    this.todos = []

    makeObservable(this, {
      todos: observable,
      loadTodos: flow.bound,
      addTodo: action.bound,
      removeTodo: action.bound
    });

    this.loadTodos();
  }

  *loadTodos () {
    const response = yield axios.get('http://localhost:3001/todos');

    response.data.forEach(todo =>  this.todos.push(new Todo(todo)));
  }

  addTodo (title) {
    this.todos.push(new Todo({
      title,
      id: this.createId() 
    }));

    console.log(this.todos);
  }

  removeTodo (id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  createId () {
    if (!this.todos.length) return 1;

    return this.todos.reduce((id, todo) => (id < todo.id ? todo.id : id), 0) + 1;
  }
}
```

### 编辑任务名称

components/Main.js

```jsx
import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useEffect, useRef } from 'react';

const TodoCompleted = observer(({ todo }) => {
  const { isCompleted, modifyTodoIsCompleted } = todo;

  return (
    <input
      type="checkbox"
      checked={ isCompleted }
      onChange={ modifyTodoIsCompleted }
    />
  )
});

const TodoRemove = observer(({ id }) => {
  const { todoStore } = useRootStore();
  const { removeTodo } = todoStore;

  return (
    <button onClick={ () => removeTodo(id) } >Delete</button>
  )
});

const TodoEditing = observer(({ todo }) => {
  const { modifyTodoIsEditing, title }  = todo;

  return (
    <label onDoubleClick={ modifyTodoIsEditing }>{ title }</label>
  )
});

const Editing = observer(({ todo }) => {
  const ref = useRef(null);
  const { isEditing, modifyTodoTitle } = todo;

  useEffect(() => {
    if (isEditing) {
      ref.current.focus();
    }
  }, [ isEditing ])

  return (
    <input
      ref={ref}
      className='edit'
      defaultValue={ todo.title }
      onBlur={ () =>  modifyTodoTitle(ref.current.value)}
    />
  )
});

const Todo = observer(({ todo }) => {
  const classname = classnames({
    "completed": todo.isCompleted,
    "editing": todo.isEditing
  });

  return (
    <li
      className={classname}
    >
      <div>
        <TodoCompleted todo={ todo } />
        <TodoEditing todo={ todo } />
        <TodoRemove id={ todo.id } />
      </div>
      <Editing todo={ todo } />
    </li>
  )
});

function Main () {
  const { todoStore } = useRootStore();
  const { todos } =  todoStore;

  return (
    <section>
      <ul>
        {
          todos.map(todo => <Todo todo={ todo } key={ todo.id } />)
        }
      </ul>
    </section>
  )
}

export default observer(Main);
```

store/todo.js

```js
import { action, makeObservable, observable } from "mobx";

export default class Todo {
  constructor (todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.isCompleted = todo.isCompleted || false;
    this.isEditing = false;

    makeObservable(this, {
      title: observable,
      isCompleted: observable,
      isEditing: observable,
      modifyTodoIsCompleted: action.bound,
      modifyTodoIsEditing: action.bound,
      modifyTodoTitle: action.bound
    });
  }

  modifyTodoIsCompleted () {
    this.isCompleted = !this.isCompleted;
  }

  modifyTodoIsEditing () {
    this.isEditing = !this.isEditing;
  }

  modifyTodoTitle (title) {
    this.title = title;
    this.isEditing = false;
  }
}
```

### 计算未完成任务数量

components/Todo/Footer.js

```jsx
import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

const UnCompletedTodoCount = observer(() => {
  const { todoStore } = useRootStore();
  const { unCompletedTodosCount } = todoStore;
  
  return (
    <strong>{ unCompletedTodosCount }</strong>
  )
});

function Footer () {
  return (
    <UnCompletedTodoCount />
  )
}

export default Footer;
```

components/Todo/Index.js

```jsx
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Todo = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default Todo;
```

store/TodoStore.js

```js
import { action, computed, flow, makeObservable, observable } from "mobx";
import Todo from './Todo';
import axios from 'axios';

export default class TodoStore {
  constructor () {
    this.todos = []

    makeObservable(this, {
      todos: observable,
      loadTodos: flow.bound,
      addTodo: action.bound,
      removeTodo: action.bound,
      unCompletedTodosCount: computed
    });

    this.loadTodos();
  }

  *loadTodos () {
    const response = yield axios.get('http://localhost:3001/todos');

    response.data.forEach(todo =>  this.todos.push(new Todo(todo)));
  }

  addTodo (title) {
    this.todos.push(new Todo({
      title,
      id: this.createId() 
    }));

    console.log(this.todos);
  }

  removeTodo (id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  get unCompletedTodosCount () {
    return this.todos.filter(todo => !todo.isCompleted).length;
  }

  createId () {
    if (!this.todos.length) return 1;

    return this.todos.reduce((id, todo) => (id < todo.id ? todo.id : id), 0) + 1;
  }
}
```

