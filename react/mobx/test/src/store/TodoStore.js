import { makeObservable, observable } from "mobx";

export default class TodoStore {
  constructor () {
    this.todos = []

    makeObservable(this, {
      todos: observable
    })
  }
}