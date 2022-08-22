import{_ as s,c as n,o as a,a as p}from"./app.4f650dee.js";const d=JSON.parse('{"title":"NPM","description":"","frontmatter":{},"headers":[{"level":2,"title":"Node\u6A21\u5757\u3001\u5E38\u7528\u547D\u4EE4\u3001SEMVER\u89C4\u8303","slug":"node\u6A21\u5757\u3001\u5E38\u7528\u547D\u4EE4\u3001semver\u89C4\u8303"},{"level":2,"title":"package-lock\u3001License \u534F\u8BAE","slug":"package-lock\u3001license-\u534F\u8BAE"},{"level":3,"title":"package-lock.json","slug":"package-lock-json"},{"level":3,"title":"\u5F00\u6E90\u534F\u8BAE","slug":"\u5F00\u6E90\u534F\u8BAE"},{"level":2,"title":"package.json \u5E38\u7528\u914D\u7F6E\u9879\u8BE6\u89E3","slug":"package-json-\u5E38\u7528\u914D\u7F6E\u9879\u8BE6\u89E3"},{"level":2,"title":"scripts \u811A\u672C\u547D\u4EE4\u4EE5\u53CA\u4F7F\u7528\u6280\u5DE7","slug":"scripts-\u811A\u672C\u547D\u4EE4\u4EE5\u53CA\u4F7F\u7528\u6280\u5DE7"},{"level":2,"title":"dependencies\u4F9D\u8D56\u5206\u7C7B","slug":"dependencies\u4F9D\u8D56\u5206\u7C7B"},{"level":2,"title":"npm\u53D1\u5E03\u3001\u7248\u672C\u7BA1\u7406\u3001\u5E9F\u5F03\u4E0E\u5220\u9664","slug":"npm\u53D1\u5E03\u3001\u7248\u672C\u7BA1\u7406\u3001\u5E9F\u5F03\u4E0E\u5220\u9664"},{"level":2,"title":"\u7F16\u5199 markdown \u6587\u6863","slug":"\u7F16\u5199-markdown-\u6587\u6863"}],"relativePath":"npm/base/index.md"}'),l={name:"npm/base/index.md"},e=p(`<h1 id="npm" tabindex="-1">NPM <a class="header-anchor" href="#npm" aria-hidden="true">#</a></h1><h2 id="node\u6A21\u5757\u3001\u5E38\u7528\u547D\u4EE4\u3001semver\u89C4\u8303" tabindex="-1">Node\u6A21\u5757\u3001\u5E38\u7528\u547D\u4EE4\u3001SEMVER\u89C4\u8303 <a class="header-anchor" href="#node\u6A21\u5757\u3001\u5E38\u7528\u547D\u4EE4\u3001semver\u89C4\u8303" aria-hidden="true">#</a></h2><p>Node\u6A21\u5757\uFF08mode_modules\uFF09</p><p>Node\u73AF\u5883\uFF1A\u4E00\u4E2A\u5728Node\u73AF\u5883\u4E0B\u5F00\u53D1\u7684\u9879\u76EE\uFF0C\u6A21\u5757\u53EF\u80FD\u662F\u4E00\u4E2A\u5E93\u3001\u6846\u67B6\u6216\u8005\u662F\u9879\u76EE\u4F9D\u8D56\u3001\u751A\u81F3\u662F\u4E00\u4E2A\u9879\u76EE\uFF0CNode\u73AF\u5883\u5C31\u662F\u8BA9\u8FD9\u4E9B\u6A21\u5757\u6210\u529F\u8FD0\u884C\u8D77\u6765\u7684\u670D\u52A1\u63D0\u4F9B\u65B9\u3002</p><p>package.json\uFF1A\u63CF\u8FF0node\u6A21\u5757\u7684\u6587\u4EF6\uFF0C\u5305\u542B\u591A\u9879\u5BF9Node\u6A21\u5757\u7684\u8BF4\u660E\u4E0E\u914D\u7F6E\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm init </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm init </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm init </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm set init</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yueluo</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> uninstall</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm install xxx@</span><span style="color:#F78C6C;">1.1</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm rebuild xxx </span><span style="color:#676E95;font-style:italic;">// \u91CD\u65B0\u6784\u5EFA\u6A21\u5757</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm update xxxx or npm update </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">g xxx </span><span style="color:#676E95;font-style:italic;">// \u66F4\u65B0\u6A21\u5757</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm search xxx </span><span style="color:#676E95;font-style:italic;">// \u641C\u7D22\u6A21\u5757</span></span>
<span class="line"></span></code></pre></div><pre><code>semver \u89C4\u8303 - version
Semantic Versioning\uFF1A\u8BED\u4E49\u5316\u89C4\u8303
\u79CD\u7C7B\uFF1A\u56FA\u5B9A\u7248\u672C\u3001\u8303\u56F4\u7248\u672C

version\uFF1Ax.x.x.x\uFF08\u4E3B\u7248\u672C.\u6B21\u7248\u672C.\u4FEE\u8BA2\u7248\u672C-\u65E5\u671F\u7248\u672C_\u5E0C\u814A\u5B57\u6BCD\uFF09

MAJOR.MINOR.PATCH-alphabel
</code></pre><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">1.3.2-20200507_alpha</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>\u4E3B\u7248\u672C\uFF1A\u591A\u4E2A\u529F\u80FD\u3001API\u3001UI\u7B49\u505A\u4E86\u5927\u8303\u56F4\u5347\u7EA7\u4E14\u4E00\u822C\u4E0D\u5411\u540E\uFF08\u5411\u4E0B\uFF09\u517C\u5BB9\u3002</li><li>\u6B21\u7248\u672C\uFF1A\u529F\u80FD\u6216API\u65B0\u589E\uFF0CUI\u589E\u5F3A\uFF0C\u5411\u540E\u517C\u5BB9\u3002</li><li>\u4FEE\u8BA2\u7248\uFF1A\u95EE\u9898\uFF08Bug\uFF09\u4FEE\u590D\u3001\u5C11\u91CF\u529F\u80FD\u5347\u7EA7\u8865\u4E01\u4E14\u5411\u4E0B\u517C\u5BB9</li></ul><p>\u4E3B\u677F\u672C\u53F7\u5347\u7EA7\uFF0C\u6B21\u7248\u672C\u4E0E\u4FEE\u8BA2\u7248\u672C\u53F7\u5F520\uFF0C\u6B21\u7248\u672C\u53F7\u5347\u7EA7\uFF0C\u4FEE\u8BA2\u7248\u672C\u53F7\u5F520\u3002</p><p>\u5148\u884C\u7248\u672C\u53F7\uFF08Pre-release version\uFF09</p><p>Base\uFF1A\u4EC5\u5B9E\u73B0\u9879\u76EE\u7684\u57FA\u672C\u67B6\u6784 Alpha\uFF1A\u521D\u7EA7\u7248\u672C\u3001\u6D4B\u8BD5\u7B2C\u4E00\u9636\u6BB5\uFF0C\u5B9E\u73B0\u529F\u80FD\uFF0C\u4FEE\u590D\u4E25\u91CDBUG\uFF0C\u5185\u90E8\u5F00\u53D1\u4EBA\u5458\u4EA4\u6D41\u7248\u672C</p><pre><code>Beta\uFF1A\u4E2D\u7EA7\u6D4B\u8BD5\u3001\u6D4B\u8BD5\u7B2C\u4E8C\u9636\u6BB5\uFF0C\u5B9E\u73B0UI\uFF0C\u8FDB\u4E00\u6B65\u4FEE\u6539\u529F\u80FD\u6027BUG\uFF0C\u53EF\u53D1\u5E03\u6D4B\u8BD5

RC\uFF08Release Candidate\uFF09\uFF1A\u6700\u7EC8\u6D4B\u8BD5\u7248\uFF0C\u5019\u9009\u7248\u672C\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u4E00\u4E9B\u5C40\u90E8\u7684\u5C0FBUG\uFF0C
\u53EF\u53D1\u5E03RC2\u8FDB\u884C\u8FDB\u4E00\u6B65BUG\u4FEE\u6539\uFF0C\u8FD1\u4F3C\u4E8E\u6B63\u5F0F\u7248\u672C\u3002

Release\uFF1A\u6B63\u5F0F\u7248\uFF0C\u4EA4\u4ED8\u7248\u672C\uFF0C\u6807\u51C6\u7248\uFF08stable\uFF09

release x 1.0.0
release x 1.0.0_stable\uFF08web\u5F00\u53D1\u4E0D\u5E38\u7528\uFF09  
</code></pre><p>\u4F9D\u8D56\u7248\u672C\u53F7</p><pre><code>^1.2.0 -&gt; \u4E3B\u7248\u672C\u56FA\u5B9A\uFF081\uFF09 

\u4E3B\u7248\u672C\u53F71\u56FA\u5B9A\uFF0C\u4E14\u9075\u5FAA\u4E0D\u5C0F\u4E8E\u6B21\u7248\u672C\u53F7\uFF0C\u5982\u6B21\u7248\u672C\u53F7\u76F8\u7B49\uFF0C\u5219\u9700\u4E0D\u5C0F\u4E8E\u4FEE\u8BA2\u7248\u672C\u53F7\u3002

\u6CE8\u610F\uFF1Anpm install \u4F1A\u5B89\u88C5\u4E3B\u7248\u672C\u53F7\u56FA\u5B9A\u4E0B\u7684\u6700\u65B0\u7248\u672C

^1.3.0 ^1.4.0 \u7B49\u7B49


~\uFF1A~1.2.0 \u4E3B\u7248\u672C\u53F71\u56FA\u5B9A\uFF0C\u6B21\u7248\u672C\u53F72\u56FA\u5B9A\uFF0C\u4E14\u9075\u5FAA\u4E0D\u5C0F\u4E8E\u4FEE\u8BA2\u7248\u672C\u53F7\u3002

~1.2.5 -&gt; 1.2.6


&gt;\u3001&lt;\u3001=\u3001&gt;=\u3001&lt;=\u3001-\uFF1A\u7248\u672C\u8303\u56F4

&gt; 3.2   &lt; 2.2   2.0.3-2.1.0        
</code></pre><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;">\uFF1A\u6216\u9009\u62E9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">^</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3.2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3.4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">3.1</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">3.5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...</span></span>
<span class="line"></span></code></pre></div><pre><code>x\u3001*\uFF1A\u901A\u914D

4.x\uFF1A\u5BF9\u5E94\u4E3B\u7248\u672C\u53F74\u7684\u6240\u6709\u7248\u672C\u53F7\uFF0C\u6B21\u7248\u672C\u53F7\u3001\u4FEE\u8BA2\u7248\u672C\u53F7\u4E0D\u5B9A
*\uFF1A\u6240\u6709\u7248\u672C\u53F7
</code></pre><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">0.1.0_base</span></span>
<span class="line"><span style="color:#A6ACCD;">0.1.1\uFF080.1.1_alpha web\u5F00\u53D1\u53EF\u4EE5\u4E0D\u6DFB\u52A0alpha\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">0.1.2</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">0.1.9  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">version 0.1.x</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><pre><code>\u65B0\u589E \u529F\u80FD1
\u65B0\u589E \u529F\u80FD2
</code></pre><p>version 0.1.9</p><pre><code>\u4FEE\u590D xxx
\u4FEE\u590D xxx
</code></pre><p>version 0.2.1</p><pre><code>\u65B0\u589E xxx
\u4FEE\u590D xxx
</code></pre><h2 id="package-lock\u3001license-\u534F\u8BAE" tabindex="-1">package-lock\u3001License \u534F\u8BAE <a class="header-anchor" href="#package-lock\u3001license-\u534F\u8BAE" aria-hidden="true">#</a></h2><h3 id="package-lock-json" tabindex="-1">package-lock.json <a class="header-anchor" href="#package-lock-json" aria-hidden="true">#</a></h3><p>\u4FDD\u5B58\u5F53\u524D\u5B89\u88C5\u4F9D\u8D56\u7684\u6765\u6E90\u53CA\u7248\u672C\u53F7</p><p>\u7248\u672C\u53D8\u52A8\u89C4\u5219\uFF1A</p><p>install \u6307\u5B9A\u7248\u672C\uFF1A\u81EA\u52A8\u66F4\u65B0 package-lock.json \u5BF9\u5E94\u7684\u7248\u672C</p><p>install \u8303\u56F4\u7248\u672C</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">\u7248\u672C\u5C0F\u4E8E\u7B49\u4E8E package-lock.json \u4E2D\u5BF9\u5E94\u7684\u7248\u672C\u65F6\uFF0C\u5B89\u88C5 package-lock.json \u4E2D\u7684\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7248\u672C\u5927\u4E8E package-lock.json \u4E2D\u7684\u5BF9\u5E94\u7684\u7248\u672C\u65F6\uFF0C\u5B89\u88C5\u8303\u56F4\u7248\u672C\u53F7\u4E2D\u6700\u9AD8\u7684\u7248\u672C\uFF0C\u5E76\u66F4\u65B0 package-lock.json \u4E2D\u5BF9\u5E94\u7684\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">npm i babel-loader@7.1.1 -&gt; \u81EA\u52A8\u66F4\u65B0 package-lock.json -&gt; \u5B89\u88C57.1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">babel-loader\uFF1A^7.1.1 </span></span>
<span class="line"><span style="color:#A6ACCD;">package-lock.json 7.3.1 -&gt; \u5B89\u88C57.3.1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">babel-loader\uFF1A^7.5.1  </span></span>
<span class="line"><span style="color:#A6ACCD;">package-lock.json 7.3.1 -&gt; \u5B89\u88C5\u4E3B\u7248\u672C\u56FA\u5B9A\u7684\u6700\u9AD8\u7248\u672C\uFF0C\u6BD4\u5982 7.8.1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="\u5F00\u6E90\u534F\u8BAE" tabindex="-1">\u5F00\u6E90\u534F\u8BAE <a class="header-anchor" href="#\u5F00\u6E90\u534F\u8BAE" aria-hidden="true">#</a></h3><p>\u5F00\u6E90\u534F\u8BAE\uFF1A\u8BF4\u660E\u6388\u6743\u4ED6\u4EBA\u4F7F\u7528\u88AB\u5F00\u6E90\u7684\u9879\u76EE\u6709\u54EA\u4E9B\u6743\u5229</p><p>\u534F\u8BAE\u67E5\u8BE2\uFF1A<a href="https://opensource.org/licenses/alphabetical" target="_blank" rel="noopener noreferrer">https://opensource.org/licenses/alphabetical</a></p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">license</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;license&quot;\uFF1A&quot;MIT&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;license&quot;\uFF1A&quot;(MIT or GPL)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;license&quot;\uFF1A&quot;SEE LINCENSE IN LICENSE_xxx.txt&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;license&quot;\uFF1A&quot;UNLICENSED&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="bsd\u534F\u8BAE" tabindex="-1">BSD\u534F\u8BAE <a class="header-anchor" href="#bsd\u534F\u8BAE" aria-hidden="true">#</a></h4><p>Berkeley SoftWare Distrubution\uFF1A\u4F2F\u514B\u5229\u8F6F\u4EF6\u53D1\u884C\u7248</p><p>\u81EA\u7531\u4F7F\u7528\u3001\u4FEE\u6539\u6E90\u7801\u3001\u4FEE\u6539\u540E\u5F00\u6E90\u6216\u8005\u518D\u53D1\u5E03</p><p>\u4E09\u5927\u6761\u4EF6\uFF1A</p><ul><li>\u518D\u53D1\u5E03\u7684\u4EA7\u54C1\u5305\u542B\u6E90\u7801\uFF0C\u5219\u5FC5\u987B\u643A\u5E26\u539F\u6765\u7684BSD\u534F\u8BAE</li><li>\u518D\u53D1\u5E03\u4E8C\u8FDB\u5236\u7C7B\u5E93\u6216\u8F6F\u4EF6\uFF0C\u5176\u5185\u90E8\u5FC5\u987B\u643A\u5E26\u539F\u6765\u7684BSD\u534F\u8BAE</li><li>\u7981\u6B62\u7528\u539F\u6E90\u7801\u4F5C\u4E1A\u6216\u673A\u6784\u3001\u539F\u4EA7\u54C1\u540D\u79F0\u505A\u5E02\u573A\u63A8\u5E7F</li></ul><h4 id="apache\u534F\u8BAE" tabindex="-1">Apache\u534F\u8BAE <a class="header-anchor" href="#apache\u534F\u8BAE" aria-hidden="true">#</a></h4><p>Apache Licence 2.0\uFF1AApache \u5F00\u6E90\u534F\u8BAE2.0</p><p>\u81EA\u7531\u4F7F\u7528\u3001\u4FEE\u6539\u6E90\u7801\u3001\u4FEE\u6539\u540E\u5F00\u6E90\u6216\u518D\u53D1\u5E03\uFF08\u5546\u4E1A\u8F6F\u4EF6\uFF09</p><p>\u4E09\u5927\u6761\u4EF6\uFF1A</p><ul><li>\u4FEE\u6539\u6E90\u7801\uFF0C\u5FC5\u987B\u5728\u6E90\u7801\u6240\u5728\u6587\u4EF6\u4E2D\u8FDB\u884C\u8BF4\u660E</li><li>\u4FEE\u6539\u6216\u62D3\u5C55\u7684\u4EE3\u7801\u4E2D\uFF0C\u5FC5\u987B\u643A\u5E26\u539F\u534F\u8BAE\u3001\u5546\u6807\u3001\u4E13\u5229\u58F0\u660E\u548C\u4F5C\u8005\u8981\u6C42\u5305\u542B\u7684\u8BF4\u660E\u4FE1\u606F</li><li>\u5982\u679C\u4F7F\u7528\u6E90\u7801\u540E\u518D\u53D1\u5E03\u7684\u4EA7\u54C1\u4E2D\u5305\u542B\u8BF4\u660E\u6587\u4EF6\uFF0C\u8BE5\u8BF4\u660E\u6587\u4EF6\u5FC5\u987B\u643A\u5E26Apache License\u4E14\u4E0D\u80FD\u66F4\u6539</li></ul><h4 id="gpl\u534F\u8BAE" tabindex="-1">GPL\u534F\u8BAE <a class="header-anchor" href="#gpl\u534F\u8BAE" aria-hidden="true">#</a></h4><p>GPL\uFF1AGNU Genaral Public License\uFF08Linux\uFF09\uFF1A\u901A\u7528\u516C\u5171\u8BB8\u53EF\u8BC1</p><p>GNU \u4E00\u79CD\u81EA\u7531\u7684\u64CD\u4F5C\u7CFB\u7EDF\u3002</p><p>\u81EA\u7531\u4F7F\u7528\u3001\u4FEE\u6539\u3001\u62D3\u5C55\u6E90\u7801\u3001\u4FEE\u6539\u540E\u5F00\u6E90\u6216\u518D\u53D1\u5E03</p><p>\u4E00\u5927\u6761\u4EF6\uFF1A\u5FC5\u987B\u5F00\u6E90\u514D\u8D39\uFF08\u4E0D\u53EF\u4EE5\u5546\u4E1A\u5316\uFF09</p><h4 id="lgpl\u534F\u8BAE" tabindex="-1">LGPL\u534F\u8BAE <a class="header-anchor" href="#lgpl\u534F\u8BAE" aria-hidden="true">#</a></h4><p>LGPL\uFF1AGUN Lesser General Public License\uFF1A\u5BBD\u901A\u7528\u516C\u5171\u8BB8\u53EF\u8BC1</p><p>\u9488\u5BF9\u7C7B\u5E93\uFF0C\u81EA\u7531\u5F15\u7528\uFF0C\u65E0\u9700\u5F00\u6E90\uFF0C\u53EF\u53D1\u5E03\u4E0E\u9500\u552E</p><h4 id="mit\u534F\u8BAE" tabindex="-1">MIT\u534F\u8BAE <a class="header-anchor" href="#mit\u534F\u8BAE" aria-hidden="true">#</a></h4><p>MIT\uFF1AMassachusetts Institute Of Technology \uFF08\u9EBB\u7701\u7406\u5DE5\u5B66\u9662\uFF09</p><p>\u81EA\u7531\u4F7F\u7528\u3001\u590D\u5236\u3001\u4FEE\u6539\u3001\u5408\u5E76\u3001\u53D1\u5E03\u3001\u518D\u6388\u6743\u3001\u9500\u552E \u53EF\u4FEE\u6539\u6388\u6743\u6761\u6B3E</p><p>\u4E00\u5927\u6761\u4EF6\uFF1A\u518D\u53D1\u5E03\u7684\u4EA7\u54C1\u5FC5\u987B\u7248\u6743\u58F0\u660E\u548C\u8BB8\u53EF\u58F0\u660E</p><h4 id="mozilla\u534F\u8BAE" tabindex="-1">Mozilla\u534F\u8BAE <a class="header-anchor" href="#mozilla\u534F\u8BAE" aria-hidden="true">#</a></h4><p>MPL\uFF1AThe Mozilla Public License</p><p>\u81EA\u7531\u4F7F\u7528\u3001\u4FEE\u6539\u3001\u53D1\u5E03</p><p>\u4E09\u5927\u6761\u4EF6\uFF1A</p><ul><li><p>\u4FEE\u6539\u6E90\u7801\uFF0C\u5FC5\u987B\u5F00\u6E90</p></li><li><p>\u65B0\u589E\u4EE3\u7801\u4E0D\u53EF\u4F7F\u7528\u539F\u8BB8\u53EF</p></li><li><p>\u4FEE\u6539\u4EE3\u7801\uFF0C\u5FC5\u987B\u63D0\u4F9B\u8BF4\u660E\u6587\u6863</p></li></ul><h4 id="mpl\uFF1Athe-mozilla-public-license" tabindex="-1">MPL\uFF1AThe Mozilla Public License <a class="header-anchor" href="#mpl\uFF1Athe-mozilla-public-license" aria-hidden="true">#</a></h4><p>\u81EA\u7531\u4F7F\u7528\u3001\u4FEE\u6539\u3001\u53D1\u5E03</p><p>\u4E09\u5927\u6761\u4EF6\uFF1A</p><ul><li><p>\u4FEE\u6539\u6E90\u7801\uFF0C\u5FC5\u987B\u5F00\u6E90</p></li><li><p>\u65B0\u589E\u4EE3\u7801\u4E0D\u53EF\u4F7F\u7528\u539F\u8BB8\u53EF</p></li><li><p>\u4FEE\u6539\u4EE3\u7801\uFF0C\u5FC5\u987B\u63D0\u4F9B\u8BF4\u660E\u6587\u6863</p></li></ul><h4 id="isc\u534F\u8BAE" tabindex="-1">ISC\u534F\u8BAE <a class="header-anchor" href="#isc\u534F\u8BAE" aria-hidden="true">#</a></h4><p>ISC\uFF1AInternal Systems Consortium \uFF08\u4E92\u8054\u7F51\u7CFB\u7EDF\u534F\u4F1A\uFF09</p><p>\u81EA\u7531\u4F7F\u7528\u3001\u4FEE\u6539\u53EF\u95ED\u6E90\u3001\u65E0\u9700\u7248\u6743\u8BF4\u660E</p><p>\u4E00\u5927\u6761\u4EF6\uFF1A\u5546\u7528\u540E\u4E0D\u53EF\u4F7F\u7528\u4F5C\u8005\u540D\u5B57\u5BA3\u4F20</p><h2 id="package-json-\u5E38\u7528\u914D\u7F6E\u9879\u8BE6\u89E3" tabindex="-1">package.json \u5E38\u7528\u914D\u7F6E\u9879\u8BE6\u89E3 <a class="header-anchor" href="#package-json-\u5E38\u7528\u914D\u7F6E\u9879\u8BE6\u89E3" aria-hidden="true">#</a></h2><p>\u914D\u7F6E\u9879</p><ol><li><p>name \u9879\u76EE\u540D\u79F0\uFF08\u82F1\u6587\uFF09</p><pre><code> \u7981\u6B62\u4F7F\u7528JS\uFF0CNODE\u7B49\u5173\u952E\u8BCD
 
 \u7981\u6B62\u4F7F\u7528 . \u6216 _ \u5F00\u5934
 
 \u5C0F\u5199\u5B57\u6BCD
 
 \u4E0D\u8981\u7528\u7A7A\u683C
 
 \u4E0D\u8981\u592A\u957F
</code></pre><p>html-webpack-plugin</p></li><li><p>keywords\uFF1A<code>Array&lt;string&gt;</code>\uFF0C\u5B57\u7B26\u4E32\u6570\u7EC4</p></li><li><p>description\uFF1AString\uFF0C\u5B57\u7B26\u4E32</p></li><li><p>homepage\uFF1AURL\uFF08\u4E0D\u5E26\u534F\u8BAE\uFF09</p><p>www.yueluo.club</p></li><li><p>bugs\uFF1AObject</p><p>url\uFF1Abug \u63D0\u4EA4\u4E0E\u8FFD\u8E2A\u5730\u5740 email\uFF1Abug \u63D0\u4EA4\u7684\u90AE\u7BB1\u5730\u5740</p><p>{ &quot;url&quot;: &quot;<a href="http://issues.jsplusplus.com" target="_blank" rel="noopener noreferrer">issues.jsplusplus.com</a>&quot;, &quot;email&quot;: &quot;<a href="mailto:1445367137@qq.com">1445367137@qq.com</a>&quot; }</p></li><li><p>author contributors</p><p>author\uFF1AObject \u4F5C\u8005\u4FE1\u606F</p><p>name\uFF1A\u4F5C\u8005\u540D\u79F0 mail\uFF1A\u90AE\u7BB1\u5730\u5740 url\uFF1A\u4F5C\u8005\u7F51\u7AD9\u9996\u9875\u5730\u5740</p><p>author\uFF1Ayueluo <a href="mailto:yueluo@qq.com">yueluo@qq.com</a> <a href="http://www.yueluo.club" target="_blank" rel="noopener noreferrer">http://www.yueluo.club</a></p><p>conntributors\uFF1AArray \u4E00\u7EC4\u8D21\u732E\u8005\uFF08\u5355\u4E2A\u5143\u7D20\u540Cauthor\u914D\u7F6E\uFF09</p></li><li><p>main</p><p>main \u5165\u53E3\u6587\u4EF6</p><p>\u7F16\u5199\u7684\u6A21\u5757\u9700\u8981\u76F4\u63A5\u5F15\u7528\uFF0C\u9700\u8981\u8BBE\u7F6E\u5165\u53E3\u6587\u4EF6</p><p>\u6848\u4F8B\uFF1A</p><p>\u5982\u679C\u7F16\u5199\u4E00\u4E2A webpack plugin -test-webpack-plugin \u5165\u53E3\u6587\u4EF6\u5728 dist/app.js \u5F53\u524D test-webpack-plugin \u6587\u4EF6\u5939\u4E0B\u7684 package.json \u5185\u8981\u8BBE\u7F6E main: &#39;dist/app.js&#39;</p><p>\u9879\u76EE\u6A21\u5757\u4E2D\u4F7F\u7528\u8BE5 plugin \u65F6</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> TestWebpackPlugin </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reuqire</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test-webpack-plugin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// \u4E0D\u7528\u5199\u5F15\u7528\u8DEF\u5F84</span></span>
<span class="line"><span style="color:#82AAFF;">reuqire</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test-webpack-plugin/dist/app.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div></li><li><p>repository</p><p>repository\uFF1AObject \u7EBF\u4E0A\u4ED3\u5E93</p><p>type\uFF1A&#39;git or svn&#39; url\uFF1A&#39;\u4ED3\u5E93\u7EBF\u4E0A\u5730\u5740&#39;</p></li><li><p>private</p><p>private\uFF1ABoolean \u662F\u5426\u79C1\u6709</p><p>true npm \u65E0\u6CD5\u53D1\u5E03</p></li></ol><h2 id="scripts-\u811A\u672C\u547D\u4EE4\u4EE5\u53CA\u4F7F\u7528\u6280\u5DE7" tabindex="-1">scripts \u811A\u672C\u547D\u4EE4\u4EE5\u53CA\u4F7F\u7528\u6280\u5DE7 <a class="header-anchor" href="#scripts-\u811A\u672C\u547D\u4EE4\u4EE5\u53CA\u4F7F\u7528\u6280\u5DE7" aria-hidden="true">#</a></h2><ol start="10"><li>scripts</li></ol><p>scrips\uFF1AObject \u5B9A\u4E49\u811A\u672C\u547D\u4EE4\uFF0C\u4EFB\u4F55\u53EF\u4EE5shell\u8FD0\u884C\u7684\u547D\u4EE4\u90FD\u53EF\u4EE5\u88AB\u5B9A\u4E49</p><p>shell\uFF1A</p><pre><code>c \u8BED\u8A00\u7F16\u5199\u7684\u7A0B\u5E8F\uFF0CLinux\u4E0A\u7684\u4E00\u79CD\u547D\u4EE4\u8BED\u8A00\u3002

shell\u811A\u672C\uFF08shell script\uFF09\uFF0Cshell \u8BED\u8A00\u7F16\u5199\u7684\u811A\u672C\u7A0B\u5E8F\u3002
</code></pre><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">&quot;remove&quot;: &quot;rm -rf index.txt&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u901A\u914D\u7B26</p><pre><code>&quot;remove&quot;: &quot;rm -rf **/*.txt&quot; \u5220\u9664\u6839\u76EE\u5F55\u6587\u4EF6\u5939\u4E0B\u7684\u6240\u6709\u540E\u7F00\u540D\u4E3A .txt \u7684\u6587\u4EF6

&quot;remove&quot;: &quot;rm -rf **/*.txt *.txt&quot; \u5220\u9664\u6839\u76EE\u5F55\u53CA\u5176\u5B50\u76EE\u5F55\u4E0B\u6240\u6709\u540D\u4E3A .txt \u7684\u6587\u4EF6

\u6BD4\u5982\u4E34\u65F6\u6587\u4EF6\u7B49\u3002
</code></pre><p>\u53C2\u6570</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">webpack --config wepack.config.js &amp;&amp; node upload_source.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// --config \u5C31\u662F\u914D\u7F6E\u7684\u53C2\u6570</span></span>
<span class="line"></span></code></pre></div><p>&amp; \u548C &amp;&amp;</p><pre><code>&amp;\uFF1A\u540C\u65F6\u6267\u884C
&amp;&amp;\uFF1A\u987A\u6B21\u6267\u884C
</code></pre><p>\u9ED8\u8BA4\u503C</p><pre><code>\u6CA1\u6709\u5B9A\u4E49\u811A\u672C\u547D\u4EE4\u4E5F\u53EF\u4EE5\u4F7F\u7528

npm start\uFF1Anode server.js
  
npm install\uFF1Anode-gyp rebuild
</code></pre><p>\u94A9\u5B50</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">&quot;prebuild&quot;: &quot;echo before&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;build&quot;: &quot;echo build&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;postbuild&quot;: &quot;echo after build&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">npm run build -&gt; \u81EA\u52A8\u5728\u4E4B\u524D\u6267\u884C prebuild\uFF0C\u4E4B\u540E\u518D\u6267\u884C postbuild</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">prepublish\uFF0Cpostpublish</span></span>
<span class="line"><span style="color:#A6ACCD;">preinstall\uFF0Cpostinstall</span></span>
<span class="line"><span style="color:#A6ACCD;">preuninstall\uFF0Cpostuninstall</span></span>
<span class="line"><span style="color:#A6ACCD;">preversion\uFF0Cpostversion</span></span>
<span class="line"><span style="color:#A6ACCD;">pretest\uFF0Cposttest</span></span>
<span class="line"><span style="color:#A6ACCD;">prestop\uFF0Cpoststop</span></span>
<span class="line"><span style="color:#A6ACCD;">prestart\uFF0Cpoststart</span></span>
<span class="line"><span style="color:#A6ACCD;">prerestart\uFF0Cpostrestart</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u7B80\u5199</p><pre><code>npm start = npm run start
npm stop = npm run stop
npm test = npm run test

npm restart = pm run stop &amp;&amp; npm run restart &amp;&amp; npm run start\uFF08\u53EF\u4EE5\u5728\u547D\u4EE4\u524D\u540E\u589E\u52A0\u4E8B\u4EF6\u94A9\u5B50\uFF09
</code></pre><p>\u53D6\u503C</p><div class="language-json"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">process.<wbr>env.npm_package_name</span></span>
<span class="line"><span style="color:#A6ACCD;">process.<wbr>env.npm_package_repository_type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">server</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">echo $npm_package_server</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u6848\u4F8B\uFF1A</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">server</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://ww.yueluo.club</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">port</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">3000</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">package.json \u53D6\u503C</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">port</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">echo $npm_package_server_port</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">server.js \u6587\u4EF6\u53D6\u503C</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">process.<wbr>env.npm_package_server_port; </span><span style="color:#676E95;font-style:italic;">// 3000</span></span>
<span class="line"></span></code></pre></div><h2 id="dependencies\u4F9D\u8D56\u5206\u7C7B" tabindex="-1">dependencies\u4F9D\u8D56\u5206\u7C7B <a class="header-anchor" href="#dependencies\u4F9D\u8D56\u5206\u7C7B" aria-hidden="true">#</a></h2><p>dependencies\uFF1A\u4F9D\u8D56\u6A21\u5757</p><p>devDependencies\uFF1A\u5F00\u53D1\u73AF\u5883\u4E0B\uFF0C\u7528\u4E8E\u8F6C\u6362\u3001\u538B\u7F29\u3001\u6DF7\u6DC6\u3001\u66FF\u6362\u4EE3\u7801\u7B49\u534F\u52A9\u6700\u7EC8\u6253\u5305\u6210\u7EBF\u4E0A\u7248\u672C\u6240\u9700\u7684\u4F9D\u8D56</p><pre><code>npm i xxx --save-dev    npm i xxx -D
</code></pre><p>dependencies\uFF1A\u7EBF\u4E0A\uFF08\u751F\u4EA7\uFF09\u73AF\u5883\u4E2D\uFF0C\u9879\u76EE\u3001\u7A0B\u5E8F\u3001\u6A21\u5757\u8FD0\u884C\u5FC5\u5907\u7684\u4F9D\u8D56\u3002</p><pre><code>npm i xxx --save    npm i xxx -S
</code></pre><p>npm i xxx \u5B89\u88C5\u5F53\u524D\u547D\u4EE4\u884C\u6240\u5728\u76EE\u5F55\u3001\u5B89\u88C5\u5728dependenices</p><p>npm i xxx -g \u5168\u5C40\u5B89\u88C5</p><p>peerDependencies</p><p>peerDependencies\uFF1A\u540C\u8F88\u4F9D\u8D56</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">test \u9879\u76EE\u4E2D\u4F9D\u8D56 a\u3001b \u6A21\u5757\uFF0Ca \u6A21\u5757\u4E5F\u4F9D\u8D56 b \u6A21\u5757\uFF0C\u5982\u4F55\u89E3\u51B3\u4E0D\u91CD\u590D\u5B89\u88C5 b \u6A21\u5757\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u89E3\u51B3\u65B9\u6CD5\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a \u6A21\u5757\u4E2D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;peerDependencies&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;b&quot;: &quot;^1.0.0&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">npm3 \u4E0D\u5F3A\u5236\u5B89\u88C5 peerDependencies</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u8B66\u544A\uFF1Axxx@1.1.1 reuqires a peer of yyy@2.2.2 but none is installed\uFF0C\u63D0\u793A\u624B\u52A8\u5B89\u88C5\u6A21\u5757\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="npm\u53D1\u5E03\u3001\u7248\u672C\u7BA1\u7406\u3001\u5E9F\u5F03\u4E0E\u5220\u9664" tabindex="-1">npm\u53D1\u5E03\u3001\u7248\u672C\u7BA1\u7406\u3001\u5E9F\u5F03\u4E0E\u5220\u9664 <a class="header-anchor" href="#npm\u53D1\u5E03\u3001\u7248\u672C\u7BA1\u7406\u3001\u5E9F\u5F03\u4E0E\u5220\u9664" aria-hidden="true">#</a></h2><p>NPM\u662F\u968F\u540CNodeJs\u4E00\u8D77\u5B89\u88C5\u7684\u5305\u7BA1\u7406\u5DE5\u5177\u3002</p><p>\u5141\u8BB8\u7528\u6237\u4ECENPM\u670D\u52A1\u5668\u4E0B\u8F7D\u522B\u4EBA\u7F16\u5199\u7684\u7B2C\u4E09\u65B9\u5305\u5230\u672C\u5730\u4F7F\u7528\u3002 \u5141\u8BB8\u7528\u6237\u4ECENPM\u670D\u52A1\u5668\u4E0B\u8F7D\u5E76\u5B89\u88C5\u522B\u4EBA\u7F16\u5199\u7684\u547D\u4EE4\u884C\u7A0B\u5E8F\u5230\u672C\u5730\u4F7F\u7528\u3002 \u5141\u8BB8\u7528\u6237\u5C06\u81EA\u5DF1\u7F16\u5199\u7684\u5305\u6216\u547D\u4EE4\u884C\u7A0B\u5E8F\u4E0A\u4F20\u5230\u670D\u52A1\u5668\u4F9B\u522B\u4EBA\u4F7F\u7528\u3002</p><p>npm -v</p><p>\u6CE8\u518CNPM</p><p><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/</a></p><ol><li>sign up</li><li>\u586B\u5199\u6B63\u786E\u7684\u90AE\u7BB1</li><li>\u5230\u90AE\u7BB1\u5185\u9A8C\u8BC1\u90AE\u7BB1</li><li>\u8DF3\u8F6C\u5230NPM\u9996\u9875</li></ol><p>nrm \u64CD\u4F5C</p><p>npm i nrm -g npm \u4ED3\u5E93\u7BA1\u7406\u8F6F\u4EF6\uFF0C\u5FEB\u901F\u5207\u6362npm\u4ED3\u5E93</p><p>nrm ls \u5217\u51FA\u6240\u6709\u4ED3\u5E93</p><p>nrm add cnpm <a href="https://registry.npm.Taobao.org" target="_blank" rel="noopener noreferrer">https://registry.npm.Taobao.org</a> \u589E\u52A0\u4ED3\u5E93</p><p>nrm use npm \u5207\u6362\u4ED3\u5E93</p><p>npm \u53D1\u5E03</p><ol><li>npm adduser \u589E\u52A0\u7528\u6237 \uFF0C\u5982\u679C\u53D1\u5E03\u62A5\u9519\uFF0C\u5148 npm login</li><li>\u586B\u5199\u6CE8\u518C NPM \u65F6\u586B\u5199\u7684\u7528\u6237\u540D\u3001\u5BC6\u7801\u3001\u90AE\u7BB1\u5730\u5740</li><li>\u663E\u793A logged is as yueluo on <a href="https://registry.npmjs.org" target="_blank" rel="noopener noreferrer">https://registry.npmjs.org</a> \u589E\u52A0\u6210\u529F</li><li>\u67E5\u770B npm \u4ED3\u5E93 nrm ls \u524D\u9762\u6709 * \u7684\u5C31\u662F\u5F53\u524D\u4ED3\u5E93</li><li>\u5207\u6362\u4ED3\u5E93 nrm use npm \u5207\u6362\u5230 npm \u4ED3\u5E93</li><li>npm publish</li><li>\u53D1\u5E03\u6210\u529F</li></ol><p>scoped \u5305\u53D1\u5E03</p><p>package.json \u7684 name @yueluo/my-module</p><p>\u5982\u679C\u9700\u8981\u57DF\u7684\u670D\u52A1\uFF0C\u662F\u8981\u6536\u8D39\u7684\u3002</p><p>\u5982\u679C\u4E0D\u60F3\u88AB\u6536\u8D39\uFF0C\u53EF\u4EE5\u4F7F\u7528 npm publish --access public \u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">classe1</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">yueluo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u6708\u843D</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">classe2</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#FFCB6B;">yueluo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u6708\u843D</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>babel-loader xiaoming babel-loader xiaoli</p><p>scoped</p><pre><code>@xiaoming/babel-loader
@xiaoli/babel-loader
</code></pre><p>\u7248\u672C\u8FED\u4EE3</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm version </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">major </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> minor </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> \u589E\u52A0\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">npm publish \u518D\u6B21\u53D1\u5E03</span></span>
<span class="line"><span style="color:#A6ACCD;">npm view yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first versions \u67E5\u770B\u7248\u672C\u8FED\u4EE3\u60C5\u51B5</span></span>
<span class="line"><span style="color:#A6ACCD;">npm up yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first \u5207\u6362\u5230 npm \u4E0B yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first \u9879\u76EE\u4E0B</span></span>
<span class="line"></span></code></pre></div><p>node index.js</p><p>\u5E9F\u5F03\u5305\u7248\u672C</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm deprecate yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first@</span><span style="color:#F78C6C;">0.1</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">deprecate fircdst version</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">npm view yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first versions \u65E0\u53D8\u5316</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u5B89\u88C5 </span><span style="color:#F78C6C;">0.1</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> \uFF08npm view yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first versions\uFF09</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u63D0\u793A\uFF1Anpm WARN deprecated yueluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first@</span><span style="color:#F78C6C;">0.1</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">: deprecate first version</span></span>
<span class="line"></span></code></pre></div><p>\u5220\u9664\u5305</p><p>\u5305\u5220\u9664 24 \u5C0F\u65F6\u540E\u53EF\u91CD\u53D1 \u53D1\u5E03 72 \u5C0F\u65F6\u5185\u7684\u5305\u53EF\u5220\u9664</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm unpublish yeuluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first@</span><span style="color:#F78C6C;">0.1</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">force</span></span>
<span class="line"></span></code></pre></div><p>\u5220\u9664\u5305</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm unpublish yeuluo</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">first </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">force</span></span>
<span class="line"></span></code></pre></div><h2 id="\u7F16\u5199-markdown-\u6587\u6863" tabindex="-1">\u7F16\u5199 markdown \u6587\u6863 <a class="header-anchor" href="#\u7F16\u5199-markdown-\u6587\u6863" aria-hidden="true">#</a></h2><p>markdown</p><p>\u7EAF\u6587\u672C\u683C\u5F0F\u6807\u8BB0\u8BED\u8A00\uFF0C\u672C\u8D28\u4E0A\u8DDFHTML\u4E00\u81F4\uFF0C\u6CA1\u6709\u533A\u522B\u3002</p><p>\u7528\u7B80\u5355\u7684\u4E66\u5199\u65B9\u5F0F\u786E\u5B9A\u4E00\u6279\u6587\u672C\u663E\u793A\u683C\u5F0F\u3002</p><p>\u540E\u7F00\u540D\uFF1A.md</p><p>vscode Markdown Preview Enhanced</p><p>\u6807\u9898</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># Thi is a title for markdon</span></span>
<span class="line"><span style="color:#A6ACCD;">## Thi is a title for markdon</span></span>
<span class="line"><span style="color:#A6ACCD;">### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#A6ACCD;">#### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#A6ACCD;">##### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#A6ACCD;">###### Thi is a title for markdon</span></span>
<span class="line"></span></code></pre></div><p>\u6587\u672C</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">This is a content for markdown.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">**This is a content. \u52A0\u7C97**</span></span>
<span class="line"><span style="color:#A6ACCD;">*This is a content. \u659C\u4F53*</span></span>
<span class="line"><span style="color:#A6ACCD;">***This is a content. \u52A0\u7C97\u659C\u4F53***</span></span>
<span class="line"><span style="color:#A6ACCD;">~~This is a content. \u5220\u9664\u7EBF~~</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text-decoration: underline</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">This is a content \u4E0B\u5212\u7EBF</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u5F15\u7528</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">&gt; This is a content.</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt; &gt; This is a content.</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt; &gt; &gt; This is a content.</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt; &gt; &gt; </span></span>
<span class="line"></span></code></pre></div><p>\u5206\u5272\u7EBF</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"></span></code></pre></div><hr><p>\u56FE\u7247</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">![yueluo](http://data.yueluo.club/icon/icon.png &quot;yueluo&quot;)</span></span>
<span class="line"></span></code></pre></div><p>\u8D85\u94FE\u63A5</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">[yueluo](http://www.yueluo.club &quot;yueluo&quot;)</span></span>
<span class="line"></span></code></pre></div><p>\u65E0\u5E8F\u5217\u8868</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">\u65E0\u5E8F - + *</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">- list item</span></span>
<span class="line"><span style="color:#A6ACCD;">* list item</span></span>
<span class="line"><span style="color:#A6ACCD;">+ list item</span></span>
<span class="line"></span></code></pre></div><p>\u6709\u5E8F\u5217\u8868</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">1. list item</span></span>
<span class="line"><span style="color:#A6ACCD;">2. list item</span></span>
<span class="line"><span style="color:#A6ACCD;">3. list item</span></span>
<span class="line"></span></code></pre></div><p>\u5217\u8868\u5D4C\u5957</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  - list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      + sub item</span></span>
<span class="line"><span style="color:#A6ACCD;">      + sub item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  * list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    1. list item</span></span>
<span class="line"><span style="color:#A6ACCD;">    2. list item</span></span>
<span class="line"><span style="color:#A6ACCD;">    3. list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  + list item</span></span>
<span class="line"></span></code></pre></div><p>\u8868\u683C</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">th|th|th|th</span></span>
<span class="line"><span style="color:#A6ACCD;">:-:|:-:|:-:|:-:</span></span>
<span class="line"><span style="color:#A6ACCD;">td|td|td|td</span></span>
<span class="line"><span style="color:#A6ACCD;">td|td|td|td</span></span>
<span class="line"><span style="color:#A6ACCD;">td|td|td|td</span></span>
<span class="line"></span></code></pre></div><p>\u53EF\u4EE5\u4F7F\u7528 \u201C : \u201D \u8BBE\u7F6E\u6587\u5B57\u5C45\u5DE6\u3001\u5C45\u53F3\u663E\u793A</p><p>\u4EE3\u7801\u5757</p><p>\u5355\u884C <code>console.log(&#39;this is a line code&#39;);</code></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">app</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">700px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">box</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">This is a title</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">This is content</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u6D41\u7A0B\u56FE <code>flow content</code></p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">cond1=&gt;condition: \u4FEE\u6539\u6E90\u7801\u540E\u95ED\u6E90\uFF1F</span></span>
<span class="line"><span style="color:#A6ACCD;">cond2=&gt;condition: \u7248\u6743\u8BF4\u660E\uFF1F</span></span>
<span class="line"><span style="color:#A6ACCD;">cond3=&gt;condition: \u5546\u7528\u540E\u7528\u4F5C\u8005\u540D\u5B57\u5BA3\u4F20\uFF1F</span></span>
<span class="line"><span style="color:#A6ACCD;">cond4=&gt;condition: \u65B0\u589E\u4EE3\u7801\u91C7\u7528\u540C\u6837\u8BB8\u53EF\uFF1F</span></span>
<span class="line"><span style="color:#A6ACCD;">cond5=&gt;condition: \u4FEE\u6539\u6E90\u7801\u63D0\u4F9B\u6587\u6863\u8BF4\u660E\uFF1F</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">apache=&gt;end: Apache</span></span>
<span class="line"><span style="color:#A6ACCD;">mit=&gt;end: MIT</span></span>
<span class="line"><span style="color:#A6ACCD;">isc_bsd=&gt;end: ISC\u3001BSD</span></span>
<span class="line"><span style="color:#A6ACCD;">gpl=&gt;end: GPL</span></span>
<span class="line"><span style="color:#A6ACCD;">mozilla=&gt;end: Mozilla</span></span>
<span class="line"><span style="color:#A6ACCD;">lgpl=&gt;end: LGPL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">cond1(yes)-&gt;cond2</span></span>
<span class="line"><span style="color:#A6ACCD;">cond1(no)-&gt;cond4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">cond2(yes)-&gt;apache</span></span>
<span class="line"><span style="color:#A6ACCD;">cond2(no)-&gt;cond3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">cond3(yes)-&gt;mit</span></span>
<span class="line"><span style="color:#A6ACCD;">cond3(no)-&gt;isc_bsd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">cond4(yes)-&gt;gpl</span></span>
<span class="line"><span style="color:#A6ACCD;">cond4(no)-&gt;cond5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">cond5(yes)-&gt;mozilla</span></span>
<span class="line"><span style="color:#A6ACCD;">cond5(no)-&gt;lgpl</span></span>
<span class="line"></span></code></pre></div>`,170),o=[e];function c(t,r,i,y,D,C){return a(),n("div",null,o)}var F=s(l,[["render",c]]);export{d as __pageData,F as default};
