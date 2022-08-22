import{_ as e,c as n,o as a,a as o}from"./app.b96ffa22.js";const m=JSON.parse('{"title":"\u624B\u5199webpack","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6253\u5305\u5E93\u7684\u57FA\u7840\u8BBE\u7F6E","slug":"\u6253\u5305\u5E93\u7684\u57FA\u7840\u8BBE\u7F6E"},{"level":2,"title":"\u7F16\u8BD1\u8FC7\u7A0B\u3001\u4F9D\u8D56\u5173\u7CFB","slug":"\u7F16\u8BD1\u8FC7\u7A0B\u3001\u4F9D\u8D56\u5173\u7CFB"},{"level":2,"title":"AST\u9012\u5F52\u89E3\u6790\u3001\u6253\u5305\u6587\u4EF6","slug":"ast\u9012\u5F52\u89E3\u6790\u3001\u6253\u5305\u6587\u4EF6"},{"level":2,"title":"\u6DFB\u52A0loader\u3001plugin","slug":"\u6DFB\u52A0loader\u3001plugin"},{"level":2,"title":"loader\u7684\u4F7F\u7528\u3001babel-loader","slug":"loader\u7684\u4F7F\u7528\u3001babel-loader"},{"level":2,"title":"loader API\u3001\u5904\u7406\u56FE\u7247","slug":"loader-api\u3001\u5904\u7406\u56FE\u7247"},{"level":2,"title":"\u6837\u5F0F\u76F8\u5173\u7684loader","slug":"\u6837\u5F0F\u76F8\u5173\u7684loader"},{"level":2,"title":"\u540C\u6B65\u5F02\u6B65\u63D2\u4EF6\u3001\u8BFB\u53D6\u8D44\u6E90\u63D2\u4EF6","slug":"\u540C\u6B65\u5F02\u6B65\u63D2\u4EF6\u3001\u8BFB\u53D6\u8D44\u6E90\u63D2\u4EF6"},{"level":2,"title":"\u5185\u8054\u63D2\u4EF6\u3001\u6253\u5305\u81EA\u52A8\u4E0A\u4F20\u63D2\u4EF6","slug":"\u5185\u8054\u63D2\u4EF6\u3001\u6253\u5305\u81EA\u52A8\u4E0A\u4F20\u63D2\u4EF6"}],"relativePath":"webpack/webpack_write/index.md"}'),r={name:"webpack/webpack_write/index.md"},l=o(`<h1 id="\u624B\u5199webpack" tabindex="-1">\u624B\u5199webpack <a class="header-anchor" href="#\u624B\u5199webpack" aria-hidden="true">#</a></h1><h2 id="\u6253\u5305\u5E93\u7684\u57FA\u7840\u8BBE\u7F6E" tabindex="-1">\u6253\u5305\u5E93\u7684\u57FA\u7840\u8BBE\u7F6E <a class="header-anchor" href="#\u6253\u5305\u5E93\u7684\u57FA\u7840\u8BBE\u7F6E" aria-hidden="true">#</a></h2><p>webpack_papck</p><pre><code>npm link \u628A\u6253\u5305\u5DE5\u5177\u7684\u5305\u94FE\u63A5\u5230\u5168\u5C40\uFF0C\u5EFA\u7ACB\u94FE\u63A5\u5173\u7CFB\u3002
</code></pre><p>webpack_demo</p><pre><code>\u6D4B\u8BD5webpack\u5DE5\u5177\u7684\u529F\u80FD\u3002

\u521D\u59CB\u5316\u9879\u76EE

  npm init

  npm i webpack webpack-cli

\u8FD0\u884Cwebpack

  npx webpack

\u672C\u5730\u5E93\u94FE\u63A5

  npm link webpack_pack

\u6267\u884C\u81EA\u5B9A\u4E49\u5305

  npx pack
</code></pre><h2 id="\u7F16\u8BD1\u8FC7\u7A0B\u3001\u4F9D\u8D56\u5173\u7CFB" tabindex="-1">\u7F16\u8BD1\u8FC7\u7A0B\u3001\u4F9D\u8D56\u5173\u7CFB <a class="header-anchor" href="#\u7F16\u8BD1\u8FC7\u7A0B\u3001\u4F9D\u8D56\u5173\u7CFB" aria-hidden="true">#</a></h2><h2 id="ast\u9012\u5F52\u89E3\u6790\u3001\u6253\u5305\u6587\u4EF6" tabindex="-1">AST\u9012\u5F52\u89E3\u6790\u3001\u6253\u5305\u6587\u4EF6 <a class="header-anchor" href="#ast\u9012\u5F52\u89E3\u6790\u3001\u6253\u5305\u6587\u4EF6" aria-hidden="true">#</a></h2><p>\u4F7F\u7528AST\u7684\u5DE5\u5177</p><pre><code>webpack\u3001Babel\u3001ESLint\u3001Rollup
</code></pre><p>AST\uFF1AAbstract Syntax Tree \u62BD\u8C61\u8BED\u6CD5\u6811</p><pre><code>JS\u6E90\u4EE3\u7801\u5BF9\u5E94\u7684\u4E00\u79CD\u6811\u72B6\u7684\u6570\u636E\u7ED3\u6784\u3002
</code></pre><p>\u4F7F\u7528AST\u65F6\u7684\u56DB\u4E2A\u6B65\u9AA4\uFF1A</p><pre><code>        Parse \u89E3\u6790  Source code -&gt; AST  
Input 

        Traverse \u904D\u5386 


        Manipulate \u4FEE\u6539\uFF0C\u64CD\u4F5C\uFF0C\u8F6C\u6362
Output  

        Generate code \u7F16\u8BD1\u6210\u6B63\u5E38\u4EE3\u7801
</code></pre><p>\u514D\u8D39AST\u89E3\u6790\uFF08<a href="http://astexplorer.net" target="_blank" rel="noopener noreferrer">astexplorer.net</a>\uFF09\uFF0C\u53EF\u4EE5\u7528\u5B83\u67E5\u770B\u89E3\u6790\u540E\u7684AST\u8BED\u6CD5\u6811\u7684\u683C\u5F0F\u3002</p><p>\u7F16\u8BD1AST\u6811</p><pre><code>npm i babylon -D
</code></pre><p>\u904D\u5386AST\u6811</p><pre><code>npm i @babel/traverse -D
</code></pre><p>\u64CD\u4F5CAST\u6811</p><pre><code>npm i @babel/types -D
</code></pre><p>\u5C06AST\u8F6C\u6362\u6210JS\u4EE3\u7801</p><pre><code>npm i @babel/generator -D
</code></pre><p>ejs \u6A21\u677F\u66FF\u6362</p><pre><code>npm i ejs -D
</code></pre><h2 id="\u6DFB\u52A0loader\u3001plugin" tabindex="-1">\u6DFB\u52A0loader\u3001plugin <a class="header-anchor" href="#\u6DFB\u52A0loader\u3001plugin" aria-hidden="true">#</a></h2><p>npm i less -D</p><p>npm i tapable -D</p><h2 id="loader\u7684\u4F7F\u7528\u3001babel-loader" tabindex="-1">loader\u7684\u4F7F\u7528\u3001babel-loader <a class="header-anchor" href="#loader\u7684\u4F7F\u7528\u3001babel-loader" aria-hidden="true">#</a></h2><p>webpack\u4E2Dloader\u76F8\u5173\u7684\u6982\u5FF5\u3002</p><p>npm i --save-dev webpack webpack-cli</p><p>\u4F7F\u7528\u81EA\u5B9A\u4E49loader\u7684\u65B9\u5F0F</p><pre><code>1. \u7EDD\u5BF9\u8DEF\u5F84\u5F15\u7528

  module: {
    rules: [
      {
        test: /\\.js$/,
        use: path.resolve(__dirname, &#39;loaders&#39;, &#39;loader-one&#39;)
      }
    ]
  }

2. \u522B\u540D\u7684\u65B9\u5F0F

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

3. \u914D\u7F6E\u6A21\u5757\u67E5\u627E\u8303\u56F4

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

\u591A\u4E2Aloader\u7684\u4F7F\u7528

  1. \u5B57\u7B26\u4E32\u7684\u65B9\u5F0F

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

  \u6570\u7EC4\u4E2Dloader\u662F\u81EA\u53F3\u5411\u5DE6\u6267\u884C\u7684\u3002

  2. \u5BF9\u8C61\u7684\u65B9\u5F0F

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

    rules\u4E2D\u7684\u89E3\u6790\u987A\u5E8F\u81EA\u4E0B\u5411\u4E0A\u6267\u884C\u7684\u3002

  3. \u81EA\u5B9A\u4E49\u6267\u884C\u987A\u5E8F

    webpack\u4E2Dloader\u7684\u79CD\u7C7B\u3002

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

inline loader\u662F\u4EC0\u4E48\uFF1F

  js\u6587\u4EF6\u4F7F\u7528\u7684loader\u3002
            
  let str = require(&#39;inline-loader!./a.js&#39;);
  console.log(str);

  inline loader\u76843\u79CD\u4F7F\u7528\u8BED\u6CD5

  1. loader\u524D\u6DFB\u52A0 !

    \u8BBE\u7F6E ! \u540E\uFF0C\u6240\u6709\u7684normal loader\u90FD\u4E0D\u4F1A\u6267\u884C\u3002

    require(&#39;!inline-loader!./a.js&#39;);

  2. loader\u524D\u6DFB\u52A0 !!

    \u8BBE\u7F6E !! \u540E\uFF0C\u6240\u6709\u7684pre\u3001normal\u3001post loader\u90FD\u4E0D\u4F1A\u6267\u884C\u3002

  3. loader\u524D\u6DFB\u52A0 -!

    \u8BBE\u7F6E -! \u540E\uFF0C\u6240\u6709\u7684pre\u3001normal loader\u4E0D\u4F1A\u6267\u884C\u3002

loader\u6267\u884C\u7684\u9636\u6BB5

  1. pitching \u9636\u6BB5

  2. normal \u9636\u6BB5

  use: [
    &#39;a-loader&#39;,
    &#39;b-loader&#39;,
    &#39;c-loader&#39;
  ]

  pitch \u9636\u6BB5

    a -&gt; b -&gt; c

  \u8D44\u6E90\u4F5C\u4E3A\u4F9D\u8D56\u5C06\u8981\u88ABloader\u5904\u7406\u3002

  normal \u9636\u6BB5

    c -&gt; b -&gt; a

  \u8FD9\u6837\u7684\u6267\u884C\u987A\u5E8F\u7684\u524D\u63D0\u6761\u4EF6\u662Floader\u6CA1\u6709\u8FD4\u56DE\u503C\u3002

  \u5982\u679Cb-loader\u5B58\u5728\u8FD4\u56DE\u503C\uFF0C\u5C31\u4E0D\u518D\u6267\u884Cc-loader\u7684pitch\u9636\u6BB5\uFF0C\u53EF\u4EE5\u8D77\u5230\u963B\u65AD\u4F5C\u7528\u3002
  loader\u6267\u884C\u65F6\uFF0C\u4E5F\u53EA\u4F1A\u6267\u884Cc-loader\u3002


  \u4EE3\u7801\u6F14\u793A\uFF1A

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


    \u8BBE\u7F6E\u963B\u65AD

      loader.pitch = function () {
        console.log(&#39;loader two pitch phase!&#39;);
        return &#39;hello&#39;;
      }

      // loader three pitch phase!
      // loader two pitch phase!
      // loader three!

  loader\u7684\u7279\u6027

    \u6BCF\u4E2Aloader\u90FD\u53EA\u4F1A\u5B8C\u6210\u4E00\u4E2A\u4EFB\u52A1\uFF0C\u6709\u5229\u66F4\u52A0\u597D\u7684\u7EC4\u5408loader\uFF0C\u8BA9loader\u80FD\u591F\u5B9E\u73B0\u94FE\u5F0F\u8C03\u7528\uFF1B
    loader\u662F\u4E00\u4E2A\u5355\u72EC\u7684\u6A21\u5757\uFF1B
    loader\u662F\u65E0\u72B6\u6001\u7684\uFF0C\u4E0D\u5E94\u8BE5\u5B58\u5728\u6761\u4EF6\u7684\u72B6\u6001\uFF0C\u5E94\u8BE5\u662F\u7EAF\u51FD\u6570\uFF0C\u4FDD\u8BC1\u4EE3\u7801\u662F\u53EF\u9884\u6D4B\u7684\uFF1B

\u5B9E\u73B0 babel-loader

  \u4F7F\u7528 babel-loader \u65F6\u9700\u8981\u5B89\u88C5

    npm i -D babel-loader @babel/core @babel/preset-env

  \u4E0D\u9700\u8981\u5B89\u88C5babel-loader\uFF0C\u53EA\u9700\u8981\u5B89\u88C5@babel/core @babel/preset-env\u3002

    npm i @babel/core @babel/preset-env --save-dev

  \u4F7F\u7528webpack loaders\u7684\u5DE5\u5177\u51FD\u6570

    npm i loader-utils --save-dev
</code></pre><h2 id="loader-api\u3001\u5904\u7406\u56FE\u7247" tabindex="-1">loader API\u3001\u5904\u7406\u56FE\u7247 <a class="header-anchor" href="#loader-api\u3001\u5904\u7406\u56FE\u7247" aria-hidden="true">#</a></h2><pre><code>\u81EA\u5B9A\u4E49banner-loader

  \u68C0\u67E5options\u7ED3\u6784\u7684\u6A21\u5757  schema-utils

    npm i schema-utils --save-dev

  webpack\u76D1\u542C\u6587\u4EF6\u53D8\u5316

    watch: true

    \u53EF\u4EE5\u914D\u5408wepack API\u642D\u914D\u4F7F\u7528
      
      this.addDependency(filename);

  \u7F13\u5B58\u76F8\u5173API

    this.cacheable(false); // \u4E0D\u9700\u8981\u7F13\u5B58

    this.cacheable &amp;&amp; this.cacheable(); // \u7F13\u5B58\uFF0C\u9ED8\u8BA4\u5199\u6CD5

file-loader \u5B9E\u73B0

  \u6309\u7167\u56FE\u7247\u751F\u6210MD5\uFF0C\u63D0\u4EA4\u5230dist\u76EE\u5F55\uFF0C\u8FD4\u56DE\u8F6C\u6362\u540E\u7684\u8DEF\u5F84

  const loaderUtils = require(&#39;loader-utils&#39;);

  function loader (sourceCode) {
    const filename = loaderUtils.interpolateName(this, &#39;[hash].[ext]&#39;, {
      content: sourceCode
    });

    this.emitFile(filename, sourceCode);

    console.log(filename);

    return \`module.exports = &quot;\${filename}&quot;\`;
  }

  // \u4E8C\u8FDB\u5236\u6570\u636E\u8BBE\u7F6E
  loader.raw = true;

  module.exports = loader;

url-loader \u5B9E\u73B0

  \u56FE\u7247\u683C\u5F0F\u5904\u7406 mime

    npm i mime --save-dev
</code></pre><h2 id="\u6837\u5F0F\u76F8\u5173\u7684loader" tabindex="-1">\u6837\u5F0F\u76F8\u5173\u7684loader <a class="header-anchor" href="#\u6837\u5F0F\u76F8\u5173\u7684loader" aria-hidden="true">#</a></h2><pre><code>less-loader\u3001css-loader\u3001style-loader \u5B9E\u73B0

  npm i less --save-dev

\u5904\u7406\u6B63\u5E38\u6587\u4EF6 less-loader\u3001style-loader

  body {
    background-color: @background-color;
  }

\u5904\u7406\u6DFB\u52A0url\u7684\u6587\u4EF6 css-loader\u3001style-loader

  body {
    background: url(&#39;../images/logo.jpg&#39;);
    background-color: @background-color;
  }
</code></pre><h2 id="\u540C\u6B65\u5F02\u6B65\u63D2\u4EF6\u3001\u8BFB\u53D6\u8D44\u6E90\u63D2\u4EF6" tabindex="-1">\u540C\u6B65\u5F02\u6B65\u63D2\u4EF6\u3001\u8BFB\u53D6\u8D44\u6E90\u63D2\u4EF6 <a class="header-anchor" href="#\u540C\u6B65\u5F02\u6B65\u63D2\u4EF6\u3001\u8BFB\u53D6\u8D44\u6E90\u63D2\u4EF6" aria-hidden="true">#</a></h2><pre><code>npm i webpack webpack-cli --save-dev

\u540C\u6B65\u63D2\u4EF6

  class DonePlugin {
    apply (compiler) {
      compiler.hooks.done.tap(&#39;DonePlugin&#39;, (status) =&gt; {
        console.log(&#39;\u7F16\u8BD1\u5B8C\u6210.&#39;);
      });
    }
  }

\u5F02\u6B65\u63D2\u4EF6

  1. \u56DE\u8C03\u51FD\u6570\u7684\u65B9\u5F0F

    apply (compiler) {
      compiler.hooks.emit.tapAsync(&#39;AsyncPlugin&#39;, (compilation, cb) =&gt; {
        setTimeout(() =&gt; {
          console.log(&#39;emit done.&#39;);
          cb();
        }, 3000)
      });
    }

  2. promise\u7684\u65B9\u5F0F
    
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

\u7F16\u5199\u8D44\u6E90\u8BFB\u53D6\u63D2\u4EF6

  \u7528\u4E8E\u8BB0\u5F55 dist \u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u5927\u5C0F\u53CA\u540D\u79F0\u3002

  \u4F7F\u7528WebpackHtmlPlugin

    npm i html-webpack-plugin --save-dev
</code></pre><h2 id="\u5185\u8054\u63D2\u4EF6\u3001\u6253\u5305\u81EA\u52A8\u4E0A\u4F20\u63D2\u4EF6" tabindex="-1">\u5185\u8054\u63D2\u4EF6\u3001\u6253\u5305\u81EA\u52A8\u4E0A\u4F20\u63D2\u4EF6 <a class="header-anchor" href="#\u5185\u8054\u63D2\u4EF6\u3001\u6253\u5305\u81EA\u52A8\u4E0A\u4F20\u63D2\u4EF6" aria-hidden="true">#</a></h2><pre><code>npm i --save-dev mini-css-extract-plugin css-loader

\u5185\u8054\u63D2\u4EF6

  \u5C06html-webpack-plugin\u5F15\u5165\u7684\u6587\u4EF6\uFF0C\u8BBE\u7F6E\u6210\u5185\u8054\u3002
  \u51CF\u5C11JS\u6587\u4EF6\u548C\u6837\u5F0F\u6587\u4EF6\u7684\u8BF7\u6C42\u3002

\u6253\u5305\u81EA\u52A8\u4E0A\u4F20\u63D2\u4EF6

  \u5B89\u88C5\u4E03\u725B\u6A21\u5757

    npm i qiniu --save-dev
</code></pre>`,41),d=[l];function t(s,p,c,i,h,u){return a(),n("div",null,d)}var g=e(r,[["render",t]]);export{m as __pageData,g as default};
