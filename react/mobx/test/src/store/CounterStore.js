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