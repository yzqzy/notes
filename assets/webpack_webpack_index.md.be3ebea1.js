import{_ as e,c as a,o as n,a as r}from"./app.43850fcb.js";const m=JSON.parse('{"title":"WebPack","description":"","frontmatter":{},"headers":[{"level":2,"title":"webpack \u8BDE\u751F","slug":"webpack-\u8BDE\u751F"},{"level":2,"title":"\u4E3A\u4EC0\u4E48\u9700\u8981\u6784\u5EFA","slug":"\u4E3A\u4EC0\u4E48\u9700\u8981\u6784\u5EFA"},{"level":2,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528"},{"level":2,"title":"\u914D\u7F6E  package.json","slug":"\u914D\u7F6E-package-json"},{"level":2,"title":"\u914D\u7F6E webpack.config.js","slug":"\u914D\u7F6E-webpack-config-js"},{"level":2,"title":"ES6 \u7F16\u8BD1","slug":"es6-\u7F16\u8BD1"},{"level":2,"title":"CSS\u76F8\u5173","slug":"css\u76F8\u5173"},{"level":2,"title":"Less/Sass postcss \u56FE\u7247\u5904\u7406","slug":"less-sass-postcss-\u56FE\u7247\u5904\u7406"},{"level":2,"title":"\u5E38\u7528\u63D2\u4EF6\u3001\u751F\u6210HTML\u3001\u63D0\u53D6CSS\u3001\u6E05\u9664\u6587\u4EF6","slug":"\u5E38\u7528\u63D2\u4EF6\u3001\u751F\u6210html\u3001\u63D0\u53D6css\u3001\u6E05\u9664\u6587\u4EF6"},{"level":2,"title":"Webpack\u5F15\u5165\u5E93\u3001\u5B57\u4F53\u6587\u4EF6\u3001imports-loader","slug":"webpack\u5F15\u5165\u5E93\u3001\u5B57\u4F53\u6587\u4EF6\u3001imports-loader"},{"level":2,"title":"webpack-dev-server\u914D\u7F6E\u3001Eslint\u3001\u70ED\u66F4\u65B0","slug":"webpack-dev-server\u914D\u7F6E\u3001eslint\u3001\u70ED\u66F4\u65B0"},{"level":2,"title":"Webpack\u4F18\u5316\u3001tree-shaking\u3001purifycss","slug":"webpack\u4F18\u5316\u3001tree-shaking\u3001purifycss"}],"relativePath":"webpack/webpack/index.md"}'),s={name:"webpack/webpack/index.md"},t=r(`<h1 id="webpack" tabindex="-1">WebPack <a class="header-anchor" href="#webpack" aria-hidden="true">#</a></h1><h2 id="webpack-\u8BDE\u751F" tabindex="-1">webpack \u8BDE\u751F <a class="header-anchor" href="#webpack-\u8BDE\u751F" aria-hidden="true">#</a></h2><p>Tobias Koppers \u81EA\u7531\u8F6F\u4EF6\u5F00\u53D1\u8005\u3001\u5BB6\u4F4F\u5FB7\u56FD\u7EBD\u7EA6\u5821</p><p>GWT\uFF08Google Web Toolkit\uFF09</p><p>java\u5E94\u7528\u5230javascript SPA\u7F16\u8BD1\u5668\u8BA9java\u7A0B\u5E8F\u5458\u80FD\u7528</p><p>java\u7F16\u5199\u5BA2\u6237\u7AEF\u5E94\u7528\uFF0C\u5176\u4E2D\u5F88\u91CD\u8981\u7684\u4E00\u4E2A\u529F\u80FD\u5C31\u662F\u4EE3\u7801\u62C6\u5206</p><p>webpack\u8BDE\u751F\u4E4B\u521D\uFF0C\u76EE\u7684\u662F\u89E3\u51B3\u4EE3\u7801\u62C6\u5206\u95EE\u9898</p><h2 id="\u4E3A\u4EC0\u4E48\u9700\u8981\u6784\u5EFA" tabindex="-1">\u4E3A\u4EC0\u4E48\u9700\u8981\u6784\u5EFA <a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9700\u8981\u6784\u5EFA" aria-hidden="true">#</a></h2><p>\u5F00\u53D1\u5206\u5DE5\u3001\u6846\u67B6\u7684\u53D8\u5316\u3001\u8BED\u8A00\u7684\u53D8\u5316\u3001\u73AF\u5883\u7684\u53D8\u5316\u3001\u793E\u533A\u7684\u53D8\u5316\u3001\u5DE5\u5177\u7684\u53D8\u5316</p><pre><code>    \u6846\u67B6\u53D8\u5316\uFF1A JS\u5E93\u3001MVC\u65F6\u4EE3\u3001MVVM\u65F6\u4EE3
</code></pre><h2 id="\u4F7F\u7528" tabindex="-1">\u4F7F\u7528 <a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a></h2><p>npm install webpack webpack-cli -D</p><p>webpack --mode production \u751F\u4EA7\u6A21\u5F0F\u7F16\u8BD1</p><p>webpack --mode development \u5F00\u53D1\u6A21\u5F0F\u7F16\u8BD1</p><p>webpack --mode none</p><h2 id="\u914D\u7F6E-package-json" tabindex="-1">\u914D\u7F6E package.json <a class="header-anchor" href="#\u914D\u7F6E-package-json" aria-hidden="true">#</a></h2><p>&quot;build&quot;: &quot;webpack --mode production&quot; npm run build</p><p>&quot;dev&quot;: &quot;webpack --mode development&quot; npm run dev</p><p>&quot;build&quot;: &quot;webpack --mode production --watch&quot; --watch \u68C0\u6D4B\u6539\u53D8\u3001\u81EA\u52A8\u6253\u5305</p><p>&quot;build&quot;: &quot;webpack --mode production --watch --progress --display-reasons --colors&quot; --progress --display-reasons --colors \u67E5\u770B\u6253\u5305\u8FDB\u5EA6</p><p>\u914D\u7F6E dev-server\u3001\u4E5F\u53EF\u4EE5\u5B9E\u73B0\u81EA\u52A8\u66F4\u65B0</p><pre><code>npm i webpack-dev-server -D

&quot;dev&quot;: &quot;webpack-dev-server --mode development&quot;
</code></pre><h2 id="\u914D\u7F6E-webpack-config-js" tabindex="-1">\u914D\u7F6E webpack.config.js <a class="header-anchor" href="#\u914D\u7F6E-webpack-config-js" aria-hidden="true">#</a></h2><pre><code>const path = require(&#39;path&#39;);  

module.exports = {
    entry: &#39;/index.js&#39;,
    output: {
        path: path.resolve(__dirname, &#39;dist&#39;),
        filename: &#39;bundle.js&#39;
    }
}

entry: [&#39;./src/index.js&#39;] \u591A\u5165\u53E3\u3001\u53EF\u7528\u6570\u7EC4\u65B9\u5F0F\u8FDB\u884C\u914D\u7F6E

entry: {
    index: &#39;./src/index.js&#39;, \u591A\u5165\u53E3\u6587\u4EF6\u3001\u53EF\u7528\u5BF9\u8C61\u65B9\u5F0F\u8FDB\u884C\u914D\u7F6E
    newIndex: &#39;./src/newIndex.js&#39;
}

filename: &#39;[name].bundle.js&#39;
</code></pre><h2 id="es6-\u7F16\u8BD1" tabindex="-1">ES6 \u7F16\u8BD1 <a class="header-anchor" href="#es6-\u7F16\u8BD1" aria-hidden="true">#</a></h2><p>#\u901A\u8FC7babel\u7F16\u8BD1ES6\u8BED\u6CD5</p><pre><code>babel-core\uFF1A\u5C01\u88C5babel\u7F16\u8BD1\u65F6\u9700\u8981\u4F7F\u7528\u7684API
babel-loader: \u8D1F\u8D23ES6\u8BED\u6CD5\u8F6C\u5316\uFF0Cwebpack\u6253\u5305\u65F6\u4F7F\u7528babel-loader\u5904\u7406javascript\u6587\u4EF6

babel-loader 8.x \u5BF9\u5E94 babel-core 7.x
babel-loader 7.x \u5BF9\u5E94 babel-core 6.x
</code></pre><h1 id="presets" tabindex="-1">presets <a class="header-anchor" href="#presets" aria-hidden="true">#</a></h1><pre><code>\u53EA\u80FD\u89E3\u6790\u8BED\u6CD5

babel-preset-env \u7528\u4E8E\u7F16\u8BD1ES6\u8BED\u6CD5\uFF0C\u662F\u4E00\u4E2A\u65B0\u7684preset\uFF0C\u53EF\u4EE5\u6839\u636E\u914D\u7F6E\u7684\u76EE\u6807\u8FD0\u884C\u73AF\u5883\u81EA\u52A8\u542F\u7528\u9700\u8981\u7684babel\u63D2\u4EF6
babel-preset-es2015 \u7528\u4E8E\u7F16\u8BD1es6\u8BED\u6CD5
babel-preset-es2017 \u7528\u4E8E\u7F16\u8BD1es7\u8BED\u6CD5
babel-preset-latest \u7279\u6B8A\u7684presets\uFF0C\u5305\u62ECes2015\u3001es2016\u3001... es2017 (\u76EE\u524D\u5230es2017)
babel-preset-react \u7528\u4E8E\u7F16\u8BD1jsx\u548Cflow\u8BED\u6CD5\u52A0\u5165
babel-preset-stage-x\uFF08stage-0/1/2/3/4\uFF09

\u76EE\u524D\u4E0D\u540C\u7684\u6D4F\u89C8\u5668\u548C\u5E73\u53F0\uFF0C\u8FD9\u4E9Bes\u8FD0\u884C\u73AF\u5883\u5BF9es6\u3001es7\u3001es8 \u652F\u6301\u4E0D\u4E00\uFF0C\u4E3A\u4E86\u53D1\u6325\u65B0\u7248es\u7684\u7279\u6027\uFF0C\u9700\u8981\u5728\u7279\u5B9A\u7684\u5E73\u53F0\u6309\u9700\u8F6C\u7801

babel\u914D\u7F6E\u6587\u4EF6\u4E2D
{
    &quot;presets&quot;: [&quot;env&quot;]
}

targets 

  babel\u914D\u7F6E\u6587\u4EF6\u4E2D

    tagets \u6307\u5B9A\u8FD0\u884C\u73AF\u5883
    tagets.node \u6307\u5B9Anode\u7248\u672C
    tagets.browsers \u6307\u5B9A\u6D4F\u89C8\u5668\u7248\u672C
    modules \u6307\u5B9A\u4F55\u79CD\u5F62\u5F0F\u7684\u6A21\u5757\uFF0C\u8BBE\u7F6E\u4E3Afalse\u8868\u793A\u4E0D\u8F6C\u7801\u6A21\u5757
</code></pre><h1 id="babel-polyfill" tabindex="-1">babel-polyfill <a class="header-anchor" href="#babel-polyfill" aria-hidden="true">#</a></h1><pre><code>babel-polyfill
babel-plugin-transform-runtime
babel-runtime

babel-polyfill
  
  Babel \u9ED8\u8BA4\u53EA\u8F6C\u6362\u65B0\u7684JavaScript\u8BED\u6CD5\uFF08syntax\uFF09\uFF0C\u4E0D\u8F6C\u6362\u65B0\u7684API
  \u6BD4\u5982Generator\u3001Set\u3001Maps\u3001Symbol\u3001Promise\u7B49\u5168\u5C40\u5BF9\u8C61\uFF0C\u4EE5\u53CA\u4E00\u4E9B\u5B9A\u4E49\u5728\u5168\u5C40\u5BF9\u8C61\u4E0A\u7684\u65B9\u6CD5\uFF08\u6BD4\u5982Object.assign\uFF09\u90FD\u4E0D\u4F1A\u8F6C\u7801
  
  \u4F8B\u5982\uFF1AES6\u5728Array\u5BF9\u8C61\u7684Array.form\u65B9\u6CD5\u3002Babel\u5C31\u4E0D\u4F1A\u8F6C\u7801\u3002
  \u5982\u679C\u60F3\u5B9E\u73B0\u8F6C\u7801\uFF0C\u5FC5\u987B\u4F7F\u7528babel-polyfill\uFF0C\u4E3A\u5F53\u524D\u73AF\u5883\u63D0\u4F9B\u4E00\u4E2A\u57AB\u7247\uFF08\u57AB\u7247\uFF0C\u5404\u4E2A\u6D4F\u89C8\u5668\u4E4B\u95F4\u5BF9\u4E8E\u6807\u51C6\u5B9E\u73B0\u4E0D\u4E00\u81F4\uFF0C\u5B9E\u73B0\u57AB\u7247\u4FDD\u6301\u76F8\u540C\u7684API\uFF09

npm install babel-polyfill -D

\u4F7F\u7528\uFF1A

  1. \uFF08\u6D4F\u89C8\u5668\u73AF\u5883\uFF09\u5355\u72EC\u5728html\u7684&lt;head&gt;\u6807\u7B7E\u4E2D\u5F15\u5165babel-polyfill.js\uFF08CDN\u6216\u672C\u5730\u6587\u4EF6\u5747\u53EF\uFF09
  2. \u5728package.json\u4E2D\u6DFB\u52A0babel-polyfill\u4F9D\u8D56\uFF0C\u5728webpack\u914D\u7F6E\u6587\u4EF6\u589E\u52A0\u5165\u53E3\uFF1A
     \u5982entry: [&quot;babel-polyfill&quot;, &#39;./src/app.js&#39;] polyfill\u5C06\u4F1A\u88AB\u6253\u5305\u8FDB\u8FD9\u4E2A\u5165\u53E3\u6587\u4EF6\uFF0C\u800C\u4E14\u662F\u653E\u5728\u6700\u5F00\u59CB\u7684\u5730\u65B9
  3. \u5728package.json \u4E2D\u6DFB\u52A0babel-polyfill\u4F9D\u8D56\uFF0C\u5728webpack\u5165\u53E3\u6587\u4EF6\u9876\u90E8\u4F7F\u7528 import/require \u5F15\u5165\uFF0C\u5982 import &#39;babel-ployfill&#39;  

  \u4F18\u70B9\uFF1A\u4E00\u6B21\u6027\u89E3\u51B3\u6240\u6709\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u5E76\u4E14\u662F\u5168\u5C40\u7684\u3002
</code></pre><h1 id="transform-runtime" tabindex="-1">Transform-runtime <a class="header-anchor" href="#transform-runtime" aria-hidden="true">#</a></h1><pre><code>webpack\u4E2D\uFF0Cbabel-plugin-transform-runtime\u5B9E\u9645\u4E0A\u662F\u4F9D\u8D56babel-runtime.
\u56E0\u4E3Ababel\u7F16\u8BD1es6\u5230es5\u7684\u8FC7\u7A0B\u4E2D\uFF0Cbabel-plugin-transform-runtime\u8FD9\u4E2A\u63D2\u4EF6\u4F1A\u81EA\u52A8polyfill es5\u4E0D\u652F\u6301\u8FD9\u4E9B\u7279\u6027
\u8FD9\u4E9Bpolyfill\u5305\u5C31\u662F\u5728babel-runtime\u8FD9\u4E2A\u5305\u91CC
\u4F8B\u5982\uFF1Acore-js\u3001regenerator\u7B49polyfill

babel-runtime \u548C babel-plugin-transform-runtime \u7684\u533A\u522B\u662F\uFF0C\u76F8\u5F53\u524D\u8005\u662F\u624B\u52A8\u6321\uFF0C\u540E\u8005\u662F\u81EA\u52A8\u6321\u3002
\u6BCF\u5F53\u8981\u7F16\u8BD1\u4E00\u4E2Aapi\u65F6\u90FD\u8981\u624B\u52A8\u52A0\u4E0Arequire(&#39;babel-runtime&#39;)\uFF0C\u800Cbabel-plugin-transform-runtime\u4F1A\u7531\u5DE5\u5177\u81EA\u52A8\u6DFB\u52A0\uFF0C
\u4E3B\u8981\u7684\u529F\u80FD\u662F\u4E3Aapi\u63D0\u4F9B\u6C99\u7BB1\u7684\u57AB\u7247\u65B9\u6848\uFF0C\u4E0D\u4F1A\u6C61\u67D3\u5168\u5C40\u7684api\uFF0C\u56E0\u6B64\u9002\u5408\u7528\u5728\u7B2C\u4E09\u65B9\u7684\u5F00\u53D1\u4EA7\u54C1\u4E2D\u3002
</code></pre><h1 id="\u63D2\u4EF6-babel-runtime-\u4E0E-babel-plugin-transform-runtime" tabindex="-1">\u63D2\u4EF6 babel-runtime \u4E0E babel-plugin-transform-runtime <a class="header-anchor" href="#\u63D2\u4EF6-babel-runtime-\u4E0E-babel-plugin-transform-runtime" aria-hidden="true">#</a></h1><pre><code>package.json\u4E2D\u6DFB\u52A0\u4F9D\u8D56 babel-plugin-transform-runtime \u4EE5\u53CA babel-runtime
.babelrc\u4E2D\u914D\u7F6E\u63D2\u4EF6: &quot;plugins&quot;: [&quot;transform-runtime&quot;]
\u4EE3\u7801\u4E2D\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528ES6+\u7684\u65B0\u7279\u6027\uFF0C\u65E0\u9700import/require\u989D\u5916\u4E1C\u897F\uFF0Cwebpack\u4E5F\u4E0D\u9700\u8981\u989D\u5916\u914D\u7F6E

\u4F18\u70B9\uFF1A
  1. \u65E0\u5168\u5C40\u6C61\u67D3
  2. \u4F9D\u8D56\u7EDF\u4E00 \u6309\u9700\u5F15\u5165\uFF08polyfill\u662F\u5404\u4E2A\u6A21\u5757\u5171\u4EAB\u7684\uFF09\uFF0C\u65E0\u91CD\u590D\u5F15\u5165\uFF0C\u65E0\u591A\u4F59\u5F15\u5165
  3. \u9002\u5408\u7F16\u5199lib\uFF08\u7B2C\u4E09\u65B9\u5E93\uFF09\u7C7B\u578B\u7684\u4EE3\u7801
</code></pre><h2 id="css\u76F8\u5173" tabindex="-1">CSS\u76F8\u5173 <a class="header-anchor" href="#css\u76F8\u5173" aria-hidden="true">#</a></h2><h1 id="\u5904\u7406css" tabindex="-1">\u5904\u7406CSS <a class="header-anchor" href="#\u5904\u7406css" aria-hidden="true">#</a></h1><pre><code>style-loader \u662F\u4E3A\u4E86\u5728html\u4E2D\u4EE5style\u7684\u65B9\u5F0F\u5D4C\u5165css
css-loader \u901A\u8FC7require\u7684\u65B9\u5F0F\u5F15\u5165css\uFF0C\u7F16\u8BD1\u987A\u5E8F\u662F\u5148\u7528css-loader\u5C06css\u4EE3\u7801\u7F16\u8BD1\uFF0C\u518D\u4EA4\u7ED9style-loder\u63D2\u5165\u5230\u7F51\u9875\u4E2D\u53BB

file-loader \u5C06\u6587\u4EF6\uFF08\u4E00\u822C\u662F\u56FE\u7247\u6587\u4EF6\u4E3A\u4E3B\uFF0C\u5176\u4ED6\u7684\u5305\u62EC\u5B57\u4F53\u6587\u4EF6\u7B49\uFF09\uFF0C\u5728\u8FDB\u884C\u4E00\u4E9B\u5904\u7406\u540E\u79FB\u52A8\u6253\u5305\u540E\u7684\u76EE\u5F55\u4E2D\u3002
</code></pre><h1 id="style-loader\u5206\u7C7B" tabindex="-1">style-loader\u5206\u7C7B <a class="header-anchor" href="#style-loader\u5206\u7C7B" aria-hidden="true">#</a></h1><pre><code>style-loader\uFF1A\u914D\u5408css-loader\u4F7F\u7528\uFF0C\u4EE5&lt;style&gt;&lt;/style&gt;\u5F62\u5F0F\u5728html\u9875\u9762\u4E2D\u63D2\u5165css\u4EE3\u7801

style-loader/url\uFF1A\u4EE5link\u6807\u7B7E\u5F62\u5F0F\u5411html\u9875\u9762\u63D2\u5165\u4EE3\u7801\uFF0C\u91C7\u7528\u8FD9\u79CD\u65B9\u5F0F\u9700\u8981\u5C06css-loader\u53D8\u4E3Afile-loader\uFF0C\u4F46\u8FD9\u79CD\u65B9\u5F0F\u4E0D\u63A8\u8350\uFF0C
                  \u56E0\u4E3A\u5982\u679C\u5728\u4E00\u4E2Ajs\u6587\u4EF6\u4E2D\u5F15\u5165\u591A\u4E2Acss\u6587\u4EF6\u4F1A\u751F\u6210\u591A\u4E2Alink\u6807\u7B7E\uFF0C\u800Chtml\u6BCF\u4E2Alink\u6807\u7B7E\u90FD\u4F1A\u53D1\u9001\u4E00\u6B21\u7F51\u7EDC\u8BF7\u6C42\uFF0C
                  \u6240\u4EE5\u8FD9\u4E2D\u65B9\u5F0F\u5E76\u4E0D\u5EFA\u8BAE

style-loader/useable\uFF1A\u91C7\u7528\u8FD9\u79CD\u65B9\u5F0F\u5904\u7406css\uFF0C\u4F1A\u6709use()\u548Cunuse()\u4E24\u79CD\u65B9\u6CD5\uFF0Cuse()\u5F00\u542F\u5F15\u5165\u6837\u5F0F\uFF0Cunuse()\u4E0D\u9002\u7528\u6837\u5F0F
</code></pre><h1 id="loader\u914D\u7F6E\u9879-options" tabindex="-1">loader\u914D\u7F6E\u9879 options <a class="header-anchor" href="#loader\u914D\u7F6E\u9879-options" aria-hidden="true">#</a></h1><pre><code>attrs\uFF1Aattrs\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u4EE5\u952E\u503C\u5BF9\u51FA\u73B0\uFF0C\u5728&lt;style&gt;&lt;/style&gt;\u6807\u7B7E\u4E2D\u4EE5key-value\u5F62\u5F0F\u51FA\u73B0\uFF0C\u952E\u503C\u5BF9\u53EF\u4EE5\u81EA\u5B9A\u4E49\uFF0C\u4F46\u662F\u4F7F\u7528\u65F6\u5EFA\u8BAE\u8BED\u4E49\u5316
singleton\uFF1Atrue \u53EA\u7528\u4E00\u4E2A\u6807\u7B7E
insertAt \u6709\u4E24\u4E2A\u503C&#39;top|bottom&#39;\uFF0C\u5982\u679C\u4E0D\u914D\u7F6EinsertAt\uFF0C\u5219\u9ED8\u8BA4\u4E3Abottom
         \u5F53insertAt\u4E3A&#39;top&#39;\u65F6\uFF0Cloader\u6253\u5305\u7684css\u5C06\u4F18\u5148\u4E8E\u5DF2\u7ECF\u5B58\u5728\u7684css
insertInto \u63D2\u5165\u5230\u6307\u5B9A\u6807\u7B7E
transform \u51FD\u6570\u7684\u53C2\u6570\u662Fcss\uFF0C\u8FD9\u65F6\u6211\u4EEC\u62FF\u5230\u7684css\u6837\u5F0F\u662F\u4EE5\u5B57\u7B26\u4E32\u7684\u5F62\u5F0F\uFF0C\u6240\u4EE5\u53EF\u7528replace\u65B9\u6CD5\u4FEE\u6539\u6837\u5F0F\uFF0C
          transform.js\u901A\u8FC7style-loader\u6839\u636E\u9700\u8981\u5728css\u672A\u52A0\u8F7D\u5230\u9875\u9762\u4E4B\u524D\u4FEE\u6539\u6837\u5F0F\uFF0C\u5728\u51FD\u6570\u4E2D\u6211\u4EEC\u53EF\u4EE5\u83B7\u53D6\u5230\u6D4F\u89C8\u5668\u7684\u76F8\u5173\u4FE1\u606F\uFF0C
          \u6BD4\u5982window\uFF0Cnavigator\u7B49\uFF0C\u8FD9\u6709\u52A9\u4E8E\u6211\u4EEC\u6839\u636E\u76F8\u5173\u4FE1\u606F\u4FEE\u6539\u6837\u5F0F\u3002
</code></pre><h1 id="css-loader" tabindex="-1">css-loader <a class="header-anchor" href="#css-loader" aria-hidden="true">#</a></h1><pre><code>Minimize\uFF1Atrue or false \u662F\u5426\u5F00\u542Fcss\u4EE3\u7801\u538B\u7F29\uFF0C\u6BD4\u5982\u538B\u7F29\u7A7A\u683C\u4E0D\u6362\u884C
modules\uFF1A\u662F\u5426\u5F00\u542Fcss-modules
localIdentName\uFF1A
  [path]: \u8DEF\u5F84
  [name]: \u6587\u4EF6\u540D
  [local]: \u6837\u5F0F\u540D
  [hash: 5]: \u6587\u4EF6\u6807\u8BB0
Compose \u7EC4\u5408\u6837\u5F0F
</code></pre><h2 id="less-sass-postcss-\u56FE\u7247\u5904\u7406" tabindex="-1">Less/Sass postcss \u56FE\u7247\u5904\u7406 <a class="header-anchor" href="#less-sass-postcss-\u56FE\u7247\u5904\u7406" aria-hidden="true">#</a></h2><h1 id="postcss" tabindex="-1">postcss <a class="header-anchor" href="#postcss" aria-hidden="true">#</a></h1><pre><code>1. \u628ACSS\u89E3\u6790\u6210JavaScript\u53EF\u4EE5\u64CD\u4F5C\u7684\u62BD\u8C61\u8BED\u6CD5\u6811\u7ED3\u6784\uFF08Abstract Syntax Tree\uFF0CAST\uFF09
2. PostCSS\u662F\u4E00\u6B3E\u4F7F\u7528\u63D2\u4EF6\u53BB\u8F6C\u6362CSS\u7684\u5DE5\u5177
3. \u5E38\u7528\u63D2\u4EF6\uFF1A
   Autoprefixer\uFF1A\u4E3ACSS\u4E2D\u7684\u5C5E\u6027\u6DFB\u52A0\u6D4F\u89C8\u5668\u7279\u5B9A\u7684\u524D\u7F00
   postcss-cssnext\uFF1A\u4F7F\u7528CSS\u5C06\u6765\u7248\u672C\u53EF\u80FD\u4F1A\u52A0\u5165\u7684\u65B0\u7279\u6027
    * cssnext\u4E2D\u5DF2\u7ECF\u5305\u542B\u4E86\u5BF9Autoprefixer\u7684\u4F7F\u7528\uFF0C\u56E0\u6B64\u4F7F\u7528cssnext\u5C31\u4E0D\u518D\u9700\u8981\u4F7F\u7528Autoprefixer
   cssnano\uFF1A\u538B\u7F29\u4F18\u5316CSS
</code></pre><h1 id="less-sass" tabindex="-1">less / sass <a class="header-anchor" href="#less-sass" aria-hidden="true">#</a></h1><pre><code>Less\uFF1A\u662F\u4E00\u95E8CSS\u9884\u5904\u7406\u8BED\u8A00\uFF0C\u5B83\u6269\u5C55\u4E86CSS\u8BED\u8A00\uFF0C\u589E\u52A0\u4E86\u53D8\u91CF\uFF0CMixin\u3001\u51FD\u6570\u7B49\u7279\u6027
Sass\uFF1A\u662F\u6210\u719F\u3001\u7A33\u5B9A\u3001\u5F3A\u5927\u7684CSS\u6269\u5C55\u8BED\u8A00

npm i less less-loader -D
npm i node-sass sass-loader -D
</code></pre><h1 id="\u5904\u7406\u56FE\u7247" tabindex="-1">\u5904\u7406\u56FE\u7247 <a class="header-anchor" href="#\u5904\u7406\u56FE\u7247" aria-hidden="true">#</a></h1><pre><code>url-loader\uFF1A\u4F1A\u5C06\u5F15\u5165\u7684\u56FE\u7247\u7F16\u7801\uFF0C\u6839\u636E\u9700\u6C42\u9009\u62E9\u6027\u7684\u628A\u67D0\u4E9B\u5C0F\u56FE\u7247\u7F16\u7801\u6210base64\u683C\u5F0F\u5199\u8FDB\u9875\u9762\uFF1B\u4ECE\u800C\u51CF\u5C11\u670D\u52A1\u5668\u8BF7\u6C42\uFF0C\u4F18\u5316\u6027\u80FD\u3002
  * \u589E\u5F3A\u7248\u7684 file-loader\uFF1Aurl-loader \u5C01\u88C5\u4E86file-loader

url-loader\u5DE5\u4F5C\u5206\u4E3A\u4E24\u79CD\u60C5\u51B5\uFF1A
1. \u6587\u4EF6\u5927\u5C0F\u5C0F\u4E8Elimit\u53C2\u6570\uFF0Curl-loader\u5C06\u4F1A\u628A\u6587\u4EF6\u8F6C\u4E3ADateURL
2. \u6587\u4EF6\u5927\u5C0F\u5927\u4E8Elimit\uFF0Curl-loader\u4F1A\u8C03\u7528file-loader\u8FDB\u884C\u5904\u7406\uFF0C\u53C2\u6570\u4E5F\u4F1A\u76F4\u63A5\u4F20\u7ED9file-loader\u3002

npm i file-loader url-loader -D
</code></pre><h1 id="\u56FE\u7247\u538B\u7F29" tabindex="-1">\u56FE\u7247\u538B\u7F29 <a class="header-anchor" href="#\u56FE\u7247\u538B\u7F29" aria-hidden="true">#</a></h1><pre><code>npm i image-webpack-loader -D
</code></pre><h2 id="\u5E38\u7528\u63D2\u4EF6\u3001\u751F\u6210html\u3001\u63D0\u53D6css\u3001\u6E05\u9664\u6587\u4EF6" tabindex="-1">\u5E38\u7528\u63D2\u4EF6\u3001\u751F\u6210HTML\u3001\u63D0\u53D6CSS\u3001\u6E05\u9664\u6587\u4EF6 <a class="header-anchor" href="#\u5E38\u7528\u63D2\u4EF6\u3001\u751F\u6210html\u3001\u63D0\u53D6css\u3001\u6E05\u9664\u6587\u4EF6" aria-hidden="true">#</a></h2><h1 id="\u751F\u6210html" tabindex="-1">\u751F\u6210HTML <a class="header-anchor" href="#\u751F\u6210html" aria-hidden="true">#</a></h1><pre><code>HtmlWebpackPlugin \u53EF\u4EE5\u81EA\u52A8\u5F15\u5165\u6253\u5305\u597D\u7684JS\u6587\u4EF6
options:
  template\uFF1A\u672C\u5730\u6A21\u677F\u6587\u4EF6\u7684\u4F4D\u7F6E
  filename\uFF1A\u8F93\u5165\u6587\u4EF6\u7684\u6587\u4EF6\u540D\u79F0
  minfy\uFF1A\u538B\u7F29\u4EE3\u7801
  chunks\uFF1A\u5141\u8BB8\u63D2\u5165\u5230\u6A21\u677F\u4E2D\u7684\u4E00\u4E9Bchunk
  inject\uFF1A\u5411template\u6216\u8005templateContent\u4E2D\u6CE8\u5165\u6240\u6709\u9759\u6001\u8D44\u6E90
</code></pre><h1 id="\u5904\u7406html\u4E2D\u7684\u56FE\u7247" tabindex="-1">\u5904\u7406html\u4E2D\u7684\u56FE\u7247 <a class="header-anchor" href="#\u5904\u7406html\u4E2D\u7684\u56FE\u7247" aria-hidden="true">#</a></h1><pre><code>html-loader 
  options\uFF1A
    attrs: [img:src]

\u6E05\u9664\u6587\u4EF6\u63D2\u4EF6\uFF1A
  clean-webpack-plugin
</code></pre><h1 id="\u63D0\u53D6css\u6837\u5F0F" tabindex="-1">\u63D0\u53D6CSS\u6837\u5F0F <a class="header-anchor" href="#\u63D0\u53D6css\u6837\u5F0F" aria-hidden="true">#</a></h1><pre><code>1. extract-text-webpack-plugin@next 
   options: {
     fallback: \u5F53\u4E0D\u63D0\u53D6\u7684\u65F6\u5019\u7528\u4EC0\u4E48\u65B9\u5F0F\u52A0\u8F7D\u5230\u9875\u9762\u4E2D
     use\uFF1A\u63D0\u53D6\u7684\u65B9\u5F0F\u5904\u7406css
   }

2. minni-css-extract-
</code></pre><h2 id="webpack\u5F15\u5165\u5E93\u3001\u5B57\u4F53\u6587\u4EF6\u3001imports-loader" tabindex="-1">Webpack\u5F15\u5165\u5E93\u3001\u5B57\u4F53\u6587\u4EF6\u3001imports-loader <a class="header-anchor" href="#webpack\u5F15\u5165\u5E93\u3001\u5B57\u4F53\u6587\u4EF6\u3001imports-loader" aria-hidden="true">#</a></h2><h1 id="\u76F8\u5173\u63D2\u4EF6" tabindex="-1">\u76F8\u5173\u63D2\u4EF6 <a class="header-anchor" href="#\u76F8\u5173\u63D2\u4EF6" aria-hidden="true">#</a></h1><pre><code>webpack.ProvidePlugin
  ProvidePlugin \u662Fwebpack\u5185\u7F6E\u6A21\u5757
  \u4F7F\u7528ProvidePlugin\u52A0\u8F7D\u7684\u6A21\u5757\u5728\u4F7F\u7528\u65F6\u5C06\u4E0D\u518D\u9700\u8981import\u548Crequire\u8FDB\u884C\u5F15\u5165

imports-loader 
  \u5141\u8BB8\u4F7F\u7528\u4F9D\u8D56\u4E8E\u7279\u5B9A\u5168\u5C40\u53D8\u91CF\u7684\u6A21\u5757
  \u5BF9\u4E8E\u4F9D\u8D56\u5168\u5C40\u53D8\u91CF$\u6216this\u4F5C\u4E3Awindow\u5BF9\u8C61\u7684\u7B2C\u4E09\u65B9\u6A21\u5757\u975E\u5E38\u6709\u7528    
</code></pre><h2 id="webpack-dev-server\u914D\u7F6E\u3001eslint\u3001\u70ED\u66F4\u65B0" tabindex="-1">webpack-dev-server\u914D\u7F6E\u3001Eslint\u3001\u70ED\u66F4\u65B0 <a class="header-anchor" href="#webpack-dev-server\u914D\u7F6E\u3001eslint\u3001\u70ED\u66F4\u65B0" aria-hidden="true">#</a></h2><h1 id="webpack-dev-server" tabindex="-1">Webpack-dev-server <a class="header-anchor" href="#webpack-dev-server" aria-hidden="true">#</a></h1><pre><code>inline \u5185\u8054\u6A21\u5F0F/iframe\u6A21\u5F0F
open \u5728\u670D\u52A1\u5668\u542F\u52A8\u540E\u6253\u5F00\u6D4F\u89C8\u5668
hot \u542F\u7528webpack\u7684\u70ED\u6A21\u5757\u66FF\u6362\u529F\u80FD
port \u81EA\u5B9A\u4E49\u7AEF\u53E3
historyApiFallbcak \u4F7F\u7528HTML5\u5386\u53F2\u8BB0\u5F55API\u65F6\uFF0Cindex.html\u53EF\u80FD\u5FC5\u987B\u63D0\u4F9B\u8BE5\u9875\u9762\u4EE5\u66FF\u4EE3\u4EFB\u4F55404\u56DE\u590D
proxy \u5F53\u60A8\u62E5\u6709\u5355\u72EC\u7684API\u540E\u7AEF\u5F00\u53D1\u670D\u52A1\u670D\u52A1\u5668\u5E76\u4E14\u5E0C\u671B\u5728\u540C\u4E00\u57DF\u540D\u4E0A\u53D1\u9001API\u8BF7\u6C42\u65F6\uFF0C\u53EF\u7528\u6765\u4EE3\u7406\u67D0\u4E9BURL
overlay \u5F53\u5B58\u5728\u7F16\u8BD1\u5668\u9519\u8BEF\u6216\u8B66\u544A\u65F6\uFF0C\u5728\u6D4F\u89C8\u5668\u4E2D\u663E\u793A\u5168\u5C4F\u8986\u76D6
</code></pre><h1 id="proxy\u4EE3\u7406" tabindex="-1">proxy\u4EE3\u7406 <a class="header-anchor" href="#proxy\u4EE3\u7406" aria-hidden="true">#</a></h1><pre><code>target \u76EE\u6807\u63A5\u53E3
changeOrigin \u5982\u679C\u4E0D\u52A0\u5C31\u65E0\u6CD5\u8DF3\u8F6C\u8BF7\u6C42
logLevel \u65E5\u5FD7
</code></pre><h1 id="eslint\u8BED\u6CD5\u68C0\u6D4B" tabindex="-1">Eslint\u8BED\u6CD5\u68C0\u6D4B <a class="header-anchor" href="#eslint\u8BED\u6CD5\u68C0\u6D4B" aria-hidden="true">#</a></h1><pre><code>ESLint\u662F\u5728ECMAScript/JavaScript\u4EE3\u7801\u4E2D\u8BC6\u522B\u548C\u62A5\u544A\u6A21\u5F0F\u5339\u914D\u7684\u5DE5\u5177

\u4F8B\u5982\uFF1A
  1. \u4EE3\u7801\u4E2D\u4E0D\u80FD\u5B58\u5728\u591A\u884C\u7A7A\u683C
  2. tab\u952E\u4E0D\u80FD\u4F7F\u7528\uFF0C\u5FC5\u987B\u6362\u6210\u4E24\u4E2A\u7A7A\u683C
  3. \u4EE3\u7801\u4E2D\u4E0D\u80FD\u5B58\u5728\u58F0\u660E\u4F46\u672A\u4F7F\u7528\u7684\u53D8\u91CF
  ......
</code></pre><h1 id="eslint\u914D\u7F6E\u76F8\u5173\u63D2\u4EF6" tabindex="-1">Eslint\u914D\u7F6E\u76F8\u5173\u63D2\u4EF6 <a class="header-anchor" href="#eslint\u914D\u7F6E\u76F8\u5173\u63D2\u4EF6" aria-hidden="true">#</a></h1><pre><code>standard

\u76F8\u5173\u63D2\u4EF6\uFF1A
  eslint-config-standard
  eslint-plugin-promise
  eslint-plugin-html
  eslint-plugin-import 
  eslint-plugin-node
  eslint-plugin-standard
</code></pre><h2 id="webpack\u4F18\u5316\u3001tree-shaking\u3001purifycss" tabindex="-1">Webpack\u4F18\u5316\u3001tree-shaking\u3001purifycss <a class="header-anchor" href="#webpack\u4F18\u5316\u3001tree-shaking\u3001purifycss" aria-hidden="true">#</a></h2><h1 id="tree-shaking" tabindex="-1">Tree Shaking <a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a></h1><pre><code>JS tree shaking  
  uglifyjs-webpack-plugin

CSS tree shaking
  purifycss-webpack
  purify-css
  glob-all

  glob-all\u7684\u4F5C\u7528\u5C31\u662F\u5E2E\u52A9PurifyCSS\u8FDB\u884C\u8DEF\u5F84\u5904\u7406\uFF0C\u5B9A\u4F4D\u8981\u505ATreeShaking\u7684\u8DEF\u5F84\u6587\u4EF6 
</code></pre>`,75),l=[t];function i(o,d,c,p,h,b){return n(),a("div",null,l)}var f=e(s,[["render",i]]);export{m as __pageData,f as default};
