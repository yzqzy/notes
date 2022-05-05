# Jest

## 简单测试

```js
// demo.js

function sum (a, b) {
  return a + b;
}

function subtract (x, y) {
  return x - y;
}

module.exports = {
  sum,
  subtract
}
```

```js
// demo.test.js

// 1. 引入测试函数
const { sum, subtract } = require('./demo');

// 2. 定义函数输入
const result = sum(1, 2);
// 3. 定义预期输出
const expected = 3;

// 4. 检查函数是否返回预期结果
if (result !== expected) {
  throw new Error(`sum(1, 2) result ${ expected }, but get ${ result }`);
}
```

## 断言和测试用例

定义 expect 断言函数

```js
const { sum, subtract } = require('./demo');

expect(sum(1, 2)).toBe(3);

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}
```

```js
const { sum, subtract } = require('./demo');

expect(sum(1, 2)).toBe(3);
expect(subtract(2, 1)).toBe(1);

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}
```

定义 test 函数，test 函数其实就是测试用例，一个测试用例可以包含多个断言函数。

```js
test('sum(1, 2) result is 3', () => {
  expect(sum(1, 2)).toBe(3);
})
test('subtract(2, 1) result is 1', () => {
  expect(subtract(2, 1)).toBe(1);
})

function test (message, callback) {
  try {
    callback();
  } catch (error) {
    console.error(`${ message }: ${ error }`);
  }
}

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}
```

## Jest 体验



## Jest 介绍

