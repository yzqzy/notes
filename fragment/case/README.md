# JS 奇技淫巧

## parseInt 遇上 map

```js
["1", "2", "3"].map(parseInt) // [ 1, NaN, NaN ]
```

`parseInt` 函数需要两个参数 `parseInt(value, radix)` , map 的回调函数存在三个参数 `callback(currenvValue, index, array)` 。MDN 文档中指明 `parentInt` 第二个参数是一个 2 到 36 之间的整数值，用于指定转换中采用的基数。如果省略该参数或者其值为 0，数字将以 10 为基础来解析。如果该参数小于 2 或者大于 36，则 `parentInt` 返回 `NaN`。此外，转换失败也会返回 `NaN` 。

题目分析如下：

* `parseInt("1", 0)` 的结果当作十进制来解析，返回 1；
* `parseInt("2", 1)` 的第二个参数非法，返回 `NaN` ；
* `parseInt("3", 2) ` 在进制中，"3" 是非法字符，转换失败，返回 `NaN`。

## parseInt 小贼

```js
console.log(parseInt("3", 8)) // 3
console.log(parseInt("3", 2)) // NaN
console.log(parseInt("3", 0)) // 3
```

这个在第一个问题中解释的很清楚了。

## 神奇的 null

```js
typeof null, null instanceof Object // [ 'object', false ]
```

`typeof null` 的结果是 `object` ，这是 `ECMAScript` 的 bug ，结果应该是 ”null"。但是这个 bug 由来已久，在 JavaScript 中存在了近二十年，也许永远不会被修复，因为它牵扯到太多的 web 系统，修复它可能会产生更多的 bug，令很多系统无法工作。

`instanceof` 运算符用来测试一个对象在其原型链构造函数上是否具有 `prototype` 属性，`null` 值并不以 `Object` 为原型创建出来，所以 `null instance Object` 返回 false。

## 愤怒的 reduce

```js
[3, 2, 1].reduce(Math.pow), [].reduce(Math.pow) // Reduce of empty array with no initial value
```

如果数组为空且没有提供 `initialValue` ，会抛出 `TypeError` 。如果数组仅有一个元素（无论位置如何）且没有提供 `initialValue` ，或者有提供 `initialValue` 但是数组为空，那么唯一值将被返回并且 `callback` 不会被执行。

```js
[[3].reduce(() => {}), [].reduce(() => {}, 3)]
```

## 该死的优先级

```js
const val = 'heora'
console.log('Value is' + (val === 'heora') ? 'Something' : 'Nothing') // Something
```

结果输入 Something，因为 `+` 的优先级比条件运算符的 `condition ? val1 : val2` 的优先级高。

要想得到预期结果，我们可以使用模板字符串。

```js
console.log(`Value is ${ (val === 'heora') ? 'Something' : 'Nothing' }`) // Value is Something
```

## 变量提升

```js
var name = 'World!'

;(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack'
    console.log('Goobye ' + name)
  } else {
    console.log('Hello' + name)
  }
})();
```

答案是 `Goobye Jack` 。在 JavaScript 中，functions 和 variables 会被提升。变量提升是 JavaScript 将声明移至作用域 scope（全局域或当前函数作用域）顶部的行为。这意味着你可以在声明一个函数或变量之前引用它，或者可以说，一个变量或函数可以在它被引用之后声明。

上面的代码和下面这段代码是等价的。

```js
var name = 'World!'

;(function () {
  var name
  
  if (typeof name === 'undefined') {
    name = 'Jack'
    console.log('Goobye ' + name)
  } else {
    console.log('Hello' + name)
  }
})();
```

## 死循环陷阱

```js
var END = Math.pow(2, 53)
var START = END - 100
var count = 0

for (var i = START; i <= END; i++) {
  console.log(count)
  count++
}
console.log(count)
```

在 JavaScript 中，2^53 是最大的值。2^53 + 1 == 2^53，所以这个循环无法终止。

```js
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
```

## 过滤器魔法

```js
var arr = [0, 1, 2]
arr[10] = 10
arr.filter((x) => x === undefined) // []
```

filter 为数组中的每一个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。**callback 只会在已经赋值的元素上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。**那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。

## IEEE 754 标准

```js
var one = 0.1
var two = 0.2
var six = 0.6
var eight = 0.8

[two - one == one, eight - six == two] // [true, false]
```

JavaScript 采用双精度浮点数格式，即 IEEE 754 标准。在该格式下，有些数字无法表示出来，比如：`0.1 + 0.2 = 0.30000000000000004` ，这不是 JavaScript 的问题，所有采用该标准的语言都有这个问题，比如：Java、Python 等。

* Wiki：[https://yamm.finance/wiki/Double_precision_floating-point_format.html](https://yamm.finance/wiki/Double_precision_floating-point_format.html)

## 字符串陷阱

```js
function showCase (value) {
  switch (value) {
    case 'A':
      console.log('Case A')
      break
    case 'B':
      console.log('Case B')
      break
    case 'C':
      console.log('Case C')
      break
    case 'D':
      console.log('Case D')
      break
    default:
      console.log('Do Not konw!')
  }
}
showCase(new String('A')) // Do Not konw!
```

在 switch 内部使用严格相等 === 进行判断，并且 `new String("A")` 返回的是一个对象，而 `String("A")` 则是直接返回字符串 "A"。

```js
function showCase (value) {
  switch (value) {
    case 'A':
      console.log('Case A')
      break
    case 'B':
      console.log('Case B')
      break
    case undefined:
      console.log('undefined')
      break
    default:
      console.log('Do Not konw!')
  }
}
showCase(String('A')) // Case A
```

## 并非都是奇偶

```js
function isOdd(num) {
  return num % 2 == 1
}
function isEven(num) {
  return num % 2 == 0
}
function isSane(num) {
  return isEven(num) || isOdd(num)
}

var values = [7, 4, '13', -9, Infinity]
console.log(values.map(isSane)) // [ true, true, true, false, false ]
```

`-9 % 2 = -1` 以及 `Infinity % 2 = NaN`，求余运算符会保留符号，所以只有` isEven` 的判断是可靠的。

## 数组原型是数组

```js
Array.isArray(Array.prototype) // true
```

其实 `Array.prototype` 也是一个数组，具体可以参考 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)。

## 一言难尽的强制转换

```js
var a = [0]
if ([0]) {
  console.log(a == true) // false
} else {
  console.log('what?')
}
```

当 `[0]` 需要被强制转成 Boolean 的时候会被认为是 true，所以进入第一个 if 语句。对于 `a == true` ，在 `==` 相等中，如果有一个操作符是布尔类型，会先把它转成数字，所以比较就变成了 `[0] == 1`。同时如果其他类型与数字比较，会尝试把这个类型转换成数字在进行宽松比较，而对象（数组也是对象）会先调用 `toString()` 方法，此时 `[0]` 会变成 ”0“ ，然后再将字符串 ”0“ 转成数字 0，而 `0 == 1` 的结果显然是 false。

所以当使用 `a == false` 进行比较，结果将是 true。

```js
var a = [0]
if ([0]) {
  console.log(a == true) // false
  console.log(a == false) // true
} else {
  console.log('what?')
}
```

## 撒旦之子 ”==“

```js
[] == [] // false
```

如果比较的两个对象指向的是一个对象，就返回 true，否则就返回 false。显然，这是两个不同的数组对象。

## 加号 vs 减号

```js
'5' + 3 // 53
'5' - 3 // 2
```

`"5" + 3 = "53"`  很好理解，`+` 运算符只要有一个是字符串，就会变成字符串拼接操作。而 `-` 运算符要求两个操作数都是数字，如果不是，则强制转换成数字，所以就变成 `5 - 3 = 2` 。

## 打死那个疯子

```js
1 + - + + + - + 1 // 2
```

这个代码只能出现在示例代码中，如果你发现哪个疯子写在生产代码中，打死他就行了。

你只要知道 `+1 = 1`  和 `-1 = -1` ，注意符号之间的空格。两个减号抵消，所以最终结果就是 `1 + 1 = 2`。或者你可以在符号之间插入 0 来理解，即 `1 + 0 - 0 + 0 + 0 + 0 - 0 + 1` ，这样就一目了然了。

## 淘气的 map

```js
var arr = Array(3)
arr[0] = 2
arr.map((elem) => '1') // [ '1', <2 empty items> ]
```

map 方法会给原数组的每个元素都按顺序调用一次 callback 函数。callback 函数每次执行后的返回值组合成一个新数组。callback 函数只会在有值的索引上被调用。那些从没被赋过值或者使用 delete 删除的索引则不会被调用。

## 统统算我的

```js
function sideEffecting(arr) {
  arr[0] = arr[2]
}
function bar(a, b, c) {
  c = 10
  sideEffecting(arguments)
  return a + b + c
}
console.log(bar(1, 1, 1)) // 21 
```

在 JavaScript 中，参数变量和 arguments 是双向绑定的。改变参数变量，arguments 中的值也会改变。改变 arguments 中的值，参数变量也会改变。

## 损失精度 IEEE 754

```js
var a = 111111111111111110000
var b = 1111
console.log(a + b) // 111111111111111110000
```

这是 IEEE 754 规范的黑锅，不是 JavaScript 的问题。这么大的数占用过多位数，会丢失精度。

## 反转世界

```js
var x = [].reverse
x() // Cannot convert undefined or null to object
```

## 最小的正值

```js
Number.MIN_VALUE > 0 // true
```

MAX_VALUE 属性是 JavaScript 里最接近 0 的正值，而不是最小的负值。

MIN_VALUE的值约为 `5e-324`。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。

因为 MIN_VALUE 是 Number 的一个静态属性，因此应该直接使用：`Number.MIN_VALUE`，而不是作为一个创建的 Number实例的属性。

## 谨记优先级

```js
[1 < 2 < 3, 3 < 2 < 1] // [true, true]
```

`<`  和 `>` 的优先级都是从左到右，所以 `1 < 2 < 3` 会先比较 `1 < 2` ，这会得到 true，但是 `<` 要求比较两边都是数字，所以会发生隐式强制类型转换，将 true 转换为 1，所以最后就变成比较 `1 < 3` ，结果显示为 true。同理可以分析后者。

## 坑爹中的战斗机

```js
2 == [[[2]]] // true
```

根据 ES5 规范，如果比较的两个值中有一个是数字类型，就会尝试将另外一个值强制转换成数字，在进行比较。而数组强制转换成数字的过程会先调用它的 `toString` 方法转成字符串，然后再转成数字。所以 `[2]` 会被转成 "2"，然后递归调用。最终 `[[[2]]]` 会被转换成数字 2。

## 小数点魔术

```js
// 以下代码分别打印

console.log(3.toString()) // error
console.log(3..toString()) // 3
console.log(3...toString()) //  error
```

点运算符会被优先识别为数字常量的一部分，然后才是对象属性访问符。所以 `3.toString()` 实际上被 JS 引擎解析成 `(3).toString()`，显然会出现语法错误。但是如果你自己写 `(3).toString()` ，人为加上括号，这就是合法的。

## 自动提升全局变量

```js
;(function () {
  var x = y = 1
})();
console.log(y) // 1
console.log(x) // x is not defined
```

很经典的例子，在函数中如果没有用 var 声明变量 y，y 就会被自动创建在全局变量 window 下面，所以在函数外面也可以访问到。而 x 由于被 var 声明过，所以在函数外部是无法访问的。

