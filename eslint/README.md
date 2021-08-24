# ESLint

## 规范化介绍

规范化是我们践行前端工程化中重要的一部分。

* 为什么要有规范化标准
* 哪里需要规范化标准
* 实施规划化的方法

### 为什么要有规范化标准

* 软件开发需要多人协同
* 不同开发者具有不同的编码习惯和喜好
* 不同的喜好增加项目维护成本
* 每个项目或者团队需要明确统一的标准

### 哪里需要规范化标准

* 代码、文档、提交日志等
* 开发过程中人为编写的成果
* 代码标准化规范最为重要

### 实施规范化的方法

* 编码前人为的标准约定
* 通过工具实现 Lint

## ESLint 介绍

目前最为主流的 JavaScript Lint 工具，用来检测 JS 代码质量。

ESLint 很容易统一开发者的编码风格。

ESLint 可以帮助开发者提升编码能力。

## ESLint 安装

* 初始化项目
* 安装 ESLint 模块为开发依赖
* 通过 CLI 命令验证安装结果

```js
yarn add eslint --save-dev
```

查看 eslint 版本号，可以使用多种方式

```js
.\node_modules\.bin\eslint -v

npx eslint -v
yarn eslint -v
```

## ESLint 快速上手

ESLint 检查步骤

* 编写 “问题” 代码
* 使用 eslint 执行检测
* 完成 eslint 配置

index.js

```js
const foo = 123;

function fn () {
  console.log('hello');

    console.log('eslint');
}

fn(;

syy();
```

初始化 eslint 配置，命令行交互的方式进行选择。

```js
npx eslint --init
```

使用 eslint 检查代码

```js
npx eslint .\index.js
```

修正后代码

```js
const foo = 123

console.log(foo)

function fn () {
  console.log('hello')
  console.log('eslint')
}

fn()

```

```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  }
}

```

## ESLint 配置文件解析

可以同时设置多个属性，以下属性不是互斥的。

| 属性                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| browser             | 浏览器中的全局变量                                           |
| node                | Node.js 全局变量和 Node.js 作用域                            |
| common.js           | CommonJS 全局变量和 CommonJS 作用域（用于 Broserify/Webpack 打包的只在浏览器运行的代码） |
| shared_node_browser | Node.js 和 Browser 通用全局变量                              |
| es6                 | 启动除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6） |
| worker              | Web Workers 全局变量                                         |
| amd                 | 将 requre() 和 define() 定义为像 amd 一样的全局变量          |
| mocha               | 添加所有的 Mocha 测试全局变量                                |
| jasmine             | 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量            |
| jest                | Jest 全局变量                                                |
| protractor          | Protractor 全局变量                                          |
| qunit               | Quint 全局变量                                               |
| jquery              | Jquery 全局变量                                              |
| prototype.js        | Prototype.js 全局变量                                        |
| shelljs             | ShellJS全局变量                                              |
| meteor              | Meteor 全局变量                                              |
| mongo               | MongoDB 全局变量                                             |
| applescript         | AppleScript 全局变量                                         |
| nashorn             | Java 8 Nashron 全局变量                                      |
| serviceworker       | Service Worker 全局变量                                      |
| atomtest            | Atom 全局变量                                                |
| embertest           | Ember 全局变量                                               |
| webextensions       | WebExtensions 全局变量                                       |
| greasemonkey        | GreaseMonkey 全局变量                                        |

## ESLint 配置注释

http://eslint.cn/docs/user-guide/configuring#configuring-rules

```js
const str = '${name} is a coder'; // eslint-disable-line no-template-curly-in-string

console.log(str);
```

```js
npx eslint ./index.js
```

## ESLint 结合自动化工具

* 集成之后，ESLint 一定会工作
* 项目统一，管理更加方便

```js
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'));
}

module.exports = {
  script
};
```

```js
npx eslint --init
```

```js
module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  },
  globals: {
    '$': 'readonly' 
  }
}

```

## ESLint 结合 webpack

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        exlcude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre'
      }
    ]
  }
}
```

```js
npm i eslint eslint-loader --sav-dev
npm i eslint-plugin-react --save-dev
```

```js
npx eslint --init
```

```js
module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard',
    'plugin:react/recommended' // 使用共享配置
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    // 'react/jsx-uses-react': 2, // 避免 React 引入不使用，JSX 编译后需要
    // 'react/jsx-uses-vars': 2
  },
 	// plugins: [
  //  'react'
  // ]
}
```

```js
npx webpack
```

## 现代化项目集成 ESLint

现代化项目基本都已经集成 ESLint，这里以 vue-cli 进行演示。

```js
npm install @vue/cli -g
```

```js
vue create vue-app-demo

// Lint on save：webpack 构建时校验，保存时校验
// Lint and fix on commit: 利用 git 钩子，提交代码前校验
```

## ESLint 检查 TypeScript

typescript lint，你可能还使用过 ts-lint，不过目前官方已经不再维护 ts-lint，建议使用 ESLint 配合 typescript 插件进行代码校验。

```js
npx eslint --int 

// 选择 eslint
```

```js
module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
```

## Stylelint 使用

css lint

*  提供默认的代码检查规则
* 提供 CLI 工具，可以快速调用
* 可以通过插件支持 Sass、Less、Postcss
* 支持 Gulp 或 webpack 集成

```js
npm install stylelint -D
npm install stylelint-config-standard -D
npm install stylelint-config-sass-guidelines -D
```

.stylelintrc.js

```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines'
  ]
}
```

```js
npx stylelint ./index.css
npx stylelint ./index.sass
```

## Prettier 使用

近两年，使用频率特别高的一款通用的、前端代码格式化工具。

它的功能很强大，几乎可以完成所有类型代码文件的格式化工作，我们可以使用它完成代码的自动格式化，还可以针对 Markdown 这一类的文档进行格式化操作。通过 Prettier，我们可以很容易的落实前端的规范化标准。

**css**

```js
npm i prettier -D
```

```js
npx prettier ./style.css
```

默认情况下会把格式化之后的代码输出到控制台中，如果想将格式化后的代码覆盖到源文件中

```js
npx prettier ./style.css --write
```

**所有文件**

```js
npx prettier . --write
```

不要过于依赖工具写出格式良好的代码，我们应该严格遵守格式，这是作为开发者的基本素质。

## Git Hooks 工具机制

通过 Git Hooks 在代码提交前强制 lint。

* Git Hook 也成称为 git 钩子，每个钩子都对应一个任务
* 通过 shell 脚本可以编写钩子任务触发时要具体执行的操作

.git/hooks/pre-commit

```js
#!/bin/sh
echo "before commit"
```

```js
git commit -m "perf: test"
```

## ESLint 结合 Git Hooks

很多前端开发者并不擅长使用 shell 脚本编写功能，我们可以使用 husky 实现 Git Hooks 的使用需求。

```js
npm install husky -D
```

package.json

```js
{
  "scripts": {
  	"lint": "eslint index.js"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

我们还可以使用 lint-stage 模块

```js
npm install lint-staged -D
```

package.json

```js
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit"
    }
  },
  "lint-staged": {
    "*.json": [
    	"eslint",
      'git add'
    ]
  }
}
```

