# 模块联邦

## 概述

Module Federation 即为模块联邦，是 webpack 5 中新增的一项功能，可以实现跨应用共享模块。

## 快速使用

### 需求

通过模块联邦在容器应用中加载微应用。

### 创建应用结构

```js
products
	package-lock.json
  package.json
	public
  	index.html 
  src
  	index.js
	webpack.config.js
```

### 初始化微应用和容器应用

#### 编写产品列表



#### 编写 html

#### webpack 配置

#### 添加应用启动命令

#### 通过 copy 的方式创建 container 和 cart

### Module Federation

#### 模块导出

#### 模块导入

### 文件打包加载分析

### 加载 cart 微应用

## 共享模块

