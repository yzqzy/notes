# Built-in objects

## Array.prototype.copyWithin

ECMAScript 2015（ES6）。

参数： target、start、end

拷贝区间 start 和 end 之间的元素到目标位置。



```js
const arr = [1, 2, 3, 4, 5];

const newArr = arr.copyWithin(0, 3, 4); // [3, 4)
console.log(newArr); // [4, 2, 3, 4, 5]
```

```js
const newArr = arr.copyWithin(0, 3, 5);
console.log(newArr); // [4, 5, 3, 4, 5]
```

target 指从 ...。

target - [end -start]  开始 - 结束。end > len - 1 取到末尾。



```js
const newArr = arr.copyWithin(5, 1, 2);

console.log(newArr); // [1, 2, 3, 4, 5]
```

当 target 大于 len - 1，不发生任何替换。



```js
const newArr = arr.copyWithin(3, 1, 3);
console.log(newArr); // [1, 2, 3, 2, 3]
```

当 target > start，正常替换。



```js
const newArr = arr.copyWithin(0, -3, -1);
console.log(newArr); // [3, 4, 3, 4, 5]
```

start 或者 end 是负数，即 start + length，end + length。



```js
const newArr = arr.copyWithin(0);
console.log(newArr); // [1, 2, 3, 4, 5]

const newArr = arr.copyWithin(3);
console.log(newArr); // [1, 2, 3, 1, 2]
```

如果没有 start，取整个数组的元素。copyWithin 不改变数组长度。



```js
const newArr = arr.copyWithin(1, 3);
console.log(newArr); // [1, 4, 5, 4, 5]
```

如果没有 end，取 start 到最后的元素。



```js
const newArr = arr.copyWithin(1, 3);
console.log(newArr); // [1, 4, 5, 4, 5]
console.log(newArr === arr); // true
```

copyWithin 返回的是原数组引用。



memcpy 用来移动数组元素。

复制元素集合，全选 target 及符合复制的元素集合的长度的元素，再粘贴。

ctrl + c => ctrl + v。



```js
const arr = [
  {
    id: 1,
    name: '张三'
  },
  {
    id: 2,
    name: '李四'
  },
  {
    id: 3,
    name: '王五'
  },
  {
    id: 4,
    name: '赵六'
  },
  {
    id: 5,
    name: '孙七'
  },
];

const target1 = arr[0];

const newArr = arr.copyWithin(0, 2, 3);

const target2 = arr[0];

console.log(JSON.stringify(newArr)); 
// [{"id":3,"name":"王五"},{"id":2,"name":"李四"},{"id":3,"name":"王五"},{"id":4,"name":"赵六"},{"id":5,"name":"孙七"}] 
console.log(target1 === target2); // false
console.log(target2 === arr[2]); // true
```

复制引用，浅拷贝。



```js
const obj = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  length: 5
};

const newObj = [].copyWithin.call(obj, 0, 2, 4);
console.log(newObj); // {0: 3, 1: 4, 2: 3, 3: 4, 4: 5, length: 5}
console.log(obj === newObj); // true
```

this 不一定非要指向一个数组，也可以指向对象。



```js 
5 << 2 // 20
5 -> 101 -> 10100 -> 20

5 >> 2 // 1
5 -> 101 -> 1 -> 1
```

<<、>>  是有符号的位移。`>>>` `<<<` 是无符号位移。都是正数。

xxx.length 保证是正整数。

```js
xxx.length >>> 0
```



```js
Array.prototype.$copyWithin = function (target) {
	if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  
  var obj = Object(this),
      len = obj.length >>> 0,
      start = arguments[1],
      end = arguments[2],
      count = 0,
      dir = 1;
  
  target = target >> 0;
  target = target < 0 ? Math.max(len + target, 0) 
                      : Math.min(target, len);
  
  start = start ? start >> 0 : 0;
  start < 0 ? Math.max(len + start, 0)
            : Math.min(start, len);
  
  end = end ? end >> 0 : len;
  end < 0 ? Math.max(len + end, 0) 
          : Math.min(end, len);
  
  count = Math.min(end - start, len - target);
  
  if (start < target && target < (start + count)) {
    dir = -1;
    start += count - 1;
    target += count - 1;
  }
  
  while (count > 0) {
  	if (start in obj) {
      obj[target] = obj[start];
    } else {
      delete obj[target];
    }
    
    start += dir;
    target += dir;
    count--;
  }
  
  return obj;
}
```

## 生成器与迭代器

var arr = [1, 2, 3, 4, 5];

```js
forEach // 普通的数据遍历方法 for
map // 映射，每次遍历返回新的数组元素，map 会返回一个新的数组
filter // 过滤，通过每一次遍历，返回 bool，来决定当前元素是否纳入新的数组中
reduce // 归纳，每一次遍历，将当前元素收归到容器中
reduceRight // reduce 的反向操作
every // 判定是否所有元素都符合指定条件
some // 判断是否有一个或者多个符合执行条件
```

遍历就是一次性对数组中每一个元素进行查询和处理。

我们希望遍历的过程是可控的（遍历的过程可停止，也可继续），手动控制遍历流程，即迭代的过程。

产品迭代，人为控制的产品升级与扩展，迭代， manually control



生成器和迭代器

生成器是一个函数，生成器函数。迭代器是由生成器函数执行后返回的带有 next 方法的对象。

生成器对迭代的控制是由 yield 关键字来执行的。



```js
function * generator () {
  yield '姓名：月落';
  yield '年龄：23';
  yield '爱好：前端';
  return '我爱 JavaScript';
}

const iterator = generator();

console.log(iterator.next());
// {value: "姓名：月落", done: false}
```

每次 yield 都会产出一个迭代器对象。



```js
const arr = ['姓名：月落', '年龄：23', '爱好：前端', '我爱 JavaScript'];

function * gen (arr) {
  for (var i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

const iterator = gen(arr);

console.log(iterator.next());
```



```js
const arr = ['姓名：月落', '年龄：23', '爱好：前端', '我爱 JavaScript'];

function gen (arr) {
  var nextIdx = 0;
  
  return {
    next: function () {
      return nextIdx < arr.length ? 
        {
          value: arr[nextIdx++], 
          done: false
        } : {
        	value: arr[nextIdx++],
          done: true
      	}
    }
  }
}

const iterator = gen(arr);

console.log(iterator.next());
```

## Array.prototype.entries

ES6 新增的内置方法。

```js
const arr = [1, 2, 3, 4, 5];

const it = arr.entries();
console.log(it); // 数组的迭代器对象

console.log(it.next()); // {value: [0, 1], done: false}
console.log(it.next()); // {value: [1, 2], done: false}
console.log(it.next()); // {value: [2, 3], done: false}
console.log(it.next()); // {value: [4, 4], done: false}
console.log(it.next()); // {value: [5, 5], done: true}

// 第一项为下标，第二项为数组元素
```

```js
var o = {
  a: 1,
  b: 2,
  c: 3
}

for (let k in o) {
  console.log(k, o[k]);
  // a 1
  // b 2
  // c 3
}

```

```js
const arr = [1, 2, 3, 4, 5];

for (let v of arr) {
  console.log(v);
  // 1
  // 2
  // 3
  // 4
  // 5
}
```

```js
const arr = [1, 2, 3, 4, 5];

const it = arr.entries();

for (let v of it) {
  console.log(v);
  // [0, 1]
  // [1, 2]
  // [2, 3]
  // [3, 4]
  // [4, 5]
}

for (let [i, v] of it) {
  console.log(i, v);
  // 0 1
  // 1 2
  // 2 3
  // 3 4
  // 4 5
}
```

数组实际上就是一个特殊的对象，key 键名是一个从 0 开始有序递增的数字，按顺序对应数组的每一个元素。

```js
// 类数组

const o = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}

// o is not iterable
for (let v of o) {
  console.log(v);
}
```

```js
const o = {
  0: 1,
  1: 2,
  2: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
  length: 3
}

for (let v of o) {
  console.log(v);
  // 1
  // 2
  // 3
}
```

```js
Object.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

const o = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}

for (let v of o) {
  console.log(v);
  // 1
  // 2
  // 3
}
```

```js
const o = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}

for (let v of Array.from(o)) {
  console.log(v);
  // 1
  // 2
  // 3
}
```

Array.from 也可以转换类数组为数组。



```js
var newArr = [];

const arr = [1, 2, 3, 4, 5];

const it = arr.entries();

for (var i = 0; i < arr.length + 1; i++) {
  var item = it.next();
  
  !item.done && (newArr[i] = item.value);
}

console.log(newArr); // [[0,1],[1,2],[2,3],[3,4],[4,5]]
```



二维数组排序

```js
const newArr = [
  [56, 23],
  [56, 34, 100, 1],
  [123, 234, 12]
];

function sortArr (arr) {
  const _it = arr.entries();
  let _doNext = true;
  	
  while (_doNext) {
    const _r = _it.next();
    
    if (!_r.done) {
      _r.value[1].sort((a, b) => a - b);
      _doNext = true;
    } else {
      _doNext = false;
    }
  }
  
  return arr;
}

console.log(sortArr(newArr));
// [[23,56],[1,34,56,100],[12,123,234]]
```

## Array.prototype.fill

ES6 （ECMAScript 2015）， 新增的方法。

根据下标范围给范围内的元素填充新的值。

value，start，end   `[start, end)`



常规用法

```js
const arr = [1, 2, 3, 4, 5];

arr.fill('a', 2, 4); // [1, 2, "a", "a", 5] 
arr.fill('b', 2, 5); // [1, 2, "b", "b", "b"]
```

新数组是原数组引用

```js
const newArr = arr.fill('a', 2, 4);

console.log(newArr === arr);
```

start 存在，end 不存在

```js
arr.fill('c', 2); // [1, 2, "c", "c", "c"]
```

start，end 都不存在

```js
arr.fill('d'); // ["d", "d", "d", "d", "d"]
```

start，end 为负数

```js
arr.fill('e', -4, -2); // [1, "e", "e", 4, 5]
```

所有参数都不存在

```js
arr.fill(); // [undefined, undefined, undefined, undefined, undefined]
```

start、end 一致

```js
arr.fill('f', 1, 1); // [1, 2, 3, 4, 5]
```

start 非数，end 非数

```js
arr.fill('g', 'a', 'b'); // [1, 2, 3, 4, 5]
```

start 非数，end 为数字

```js
arr.fill('g', 'a', 4); // ["g", "g", "g", "g", 5]
```

start、end 都为 NaN

```js
arr.fill('h', NaN, NaN); // [1, 2, 3, 4, 5];
```

start NaN，end 数字

```js
arr.fill('i', NaN, 4); // ["i", "i", "i", "i", 5]
```

start、end 都为 Null

```js
arr.fill('j', null, null); // [1, 2, 3, 4, 5];
```

start Null，end 数字

```js
arr.fill('j', null, 4); // ["j", "j", "j", "j", 5]
```

start，end 都为 undefined，全部覆盖

```js
arr.fill('k', undefined, undefined); //  ["k", "k", "k", "k", "k"]
```

start 数字，end undefined

```js
arr.fill('k', 1, undefined); // [1, "k", "k", "k", "k"]
```



无论是非数字、NaN、null 结果都是一致的，undefined 与之不同，undefined 可以看作没有填写。

* 参数 value 可选，默认全部填充 undefined
* 参数 start 可选，默认为 0
* 参数 end 可选，默认为数组长度



对象调用 fill

```js
[].fill.call({
  length: 3
}, 4);

// {0: 4, 1: 4, 2: 4, length: 3}
```

创建类数组的方法

```js
function makeArrLike (arr) {
  var arrLike = {
    length: arr.length,
    push: [].push,
    splice: [].splice
  };
		
	arr.forEach(function (item, index) {
    [].fill.call(arrLike, item, index, index + 1);
  });

	return arrLike;
}

makeArrLike(['a', 'b', 'c', 'd', 'e']); 
```



fill 方法实现

```js
Array.prototype.$fill = function () {
  var value = arguments[0] || undefined,
      start = arguments[1] >> 0,
      end = arguments[2] >> 0;
  
  if (this == null) {
    throw new TypeError('This is null or not defined.');
  }
  
  var obj = Object(this),
      len = obj.length >> 0;
  
  start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  end = end === undefined ? len : end;
  
  end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
  
  while (start < end) {
    obj[start++] = value;
  }
  
  return obj;
}
```

```js
const arr = [1, 2, 3, 4, 5];

arr.$fill('a', 2, 4); // [1, 2, "a", "a", 5]
```

## Array.prototype.find



