function createStore (reducer, preloadedState) {
  // store 对象中存储的状态
  let currentState = preloadedState;
  // 存放订阅者函数
  const currentListeners = [];

  // 获取状态
  function getState () {
    return currentState;
  }

  // 触发 action
  function dispatch (action) {
    currentState = reducer(currentState, action);

    // 循环数据，调用订阅者
    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i];

      listener();
    }
  }

  // 订阅状态 
  function subscribe (listener) {
    currentListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}