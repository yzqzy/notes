# Gulp

## 自动化构建概述

自动化构建就是把我们开发阶段写出来的源代码自动化的转换成生产代码的代码。

一般我们会把这个转化过程叫做自动化构建工作流。可以帮助我们尽可能脱离运行环境兼容带来的问题。

在开发阶段使用提高效率的语法、规范和标准。

* ECMAScript Next
* Sass
* 模板引擎

这些用法大都不被浏览器直接支持。自动化构建工具可以构建那些不被支持的特性。



## 自动化构建: css 转化案例

### 编写样式文件

```scss
$body-bg: #f8f9fb;
$body-color: #333;

body {
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
  background-color: $body-bg;
  color: $body-color;
}
```

### 安装 sass

```js
yarn add sass --dev
```

### 执行 sass 命令，构建样式

```js
.\node_modules\.bin\sass scss/main.scss css/style.css
```

### NPM Scripts

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/styles.css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "sass": "^1.37.5"
  }
}
```

script 会自动发现 node_modules 里面的命令

```js
yarn build
```

npm scripts 是实现自动化构建工作流的最简方式。

### 安装 browser-sync

```js
yarn add browser-sync --dev
```

```js
yarn serve
```

启动服务之前，可能样式还没有构建，我们可以使用 npm scrtips 的钩子机制。

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css",
    "preserve": "yarn build",
    "serve": "browser-sync ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "sass": "^1.37.5"
  }
}
```

### 实时监听文件变化

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "preserve": "yarn build",
    "serve": "browser-sync ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "sass": "^1.37.5"
  }
}
```

这样会存在问题，sass 监听会阻塞 serve 执行，我们需要 build 和 serve 同时执行。

```js
yarn add npm-run-all --dev
```

编写 scripts

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync .",
    "start": "run-p build serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "npm-run-all": "^4.1.5",
    "sass": "^1.37.5"
  }
}
```

```js
yarn start
```

实时监听文件变化并自动刷新

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync . --files \"css/*.css\"",
    "start": "run-p build serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "npm-run-all": "^4.1.5",
    "sass": "^1.37.5"
  }
}
```

## 常见的自动化构建工具

npm scripts 可以解决一定的自动化任务，但是针对于复杂的过程，npm scripts 就很吃力，这里我们就需要更加专业的构建工具。

* Grunt
  * 最早的前端构建系统，插件生态非常完善
  * Grunt 的插件几乎可以帮你完成任何事情，但是工作过程是基于临时文件（磁盘读写）实现的，构建速度相对较慢
* Gulp
  * 很好地解决了 Grunt 构建速度慢的问题，基于内存实现
  * 默认支持同时执行多个任务，效率比较高，使用方式相对 Grunt 更加直观易懂
  * 插件生态同样十分完善，目前市面上最流行的前端构建系统
* FIS
  * 百度的前端团队推出的一款构建系统
  * 相对于 Grunt 和 Gulp 微内核的特点，FIS 更像是一种捆绑套餐，把项目中典型需求集成到内部

初学者，可以使用 FIS，如果要求灵活多变，Gulp、Grunt 是更好的选择。

> 严格来说，webpack 是一个模块打包工具，不在讨论范围之类。

## Grunt

### 基本使用

初始化项目

```js
yarn init -y
```

安装 grunt 包

```js
yarn add grunt
```

创建 gruntfile 文件

```js
code gruntfile.js
```

定义 grunt 任务

```js
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，该函数接收一个 grunt 的形参，内部提供一些创建任务的 API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
}
```

执行 foo 任务，任务可以存在多个

```js
yarn grunt foo
```



任务描述信息，registerTask 第二个参数

```js
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，该函数接收一个 grunt 的形参，内部提供一些创建任务的 API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  });
}
```

```js
yarn grunt --help
```



如果注册任务的名称为 default，那么运行任务时，就不需要写任务抿成

```js
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，该函数接收一个 grunt 的形参，内部提供一些创建任务的 API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  });
  grunt.registerTask('default', () => {
    console.log('default task~');
  });
}
```

```js
yarn grunt 
```



default 一般用来依次执行其他任务

```js
module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  });
  // grunt.registerTask('default', () => {
  //   console.log('default task~');
  // });

  grunt.registerTask('default', ['foo', 'bar']);
}
```

```js
yarn grunt
```

 

grunt 异步任务

```js
grunt.registerTask('async-task', function () {
  const done = this.async();

  setTimeout(() => {
    console.log('async task working~');
    done();
  }, 1000);
});
```

```js
yarn grunt async-task
```

### 标记任务失败

return false 即可标记为任务失败

```js
module.exports = grunt => {
  grunt.registerTask('bad', () => {
    console.log('bad working~');
    return false;
  });
  grunt.registerTask('foo', () => {
    console.log('foo working~');
  });
  grunt.registerTask('default', ['bad', 'foo']);
}
```

任务失败后，后续任务不会执行。我们可以通过 --force 强制后续任务继续执行。

```js
yarn grunt --force
```

 

异步任务也可以标记失败，使用 done(false)

```js
grunt.registerTask('bad-async', function () {
  const done = this.async();

  setTimeout(() => {
    done(false);
  }, 1000);
});
```

### 配置方法

```js
module.exports = grunt => {
  grunt.initConfig({
    foo: {
      bar: 123
    }
  });

  grunt.registerTask('foo', () => {
    console.log(grunt.config('foo'));
    console.log(grunt.config('foo.bar'));
  });
}
```

```js
yarn grunt foo
```

### 多目标任务

```js
module.exports = grunt => {
  grunt.initConfig({
    build: {
      options: {
        foo: 'bar'
      },
      css: {
        options: {
          foo: 'baz'
        }
      },
      js: '2'
    }
  });

  // 多目标模式，可以让任务根据配置形成多个子任务
  grunt.registerMultiTask('build', function () {
    console.log('build task');
    console.log(this.options());
    console.log(`target: ${ this.target }, data: ${ this.data }`)
  });
}
```

运行目标任务

```js
yarn grunt build
```

运行指定目标任务

```js
yarn grunt build:css
```

### 插件使用

插件机制时 Grunt 机制的核心。很多构建任务都是通用的，所有由很多预设插件，插件内部封装了通用的构建任务。

一般来说，我们的构建过程都是由通用的构建任务组成。



安装 grunt-contrib-clean

```js
yarn add grunt-contrib-clean
```

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/app.js'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
}
```

```js
yarn grunt clean	
```



通配符配置

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/*.txt'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
}
```

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      // 清除所有子目录以及子目录下的文件
      temp: 'temp/**'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
}
```



使用 Grunt 插件

* 找到可使用插件，进行安装
* 加载插件任务（loadNpmTasks）
* initConfig 中为任务增加配置选项

### 常用插件

#### grunt-sass

```js
yarn add grunt-sass sass --dev
```

```js
const sass = require('sass');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
}
```

```js
yarn grunt sass 
```

#### grunt-babel

新特性支持，代码转化

```js
yarn add grunt-babel @babel/core @babel/preset-env --dev
```

减少 loadNpmTasks 使用

```js
yarn add load-grunt-tasks --dev
```

```js
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-sass');
  loadGruntTasks(grunt); // 自动加载所有的 grunt 插件任务
}
```

```js
yarn grunt babel
```

#### grunt-contrib-watch

```js
yarn add grunt-contrib-watch --dev
```

```js
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      },
    }
  });

  loadGruntTasks(grunt); // 自动加载所有的 grunt 插件任务

  grunt.registerTask('default', ['sass', 'babel', 'watch']);
}
```

```js
yarn grunt
```

## Gulp

Gulp 作为当下最流行的前端构建系统，其核心特点就是高效、易用。

### 基本使用

```js
yarn init -y
```

```js
yarn add gulp --dev
```

```js
code gulpfile.js
```

Gulp 最新版需要使用 done 标识任务结束。

```js
// gulp 入口文件

exports.foo = done => {
  console.log('foo task working');

  done(); // 标识任务完成
}

exports.default = done => {
  console.log('default task working');
  done();
}
```

gulp 4.0 之前注册 Gulp 任务需要通过 Gulp 模块内部的方法实现。Gulp 4.0 以后保留了这种方式。

```js
const gulp = require('gulp');

gulp.task('bar', done => {
  console.log('bar task working');

  done();
});
```

### 组合任务

```js
const { series, parallel } = require('gulp');

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working');
    done();
  }, 1000);
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working');
    done();
  }, 1000);
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working');
    done();
  }, 1000);
}

exports.foo = series(task1, task2, task3); // 串行执行
exports.bar = parallel(task1, task2, task3); // 并行执行
```

构建 JS、CSS 时可以使用 parallel。代码部署可以使用 series，部署前必须构建完毕。

### 异步任务

回调方式

```js
exports.callback = done => {
  console.log('callback task');
  done();
}

exports.callback = done => {
  console.log('callback task');
  done(new Error('task failed'));
}
```

Promise 方式

```js
exports.promise = () => {
  console.log('promise task');
  return Promise.resolve();
}

exports.promise = () => {
  console.log('promise task');
  return Promise.reject(new Error('task failed'));
}
```

async/await 方式

```js
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

exports.async = async () => {
  await timeout(1000);
  console.log('async task');
}
```

stream 方式

```js
exports.stream = () => {
  const readStream = fs.createReadStream('package.json');
  const wirteStream = fs.createWriteStream('temp.txt');

  readStream.pipe(wirteStream);

  return readStream;
}
```

### 构建过程

输入（读取流）	=>	加工（转换流）	=>	输出（写入流） 

```css
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

 html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}

```

```js
const fs = require('fs');
const { Transform } = require('stream');

exports.default = () => {
  const read = fs.createReadStream('normalize.css');
  const wirte = fs.createWriteStream('dist/normalize.min.css');

  // 代码转换
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString();
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
      callback(null, output);
    }
  })

  read
    .pipe(transform)
    .pipe(wirte);

  return read;
}
```

Gulp 官方定义就是 The streaming build system，基于流的构建系统。

Gulp 希望实现一个构建管道的概念，这样在后续扩展插件时就有很统一的方式。

### 文件操作 API

Gulp 已经提供的文件操作 API，相对于 node API，它更强大，更容易使用。

转换 CSS 代码

```js
yarn add gulp-clean-css --dev
```

修改扩展名

```js
yarn add gulp-rename --dev
```

gulpfile.js

```js
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'));
}
```

### 案例

```js
yarn add gulp --dev
```

```js
code gulpfile.js
```

#### 样式编译

```js
yarn add gulp-sass --dev
```

sass 只会转换非 _ 为前缀的代码。以 _ 为前缀的文件会被忽略掉。

```js
const { src, dest } = require('gulp');
const sass = require('gulp-sass');


const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

module.exports = {
  style
}
```

#### 脚本编译

```js
```

