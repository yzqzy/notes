# promise

## 一、Promise A+规范

Promise 是一种解决异步问题的方案，也是一种[规范](https://promisesaplus.com/)。

```js
let promise = new Promise((resolve, reject) => {
  // 传入的匿名函数称为 executor（执行器）
  // 实例化 Promise 时会自动执行 executor 
});
```

### 1. 术语

* promise 是一个对象或者函数，并且存在 then 函数。
* thenable 是一个对象或者函数，它定义了一个 then 方法。
* value 是一个合法的 JavaScript 值（包括 undefined，thenable，或者一个 promise）。
* exception 是一个值，用 throw 抛出一个异常。
* reason 是一个值，指示promise 为什么失败。

为什么使用 resolve、reject ？

  promise 代表承诺的意思。
  resolve 解决，实现
  reject 拒绝，失败

### 2. 要求

#### 2.1 Promise 状态

一个 promise 必须存在三个状态，pending、fulfilled、rejected。

* 当 promise 处于 pending 时
  - promise 可以转换成 fulfilled 或者 rejected

* 当 promise 处于 fulfilled 时
  - 不能转换成其他状态
  - 必须存在一个值（value），并且值是不能改变的

* 当 promise 处于 rejected 时
  - 不能转换成其他状态
  - 必须存在一个值（value），并且值是不能改变的

注意，不能改变仅代表promise存在不可变的标识，并不是意味着值深度不可变。

```js
let value = {
  a: 1,
  b: {
    c: 3
  }
}
```

#### 2.2 关于 then 方法

一个 promise 必须提供一个 then 方法来访问 promise 抛出的值或者原因（错误）。

一个 then 方法接收两个参数：

```js
promise.then(onFulfilled, onRejected);
```

* onFulfilled 和 onRejected 都是可选的参数
  - 如果 onFulfilled 不是一个函数，将被忽略
  - 如果 onRejected 不是一个函数，将被忽略

* 如果 onFulfilled 是一个函数
  - 必须在 promise 转换为成功态时被调用，onFulfilled 的第一个参数就是 promise 返回的值
  - 不能在 promsie 转换为成功态之前被调用
  - 在一个 promise 中，不可以被调用多次

* 如果 onRejected 是一个函数
  - 必须在 promise 转换为失败时被调用，onRejected 的第一个参数就是 promise 返回的值
  - 不能在 promsie 转换为失败之前被调用
  - 在一个 promise 中，不可以被调用多次

* onFulfilled 和 onRejected 函数在主代码执行之前不能被调用（事件循环）

* onFulfilled 和 onRejected 函数必须作为一个函数被调用（不能存在this的值，即不可以被实例化，只能单纯作为函数使用）

* then 函数可以被调用多次

  ```js
  promise.then(() => {
    consoele.log('1');
  });

  promise.then(() => {
    consoele.log('2');
  });

  promise.then(() => {
    consoele.log('3');
  });
  ```

  - 当 promise 处于成功态时，各自的成功态的函数必须按照原本的调用顺序执行
  - 当 promise 处于失败态时，各自的失败态的函数必须按照原本的调用顺序执行

* then 必须返回一个promsie 

  ```js
  promise2 = promise1.then(onFulfilled, onRejected)
  ```

  - 无论是成功的回调还是失败的回调都会返回一个 value x
  - 无论是成功的回调还是失败的回调如果抛出了异常，promise2必须返回一个 reason

#### 2.3 Promise处理流程（resolvePromise）

编写 resolvePromise 函数，需要按照下面步骤。

* promise 和 x 如果引用的是同一个对象，需要 reject 一个类型错误
* x 是对象或者函数时
  - 声明一个 then 赋值为 x.then
  - 当取 x.then 属性值时，可能会抛出异常（可能会被属性劫持），这时需要 reject reason
  - 如果 then 是一个函数，执行时需要改变其 this 指向为 x
    第一个参数是 resolvePromise，第二个参数是 rejectPromise。
    - 成功的回调函数（resolvePromise）里面存在参数 y，resolve y
    - 失败的回调函数（rejectPromise）里面存在参数 r，reject r
    - 如果 resolvePromise 和 rejectPromise 都被调用或者多次调用同一个函数，
      只有第一个函数会被处理，其他的都应该被忽略掉
  - 如果 then 不是函数，直接返回x（resolve(x)）
* 如果 x 不是函数或者对象，直接返回x（resolve(x)）

#### 2.4 笔记

* “platfrom code” 就是引擎，环境及promise本身。实现中，需要确保成功的回调和失败的回调
  是异步的。异步在的执行可以使用宏任务（macro-task）的方式，宏任务可以使用 setTimeout 或者
  setImmediae。或者可以使用微任务，例如 MutationObserver 或者 process.nextTick。

## 二、Promise 实现

### 1. Promise 基本功能实现

```js
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

class IPromise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then (onFulfilled, onRejected) {
    switch (this.state) {
      case FULFILLED:
        onFulfilled(this.value);
        break;
      case REJECTED:
        onRejected(this.reason);
        break;
    }
  }
}

module.exports = IPromise;
```

```js
const IPromise = require('./IPromise');

let promise = new IPromise((resolve, reject) => {
  resolve('success');
  // reject('error');
  // throw new Error('error');
});

promise.then((value) => {
  console.log(value);
}, (reason) => {
  console.log(reason);
});

```

### 2. 处理 Promise 中的异步与多次调用问题

```js
const IPromise = require('./IPromise');

let promise = new IPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});

promise.then((value) => {
  console.log('FulFilled：' + value);
}, (reason) => {
  console.log('Rejected：' + reason);
});

promise.then((value) => {
  console.log('FulFilled：' + value);
}, (reason) => {
  console.log('Rejected：' + reason);
});

// 未打印任何结果
```

之前的代码实现并没有考虑异步代码的问题，如果存在异步代码，执行到then函数时，
promise的状态还是 pending，所以不会打印任何信息。可以使用发布订阅-模式解决此问题。

```js
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

class IPromise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // 存在异步代码时，收集函数依赖。
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        // 正常流程
        this.state = FULFILLED;
        this.value = value;

        // 处理异步代码执行问题 - 发布过程。
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        // 正常流程
        this.state = REJECTED;
        this.reason = reason;

        // 处理异步代码执行问题 - 发布过程。
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then (onFulfilled, onRejected) {
    switch (this.state) {
      case FULFILLED:
        // 正常执行 - 成功态
        onFulfilled(this.value);
        break;
      case REJECTED:
        // 正常执行 - 失败态
        onRejected(this.reason);
        break;
      case PENDING:
        // 存在异步代码时，收集函数依赖 - 订阅过程。
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason);
        });
        break;
    }
  }
}

module.exports = IPromise;
```

### 3. Promise 链式调用问题特性总结

#### 3.1 promise 链式调用的几种情况

```js
const IPromise = require('./IPromise');

let promise = new IPromise((resolve, reject) => {
  resolve('first resolve');
});
```

* 通过 return 传递结果（传递普通值）

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    });
  ```

* 通过新的 prmoise resolve结果

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        resolve(value);
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    });
  ```

* promise 返回 + 异步处理

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(value);
        }, 2000)
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    });
  ```

* 通过新的 promise reject 原因

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(value);
        }, 2000)
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    }, (reason) => {
      console.log('Rejected：' + reason);
    });
  ```

* then 走失败的回调函数后，再走then

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('error');
        }, 2000)
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    }, (reason) => {
      console.log('Rejected：' + reason); // Rejected：error
      // 默认 return undefined
    })
    .then((value) => {
      console.log('FulFilled next：' + value); // FulFilled next：undefined
    }, (reason) => {
      console.log('Rejected next：' + reason);
    });
  ```

* then 中抛出异常

```js
promise
  .then((value) => {
    return value;
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('error');
      }, 2000)
    });
  })
  .then((value) => {
    console.log('FulFilled：' + value);
  }, (reason) => {
    console.log('Rejected：' + reason); // Rejected：error
  })
  .then((value) => {
    throw new Error('Throw Error');
  })
  .then((value) => {
    console.log(value);
  }, (reason) => {
    console.log('Exception：' + reason); // Exception：Throw Error
  });
```

* catch 捕获异常

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('error');
        }, 2000)
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    }, (reason) => {
      console.log('Rejected：' + reason); // Rejected：error
    })
    .then((value) => {
      throw new Error('Throw Error');
    })
    .then((value) => {
      console.log(value);
    })
    .catch(reason => {
      console.log('Catch：' + reason); // Catch：Throw Error
    });
  ```

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('error');
        }, 2000)
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    }, (reason) => {
      console.log('Rejected：' + reason); // Rejected：error
    })
    .then((value) => {
      throw new Error('Throw Error');
    })
    .then((value) => {
      console.log(value);
    }, (reason) => {
      console.log('Then' + reason); // Then：Throw Error
    })
    .catch(reason => {
      console.log('Catch：' + reason);
    });
  ```

  ```js
  promise
    .then((value) => {
      return value;
    })
    .then((value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('error');
        }, 2000)
      });
    })
    .then((value) => {
      console.log('FulFilled：' + value);
    }, (reason) => {
      console.log('Rejected：' + reason); // Rejected：error
    })
    .then((value) => {
      throw new Error('Throw Error');
    })
    .then((value) => {
      console.log(value);
    })
    .catch(reason => {
      console.log('Catch：' + reason); // Catch：Error：Throw Error
      return 'Catch Error';
    })
    .then(value => {
      console.log('Then：' + value); // Then：Catch Error
    });
  ```

  catch 在 Promise 的源码层面上就是一个then，Catch 遵循 then 的原型原则。

#### 3.2 promise 成功与失败的条件

成功的条件

1. then return 普通 JavaScript 值
2. then return 新的 promise 成功态的结果

失败的条件

1. then return 新的 promise 失败态的原因
2. then 抛出异常 throw new Error

#### 3.3 promise 链式调用原理

函数内部返回 this，下一个函数可以使用this。
then 不具备this，直接返回一个新的 Promise。

```js
promise
  .then(() => { })
  .then(() => { })

// return new Promise().then
```

### 4. 处理 Promise 的链式调用问题

```js
const IPromise = require('./IPromise');

let promise1 = new IPromise((resolve, reject) => {
  resolve('promise1');
  // reject('error1');
});

let promise2 = promise1.then(value => {
  // return promise2;
  // return value + '-> then -> promise2';
  // return Promise.resolve(value + '-> then -> promise2');
  return new IPromise((resolve, reject) => {
    // resolve(value + '-> then -> promise2');
    // setTimeout(() => {
    //   resolve(value + '-> then -> promise2');
    // });
    setTimeout(() => {
      resolve(new IPromise((resolve, reject) => {
        resolve(value + '-> then -> promise2');
      }));
    });
  });
}, reason => {
  return reason;
})

// promise2.then(value => {
//   console.log(value);
// }, reason => {
//   console.log(reason);
// });

// promise2.then().then().then().then(value => {
//   console.log(value);
// }, reason => {
//   console.log(reason);
// });

promise2.then().then().then().then(value => {
  throw Error('error');
}, reason => {
  console.log(reason);
})
.catch(error => {
  console.log('ctach：', error);
});
```

```js
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #[IPromise]'));
  }

  let called = false;

  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class IPromise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new IPromise((resolve, reject) => {
      switch (this.state) {
        case FULFILLED:
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
          this.onRejectedCallbacks.push(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
          break;
      }
    });

    return promise2;
  }

  catch (errorCallback) {
    return this.then(null, errorCallback);
  }
}

module.exports = IPromise;
```

### 5. 实现 resolve 和 reject 的静态方法

#### 1. promise 规范检测

安装测试工具

```js
npm i promises-aplus-tests -D
``` 

代码中增加测试代码。

```js
IPromise.defer = IPromise.deferred = function () {
  let deferred = {};

  deferred.promise = new IPromise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}
```

运行测试命令

```js
promises-aplus-tests IPromise.js
```

代码调整

```js
case PENDING:
  this.onFulfilledCallbacks.push(() => {
    setTimeout(() => {
      try {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
  this.onRejectedCallbacks.push(() => {
    setTimeout(() => {
      try {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
  break;
```

经测试，IPromise 符合 PromiseA+ 规范。

#### 2. resolve IPromise Bug

测试用例

```js
const IPromise = require('./IPromise');

let promise1 = new IPromise((resolve, reject) => {
  resolve(new IPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('The answer has been come out.');
    }, 2000);
  }));
});

promise1.then(res => {
  console.log(res);
});
```

BUG 修复

```js
const resolve = (value) => {
    // add start
    if (value instanceof IPromise) {
      return value.then(resolve, reject);
    }
    // add end

    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;

      this.onFulfilledCallbacks.forEach(fn => fn());
    }
  }
```

#### 3. 实现 resolve 和 reject 的静态方法

测试代码

```js
const IPromise = require('./IPromise');

// IPromise.resolve('月落').then(value => {
//   console.log(value);
// });
// IPromise.reject('HEORA').catch(reason => {
//   console.log(reason);
// });

IPromise.resolve(new IPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('月落');
  }, 2000);
})).then(value => {
  console.log(value);
});
IPromise.reject('HEORA').catch(reason => {
  console.log(reason);
});
```

代码实现（增加静态方法 resolve、reject）

```js
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #[IPromise]'));
  }

  let called = false;

  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class IPromise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof IPromise) {
        return value.then(resolve, reject);
      }

      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new IPromise((resolve, reject) => {
      switch (this.state) {
        case FULFILLED:
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          break;
      }
    });

    return promise2;
  }

  catch (errorCallback) {
    return this.then(null, errorCallback);
  }

  static resolve (value) {
    return new IPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject (reason) {
    return new IPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

// 脚本检测
IPromise.defer = IPromise.deferred = function () {
  let deferred = {};

  deferred.promise = new IPromise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

module.exports = IPromise;
```

### 6. 实现 Promise.all 方法

数组中每一个 Promise 必须全部成功才是成功。
有一个 Promise 是失败，就失败。

测试用例

```js
const IPromise = require('./IPromise'),
      fs = require('fs');

function readFile (path) {
  return new IPromise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

const id = 1;

let dataArr = [];

dataArr.push(id);

IPromise.all([
  1,
  readFile('./data/user.json'),
  readFile('./data/class.json')
])
  .then(value => {
    console.log(value);
  })
  .catch(reason => {
    console.log(reason);
  });
```

实现 Promise.all

```js
static all (promiseArr) {
  let resArr = [],
      idx = 0;

  return new IPromise((resolve, reject) => {
    promiseArr.forEach((promise, index) => {
      if (isPromise(promise)) {
        promise.then(value => 
          formatResArr(value, index, resolve), reject);
      } else {
        formatResArr(promise, index, resolve);
      }
    });
  });

  function formatResArr (value, index, resolve) {
    resArr[index] = value;

    if (++idx === promiseArr.length) {
      resolve(resArr);
    }
  }

  function isPromise (x) {
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      let then = x.then;
      return typeof then === 'function';
    }
    return false;
  }
}
```

### 7. 实现 Promise.allSettled 方法

测试用例

```js
const IPromise = require('./IPromise'),
      fs = require('fs');

let p1 = new IPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000)
});

let p2 = new IPromise((resolve, reject) => {
  reject('error');
});

IPromise.allSettled([ p1, p2 ]).then(value => {
  console.log(value);
});
```

实现 Promise.allsettled

```js
static allSettled (promiseArr) {
  let resArr = [],
      idx = 0;

  if (!isIterable(promiseArr)) {
    throw new TypeError(`${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`);
  };

  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) {
      return resolve([]);
    }

    promiseArr.forEach((promise, index) => {
      if (isPromise(promise)) {
        promise.then(value => {
          formatResArr('fulfilled', value, index, resolve);
        }, (reason) => {
          formatResArr('rejected', reason, index, resolve);
        });
      } else {
        formatResArr('fulfilled', promise, index, resolve);
      }
    });
  });

  function formatResArr (status, value, index, resolve) {
    switch (status) {
      case 'fulfilled':
        resArr[index] = {
          status,
          value
        }
        break;
      case 'rejected':
        resArr[index] = {
          status,
          reason: value
        }
        break;
      default:
        break;
    }

    if (++idx == promiseArr.length) {
      resolve(resArr);
    }
  }
}
```

```js
function isPromise (x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then;
    return typeof then === 'function';
  }
  return false;
}

function isIterable (value) {
  return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}
```

### 8. 实现 Promise.race 与 finally

#### 1. Promise.race

race 赛跑。谁先有结果，就拿谁的结果。

测试用例

```js
const IPromise = require('./IPromise');

let p1 = new IPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000)
});

let p2 = new IPromise((resolve, reject) => {
  setTimeout(() => {
    reject('error');
  }, 1000);
});

IPromise.race([ p1, p2 ]).then(value => {
  console.log(value);
}).catch(reason => {
  console.log(reason);
});
```

实现 Promise.race

```js
static race (promiseArr) {
  return new IPromise((resolve, reject) => {
    promiseArr.forEach(promise => {
      if (isPromise(promise)) {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    });
  });
}
```

#### 2. finally

* 无论外部 Promise 成功或者失败都会执行并且回调不带参数。
* 正常走 finally 之后 then 或 catch。
* 如果 finally 内部存在 promise，并且有延迟处理，整个 finally 会等待。
* 如果外面是成功，里面是失败，取里面的结果（失败）。
* 如果外面是失败，里面是成功，取外面的结果（失败）。 
* 如果外面是失败，里面是失败，取里面的结果（失败）。
* 如果外面是成功，里面是成功，取外面的结果（成功）。

测试用例

```js
IPromise.resolve('promise success').finally(() => {
  console.log('finally');

  return new IPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('new Promise success.');
    }, 2000);
  });
}).then((value) => {
  console.log('success：' + value);
}, (reason) => {
  console.log('error：' + reason);
});

// finally
// success：promise success
```

```js
IPromise.reject('promise success').finally(() => {
  console.log('finally');

  return new IPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('new Promise success.');
    }, 2000);
  });
}).then((value) => {
  console.log('success：' + value);
}, (reason) => {
  console.log('error：' + reason);
});


// finally 
// error：promise success
```

```js
IPromise.resolve('promise success').finally(() => {
  console.log('finally');

  return new IPromise((resolve, reject) => {
    setTimeout(() => {
      reject('new Promise success.');
    }, 2000);
  });
}).then((value) => {
  console.log('success：' + value);
}, (reason) => {
  console.log('error：' + reason);
});

// finally
// error：new Promise success
```

实现 finally

```js
finally (finallyCallback) {
  return this.then((value) => {
    return IPromise.resolve(finallyCallback()).then(() => value);
  }, (reason) => {
    return IPromise.resolve(finallyCallback()).then(() => {
      throw reason;
    });
  });
}
```

### 9. 实现 promisify 与 promisifyAll

```js
const fs = require('fs');

fs.readFile('./data/user.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
```

```js
const fs = require('fs').promises;

fs.readFile('./data/user.json', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(reason => console.log(reason));
```

```js
const fs = require('fs'),
      util = require('util');

const readFile = util.promisify(fs.readFile);

readFile('./data/user.json', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(reason => console.log(reason));  
```

#### 1. promisify 实现

测试用例

```js
const fs = require('fs'),
      util = require('./util');

const readFile = util.promisify(fs.readFile);

readFile('./data/user.json', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(reason => console.log(reason));  
```

方法实现

```js
const IPromise = require('./IPromise');

module.exports = {
  promisify (fn) {
    return function (...agrs) {
      return new IPromise((resolve, reject) => {
        fn(...agrs, (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
    }
  }
}
```

#### 2. promisifyAll 实现

测试用例

```js
const fs = require('fs'),
      util = require('./util');

const fsFunctions = util.promisifyAll(fs);

fsFunctions.readFileAsync('./data/user.json', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(reason => console.log(reason));  
```

代码实现

```js
promisifyAll (fns) {
  Object.keys(fns).forEach(fnName => {
    if (typeof fns[fnName] === 'function') {
      fns[fnName + 'Async'] = this.promisify(fns[fnName]);
    }
  });
  return fns;
}
```

### 10. generator 实现与 babel 编译实现

generator 生成器函数

```js
funtion * 函数名 {

}
```

iterator 迭代器；迭代器对象

yield 产出一个值，暂停标识


#### 1. 生成器用法实例

  ```js
  function * generator () {
    yield '姓名：月落';
    yield '年龄：22';
    yield '爱好：旅行';
    return '我爱 JavaScript';
  }

  module.exports = generator;
  ```

  ```js
  const generator = require('./generator');

  const iterator  = generator();

  let res;

  res = iterator.next();
  console.log(res); // { value: '姓名：月落', done: false } 
  res = iterator.next();
  console.log(res); // { value: '年龄：22', done: false }
  ```

#### 2. 手动实现

```js
const generator = require('./generator');

const iterator  = generator([
  '姓名：月落',
  '年龄：22',
  '爱好：JavaScript'
]);

let res;

res = iterator.next();
console.log(res); // { value: '姓名：月落', done: false } 
res = iterator.next();
console.log(res); // { value: '年龄：22', done: false }
```

```js
function generator (arr) {
  let nextIdx = 0;

  return {
    next: function () {
      return nextIdx < arr.length - 1
                     ? { value: arr[nextIdx++], done: false }
                     : { value: arr[nextIdx] || undefined, done: true }
    }
  }
}

module.exports = generator;
```

#### 3. babel 编译效果

```js
function generator$ (ctx) {
  while (true) {
    switch (ctx.current = ctx.next) {
      case 0:
        ctx.next = 1;
        return '姓名：月落';
      case 1:
        ctx.next = 2;
        return '年龄：34';
      case 2:
        ctx.next = 3;
        return '爱好：JavaScript';
      case 3:
        ctx.finish();
        return '我爱JavaScript';
    }
  }
}

function generator () {
  const ctx = {
    current: 0,
    next: 0,
    done: false,
    finish () {
      this.done = true;
    }
  }

  return {
    next () {
      return {
        value: generator$(ctx),
        done: ctx.done
      }
    }
  }
}

module.exports = generator;
```

```js
const generator = require('./generator');

const iterator  = generator([
  '姓名：月落',
  '年龄：22',
  '爱好：JavaScript'
]);

let res;

res = iterator.next();
console.log(res); // { value: '姓名：月落', done: false } 
res = iterator.next();
console.log(res); // { value: '年龄：22', done: false }
res = iterator.next();
console.log(res); // { value: '爱好：JavaScript', done: false }
res = iterator.next();
console.log(res); // { value: '我爱JavaScript', done: true }
```

### 11. generator+co 实现 async+await

generator + yield + co => async + await 语法糖

#### 1. 测试代码

```js
const { getUserClasses, co } = require('./generator');

const uid = 1;

co(getUserClasses(uid)).then(value => {
  console.log(value);
}).catch(reason => {
  console.log(reason);
});
```

#### 2. 方法实现

```js
const fs = require('fs').promises;

function * getUserClasses (uid) {
  let userDatas = yield fs.readFile('./data/user.json', 'utf-8');
  userDatas = JSON.parse(userDatas);

  const userData = userDatas.find(user => user.id === uid);

  let courseDatas = yield fs.readFile('./data/class.json', 'utf-8');
  classDatas = JSON.parse(courseDatas);

  let userClassData = {
    id: userData.id,
    name: userData.name,
    classes: []
  }

  classDatas.map(c => {
    const studentsArr = JSON.parse(c.students);

    studentsArr.map(s => {
      if (s === uid) {
        userClassData.classes.push({
          id: c.id,
          name: c.name
        });
      }
    });
  });

  return userClassData;
}

function co (iterator) {
  return new Promise((resolve, reject) => {
    function walk (data) {
      const { value, done } = iterator.next(data);

      if (!done) {
        Promise.resolve(value).then(value => {
          walk(value);
        }, reject);
      } else {
        resolve(value);
      }
    }

    walk();
  });
}

module.exports = {
  getUserClasses,
  co
}
```