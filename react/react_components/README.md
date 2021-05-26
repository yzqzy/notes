# React 组件库

## 组件库设计基本流程

* 项目结构
* 各项标准
* 需求分析
* 代码的编写
* 单元测试
* 打包及发布
* 生成文档
* CI/CD

### 创建项目

```tsx
npx create-react-app react-components --typescript
```

### 项目结构

React 的建议（没有标准）

1. 按功能或路由划分

2. 按文件类型划分

3. 避免多层嵌套

4. 不要过度思考

```tsx
react-ui
	README.md
  package.json
  tsconfig.json
  src 
  	components
    	Input
      	indext.tsx // 组件出口文件
				index.scss // 组件样式文件
				index.test.tsx // 组件测试文件
		common
    	js // 公共逻辑、函数
      css // 公共的样式变量、函数、混合、初始化
    index.tsx
```

```tsx
common
	js
  	functions.js
  css 
  	_variables.scss
    _functions.scss
    _mixins.scss
    _normalize.scss
```

### 标准

* className
* 行内样式
* CSS-in-JS：style-component
  * 第三方库，提供的功能
* CSS module
  * css 模块化 ，引入 CSS 外部文件
* Sass/Less

### 标签样式格式化

* normalize.css
  * 去除不必需的默认样式
  * 给元素提供一些更好的一般化样式
  * 保证浏览器样式一致性
  * 提升 CSS 的可用性
  * 有详细的注释说明代码
* resets.css 去除所有标签的默认样式
  * 相对于 normalize.css ，不建议使用

### 颜色

以 ant-design 为例。

* 基础色板
* 中性色版
  * 令页面具备良好的主次关系
* 功能色
  * 组件颜色

### 字体

* font-family
* fon-weight
* font-size
* line-height
* head-line
  * 标题
* form-font
  * 表单元素
* link-font
  * 链接
* border
  * 边框
* shadow
  * 隐藏
* user-switch
  * 用户可配置性

