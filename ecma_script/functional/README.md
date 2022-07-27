# 函数式编程

## 为什么学习函数式编程

函数式编程的历史：https://zhuanlan.zhihu.com/p/24648375?refer=marisa。

* 函数式编程是随着 React 的受到越来越多的关注
* Vue 3 也开始使用函数式编程
* 函数式编程可以抛弃 this
* 打包过程中可以更好的利用 tree shaking 过滤无用代码
* 方便测试、方便并行处理
* 有很多库可以帮助我们进行函数式开发：loadsh、underscore、ramda

## 函数式编程概念

函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程 编程、面向对象编程。

* 面向对象编程的思维方式：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和 多态来演示事物事件的联系
* 函数式编程的思维方式：把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程进行抽 象）
  * 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和 输出的函数
  * x -> f(联系、映射) -> y，y=f(x)
  * 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如：y = sin(x)，x和y的关系
  * **相同的输入始终要得到相同的输出(纯函数)**
  * **函数式编程用来描述数据(函数)之间的映射，函数式编程是对运算过程的抽象**



非函数式，面向过程的编程方式。

```js
const num1 = 2;
const num2 = 3;

const sum = sum1 + sum2;

console.log(sum);
```

函数式编程：对运算过程的抽象，相同的输入必须有相同的输出。

> 函数式编程可以方便代码重用，可以组合成其他功能更强大的函数。

```js
function add (n1, n2) {
  return n1 + n2;
}

const sum = add(2, 3);

console.log(sum);
```

## 函数是一等公民

MDN First-class Function：https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function

* 函数可以存储在变量中
* 函数作为参数
* 函数作为返回值

在 JavaScript 中函数就是一个普通的对象 (可以通过   new Function())，我们可以把函数存储到变量/ 数组中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过   new Function('alert(1)') 来构造一个新的函数。

### 函数赋值给变量

```js
// 函数赋值给变量
const fn = function () {
  console.log('First-class Function');
}

fn();
```

```js
const BlogController = {
  index (posts) {
    return Views.index(posts);
  },
  show (post) {
    return Views.show(post);
  },
  create (attrs) {
    return Db.create(attrs);
  },
  update (post, attrs) {
    return Db.update(post, attrs);
  },
  destory (post) {
    return Db.destory(post);
  }
}

// 优化
const BlogController = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destory: Db.destory,
}
```

函数是一等公民是高阶函数、柯里化的基础。

## 高阶函数

高阶函数 (Higher-order function)

* 可以把函数作为参数传递给另一个函数
* 可以把函数作为另一个函数的返回结果

### 函数作为参数

函数作为参数，可以让函数更灵活，不需要考虑内部如何实现。

```js
const arr = [1, 2, 3, 4];
```

```js
function forEach (array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

forEach(arr, (item, index, arr) => {
  console.log(item, index, arr);
});
```

```js
function filter (array, fn) {
  const res = [];
  
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i, array)) {
      res.push(array[i]);
    }
  }
  
  return res;
}

console.log(filter(arr, (item) => item % 2 === 0));
```

### 函数作为返回值

```js
function makeFn () {
  let msg = 'Hello function';

  return function () {
    console.log(msg);
  }
}

const fn = makeFn();

fn();

makeFn()();
```

once 函数实现

```js
function once (fn) {
  let done = false;

  return function () {
    if (!done) {
      done = true;
      return fn.apply(this, arguments);
    }
  }
}

let pay = once((money) => {
  console.log(`pay ${money}`);
});

pay(5);
pay(5);
pay(5);
pay(5);
```

## 高阶函数的意义

函数式编程用来描述数据(函数)之间的映射，函数式编程是对运算过程的抽象

* 抽象可以帮我们屏蔽细节，只需要关注目标
* 高阶函数用来抽象通用问题
* 函数式编程可以让代码更简洁



面向过程的方式

```js
const arr = [1, 2, 3, 4];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

高阶函数

```js
const arr = [1, 2, 3, 4];

forEach(arr, (item, index, arr) => {
  console.log(item, index, arr);
});

const r = filter(arr, (item) => item % 2 === 0);
```

## 常用高阶函数

forEach、map、filter、every、some、find/findIndex、reduce、sort ...

```js
const arr = [1, 2, 3, 4, 5];
```

```js
const map = (arr, fn) => {
  const res = [];

  for (let value of arr) {
    res.push(fn(value));
  }

  return res;
}

console.log(map(arr, (item) => item * item));
```

```js
const every = (arr, fn) => {
  let res = true;

  for (let value of arr) {
    res = fn(value);

    if (!res) {
      break;
    };
  }

  return res;
}

console.log(every(arr, (value) => value > 10));
```

```js
const some = (arr, fn) => {
  let res = false;

  for (let value of arr) {
    res = fn(value);

    if (res) {
      break;
    };
  }

  return res;
}

console.log(some(arr, value => value === 1));
```

## 闭包

### 概念

闭包 (Closure)：函数和其周围的状态(词法环境)的引用捆绑在一起形成闭包。

* 在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员



```js
// 函数作为返回值
function makeFn () {
  let msg = 'Hello function';

  return function () {
    console.log(msg);
  }
}


// once
function once (fn) {
  let done = false;

  return function () {
    if (!done) {
      done = true;
      return fn.apply(this, arguments);
    }
  }
}
```



闭包本质：函数在执行的时候会放到一个执行栈上，当函数执行完毕会从执行栈上移除，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问到外部函数的成员。

### 案例

可以去 chrome 浏览器，调试代码。

```js
function makePower (power) {
  return function (number) {
    return Math.pow(number, power);
  }
}

const power2 = makePower(2);
const power3 = makePower(3);

console.log(power2(4));
console.log(power2(5));

console.log(power3(4));
console.log(power3(5));
```

```js
function makeSalary (base) {
  return function (performance) {
    return base + performance;
  }
}

const salaryLev1 = makeSalary(12000);
const salaryLev2 = makeSalary(15000);

console.log(salaryLev1(2000));
console.log(salaryLev2(3000));
```

## 纯函数

### 概念

纯函数：相同的输入永远会得到相同的输出，而且没有任何可观察的副作用

* 纯函数就类似数学中的函数（用来描述输入和输出的映射关系），y = f(x)



>  lodash 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法。



数组的 slice 和 splice 分别是：纯函数和不纯的函数

* slice 返回数组中的指定部分，不会改变原数组
* splice 对数组进行操作返回该数组，会改变原数组



```js
let arr = [1, 2, 3, 4, 5];

// 纯函数
console.log(arr.slice(0, 3)); // [1, 2, 3]
console.log(arr.slice(0, 3)); // [1, 2, 3]
console.log(arr.slice(0, 3)); // [1, 2, 3]

// 不是纯函数
console.log(arr.splice(0, 3)); // [1, 2, 3]
console.log(arr.splice(0, 3)); // [4, 5]
console.log(arr.splice(0, 3)); // []
```

```js
function getSum (n1, n2) {
  return n1 + n2;
}

console.log(getSum(1, 2));
console.log(getSum(1, 2));
console.log(getSum(1, 2));
```



函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的）。

我们可以把一个函数的执行结果交给另一个函数去处理。

### 优势

#### 可缓存

因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来。

```js
const _ = require('lodash');

function getArea (r) {
  console.log(r);
  return Math.PI * r * r;
}

const getAreaWithMemory = _.memoize(getArea);


console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));

// 4
// 50.26548245743669
// 50.26548245743669
// 50.26548245743669

// 只有第一次执行 getArea 方法
```



```js
// memoize 方法实现

function memoize (func) {
  const cache = {};

  return function () {
    const key = JSON.stringify(arguments);

    cache[key] = cache[key] || func.apply(func, arguments);

    return cache[key];
  }
}

const getAreaWithMemory = memoize(getArea);

console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
```

####  可测试

纯函数让测试更加方便。

#### 并行处理

* 多线程环境下并行操作共享的内存数据很可能会出现意外情况
* 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（Web Worker）

### Lodash

官网：https://lodash.com/

> A modern JavaScript utility library delivering modularity, performance & extras.
>
> 现代化的、实用的 JavaScript 库，提供了模块化、高性能及附加的功能。



```js
const _ = require('lodash');

const array = ['jack', 'tom', 'lucy', 'kate'];

console.log(_.first(array)); // jack
console.log(_.head(array)); // jack

console.log(_.toUpper(_.first(array))); // JACK
console.log(_.reverse(array)); // [ 'kate', 'lucy', 'tom', 'jack' ]

const r = _.each(array, (item, index) => {
  console.log(item, index);
});
console.log(r); // [ 'kate', 'lucy', 'tom', 'jack' ]
```



其他用法可以去官网查看文档。

## 函数的副作用

纯函数：对于相同的输入永远会得到相同的输出，而且没有任何可观察的副作用。



```js
// 不是纯函数

let mini = 18;

function checkAge (age) {
  return age >= mini;
}
```

```js
// 纯函数（硬编码可以通过柯里化解决）

function  checkAge (age) {
  const mini = 18;

  return age >= mini;
}
```



副作用让一个函数变得不纯，纯函数根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用。



副作用来源：

* 配置文件
* 数据库
* 获取用户的输入
* ...

所有的外部交互都有可能产生副作用，副作用会使方法通用性下降，不利于程序扩展和重用，同时副作用会给程序带来安全隐患和不确定性，但副作用不可能完全禁止，尽可能控制它们在可控范围内发生。

## 柯里化

柯里化（Haskell Brooks Curry），使用柯里化可以解决上面案例的硬编码问题。

### 柯里化简单案例

当函数存在多个参数时，我们可以调用一个函数只传递部分参数，并且让函数返回新函数，新函数接收剩余参数，返回最终结果。这就是函数柯里化。

```js
// 普通纯函数
function checkAge (min, age) {
  return age >= min;
}

console.log(checkAge(18, 20));
console.log(checkAge(18, 24));
console.log(checkAge(18, 30));
console.log(checkAge(22, 30));
console.log(checkAge(22, 30));
```

```js
function makeCheckAge (min) {
  return function (age) {
    return age >= min;
  }
}

const checkAge18 = makeCheckAge(18);
const checkAge20 = makeCheckAge(20);

console.log(checkAge18(17));
console.log(checkAge18(24));

console.log(checkAge20(20));
console.log(checkAge20(18));
```

ES6 改造：

```js
const makeCheckAge = min => (age => age >= min);

const checkAge18 = makeCheckAge(18);
const checkAge20 = makeCheckAge(20);

console.log(checkAge18(17));
console.log(checkAge18(24));

console.log(checkAge20(20));
console.log(checkAge20(18));
```



柯里化（Curring）：

* 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）
* 然后返回一个新的函数接收剩余的参数，返回结果

### Lodash 中的柯里化

_.curry(func)

* 功能：创建一个函数，该函数接收一个或多个 func 的参数，如果 func 所需要的参数都被提供则执行 func 并返回执行的结果。否则继续返回该函数并等待接收剩余的参数。
* 参数：需要柯里化的函数
* 返回值：柯里化后的函数

```js
const _ = require('lodash');

function getSum (a, b, c) {
  return a + b + c;
}

const curried = _.curry(getSum);

console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3));
console.log(curried(1)(2)(3));
```

### curry 函数实现

```js
function getSum (a, b, c) {
  return a + b + c;
}

function curry (func) {
  return function curriedFn (...args) {
    if (args.length < func.length) {
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)));
      }
    }
    return func(...args);
  }
}

const curried = curry(getSum);

console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3));
console.log(curried(1)(2)(3));
```

### 总结

柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数，这也是一种对函数参数的缓存，可以让函数变得更加灵活，让函数的粒度更小。还可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能。

## 函数组合

纯函数和柯里化很容易写出洋葱代码`h(g(f(x)))`

* 获取数组的最后一个元素再转换为大写字母，`_.toUpper(_.fist(._reverse(array)))`

函数组合可以让我们把细粒度的函数重新组合生成一个新的函数。

### 管道

下面这张图表示程序中使用函数处理数据的过程，给 fn 函数输入参数 a，返回结果 b，可以想想 a 数据通过一个管道得到 b 数据。



<img src="./images/pipe01.png" style="zoom: 60%" />



当 fn 函数比较复杂的时候，我们可以把函数 fn 拆分为多个小函数，此时多了中间运算过程中产生的 m 和 n。

下面这张图可以想象成把 fn 或者管道拆分成 3 个管道 f1、f2、f3，数据 a 通过管道 f3 得到结果 m，m 再通过管道 f2 得到结果 n，n 通过管道 f1 得到最终结果 b。



<img src="./images/pipe02.png" style="zoom: 60%" />



```js
fn = compose(f1, f2, f3);

b = fn(a);
```

### 函数组合

函数组合（copmose）：如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数。

* 函数就像是数据管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
* **函数组合默认是从右到左执行**

```js
// 函数组合

function compose (f, g) {
  return function (value) {
    return f(g(value));
  }
}

function reverse (arr) {
  return arr.reverse();
}

function first (arr) {
  return arr[0];
}


const last = compose(first, reverse);

console.log(last([1, 2, 3, 4, 5])); // 5
```

### Lodash 中的组合函数

lodash 中的组合函数

* lodash 中组合函数 flow() 或者 flowRight，它们都可以组合多个函数
* flow() 是从左到右运行，flowRight() 是从右到左运行，使用的更多一些

```js
const _ = require('lodash');

const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = str => str.toUpperCase();

const f = _.flowRight(toUpper, first, reverse);

console.log(f(['one', 'two', 'three'])); // THREE
```

### 组合函数实现

 ```js
 function compose (...args) {
   return function (val) {
     return args.reduceRight(function (acc, fn) {
       return fn(acc);
     }, val);
   }
 }
 
 const reverse = arr => arr.reverse();
 const first = arr => arr[0];
 const toUpper = str => str.toUpperCase();
 
 const f = compose(toUpper, first, reverse);
 
 console.log(f(['one', 'two', 'three', 'four'])); // FOUR
 ```

改造后：

```js
const compose = (...args) => val => args.reduceRight((acc, fn) => fn(acc), val);

const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = str => str.toUpperCase();

const f = compose(toUpper, first, reverse);

console.log(f(['one', 'two', 'three', 'four'])); // FOUR
```

### 结合律

函数的组合要满足结合律（associativity）

* 既可以把 g 和 h 组合，还可以把 f 和 g 组合，结果都是一样的

```js
// 结合律（associativity）

const f = compose(f, g, h);

const associative = compose(compose(f, g), h) == compose(f, compose(g, h)); // true
```

lodash 中的 flowRight 方法是满足结合律的。

```js
const _ = require('lodash');

// const f = _.flowRight(_.toUpper, _.first, _.reverse);
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse);
const f = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse));

console.log(f(['one', 'two', 'three'])); // THREE
```

### 调试

如何调试组合函数

```js
const f = _.flowRight(_.toUpper, _.first, _.reverse);

console.log(f(['one', 'two', 'three', 'four'])); // FOUR
```



案例：NEVER SAY DIE => never-say-die

```js
const _ = require('lodash');

const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, array) => _.join(array, sep));

// const f = _.flowRight(join('-'), _.toLower, split(' ')); // 结果不符合预期

const log = v => {
  console.log(v);
  return v;
}

const trace = _.curry((tag, v) => {
  console.log(tag, v);
  return v;
});

const map = _.curry((fn, array) => _.map(array, fn));

// const f = _.flowRight(join('-'), log, map(_.toLower), log, split(' '));
const f = _.flowRight(join('-'), trace('map after：'), map(_.toLower), trace('split after：'), split(' '));

console.log(f('NEVER SAY DIE')); // never-say-die
```

### Lodash 中的 FP 模块

loadsh/fp

* lodash 的 fp 模块提供了实用的对**函数式编程**友好的方法
* 提供了不可变 auto-curried iteratee-first data-last 的方法



```js
const _ = require('lodash');

console.log(_.map(['a', 'b', 'c'], _.toUpper)); // [ 'A', 'B', 'C' ]
console.log(_.map(['a', 'b', 'c'])); // [ 'a', 'b', 'c' ]

console.log(_.split('Hello World', ' ')); // [ 'Hello', 'World' ]


const fp = require('lodash/fp');

console.log(fp.map(fp.toUpper, ['a', 'b', 'c'])); // [ 'A', 'B', 'C' ]
console.log(fp.map(fp.toUpper)(['a', 'b', 'c'])); // [ 'A', 'B', 'C' ]

console.log(fp.split(' ', 'Hello World')); // [ 'Hello', 'World' ]
console.log(fp.split(' ')('Hello World')); // [ 'Hello', 'World' ]
```

```js
const fp = require('lodash/fp');

const trace = fp.curry((tag, v) => {
  console.log(tag, v);
  return v;
});

const f = fp.flowRight(
  fp.join('-'),
  trace('map after：'),
  fp.map(fp.toLower),
  trace('split after：'),
  fp.split(' ')
);

console.log(f('NEVER SAY DIE')); // never-say-die
```

## Lodash FP 模块 map 方法

```js
const _ = require('lodash');

const arr = ['23', '8', '10'];

console.log(_.map(arr, parseInt)); // [ 23, NaN, 2 ]

// parseInt 第二个参数范围是 2-36
// parseInt('23', 0, arr);
// parseInt('8', 1, arr);
// parseInt('10', 2, arr);


const fp = require('lodash/fp');

console.log(fp.map(parseInt, arr)); // [ 23, 8, 10 ]
```

## Point Free

Point Free：我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数。

* 不需要指明处理的数据
* **只需要合成运算过程**
* 需要定义一些辅助的基本运算函数

```js
const f = fp.flowFight(fp.join('-'), fp.map(_.toLowser), fp.split(' '));
```



案例：Hello World => hello_world

```js
// 非 Point Free 模式

function f (word) {
  return word.toLowerCase().replace(/\s+/g, '_');
}

console.log(f('Hello World')); // hello_world
```

```js
// Point Free 模式

const fp = require('lodash/fp');

const f2 = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);

console.log(f2('Hello World')); // hello_world
```



案例：把一个字符串首字母提取并转化为大写，使用 . 作为分隔符

world wild web => [ 'W', 'W', 'W' ]

```js
const fp = require('lodash/fp');

const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '));

console.log(firstLetterToUpper('world wild web')); // W. W. W
```

优化：

```js
const fp = require('lodash/fp');

const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '));

console.log(firstLetterToUpper('world wild web')); // W. W. W
```

## Functor 函子

 ### 为什么要学习函子

目前为止我们已经学习了函数式编程的基础，但是并没有涉及在函数式编程中如何把副作用控制在可控的范围、异常处理、异步操作等。

### 什么是  Functor

容器：包含值和值的变形关系（这个变形关系就是函数）

函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运行一个函数对值进行处理（变形关系）

### 代码演示

```js
// Functor 函子

class Container {
  constructor (value) {
    this._value = value;
  }

  map (func) {
    return new Container(func(this._value));
  }
}

const res = new Container(5)
  .map(x => x + 1)
  .map(x => x * x);

console.log(res);
```

优化

```js
class Container {
  static of (value) {
    return new Container(value);
  }

  constructor (value) {
    this._value = value;
  }

  map (func) {
    return Container.of(func(this._value));
  }
}

const res = Container.of(5)
  .map(x => x + 2)
  .map(x => x * x);

console.log(res); // Container { _value: 49 }
```

### 总结

* 函数式编程的运算不直接操作值，而是由函子完成
* 函子就是一个实现了 map 契约的对象
* 我们可以把函子想象成一个盒子，这个盒子里封装了一个值
* 想要处理盒子中的值，我们需要给盒子的 map 方法传递一个处理值的函数（纯函数），由这个函数对值进行处理
* 最终 map 方法返回一个包含新值的盒子（函子）

```js
// null、undefined 的问题

class Container {
  static of (value) {
    return new Container(value);
  }

  constructor (value) {
    this._value = value;
  }

  map (func) {
    return Container.of(func(this._value));
  }
}

const res = Container.of(null)
  .map(x => x.toUpperCase()); //  Cannot read property 'toUpperCase' of null

console.log(res);
```

## MayBe 函子

* 编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理
* MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）

### 错误处理

```js
// MayBe 函子

class MayBe {
  static of (value) {
    return new MayBe(value);
  }

  constructor (value) {
    this._value = value;
  }

  map (func) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(func(this._value));
  }

  isNothing () {
    return this._value === null || this._value === undefined;
  }
}

const res = MayBe.of('Hello World')
              .map(x => x.toUpperCase());

console.log(res); // MayBe { _value: 'HELLO WORLD' }


const res2 = MayBe.of(null)
              .map(x => x.toUpperCase());

console.log(res2); // MayBe { _value: null }
```

### MayBe 函数问题

```js
// MayBe 函子

class MayBe {
  static of (value) {
    return new MayBe(value);
  }

  constructor (value) {
    this._value = value;
  }

  map (func) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(func(this._value));
  }

  isNothing () {
    return this._value === null || this._value === undefined;
  }
}

// 虽然可以处理空值问题，但是多次调用 map，如果出现问题，不好调试
const res2 = MayBe.of('hello world')
              .map(x => x.toUpperCase())
              .map(x => null)
              .map(x => x.split(' '));

console.log(res2); // MayBe { _value: null }
```

## Either 函子

* Either 两者中的任何一个，类似于 if...else... 的处理
* 异常会让函数变的不纯，Either 函子可以用来做异常处理

```js
// Either 函子

class Left {
  static of (value) {
    return new Left(value);
  }

  constructor (value) {
    this._value = value;
  }

  map (func) {
    return this;
  }
}

class Right {
  static of (value) {
    return new Right(value);
  }

  constructor (value) {
    this._value = value;
  }

  map (func) {
    return Right.of(func(this._value));
  }
}

const res1 = Right.of(12).map(x => x + 2);
const res2 = Left.of(12).map(x => x + 2);

console.log(res1); // Right { _value: 14 }
console.log(res2); // Left { _value: 12 }
```

```js
function parseJson (str) {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({
      message: e.message
    });
  }
}

const ret3 = parseJson('{ name: yueluo }');
console.log(ret3);
// Left {
//   _value: { message: 'Unexpected token n in JSON at position 2' }
// }

const ret4 = parseJson('{ "name": "yueluo" }');
console.log(ret4); // Right { _value: { name: 'yueluo' } }

const ret5 = parseJson('{ "name": "yueluo" }')
              .map(x => x.name.toUpperCase());
console.log(ret5); // Right { _value: 'YUELUO' }
```

## IO 函子

* IO 函子的 _value 是一个函数，这里是把函数作为值来处理
* IO 函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作（惰性执行）
* 把不纯的操作交给调用者来处理

```js
const fp = require('lodash/fp');

class IO {
  static of (value) {
    return new IO(function () {
      return value;
    });
  }

  constructor (func) {
    this._value = func;
  }

  map (func) {
    // 把当前的 value 和传入的 fn 组合成一个新的函数
    return new IO(fp.flowRight(func, this._value));
  }
}


const ret = IO.of(process).map(p => p.execPath);

console.log(ret._value());
```



IO 函子内部包装了一些函数，当我们传递函数时，可能是不纯的操作，IO 函子不管函数是否纯或者不纯，会交由用户执行。

## folktale

Task 异步执行

* 异步任务的实现过于复杂，我们可以使用 folktale 中的 Task
* folktale 一个标准的函数式编程库
  * 和 lodash、ramda 不同，它没有提供很多功能函数
  * 只提供了一些函数式处理的操作，例如：compose、curry 等，一些函子 Task、Either、MayBe 等

### folktale 基本使用

```js
const { compose, curry } = require('folktale/core/lambda');
const { toUpper, first } = require('lodash/fp');

const f = curry(2, (x, y) => {
  return x + y;
});

console.log(f(1, 2)); // 3
console.log(f(1)(2)); // 3


const f2 = compose(toUpper, first)

console.log(f2(['one', 'two'])); // ONE
```

### Task 函子

folktale（2.3.2）2.x 中的 Task 和 1.0 中的 Task 区别很大，这里以 2.3.2 来演示。

```js
// Task 处理异步任务

const fs = require('fs');
const { task } = require('folktale/concurrency/task');
const { split, find } = require('lodash/fp');

function readFile (filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err);

      resolver.resolve(data);
    });
  });
}

readFile('./package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version')))
  .run()
  .listen({
    onRejected: err => {
      console.log(err);
    },
    onResolved: value => {
      console.log(value); // "version": "1.0.0",
    }
  })
```

## Pointed 函子

* Pointed 函子是实现了 of 静态方法的函子
* of 方法是为了避免使用 new 来创建对象，更深层的含义是 of 方法用来把值放到上下文 Context（把值放到容器中，使用 map 来处理值）

```js
class Container {
  static of (value) {
    return new Container(value);
  }
  
  // ...
}

Container.of(2)
	.map(x => x + 5);
```

## Monad

### IO 函子的问题

```js
const fs = require('fs');
const fp = require('lodash/fp');

class IO {
  static of (value) {
    return new IO(function () {
      return value;
    });
  }

  constructor (func) {
    this._value = func;
  }

  map (func) {
    return new IO(fp.flowRight(func, this._value));
  }
}


const readFile = (filename) => new IO(() => fs.readFileSync(filename, 'utf-8'));

const print = (x) => new IO(() => {
  console.log(x);
  return x;
});

const cat = fp.flowRight(print, readFile);

const ret = cat('package.json');

console.log(ret); // IO { _value: [Function (anonymous)] }
```

### 解决方案

* Monad 函子是可以变扁的 Pointed 函子，IO(IO(x))
* 一个函子如何具有 join 和 of 两个方法并遵守一些定律就是一个 Monad

```js
const fs = require('fs');
const fp = require('lodash/fp');

class IO {
  static of (value) {
    return new IO(function () {
      return value;
    });
  }

  constructor (func) {
    this._value = func;
  }

  join () {
    return this._value();
  }

  map (func) {
    return new IO(fp.flowRight(func, this._value));
  }

  flatMap (func) {
    return this.map(func).join();
  }
}


const readFile = (filename) => new IO(() => fs.readFileSync(filename, 'utf-8'));

const print = (x) => new IO(() => {
  console.log(x);
  return x;
});


const ret = readFile('package.json')
              .map(fp.toUpper)
              .flatMap(print)
              .join();

console.log(ret);
```



当一个函数返回一个函子的时候，我们就可以使用 Monad，Monad 可以帮我们解决函子嵌套的问题。

当我们想合并一个函数，并且这个函数返回一个值，这时我们可以调用 map 方法，当我们想合并一个函数，但是这个函数返回一个函子，我们需要使用 flatMap 方法。

## 总结

函数式编程是一种编程范式，也可以说是一种编程思想，它和面向对象编程时同级别的。

函数式编程的核心思想是把运算过程抽象成函数，即编程过程中是面向函数编程的。

我们学习函数式编程，是因为 vue 或者 react 已经使用部分函数式编程的思想，学习函数式编程有助于我们更好的使用 vue 或 react。



函数式编程基础：lodash、纯函数、柯里化、管道、函数组合。

函子：Functor、MayBe、Either、IO、Task（folktale）、Monad。
