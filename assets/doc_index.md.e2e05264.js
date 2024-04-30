import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.88002d8f.js";const F=JSON.parse('{"title":"JS DOC","description":"","frontmatter":{},"headers":[],"relativePath":"doc/index.md","filePath":"doc/index.md"}'),l={name:"doc/index.md"},o=p(`<h1 id="js-doc" tabindex="-1">JS DOC <a class="header-anchor" href="#js-doc" aria-label="Permalink to &quot;JS DOC&quot;">​</a></h1><p><a href="https://jsdoc.zcopy.site/" target="_blank" rel="noreferrer">JS DOC</a></p><p>增强代码可读性的注释系统（注释规范），目的是增强代码的可读性。</p><p>通过注释，可以导出一个比较规范的API文档。</p><p>vscode：Add jsdoc comments</p><h2 id="基本注释" tabindex="-1">基本注释 <a class="header-anchor" href="#基本注释" aria-label="Permalink to &quot;基本注释&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * content</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 打印字符串123</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;123&#39;</span><span style="color:#E1E4E8;">);  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * content</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 打印字符串123</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;123&#39;</span><span style="color:#24292E;">);  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="常用标签" tabindex="-1">常用标签 <a class="header-anchor" href="#常用标签" aria-label="Permalink to &quot;常用标签&quot;">​</a></h2><h3 id="alias-函数与变量别名" tabindex="-1">@alias 函数与变量别名 <a class="header-anchor" href="#alias-函数与变量别名" aria-label="Permalink to &quot;@alias 函数与变量别名&quot;">​</a></h3><p>第一种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">;(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@alias</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">test</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test1</span><span style="color:#E1E4E8;"> () {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  window.test </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> test1;</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">;(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@alias</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">test</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test1</span><span style="color:#24292E;"> () {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  window.test </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> test1;</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span></code></pre></div><p>第二种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  a </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> a;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@alias</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">test1</span><span style="color:#6A737D;"> - test</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">test1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test1</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  a </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> a;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@alias</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">test1</span><span style="color:#6A737D;"> - test</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">test1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test1</span><span style="color:#24292E;">();</span></span></code></pre></div><h3 id="constructor-构造函数" tabindex="-1">@constructor 构造函数 <a class="header-anchor" href="#constructor-构造函数" aria-label="Permalink to &quot;@constructor 构造函数&quot;">​</a></h3><p>第一种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">;(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@constructor</span><span style="color:#6A737D;"> Test</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  window.Test </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Test;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">test1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">;(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@constructor</span><span style="color:#6A737D;"> Test</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  window.Test </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Test;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">test1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;">();</span></span></code></pre></div><p>第二种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@constructor</span><span style="color:#6A737D;"> Test</span></span>
<span class="line"><span style="color:#6A737D;">   * </span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@constructor</span><span style="color:#6A737D;"> Test</span></span>
<span class="line"><span style="color:#6A737D;">   * </span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="description-描述" tabindex="-1">@description 描述 <a class="header-anchor" href="#description-描述" aria-label="Permalink to &quot;@description 描述&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 这是一个HTML模板替换函数</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tplReplace</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">tmp</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">rep</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 内容描述</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  xxxxxxx</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 这是一个HTML模板替换函数</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tplReplace</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">tmp</span><span style="color:#24292E;">, </span><span style="color:#E36209;">rep</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 内容描述</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  xxxxxxx</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="example-例子" tabindex="-1">@example 例子 <a class="header-anchor" href="#example-例子" aria-label="Permalink to &quot;@example 例子&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@example</span><span style="color:#6A737D;"> </span></span>
<span class="line"><span style="color:#6A737D;"> *  var t = new Test(1, 2);</span></span>
<span class="line"><span style="color:#6A737D;"> *  t.plus(); // 1 + 2 的结果</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> a;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">Test</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">plus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@example</span><span style="color:#6A737D;"> </span></span>
<span class="line"><span style="color:#6A737D;"> *  var t = new Test(1, 2);</span></span>
<span class="line"><span style="color:#6A737D;"> *  t.plus(); // 1 + 2 的结果</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> a;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">Test</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">plus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="extends-继承关系" tabindex="-1">@extends 继承关系 <a class="header-anchor" href="#extends-继承关系" aria-label="Permalink to &quot;@extends 继承关系&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { Component } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@extends</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{React.component}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Test;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { Component } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@extends</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{React.component}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Test;</span></span></code></pre></div><h3 id="params-参数" tabindex="-1">@params 参数 <a class="header-anchor" href="#params-参数" aria-label="Permalink to &quot;@params 参数&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 这是一个做加法运算的函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">a</span><span style="color:#6A737D;"> - 加法中的第一个数字</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">b</span><span style="color:#6A737D;"> - 加法中的第二个数字</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 这是一个做加法运算的函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">a</span><span style="color:#6A737D;"> - 加法中的第一个数字</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">b</span><span style="color:#6A737D;"> - 加法中的第二个数字</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>params（number string boolean function undefined object Array Object Null）</p><h3 id="property-属性" tabindex="-1">@property 属性 <a class="header-anchor" href="#property-属性" aria-label="Permalink to &quot;@property 属性&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">type</span><span style="color:#6A737D;"> - 轮播图类型</span></span>
<span class="line"><span style="color:#6A737D;"> *  slide(default)：无缝轮播</span></span>
<span class="line"><span style="color:#6A737D;"> *  fade：淡入淡出</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">duration</span><span style="color:#6A737D;"> - 轮播图轮播等待时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{boolean}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">autoplay</span><span style="color:#6A737D;"> - 是否设置自动轮播</span></span>
<span class="line"><span style="color:#6A737D;"> *  true：加载后自动轮播</span></span>
<span class="line"><span style="color:#6A737D;"> *  false：加载后手动切换</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: </span><span style="color:#9ECBFF;">&#39;slide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  duration: </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  autoplay: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">type</span><span style="color:#6A737D;"> - 轮播图类型</span></span>
<span class="line"><span style="color:#6A737D;"> *  slide(default)：无缝轮播</span></span>
<span class="line"><span style="color:#6A737D;"> *  fade：淡入淡出</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">duration</span><span style="color:#6A737D;"> - 轮播图轮播等待时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{boolean}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">autoplay</span><span style="color:#6A737D;"> - 是否设置自动轮播</span></span>
<span class="line"><span style="color:#6A737D;"> *  true：加载后自动轮播</span></span>
<span class="line"><span style="color:#6A737D;"> *  false：加载后手动切换</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  type: </span><span style="color:#032F62;">&#39;slide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  duration: </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  autoplay: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="return-返回值" tabindex="-1">@return 返回值 <a class="header-anchor" href="#return-返回值" aria-label="Permalink to &quot;@return 返回值&quot;">​</a></h3><p>无返回 Void 或者 undefined。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 这是一个做加法运算的函数</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">a</span><span style="color:#6A737D;"> 第一个数字</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">b</span><span style="color:#6A737D;"> 第二个数字</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span></span>
<span class="line"><span style="color:#6A737D;">  */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 这是一个做加法运算的函数</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">a</span><span style="color:#6A737D;"> 第一个数字</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">b</span><span style="color:#6A737D;"> 第二个数字</span></span>
<span class="line"><span style="color:#6A737D;">  * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span></span>
<span class="line"><span style="color:#6A737D;">  */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="type-变量类型" tabindex="-1">@type 变量类型 <a class="header-anchor" href="#type-变量类型" aria-label="Permalink to &quot;@type 变量类型&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> a - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> b - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{boolean}</span><span style="color:#6A737D;"> c - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{function}</span><span style="color:#6A737D;"> d - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;2&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">d</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> a - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> b - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{boolean}</span><span style="color:#6A737D;"> c - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{function}</span><span style="color:#6A737D;"> d - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;2&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">d</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {};</span></span></code></pre></div><h3 id="module-模块" tabindex="-1">@module 模块 <a class="header-anchor" href="#module-模块" aria-label="Permalink to &quot;@module 模块&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">IndexPage/test</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">ListPage/test</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">a</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">b</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 表明模块归属于哪个页面，或者可以被哪一个页面引用。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">Common/test</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">a</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">b</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/// 如果是通用的模块，可以使用Common（大小写任意，最好是大写）。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">IndexPage/test</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">ListPage/test</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">a</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">b</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 表明模块归属于哪个页面，或者可以被哪一个页面引用。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">Common/test</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">a</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">b</span><span style="color:#6A737D;"> - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/// 如果是通用的模块，可以使用Common（大小写任意，最好是大写）。</span></span></code></pre></div><h3 id="array-number-具体类型的数组-数字类型的数组。" tabindex="-1"><code>{Array.&lt;number&gt;}</code> 具体类型的数组，数字类型的数组。 <a class="header-anchor" href="#array-number-具体类型的数组-数字类型的数组。" aria-label="Permalink to &quot;\`\`{Array.&lt;number&gt;}\`\` 具体类型的数组，数字类型的数组。&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Array.&lt;number&gt;}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number[]}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Array.&lt;object&gt;}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Object[]}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {}</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Array.&lt;number&gt;}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number[]}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Array.&lt;object&gt;}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Object[]}</span><span style="color:#6A737D;"> arr - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {},</span></span>
<span class="line"><span style="color:#24292E;">  {}</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h3 id="access-访问等级-主要针对于类" tabindex="-1">@access 访问等级 主要针对于类 <a class="header-anchor" href="#access-访问等级-主要针对于类" aria-label="Permalink to &quot;@access 访问等级 主要针对于类&quot;">​</a></h3><p>private 私有 protected 受保护的 public 公有</p><p>第一种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** </span><span style="color:#F97583;">@access</span><span style="color:#6A737D;"> </span><span style="color:#79B8FF;">private</span><span style="color:#6A737D;"> a - xxx */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">#a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@access</span><span style="color:#6A737D;"> </span><span style="color:#79B8FF;">protected</span><span style="color:#6A737D;"> b - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@access</span><span style="color:#6A737D;"> </span><span style="color:#79B8FF;">public</span><span style="color:#6A737D;"> c - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** </span><span style="color:#D73A49;">@access</span><span style="color:#6A737D;"> </span><span style="color:#005CC5;">private</span><span style="color:#6A737D;"> a - xxx */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">#a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@access</span><span style="color:#6A737D;"> </span><span style="color:#005CC5;">protected</span><span style="color:#6A737D;"> b - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@access</span><span style="color:#6A737D;"> </span><span style="color:#005CC5;">public</span><span style="color:#6A737D;"> c - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>第二种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** </span><span style="color:#F97583;">@private</span><span style="color:#6A737D;"> a - xxx */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">#a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@protected</span><span style="color:#6A737D;"> b - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@public</span><span style="color:#6A737D;"> c - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** </span><span style="color:#D73A49;">@private</span><span style="color:#6A737D;"> a - xxx */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">#a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@protected</span><span style="color:#6A737D;"> b - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@public</span><span style="color:#6A737D;"> c - xxx</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="author-作者" tabindex="-1">@author 作者 <a class="header-anchor" href="#author-作者" aria-label="Permalink to &quot;@author 作者&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#79B8FF;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#005CC5;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h3 id="borrows-改变标识符-不常用" tabindex="-1">@borrows 改变标识符 不常用 <a class="header-anchor" href="#borrows-改变标识符-不常用" aria-label="Permalink to &quot;@borrows 改变标识符 不常用&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">test1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;123&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@borrows</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">test1</span><span style="color:#6A737D;"> </span><span style="color:#F97583;">as</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">test</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  test: test1</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">test1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;123&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@borrows</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">test1</span><span style="color:#6A737D;"> </span><span style="color:#D73A49;">as</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">test</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  test: test1</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="callback-回调函数" tabindex="-1">@callback 回调函数 <a class="header-anchor" href="#callback-回调函数" aria-label="Permalink to &quot;@callback 回调函数&quot;">​</a></h3><p>第一种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> () {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Test~testCallback}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">cb</span></span>
<span class="line"><span style="color:#6A737D;"> * </span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#79B8FF;">Test</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@callback</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">Test~testCallback</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">b</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> () {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Test~testCallback}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">cb</span></span>
<span class="line"><span style="color:#6A737D;"> * </span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#005CC5;">Test</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@callback</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">Test~testCallback</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">b</span><span style="color:#24292E;"> () {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>第二种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{test~testCallback}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">cb</span><span style="color:#6A737D;"> - xxx </span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{test~testCallback}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">cb</span><span style="color:#6A737D;"> - xxx </span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="class-类" tabindex="-1">@class 类 <a class="header-anchor" href="#class-类" aria-label="Permalink to &quot;@class 类&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@class</span><span style="color:#6A737D;"> Test - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@classdesc</span><span style="color:#6A737D;"> xxxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@class</span><span style="color:#6A737D;"> Test - xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@classdesc</span><span style="color:#6A737D;"> xxxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="constant-常量" tabindex="-1">@constant 常量 <a class="header-anchor" href="#constant-常量" aria-label="Permalink to &quot;@constant 常量&quot;">​</a></h3><p>第一种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@constant</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">TEST</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@constant</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">TEST</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>第二种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@constant</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Object}</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">BASE_URL</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">GET_COURSE_DATA</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">API</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  BASE_URL: </span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  GET_COURSE_DATA: </span><span style="color:#9ECBFF;">&#39;xxx&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@constant</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Object}</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">BASE_URL</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">GET_COURSE_DATA</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">API</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  BASE_URL: </span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  GET_COURSE_DATA: </span><span style="color:#032F62;">&#39;xxx&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="file-文件描述-copyright-版权描述" tabindex="-1">@file 文件描述 + @copyright 版权描述 <a class="header-anchor" href="#file-文件描述-copyright-版权描述" aria-label="Permalink to &quot;@file 文件描述 + @copyright 版权描述&quot;">​</a></h3><p>每一个文件的最上方都应该有文件描述。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@file</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@copyright</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@file</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@copyright</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h3 id="requires-依赖模块" tabindex="-1">@requires 依赖模块 <a class="header-anchor" href="#requires-依赖模块" aria-label="Permalink to &quot;@requires 依赖模块&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">module:html-webpack-plugin</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">module:html-webpack-plugin</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><h3 id="see-知名文档位置-并没有实际作用" tabindex="-1">@see 知名文档位置 并没有实际作用 <a class="header-anchor" href="#see-知名文档位置-并没有实际作用" aria-label="Permalink to &quot;@see 知名文档位置 并没有实际作用&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 加法运算</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">a</span><span style="color:#6A737D;"> - 加法运算的第一个值</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">b</span><span style="color:#6A737D;"> - 加法运算的第二个值</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@see</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">sum</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 加法运算</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">a</span><span style="color:#6A737D;"> - 加法运算的第一个值</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">b</span><span style="color:#6A737D;"> - 加法运算的第二个值</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@see</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">sum</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="summary-总结描述" tabindex="-1">@summary 总结描述 <a class="header-anchor" href="#summary-总结描述" aria-label="Permalink to &quot;@summary 总结描述&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * xxxxxx</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@summary</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * xxxxxx</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@summary</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  xxx</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="verson-版本" tabindex="-1">@verson 版本 <a class="header-anchor" href="#verson-版本" aria-label="Permalink to &quot;@verson 版本&quot;">​</a></h3><p>一般来说都是在文件最上方，对于模块和插件来说比较重要。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@file</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@version</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@file</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@version</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h2 id="常用注释组合" tabindex="-1">常用注释组合 <a class="header-anchor" href="#常用注释组合" aria-label="Permalink to &quot;常用注释组合&quot;">​</a></h2><h3 id="文件头注释" tabindex="-1">文件头注释 <a class="header-anchor" href="#文件头注释" aria-label="Permalink to &quot;文件头注释&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@file</span><span style="color:#6A737D;"> 轮播图插件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#79B8FF;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@version</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@dataTime</span><span style="color:#6A737D;"> 2020-05-16 17:12</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@file</span><span style="color:#6A737D;"> 轮播图插件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#005CC5;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@version</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@dataTime</span><span style="color:#6A737D;"> 2020-05-16 17:12</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h3 id="class-注释" tabindex="-1">class 注释 <a class="header-anchor" href="#class-注释" aria-label="Permalink to &quot;class 注释&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@class</span><span style="color:#6A737D;"> 轮播图插件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">IndexPage/Croousel</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@class</span><span style="color:#6A737D;"> 轮播图插件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">IndexPage/Croousel</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h3 id="方法注释" tabindex="-1">方法注释 <a class="header-anchor" href="#方法注释" aria-label="Permalink to &quot;方法注释&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * HTML模板替换</span></span>
<span class="line"><span style="color:#6A737D;"> * </span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{function}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">template</span><span style="color:#6A737D;"> - HTML字符串模板</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Object}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">replaceObject</span><span style="color:#6A737D;"> - 要替换的字段</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> html - 模板变量被替换后的HTML字符串</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tplReplace</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">template</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">replaceObject</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">template</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">{{(</span><span style="color:#79B8FF;">.</span><span style="color:#F97583;">*?</span><span style="color:#DBEDFF;">)}}</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">g</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> replaceObject[key];</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * HTML模板替换</span></span>
<span class="line"><span style="color:#6A737D;"> * </span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{function}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">template</span><span style="color:#6A737D;"> - HTML字符串模板</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Object}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">replaceObject</span><span style="color:#6A737D;"> - 要替换的字段</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> html - 模板变量被替换后的HTML字符串</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tplReplace</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">template</span><span style="color:#24292E;">, </span><span style="color:#E36209;">replaceObject</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">template</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/{{(</span><span style="color:#005CC5;">.</span><span style="color:#D73A49;">*?</span><span style="color:#032F62;">)}}/</span><span style="color:#D73A49;">g</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> replaceObject[key];</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="模块注释" tabindex="-1">模块注释 <a class="header-anchor" href="#模块注释" aria-label="Permalink to &quot;模块注释&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">选项卡模块</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">选项卡模块</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> xxx</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h2 id="文件注释实例" tabindex="-1">文件注释实例 <a class="header-anchor" href="#文件注释实例" aria-label="Permalink to &quot;文件注释实例&quot;">​</a></h2><h3 id="工具类" tabindex="-1">工具类 <a class="header-anchor" href="#工具类" aria-label="Permalink to &quot;工具类&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@file</span><span style="color:#6A737D;"> JS 函数工具库</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">libs/utils</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@version</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#79B8FF;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@time</span><span style="color:#6A737D;"> 2020-02-17</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 替换HTML模板中{{}}的处理函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{function}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">template</span><span style="color:#6A737D;"> - template需要执行才会导出HTML字符串模板</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{object}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">replaceObject</span><span style="color:#6A737D;"> - 传入的模板中需要替换的变量字段</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tplReplace</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">template</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">replaceObject</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 1. 正则匹配出{{}}以及其内部的变量字符串</span></span>
<span class="line"><span style="color:#6A737D;">   * 2. 利用replace方法将匹配的内容与对象键值对应</span></span>
<span class="line"><span style="color:#6A737D;">   * 3. 将匹配出的{{}}及其内部的内容一并替换成对象键值</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">template</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\{\\{</span><span style="color:#DBEDFF;">(</span><span style="color:#79B8FF;">.</span><span style="color:#F97583;">*?</span><span style="color:#DBEDFF;">)}</span><span style="color:#85E89D;font-weight:bold;">\\}</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">g</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> replaceObject[key];</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 导出工具方法集合</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tplReplace</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@file</span><span style="color:#6A737D;"> JS 函数工具库</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">libs/utils</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@version</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#005CC5;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@time</span><span style="color:#6A737D;"> 2020-02-17</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 替换HTML模板中{{}}的处理函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{function}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">template</span><span style="color:#6A737D;"> - template需要执行才会导出HTML字符串模板</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{object}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">replaceObject</span><span style="color:#6A737D;"> - 传入的模板中需要替换的变量字段</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tplReplace</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">template</span><span style="color:#24292E;">, </span><span style="color:#E36209;">replaceObject</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 1. 正则匹配出{{}}以及其内部的变量字符串</span></span>
<span class="line"><span style="color:#6A737D;">   * 2. 利用replace方法将匹配的内容与对象键值对应</span></span>
<span class="line"><span style="color:#6A737D;">   * 3. 将匹配出的{{}}及其内部的内容一并替换成对象键值</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">template</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/</span><span style="color:#22863A;font-weight:bold;">\\{\\{</span><span style="color:#032F62;">(</span><span style="color:#005CC5;">.</span><span style="color:#D73A49;">*?</span><span style="color:#032F62;">)}</span><span style="color:#22863A;font-weight:bold;">\\}</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">g</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> replaceObject[key];</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 导出工具方法集合</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tplReplace</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h3 id="页面文件" tabindex="-1">页面文件 <a class="header-anchor" href="#页面文件" aria-label="Permalink to &quot;页面文件&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@file</span><span style="color:#6A737D;"> 选项卡组件/页面子组件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">components/TabPage/Page</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@version</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#79B8FF;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@time</span><span style="color:#6A737D;"> 2020-02-17</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">Page/pageItem</span><span style="color:#6A737D;"> - 选项卡显示内容模板</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">Page/style</span><span style="color:#6A737D;"> - 选项卡内容模板样式</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">libs/utils</span><span style="color:#6A737D;"> - 解构tplReplace</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> tpl </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./pageItem.tpl&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./index.scss&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { tplReplace } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;../../../libs/utils&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@module</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">components/Page</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> Page组件出口文件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{Array.&lt;Object&gt;}</span><span style="color:#6A737D;">  </span><span style="color:#E1E4E8;">cityData</span><span style="color:#6A737D;"> - 城市信息集合数据</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">cityData</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 模块初始化函数</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> - page组件的HTML字符串</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/** </span><span style="color:#F97583;">@see</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">_makePage</span><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">_makePage</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 组装内容显示HTML</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> - html字符串</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">_makePage</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/** </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> 拼接内容显示子项HTML字符串 */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历城市集合数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    cityData.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">itemClassName</span><span style="color:#6A737D;"> - page子项的样式类</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">name</span><span style="color:#6A737D;"> - 城市名称</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">imgUrl</span><span style="color:#6A737D;"> - 城市图片远程网络地址</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#F97583;">@property</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">intro</span><span style="color:#6A737D;"> - 城市简介</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      list </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tplReplace</span><span style="color:#E1E4E8;">(tpl, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        itemClassName: </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">index </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;page-item page-current&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;page-item&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: item.name,</span></span>
<span class="line"><span style="color:#E1E4E8;">        imgUrl: item.img_url,</span></span>
<span class="line"><span style="color:#E1E4E8;">        intro: item.intro</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@see</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">_createWrapper</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tplReplace</span><span style="color:#E1E4E8;">(_createWrapper, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      list</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 创建选项卡内容显示容器</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{string}</span><span style="color:#6A737D;"> pageWrapper HTML字符串</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">_createWrapper</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&lt;div class=&quot;page-wrapper&quot;&gt;{{list}}&lt;/div&gt;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回该组件抛出的方法集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    init</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@file</span><span style="color:#6A737D;"> 选项卡组件/页面子组件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">components/TabPage/Page</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@version</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">0.1.0</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">yueluo </span><span style="color:#6A737D;">&lt;</span><span style="color:#005CC5;">yueluo.yang@qq.com</span><span style="color:#6A737D;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@time</span><span style="color:#6A737D;"> 2020-02-17</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">Page/pageItem</span><span style="color:#6A737D;"> - 选项卡显示内容模板</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">Page/style</span><span style="color:#6A737D;"> - 选项卡内容模板样式</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@requires</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">libs/utils</span><span style="color:#6A737D;"> - 解构tplReplace</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> tpl </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./pageItem.tpl&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./index.scss&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { tplReplace } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;../../../libs/utils&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@module</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">components/Page</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> Page组件出口文件</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{Array.&lt;Object&gt;}</span><span style="color:#6A737D;">  </span><span style="color:#24292E;">cityData</span><span style="color:#6A737D;"> - 城市信息集合数据</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">cityData</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 模块初始化函数</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> - page组件的HTML字符串</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/** </span><span style="color:#D73A49;">@see</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">_makePage</span><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">_makePage</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 组装内容显示HTML</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> - html字符串</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">_makePage</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/** </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> 拼接内容显示子项HTML字符串 */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历城市集合数据</span></span>
<span class="line"><span style="color:#24292E;">    cityData.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">itemClassName</span><span style="color:#6A737D;"> - page子项的样式类</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">name</span><span style="color:#6A737D;"> - 城市名称</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">imgUrl</span><span style="color:#6A737D;"> - 城市图片远程网络地址</span></span>
<span class="line"><span style="color:#6A737D;">       * </span><span style="color:#D73A49;">@property</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">intro</span><span style="color:#6A737D;"> - 城市简介</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      list </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tplReplace</span><span style="color:#24292E;">(tpl, {</span></span>
<span class="line"><span style="color:#24292E;">        itemClassName: </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">index </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;page-item page-current&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;page-item&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: item.name,</span></span>
<span class="line"><span style="color:#24292E;">        imgUrl: item.img_url,</span></span>
<span class="line"><span style="color:#24292E;">        intro: item.intro</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@see</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">_createWrapper</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tplReplace</span><span style="color:#24292E;">(_createWrapper, {</span></span>
<span class="line"><span style="color:#24292E;">      list</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 创建选项卡内容显示容器</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{string}</span><span style="color:#6A737D;"> pageWrapper HTML字符串</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">_createWrapper</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&lt;div class=&quot;page-wrapper&quot;&gt;{{list}}&lt;/div&gt;&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回该组件抛出的方法集合</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    init</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,86),e=[o];function c(t,r,y,i,E,A){return n(),a("div",null,e)}const d=s(l,[["render",c]]);export{F as __pageData,d as default};
