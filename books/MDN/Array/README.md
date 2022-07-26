# ES3 方法

## 1. concat

`concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

### 语法

> var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

#### 参数

`valueN` 可选

数组和/或值，将被合并到一个新的数组中。如果省略了所有 `valueN` 参数，则 `concat` 会返回调用此方法的现存数组的一个浅拷贝。

* 如果不传参数，返回浅拷贝的数组。修改新数组会影响原数组。

```js
const array1 = [{ a: 1 }, 'b', 'c'];
const array2 = array1.concat();

array2[0].a = 2;

console.log(array1);
console.log(array2);

// [Object { a: 2 }, "b", "c"]
// [Object { a: 2 }, "b", "c"]
```

* 如果传参数，返回新数组。修改新数组会影响原数组。

```js
const array1 = [{ a: 1 }, 'b', 'c'];
const array2 = array1.concat('c', 'd', 'e');

array2[0].a = 2;

console.log(array1);
console.log(array2);

// [{ a: 2 }, "b", "c"]
// [{ a: 2 }, "b", "c", "c", "d", "e"]
```

**concat 方法无论传参与否，返回的都是浅拷贝的数组。**

#### 返回值

新的 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 实例。

### 描述

`concat` 方法创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素（如果参数是数组）或参数本身（如果参数不是数组）。它不会递归到嵌套数组参数中。

`concat` 方法不会改变 `this` 或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：

* 对象引用（而不是实际对象）：`concat` 将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
* 数据类型如字符串，数字和布尔（不是[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 和 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象）：`concat` 将字符串和数字的值复制到新数组中。

> 数组/值在连接时保持不变。此外，对于新数组的任何操作（仅当元素不是对象引用时）都不会对原始数组产生影响，反之亦然。

### 示例

#### 连接两个数组

以下代码将两个数组合并为一个新数组：

```js
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];

alpha.concat(numeric);
// ["a", "b", "c", 1, 2, 3]
```

#### 连接三个数组

以下代码将三个数组合并为一个新数组：

```js
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];

var nums = num1.concat(num2, num3);

console.log(nums);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### 将值连接到数组

以下代码将三个值连接到数组：

```js
var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric);
// ['a', 'b', 'c', 1, 2, 3]
```

#### 合并嵌套数组

````js
var num1 = [[1]];
var num2 = [2, [3]];
var num3 = [5, [6]];

var nums = num1.concat(num2);

console.log(nums);
// [[1], 2, [3]]
````

合并嵌套数组。

```js
var nums2 = num1.concat(4, num3);

console.log(nums2)
// results is [[1], 4, 5, [6]]
```

可以连续合并多个数组。

```js
num1[0].push(4);

console.log(nums);
// results is [[1, 4], 2, [3]]
```

修改原数组会改变浅拷贝的新数组。

## 2. join

`join()` 方法将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN//docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

### 语法

> arr.join([separator])

#### 参数

`separator`  可选

指定一个字符串来分隔数组的每个元素。

如果需要，将分隔符转换为字符串。

如果缺省该值，数组元素用逗号（`,`）分隔。

如果`separator`是空字符串(`""`)，则所有元素之间都没有任何字符。

#### 返回值

一个所有数组元素连接的字符串。如果 `arr.length` 为0，则返回空字符串。

### 描述

所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。

> 如果一个元素为 `undefined` 或 `null`，它会被转换为空字符串。

```js
var arr = [null, undefined];

console.log(arr.join());
// ,
```

```js
var arr = [null, undefined];

console.log(arr.join(''));
// 空串
```

### 示例

#### 使用四种不同的分隔符连接数组元素

```js
var a = ['Wind', 'Rain', 'Fire'];
var val1 = a.join();      // "nd,Rain,Fire"
var val2 = a.join(', ');  // "Wind, Rain, Fire"
var val3 = a.join(' + '); // "Wind + Rain + Fire"
var val4 = a.join('');    // "WindRainFire"
```

#### 连接类数组对象

```js
function f (a, b, c) {
  var s = Array.prototype.join.call(arguments);
  console.log(s); // "1,a,true"
}

f(1, 'a', true);
```

也可以这样写，效果同上。

```js
function f (a, b, c) {
  var s = [].join.call(arguments);
  console.log(s); // "1,a,true"
}

f(1, 'a', true);
```

## 3. pop

`pop()` 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

### 语法

> arr.pop()

#### 无参数

#### 返回值

从数组中删除的元素（当数组为空时返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)）。

### 描述

`pop` 方法从一个数组中删除并返回最后一个元素。

`pop` 方法有意具有通用性。该方法和  [`call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)  或  [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)  一起使用时，可应用在类似数组的对象上。

`pop` 方法根据  `length` 属性来确定最后一个元素的位置。

如果不包含 `length` 属性或 `length` 属性不能被转成一个数值，会将 `length` 置为0，并返回`undefined`。

```js
var nums = {
  '0': 1,
  '1': 2,
}

console.log([].pop.call(nums)); // undefined
console.log(nums); // {0: 1, 1: 2, length: 0}
```

```js
var nums = {
  '0': 1,
  '1': 2,
  'length': undefined
}

console.log([].pop.call(nums)); // undefined
console.log(nums); // {0: 1, 1: 2, length: 0}
```

```js
var nums = {
  '0': 1,
  '1': 2,
  'length': '1'
}

console.log([].pop.call(nums)); // 1
console.log(nums); // {1: 2, length: 0}
```

```js
var nums = {
  '0': 1,
  '1': 2,
  'length': 1
}

console.log([].pop.call(nums)); // 1
console.log(nums); // {1: 2, length: 0}
```

```js
var nums = {
  '0': 1,
  '1': 2,
  'length': '-1'
}

console.log([].pop.call(nums)); // undefined
console.log(nums); // {0: 1, 1: 2, length: 0}
```

```js
var nums = {
  '0': 1,
  '1': 2,
  'length': true
}

console.log([].pop.call(nums)); // 1
console.log(nums); // {1: 2, length: 0}
```

```js
var nums = {
  '0': 1,
  '1': 2,
  'length': 5
}

console.log([].pop.call(nums)); // undefined
console.log(nums); // {1: 2, length: 4}
```

### 示例

#### 删除数组最后一个元素

```js
var arr = ["angel", "clown", "mandarin", "surgeon"];

var popped = arr.pop();

console.log(arr); // ["angel", "clown", "mandarin"]
console.log(popped); // surgeon
```

## 4. shift

`shift()` 方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

### 语法

> arr.shift()

#### 无参数

#### 返回值

从数组中删除的元素; 如果数组为空则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 。 

### 描述

`shift`  方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。

如果 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性的值为 0 (长度为 0)，则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

`shift` 方法并不局限于数组：这个方法能够通过 [`call`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 或 [`apply`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法作用于类似数组的对象上。

但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

[`Array.prototype.pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 有着和 `shift` 相似的行为, 但是是作用在数组的最后一个元素上的。

```js
let arr = [1, 2, 3];

console.log(arr.shift()); // 1
console.log(arr); // [2, 3]
```

```js
let arr = [];

console.log(arr.shift()); // undefined
```

shift 方法同样可以操作类数组。

```js
let obj = {
  '0': 1,
  '1': 2
}

console.log([].shift.call(obj)); // undefined
console.log(obj); // {0: 1, 1: 2, length: 0}
```

```js
let obj = {
  '0': 1,
  '1': 2,
  length: 1
}

console.log([].shift.call(obj)); // 1
console.log(obj); // {1: 2, length: 0}
```

### 示例

#### 移除数组中的一个元素

```js
var arr = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log(arr); // ["angel", "clown", "mandarin", "surgeon"]

var shifted = arr.shift();
console.log(shifted); // angel

console.log(arr); // ["clown", "mandarin", "surgeon"]
```

#### while 循环中使用 shift()

shift() 方法经常用于 while loop 的环境中.。下例中每个循环将要从一个数组中移除下一项元素，直至它成为空数组。

```js
var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

while((i = names.shift()) !== undefined) {
  console.log(i);
}
// Andrew Edward Paul Chris John
```

## 5. push

`push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

### 语法

> arr.push(element1, ..., elementN)

#### 参数

`elementN`

被添加到数组末尾的元素。

#### 返回值

当调用该方法时，新的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性值将被返回。

### 描述

push方法将值追加到数组中。

`push` 方法具有通用性。该方法和 [`call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 或 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 一起使用时，可应用在类似数组的对象上。

`push` 方法根据 `length` 属性来决定从哪里开始插入给定的值。

如果 `length` 不能被转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存在时，将会创建它。

唯一的原生类数组（array-like）对象是 [`Strings`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

```js
let obj = {
  '0': 1,
  '1': 2
}

[].push.call(obj); // 报错 Uncaught SyntaxError: Unexpected token ']'

console.log(obj);
```

```js
let obj = {
  '0': 1,
  '1': 2
}

[].push.call(obj); // 报错 Uncaught TypeError: {(intermediate value)(intermediate value)} is not a function

console.log(obj);
```

产生上述问题的原因是 JS 解析报错。比如同时存在连续的符号，如 {} ()、{} []，所以这也可以说明 "；" 的重要性。

```js
let obj = {
  '0': 1,
  '1': 2
}

console.log([].push.call(obj, 3)); // 1

console.log(obj); // {0: 3, 1: 2, length: 1}
```

```js
let obj = {
  '0': 1,
  '1': 2
}

var push = ([]).push;

push.call(obj, 3);

console.log(obj); // {0: 3, 1: 2, length: 1}
```

```js
let obj = {
  '0': 1,
  '1': 2
}

Array.prototype.push.call(obj, 3);

console.log(obj); // {0:3, 1: 2, length: 1}
```

```js
let obj = {
  '0': 1,
  '1': 2,
  length: 3
}

Array.prototype.push.call(obj, 3);

console.log(obj); // {0:3, 1: 2, 3: 3 length: 4}
```

call 和 apply 对于 push 方法的用法类似。

### 示例

#### 添加元素到数组

```js
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports); // ["soccer", "baseball", "football", "swimming"]
console.log(total); // 4
```

#### 合并两个数组

合并数组时存在参数上限， [参数个数上限：65536](https://bugs.webkit.org/show_bug.cgi?id=80797)。

```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']
```

#### 像数组一样使用对象

```js
var obj = {
  length: 0,
  addElem: function (elem) {
    [].push.call(this, elem);
  }
}

obj.addElem(1);
obj.addElem({});

console.log(obj); //{0: 1, 1: {…}, length: 2, addElem: ƒ}
console.log(obj.length); // 2
```

注意，尽管 obj 不是数组，但是 push 方法成功地使 obj 的 length 属性增长了，就像我们处理一个实际的数组一样。

## 6. unshift

**`unshift()`** 方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度(该**方法修改原有数组**)**。

### 语法

> arr.unshift(element1, ..., elementN)

#### 参数

`elementN`

要添加到数组开头的元素或多个元素。

#### 返回值

当一个对象调用该方法时，返回其 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性值。

### 描述

`unshift` 方法会在调用它的类数组对象的开始位置插入给定的参数。

`unshift` 特意被设计成具有通用性；这个方法能够通过 [`call`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 或 [`apply`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法作用于类数组对象上。

不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

```js
let obj = {
  '0': 1,
  '1': 2
};

[].unshift.call(obj, 3); 

console.log(obj); // {0: 3, 1: 2, length: 1}
```

```js
let obj = {};

[].unshift.call(obj, 3); 

console.log(obj); // {0: 3, length: 1}
```

注意, 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致。 

于是，传入多个参数调用一次 `unshift` ，和传入一个参数调用多次 `unshift` (例如，循环调用)，它们将得到不同的结果。例如:

```js
let arr = [4,5,6];
arr.unshift(1,2,3);
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

```js
let arr = [4,5,6];
arr.unshift(1);
arr.unshift(2);
arr.unshift(3);
console.log(arr); // [3, 2, 1, 4, 5, 6]
```

### 示例

```js
let arr = [1, 2];

arr.unshift(0); // [0, 1, 2]

arr.unshift(-2, -1); // [-2, -1, 0, 1, 2]

arr.unshift([-4, -3]); // [[-4, -3], -2, -1, 0, 1, 2]

arr.unshift([-7, -6], [-5]); // [ [-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2 ]
```

## 7. slice => [begin, end)

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

### 语法

> arr.slice([begin[, end]])

#### 参数

`begin` 可选

提取起始处的索引（从 `0` 开始），从该索引开始提取原数组元素。

如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，`slice(-2)` 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

如果省略 `begin`，则 `slice` 从索引 `0` 开始。如果 `begin` 超出原数组的索引范围，则会返回空数组。

`end` 可选

提取终止处的索引（从 `0` 开始），在该索引处结束提取原数组元素。

`slice` 会提取原数组中索引从 `begin` 到 `end` 的所有元素（包含 `begin`，但不包含 `end`）。

`slice(1,4)` 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。

如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。
 `slice(-2,-1)` 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。

如果 `end` 被省略，则 `slice` 会一直提取到原数组末尾。如果 `end` 大于数组的长度，`slice` 也会一直提取到原数组末尾。

#### 返回值

一个含有被提取元素的新数组。

### 描述

`slice` 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

- 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。

  ```js
  let arr = [ {a: 1}, 2, 3 ];
  let newArr = arr.slice(0, 1);
  
  console.log(JSON.stringify(arr)); // '[{"a":1},2,3]'
  newArr[0].a = 2;
  console.log(JSON.stringify(arr)); // '[{"a":2},2,3]'
  ```

- 对于字符串、数字及布尔值来说（不是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 或者 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

如果向两个数组任一中添加了新元素，则另一个不会受到影响。

### 示例

#### 返回现有数组的一部分

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

console.log(citrus); // ["Orange", "Lemon"]
```

#### 使用 slice

```js
let arr = [ {a: 1}, 2, 3 ];
let newArr = arr.slice(0, 1);

console.log(JSON.stringify(arr)); // '[{"a":1},2,3]'
newArr[0].a = 2;
console.log(JSON.stringify(arr)); // '[{"a":2},2,3]'
```

#### 转化类数组

`slice` 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。你只需将该方法绑定到这个对象上。

 一个函数中的 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 就是一个类数组对象的例子。

```js
function test () {
  return Array.prototype.slice.call(arguments);
}

var arr = test(2, 3, 4);

console.log(arr); // [2, 3, 4]
```

除了使用 `Array.prototype.slice.call(``arguments``)`，你也可以简单的使用 `[].slice.call(arguments)` 来代替。

```js
function test () {
  return [].slice.call(arguments);
}

var arr = test(2, 3, 4);

console.log(arr); // [2, 3, 4]
```

另外，你可以使用 `bind` 来简化该过程。

```js
const originSlice = Array.prototype.slice;
const slice = Function.prototype.call.bind(originSlice);

function test () {
  return slice(arguments);
}

var arr = test(2, 3, 4);

console.log(arr); // [2, 3, 4]
```

## 8. splice => [ start, deleteCount, ... ]

**`splice()`** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

### 语法

> array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

#### 参数

`start` 

指定修改的开始位置（从0计数）。

如果超出了数组的长度，则从数组末尾开始添加内容；

如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于 `array.length - n`）；

如果负数的绝对值大于数组的长度，则表示开始位置为第0位；

```js
let arr = [1, 2, 3];

arr.splice(1);

console.log(arr); // [1]
```

```js
let arr = [1, 2, 3];

arr.splice(-1);

console.log(arr); // [1, 2]
```

```js
let arr = [1, 2, 3];

arr.splice(-5);

console.log(arr); // []
```

`deleteCount` 可选

整数，表示要移除的数组元素的个数。

如果 `deleteCount` 大于 `start` 之后的元素的总数，则从 `start` 后面的元素都将被删除（含第 `start` 位）。

如果 `deleteCount` 被省略了，或者它的值大于等于`array.length - start`  (也就是说，如果它大于或者等于`start`之后的所有元素的数量)，那么`start`之后数组的所有元素都会被删除。

如果 `deleteCount` 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

```js
let arr = [1, 2, 3];

arr.splice(1, 0);
console.log(arr); // [1, 2, 3]

arr.splice(1, -1);
console.log(arr); // [1, 2, 3]
```

```js
let arr = [1, 2, 3];

arr.splice(1, 1);

console.log(arr); // [1, 3]
```

```js
let arr = [1, 2, 3];

arr.splice(1, 10);

console.log(arr); // [1]
```

```js
let arr = [1, 2, 3];

arr.splice(0);

console.log(arr); // []
```

`item1, item2, ...`  可选

要添加进数组的元素, 从 `start` 位置开始。如果不指定，则 `splice()` 将只删除数组元素。

```js
let arr = [1, 2, 3];

var removeArr = arr.splice(1, 10, 5, 6, 7);

console.log(arr); // [1, 5, 6, 7]
console.log(removeArr); // [2, 3]
```

```js
let arr = [1, 2, 3];

var removeArr = arr.splice(1, -1, 5, 6, 7);

console.log(arr); // [1, 5, 6, 7, 2, 3]
console.log(removeArr); // []
```

#### 返回值

由被删除的元素组成的一个数组。

如果只删除了一个元素，则返回只包含一个元素的数组。

如果没有删除元素，则返回空数组。

### 描述

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

### 示例

#### 从第 2 位开始删除 0 个元素，插入 "drum"

```js
var arr = ["angel", "clown", "mandarin", "sturgeon"];
var removed = arr.splice(2, 0, "drum");

console.log(removed); // []
console.log(arr); // ["angel", "clown", "drum", "mandarin", "sturgeon"]
```

#### 从第 2 位开始删除 0 个元素，插入 "drum" 和 ”guitor“

```js
var arr = ["angel", "clown", "mandarin", "sturgeon"];
var removed = arr.splice(2, 0, "drum", "guitar");

console.log(removed); // []
console.log(arr); // ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
```

#### 从第 3 位开始删除 1 个元素

```js
var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = arr.splice(3, 1);

console.log(removed); // ['mandarin']
console.log(arr); // ['angel', 'clown', 'drum', 'sturgeon']
```

#### 从第 2 位开始删除 1 个元素，插入 "trumpet"

```js
var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = arr.splice(2, 1, 'trumpet');

console.log(removed); // ['drum']
console.log(arr); // ['angel', 'clown', 'trumpet', 'mandarin', 'sturgeon']
```

#### 从第 0 位开始删除 2 个元素，插入  "parrot"、“anemone” 和 “blue”

```js
var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = arr.splice(0, 2, 'parrot', 'anemone', 'blue');

console.log(removed); // ['drum']
console.log(arr); // ['parrot', 'anemone', 'blue', 'drum', 'mandarin', 'sturgeon']
```

#### 从第 2 位开始删除 2 个元素

```js
var arr = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = arr.splice(arr.length - 3, 2);

console.log(removed); // ['blue', 'trumpet']
console.log(arr); // ['parrot', 'anemone', 'sturgeon']
```

```js
var arr = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = arr.splice(2, 2);

console.log(removed); // ['blue', 'trumpet']
console.log(arr); // ['parrot', 'anemone', 'sturgeon']
```

#### 从倒数第 2 位开始删除 1 个元素

```js
var arr = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = arr.splice(-2, 1);

console.log(removed); // ['mandarin']
console.log(arr); // ['angel', 'clown', 'sturgeon']
```

#### 从第 2 位开始删除所有元素

```js
var arr = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = arr.splice(2);

console.log(removed); // ['mandarin', 'sturgeon']
console.log(arr); // ['angel', 'clown']
```

## 9. reverse

`reverse()` 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

### 语法

>  arr.reverse()

#### 无参数

#### 返回值

颠倒后的数组。

### 描述

`reverse` 方法颠倒数组中元素的位置，改变了数组，并返回该数组的引用。

reverse方法是特意类化的；此方法可被 [called](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 或 [applied](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)于类似数组对象。

对象如果不包含反映一系列连续的、基于零的数值属性中的最后一个长度的属性，则该对象可能不会以任何有意义的方式运行。

```js
let arr = [1, 2, 3];
let reversed = arr.reverse();

console.log(arr); // [3, 2, 1]
console.log(reversed); // [3, 2, 1]
```

```js
let obj = {
  '0': 1,
  '1': 2
};

let reversed = [].reverse.call(obj);

console.log(obj); // {0: 1, 1: 2}
console.log(reversed); // {0: 1, 1: 2}
```

```js
let obj = {
  '0': 1,
  '1': 2,
  length: 2
};

let reversed = [].reverse.call(obj);

console.log(obj); // {0: 2, 1: 1, length: 2}
console.log(reversed); // {0: 2, 1: 1, length: 2}
```

```js
let obj = {
  '0': 1,
  '1': 2,
  length: 1
};

let reversed = [].reverse.call(obj);

console.log(obj); // {0: 1, 1: 2, length: 1}
console.log(reversed); // {0: 1, 1: 2, length: 1}
```

### 示例

#### 颠倒数组中的元素

```js
const a = [1, 2, 3];

console.log(a); // [1, 2, 3]

a.reverse();

console.log(a); // [3, 2, 1]
```

#### 颠倒类数组中的元素

```js
const a = {0: 1, 1: 2, 2: 3, length: 3};

console.log(a); // {0: 1, 1: 2, 2: 3, length: 3}

Array.prototype.reverse.call(a);

console.log(a); // {0: 3, 1: 2, 2: 1, length: 3}
```

## 10. sort

`sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。

默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。

### 语法

> arr.sort([compareFunction])

#### 参数

`compareFunction`  可选

用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的 **Unicode** 位点进行排序。

* `firstEl`

  第一个用于比较的元素。

* `secondEl`

  第二个用于比较的元素。

#### 返回值

排序后的数组。请注意，数组已原地排序，并且不进行复制。

### 描述

如果没有指明 `compareFunction` ，那么元素会按照转换为的字符串的诸个字符的 **Unicode** 位点进行排序。

例如 "Banana" 会被排列到 "cherry" 之前。

数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 `compareFunction`），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。

```js
let arr = [9, 80];
let sortArr = arr.sort();

console.log(arr); // [80, 9]
console.log(sortArr); // [80, 9]
```

如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

* 如果 `compareFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；

* 如果 `compareFunction(a, b)` 等于 0 ， a 和 b 的相对位置不变。

  备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

* 如果 `compareFunction(a, b)` 大于 0 ， b 会被排列到 a 之前。

* `compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

所以，比较函数格式如下：

```js
function compare(a, b) {
  if (a < b ) { // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

```js
function compareNumbers(a, b) {
  return a - b;
}
```

`sort` 方法可以使用 [函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function) 方便地书写：

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers); // [1, 2, 3, 4, 5]
```

也可以写成：

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4, 5]
```

对象可以按照某个属性排序：

```js
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});

console.log(items); 

// sort by name
items.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
```

### 示例

#### 创建、显示及排序数组

```js
var stringArray = ["Blue", "Humpback", "Beluga"];
var numericStringArray = ["80", "9", "700"];
var numberArray = [40, 1, 5, 200];
var mixedNumericArray = ["80", "9", "700", 40, 1, 5, 200];

function compareNumbers(a, b)
{
  return a - b;
}

console.log('stringArray:' + stringArray.join()); // Blue,Humpback,Beluga
console.log('Sorted:' + stringArray.sort()); // Beluga,Blue,Humpback

console.log('numberArray:' + numberArray.join()); // 40,1,5,200
console.log('Sorted without a compare function:'+ numberArray.sort()); // 1,200,40,5
console.log('Sorted with compareNumbers:'+ numberArray.sort(compareNumbers)); // 1,5,40,200

console.log('numericStringArray:'+ numericStringArray.join()); // 80,9,700
console.log('Sorted without a compare function:'+ numericStringArray.sort()); // 700,80,9
console.log('Sorted with compareNumbers:'+ numericStringArray.sort(compareNumbers)); // 9,80,700

console.log('mixedNumericArray:'+ mixedNumericArray.join()); // 80,9,700,40,1,5,200
console.log('Sorted without a compare function:'+ mixedNumericArray.sort()); // 1,200,40,5,700,80,9
console.log('Sorted with compareNumbers:'+ mixedNumericArray.sort(compareNumbers)); // 1,5,9,40,80,200,700
```

#### 对非 ASCII 字符排序

当排序非 ASCII 字符的字符串（如包含类似 e, é, è, a, ä 等字符的字符串）。

一些非英语语言的字符串需要使用 [`String.localeCompare`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)。这个函数可以将函数排序到正确的顺序。

```js
var items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];

items.sort(function (a, b) {
  return a.localeCompare(b);
});

console.log(items); //  ["adieu", "café", "cliché", "communiqué", "premier", "réservé"]
```

#### 使用映射改善排序

`compareFunction` 可能需要对元素做多次映射以实现排序，尤其当 `compareFunction` 较为复杂，且元素较多的时候，某些 `compareFunction` 可能会导致很高的负载。使用 map 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

```js
// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index];
});
```

## 11. toString

`toString()` 返回一个字符串，表示指定的数组及其元素。

### 语法

> arr.toString()

#### 无参数

#### 返回值

一个表示指定的数组及其元素的字符串。

### 描述

[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 对象覆盖了[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的 `toString` 方法。

对于数组对象，`toString` 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 `toString` 方法。

### 无示例

从 JavaScript 1.8.5 (Firefox 4) 开始，和 ECMAScript 第5版语义（semantics）一致，`toString()` 方法是通用的，可被用于任何对象。

将调用[`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)，并返回结果值。

# ES5 方法

## forEach

## map

## every

## some

## filter

## reduce

## reduceRight

## indexOf

## lastIndexOf

# ES6 方法

## form

## of

## copyWith

## fill

## find

## findIndex

## includes

## keys

## values

## entries

# ES7 方法

## flat

## flatMap