# 手写webpack

##  打包库的基础设置

  webpack_papck

    npm link 把打包工具的包链接到全局，建立链接关系。

  webpack_demo

    测试webpack工具的功能。

    初始化项目

      npm init

      npm i webpack webpack-cli

    运行webpack

      npx webpack

    本地库链接

      npm link webpack_pack

    执行自定义包

      npx pack

## 编译过程、依赖关系

## AST递归解析、打包文件

  使用AST的工具

    webpack、Babel、ESLint、Rollup

  AST：Abstract Syntax Tree 抽象语法树

    JS源代码对应的一种树状的数据结构。

  使用AST时的四个步骤：

            Parse 解析  Source code -> AST  
    Input 

            Traverse 遍历 


            Manipulate 修改，操作，转换
    Output  

            Generate code 编译成正常代码

  免费AST解析（astexplorer.net），可以用它查看解析后的AST语法树的格式。

  编译AST树

    npm i babylon -D

  遍历AST树

    npm i @babel/traverse -D

  操作AST树

    npm i @babel/types -D

  将AST转换成JS代码

    npm i @babel/generator -D

  ejs 模板替换

    npm i ejs -D

## 添加loader、plugin

  npm i less -D

  npm i tapable -D

## loader的使用、babel-loader

  webpack中loader相关的概念。

  npm i --save-dev webpack webpack-cli

  使用自定义loader的方式

    1. 绝对路径引用

      module: {
        rules: [
          {
            test: /\.js$/,
            use: path.resolve(__dirname, 'loaders', 'loader-one')
          }
        ]
      }

    2. 别名的方式

      resolveLoader: {
        alias: {
          'loader-one': path.resolve(__dirname, 'loaders', 'loader-one')
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: 'loader-one'
          }
        ]
      }

    3. 配置模块查找范围

      resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: 'loader-one'
          }
        ]
      }

    多个loader的使用

      1. 字符串的方式

        rules: [
          {
            test: /\.js$/,
            use: [
              'loader-three',
              'loader-two',
              'loader-one'
            ]
          }
        ]

      数组中loader是自右向左执行的。

      2. 对象的方式

        rules: [
          {
            test: /\.js$/,
            use: 'loader-three',
          },
          {
            test: /\.js$/,
            use: 'loader-two'
          },
          {
            test: /\.js$/,
            use: 'loader-one'
          }
        ]

        rules中的解析顺序自下向上执行的。

      3. 自定义执行顺序

        webpack中loader的种类。

        pre normal inline post

        rules: [
          {
            test: /\.js$/,
            use: 'loader-one',
            enforce: 'pre'
          },
          {
            test: /\.js$/,
            use: 'loader-two'
          },
          {
            test: /\.js$/,
            use: 'loader-three',
            enforce: 'post'
          }
        ]

    inline loader是什么？

      js文件使用的loader。
                
      let str = require('inline-loader!./a.js');
      console.log(str);

      inline loader的3种使用语法

      1. loader前添加 !

        设置 ! 后，所有的normal loader都不会执行。

        require('!inline-loader!./a.js');

      2. loader前添加 !!

        设置 !! 后，所有的pre、normal、post loader都不会执行。

      3. loader前添加 -!

        设置 -! 后，所有的pre、normal loader不会执行。

    loader执行的阶段

      1. pitching 阶段

      2. normal 阶段

      use: [
        'a-loader',
        'b-loader',
        'c-loader'
      ]

      pitch 阶段

        a -> b -> c

      资源作为依赖将要被loader处理。

      normal 阶段

        c -> b -> a

      这样的执行顺序的前提条件是loader没有返回值。

      如果b-loader存在返回值，就不再执行c-loader的pitch阶段，可以起到阻断作用。
      loader执行时，也只会执行c-loader。


      代码演示：

        function loader (sourceCode) {
          console.log('loader one!');
          return sourceCode;
        }

        loader.pitch = function () {
          console.log('loader one pitch phase!');
        }

        module.exports = loader;


        function loader (sourceCode) {
          console.log('loader one!');
          return sourceCode;
        }

        loader.pitch = function () {
          console.log('loader one pitch phase!');
        }

        module.exports = loader;


        function loader (sourceCode) {
          console.log('loader three!');
          return sourceCode;
        }

        loader.pitch = function () {
          console.log('loader three pitch phase!');
        }

        module.exports = loader;


        // loader three pitch phase!
        // loader two pitch phase!
        // loader one pitch phase!
        // loader one!
        // loader two!
        // loader three!


        设置阻断

          loader.pitch = function () {
            console.log('loader two pitch phase!');
            return 'hello';
          }

          // loader three pitch phase!
          // loader two pitch phase!
          // loader three!

      loader的特性

        每个loader都只会完成一个任务，有利更加好的组合loader，让loader能够实现链式调用；
        loader是一个单独的模块；
        loader是无状态的，不应该存在条件的状态，应该是纯函数，保证代码是可预测的；

    实现 babel-loader

      使用 babel-loader 时需要安装

        npm i -D babel-loader @babel/core @babel/preset-env

      不需要安装babel-loader，只需要安装@babel/core @babel/preset-env。

        npm i @babel/core @babel/preset-env --save-dev

      使用webpack loaders的工具函数

        npm i loader-utils --save-dev

  ## loader API、处理图片

    自定义banner-loader

      检查options结构的模块  schema-utils

        npm i schema-utils --save-dev

      webpack监听文件变化

        watch: true

        可以配合wepack API搭配使用
          
          this.addDependency(filename);

      缓存相关API

        this.cacheable(false); // 不需要缓存

        this.cacheable && this.cacheable(); // 缓存，默认写法

    file-loader 实现

      按照图片生成MD5，提交到dist目录，返回转换后的路径

      const loaderUtils = require('loader-utils');

      function loader (sourceCode) {
        const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
          content: sourceCode
        });

        this.emitFile(filename, sourceCode);

        console.log(filename);

        return `module.exports = "${filename}"`;
      }

      // 二进制数据设置
      loader.raw = true;

      module.exports = loader;

    url-loader 实现

      图片格式处理 mime

        npm i mime --save-dev

  ## 样式相关的loader

    less-loader、css-loader、style-loader 实现

      npm i less --save-dev

    处理正常文件 less-loader、style-loader

      body {
        background-color: @background-color;
      }

    处理添加url的文件 css-loader、style-loader

      body {
        background: url('../images/logo.jpg');
        background-color: @background-color;
      }

  ## 同步异步插件、读取资源插件

    npm i webpack webpack-cli --save-dev

    同步插件

      class DonePlugin {
        apply (compiler) {
          compiler.hooks.done.tap('DonePlugin', (status) => {
            console.log('编译完成.');
          });
        }
      }

    异步插件

      1. 回调函数的方式

        apply (compiler) {
          compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
            setTimeout(() => {
              console.log('emit done.');
              cb();
            }, 3000)
          });
        }

      2. promise的方式
        
        apply (compiler) {
          compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log('emit done.');
                resolve();
              }, 3000);
            });
          });
        }

    编写资源读取插件

      用于记录 dist 目录下的文件大小及名称。

      使用WebpackHtmlPlugin

        npm i html-webpack-plugin --save-dev

  ## 内联插件、打包自动上传插件

    npm i --save-dev mini-css-extract-plugin css-loader

    内联插件
    
      将html-webpack-plugin引入的文件，设置成内联。
      减少JS文件和样式文件的请求。

    打包自动上传插件

      安装七牛模块

        npm i qiniu --save-dev