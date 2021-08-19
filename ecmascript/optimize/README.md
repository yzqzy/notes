# JS 性能优化

性能优化不可避免。任何一种提高运行效率，降低运行开销的行为都可以看作是一种优化操作。

## 内存优化

内存泄漏案例：

```js
function fn () {
  arrList = [];
  arrList[100000] = 'yueluo is a coder';
}

fn();
```

### 内存管理

内存：由读写单元组成，表示一片可操作空间

管理：人为的去操作一片空间的申请、使用和释放

内存管理：开发者主动地申请空间、使用空间、释放空间

管理流程：申请 - 使用 - 释放



**JavaScript 内存管理**

* 申请内存空间

* 使用内存空间

* 释放内存空间



```js
// 申请空间
let obj = {};

// 使用空间
obj.name = 'yueluo';

// 释放空间
obj = null;
```

### 垃圾回收

* JavaScript 中内存管理是自动的
* 对象不再被引用时被视为垃圾
* 对象不能访问到时被视为垃圾

#### 可达对象

* 可以访问到的对象就是可达对象（引用、作用域链）
* 可达的标准就是从根出发是否能够被找到
* JavaScript 中的根可以理解为是全局变量对象

#### 引用与可达

```js
let obj = { name: 'yueluo' };

let obj2 = obj;

obj = null;

console.log(obj); // { name: 'yueluo' };
```



```js
function group (obj1, obj2) {
  obj1.next = obj2;
  obj2.prev = obj1;
  
  return {
    o1: obj1,
    o2: obj2
  }
}

let obj = group({ name: 'obj1' }, { name: 'obj2' });

console.log(obj); // {o1: {…}, o2: {…}}
```



<img src="./images/object.png" style="zoom: 60%" />



### GC 算法

#### GC 定义与作用

GC 就是垃圾回收机制的简写，GC 可以找到内存中的垃圾、并释放和回收空间。

#### GC 中的垃圾

程序中不再需要使用的对象、程序中不能再访问到的对象

#### GC 算法

* GC 是一种机制，垃圾回收器完成具体的工作

* 工作的内容就是查找垃圾释放空间、回收空间
* 算法就是工作时查找和回收所遵循的规则

#### 常见 GC 算法

* 引用计数
* 标记清除
* 标记整理
* 分代回收

##### 引用计数算法

核心思想：设置引用数，判断当前引用数是否为 0 

引用关系改变时，引用计数器修改引用数字。

```js
const user1 = { age: 11 };
const user2 = { age: 12 };
const user3 = { age: 13 };

const nameList = [user1.age, user2.age, user3.age];

function fn () {
  num1 = 1;
  num2 = 2;
}

fn();
```

优点：

* 发现垃圾时立即回收
* 最大限度减少程序暂停

缺点：

* 无法回收循环引用的对象
* 时间开销大

```js
function fn () {
  const obj1 = {};
  const obj2 = {};
  
  obj1.name = obj2;
  obj2.name = obj1;
  
  return 'yueluo is a coder';
}

fn();
```

存在互相引用关系，使用引用计数算法无法进行垃圾回收。

##### 标记清除算法

核心思想：分标记和清除二个阶段完成

遍历所有的对象找标记活动对象，遍历所有对象清除没有标记对象，回收相应空间。



<img src="./images/sign.png" style="zoom: 60%" />



第一个阶段中找到所有可达对象，如果涉及到引用层次关系会递归查找进行标记。

第二个阶段会进行清除，找到没有标记的对象，进行垃圾回收，同时将第一次的标记进行清除。这样就完成一次垃圾回收。

最终会把回收的空间放到空闲列表上面，方便后续程序申请空间使用。

优点：

* 相对于标记清除算法，可以解决对象循环引用问题；

缺点：

* 易产生空间碎片化，垃圾回收后导致地址不连续，不能让空间得到最大化使用

##### 标记整理算法

标记整理算法可以看作是标记清除算法的增强。

标记阶段的操作和标记清除一致，清除阶段会先执行整理，移动对象位置，让地址产生连续，最大化的利用空间。



<img src="./images/clear_before.png" style="zoom: 60%" />

<img src="./images/clear_after.png" style="zoom: 60%" />

<img src="./images/clear_after02.png" style="zoom: 60%" />



#### GC 算法总结

