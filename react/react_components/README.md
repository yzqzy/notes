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
npx create-react-app react-components --template typescript
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
  styles 
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

## variables、normalize

scss `_file`，_ 代表是分音，Partials。

> 如果需要导入 SCSS 或者 Sass 文件，但又不希望将其编译成 css，只需要在文件前添加下划线，这样会告诉 Sass 不能编译这些文件，但导入语句中并不需要加下划线。

```css
// _variables.scss

@import ('variables');
```



```scss
// 希望操作元素时 不存在 outline，需要过滤 :focus-visible（tab 操作时，无障碍操作）

[tabindex="-1"]:focus:not(:focus-visible) {
  outline: 0 !important;
}
```

```scss
// hr 没有设置 size 属性时，设置默认值

hr:not([size]) {
  height: $hr-height; // 2
}
```

```scss
@extend // 继承样式
```

```scss
abbr[title],
abbr[data-original-title] { // 1
  text-decoration: underline; // 2
  text-decoration: underline dotted; // 2
  cursor: help; // 3
  text-decoration-skip-ink: none; // 4 例如 英文 g，下划线是否穿过字母
}
```

```scss

button:focus {
  outline: 1px dotted;
  // -webkit-focus-ring-colo 代表 webkit 普通蓝色
  outline: 5px auto -webkit-focus-ring-color;
}
```

```scss
// 去除日历组件小箭头
[list]::-webkit-calendar-picker-indicator {
  display: none;
}
```

```scss
button,
[type="button"], // 1
[type="reset"],
[type="submit"] {
  -webkit-appearance: button; // 2

  @if $enable-pointer-cursor-for-buttons {
    &:not(:disabled) {
      cursor: pointer; // 3
    }
  }
}

// -webkit-appearance 针对 ios 手机端样式兼容
```

```scss
textarea {
  overflow: auto; // 1
  resize: vertical;  // 2
}

// overflow 滚动条
// resize 垂直扩张
```

```scss
[hidden] {
  display: none !important;
}

// hidden 属性，直接设置 display 属性为 none
```

```scss
::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

// 火狐的内置伪元素，可以让初始化元素设置生效
```

## Button 组件

### 依赖库安装

sass

```js
yarn add sass  -D
```

类名合并

```js
yarn add classnames @types/classnames -S
```

### 组件编写

自定义属性与原生属性合并。

> Partial<Type>  所有类型属性都变成可选的

> intersection type 联合类型



```tsx
import React from 'react';
import classNames from 'classnames';
import { SIZE, TYPE } from './typings';

export {
  SIZE,
  TYPE
};

interface UserProps {
  btnType?: TYPE;
  size?: SIZE;
  disabled?: boolean;
  className?: string;
  href?: string;
}

type ButtonProps = Partial<
  UserProps & 
  React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType, size, disabled, className, href, ...restProps
  } = props;

  const classnames = classNames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      'disabled': btnType === TYPE.LINK && disabled 
    },
    className,
  );

  return (
    <>
      {
        btnType === TYPE.LINK || href ? (
          <a
            className={ classnames }
            href={ href }
            { ...restProps }
          >
            { props.children }
          </a>
        ) : (
          <button
            className={ classnames }
            disabled={ disabled }
            { ...restProps }
          >
            { props.children }
          </button>
        )
      }
    </>
  );
}

Button.defaultProps = {
  disabled: false,
  btnType: TYPE.PRIMARY,
};

export default Button;
```

```scss
.btn {
  display: inline-block;
  padding: $btn-padding-y $btn-padding-x;
  border: $btn-border-width solid transparent;
  border-radius: $border-radius;
  box-shadow: $btn-box-shadow;
  background-color: transparent;
  font-size: $btn-font-size;
  color: $body-color;
  font-weight: $btn-font-weight;
  line-height: $btn-line-height;
  vertical-align: middle;
  font-family: $btn-font-family;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  transition: $btn-transition;
}
```

