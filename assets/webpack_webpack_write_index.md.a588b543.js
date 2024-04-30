import{_ as e,o as n,c as o,Q as a}from"./chunks/framework.88002d8f.js";const m=JSON.parse('{"title":"手写webpack","description":"","frontmatter":{},"headers":[],"relativePath":"webpack/webpack_write/index.md","filePath":"webpack/webpack_write/index.md"}'),r={name:"webpack/webpack_write/index.md"},l=a(`<h1 id="手写webpack" tabindex="-1">手写webpack <a class="header-anchor" href="#手写webpack" aria-label="Permalink to &quot;手写webpack&quot;">​</a></h1><h2 id="打包库的基础设置" tabindex="-1">打包库的基础设置 <a class="header-anchor" href="#打包库的基础设置" aria-label="Permalink to &quot;打包库的基础设置&quot;">​</a></h2><p>webpack_papck</p><pre><code>npm link 把打包工具的包链接到全局，建立链接关系。
</code></pre><p>webpack_demo</p><pre><code>测试webpack工具的功能。

初始化项目

  npm init

  npm i webpack webpack-cli

运行webpack

  npx webpack

本地库链接

  npm link webpack_pack

执行自定义包

  npx pack
</code></pre><h2 id="编译过程、依赖关系" tabindex="-1">编译过程、依赖关系 <a class="header-anchor" href="#编译过程、依赖关系" aria-label="Permalink to &quot;编译过程、依赖关系&quot;">​</a></h2><h2 id="ast递归解析、打包文件" tabindex="-1">AST递归解析、打包文件 <a class="header-anchor" href="#ast递归解析、打包文件" aria-label="Permalink to &quot;AST递归解析、打包文件&quot;">​</a></h2><p>使用AST的工具</p><pre><code>webpack、Babel、ESLint、Rollup
</code></pre><p>AST：Abstract Syntax Tree 抽象语法树</p><pre><code>JS源代码对应的一种树状的数据结构。
</code></pre><p>使用AST时的四个步骤：</p><pre><code>        Parse 解析  Source code -&gt; AST  
Input 

        Traverse 遍历 


        Manipulate 修改，操作，转换
Output  

        Generate code 编译成正常代码
</code></pre><p>免费AST解析（astexplorer.net），可以用它查看解析后的AST语法树的格式。</p><p>编译AST树</p><pre><code>npm i babylon -D
</code></pre><p>遍历AST树</p><pre><code>npm i @babel/traverse -D
</code></pre><p>操作AST树</p><pre><code>npm i @babel/types -D
</code></pre><p>将AST转换成JS代码</p><pre><code>npm i @babel/generator -D
</code></pre><p>ejs 模板替换</p><pre><code>npm i ejs -D
</code></pre><h2 id="添加loader、plugin" tabindex="-1">添加loader、plugin <a class="header-anchor" href="#添加loader、plugin" aria-label="Permalink to &quot;添加loader、plugin&quot;">​</a></h2><p>npm i less -D</p><p>npm i tapable -D</p><h2 id="loader的使用、babel-loader" tabindex="-1">loader的使用、babel-loader <a class="header-anchor" href="#loader的使用、babel-loader" aria-label="Permalink to &quot;loader的使用、babel-loader&quot;">​</a></h2><p>webpack中loader相关的概念。</p><p>npm i --save-dev webpack webpack-cli</p><p>使用自定义loader的方式</p><pre><code>1. 绝对路径引用

  module: {
    rules: [
      {
        test: /\\.js$/,
        use: path.resolve(__dirname, &#39;loaders&#39;, &#39;loader-one&#39;)
      }
    ]
  }

2. 别名的方式

  resolveLoader: {
    alias: {
      &#39;loader-one&#39;: path.resolve(__dirname, &#39;loaders&#39;, &#39;loader-one&#39;)
    }
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        use: &#39;loader-one&#39;
      }
    ]
  }

3. 配置模块查找范围

  resolveLoader: {
    modules: [&#39;node_modules&#39;, path.resolve(__dirname, &#39;loaders&#39;)]
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        use: &#39;loader-one&#39;
      }
    ]
  }

多个loader的使用

  1. 字符串的方式

    rules: [
      {
        test: /\\.js$/,
        use: [
          &#39;loader-three&#39;,
          &#39;loader-two&#39;,
          &#39;loader-one&#39;
        ]
      }
    ]

  数组中loader是自右向左执行的。

  2. 对象的方式

    rules: [
      {
        test: /\\.js$/,
        use: &#39;loader-three&#39;,
      },
      {
        test: /\\.js$/,
        use: &#39;loader-two&#39;
      },
      {
        test: /\\.js$/,
        use: &#39;loader-one&#39;
      }
    ]

    rules中的解析顺序自下向上执行的。

  3. 自定义执行顺序

    webpack中loader的种类。

    pre normal inline post

    rules: [
      {
        test: /\\.js$/,
        use: &#39;loader-one&#39;,
        enforce: &#39;pre&#39;
      },
      {
        test: /\\.js$/,
        use: &#39;loader-two&#39;
      },
      {
        test: /\\.js$/,
        use: &#39;loader-three&#39;,
        enforce: &#39;post&#39;
      }
    ]

inline loader是什么？

  js文件使用的loader。
            
  let str = require(&#39;inline-loader!./a.js&#39;);
  console.log(str);

  inline loader的3种使用语法

  1. loader前添加 !

    设置 ! 后，所有的normal loader都不会执行。

    require(&#39;!inline-loader!./a.js&#39;);

  2. loader前添加 !!

    设置 !! 后，所有的pre、normal、post loader都不会执行。

  3. loader前添加 -!

    设置 -! 后，所有的pre、normal loader不会执行。

loader执行的阶段

  1. pitching 阶段

  2. normal 阶段

  use: [
    &#39;a-loader&#39;,
    &#39;b-loader&#39;,
    &#39;c-loader&#39;
  ]

  pitch 阶段

    a -&gt; b -&gt; c

  资源作为依赖将要被loader处理。

  normal 阶段

    c -&gt; b -&gt; a

  这样的执行顺序的前提条件是loader没有返回值。

  如果b-loader存在返回值，就不再执行c-loader的pitch阶段，可以起到阻断作用。
  loader执行时，也只会执行c-loader。


  代码演示：

    function loader (sourceCode) {
      console.log(&#39;loader one!&#39;);
      return sourceCode;
    }

    loader.pitch = function () {
      console.log(&#39;loader one pitch phase!&#39;);
    }

    module.exports = loader;


    function loader (sourceCode) {
      console.log(&#39;loader one!&#39;);
      return sourceCode;
    }

    loader.pitch = function () {
      console.log(&#39;loader one pitch phase!&#39;);
    }

    module.exports = loader;


    function loader (sourceCode) {
      console.log(&#39;loader three!&#39;);
      return sourceCode;
    }

    loader.pitch = function () {
      console.log(&#39;loader three pitch phase!&#39;);
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
        console.log(&#39;loader two pitch phase!&#39;);
        return &#39;hello&#39;;
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
</code></pre><h2 id="loader-api、处理图片" tabindex="-1">loader API、处理图片 <a class="header-anchor" href="#loader-api、处理图片" aria-label="Permalink to &quot;loader API、处理图片&quot;">​</a></h2><pre><code>自定义banner-loader

  检查options结构的模块  schema-utils

    npm i schema-utils --save-dev

  webpack监听文件变化

    watch: true

    可以配合wepack API搭配使用
      
      this.addDependency(filename);

  缓存相关API

    this.cacheable(false); // 不需要缓存

    this.cacheable &amp;&amp; this.cacheable(); // 缓存，默认写法

file-loader 实现

  按照图片生成MD5，提交到dist目录，返回转换后的路径

  const loaderUtils = require(&#39;loader-utils&#39;);

  function loader (sourceCode) {
    const filename = loaderUtils.interpolateName(this, &#39;[hash].[ext]&#39;, {
      content: sourceCode
    });

    this.emitFile(filename, sourceCode);

    console.log(filename);

    return \`module.exports = &quot;\${filename}&quot;\`;
  }

  // 二进制数据设置
  loader.raw = true;

  module.exports = loader;

url-loader 实现

  图片格式处理 mime

    npm i mime --save-dev
</code></pre><h2 id="样式相关的loader" tabindex="-1">样式相关的loader <a class="header-anchor" href="#样式相关的loader" aria-label="Permalink to &quot;样式相关的loader&quot;">​</a></h2><pre><code>less-loader、css-loader、style-loader 实现

  npm i less --save-dev

处理正常文件 less-loader、style-loader

  body {
    background-color: @background-color;
  }

处理添加url的文件 css-loader、style-loader

  body {
    background: url(&#39;../images/logo.jpg&#39;);
    background-color: @background-color;
  }
</code></pre><h2 id="同步异步插件、读取资源插件" tabindex="-1">同步异步插件、读取资源插件 <a class="header-anchor" href="#同步异步插件、读取资源插件" aria-label="Permalink to &quot;同步异步插件、读取资源插件&quot;">​</a></h2><pre><code>npm i webpack webpack-cli --save-dev

同步插件

  class DonePlugin {
    apply (compiler) {
      compiler.hooks.done.tap(&#39;DonePlugin&#39;, (status) =&gt; {
        console.log(&#39;编译完成.&#39;);
      });
    }
  }

异步插件

  1. 回调函数的方式

    apply (compiler) {
      compiler.hooks.emit.tapAsync(&#39;AsyncPlugin&#39;, (compilation, cb) =&gt; {
        setTimeout(() =&gt; {
          console.log(&#39;emit done.&#39;);
          cb();
        }, 3000)
      });
    }

  2. promise的方式
    
    apply (compiler) {
      compiler.hooks.emit.tapPromise(&#39;AsyncPlugin&#39;, (compilation) =&gt; {
        return new Promise((resolve, reject) =&gt; {
          setTimeout(() =&gt; {
            console.log(&#39;emit done.&#39;);
            resolve();
          }, 3000);
        });
      });
    }

编写资源读取插件

  用于记录 dist 目录下的文件大小及名称。

  使用WebpackHtmlPlugin

    npm i html-webpack-plugin --save-dev
</code></pre><h2 id="内联插件、打包自动上传插件" tabindex="-1">内联插件、打包自动上传插件 <a class="header-anchor" href="#内联插件、打包自动上传插件" aria-label="Permalink to &quot;内联插件、打包自动上传插件&quot;">​</a></h2><pre><code>npm i --save-dev mini-css-extract-plugin css-loader

内联插件

  将html-webpack-plugin引入的文件，设置成内联。
  减少JS文件和样式文件的请求。

打包自动上传插件

  安装七牛模块

    npm i qiniu --save-dev
</code></pre>`,41),d=[l];function t(p,s,c,i,u,h){return n(),o("div",null,d)}const k=e(r,[["render",t]]);export{m as __pageData,k as default};
