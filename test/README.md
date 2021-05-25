# 测试

## 内置对象

### Boolean

```js
var x = new Boolean(false);

if (x) {
  console.log('执行');
}

// 执行
```

### Date

参数 monthIndex 是从“0”开始计算的，这就意味着一月份为“0”，十二月份为“11”。

```js
const date = new Date(2020, 15, 2);
console.log(date); // Fri Apr 02 2021 00:00:00 GMT+0800 (中国标准时间)
```

```js
console.log(Date.length); // 7
```

### Function

每个 JavaScript 函数实际上都是一个 Function 对象。
运行 (function(){}).constructor === Function 便可以得到这个结论。

```js
console.log((function () {}).constructor === Function); // true
```

Function 构造函数创建一个新的 Function 对象。直接调用此构造函数可用动态创建函数。

```js
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6)); // 8
```

由 Function 构造器创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造器创建时所在的作用域的变量。

```js
var x = 10;

function createFunction () {
  var x = 20;
  return new Function('return x;');
}

console.log(createFunction()());
// 10
```

虽然这段代码可以在浏览器中正常运行，但在 Node.js 中 f1() 会产生一个“找不到变量 x ”的 ReferenceError。这是因为在 Node 中顶级作用域不是全局作用域，而 x 其实是在当前模块的作用域之中。

#### apply

**用 apply 将数组各项添加到另一个数组。**

```js
const array = ['a', 'b'];
const elements = [0, 1, 2];

array.push.apply(array, elements);

console.log(array);
// [ 'a', 'b', 0, 1, 2 ]
```

**用 Math.max/Math.min 求得数组中的最大/小值。**

```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);

console.log(max, min); // 7 2
```

#### call

**使用 call 方法调用父构造函数。**
在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，类似于 Java 中的写法。

```js
function Product (name, price) {
  this.name = name;
  this.price = price;
}

function Food (name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

const cheese = new Food('feta', 5);
console.log(cheese);
// Food { name: 'feta', price: 5, category: 'food' }
```

**使用 call 方法调用匿名函数**

```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log('#' + i + ' ' + this.species + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}

// #0 Lion: King
// #1 Whale: Fail
```

**使用 call 方法调用函数并且指定上下文的 'this'**

```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);
// cats typically sleep between 12 and 16 hours
```

**使用 call 方法调用函数并且不指定第一个参数（argument）**

```js
var sData = 'Wisen';

function display () {
  console.log('sData value is %s ', this.sData);
}

display.call();
// sData value is Wisen
```

严格模式下，this 的值将会是 undefined。

```js
'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();
// Cannot read property 'sData' of undefined
```

#### bind

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

bind()方法会创建一个新函数,称为绑定函数.当调用这个绑定函数时,绑定函数会以创建它时传入 bind()方法的第一个参数作为 this,传入 bind()方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。

```js
function demo () {
  console.log(this);
}

demo.bind({ a: 1 }).bind({ b: 2 }).bind({ c: 3 })();
// { a: 1 }
```

**偏函数用法**

```js
function print () {
  console.log([].slice.call(arguments));
}

print(); // []

const print2 = print.bind(null, 37);

print2(); // [ 37 ]
print2(1, 2, 3); // [ 37, 1, 2, 3 ] 
```

```js
function addArguments (arg1, arg2) {
  console.log(arg1 + arg2);
}

addArguments(1, 2); // 3

const addArguments2 = addArguments.bind(null, 37);

addArguments2(5); // 42
addArguments2(5, 10); // 42
```

**作为构造函数使用的绑定函数**

绑定函数自动适应于使用 new 操作符去构造一个由目标函数创建的新实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return this.x + ',' + this.y;
};

const emptyObj = {};

const YAxisPoint = Point.bind(emptyObj, 0);
const axisPoint = new YAxisPoint(5);

console.log(axisPoint.toString()); // '0,5'

YAxisPoint(15);

console.log(emptyObj); // { x: 0, y: 15 }
```

如果你希望一个绑定函数要么只能用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符，要么只能直接调用，那你必须在目标函数上显式规定这个限制。

**快捷调用**

在你想要为一个需要特定的 **`this`** 值的函数创建一个捷径（shortcut）的时候，`bind()` 也很好用。

```js
const slice = Array.prototype.slice;
slice.apply(arguments);
```

```js
const unboundSlice = Array.prototype.slice;
const slice = Function.prototype.apply.bind(unboundSlice);

slice(arguments);
```

**Polyfill**

有两种实现`bind`的方法，下面第一种不支持使用`new`调用新创建的构造函数，而第二种支持。

```js
// Does not work with `new (funcA.bind(thisArg, args))`
(function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind2 = function() {
    var thatFunc = this, 
        thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();

function test () {
  console.log(this);
}

test.bind2({ a: 1 }, '2', '3', '4')('5', '6');
test.bind2({ a: 1 }, '2', '3', '4').bind2({ b: 2 }).bind2({ b: 3, d: 4 })(('5', '6'));
```

```js
(function(){
  var ArrayPrototypeSlice = Array.prototype.slice;

  Function.prototype.bind2 = function (otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    } 

    var baseArgs = ArrayPrototypeSlice.call(arguments, 1), // 参数列表 => bind arguments [1, len] => 不包含 this
        baseArgsLength = baseArgs.length, // 参数列表个数
        fToBind = this, // 原函数，需要绑定的函数
        fNOP    = function () {},
        fBound  = function () {
          baseArgs.length = baseArgsLength; // reset to default base arguments

          // 绑定函数 arguments 和 原函数 args 函数合并，this 指向原参数列表
          baseArgs.push.apply(baseArgs, arguments); 
          
          // 如果原型上有当前 this，使用当前 this，否则使用传入的待绑定 this，合并参数
          // 保证倒序执行。
          return fToBind.apply(
            fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };

    // JS 圣杯模式
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
})();


function test () {
  console.log(this);
}

test.bind2({ a: 1 }, '2', '3', '4')('5', '6');
test.bind2({ a: 1 }, '2', '3', '4').bind2({ b: 2 }).bind2({ b: 3, d: 4 })(('5', '6'));
// { a: 1 }
// { a: 1 }
```

如果看不懂 bind 实现，先看懂下面，再回去看。

```js
function demoFn () { 
  console.log(this);
}

Function.prototype.demo = function (num) {
  let fBound = this;

  return function () {
    return fBound.call(num);
  };
}

demoFn.demo({ a: 1 }).demo({ b: 2 }).demo({ c: 3 })();
```

如果你选择使用这部分实现，你不能依赖于那些与 ECMA-262, 5th edition 规定的行为偏离的例子。
在 bind() 函数被广泛支持之前，某些情况下（或者为了兼容某些特定需求对其做一些特定修改后）可以选择用这个实现作为过渡。