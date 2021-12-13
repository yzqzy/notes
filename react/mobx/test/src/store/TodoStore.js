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

    return this.todos.reduce((id, todo) => id < todo.id ? id : todo.id, 0) + 1;
  }
}