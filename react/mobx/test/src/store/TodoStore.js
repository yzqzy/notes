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