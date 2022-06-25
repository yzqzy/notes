# Lodash

## Array

### slice

#### 功能

```js
_.slice(array, [start=0], [end=array.length])
```

裁剪数组 `array`，从 `start` 位置开始到 `end` 结束，但不包括 `end` 本身的位置。返回 数组 `array`  裁剪部分的新数组。

* `array`  *(Array)*: 要裁剪数组
* `[start=0]` *(number)*: 开始位置；
* `[end=array.length]`  *(number)*: 结束位置。

#### 案例

```js
_.slice([1, 2, 3, 4], 2); // [3, 4]
```

#### 源码

```js
```



### chunk

#### 功能

将数组（array）拆分成多个 `size` 长度的区块，并将这些区块组成一个新数组。 
如果`array` 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

```js
_.chunk(array, [size=1])
```

#### 案例

```js
_.chunk(['a', 'b', 'c', 'd'], 2); // [['a', 'b'], ['c', 'd']]
```

```js
_.chunk(['a', 'b', 'c', 'd'], 3); // [['a', 'b', 'c'], ['d']]
```

#### 源码

```js
// slice.js


```



```js
// chunk.js


```



