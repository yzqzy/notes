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

#### 引用计数算法

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

