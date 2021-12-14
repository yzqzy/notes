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