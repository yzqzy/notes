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