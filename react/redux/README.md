# Redux

## 概述

JavaScript 状态容器，提供可预测化的状态管理。

```js
const state = {
  modelOpen: 'yes',
  btnClicked: 'no',
  btnActiveClass: 'active',
  page: 5,
  size: 10
}
```

## 核心概念及工作流程

<img src="./images/redux.png" style="zoom: 70%" />

Store：存储状态的容器，JavaScript 对象

View：视图，HTML 页面

Actions：对象，描述对状态进行怎样的操作

Reducers：函数，操作状态并返回新的状态