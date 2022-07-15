# 浏览器工作原理与实践

## JavaScript 执行机制

### 变量提升

首先来看一段代码，你觉得这段代码会输出什么结果？

```js
showName()
console.log(myname)
var myname = 'heora'
function showName() {
  console.log('函数showName被执行')
}
```

来看一下实际结果：

```
函数showName被执行
undefined
```

如果我们移除 `myname` 定义，会发生什么？

```js
showName()
console.log(myname)
function showName() {
  console.log('函数showName被执行')
}
```

执行这段代码时，JavaScript 引擎就会报错:

```
ReferenceError: myname is not defined
```

从上面两段代码的执行结果来看，我们可以得出三个结论：

* 执行过程中，若使用未定义变量，那么 JavaScript 执行会报错；
* 在一个变量定义之前使用它，不会报错，但是该变量的值为 undefined，而不是定义的值；
* 在一个函数定义之前使用它，不会报错，函数可以正常执行。

你可能会对第二个和第三个结论感到迷惑。

* 变量和函数为什么能够在其定义之前使用？

* 同样的方式，为什么变量和函数的处理结果不同？

  提前使用的 `showName` 函数可以正常执行，但是提前使用的 `myname` 变量却是 `undefined`。

#### 变量提升（Hoisting）

要解释这两个问题，就需要先了解什么是变量提升。

介绍变量提升之前，我们先通过下面这段代码，来看下什么是 JavaScript 的声明和赋值。

```js
var myname = 'heora'
```

这段代码可以被分解为两行代码：

```js
var myname			 // 声明
myname = 'heora' // 赋值
```

如下图所示：

<img src="./images/hoisting01.png" />

上面是函数变量的声明和赋值，接下来我们再来看函数的声明和赋值。

```js
function foo() {
  console.log('foo')
}

var bar = function() {
  console.log('bar')
}
```

第一个函数是一个完整的函数声明，没有涉及到赋值操作；第二个函数事先声明变量 bar，然后再赋值函数。

<img src="./images/hoisting02.png" />

理解声明和赋值操作之后，接下来我们就可以聊聊什么是变量提升了。

**所谓的变量提升，就是指在 JavaScript 代码执行过程中，JavaScript 引擎会把变量的声明部分和函数的生命分布提升到代码开头的 ”行为“。变量被提升后，会给变量设置默认值，默认值为 undefined**

下面我们来模拟实现：

```js
// 源代码

showName()
console.log(myname)
var myname = 'heora'
function showName() {
  console.log('函数showName被执行')
}
```

```js
// 模拟实现代码

// 变量提升部分
var myname = undefined
function showName() {
	console.log('函数showName被执行')
}

// 可执行代码部分
showName()
console.log(myname)
myname = 'heora'
```

我们主要对原来的代码做了两处调整：

* 第一处是把声明部分都提升到代码开头，如变量 myname 和函数 showName，并给变量设置默认值 undefined；
* 第二处是移除原本的声明和函数，如 `var myname = 'heora'`，移除了 var 声明和 showName 的函数声明。

通过这段模拟的变量提升代码，相信你已经明白在定义之前使用变量或函数的原因 -    **函数和变量在执行之前都提升到代码开头**。

#### JavaScript 代码的执行流程

从字面意义来看，”变量提升“ 意味着变量和函数的声明会在物理层面移动到代码的最前面，正如我们所模拟的那样。但是，这并不准确。

**实际上变量和声明在代码里的位置是不会改变的，只是在编译阶段被 JavaScript 引擎放入到内存中** 。一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。

<img src="./images/lifecycle.png" />

##### 编译阶段

那么编译阶段和变量提升存在什么关系呢？

为了搞清楚这个问题，我们还是回过头来看上面那段模拟变量提升的代码。我们可以把这段代码分成两部分。

**1. 变量提升部分的代码**

```js
var myname = undefined
function showName() {
	console.log('函数showName被执行');
}
```

**2. 执行部分的代码**

```js
showName()
console.log(myname)
myname = 'heora'
```

我们可以把 JavaScript 的执行流程细化。

<img src="./images/lifecycle02.png" />

从图中可以看出，输入一段代码，经过编译后，会生成两部分内容：执行上下文（Execution context）和可执行代码。

执行上下文是 JavaScript 执行一段代码时的运行环境，比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。

关于执行上下文的细节，我们后面再做详细介绍，现在你只需知道，在执行上下文中存在一个变量环境的对象（Viriable Environment），该对象保存了变量提升的内容，比如上面代码中的变量 myname 和函数 showName，都保存在该对象中。

你可以简单地把变量环境对象看成是如下结构：

```js
VariableEnvironment:
     myname -> undefined, 
     showName ->function : {console.log(myname)
```

了解完变量环境对象的结构后，接下来，我们再结合下面这段代码来分析如何生成变量环境对象。

```js
showName()
console.log(myname)
var myname = 'heora'
function showName() {
  console.log('函数showName被执行')
}
```

我们可以一行行分析上述代码：

* 第 1 行和第 2 行，由于这两行代码不是申明操作，所以 JavaScript 引擎不会做任何处理；
* 第 3 行，由于这行是讲过 var 声明的，因此 JavaScript 引擎将在环境对象中创建一个名为 myname 的属性，并使用 undefined 对其初始化；
* 第 4 行，JavaScript 引擎发现一个通过 function 定义的函数，所以它将函数定义存储到堆（Heap）中，并在环境对象中创建一个 showName 的属性，然后将该属性值指向堆中函数的位置。

这样就生成了变量环境对象。接下来 JavaScript 引擎会把声明以外的代码编译为字节码。字节码细节我们后面再详细介绍，你可以类比如下的模拟代码：

```js
showName()
console.log(myname)
myname = 'heora'
```

##### 执行阶段

JavaScript 引擎开始执行 ”可执行代码“，按照顺序一行一行地执行。

* 当执行到 showName 函数时，JavaScript  引擎便开始在变量环境对象中查找该函数，由于变量环境对象中存在该函数的引用，所以 JavaScript 引擎便开始执行该函数，并输出 ”函数 showName 被执行“ 结果。
* 接下来打印 ”myname“ 信息，JavaScript 引擎继续在变量环境对象中查找该对象，由于变量环境存在 myname 变量，并且其值为 undefined，所以这时候就输出 undefined。
* 接下来执行第 3 行，把 ”heora“ 赋给 myname 变量，赋值后变量环境中的 myname 属性值改变为 ”heora"，变量环境如下所示：

```js
VariableEnvironment:
     myname -> "heora", 
     showName ->function : {console.log(myname)
```

以上就是一段代码的编译和执行流程。实际上，编译阶段和执行阶段都是非常复杂的，包括词法分析、语法解析、代码优化、代码生成等。

#### 代码中相同变量或者函数

现在你已经知道，在执行一段 JavaScript 代码之前，会变编译代码，并将代码中的函数和变量保存到执行上下文的变量环境中，那么如果代码中出现重名的函数或者变量，JavaScript 引擎会如何处理？

我们来看下这样一段代码：

```js
function showName() {
  console.log('heora')
}
showName()
function showName() {
  console.log('yueluo')
}
showName()
```

在上面代码中，我们先定义了一个 showName 的函数，该函数打印出来 “heora”；然后调用 showName，并定义了一个 showName 函数，该函数打印出 “yueluo” ；最后接着调用 showName。那么你能分析出这两次调用打印出来的值什么吗？

下面我们来分析其完成流程：

* 首先是编译阶段。遇到第一个 showName 函数，会将该函数体存放到变量环境中。接下来是第二个 showName 函数，继续存放至变量环境中，但是变量环境中已经存在一个 showName 函数。此时，第二个 showName 函数会将第一个 showName 函数覆盖掉。这样变量环境中就只存在第二个 showName 函数。
* 接下来是执行阶段。先执行第一个 showName 函数，但由于是从变量环境中查找 showName 函数，而变量环境中只保存了第二个 showName 函数，所以最终调用的是第二个函数，打印的内容是 “yueluo”。第二次执行 showName 函数也是走同样的流程，所以输出的结果也是 “yueluo”。

综上所述，一段代码如果定义了两个不相同名字的函数，那么最终生效的是最后一个函数。

#### 总结

* JavaScipt 代码执行过程中，需要先做变量提升，而之所以需要实现变量提升，因为 JavaScript 代码再在执行之前需要先编译；
* 在编译阶段，变量和函数会被存放到变量环境中，变量的默认值会被设置为 undefined；在代码执行阶段，JavaScript 引擎会从变量环境中去查找自定义的变量和函数。
* 如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，后定义的会覆盖掉之前定义的。

学习这些内容并不是为了掌握 JavaScript 小技巧，主要目的是为了搞清楚 JavaScript 的执行机制：**先编译，再执行**。

#### 技术拓展

**ES6 后不用 var，所以可否理解 Hoisting 为“权宜之计/设计失误”呢？**

可以理解为涉及失误，因为设计之初的目的就是想让网页动起来，JavaScript 创造者 Brendan Eich 并没有打算把语言设计太复杂。 所以只引入了函数级作用域和全局作用域，一些块级作用域都被忽略掉。 

这样如果变量或者函数在 `if` 块，`while` 块里面，因为他们没有作用域，所以在编译阶段，就干脆把这些变量和函数提升到开头，这样设计语言的复杂性就大大降低了，但是这也埋下了混乱的种子。

随着JavaScript的流行，人们发现问题越来越多，中间的历史就展开了，最终推出了es6，在语言层面做了非常大的调整，但是为了保持想下兼容，就必须新的规则和旧的规则都同时支持，这样也导致了语言层面不必要的复杂性。

虽然JavaScript语言本身问题很多，但是它已经是整个开发生态中的不可或缺的一环，因此，不要因为它的问题多就不想去学它，个人认为判断要学不学习一门语言要看所能产生的价值，JavaScript 就这样一门存在很多缺陷却是非常有价值的语言。

### 调用栈

之前我们讲到，当一段代码被执行时，JavaScript 引擎先会对其进行编译，并创建执行上下文。但是当时并没有明确说明到底什么样的代码才算符合规范。

接下来我们就来明确下，哪些情况下代码才算是 “一段” 代码，才会在执行之前就进行编译并创建上下文。一般来说，有这么三种情况：

* 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
* 当调用一个函数的时候，函数体内部的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
* 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

本篇文章，我们就在此基础之上继续深入，一起聊聊调用栈。学习调用栈至少有以下三点好处：

* 可以帮助你了解 JavaScript 引擎背后的工作原理；
* 让你具备调试 JavaScript 代码的能力；
* 帮助你搞定面试，面试中，调用栈也是出镜率非常高的题目。

比如在编写 JavaScript 代码的时候，有时候我们会遇到栈溢出的错误。这就涉及调用栈的内容。在 JavaScript 中有很多函数，经常会出现在一个函数中调用另外一个函数的情况，调用栈就是用来管理函数调用关系的一种数据结构。因此要搞清楚调用栈，还需要先弄明白 **函数调用** 和 **栈结构**。

#### 什么是函数调用

函数调用就是运行一个函数。

```js
var a = 2
function add() {
  var b = 10
  return a + b
}
add()
```

这段代码很简单，显示创建一个 add 函数，接着又调用该函数。

下面我们就利用这段简单代码来解释下函数调用的过程。

在执行到函数 add 之前，JavaScript 引擎会为这段代码创建全局执行上下文，包括声明的函数和变量。

<img src="./images/global_context.png" />

从图中可以看出，代码中全局变量和函数都保存在全局上下文的变量环境中。

执行上下文准备好之后，便开始执行全局代码，当执行到 add 函数，JavaScript 判断这是一个函数调用，将执行以下操作：

* 首先，从全局执行上下文中，取出 add 函数；
* 其次，对 add 函数的这段代码进行编译，并创建该函数的执行上下文和可执行代码。
* 最后，执行代码，输出结果。

<img src="./images/function_context.png" />

当执行到 add 函数的时候，我们就有了两个执行上下文，全局执行上下文和 add 函数的执行上下文。

也就是说在执行 JavaScript 时，可能会存在多个执行上下文。JavaScript 引擎是通过一种栈数据结构来管理这些执行上下文。

#### 什么是 JavaScript 的调用栈

JavaScript 引擎利用栈来管理执行上下文。在执行上下文创建好后，JavaScript 引擎会将执行上下文压入栈中，通常把这种用来管理执行上下文的栈成为执行上下文站，又称调用栈。

为了便于你更好地理解调用栈，我们来看一段稍微复杂的示例代码。

```js
var a = 2
function add(b, c){
  return b + c
}
function addAll(b, c){
  var d = 10
  result = add(b, c)
  return  a + result + d
}
addAll(3, 6)
```

在上面这段代码中，你可以看到它是在 addAll 函数中调用了 add 函数，那在整个代码的执行过程中，调用栈是如何变化的呢？

下面我们就一步步地分析在代码的执行过程中，调用栈的状态变化情况。

<img src="./images/call_stack01.png" />

从图中可以看出，变量 a、函数 add 和 addAll 都保存在全局上下文的变量环境对象中。

全局执行上下文压入到调用栈后，JavaScript 引擎便开始执行全局代码了。首先会执行 `a = 2` 的赋值操作，执行该数据会将全局上下文变量环境中 a 的值设置为 2。设置后的全局上下文状态如下图所示：

<img src="./images/call_stack02.png" />

接下来，第二步是调用 addAll 函数。当调用该函数时，JavaScript 引擎编译该函数，并为其创建一个执行上下文，最后还将该函数的执行上下文压入栈中。

<img src="./images/call_stack03.png" />

addAll 函数的执行上下文创建好之后，便进入函数代码的执行阶段，这里先执行的是 `d = 10` 的赋值操作，执行语句会将 addAll 函数执行上下文中的由 undefined 变成 10。然后接着往下执行。

第三步，当执行到 add 函数调用语句时，同样会为其创建执行上下文，并将其压入调用栈。

<img src="./images/call_stack04.png" />

当 add 函数返回时，该函数的执行上下文就会从栈顶弹出，并将 result 的值设置为 add 函数的返回值，也就是 9 。

<img src="./images/call_stack05.png" />

紧接着 addAll 执行最后一个相加操作后并返回，addAll 的执行上下文也会从栈顶弹出，此时调用栈中就只剩下全局上下文。

<img src="./images/call_stack02.png" />

至此，整个 JavaScript 流程执行就结束了。

现在你应该知道调用栈是 JavaScript 引擎追踪函数执行的一个机制，当一次有多个函数被调用时，通过调用栈能够追踪到哪个函数正在被执行以及各函数之间的调用关系。

#### 如何利用好调用栈

##### 例如用浏览器查看栈信息

当执行一段复杂的代码时，你可能很难从代码文件中分析其调用关系，这时候你可以在你想要查看的函数中加入断点，当执行到该函数时，就可以查看该函数的调用栈了。

我们拿上面那段代码做演示，你可以打开 “开发者工具”，点击 “source” 标签，选择 JavaScript 代码的页面，然后在 add 函数中加上断点，并刷新页面。你可以看到在执行到 add 函数时，程序就暂停了，这时你可以通过右边 “call stack” 来查看当前的调用栈的情况。

<img src="./images/call_stack06.png" />

从图中可以看出，右边的 "call stack" 下面显示出了函数的调用关系：栈的最底部是 anonymous，也就是全局的函数入口；中间是 addAll 函数；顶部是 add 函数。这就清晰地反映了函数的调用关系，所以在分析复杂结构代码，或者检查 Bug 时，调用栈都是非常有用的。

除了通过断点来查询调用栈，你还可以使用 `console.trace()` 来输出当前的函数调用关系，比如在示例代码中的 add 函数里添加 `console.trace()` ，你就可以看到控制台输出的结果。

<img src="./images/call_stack07.png" />



<img src="./images/call_stack08.png" />

##### 栈溢出（Stack Overflow）

现在你已经知道调用栈是一种用来管理执行上下文的数据结构，符合先进后出的规则。不过还有一点需要注意，调用栈是有大小的，当入栈的执行上下文超过一定数目，JavaScript 引擎就会报错，我们把这种错误叫做栈溢出。

在写递归代码的时候，就很容易出现栈溢出的情况。

```js
function division(a, b) {
  return division(a, b)
}
division(1, 2)
```

这段代码执行时，就会抛出栈溢出错误。

<img src="./images/call_stack09.png" />

从上图你可以看到，抛出的错误信息为：超出最大栈调用大小（`Maximun call stack size excedded`）。

JavaScript 引擎开始执行这段代码时，它首先调用函数 division，并创建执行上下文，压入栈中。但是，这个函数是递归的，并且没有任何终止条件，所以它会一直创建新的函数执行上下文，并反复将其压入栈中，但栈是有容量限制的，超过最大数量后就会出现栈溢出的错误。

理解栈溢出原因后，就可以使用一些方法来避免或者解决栈溢出的问题，比如把递归调用的形式改造成其他形式，或者使用加入定时器的方法把当前任务拆分为其他很多小任务。

#### 总结

* 每调用一个函数，JavaScript 引擎都会为其创建执行上下文，并把该执行上下文压入调用栈，然后 JavaScript 引擎开始执行函数代码；
* 如果在一个函数 A 中调用了另一个函数 B，那么 JavaScript 引擎会为 B 函数创建执行上下文，并将 B 函数的执行上下文压入栈顶；
* 当前函数执行完毕后，JavaScript 引擎会将该函数的执行上下文弹出栈；
* 当分配的调用栈空间被占满时，会引发 “堆栈溢出” 问题。

栈是一种非常重要的数据结构，不仅应用在 JavaScript 中。在其他的编程语言，例如 C/C++、Java、Python 等，在其执行过程中也都使用了栈来管理函数之间的调用关系。所以栈是非常基础且重要的知识点，我们必须要掌握。

### 块级作用域

