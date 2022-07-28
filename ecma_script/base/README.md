# ECMAScript

  ## 一、发展史、ECMA、编程语言、变量、JS值

JavaScript是前端唯一重中之重的语言。

### 浏览器内核

5大主流的浏览器内核：

| 浏览器  | 浏览器内核    |
| ------- | ------------- |
| IE      | trident       |
| chrome  | webkit、blink |
| safari  | webkit        |
| firefox | gecko         |
| opera   | presto        |

### 浏览器的历史和 JS 诞生

**1. 1990年 真正意义的浏览器诞生**

蒂姆 伯纳斯 李 => 第一个用超文本分享资讯的人

开发一个浏览器 world wide web，起初不是 c 写的，后来移植到 c 

libwww -> nexus

libwww是真正意义上的浏览器，允许别人浏览他人编写的网站。

**2. 1993 年**

美国 伊利诺大学 NCSA组织（马克 安德森） 

开发了MOSIAC浏览器，可以显示图片，真正意义上的图形化浏览器。

**3. 1994年**

马克.安德森 和  吉姆.克拉克 成立 MOSIAC communication corpor 公司（马赛克交流公司）。

MOSIAC 是有商标权的，是伊利诺大学的，大学在马克.安德森离开后，转让给 spy glass 公司。

MOSIAC 改名为 Netscape communication corpor。

Netscape 网景公司 ，现在几乎所有的浏览器都和网景公司有关系。

网景公司开发 netscape navigator（导航者浏览器），流行10 年左右，知道 2003 年都很流行。

**4. 1996 年**

* 微软收购 spy glass 公司，开发IE浏览器（Internet exploror 1.0）。

   trident 内核最初没有名称，是在当初 MOSIAC 的基础上加了一些内容。

  微软发布 IE3 出现第一个script脚本语言 ->  Jscript 

* 网景公司 Brendan eich 在 netscape navigator 基础上开发出 livescript（JavaScript前身，只能在netscape上运行）

  script 目的是让用户可以在网页上进行动态交互

* JAVA（sun公司）火起来，网景公司 livescript 不温不火

  网景公司和 sun 工资合作宣传产品，livescript 更为名 javascript

**5. 2001 年**

IE6、XP 诞生

IE6 的诞生，JS 引擎出现。

从渲染引擎中把解析 JavaScrpt 的部分剥离出来，单独形成 JS 引擎。

**6. 2003 年**

netscape navigator 2002 年把源码公布。

mozilla 公司  firefox 根据 netscape navigator 进行修改。

**7. 2008 年**

google 基于 webkit、blink、geras（离线浏览网页的功能），开发出 chrome 浏览器。

PROGRESSIVE WEB APP（渐进式WEB APP）也是谷歌提出的。

chrome -> V8引擎（JS引擎） 

* 直接翻译机器码（任何浏览器否无法超过chromr的速度）

* 独立于浏览器运行

**8. 2009年**

甲骨文（oracle）收购 SUN 公司。

JS 的所有权给甲骨文，JavaScript 是甲骨文的。

### ECMAScript 是什么

ECMA European Computer Manufactures Association（欧洲计算机制造联合会 日内瓦）

评估、开发和认可 电信、计算机标准，标准清单

* ECMA-334 c# 编程语言规范
* ECMA-262 脚本语言规范 ECMAScript

 ES5、ES6 是一种 JS 标准。 规范化脚本语言。

### 编程语言、脚本语言

#### 编程语言

编译型  解释型

编译型：源码 -> 编译器 ->  机器语言 -> 可执行文件
解释型：源码 -> 解释器 -> 解释一行执行一行，不需要根据不同的系统平台进行移植

JAVA 混合型语言：

```
.java -> javac -> .class -> JVM 解释执行
```

C++ ：

```
.cpp源码 -> 编译器 -> .s 汇编 ->  汇编器  -> .obj 目标代码 -> 链接器 -> 可执行文件
```

#### 脚本语言

脚本语言一定有脚本引擎，通过脚本引擎的解释器解释后才能正常运行。

前端后端都有脚本语言。JavaScript（客户端脚本）、PHP（服务端脚本）。

* vbscript（开发客户端应用程序）。
* jscript。只支持IE浏览器。
*  asp，针对动态网页的技术。
* .net框架，提供很多模板式UI。asp.net。

 actionscript adobe flash player

### JavaScript

ECMAScript

语法、变量、关键字、保留字、值
原始类型、引用类型、对象、继承、函数

DOM document object model W3C 规范
BOM browser object model 没有规范

JS引擎 单线程 

单线程 -> 模拟多线程

轮转时间片：短时间之内轮流执行多个任务的片段

1. 任务1 任务2
2. 切人任务1和任务2
3. 随机排列这些任务片段，组成队列
4. 按照队列顺序将任务片段送进JS进程
5. JS线程执行一个又一个的任务片段

```html
<script type="text/javascript" src="./js/index.js">
  document.write('Hello World2.')
</script>
```

引入外部文件同时并编写内部脚本，外部文件会覆盖内部文件内容。

```html
<!--   tpl模板的形式 -->
<script type="text/tpl">
  <div class="box">{{name}}</div>
</script>
```

HTMLCSS 不具备逻辑，变量和数据结构是没有的，标记语言。
JavaScript，编程语言。

一门编程语言必须要有变量、数据结构、函数、运算能力。

#### 变量

变量是一种存储数据的容器，便于后续使用。

```js
// var -> variable  

var a; // 变量声明
a = 3; // 变量赋值

var a = 3; // 变量声明并赋值

// 声明就是为变量声明一个存储空间，名称就是变量声明的名称。
// var a 就是申请一个名称为a的存储空间。

//变量声明 = 

// 单一声明方式
var x = 1,
y = 2;

// JavaScript 语句以分号结束，JS引 擎解释器是按照分号作为一行的。

// 重复赋值

var a = 1;
a = 2;

document.write(a); // 2

// 运算 > 赋值      

var x = 2,
y = 3;

var z = x + y; // 3 
```

#### 命名规范

* 不能以数字开头
* 可以使用字母 、`_`、`$` 开头
* 变量里可以包含字母、下划线、数字等字母
* 关键字和保留字不能使用（ECMA有明确规定）
* 命名要语义化、结构化
* 变量命名需要用小驼峰命名
* 尽可能不使用拼音缩写，可以使用约定俗成的一些拼音

#### JS 值类型

**原始值（基础数据类型）**

```
Number、String、Boolean、undefined、null
```

JavaScript是弱类型语言，只要是动态语言基本上都是脚本语言，脚本语言基本都是解释型语言，解释型语言一定是弱类型语言。
动态语言 -> 脚本语言 -> 解释性语言 -> 弱类型语言

动态语言相对的都是静态语言，静态语言一般都是编译型语言，编译型语言基本都是强类型语言。
动态语言 -> 编译型语言 -> 强类型语言

计算机中，非真即假，非假即真。

初始化组件、函数定义销毁、占位一般都是用 null。

undefined 未被定义、null 空值。

**引用值**

```
常用：object、array、function、date、RegExp、
```

**原始值和引用值区别**

原始值存放在栈内存中（原始值是不可改变的，永久存储，除非被覆盖掉）；
引用值的值存放在堆内存中，栈内存中保存值的地址（指针）;

  ## 二、语法、规范、错误、运算符、判断分支、注释

JavaScript 错误

    1. 语法问题 `SyntaxError`
  2. 通用问题 `ReferenceError` ...  中断执行，错误之前语句是会执行的

代码块（JavaScript 代码块）与代码块之间错误是不影响的。程序与程序之间是不相关的。

运算符 ：`- * / % ()`

```js
var a = 1,
		b = 2,
		c = 3;

var d = (a + b) * d;

// 1. 声明变量 c
// 2. 变量 a 的值和变量 b 的值相加，与变量 c 的值相乘得到结果
// 3. 将结果赋值给变量 c
```

**括号运算 > 普通运算 > 赋值**



任何数据类型的值加上字符串都是字符串。

```js
'str' + 1 + 1; // str11
'str' + (1 + 1); // str2
1 + 1 + 'str' + (1 + 1) // 2str2
```

```js
0 / 0 // NaN（Not a Number）非数
```



NaN 是数字类型。
Infinity、-Infinity 都是是数字类型。

```js
'a' / 'b' // NaN
NaN / NaN // NaN
1 / NaN   // NaN
1 / 0 // Infinity
-1 / 0 // -Infinity
```

````js
5 % 2 // 1
5 % 3 // 2
4 % 6 // 4
````



交换值

```js
var a = 1,
		b = 2;

// 1.
var c = a,
		a = b,
		b = c;

// 2. 
a = a + b;
b = a - b;
a = a - b;
```



```js
var a = 1;

console.log(a++) // 1
console.log(++a) // 2
console.log(a = a + 1); // 2
```



题目：

```js
var a = 5,
    b;

// 1.
b = a++ + 1; // b = 6 , a = 6 

// 2. 
b = ++a + 1; // b = 9 , a = 6 

// 3.
b = a-- + --a; // b = 8 , a = 3

// 4. 
b = --a + --a; // b = 7 , a = 3 

// 5. 
b = --a + a++; // b = 8 , a = 5 
```



```js
1 > 2 // false
1 > '2' // false 
'1' > '2' // false 
'1' < '2' // true

'4.5' > '11' // true 
'1.5' > '11' // false
```

ASCII字符代码表，先比较4和1，所以4.5 > 11

数字与字符串比较，字符串会转换为数字，再进行比较。
字符串与字符串比较，会根据 ASCII 码（字符相对应的十进制代码）进行比较，多个字符的，从左到右依次对比。



```js
1 == 1; // true
1 == '1'; // true
1 === '1'; // false
1 != 1; // false 
1 != 2; // true
1 !== '1'; // true
NaN == NaN; // false 
```

相等是不看数据类型的，全等需要比较数据类型。
**NaN 与包括自己在内任何值都不相等。**

&& 并且 条件必须都要满足
|| 或者 满足一个条件即可

if 语句，互斥性的条件一定不能分开写。
switch break（断开、中断循环） default

可以以使用switch(true)，里面使用case判断范围。

一般来说，判断值范围的，或者条件多个的，一般用 if 语句，一般是定值的，一般用 switch 语句。


逻辑运算：与或非
undefined、null、NaN、''、0、false 都为假，除上述以外，都是真。


```js
1 && 2 // 2
1 && 2 && undefined && 10 // undefined
1 && 1 // 1 真
0 && 1 // 0 假
1 && 0 // 0 假
0 && 0 // 0 假 

1 || 2 // 1        
0 || null || 1 || 0 // 1        
1 || 1 // 1 真
0 || 1 // 1 真
1 || 0 // 1 真
0 || 0 // 0 假

&&：遇到真往后走，遇到假或者走到最后就返回当前值
||：遇到假往后走，遇到真或者走到最后就返回当前值

兼容性写法

var event = e || window.event;

!1 // false 
!!1 // true
```

  注释

```js
// 行注释

/*
 * 块注释
 */
```

  ## 三、循环、引用值初识、显示及隐式类型转换

### 循环

#### for

1. 声明变量 i = 0
2. i < 10 不满足条件，停止循环
3. i++

```js
var i = 0;
for ( ; i < 10; ) {
  console.log(i);
  i++;
}

for ( ; i; ) {
  console.log(i);
  i++;

  if (i == 10) {
    i = 0;
  }
}

// break 起到 i = 0 的作用。
```

```js
// 100 以内的数，跳过可以被 7 整除或带有个位数是 7 的数
for (var i = 0; i <= 100; i++) {
  if (i % 7 == 0 || i % 10 == 7) {
    continue;
  }

  console.log(i);
}

// 打印 0-99 的数(小括号只能有一句，不能写比较。大括号，不能出现i++ i--)
var i = 100;
for (; i--; ) {
  console.log(i);
}

// 10 的 n 次方
var n = 5,
    num = 1;
for (var i = 0; i < n; i++) {
  num *= 10;
}
console.log(num);

// n 的阶乘
var n = 5,
    num = 1;
for (var i = 1; i <= n; i++) {
  num *= i;
}
console.log(num);

// 数字反转
var num = 789;
var a = num % 10,
    b = (num - a) % 100 / 10,
    c = (num - a - b * 10) / 100;
console.log('' + a + b + c); // 987

// 打印 100 以内质数
// 仅仅被1 和自己整除的数（1 不是质数）
var count = 0;
for (var i = 2; i < 100; i++) {
  for (var j = 1; j <= i; j++) { // j <= i 不能比本身大
    if (i % j == 0) {
      count++;
    }
  }

  if (count == 2) {
    console.log(i);
  }

  count = 0;
}
```

#### while

```js
var i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

while (1) {
  // 死循环
}
```

#### do while

```js
// do while
do {
  console.log(i);
  i++;
} while (i < 10);

// 无论条件成立与否，都会执行一遍函数体。
do {
  console.log('执行');
} while (false);
```

### 引用值

```
array、object、function、date、RegExp
```

array []

```js
var arr = [1, 2, 3, undefined, null];
```

object {}

```js
var person = {
  name: 'yueluo',
  age: 15,
  height: 180
  // 属性名/键名：属性值/键值
}

person.name = 'yang';
```

### 类型转换

typeof javascript 内置方法

* typeof 123、typeof(123)
* typeof：number、string、boolean、undefined、function
* typeof null、object、array -> object
* null　最初是指空对象，最初是引用类型，历史遗留问题。
* 引用类型返回的都是 object

```js
typeof(1 - '1') // number
typeof('1' - '1') // number
typeof(a) // undefined
typeof(typeof(a)) // string
typeof(typeof(123)) // string
```

 显示类型转换

```js
Number('123') // 123
Number(true) // 1
Number(false) // 0
Number(null) // 0
Number('true') // NaN
Number(undefined) // NaN
Number('a') // NaN
Number('1a') // NaN
Number('3.14') // 3.14

parseInt('123') // 123 
parseInt(true) // NaN  
parseInt(false) // NaN 
parseInt(null) // NaN  
parseInt(undefined) // NaN  
parseInt(NaN) // NaN  
parseInt(3.14) // 3  
parseInt(3.99) // 3
parseInt('b', 16) // 11
parseInt('abc123') // NaN
parseInt('123abc') // 123
parseInt('1abc23') // 1

// parseInt只管转换成整型。
// parseInt存在两个参数，第二个参数为radix（2-36），代表以 radix 进制为基础进行转换
// 16进制 颜色值 16进制 HEX颜色值 #fff、#ddd

parserFloat('3.14') // 3.14 
parserFloat('3.1414926') // 3.1415926 
parserFloat('3') // 3 
parserFloat('3.1415926').toFixed(2) // 3.14 
parserFloat('3.1465926').toFixed(2) // 3.15 toFixed 四舍五入

String(123) // 123 

'3.14'.toString() // 3.14
undefined.toString() // 报错
null.toString() // 报错

str.toString(16) // 以十进制为单位转换为目标进制 
toString(radix) 

Boolean(1) // true
Boolean(null) // false
Boolean(undefined) // false
undefined、null、NaN、""、0、false 以Boolean转换为false，其他都为true

1234.length // undefined
```

隐式类型转换

```js
var a = '123''
a++ // 124
a-- // 122

'a' + 1 // a1
'3' * 2 // 6

// *、/、- 、% 都会把 string 转换为 number，再进行运算

'1' > '2' // false
1 > '2' // false 

'a' > 'b' // false 转换为 ASCII 码，字符串比较时

// >、<、>=、<= 除了字母比较，都会进行 number 转换，进行对比

1 == '1' // true
1 != '2' // true

1 === '1' // false、不进行隐式转换
NaN == NaN // false 
NaN === NaN // false 

2 > 1 > 3 // false 
2 > 1 == 1 // true 

undefined > 0 // false 
undefined < 0 // false 
undefiend == 0 // false 
null > 0 // false 
null < 0 // false 
null == 0 // false

// undefined 和 null 都不大于、小于或者等于0

undefined == null // true 
undefined === null // false

NaN == NaN // false 

var num = '123';
+num // 123
-num // -123

var num = 'abc';
+num // NaN
-num // NaN

undefined + 1 // NaN
null + 1 // 1
undefined + '1' // undefined1
null + '1' // null1
```

`isNaN()` 判断是不是非数、判断时，首先根据Number转换，再和 NaN 对比取 boolean 值

```js
isNaN(NaN) // true 
isNaN(123) // false
isNaN('123') // false
isNaN('a') // true 是非数
isNaN(null) // false 
isNaN(undefined) // true 
```

  ## 四、函数基础与种类、形实参及映射、变量类型

```js
// 斐波那契数列
// 1 1 2 3 5 8 13 21
function getNumber () {
  var n = window.prompt('请输入第几位');
  var n1 = 1,
    n2 = 1,
    n3;

  if (n <= 0) {
    alert('输入的值不是Number.');
    return;
  }

  if (n == 1 || n == 2) {
    n3 = n1 + n2;
    console.log(n3);
    return;
  }

  for (var i = 2; i < n; i++) {
    n3 = n1 + n2;
    n1 = n2;
    n2 = n3;
  }

  console.log(n3);
}
```



x, y 任意 x 的值都可以有一个确定的 y 与之对应，x 是自变量，y 就是 x 的函数。

`y = f(x) x` 的范围就是定义域、y 的范围就是值域、数学中函数值是确定的，有确定性。

计算机中其实就是函数式编程。

耦合：各个代码块之间重复的地方太多

高内聚（开发的一个模块代码相关性强、独立性强）
低耦合（重复的代码抽象出来，组成独立的功能体）

模块的单一责任制

解耦和：JavaScrpit解耦和最好的方式就是函数。



函数

* 一个固定的功能或者程序段被封装的过程，就是定义函数的过程。
* 实现一个固定的功能或者程序，需要在这个封装体中需要一个入口和一个出口。
* 入口就是参数，出口就是返回值。




函数的命名规则：

1. 不能数字开头
2. 可以以字母、`_`、`$` 开头
3. 小驼峰命名法

ECMAScript 推荐使用小驼峰命名法



最基本的函数的写法

**1. 函数声明**

`function test () {} `

用 function关键字声明一个函数。
函数只有被调用的时候，才会执行。

**2. 匿名函数表达式（函数字面量）**

`var test = funection () {}` // 匿名函数

函数可以进行自调用 - 递归



函数的组成部分

```
function、函数名、参数（可选)、返回值（可选） 系统会内置return
```

参数

```js
function test (a, b) {
  console.log(a + b);
}

test(1, 2);
```

a, b 是形式上的占位，形式参数，形参
传入的参数是实际参数，实参

赋值时，参数是一一对应的。
参数类似于内部声明的变量，可以在函数调用时被赋值，内部定义的参数，无法在调用时被赋值。
参数没有数据类型的规范，什么数据类型都可以传递。
函数的形参和实参可不等。

可以使用 arguments 获取实参列表。
可以使用 `[函数名].length` 获取形参长度



```js
// 一个函数被调用时，累加实参值
function sum () {
  var args = arguments,
      len = args.length,
      sum = 0;

  for (var i = 0; i < len; i++) {
    sum += arguments[i];
  }

  console.log(sum);
}
```

```js
function test (a, b) {
  a = 3;
  console.log(arguments[0]); // 3 函数中可以修改实参的值
}
test(1, 2);

// arguments[0] 和 a 不是同一个变量。
// a 存放在栈内存中，arguments 存放在堆内存中。
// 实参和形参不是一个东西，但是存在映射关系。
// 如果实参没有传入值，映射关系就不存在的，一定是一一对应，才会有映射关系。

function test (a, b) {
  b = 3;
  console.log(arguments[1]); // undefined 实参没有传入值，更改形参，不会影响实参
}
test(1);

// return 终止函数执行，并返回相应值。

function test (name) {
  return name || '您没有输入姓名';
}
```

函数内部可以访问全局变量（`[[scope]]`），外部访问不到内部变量。



```js
function test1 () {
  var a = 1;
  console.log(b); // 未定义
}

function test2 () {
  var b = 2;
  console.log(a); // 未定义
}
```

每个函数都有自己的独立的 作用域（声明的变量可访问的范围）。

  ## 五、参数默认值、递归、预编译、暗示全局变量

### 参数默认值

函数形参 参数的默认值是 undefined。

```js
function test (a = 1, b) {
  console.log(a); // 1
  console.log(b); // 2
}

test(undefined, 2);
```



形参和实参，谁有值选谁。

```js
function test (a = undefined, b) {
  console.log(a); // 1
  console.log(b); // 2
}

test(1, 2);
```



ES5 赋默认值

```js
function test (a, b) {
  // var a = arguments[0] || 1,
  //     b = arguments[1] || 2;

  var a = typeof(arguments[0]) != 'undefined' ? arguments[0] : 1,
      b = typeof(arguments[1]) != 'undefined' ? arguments[1] : 2;

  console.log(a); // 2
  console.log(b); // 2
}

test(1);
```

### 递归

```js
// n的阶乘 递归 
// n! = n * (n-1) 规律
// 出口 
function fact (n) {
  if (n === 1) {
    return 1;
  }

  return n * fact(n - 1);
}
console.log(fact(5));
```

递归就是函数自己调用自己。性能不占优势，处理简单问题还是可以的。慎用。
递归走到出口后，再向上一步一步计算。
递归需要两个条件：规律和出口。




```js
// 斐波那契数列
// n3 = n2 + n1
// 出口：n <=2
function fb (n) {
  if (n <= 2) {
    return 1;
  }

  return fb(n - 1) + fb(n - 2);
}
console.log(fb(6));
```

### 预编译

 JavaScript 引擎

1.  通篇检查语法错误。如果出现语法错误，程序都不执行。
2.  解释一行，执行一行



```js
test();
function test () {
  console.log(1); // 2
}

console.log(a); // undefined
var a = 10;
```

函数声明是可以整体提升的。
变量只有声明提升，赋值是不提升的。

暗示全局变量 imply global variable

```js
a = 1; // 暗示全局变量
console.log(a); // 1

var a = 1;
console.log(a); // 1

// 在全局声明属性，写不写声明 var，都属于window对象。
// window是全局域，一切的全局变量都属于window。

console.log(a); // error
console.log(window.a); // undefined
```



```js
function test (a) {
  console.log(a); // function a () {}
  var a = 1;

  console.log(a); // 1
  function a () { }
  console.log(a); // 1

  var b = function () { }
  console.log(b); // function () { }

  function d () { }
}
test(2);
```

函数预编译就是在函数执行之前要执行的步骤。

AO：activation object 活跃对象，函数上下文：

1. 寻找函数的形参和变量声明（变量声明提升）
2. 实参的参数值赋值给形参
3. 寻找函数的函数声明和赋值函数体
4. 执行函数



```js
function test (a, b) {
  console.log(a); // 1
  c = 0;
  var c;
  a = 5;
  b = 6;
  console.log(b); // 6
  function b () {}
  function d () {}
  console.log(b); // 6
}

test(1);

AO = {
  a: undefined ->
    1,
  b: undefined -> 
    function b () {},
  c: undefined,
  d: function d () {}
}

// 预编译做过的事情就不会再次做
```



```js
var a = 1;

function a () {
  console.log(2);
}

console.log(a); // 1

GO = {
  a: undefined ->
     funcation a () {} ->
     1
}
```

GO global object 全局上下文

1. 寻找变量声明
2. 寻找函数声明
3. 执行

实际上 GO 就是 window.



案例分析：

```js
console.log(a, b); // function a () {}  undefined
function a () {}
var b = function () {}

GO = {
  a: undefined -> 
     function a () {},
  b: undefined
}
```

```js
function test () {
  var a = b = 1;
  console.log(b);
}

GO = {
  test: undefined ->
        function test () {},
  b: undefined 
     -> 1
}

AO = {
  a: undefined -> 
     1
}
```

```js
var b = 3;
console.log(a); // function a () {}
function a (a) {
  console.log(a); // function a () {}
  var a = 2;
  console.log(a); // 2
  function a () { }
  var b = 5;
  console.log(b); // 5
}
a(1);

GO = {
  b: undefined -> 
    ,
  a: undefined -> 
    function a () {} -> 
}

AO = {
  a: undefined ->
    1 ->
    function a () {} -> 
    2,
  b: 5
}
```

```js
a = 1;
function test () {
  console.log(a); // undefined
  a = 2;
  console.log(a); // 2
  var a = 3;
  console.log(a); // 3 
}
test();
var a;

GO = {
  a: undefined -> 
    1,
  test: undefined - >
        function test ()
}

AO = {
  a: undefined -> 
    2 -> 
    3,
}
```

```js
function test () {
  console.log(b); // undefined

  if (a) {
    var b = 2;
  }

  c = 3;
  console.log(c); // 3
}
var a;
test();
a = 1;
console.log(a); // 1

// if 语句内的声明也参加预编译过程。

GO = {
  a: undefined -> 
    1,
  test: function test(),
  c: undefined -> 
    3
}
AO = {
  b: undefined ->,
}
```

```js
function test () {
  return a;
  a = 1;
  function a () {}
  var a = 2;
}
console.log(test()); // functiona () {}

AO = {
  a: undefined ->
    function a () {},
}
```

```js
function test () { 
  a = 1;
  function a () { }
  var a = 2;
  return a;
}
console.log(test());

AO = {
  a: undefined -> 
    function a () {} ->
    1 -> ,
    2
}
```

```js
a = 1;
function test (e) { 
  function e () { }
  arguments[0] = 2;
  console.log(e); // 2
  if (a) {
    var b = 3;
  }
  var c;
  a = 4;
  var a;
  console.log(b); // undefined
  f = 5;
  console.log(c); // undefined 
  console.log(a); // 4
}
var a;
test(1);

GO = {
  a: undefined,
  test: function () {},
  f: 5
}

AO = {
  b: undefined -> ,
  c: undefined,
  a: undefined -> 
    4,
  e: 1 -> 
    function e () {} -> 
    2 -> 
}
```



题目：


```js
false + 1; // 1
false == 1; // false 

if (typeof(a) && (-true) + (+undefined) + '') {
  console.log('通过了'); // 通过了
} else {
  console.log('没通过');
}

if (1 + 5 * '3' === 16) {
  console.log('通过了'); // 通过了
} else {
  console.log('没通过');
}

console.log(!!' ' + !!'' - !!!false || '未通过'); // '未通过'
console.log(!!' ' + !!'' - !!false | '未通过'); // '1'

window.a || (window.a = '1');
console.log(window.a); // 1   () 优先级高
```

  ## 六、作用域、作用域链、预编译、闭包基础

为什么了解AO、GO？

为了解决作用域、作用域链相关所产生的一切问题。

作用域：利用 AO、GO 说明作用域和作用域链的问题

AO 与函数相关，函数存在独立的空间。

### 作用域、作用域链

什么是作用域？什么是作用域链？

函数也是一种对象类型，一种引用类型，一种引用值。

```js
function test () { }
test.name // test
test.length // 0 形参个数 
```

对象有些属性是我们无法访问的（JS引擎内部固有的隐式属性、内部的私有属性）。

`[[scope]]` 域

  1. 函数创建时，生成的一个JS内部的隐式属性（JS引擎读取） 
  2. 存储函数作用域链的容器，作用域链存储的就是AO、GO

      AO：函数的执行期上下文
      GO：全局的执行期上下文
      当函数执行完成以后，AO是要被销毁的。
      每一次函数执行时，会形成新的AO。
      AO是一个即时的存储容器。

      作用域链：把 AO、GO 形成链式从上到下排列起来，形成的链式关系。

当函数被定义时，系统生成 `[[scope]]` 属性，`[[scope]]` 保存当前函数的作用域链（Scope Chain）。
每一个函数被定义时，作用域链里包含 GO。AO 是函数执行前一刻形成的。自己的 AO 都存在作用域顶端。
每个函数都有自己的 AO 和 GO，AO 排在GO 的前面（上面）。 寻找变量，是自上而下寻找的。
当外层函数执行时，内层函数被定义。内层函数定义时作用域链和上层作用域链一致。



页面打开的时候，全局在执行，全局执行的前一刻生成GO。
此时函数声明已经被定义。全局执行的时候，函数表达式被定义。
当函数被定义的时候，已经形成作用域和作用域链，作用域链已经存在GO。函数执行前一刻生成AO。

函数的 `[[scope]]` 存储的就是当前函数的作用域链。
函数执行完毕，函数的AO销毁，下一次执行时，生成新的AO对象。

```js
function a () {
  function b () {
    function c () {

    }
    c();
  }
  b();
}
a();

a定义  a.[[scope]] -> 0: GO
a执行  a.[[scope]] -> 0: a  AO
                      1: GO

    b定义 b.[[scope]] -> 0: a  AO
                      1: GO
    b执行 b.[[scope]] -> 0: b AO
                         1: a AO
                         2: GO

        c定义 c.[[scope]] -> 0: b AO
                             1: a AO
                             2: GO
        c执行 c.[[scope]] -> 0: c AO
                             1: b AO
                             2: a AO
                             3: GO

        c结束 c.[[scope]] -> 0: b AO
                             1: a AO
                             2: GO
    
    b结束：b.[[scope]] -> 0: a  AO
                          1: GO

a结束：a.[[scope]] -> 0: GO
```

### 闭包

```js
function test1 () {
  function test2 () {
    var b =2;
    console.log(a);
  }
  var a = 1;
  return test2();
}
var c = 3;
var test3 = test1();
test3();
```

当内部函数被返回到外部被保存时，一定会产生闭包。
闭包会导致外层函数的作用域链不被释放。
过度的闭包可能会导致内存泄漏或加载过慢。

闭包可以用来做数据缓存。

```js
function breadMgr (num) {
  var breadNum = arguments[0] || 10;

  function supply () {
    breadNum += 10;
    console.log(breadNum);
  }

  function sale () {
    breadNum--;
    console.log(breadNum);
  }

  return {
    supply,
    sale
  }
}

var bm = breadMgr(50);

bm.supply();
bm.supply();
bm.sale();
bm.sale();
bm.sale();
```

  ## 七、立即执行函数、闭包深入、逗号运算符

立即执行函数。IIFE - immpediately-invoked function expression

立即执行函数也叫做初始化函数。

页面加载，自动执行，执行完成以后立即释放（销毁）。



两种写法：

```js
// 1. 使用比较多
(function () {

})();

// 2. W3C 建议写法
(function () {

}());
```


常见用法：

```js
// 执行
(function () {
  var a = 1,
      b = 2;

  console.log(a + b);
})();

// 带参数
(function (a, b) {
  console.log(a + b);
})(1, 2);

// 返回值
var num = (function (a, b) {
  return a + b;
})(2, 4);
console.log(num);
```

拓展：

```js
(function () {}) // 表达式
// （）包裹任何东西，都是表达式，都能转换为表达式。

fuction test () {
  // 语法错误，报错
}();

var test = function () {
 // 可以执行，立即执行，执行立即销毁，返回的值还存在。
}();

(function test () {
  // 可以执行，
})();

// 一定是表达式才能被执行符号执行。
// 把函数声明转为表达式，函数的名称将被忽略。

+ function test () { }();
- function test () { }();
! function test () { }();
1 && function test () { }();
0 && function test () { }();

// 可以用 + - ! && || 等运算符把函数声明变为表达式，从而可以让函数立即执行。
// 把函数声明转为表达式后，就可以使用执行符号，变为表达式的函数声明的名称自动忽略。
```



题目：

```js
function test (a) {
  console.log(111);
}(6, 3);

// 不报错 JS引擎针对执行符号内传参解析为表达式解析，但是函数不执行。返回3。
```

```js
var num = (2 - 1, 6 + 5);
console.log(11); // 逗号运算符默认返回最后一位
```

```js
function test () {
  var arr = [];

  for (var i = 0; i < 10; i++) {
    arr[i] = function () {
      document.write(i + ' ');
    };
  }

  return arr;
}

var arr = test();
arr[0](); // 10
arr[1](); // 10

// 产生闭包，return的arr，存有test函数的AO，AO内的i变量已经变成10。
// 可以使用立即执行函数解决此问题。

function test () {
  var arr = [];

  for (var i = 0; i < 10; i++) {
    (function (j) {
      arr[j] = function () {
        document.write(j + ' ');
      };
    })(i);
  }

  return arr;
}

var arr = test();
arr[0]();
arr[1]();
arr[2]();
```


```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>

<script>
  var oLi = document.querySelectorAll('li');

  for (var i = 0; i < oLi.length; i++) {
    (function (j) {
      oLi[j].onclick = function () {
        console.log(j);
      }
    })(i);
  }
</script>
```


```js
var fn = (
  function test1 () {
    return 1;
  },
  function test2 () {
    return 2;
  }
)();
console.log(typeof(fn)); // number
```

```js
var a = 10;
if (function b () {}) {
  a += typeof(b); // 函数声明转为表达式，函数名称忽略。
}
console.log(a); // 10undefined
```

  ## 八、闭包高级、对象、构造函数、实例化

函数被定义时（前一刻），作用域和作用域链形成。

```js
var teacher = {
  name: '张三',
  age: 32,
  sex: 'mal',
  height: 170,
  weight: 130,
  teach: function () {
    console.log('I am teaching JavaScript.');
  },
  smoke: function () {
    console.log('I am smoking.');
  },
  eat: function () {
    console.log('I am having dinner.');
  }
}

teacher.name = '李四';

// 这种声明对象的方式叫做对象字面量或对象直接量.

// 对象里的函数一般叫做方法。以对象为基准的函数，叫做方法。
// 对象中，this代表其本身。
```

```js
var attendace = {
  students: [],
  total: 6,
  join: function (name) {
    this.students.push(name);
    if (this.students.length === this.total) {
      console.log(name +  '到课, 学生已到齐.');
      return;
    }
    console.log(name +  '到课, 学生未到齐.');
  },
  leave: function (name) {
    var idx = this.students.indexOf(name);
    if (idx !== -1) {
      this.students.splice(idx, 1);
    }
    console.log(name + '早退');
    console.log(this.students);
  },
  classOver: function () {
    this.students = [];
    console.log('已下课');
  }
}

attendace.join('杨一');
attendace.join('张三');
attendace.join('李四');
attendace.join('王五');
attendace.join('赵六');
attendace.join('孙七');
attendace.leave('李四');
attendace.classOver();
```



创建对象方法：

 **1. 系统自带的构造函数  Object构造函数**

```js
var obj = new Object();
obj.name = '张三';
obj.sex = '男士';

console.log(obj);

// 对象和构造函数不是一回事, 对象是通过实例化构造函数而构造的对象实例.
```

**2. 对象字面量**

```js
var obj = {
  name: '张三',
  sex: '男士'
}
```

**3. 自定义构造函数**

基本上写任何JavaScript对象, 基本都要使用自定义构造函数。

命名函数使用大驼峰命名法. 以区分普通函数.

```js
function Teacher () {
  this.name = '张三';
  this.sex = '男士';
  this.smoke = function () {
    console.log('I am smoking.');
  }
}

// 没有执行前, this不存在. 构造函数.

var teacher = new Teacher();
console.log(teacher);

// new 的使用, this 指向才存在.

var teacher1 = new Teacher();
teacher1.name = '李四';
console.log(teacher1); // name='李四'
var teacher2 = new Teacher();
console.log(teacher2); // name = '张三'

// 构造函数实例化出来的两个对象是不同的对象.修改一个对象的name, 不会影响其他的对象.
// 实例化两次 构造出来的对象 是不同的两个对象, 修改一个对象对另外一个对象没有影响.复用性比较高.
```




```js
function Teacher (name, sex, weight, course) {
  this.name = name;
  this.sex = sex;
  this.weight = weight;
  this.course = course;

  this.smoke = function () {
    this.weight--;
    console.log(this.weight);
  }

  this.eat = function () {
    this.weight++;
    console.log(this.weight);
  }
}

var t1 = new Teacher('张三', '男', 145, 'JavaScript');
var t2 = new Teacher('李四', '女', 90, 'HTML');
console.log(t1);
console.log(t2);
```

参数配置

```js
function Teacher (opt) {
  this.name = opt.name;
  this.sex = opt.sex;
  this.weight = opt.weight;
  this.course = opt.course;

  this.smoke = function () {
    this.weight--;
    console.log(this.weight);
  }

  this.eat = function () {
    this.weight++;
    console.log(this.weight);
  }
}

var t1 = new Teacher({
  name: '张三',
  age: '男',
  weight: 145,
  course: 'JavaScript'
});
var t2 = new Teacher({
  name: '李四',
  age: '女',
  weight: 90,
  course: 'HTML'
});
console.log(t1);
console.log(t2);
```

  ## 九、构造函数及实例化原理、包装类

### 构造函数

```js
function Car (color, brand) {
  this.color = color;
  this.brand = brand;
  this.drive = function () {
    console.log('I am running.');
  }
}

var car = new Car('red', 'Mazda');
console.log(car.color);
console.log(car.brand);
car.drive();
```

如果不实例化 Car 或者没有执行 Car, this 不存在。
一旦执行或者实例化，this 就存在了。实例化构造函数 this 指向实例化的对象。
this 指向的是实例化出来的对象实例。不指向构造函数本身。

```js
// 构造函数中的this

GO = {
  Car: function Car () {}
  car1: {
    color: 'red',
    brand: 'Benz'
	}
}

function Car (name, brand) {
  // AO
  // this = {
  //   color: color,
  //   brand: brand
  // }

  this.color = color;
  this.brand = brand;

  // return this; 隐式添加return this.
}

var car = new Car('red', 'Benz');

// 实例化时，产生 AO，AO 里面存在 this 对象。构造完成，隐式 return this 对象。
// new 关键字，改变 this 指向，生成 this 对象，并且隐式返回 this 对象。
```



```js
function Car () {
  this.color = 'red';

  return {};
}
var car = new Car();
console.log(car.red); // undefined

// 实例化构造函数时，手动返回一个引用值时，会覆盖默认的this对象，返回原始值，没有影响。
```

### 包装类

```js
var a = 1,
    b = 'abc';

// 原始值没有自己的方法和属性。

var a = 1; // 原始值

// 数字不一定是原始值。

var b = new Number(a); 
b.length = 2;
b.add = function () {}

// Number是内置的构造函数，new Number是实例化出一个number对象。
// 可以向对象上添加属性和方法。

a + b // 2

// number对象和原始值运算，可以正常运行，会作为原始值进行计算。

// 系统内置构造函数有3种：new Number、new String、new Boolen。

var test = new Number(undefined); // NaN
var test = new Number(null); // 0

// undefined和null无法设置任何的方法和属性。

// JS包装类
var a = 123;
a.len = 3; // new Number(123).len = 3; delete 
console.log(a.len); // undefined 

var b = new Number(123);
b.len = 3;
console.log(b.len); // 3

// 原始值没有属性和方法，不能添加属性和方法。
// 向number类型上添加属性和方法， 首先会转化为Number对象，因为无法赋值，所以又删掉对象，转为原始值。
// 打印出来的结果就是undefined。

var str = 'abc';
console.log(str.length); // 3 new String(str).length

// 在string类型上返回长度，会经过String构造函数包装，然后获取到length属性。
```



数组的截断方法（length属性赋值截断）

```js
var arr = [1, 2, 3, 4, 5];
console.log(arr.length); // 5
console.log(arr.length); // [1, 2, 3, 4, 5]
arr.length = 3;
console.log(arr.length); // [1, 2, 3]
```

string是否能截断？

```js
var str  = 'abc';
str.length = 1; // new String(str).length = 1; 无法保存 delete
console.log(str); // abc 
```



题目：

```js
var name = 'yueluo';

name += 10; // yuelu10

var type = typeof(name); // 'string'

if (type.length === 6) { // true
  type.text = 'string'; // new String(type).text = 'string' -> delete
}

console.log(type.text); // undefined
```


```js
function Car (brand, color) {
  this.brand = 'Benz';
  this.color = 'red';
}
var car = new Car('Mazda', 'blank');
console.log(car.brand, car.color); // Bena red
```

```js
function Test (a, b, c) {
  var d = 1;
  this.a = a;
  this.b = b;
  this.c = c;

  function f () {
    d++;
    console.log(d);
  }

  this.g = f;
}
var test = new Test();
test.g(); // 2
test.g(); // 3
var test2 = new Test();
test2.g(); // 2
```


```js
var x = 1,
    y = z = 0;
function add (n) {
  return n = n + 1;
}      
y = add(x);
function add (n) {
  return n = n + 3;
}
z = add(x);
console.log(x, y, z); // 1 4 4

// 预编译 add 方法覆盖上面的 add 方法
```


```js
function foo1 (x) {
  console.log(arguments); // Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  return x;
}
foo1(1, 2, 3, 4, 5);

function foo2 (x) {
  console.log(arguments); // 不执行，无返回值
  return x;
}(1, 2, 3, 4, 5);

(funtion foo3 (x) {
  console.log(arguments); // Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  return x;
})(1, 2, 3, 4, 5); 
```


```js
function b (x, y, a) {
  a = 10;
  console.log(arguments[2]); // 10
}
b(1, 2, 3);
```

```js
function b (x, y, a) {
  arguments[2] = 10;
  console.log(a); // 10
}
b(1, 2, 3);
```



ASCII码

表1 0-127
表2 128-255

ASCII 码里面的字符都是一个字节 byte

UNICODE 码 涵盖 ASCII 码 256位之后是两个字节

```js
var str = 'a',
    pos = str.charCodeAt(0);
console.log(pos); // 97

// a 97 
// b 98
```



写一个函数，累加实参


```js
function Computed () {
  var args = arguments,
      res;

  this.plus = function () {
    res = 0;
    loop('add', res);
  }

  this.times = function () {
    res = 1;
    loop('mul', res);
  }

  function loop (method, res) {
    for (var i = 0; i < args.length; i++) {
      var item = args[i];

      switch (method) {
        case 'add':
          res += item;
          break;
        case 'mul':
          res *= item;
          break;
      }

    }

    console.log(res);
  }
}

var compute = new Computed(2, 4, 6);
compute.plus();
compute.times();
```

  ## 九、原型、原型链、闭包立即执行函数、插件开发

### 原型、原型链

```js
function Phone (color, brand) {
  this.color = color;
  this.brand = brand;
  this.screen = '18:9';
  this.system = 'Android';
}

Phone.prototype.rom = '64g';
Phone.prototype.ram = '6g';
Phone.prototype.screen = '15:9';
```

Phone.prototype 是一个对象。
原型 prototype 其实是 function 对象的一个属性，属性值是一个对象。



```js
var phone1 = new Phone('red', '小米');
var phone2 = new Phone('black', '华为');

console.log(phone1, phone2);
console.log(phone1.rom, phone2.ram); // 64g 6g
console.log(phone1.screen, phone2.screen); // 18:9 18:9
```

prototype 其实是定义构造函数构造出的每个对象的公共祖先。
所以被该构造函数构造出来的对象，都可以继承原型上的属性和方法。
构造出来的对象自己本身有的属性，不会再去原型上寻找属性。

某些固定的属性和方法可以写在原型上，不用重复创建。

通过实例化对象只能查找 prototype 上的属性，不能进行增删改操作。




```js
function Phone (color, brand, system) {
  this.color = color;
  this.brand = brand;
  this.system = system;
}
var phone = new Phone('black', 'iPhone', 'IOS');

console.log(phone);
console.log(phone.constructor);
console.log(Phone.prototype);
```

Phone.prototype 上的 constructor 对象指向构造函数本身。
可以通过 Phone.prototype 的对象手动修改 constructor 的值。




```js
function Car () {

}
Car.prototype.name = 'Benz';
var car = new Car();
console.log(car);
```

prototype 是实例化以后的结果。



    function Car () {
      var this = {
        __proto__: Car.prototype
      }
    }
    Car.prototype.name = 'Benz';
    
    var car = new Car();
    console.log(car);
    console.log(car.name);
    console.log(car.__proto__);


​    

`__proto__` 属于每个实例化对象
原型属于实例化对象，不属于某一个构造函数。

`__proto__` 内置属性写法，`__proto__`  就是一个键名，键值是 prototype。

当构造函数被实例化的时候，产生 this 对象，this 里面默认存在 `__proto__`，键值是 prototype。

`__proto__` 是可以被修改的，可以手动指定为别的对象。




```js
function Car () { }
Car.prototype.name = 'Mazda';
var car = new Car();
Car.prototype.name = 'Benz';
console.log(car.name); // Benz
```


​        
```js
Car.prototype.name = 'Mazda';
function Car () { }
var car = new Car();
Car.prototype = {
  name: 'Benz'
};
console.log(car.name); // Mazda
```

prototype 是实例化对象的，实例化后重新修改 prototype，不会影响原来的值。

constructor 里面保存的是之前的值，实例化之后会生成 `__proto__`，保存prototype。

实例化前：

```
Car.prototype.constructor -> Car() -> prototype -> name: 'Bena'
```

实例化后：

```js
function Car () {
  this {
    __proto__: Car.prototype {
      name: 'Benz'
    }
  }
}
```

### 闭包、立即执行函数

window 和 return 的问题

```js
function test () {
  var a = 1;

  function plus () {
    a++;
    console.log(a);
  }

  return plus;
}

var plus = test(); // plus成为全局函数
plus(); // 2
plus(); // 3
plus(); // 4
```

```js
function abc () {
  window.a = 3;
}
abc();
console.log(a); // 3
```

```js
function test () {
  var a = 1;

  function add () {
    a++;
    console.log(a);
  }

  window.add = add;
}
test();
add(); // 2
add(); // 3
add(); // 4
```

```js
(function () {
  var a = 1;

  function add () {
    a++;
    console.log(a);
  }

  window.add = add;
})();
add(); // 2
add(); // 3
add(); // 4
```

### js 插件写法


```js
;(function () {
  function Test () {

  }

  window.Test = Test();
})();
```

可以限制作用域范围。

```js
;(function () {})()
;(function () {})()
```

立即执行函数前面最好加分号，如果不加分号，写在一起会报错。

  ## 十、原型与原型链深入、对象继承

```js
// 获取字节数
function getBytes (str) {
  var len = str.length,
      bytes = len,
      pos;

  for (var i = 0; i < len; i++) {
    pos = str.charCodeAt(i);

    if (pos > 255) {
      bytes++;
    }
  }

  return bytes;
}
```



原型与原型链

实例化出来的对象所保存的 `__proto__` 是prototype。
每一个对象的原型本身都有原型，`__proto__`。
所有的对象都有原型，包括原型本身。



```js
Professor.prototype.tSkill = 'JAVA';
function Professor () { }
var professor = new Professor();

Teacher.prototype = professor;
function Teacher () {
  this.mSkill = 'JS/JQ';
}
var teacher = new Teacher();

Student.prototype = teacher;
function Student () {
  this.pSkill = 'HTML/CSS';
}

var student = new Student();
console.log(student);
```

沿着 `__proto__` 去找原型里的属性，一层层的去继承原型属性的链条，就叫做原型链。

原型链最重要的属性就是`__proto__`。原型链顶端是 Object.prototype。



```js
Professor.prototype.tSkill = 'JAVA';
function Professor () { }
var professor = new Professor();

Teacher.prototype = professor;
function Teacher () {
  this.mSkill = 'JS/JQ';
  this.success = {
    alibaba: 28,
    tencent: 30
  }
}
var teacher = new Teacher();

Student.prototype = teacher;
function Student () {
  this.pSkill = 'HTML/CSS';
}

var student = new Student();
console.log(student);
student.success.baidu = 100;
console.log(teacher, student);
```

原型链上的增删改只能是本身增删改。（不是绝对的，引用值可以操作。）



```js
Professor.prototype.tSkill = 'JAVA';
function Professor () { }
var professor = new Professor();

Teacher.prototype = professor;
function Teacher () {
  this.mSkill = 'JS/JQ';
  this.students = 500;
}
var teacher = new Teacher();

Student.prototype = teacher;
function Student () {
  this.pSkill = 'HTML/CSS';
}

var student = new Student();
student.students++;
console.log(student, teacher);
```

原始值字类修改，不会影响父级属性。会在当前对象上新增属性，并作相应处理。

`student.students++` => `student.students`（新增属性） = `student.students`（原型上属性） + 1;



```js
function Car () {
  this.brand = 'Benz';
}
Car.prototype = {
  brand: 'Mazda',
  intro: function () {
    console.log('我是' + this.brand + '车');
  }
}
var car = new Car();
car.intro(); // 我是Benz车
Car.prototype.intro(); // 我是Mazda车
```



```js
// 1.
var obj = {};
console.log(obj);

// 2. 
var obj2 = new Object(); // 一般公司不使用这种方法
console.log(obj);

// 两种都是创建对象的方法，原型都是Object.prototype。
```



```js
function Obj () { }
var obj = new Obj();
console.log(obj);

// 自定义构造函数构造出来的对象，原型指向自定义的构造函数。

// Object.create(对象 || null) 创建对象
function Obj () {}
Obj.prototype.num = 1;
var obj = Object.create(Obj.prototype);
var obj2 = new Obj();
console.log(obj, obj2);

// 两种实例化的方法产生的效果是一样的。
// Object.create 提供自定义原型的功能。
```



```js
var obj2 = new Obj();

/// 实例化对象
// 调用构造函数的初始化属性和方法
// 指定实例对象的原型属性

var obj = Object.create(null);
// 构造出来的是纯粹的空对象，原型上什么都没有。

// 可以用 Object.create 方法继承自定义原型。
```



```js
var obj = Object.create(null);
obj.num = 1;
// obj.toString(); obj.toString is not a function
console.log(obj);        
// 不是所有的对象都继承 Object.prototype。
```



```js
var obj = Object.create(null);
obj.num = 1;
console.log(obj);
var obj1 = {
  count: 2
}
obj.__proto__ = obj1;
console.log(obj);
console.log(obj.count); // undefined

// 系统内置的__proto__颜色是浅色的.
// 自己创建的__proto__属性是没有作用的，可以更改__proto__，但是不能使用。
```

```js
// undefined 和 null 可以使用 toString() 嘛？

// undefined和null都没有toString方法。
// unfefined和null不能经过包装类转换，是原始值。
```

```js
var num = 1;
num.toString(); // '1'  包装类转换  new Number(num).toString()

var num = 1;
var obj = {};
vao obj2 = Object.create(null);
document.write(num); // 1
document.write(obj); // [object Object]
document.write(obj2); // connot covert object to primitive  value 不能转换为原始值

// document.write 使用需要经过隐式类型转换，将要打印的内容转换为 string 类型。
```

```js
// 方法的重写 toString方法的重写

console.log(Object.prototype);
console.log(String.prototype);
console.log(Array.prototype);

Object.prototype.toString // 打印的是数据的类型
Number.prototype.toString // 打印的的是数据的值
```



```js
// call/apply 对象继承

function test () {
  console.log('a');
}

test(); // 隐式添加.call()方法 -> test.call()

function Car (brand, color) {
  this.brand = brand;
  this.color = color;
}
var newCar = { };
Car.call(newCar, 'Benz', 'red');

console.log(newCar); // {brand: "Benz", color: "red"}
Car.apply(newCar, ['Benz', 'black']); 
console.log(newCar); // {brand: "Benz", color: "black"}
```



案例


```js

function Compute () {
  this.plus = function (a, b) {
    console.log(a + b);
  }

  this.minus = function (a, b) {
    console.log(a - b);
  }
}

function FullCompute () {
  Compute.apply(this, []);

  this.mul = function (a, b) {
    console.log(a * b);
  }

  this.div = function (a, b) {js
  console.log(a / b);
                             }
}

var compute = new FullCompute();

compute.plus(1, 2);
compute.minus(1, 2);
compute.mul(1, 2);
compute.div(1, 2);

// 可以使用 apply 或 call 借用之前已经存在方法。
```

  ## 十一、继承深入、call_apply、圣杯模式、模块化

插件基本写法

```js
;(function () {
  var Compute = function () {  }

  Compute.prototype = {
    plus: function (a, b) {
      return a + b;
    },
    minus: function (a, b) {
      return a - b;

    },
    mul: function (a, b) {
      return a * b;
    },
    div: function (a, b) { 
      return a / b;
    }
  }

  window.Compute = Compute;
})();

var compute = new Compute();

var res = compute.div(10, 5);
console.log(res);
```



原型是在构造函数之上的属性。构造函数实例化之后会继承 prototype。

实例化出来的对象继承 prototype 属性，存在于原型链上。



原型 -> 继承

```js
Professor.prototype = {
  name: 'Mr. Zhang',
  tSkill: 'JAVA'
}
function Professor () { }

var professor = new Professor();

Teacher.prototype = professor;
function Teacher () {
  this.name = 'Mr. Wang';
  this.mSkill = 'JS/JQ';
}

var teacher = new Teacher();

Student.prototype = teacher;
function Student () {
  this.name = 'Mr. Li';
  this.pSkill = 'HTML/CSS';
}
var student = new Student();

console.log(student);
```

student 没必要继承校长的名称，原型链并不是很友好。
call/apply 改变 this 指向，参数不同。



```js
function Teacher (name, mSkill) {
  this.name = name;
  this.mSkill = mSkill;
}

function Student (name, mSkill, age, major) {
  Teacher.apply(this, [name, mSkill]);
  this.age = age;
  this.major = major;
}

var student = new Student(
  'Mr. Zhang',
  'JS/JQ',
  18,
  'Computer'
);
console.log(student);
```

  这种方法无法访问 Teacher 的原型属性。想借用别的属性和方法时，可以使用这种方法。



```js
function Teacher () {
  this.name = 'Mr. Li';
  this.tSkill = 'JAVA';
}

Teacher.prototype = {
  pSkill: 'JS/JQ'
}

var teacher = new Teacher();

function Student () {
  this.name = 'Mr. Wang';
}

Student.prototype = Teacher.prototype;
Student.prototype.age = 18;

var student = new Student();
console.log(student);
```

公共原型（Teacher.protytype）被更改，这样也不合理。



解决继承的企业级的方法：圣杯模式。圣杯模式中，把 buffer 叫做圣杯。

```js
function Teacher () {
  this.name = 'Mr. Li';
  this.tSkill = 'JAVA';
}

Teacher.prototype = {
  pSkill: 'JS/JQ'
}

var teacher = new Teacher();

function Student () {
  this.name = 'Mr. Wang';
}

function Buffer () { }
Buffer.prototype = Teacher.prototype;
var buffer = new Buffer();
Student.prototype = buffer;

var student = new Student();
console.log(student);

// buffer 空对象的原型指向 teacher 的 prototype，
// 再将实例化后的对象赋值给 student 的 prototye。
```



JS 继承 圣杯模式 封装实现


```js
/**
  * 
  * @param {*} Target 继承方 
  * @param {*} Origin 被继承方
  */
function inherit (Target, Origin) {
  function Buffer() {}
  Buffer.prototype = Origin.prototype;
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target; // 还原构造器
  Target.prototype.super_class = Origin; // 设置继承源
}

Teacher.prototype = {
  skill: 'JS/JQ'
};
function Teacher () {}
function Student () {}
inherit(Student, Teacher);
var student = new Student();
console.log(student);
```

第二种封装方式 模块化开发的一种形式

```js
var inherit =  (function () {
  var Buffer = function () {}
  return function (Target, Origin) {
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer();
    Target.prototype.constructor = Target;
    Target.prototype.super_class = Origin;
  }
})();
inherit(Student, Teacher);

```



模块化开发案例


```js
var inherit =  (function () {
  var Buffer = function () {}
  return function (Target, Origin) {
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer();
    Target.prototype.constructor = Target;
    Target.prototype.super_class = Origin;
  }
})();
```


```js
var initProgrammer = (function () {
  var Programmer = function () {}
  Programmer.prototype = {
    name: '程序员',
    tool: '计算机',
    work: '编写应用程序',
    duration: '10个小时',
    say: function () {
      console.log(
        '我是一名' + this.myName + this.name + '，我的工作是用' + 
        this.tool + this.work + '，我每天工作' + this.duration + 
        '，我的工作需要用到' + this.lang.toString() + '。'
      );
    }
  }

  function FrontEnd () {}
  function BackEnd () {}

  inherit(FrontEnd, Programmer);
  inherit(BackEnd, Programmer);

  FrontEnd.prototype.lang = ['HTML', 'CSS', 'JavaScript'];
  FrontEnd.prototype.myName = '前端';

  BackEnd.prototype.lang = ['Node', 'Java', 'SQL'];
  BackEnd.prototype.myName = '后端';

  return {
    FrontEnd: FrontEnd,
    BackEnd: BackEnd
  }
})();

var frontEnd = new initProgrammer.FrontEnd();
var backEnd = new initProgrammer.BackEnd();
frontEnd.say();
backEnd.say();
```

  ## 十二、对象属性遍历、this、caller_callee

```js
function Car (brand, color, displacement) {
  this.brand = brand;
  this.color = color;
  this.displacement = displacement;
  this.info = function () {
    return '排量为' + this.displacement + '的' + this.color + this.brand;
  }
}

function Person (opt) {
  Car.apply(this, [opt.brand, opt.color, opt.displacement])

  this.name = opt.name;
  this.age = opt.age;
  this.say = function () {
    console.log('年龄' + this.age + '岁，姓名' + this.name + '，买了一辆' + this.info() + '。');
  }
}

var person = new Person({
  brand: '奔驰',
  color: '红色',
  displacement: '3.0',
  name: '张三',
  age: 25
});

person.say();
```



this 链式调用

```js
var sched = {
  wakeup: function () {
    console.log('Running');
    return this;
  },
  morning: function () {
    console.log('Going shopping');
    return this;
  },
  noon: function () {
    console.log('Having a rest');
    return this;
  },
  afternoon: function () {
    console.log('Studying');
    return this;
  },
  evening: function () {
    console.log('Walking');
    return this;
  },
  night: function () {
    console.log('Sleeping');
    return this;
  }
}

sched.wakeup()
  .afternoon()
  .night();
```



> 最早的 JS 引擎，对象是没有 . 语法的，都是 `obj['属性']`。obj.name -> obj['name'] 浏览器都是这样做的



对象枚举

枚举 -> 遍历，遍历：在一组数据中按顺序一个一个获取其信息的过程

```js
var person = {
  name: 'yang',
  age: 22,
  height: 172
}

for (var key in person) {
  // person.key -> person['key'] -> undefined
  // console.log(person.key); // undefined
  console.log(person[key]);
}
```

可以使用 for in 来遍历对象， 也可以使用for in来遍历数据。

```js
let arr = [1, 2, 3, 4, 5];
for (var key in arr) {
  console.log(key);
}
```



hasOwnProperty 

```js
var person = {
  name: 'yang',
  age: 22
}

console.log(person.hasOwnProperty(person.name)); // false
console.log(person.hasOwnProperty('name')); // true

// 可以使用 hasOwnPropert 判断是不是本身属性，遍历时不打印原型上的属性。
```


```js
function Car () {
  this.brand = 'Benz';
  this.color = 'red';
  this.displacement = '3.0';
}

Car.prototype = {
  lang: 5,
  width: 2.5
}

var  car = new Car();

for (var key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

in关键字：可以使用in关键字判断是不是对象属性

```js
var person = {
  name: 'yang',
  age: 22
}

console.log('name' in person); // true
console.log('major' in person); // false

function Car () {
  this.brand = 'Benz';
  this.color = 'red';
}

Car.prototype = {
  displacement: '3.0'
}

var car = new Car();
console.log('displacement' in car); // true

// in关键字也会获取原型上的属性
```



instanceof  判断对象是不是该构造函数实例化出来的

```js
function Car () {}
var car = new Car();
console.log(car instanceof Car); // true
function Person () {}
var person = new Person();
console.log(car instanceof Person); // false

console.log(car instanceof Object); // true
console.log(person instanceof Object); // true
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log({} instanceof Object); // true

// 所有对象都是由 Object 构造出来的
// A 对象里的原型有没有构造函数的原型。
// 原型链上只要是重合的，都是 true.
```



判断是不是数组

```js
var a = [] || {};

console.log(a.constructor); // ƒ Array() { [native code] }
console.log(a instanceof Array); // true
console.log(Object.prototype.toString.call(a)); // [object Array]
```



this 指向

没有实例化的函数内部的this指向默认是指向window的.

```js
function Test () {
  // var this = {
  //  __proto__: Test.prototype 
  // }
  this.name = '123';
}
var test = new Test();

AO = {
  this: window -> 
  {
    __proto_: Test.prototype,
    name: '123'
  }
}
GO = {
  Test: function Test () {}
  test: {} 
}
```

call/apply 改变 this 指向

```js
function Person (name, age) {
  this.name = name;
  this.age = age;
}

function Programmer (name, age) {
  Person.apply(this, [name, age]);
  this.work = 'Programming';
}

var p = new Prpgrammer('张三', 18);
console.log(p);
```

全局 this 指向 window
预编译函数 this -> window
call/apply 改变 this 指向
构造函数的 this 指向指向实例化对象



callee/caller：

```js
function test (a, b, c) {
  console.log(arguments.callee); // 返回正在执行的函数对象
  console.log(arguments.callee.length); // 返回正在执行的函数对象形参的长度 3
  console.log(test.length); // 返回函数的形参的长度 3
  console.log(arguments.length); // 返回执行函数的实参的长度 0
}
test();
test(1, 2, 3);
```

callee 的应用场景：


```js
function sum (n) {
  if (n <= 1) {
    return 1;
  }
  return n + sum(n - 1);
}
console.log(sum(100));



var sum = (function (n) {
  if (n <= 1) {
    return 1;
  }

  return n + arguments.callee(n - 1);
});
console.log(sum(100));
```

caller

可以通过 caller 获取调用当前函数的引用,
谁调用了当前函数就返回那个函数. 当前函数必须执行

```js
function test1 () {
  test2();
}
function test2 () {
  console.log(test2.caller);
}
test1();
```



题目

```js
function foo () {
  bar.apply(null, arguments);
}
function bar () {
  console.log(arguments); // [1 2 3 4 5]
}

foo(1, 2, 3, 4, 5);
```

```js
function b (x, y, a) {
  arguments[2] = 10;
  alert(a); // 10
}
b(1, 2, 3);
```

```js
function b (x, y, a) {
  a = 10;
  alert(arguments[2]); // 10
}
b(1, 2, 3);
```

```js
var f = (
  function f () {
    return '1';
  },
  function g () {
    return '2';
  }
);
console.log(typeof(f)); // function
```

```js
var f = (
  function f () {
    return '1';
  },
  function g () {
    return 2;
  }
)();
console.log(typeof(f)); // number 字符串类型的number
```



JS 的 typeof 可能返回的值有哪些?

```
string object boolean number function undefined

object 包含 null 类型
```



 ```js
 undefined == null  // true
 undefined === null // false
 isNaN('100') // false 
 parseInt('1a') == 1 // true
 
 // isNaN判断是不是非数, 遇到字符串类型数字, 首先会隐式类型转换.
 // isNaN('100')  -> Number('100') -> 100 -> 100不是非数 -> false
 ```

```js
{} == {} // false
// 引用值对比的是地址, 存在不同的空间      
var obj = {},
    obj1;
obj1 = obj;
obj1 === obj // true   
```



```js
var a = '1';
function test () {
  var a = '2';
  this.a = '3';
  console.log(a);
}
test(); // 2
new test(); // 2 
console.log(a); // 3 
```




```js
var a = 5;
function test () {
  a = 0;
  console.log(a);
  console.log(this.a);
  var a;
  console.log(a);
}
test(); // 0 5 0  没有实例化 this指向window
new test(); // 0 undefined 0 实例化后,this对象并没有a属性
```

  ## 十三、三目运算、对象克隆、浅拷贝、深拷贝

模块化开发示例

```js
window.onload = function () {
  init();
}

function init () {
  console.log(initFb(10));
  console.log(initDiv(100));
}

var initFb = (function () {
  function fb (n) {
    if (n <= 0) {
      return 0;
    }

    if (n <= 2) {
      return 1;
    }

    return fb(n - 1) + fb(n - 2);
  }

  return fb;
})();

```

```js
var initDiv = (function () {
  function div (n) {
    var arr = [];

    for (var i = 0; i <= n; i++) {
      if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
        arr.push(i);
      }
    }

    return arr;
  }

  return div;
})();
```



插件标准写法

```js
;(function () {
  var Test = function () {

  }

  Test.prototype = {

  }

  window.Test = Test;
})();
```



三目运算符（三元运算符）

```js
? :

a > 0 ? console.log('大于0')
      : console.log('小于等于0');

// 三目运算符是一条语句

var str = a > 0  ? console.log('大于0')
                  : console.log('小于等于0');

var str = a > 0 ? (
                    a > 3 ? '大于3' 
                          : '小于等于3'
                  )
                : '小于等于0';
```



题目：

```js
  var str = 89 > 9 ? (
                        '89' > '9' ? '通过了' 
                                  : '内层未通过'                   
                    )
                  : '外层未通过';
  console.log(str); // 内层未通过

```
字符串对比从第一位开始，比对 ASCII 码。存在一个数字类型才会进行隐式类型转换。




对象克隆（浅拷贝、深拷贝）

```js
var person = {
  name: '张三',
  age: 18,
  sex: 'male',
  height: 180,
  weight: 140
}

var person2 = person;
person2.name = '李四';

console.log(person, person2);

// 两个变量指向同一个内存地址。

// 解决方案：遍历属性 + 递归处理
```

```js
var person = {
  name: '张三',
  age: 18,
  sex: 'male',
  height: 180,
  weight: 140,
  son: {
    first: {
      name: 'Jenney'
    },
    second: {
      name: 'Lucy'
    },
    third: {
      name: 'Jone'
    }
  }
}

var person2 = clone(person);

person2.name = '李四';
person2.son.first = 'yueluo';
console.log(person, person2);

function clone (origin, target) {
  var tar = target || {};
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      tar[key] = origin[key];
    }
  }
  return tar;
}

// 浅拷贝的对象里如果存在引用值，引用值还是存在问题。
```

```js
var person = {
  name: '张三',
  age: 18,
  sex: 'male',
  height: 180,
  weight: 140,
  son: {
    first: {
      name: 'Jenney'
    },
    second: {
      name: 'Lucy'
    },
    third: {
      name: 'Jone'
    }
  },
  car: ['Benz', 'Mazda']
}

var person2 = deepClone(person);

person2.name = '李四';
person2.son.forth = {
  name: 'yueluo'
};
person2.car.push('BYD');
console.log(person, person2);

function deepClone (origin, target) {
  var tar = target || {},
      toStr = Object.prototype.toString,
      arrType = '[object Array]';

  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof(origin[key]) === 'object' && origin[key] != null) {
        if (toStr.call(origin[key]) === arrType) {
          tar[key] = [];
        } else {
          tar[key] = {};
        }
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
}

// 也可以使用JSON.parse(JSON.stringify(str))，深拷贝的一种方式。
// 克隆方法的时候，JSON 就不行了。
```



题目：

```js
function test () {
  console.log(foo); // undefined
  var foo = 2;  
  console.log(foo); // 2
  console.log(a); // 报错
}
test();
```


```js
function a () {
  var test;
  test();
  function test () {
    console.log(1); // 1
  }
}
a();

AO = {
  test: undefined ->
  function test () {}
}
```


```js
var name = '222';
var a = {
  name: '111',
  say: function () {
    console.log(this.name);
  }
}
var fun = a.say;
fun(); // 222
a.say(); // 111
var b = {
  name: '333',
  say: function (fun) {
    fun(); // 指向window
  }
}
b.say(a.say); // 111 error -> 222
b.say = a.say;
b.say(); // 333
```


```js
function test () {
  var marty = {
    name: 'marty',
    printName: function () {
      console.log(this.name);
    }
  }

  var test1 = {
    name: 'test1'
  }
  var test2 = {
    name: 'test2'
  }
  var test3 = {
    name: 'test3'
  }
  test3.printName = marty.printName;
  marty.printName.call(test1); // test1
  marty.printName.apply(test2); // test2
  marty.printName(); // marty
  test3.printName(); // test3
}
test();
```


```js
var bar = {
  a: '1'
}
function test () {
  bar.a = 'a';
  Object.prototype.b = 'b';
  return function () {
    console.log(bar.a);
    console.log(bar.b);
  }
}
test()(); // 'a' 'b'
```


```js
function Foo () {
  getName = function () {
    console.log(1);
  }
  return this;
}
Foo.getName = function () {
  console.log(2);
}
Foo.prototype.getName = function () {
  console.log(3);
}
var getName = function () {
  console.log(4);
}
function getName () {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 5 -> 赋值覆盖 -> 4
Foo().getName(); // 1 不知道
new Foo.getName(); // 2
new Foo().getName(); // 3 return的this没有值，向原型链上找
new new Foo().getName(); // 3 return的this没有值，向原型链上找
```

  ## 十四、深拷贝实例、数组基础、数组方法、数组排序

数组

```js
var arr1 = []; // 数组字面量
var arr2 = new Array(); // 构造函数声明
var arr3 = Array(); // 不实例化也可以声明，但是不推荐使用

console.log(arr1.prototype); // 原型指向Array
console.log(arr2.prototype); // 原型指向Array
console.log(arr3.prototype); // 原型指向Array
```

原型都是 Array。

数组的原型上面是 Array 的构造函数的 prototype 属性。
所以，所有声明出来的数组，都继承 Array.prototype。



数组到底是什么？

对象的声明和数组一样，也有 3 种实例化方式。
对象都继承 Object.prototype，Object.prototype 上的方法和属性都可以使用。



使用对象模拟数组

```js
var arr = [1, 2, 3, 4, 5];
var obj = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5
}
console.log(arr[2]); // 3
console.log(obj[2]); // 3

// index -> 数组元素的下标（索引值）

// 数组利用对象的底层机制来形成 JavaScript 的数组。
// obje.2 -> obj['2'] 
```

JavaScipt 中，数组就是另一种对象的形式，虽然写法不同，但是内部访问机制是一样的。



```js
var arr = [,3, 1, 5, 7,];
console.log(arr); // [empty, 3, 1, 5, 7]
console.log(arr.length); // 5

// 数组存在截取的功能，如果输入‘，’，但是是控制，会截取掉最后一位。
// 数组不是每一位都有值，但是最后一位没有值，会截取最后一位。

// [empty, 3, empty, empty, 1, 5, 7] => 这种类型的数组叫做稀松数组
```

```js
var arr1 = new Array(1, 3, 4);
console.log(arr1);
// 构造函数来构造数组，不能有空值，必须每一位都有值。
new Array(, , 2, 2); // 报错
new Array(, 2, 2); // 报错

new Array(5); // [empty × 5]
// 如果填写一个参数，代表是的数据的长度。会产生5个空值。

new Array(5.2); // 报错，非法的长度

// empty 是一个空元素。
// 访问超过数组大小的值，返回 undefined。arr[10] -> arr.10 = undefined


```



数组是可以进行增删改查的。

数组方法来自 Array.prototype，都继承于数组的原型上。

* push：在数组末尾添加元素
* unshfit：在数组前添加元素

push 和 unshfit 的返回值，返回执行了方法以后的数组长度。可以一次性添加多个元素。

自定义实现push方法

```js
Array.prototype.myPush = function () {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length]  = arguments[i];
  }
  return this.length
}
```

* pop：剪切数组最后一位。并返回剪切的值。

* shift：剪切数组第一位元素，并返回剪切的值。

* pop 和 shift 都无法传入参数，没有参数。

* reverse：数组倒序

*  splice：剪切 存在 3 个参数 （开始项下标， 剪切长度， 剪切后的最后一位添加的数据）

  * 第一个参数可以添加负值，下标是从 -1 开始的。
  * 可以传负值的内部机制其实就是加上数组的长度，转为正值。

* sort：数组排序方法

  ```js
  var arr = [-1, -5, 8, 0, 2];
  arr.sort(); // 按照升序排序
  console.log(arr); // [-1, -5, 0, 2, 8]
  
  var arr = ['b', 'z', 'h', 'i', 'a'];
  arr.sort(); // 按照升序排序
  console.log(arr); // ["a", "b", "h", "i", "z"]
  
  var arr = [27, 49, 5, 7];
  arr.sort();
  console.log(arr); // [27, 49, 5, 7]
  
  // sort 是按照 ASCII 码来排列的。转成十进制。
  
  // 1. 必须存在参数a, b
  // 2. 必须存在返回值
  
  // 规则
  // 值为负值，a 在前面；
  // 值为正值，b 在前面；
  // 值为 0，保持不变；
  
  var arr = [27, 49, 5, 7];
  arr.sort(function (a, b) {
    return a - b; // 升序排列
  });
  console.log(arr); // [5, 7, 27, 49] 
  
  var arr = [27, 49, 5, 7];
  arr.sort(function (a, b) {
    return b - a; // 降序排列
  });
  console.log(arr); // [49, 27, 7, 5]
  ```



数组随机排序：利用 `Math.random() ` 返回 `[0, 1)` 之间的数值，判断是否大于 0.5。

```js
var arr = [1, 3, 2, 6, 4, 5];
arr.sort(function (a, b) {
  return Math.random() - 0.5;
});
console.log(arr);
```



**修改原数组：push/unshift、pop/shift、reverse、splice、sort**

  ## 十五、数组方法、类数组

```js
var year = window.prompt('请输入年份');
console.log(isLeapYear(year));
function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0 ? '闰年' 
                                                                : '不是闰年';
}
```



数组操作方法，不改变原数组

* concat：拼接数组
* toString：将数组转成字符串，使用“，”分割
* slice（截取起始下标，结束的下标之前）：数组剪切。浅拷贝。
* join：根据传入的标识进行元素拼接，把数组变成字符串
* split（标志，截取长度）：把字符串变成数组



类数组

* 使用对象来表示的数组，不是真正的数组。
* arguments就是类数组。



可以让对象添加 push 和 splice 方法，使之有数组的功能


```js
var obj = {
  '0': 1,
  '1': 2,
  '2': 3,
  'length': 3,
  'push': Array.prototype.push,
  'splice': Array.prototype.splice
};
obj.push(4);
console.log(obj)
```



也可以直接在对象原型上添加 push 和 splice 方法。


```js
Object.prototype.push = Array.prototype.push;
Object.prototype.splice = Array.prototype.splice;
var obj = {
'0': 1,
'1': 2,
'2': 3,
'length': 3
};
obj.push(4);
console.log(obj);
```



模拟一下数组的push方法


```js
var arr = [1, 2, 3, 4, 5];
Array.prototype.myPush = function (elem) {
  this[this.length] = elem;
}
arr.myPush(6);
arr.myPush(7);
console.log(arr);
```



题目：

```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj); // [empty × 2, 1, 2, splice: ƒ, push: ƒ]

this[this.length] = elem;
this.length++;
obj.push(1); -> obj[2] = 1;
obj.push(2); -> obj[3] = 2;
length 4
0 1 没有值，所以是eempty。
```


```js
var person = {
  '0': '张小一',
  '1': '张小二',
  '2': '张小三',
  'name': '张三',
  'age': 32,
  'weight': 140,
  'height': 180,
  'length': 3
}
Object.prototype.push = Array.prototype.push;
Object.prototype.splice = Array.prototype.splice;
// console.log(person[1]); // 张小二
// console.log(person.weight); // 140
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(person[key]);    
  }
}
```

  ## 十六、自定义原型方法、去重、封装 typeof

自定义原型方法 myUnshift

```js
Array.prototype.myUnshift = function () {
  var pos = 0;

  for (var i = 0; i < arguments.length; i++) {
    this.splice(pos, 0, arguments[i]);
    pos++;
  }

  return this.length;
}
```

```js
Array.prototype.myUnshift = function () {
  var argArr = [].slice.call(arguments),
      newArr = argArr.concat(this);
  return newArr;
}
```



数组按照元素的字节数排序

```js
function getBytes (str) {
  var bytes = str.length;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      bytes++;
    }
  }
  return bytes;
}

var arr = ['你我', 'oka', '你说好不好', '可以', 'what'];
arr.sort(function (a, b) {
  return getBytes(a) - getBytes(b);
});
```



封装 typeof

```js
function myTypeof (val) {
  if (val === null) {
    return 'null';
  }

  var type = typeof(val),
      toStr = Object.prototype.toString;

  if (type === 'object') {
    var res = {
      '[object Array]': 'array',
      '[object Object]': 'object number',
      '[object Number]': 'object numer',
      '[object String]': 'object string',
      '[object Boolean]': 'object boolean',
    }
    return res[toStr.call(val)];
  } else {
    return type;
  }
}
console.log(myTypeof(1));
console.log(myTypeof('1'));
console.log(myTypeof(true));
console.log(myTypeof(null));
console.log(myTypeof({}));
console.log(myTypeof([]));
console.log(myTypeof(new Number(1)));
console.log(myTypeof(undefined));
```



数组去重

```js
Array.prototype.unique = function () {
  var temp = {},
      newArr = [];

  for (var i = 0; i < this.length; i++) {
    if(!temp.hasOwnProperty(this[i])) {
      temp[this[i]] = this[i];
      newArr.push(this[i]);
    }
  }

  return newArr;
}
```

字符串去重

```js
String.prototype.unique = function () {
  var temp = {},
      newString = '';

  for (var i = 0; i < this.length; i++) {
    if (!temp.hasOwnProperty(this[i])) {
      temp[this[i]] = this[i];
      newString += this[i];
    }
  }

  return newString;
}
```



获取字符串内第一个不重复的字母

```js
var str = 'adsadwdwadsadarfwfawfjawfawdwcxgvdfm';
function test (str) {
  var temp = {};

  for (var i = 0; i < str.length; i++) {
    if (temp.hasOwnProperty(str[i])) {
      temp[str[i]]++;
    } else {
      temp[str[i]] = 1;
    }
  }

  for (var key in temp) {
    if (temp[key] === 1) {
      return key;
    }
  }
}
console.log(test(str));
```



 闭包

```js
function Test (a, b, c) {
  var d = 0;

  this.a = a;
  this.b = b;
  this.c = c;

  function e () {
    d++;
    console.log(d);
  }

  this.f = e;
}
var test1 = new Test();
test1.f(); // 1
test1.f(); // 2
var test2 = new Test();
test2.f(); //
```

```js
function test () {
  console.log(typeof(arguments));
}
test(); // object
```



```js
var test = function a () { // 忽略函数名
  return 'a';
}
console.log(typeof(a)); // undefined  string 类型的 undefined
console.log(a); // a is defined 报错
```



如何简化下面函数


```js
function test (day) {
  switch (day) {
    case 1:
      console.log('Mon');
      break;
    case 2:
      console.log('Tue');
      break;
    case 3:
      console.log('Wed');
      break;
    case 4:
      console.log('Thr');
      break;
    case 5:
      console.log('Fri');
      break;
    case 6:
      console.log('Sat');
      break;
    case 7:
      console.log('Sun');
      break;
    default:
      console.log('I dont\'t konw');
      break;
  }
}
test(3);
```

```js
function test (day) {
  var weekday = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat', 'Sun'
  ];

  weekday[day - 1] != undefined ? console.log(weekday[day - 1]) : console.log('I dont\'t konw');
}
test(3);
test(8);
```

如果把（day - 1）去掉如何实现？

```js
function test (day) {
  var weekday = [
    ,'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat', 'Sun'
  ];

  // weekday[day - 1] != undefined ? console.log(weekday[day - 1]) : console.log('I dont\'t konw');
  weekday[day] != undefined ? console.log(weekday[day]) : console.log('I dont\'t konw');
}
test(3);
test(8);

// 利用数组的特性，新增一个空的子项。
```



数组的特性

数组并不是每一项都有值的。

```js
var arr = [1, 2, 3, , 5]; // 稀松数组 空值 empty

console.log(arr[3]); // undefined      
```

**数组最后加","是不算成一项的，在前面加“，”算成一项。**

  ## 十七、错误信息、try_catch、严格模式

### JS 的错误信息类型

**1. 语法错误（SyntaxError）**

```js

// 变量名不规范

var 1 = 1; // Uncaught SyntaxError: Unexpected number
var 1ab = 1; // Uncaught SyntaxError: Invaild or unexpected token
fuction 1test() {}; // Uncaught SyntaxError: Invaild or unexpected token

// 关键字不可赋值

new = 5; // Uncaught SyntaxError: Unexpected token
function = 1; // Uncaught SyntaxError: Unexpected token

// 基本的语法错误

var a =  5: // Uncaught SyntaxError: Unexpected token
```

 **2. 引用错误（ReferenceError）**

```js
// 变量或者函数未被声明

test(); // Uncaught ReferenceError: test is not defined

// 所有的函数或者变量未声明的，都是报引用错误。

console.log(a); // Uncaught ReferenceError: a is not defined

// 给无法被赋值的对象赋值的时候

var a = 1 = 2; // Uncaught ReferenceError: Invalid left-hand side in assginment

var a = 1;
console.log(a) = 1; // Uncaught ReferenceError: Invalid left-hand side in assginment
```

**3. 范围错误（RangeError）**

```js
// 数组长度赋值为负数的时候

var arr = [1, 2, 3];
arr.length = -1; // Uncaught RangeError：Invalid array length

// 对象方法参数超出可行范围

var num = new Number(66.66);
console.log(num.toFixed(1)); 
// 66.7
console.log(num.toFixed(-1)); 
// Uncaught RangeError：toFiexed() digits argument must be between 0 and 100 at Number.toFixed(<anonymous>) at ...
```

**4. 类型错误（TypeError）**

```js
// 调用不存在的方法

test(); // Uncaught ReferenceError: test is not defined
123(); //  Uncaught TypeError: 123 is not a function

var obj = {};
obj.say(); // Uncaught TypeError: obj.say is not a function

// JavaScript 认为没有这个方法，就认为是一个属性，如果把属性给执行了，就是类型错误。

// 实例化原始值

var a = new 'string'; // Uncaught TypeError: 'string' is not a constructor

var a = new '123'; //  Uncaught TypeError: '123' is not a constructor
```

**5. URI错误（URIError)**

URI：unifrom resource identifier 统一资源标识符
URL：unifrom resource location  统一资源定位符
URN: unifrom resource name 统一资源名称

URI包括URL和URN。 URL必须是网址，URI是资源标识。

URL：`http://www.yueluo.club/news#today`
`ftp://www.yueluo.com/ftp#developer`

通过一个地址可以访问特定的页面或者执行特定的web程序。

URN：`www.yueluo.com/ftp#developer -> ID`

代表一个名称或者ID，指代一个资源的唯一性。

href="tel:15949702771" 也是一个URN，一个途径

href="mailto:523579987@qq.com" URL标识执行调用

```js
var url =  'http://www.baidu.com?name=杨志强';
var newUrl = encodeURI(url);
console.log(newUrl); // http://www.baidu.com?name=%E6%9D%A8%E5%BF%97%E5%BC%BA

var newNewUrl = decodeURI(newUrl);
console.log(newNewUrl); // http://www.baidu.com?name=杨志强
```

一般来说，中文会变成中文编码字符。URL 是外国人发明的东西，出现中文本身就是意料之外的事情。


```js
var str = decodeURL('@ssfsf'); // Uncaught URIError: URI malformed at decodeURL
没办法解析不符合常规的URI。
```

**6.  EvalError（eval函数执行错误）**    

不推荐使用，可以在 eval 里面编写 js 脚本程序。

```js
eval('console.log(1)'); // 1
var a = eval('1');
console.log(a); // 1

var obj = {
  a: 1,
  b: 2
}

console.log(eval('obj')); // { a: 1, b: 2 }
console.log(eval(obj)); // { a: 1, b: 2 }
```

eval 的最大作用

```js
var obj = {
  a: 1,
  b: 2
}

// 对象属性可以写成

var obj = {
  'a': 1,
  'b': 2
}
obj['a'] obj.a 

// 这种形式就是 JSON 数据，JSON 数据一般都是使用双引号。

var obj = {
  "a": 1,
  "b": 2
}

// JSON对象

var obj = {
  "a": 1,
  "b": 2,
  "say": function () {}
}

// 这不是 JSON 对象，JSON 对象不可以嵌有方法。

var jsonStr = '[{"a": 1, "b": 2}]';
console.log(jsonStr);
console.log(JSON.parse(jsonStr));
console.log(eval(jsonStr));
console.log(eval('(' + jsonStr + ')'));

// eval 可以把 JSON 字符串数据转换为 JSON 对象。
```



 ES3、ES5 都表明不建议使用 eval。

1. 语法规范不好
2. eval不容易调试
3. eval存在性能问题
4. 代码压缩混淆可能会存在问题
5. 比较容易XSS攻击
6. 可读性不好



 以上这6种错误都可以人为的抛出。

```js
var err = new Error('代码执行错误');
var err = new SyntaxError('代码执行错误');
var err = new TypeError('代码执行错误');
```

这几种错误都是系统自动为我们抛出的错误。

### try catch

try catch finally throw

手动抛出错误的方法。

```js
try {
  console.log('1');
  console.log(a);
  console.log('2');
} catch (e) {
  console.log(e); // ReferenceError: a is not defined
} finally {
  console.log('3');
}
```

catch 的作用就是捕获错误。

```js
// e是一个对象。
// e.name  错误名称
// e.message 错误的具体信息

var jsonStr = '';
try {

} catch (e) {
  var errorTip = {
    name: '数据传输失败',
    errorCode: '10010'
  }
}
```

throw 抛出

```js
throw 'JSON字符串为空';
throw new Error();

// try catch 在比较大型的程序插件中应用比较多。
```

### ES5 严格模式

ECMAScript  JavaScript 语法规范 方法规范

    97年 1.0 
    98年 2.0
    99年 3.0  JS通行标准
    
    07年 4.0草案  比较激进、前卫  雅虎、微软、谷歌都比较反对，mozilla不反对（Branden Eich）
    08年 4.0中止  将一小部分可以改善的部分 放到3.0中 发布3.1版本  Harmony
    3.1 更名为ECMAScript5. 并没有发布
    
    09年 ECMAScript 5.0正式发布，Harmony -> 1/2 JS.NEXT
    1/2 JS.NEXT.NEXT
    
    11年 5.1发布 成为 ISO国际标准
    
    13年 ES6版本 => JS.NEXT   js.next.next（ES7）
    
    13年 ES6草案发布
    15年 ES6正式发布 因为是2015年发布的，又叫ECMAScript2015
    
    ES5开始，运行方式存在两种，一种是正常模式，一种是严格模式。
    IE8及以下浏览器，不支持严格模式。
    
    ES5 严格模式 按照ES5的规范运行程序

'use strict';  // 严格模式 脚本最上一行定义。

可以在自己的函数或者模块中定义严格模式。



```js
var test = (function () {
  'use strict';

})();
```

with 方法

```js
var a = 1;
var obj = {
  a: 2
}
function test () {
  var a = 3;
  with (test) {
    console.log(a); // 3
  }
  with (obj) {
    console.log(a); // 2
  }
  with (window) {
    console.log(a); // 1
  }
}
test();

// 可以改变作用域链，严格模式不能使用with，会报错。
```

命名空间

```js
var a = 1;
var a = 2;
console.log(a); // 2

function test () {
  console.log(1);
}
function test () {
  console.log(2);
}
test(); // 2

// 命名存在冲突问题。

function init () {
  initSlider;
  initSideBar;
}

var initSlider = (function () {
  var a = 1;
})();

var initSideBar = (function () {
  var a = 2;
})();
```

```js
var namespace = {
  header: {
    Jenny: {
      a: 1,
      b: 2
    },
    Ben: {
      a: 3,
      b: 4
    }
  },
  slderBar: {
    Crystal: {
      a: 5,
      b: 6
    }
  }
}

with(namespace.header.Ben) {
  console.log(a);
}

// 多人开发，最早是用这种形式（with）来防止命名冲突的问题。
// 现在基本用 webpack 来写。
```

callee、caller

```js
function test () {
  console.log(arguments.callee);
}
test();

// 严格模式不能使用 callee 和 caller。arguments 一些属性都是不能使用的。
```

```js
a = 1; // 严格模式下报错
var a = b = 1; // 严格模式下报错
```


```js
// 严格模式下 函数内部的 this 是undefined。

function test () {
  console.log(this); // undefined
}
test();

// 严格模式下 函数的参数不能重复 报错

function test (a, a) {
  console.log(a); // 2
}
test(1, 2);

// 严格模式报错

// 严格模式 对象的属性名也是不允许重复的。不会报错。

var obj = {
  a: 1,
  a: 2
}
console.log(obj.a); // 2

// 严格模式下 使用 eval 中定义的变量报错

eval('var a = 1; console.log(a)'); // 1
console.log(a); // a is not defined 
```

  ## 十八、变量生命周期、垃圾回放原理

JavaScript 不需要手动进行垃圾回收。

JS垃圾回收机制原理：

  1. 找出不再使用的变量声明
  2. 释放起占用的内存
  3. 固定的时间运行（隔一段时间进行清理）

  对内存中的值进行处理。

局部变量只存在函数执行内部。
函数执行过程中，值分配在栈内存或者堆内存中存储。



闭包是特例，函数执行完毕，值不会被销毁（回收）。

如何解除引用（闭包解除引用）

```js
function test1 () {
  var a = 1;
  return function () {
    a++;
    console.log(a);
  }
}
var test = test1();
test();
test();
test = null; // 解除引用
```



**垃圾回收机制**

标记清除（mark and sleep）

```js
function test () {
  var a = 0; // a 进入环境
}
test(); // a 离开环境 回收占用空间

var b = 0;
var c = 1;
function e () {  }

// 几乎所有浏览器都在使用这种机制

// IE6 左右使用的不是。
// 标记方式可能不一致，有其他的标志方式。
// 垃圾回收器的回收机制是不一样的。
```

引用计数（reference counting）：不常见的回收机制

记录每个值被引用的次数，次数为0时，被清除。
低版本的IE经常出现内存泄漏，存在很多引用次数不为0的。

```js
function test () {
  var a = new Object(); // a = 1
  var b = new Object(); // b = 1

  var c = a; // a++  a = 2
  var c = b; // a-- a = 1 , b++ b = 2

  a.prop = b; // 循环引用 - 无法回收
  b.prop = a; // 循环引用 - 无法回收
}

// 低版本 IE 引用值不使用需要解除引用
a = null
b = null

// 无法回收变量，导致数量堆积，造成内存泄漏。
```
