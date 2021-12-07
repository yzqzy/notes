function thunk (store) {
  return function (next) {
    return function (action) {
      console.log('thunk');

      next(action);
    }
  }
}
