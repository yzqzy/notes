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

