## 闭包 closure

闭包 + 回调 => JS 高阶函数  High-order function

高阶函数可以比普通函数处理更多问题，有更好的集成性和封装性。

### 闭包

MDN 是目前可以找到非常专业且总结性很强的针对 ECMA262 文件，针对开发者最全，也是最专业的一个技术文档集合。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

> 一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。



当一个函数被系统创建时，闭包就会被一同创建出来。一个函数统一与外界环境（作用域）捆绑在一起的这种现象叫做闭包。



理论上 test 就是一个闭包。


```js
function test () { }
```


global scope => 闭包，闭包函数。和外部环境以及应用捆绑在一起就形成闭包，并不是一定访问作用域中的内容。

```js
function test () {
  // fn test1 + test scope => 闭包，test1 就叫做闭包函数
  function test1 () {
    // closure 
  }
}
```

```js
function test () {
  var a = 1;
  
  // fn test1 + test scope => 闭包，test1 就叫做闭包函数
  function test1 () {
    // closure 
    console.log(a);
  }
}
```



没有形成闭包，function b  并没有与 test 环境捆绑在一起，并不是闭包函数。

```js
function b () {
  console.log(a);
}

function test () {
  var a = 1;
  
  b(a);
}

test();
```



函数内部声明函数，这其实就是一种封装性。

```js
function compute () {
  function plus (a, b) {
    return a + b;
  }
  function minus (a, b) {
    return a - b;
  }
  function mul (a, b) {
    return a * b;
  }
  function div (a,b ) {
    return a / b;
  }

  return function (type, a, b) {
    switch (type) {
      case 'plus':
        return plus(a, b);
      case 'minus':
        return minus(a, b);
      case 'mul':
        return mul(a, b);
      case 'div':
        return div(a, b);
      default:
        break;
    }
  }
}

console.log(compute()('mul', 100, 200));
```

=>

```js
function compute () {
  compute.plus = function (a, b) {
    return a + b;
  }
  
  compute.minus = function (a, b) {
    return a - b;
  }
  
  compute.mul  = function (a, b) {
    return a * b;
  }
  
  compute.div  = function (a, b) {
    return a / b;
  }

  return function (type, a, b) {
    return compute[type](a, b);
  }
}

console.log(compute()('mul', 100, 200));
```

=> 

```js
function compute (type, a, b) {
  compute.plus = function (a, b) {
    return a + b;
  }
  
  compute.minus = function (a, b) {
    return a - b;
  }
  
  compute.mul  = function (a, b) {
    return a * b;
  }
  
  compute.div  = function (a, b) {
    return a / b;
  }

  return compute[type](a, b);
}

console.log(compute('mul', 100, 200));
```



闭包可以来做数据结构化，比如请求一组数组，在函数中声明其他函数进行数据处理，再返回处理后数据。



```js
class Compute {
  constructor () {
    this.a = 100;
  }

  add (b) {
    return this.a + b;
  }

  minus (b) {
    return this.a - b;
  }
}

const compute = new Compute();

console.log(compute.add(10));
```

上述代码存在一个问题，a 是内部变量，我们仍然可以访问。我们可以使用闭包解决此问题。

```js

const Compute = (function () {
  const a = 100;

  return class Compute {
    add (b) {
      return a + b;
    }
  
    minus (b) {
      return a - b;
    }
  }
})();

const compute = new Compute();

console.log(compute.add(10));
```



闭包缓存内部变量。不会污染全局，每个实例都存在自己私有属性。集成性、封装性。

```js
function test () {
  let a = 1;

  function b () {
    return ++a;
  }

  return b;
}

const b = test();

console.log(b()); // 2
console.log(b()); // 3
console.log(b()); // 4
```



闭包应用案例，JS function API。

```js
function compute () {
  const base = 1000;

  return {
    plus: function (a, b) {
      return base +  a + b;
    },
    minus: function (a, b) {
      return base -  a - b;
    },
    mul: function (a, b) {
      return base *  a * b;
    },
    div: function (a, b) {
      return base /  a / b;
    }
  }
}

const comp = compute();

console.log(comp.plus(1, 2));
```

### 回调

回调，callback。回应，通讯的回应。

> call 调用、行为	function
>
> trigger 触发，触发事件	event



event 通过一个程序或者交互触发，并且执行相应的处理程序。

box => user => click => box （点击事件 trigger）
event and function => bind
event => trigger => function => call

```js
box.addEventListener('click', handleClick, false);

// 浏览器 => event => defined
// box[click, mouse] => click => handler =>
// click => trigger => handler(function)

// 绑定的是一个事件处理函数，而不是一个事件。这叫做 function call，event trigger。
```



```js
function a () {
  // a call => task1
  // other function
  
  // todo task 1;
  
  function b () {
    // continue task 1
    // todo...
    // task 1 is finished
  }
  
  b();
}

a();
// task 1 finished
```

=> 回调

```js
function a (callback) {
  // todo task 1;
  
  // var res = task 1;
  
  callback && callback(res);
}

a(function (res) {
  // get res
  // go on doing task1
})

// a 函数是一个封装，通过回调拿到封装后的结果，继续完成业务

// task 1 finished
```

vue onMounted，就是使用回调的方式。

```js
onMounted(() => {
  // todo
});

function onMounted (callback) {
  // todo ...
  
  callback && callback();
}
```

react useEffect，hooks API，也是使用回调的方式。

```js
useEffect(() => {}, []);
```

回调函数可以在不影响代码执行顺序的前提下，处理异步 API。



下面函数完成两个任务，返回值，执行回调。

```js
function test (count, callback) {
  const newCount = count + 1;

  const callbackCount = count + 100;

  callback && callback(callbackCount);

  return newCount;
}


const count = test(123, function (newCount) {
  console.log(newCount);
});

console.log(count);
```



闭包 + 回调函数 打印日志。

```js
function Compute (callback) {
  return function (a, b, type) {
    let ans = 0;
    
    switch (type) {
      case '+':
        ans = a + b;
        break;
      case '-':
        ans = a - b;
        break;
      default:
        break;
    }


    callback && callback({ a, b, type, ans });
  }
}

const compute = Compute(({ a, b, type, ans }) => {
  console.log(`
    ${ a } ${ type } ${ b } = ${ ans }
   `);
});

compute(2, 1, '+');

// 2 + 1 = 3
```



回调 + 闭包，验证数据规范。

```js
function compute (validtor) {
  return function (a, b, type) {
    const { isError, errorMsg } = validtor(a, b);

    if (isError) {
      throw new Error(errorMsg);
    }

    switch (type) {
      case '+':
        return a + b;
        break;
      case '-':
        return a - b;
        break;
      default:
        break;
    }
  }
}

const comp = compute(validtor);

console.log(comp(1, 31, '+'));


function validtor (a, b) {
  if (a > 50 || b < 30) {
    return {
      isError: true,
      errorMsg: 'a 必须小于等于 50，并且 b 大于等于 30'
    }
  }

  return {
    isError: false,
    errorMsg: 'ok'
  }
}
```



```js
```

