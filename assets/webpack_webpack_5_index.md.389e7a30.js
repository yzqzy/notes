import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.88002d8f.js";const l="/notes/assets/bundle_analysis.dc6334a5.png",o="/notes/assets/data_urls.affaec3e.png",e="/notes/assets/devtool.a8a2423a.png",g=JSON.parse('{"title":"webpack 5","description":"","frontmatter":{},"headers":[],"relativePath":"webpack/webpack_5/index.md","filePath":"webpack/webpack_5/index.md"}'),c={name:"webpack/webpack_5/index.md"},t=p(`<h1 id="webpack-5" tabindex="-1">webpack 5 <a class="header-anchor" href="#webpack-5" aria-label="Permalink to &quot;webpack 5&quot;">​</a></h1><p>模块化的问题</p><ul><li><p>ES Modules 存在兼容问题。</p></li><li><p>模块文件过多，网络请求频繁。</p></li><li><p>所有的前端资源都需要模块化。</p></li></ul><p>前端领域有一些工具就很好的解决了以上问题，比如 Webpack、Parcel、Rollup。</p><p>以 webpack 为例，webpack 模块打包器（module bundler），提供以下功能：</p><ul><li>模块加载器（Loader）</li><li>代码拆分（Code Splitting）</li><li>资源模块（Asset Module）</li></ul><p>打包工具解决的是前端整体模块化，并不单指 JavaScript 模块化。</p><h2 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i webpack webpack</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cli </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i webpack webpack</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cli </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm webpack </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">version</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// webpack: 5.74.0</span></span>
<span class="line"><span style="color:#6A737D;">// webpack-cli: 4.10.0</span></span>
<span class="line"><span style="color:#6A737D;">// webpack-dev-server not installed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm webpack </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">version</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// webpack: 5.74.0</span></span>
<span class="line"><span style="color:#6A737D;">// webpack-cli: 4.10.0</span></span>
<span class="line"><span style="color:#6A737D;">// webpack-dev-server not installed</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> createHeading </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./headling&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">headling</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHeading</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(headling)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> createHeading </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./headling&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">headling</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHeading</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(headling)</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/headling.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">element</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;h2&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  element.textContent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  element.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;click&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello webpack&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> element</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/headling.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">element</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;h2&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  element.textContent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">  element.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;click&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello webpack&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> element</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm webpack</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm webpack</span></span></code></pre></div><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><p>webpack 4 之后的版本支持零配置的方式启动打包。</p><p>整个打包过程会按照约定将 <code>src/index.js</code> 作为打包入口。</p><p><code>src/index.js</code> -&gt; <code>dist/main.js</code>。</p><p>可以在项目根目录下建立 <code>webpack.config.js</code> 文件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以配置 scripts 脚本</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;01_helloworld&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;version&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1.0.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;main&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;webpack&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;keywords&quot;</span><span style="color:#E1E4E8;">: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;author&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;license&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;ISC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;devDependencies&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;webpack&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^5.74.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;webpack-cli&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^4.10.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;01_helloworld&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;version&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1.0.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;description&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;main&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;build&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;webpack&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;keywords&quot;</span><span style="color:#24292E;">: [],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;author&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;license&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;ISC&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;devDependencies&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;webpack&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^5.74.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;webpack-cli&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^4.10.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>运行命令</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm build</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm build</span></span></code></pre></div><h2 id="工作模式" tabindex="-1">工作模式 <a class="header-anchor" href="#工作模式" aria-label="Permalink to &quot;工作模式&quot;">​</a></h2><p>针对不同环境预设的配置。</p><p>production（默认）、development、node</p><p><a href="https://webpack.js.org/configuration/mode/#usage" target="_blank" rel="noreferrer">webpack mode</a></p><p><a href="https://github.com/webpack/webpack/blob/main/lib/config/defaults.js" target="_blank" rel="noreferrer">webpack default options</a></p><h2 id="打包结果运行原理" tabindex="-1">打包结果运行原理 <a class="header-anchor" href="#打包结果运行原理" aria-label="Permalink to &quot;打包结果运行原理&quot;">​</a></h2><p>可以先设置 mode 为 none。</p><blockquote><p>vscode ctrl + k，ctrl + 0 可以折叠代码</p></blockquote><img src="`+l+`"><p>可以使用浏览器单步调试代码执行过程。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#85E89D;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;X-UA-Compatible&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;IE=edge&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;viewport&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;webpack&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;./dist/bundle.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;X-UA-Compatible&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;IE=edge&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;webpack&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;./dist/bundle.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="资源模块加载" tabindex="-1">资源模块加载 <a class="header-anchor" href="#资源模块加载" aria-label="Permalink to &quot;资源模块加载&quot;">​</a></h2><p>JavaScript 驱动前端应用</p><ul><li>逻辑合理，JS 导入资源文件</li><li>确保上线资源不缺失，都是必要的</li></ul><p>webpack5 使用 assets modules 可以实现定制功能</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">css</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;style-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;css-loader&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">(png</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">svg</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">jpg</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">jpeg</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">gif)</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">i</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&#39;asset&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        parser: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          dataUrlCondition: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            maxSize: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 10 KB</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">css</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;style-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;css-loader&#39;</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">(png</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">svg</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">jpg</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">jpeg</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">gif)</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">i</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&#39;asset&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        parser: {</span></span>
<span class="line"><span style="color:#24292E;">          dataUrlCondition: {</span></span>
<span class="line"><span style="color:#24292E;">            maxSize: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 10 KB</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>针对图片资源</p><ul><li>超出 10 KB 文件单独提取存放</li><li>小于 10 KB 文件转换为 Data URLs 嵌入代码中</li></ul><p>Data URLs</p><img src="`+o+`"><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">data:text/html;charset=UTF-8,&lt;h1&gt;html content&lt;h1&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">data:text/html;charset=UTF-8,&lt;h1&gt;html content&lt;h1&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">data:image/png;base64,ivadsadadakdasda...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">data:image/png;base64,ivadsadadakdasda...</span></span></code></pre></div><h2 id="常用加载器分类" tabindex="-1">常用加载器分类 <a class="header-anchor" href="#常用加载器分类" aria-label="Permalink to &quot;常用加载器分类&quot;">​</a></h2><p>编译转换</p><ul><li>css-loader</li></ul><p>文件操作</p><ul><li>file-loader</li></ul><p>代码检查</p><ul><li>eslint-loader</li></ul><h2 id="webpack-与-es-2015" tabindex="-1">webpack 与 ES 2015 <a class="header-anchor" href="#webpack-与-es-2015" aria-label="Permalink to &quot;webpack 与 ES 2015&quot;">​</a></h2><p>因为模块打包需要， webpack 会处理 import 和 export，但是并不会转换 ES6 特性，进行语法降级。</p><ul><li>babel-loader</li><li>@babel/core</li><li>@babel/preset-env</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i babel-loader @babel/core @babel/preset-env -D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i babel-loader @babel/core @babel/preset-env -D</span></span></code></pre></div><ul><li>webpack 只是打包工具</li><li>加载器可以用来编译转换代码</li></ul><h2 id="模块加载方式" tabindex="-1">模块加载方式 <a class="header-anchor" href="#模块加载方式" aria-label="Permalink to &quot;模块加载方式&quot;">​</a></h2><p>遵循 ES Modules 标准的 import 声明</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> createHeading </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./headling&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Avator </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./avator.jpg&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./main.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">headling</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHeading</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(headling)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Avator</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(img)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> createHeading </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./headling&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Avator </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./avator.jpg&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./main.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">headling</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHeading</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(headling)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">img</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Image</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Avator</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(img)</span></span></code></pre></div><p>遵循 CommonJS 标准的 require 函数</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">createHeading</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./headling&#39;</span><span style="color:#E1E4E8;">).default</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Avator</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./avator.jpg&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./main.css&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">headling</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHeading</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(headling)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Avator</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(img)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">createHeading</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./headling&#39;</span><span style="color:#24292E;">).default</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Avator</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./avator.jpg&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./main.css&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">headling</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHeading</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(headling)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">img</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Image</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Avator</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(img)</span></span></code></pre></div><p>遵循 AMD 标准的 define 函数和 require 函数</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">define</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;./headling.js&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;./avator.jpg&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;./main.css&#39;</span><span style="color:#E1E4E8;">], (</span><span style="color:#FFAB70;">createHeading</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">Avator</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">headling</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> createHeading.</span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(headling)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Avator</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(img)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">define</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;./headling.js&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;./avator.jpg&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;./main.css&#39;</span><span style="color:#24292E;">], (</span><span style="color:#E36209;">createHeading</span><span style="color:#24292E;">, </span><span style="color:#E36209;">Avator</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">headling</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> createHeading.</span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(headling)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">img</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Image</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Avator</span></span>
<span class="line"><span style="color:#24292E;">  document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(img)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>webpack 兼容多种模块化标准，但是不推荐混合使用。</p><p>Loader 加载的非 JavaScript 也会触发资源加载。</p><p>css-loader 加载的样式代码中的 @import 指令和 url 函数。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">min-height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">vh</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#ecf5ff</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-image</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">baclground.png</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">cover</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">body</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">min-height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">vh</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#ecf5ff</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-image</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">url</span><span style="color:#24292E;">(</span><span style="color:#E36209;">baclground.png</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">cover</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>html-loader 加载的 HTML 代码中图片标签的 src 属性。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> footerHtml </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./footer.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">document.</span><span style="color:#B392F0;">wirte</span><span style="color:#E1E4E8;">(footerHtml)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> footerHtml </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./footer.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">document.</span><span style="color:#6F42C1;">wirte</span><span style="color:#24292E;">(footerHtml)</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">html</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;html-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// default only support img:src </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">attrs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;img:src&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;a:href&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">:</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">html</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;html-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">options</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// default only support img:src </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">attrs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;img:src&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;a:href&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>webpack 模块加载方式</p><ul><li>遵循 ES Modules 标准的 import 声明</li><li>遵循 CommonJS 标准的 require 函数</li><li>遵循 AMD 标准的 define 函数和 require 函数</li><li>样式代码中的 @import 指令和 url 函数</li><li>HTML 代码中图片标签的 src 属性</li></ul><h2 id="核心工作原理" tabindex="-1">核心工作原理 <a class="header-anchor" href="#核心工作原理" aria-label="Permalink to &quot;核心工作原理&quot;">​</a></h2><p>由 entry 触发，解析所有需要的依赖，最终形成具有依赖关系的依赖树。</p><p>webpack 会递归依赖树，获取每个节点对应的资源文件，根据配置文件中的 rules 属性去找到模块对应的加载器进行处理。</p><p>最后将加载到的结果放入到打包结果中，从而实现整个项目的打包。</p><p>Loader 机制是 webpack 的核心。</p><h2 id="开发-loader" tabindex="-1">开发 Loader <a class="header-anchor" href="#开发-loader" aria-label="Permalink to &quot;开发 Loader&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// md-loader</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">marked</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;marked&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> marked.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(source)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// return \`module.exports = \${ JSON.stringify(html) }\`</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// return \`export default \${ JSON.stringify(html) }\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回 html 字符串，交给下一个 loader 处理</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> html</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// md-loader</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">marked</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;marked&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#E36209;">source</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">html</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> marked.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(source)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// return \`module.exports = \${ JSON.stringify(html) }\`</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// return \`export default \${ JSON.stringify(html) }\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回 html 字符串，交给下一个 loader 处理</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> html</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Loader 负责资源文件从输入到输出的转换，对于同一个资源可以依次使用多个 Loader</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    publicPath: </span><span style="color:#9ECBFF;">&#39;dist/&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">md</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;html-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;md-loader&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    publicPath: </span><span style="color:#032F62;">&#39;dist/&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">md</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;html-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;md-loader&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="插件机制" tabindex="-1">插件机制 <a class="header-anchor" href="#插件机制" aria-label="Permalink to &quot;插件机制&quot;">​</a></h2><p>增强 webpack 自动化能力。</p><p>Loader 专注实现资源模块加载，Plugin 解决项目中处理资源加载的其他自动化工作。</p><p>eg：</p><ul><li>自动在打包之前清除 dist 目录</li><li>拷贝静态文件至输出目录</li><li>压缩输出代码</li></ul><p>Loader + Plugin 可以实现大多数前端工程化工作。</p><p>自动清除输出目录插件</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clean-webpack-plugin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clean-webpack-plugin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><p>自动生成使用打包结果的 HTML</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">html-webpack-plugin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">html-webpack-plugin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">const path = require(&#39;path&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">const { </span><span style="color:#FDAEB7;font-style:italic;">CleanWebpackPlugin</span><span style="color:#E1E4E8;"> } = require(&#39;clean-webpack-plugin&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">module.exports = {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">CleanWebpackPlugin()</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">HtmlWebpackPlugin(</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">&#39;月落</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Web</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Developer</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">JS</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Fancier&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">meta</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">keywords</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">&#39;月落</span><span style="color:#E1E4E8;">,</span><span style="color:#FDAEB7;font-style:italic;">博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">&#39;月落个人博客，记载前端学习历程。&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">template</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">&#39;index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span><span style="color:#FDAEB7;font-style:italic;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">const path = require(&#39;path&#39;)</span></span>
<span class="line"><span style="color:#24292E;">const { </span><span style="color:#B31D28;font-style:italic;">CleanWebpackPlugin</span><span style="color:#24292E;"> } = require(&#39;clean-webpack-plugin&#39;)</span></span>
<span class="line"><span style="color:#24292E;">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">module.exports = {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">new</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">CleanWebpackPlugin()</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">new</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">HtmlWebpackPlugin(</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">title</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">&#39;月落</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">-</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Web</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Developer</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">JS</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Fancier&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">meta</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">keywords</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">&#39;月落</span><span style="color:#24292E;">,</span><span style="color:#B31D28;font-style:italic;">博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客&#39;,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">description</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">&#39;月落个人博客，记载前端学习历程。&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">template</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">&#39;index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span><span style="color:#B31D28;font-style:italic;">)</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#85E89D;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;X-UA-Compatible&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;IE=edge&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;viewport&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">%= htmlWebpackPlugin.options.title %&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;X-UA-Compatible&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;IE=edge&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">%= htmlWebpackPlugin.options.title %&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>复制文件夹</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i copy</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">webpack</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">plugin </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i copy</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">webpack</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">plugin </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">const CopyWebpackPlugin = require(&#39;copy-webpack-plugin&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">module.exports = {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">CopyWebpackPlugin(</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">patterns</span><span style="color:#E1E4E8;">: [</span><span style="color:#FDAEB7;font-style:italic;">&#39;public&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span><span style="color:#FDAEB7;font-style:italic;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">const CopyWebpackPlugin = require(&#39;copy-webpack-plugin&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">module.exports = {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">new</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">CopyWebpackPlugin(</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">patterns</span><span style="color:#24292E;">: [</span><span style="color:#B31D28;font-style:italic;">&#39;public&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span><span style="color:#B31D28;font-style:italic;">)</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="开发-plugin" tabindex="-1">开发 Plugin <a class="header-anchor" href="#开发-plugin" aria-label="Permalink to &quot;开发 Plugin&quot;">​</a></h2><p>相对于 Loader，Plugin 拥有更宽的能力范围。</p><p>Loader 只是在加载模块的环节中工作，插件的作用范围可以在 webpack 的每一个环节。</p><p>Plugin 通过钩子机制实现，我们开发插件就是在 webpack 提供的钩子中挂载函数实现扩展。</p><p><a href="https://webpack.js.org/api/" target="_blank" rel="noreferrer">https://webpack.js.org/api/</a></p><p>插件必须是一个函数或者是一个包含 apply 方法的对象。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">sources</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">Compilation</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyPlugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">compiler</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// compiler.hooks.emit.tap(&#39;MyPlugin&#39;, compilation =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//   // compilation 可以理解成此次打包的上下文</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//   for (const name in compilation.assets) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//     if (name.endsWith(&#39;.js&#39;)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//       const contents = compilation.assets[name].source()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//       const withoutComments = contents.replace(/\\/\\*+\\*\\//g, &#39;&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//       compilation.assets[name] = {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//         source: () =&gt; withoutComments,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//         size: () =&gt; withoutComments.length</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//       }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//     }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//   }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// })</span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.compilation.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;MyPlugin&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">compilation</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      compilation.hooks.processAssets.</span><span style="color:#B392F0;">tapPromise</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          name: </span><span style="color:#9ECBFF;">&#39;MyPlugin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L3280</span></span>
<span class="line"><span style="color:#E1E4E8;">          stage: Compilation.</span><span style="color:#79B8FF;">PROCESS_ASSETS_STAGE_ADDITIONAL</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        (</span><span style="color:#FFAB70;">assets</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> assets) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (name.</span><span style="color:#B392F0;">endsWith</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.js&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">contents</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> assets[name].</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">withoutComments</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> contents.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\/\\*</span><span style="color:#F97583;">+</span><span style="color:#85E89D;font-weight:bold;">\\*\\/</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">g</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">              assets[name] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> withoutComments,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">assets[name]</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(assets)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      )</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyPlugin</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">sources</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">Compilation</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyPlugin</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#E36209;">compiler</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// compiler.hooks.emit.tap(&#39;MyPlugin&#39;, compilation =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//   // compilation 可以理解成此次打包的上下文</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//   for (const name in compilation.assets) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//     if (name.endsWith(&#39;.js&#39;)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//       const contents = compilation.assets[name].source()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//       const withoutComments = contents.replace(/\\/\\*+\\*\\//g, &#39;&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//       compilation.assets[name] = {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//         source: () =&gt; withoutComments,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//         size: () =&gt; withoutComments.length</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//       }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//     }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//   }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// })</span></span>
<span class="line"><span style="color:#24292E;">    compiler.hooks.compilation.</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;MyPlugin&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">compilation</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      compilation.hooks.processAssets.</span><span style="color:#6F42C1;">tapPromise</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          name: </span><span style="color:#032F62;">&#39;MyPlugin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L3280</span></span>
<span class="line"><span style="color:#24292E;">          stage: Compilation.</span><span style="color:#005CC5;">PROCESS_ASSETS_STAGE_ADDITIONAL</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        (</span><span style="color:#E36209;">assets</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> assets) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (name.</span><span style="color:#6F42C1;">endsWith</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.js&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">contents</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> assets[name].</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">withoutComments</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> contents.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/</span><span style="color:#22863A;font-weight:bold;">\\/\\*</span><span style="color:#D73A49;">+</span><span style="color:#22863A;font-weight:bold;">\\*\\/</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">g</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">              assets[name] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> withoutComments,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">assets[name]</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(assets)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      )</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyPlugin</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>[DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated. BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.</p></blockquote><h2 id="devserver" tabindex="-1">DevServer <a class="header-anchor" href="#devserver" aria-label="Permalink to &quot;DevServer&quot;">​</a></h2><ul><li>HTTP 服务运行</li><li>自动编译、自动刷新浏览器</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">webpack-dev-server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">webpack-dev-server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><p>默认只会 serve 打包输出文件，如果其他资源文件也需要 serve。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Allows to configure options for serving static files from directory (by default &#39;public&#39; directory).</span></span>
<span class="line"><span style="color:#E1E4E8;">    static: </span><span style="color:#9ECBFF;">&#39;./public&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Allows to configure options for serving static files from directory (by default &#39;public&#39; directory).</span></span>
<span class="line"><span style="color:#24292E;">    static: </span><span style="color:#032F62;">&#39;./public&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><a href="https://github.com/webpack/webpack-dev-server" target="_blank" rel="noreferrer">webpack-dev-server</a></p><p>提供配置代理解决开发阶段接口跨域问题。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static: </span><span style="color:#9ECBFF;">&#39;./public&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxy: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/api&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// https://localhost:8080/api/users -&gt; https://api.github.com/api/users</span></span>
<span class="line"><span style="color:#E1E4E8;">        target: </span><span style="color:#9ECBFF;">&#39;https://api.github.com&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// https://api.github.com/api/users -&gt; https://api.github.com/users</span></span>
<span class="line"><span style="color:#E1E4E8;">        pathRewrite: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;^/api&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 不能使用 localhost:8080 作为请求 GitHub 主机名</span></span>
<span class="line"><span style="color:#E1E4E8;">        changeOrigin: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    static: </span><span style="color:#032F62;">&#39;./public&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    proxy: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/api&#39;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// https://localhost:8080/api/users -&gt; https://api.github.com/api/users</span></span>
<span class="line"><span style="color:#24292E;">        target: </span><span style="color:#032F62;">&#39;https://api.github.com&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// https://api.github.com/api/users -&gt; https://api.github.com/users</span></span>
<span class="line"><span style="color:#24292E;">        pathRewrite: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;^/api&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 不能使用 localhost:8080 作为请求 GitHub 主机名</span></span>
<span class="line"><span style="color:#24292E;">        changeOrigin: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="source-map" tabindex="-1">Source Map <a class="header-anchor" href="#source-map" aria-label="Permalink to &quot;Source Map&quot;">​</a></h2><p>生产环境运行代码和源代码之间完全不同，如果需要调试应用，或者运行过程中出现错误都将无法定位。调试和报错都是基于运行代码。</p><p>Source Map 就是用于解决此类问题最好的办法，用来映射转换后代码与源代码之间的关系。</p><p>可以通过 source map 文件逆向解析源代码。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//# sourceMappingURL=xxxx.map</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//# sourceMappingURL=xxxx.map</span></span></code></pre></div><p>source map 解决了源代码与运行代码不一致所产生的问题。</p><p>配置 source map</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  devtool: </span><span style="color:#9ECBFF;">&#39;source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  devtool: </span><span style="color:#032F62;">&#39;source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>webpack 支持很多种 <a href="https://webpack.js.org/configuration/devtool/" target="_blank" rel="noreferrer">source map</a> 的实现方式，每种方式的效率和效果各不相同。</p><p>eval：将模块转换后代码放到 eval 函数中，并且在 eval 函数字符串最后通过 sourceURL 方式说明对应文件路径。</p><blockquote><p>这种模式下不会生成 source map 文件，不存在行列信息</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">eval</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;__webpack_require__.r(__webpack_exports__);</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">/* harmony import */ var _headling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headling */ </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">./src/headling.js</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">);</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">/* harmony import */ var _avator_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./avator.jpg */ </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">./src/avator.jpg</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">);</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.css */ </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">./src/main.css</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">);</span><span style="color:#79B8FF;">\\n\\n\\n\\n</span><span style="color:#9ECBFF;">var headling = (0,_headling__WEBPACK_IMPORTED_MODULE_0__[</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">default</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">])();</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">document.body.append(headling);</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">var img = new Image();</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">img.src = _avator_jpg__WEBPACK_IMPORTED_MODULE_1__;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">document.body.append(img);</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">console.log2(&#39;222&#39;);</span><span style="color:#79B8FF;">\\n\\n</span><span style="color:#9ECBFF;">//# sourceURL=webpack://01_helloworld/./src/main.js?&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">eval</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;__webpack_require__.r(__webpack_exports__);</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">/* harmony import */ var _headling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headling */ </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">./src/headling.js</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">);</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">/* harmony import */ var _avator_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./avator.jpg */ </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">./src/avator.jpg</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">);</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.css */ </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">./src/main.css</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">);</span><span style="color:#005CC5;">\\n\\n\\n\\n</span><span style="color:#032F62;">var headling = (0,_headling__WEBPACK_IMPORTED_MODULE_0__[</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">default</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">])();</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">document.body.append(headling);</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">var img = new Image();</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">img.src = _avator_jpg__WEBPACK_IMPORTED_MODULE_1__;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">document.body.append(img);</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">console.log2(&#39;222&#39;);</span><span style="color:#005CC5;">\\n\\n</span><span style="color:#032F62;">//# sourceURL=webpack://01_helloworld/./src/main.js?&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>配置 webpack.config.js 查看多种模式结果</p><blockquote><p>The pattern is: <code>[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map</code>.</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">merge</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-merge&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">CleanWebpackPlugin</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;clean-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CopyWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;copy-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">allModes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;eval&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;eval-cheap-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;eval-cheap-module-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;eval-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;cheap-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;cheap-module-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;inline-cheap-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;inline-cheap-module-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;inline-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;hidden-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;nosources-source-map&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// bug: clean failed</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CleanWebpackPlugin</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static: </span><span style="color:#9ECBFF;">&#39;./public&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> allModes.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">mode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devtool: mode,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">\`js/\${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">mode</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}.js\`</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;月落 - Web Developer &amp; JS Fancier&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        keywords: </span><span style="color:#9ECBFF;">&#39;月落,博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        description: </span><span style="color:#9ECBFF;">&#39;月落个人博客，记载前端学习历程。&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">mode</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}.html\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">merge</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-merge&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">CleanWebpackPlugin</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;clean-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CopyWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;copy-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">allModes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;eval&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;eval-cheap-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;eval-cheap-module-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;eval-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;cheap-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;cheap-module-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;inline-cheap-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;inline-cheap-module-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;inline-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;hidden-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;nosources-source-map&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// bug: clean failed</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CleanWebpackPlugin</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    static: </span><span style="color:#032F62;">&#39;./public&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> allModes.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">mode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devtool: mode,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">\`js/\${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">mode</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}.js\`</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;月落 - Web Developer &amp; JS Fancier&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      meta: {</span></span>
<span class="line"><span style="color:#24292E;">        keywords: </span><span style="color:#032F62;">&#39;月落,博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        description: </span><span style="color:#032F62;">&#39;月落个人博客，记载前端学习历程。&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">mode</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}.html\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}))</span></span></code></pre></div><p>可以使用 <code>server dist</code> 启动 server，预览不同的文件，对比差异。</p><img src="`+e+`"><blockquote><p>The pattern is: <code>[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map</code>.</p></blockquote><p>eval：不会生成 source map 文件（不存在行列信息），可以定位文件错误</p><p>eval-source-map：生成 source map 文件（存在行列信息），可以定位文件错误</p><p>eval-cheap-source-map：生成 source map 文件（阉割版，存在行，缺失列信息），可以定位文件错误</p><p>eval-cheap-module-source-map：生成 source map 文件（阉割版，存在行，缺失列信息，未经过转化的源代码），可以定位文件错误</p><blockquote><p>eval：是否使用 eval 执行模块代码</p><p>cheap：source map 是否包含行信息</p><p>module：是否能够得到 Loader 处理之前的代码</p></blockquote><p>inline-source-map：source-map 的文件是以 data url 的方式存在，以 data url 方式嵌入到代码中</p><p>hidden-source-map：看不到 source-map 效果，确实会生成 source-map 文件，但是不会引入文件（开发第三方包时比较有用）</p><p>nosources-source-map：可以看到错误出现位置（存在行列信息），但是不能看到源代码，生产环境中保护源代码不被暴露</p><p>官方推荐</p><ul><li><p>开发环境</p><ul><li><p>eval</p></li><li><p>eval-source-map</p></li><li><p>eval-cheap-source-map</p></li><li><p>eval-cheap-module-source-map（个人推荐）</p><ul><li>代码经过 loader 转换过后的代码差异比较大（ module）</li><li>首次打包速度慢无所谓，重写打包相对较快（cheap）</li></ul></li></ul></li><li><p>生产环境</p><ul><li><p>none（个人推荐）</p></li><li><p>source-map</p></li><li><p>hidden-source-map</p></li><li><p>nosources-source-map（个人推荐）</p></li></ul></li></ul><p>调试是开发阶段的事情，而不是生产环境让用户帮忙测试。</p><p>理解不同模式的差异，适配不同的环境。开发时并没有绝对的通用法则。</p><h2 id="hmr" tabindex="-1">HMR <a class="header-anchor" href="#hmr" aria-label="Permalink to &quot;HMR&quot;">​</a></h2><p>webpack Dev Server 提供对开发者友好的开发服务器。使我们更加关注与业务编码。</p><p>dev server：</p><ul><li>文本内容丢失问题</li></ul><p>解决措施：</p><ul><li>代码中写死编辑器内容</li><li>额外代码实现刷新前保存，刷新后读取</li></ul><p>问题核心：自动刷新导致页面状态丢失</p><p>更好的解决办法是在页面不刷新的前提下，模块也可以及时更新</p><p>HMR（Hot Module Replacement）：模块热替换，或者模块热更新</p><p>热拔插：在一个正在运行的机器上随时插拔设备，机器的运行状态不受插拔设备的影响</p><p>模块热替换指应用程序运行过程中实时替换某个模块，应用运行状态不会改变</p><p>HMR 是 webpack 中最强大的功能之一。可以极大程度提高开发者的工作效率。</p><p><a href="https://webpack.js.org/configuration/dev-server/" target="_blank" rel="noreferrer">webpack dev server</a> 默认已开启模块热替换。</p><blockquote><p><code>only</code>、<code>boolean = true</code></p><p>Enable webpack&#39;s <a href="https://webpack.js.org/concepts/hot-module-replacement/" target="_blank" rel="noreferrer">Hot Module Replacement</a> feature:</p><p>Since webpack-dev-server v4, HMR is enabled by default. It automatically applies <a href="https://webpack.js.org/plugins/hot-module-replacement-plugin/" target="_blank" rel="noreferrer"><code>webpack.HotModuleReplacementPlugin</code></a> which is required to enable HMR. So you don&#39;t have to add this plugin to your <code>webpack.config.js</code> when <code>hot</code> is set to <code>true</code> in config or via the CLI option <code>--hot</code>. See the <a href="https://webpack.js.org/concepts/hot-module-replacement/" target="_blank" rel="noreferrer">HMR concepts page</a> for more information.</p></blockquote><p>webpack 5</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">devServer</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">static</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;./public&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">hot</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">devServer</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">static</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;./public&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">hot</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>webpack4</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">webpack</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> webpack.</span><span style="color:#B392F0;">HotModuleReplacementPlugin</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static: </span><span style="color:#9ECBFF;">&#39;./public&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    hot: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">webpack</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> webpack.</span><span style="color:#6F42C1;">HotModuleReplacementPlugin</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    static: </span><span style="color:#032F62;">&#39;./public&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    hot: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>开启模块热替换且 <code>hot：true </code> 状态下，仍然存在修改 JS 页面状态丢失的情况，CSS 修改不会丢失状态。</p><p>webpack 中的 HMR 并不可以开箱即用，还需要手动处理模块热替换逻辑。</p><p>为什么样式文件支持热更新</p><ul><li>样式文件是经过 loader 处理的，style-loader 中自动处理了样式文件的热更新</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">content.locals </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.invalidate) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isEqualLocals</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isEqualLocals</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">isNamedExport</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;"> 			</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> isNamedExport </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">content.locals;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> oldLocals </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isNamedExport </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> namedExport </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> content.locals;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.</span><span style="color:#B392F0;">accept</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;!!../node_modules/.pnpm/css-loader@6.7.1_webpack@5.74.0/node_modules/css-loader/dist/cjs.js!./editor.css&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isEqualLocals</span><span style="color:#E1E4E8;">(oldLocals, isNamedExport </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> namedExport </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> content.locals, isNamedExport)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.</span><span style="color:#B392F0;">invalidate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        oldLocals </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isNamedExport </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> namedExport </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> content.locals;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(content);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">content.locals </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.invalidate) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isEqualLocals</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isEqualLocals</span><span style="color:#24292E;">(</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">, </span><span style="color:#E36209;">isNamedExport</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;"> 			</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> isNamedExport </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">content.locals;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> oldLocals </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isNamedExport </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> namedExport </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> content.locals;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.</span><span style="color:#6F42C1;">accept</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;!!../node_modules/.pnpm/css-loader@6.7.1_webpack@5.74.0/node_modules/css-loader/dist/cjs.js!./editor.css&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isEqualLocals</span><span style="color:#24292E;">(oldLocals, isNamedExport </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> namedExport </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> content.locals, isNamedExport)) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.</span><span style="color:#6F42C1;">invalidate</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        oldLocals </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isNamedExport </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> namedExport </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> content.locals;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">(content);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>为什么脚本文件不能自动处理</p><ul><li>样式模块更新后，只需要将更新过后的 CSS 及时替换到页面中，就可以覆盖掉原有样式，实现样式更新。</li><li>JavaScript 模块实现并没有任何规律，无法做到通用的模块替换方案。</li></ul><p>没有手动处理，JS 也支持热替换</p><ul><li>使用的框架或者 CLI 中项目中，每种文件都是有规律的，就可以制定通用的替换办法</li><li>通过脚手架创建的项目内部都集成了 HMR 方案</li></ul><p><a href="https://webpack.js.org/guides/hot-module-replacement" target="_blank" rel="noreferrer">HMR Guides</a>、<a href="https://webpack.js.org/api/hot-module-replacement/" target="_blank" rel="noreferrer">HMR APIs</a></p><p>JS 模块热替换：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> createEditor </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./editor&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Avator </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./avator.jpg&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./main.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">editor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createEditor</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(editor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Avator</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(img)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ========== hot module replacement</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> lasEditor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> editor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.</span><span style="color:#B392F0;">accept</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./editor&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lasEditor.innerHTML</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.body.</span><span style="color:#B392F0;">removeChild</span><span style="color:#E1E4E8;">(lasEditor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">newEditor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createEditor</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    newEditor.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(newEditor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    lasEditor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newEditor</span></span>
<span class="line"><span style="color:#E1E4E8;">  })  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> createEditor </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./editor&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Avator </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./avator.jpg&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./main.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">editor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createEditor</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(editor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">img</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Image</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Avator</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(img)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ========== hot module replacement</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> lasEditor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> editor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.</span><span style="color:#6F42C1;">accept</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./editor&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lasEditor.innerHTML</span></span>
<span class="line"><span style="color:#24292E;">    document.body.</span><span style="color:#6F42C1;">removeChild</span><span style="color:#24292E;">(lasEditor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">newEditor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createEditor</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    newEditor.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(newEditor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    lasEditor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newEditor</span></span>
<span class="line"><span style="color:#24292E;">  })  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>不同的模块有不同的逻辑，不同的业务逻辑处理过程也是不同的，所以 webpack 没办法提供通用的热替换方案。</p><p>图片模块热替换：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.hot.</span><span style="color:#B392F0;">accept</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./avator.jpg&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Avator</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.hot.</span><span style="color:#6F42C1;">accept</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./avator.jpg&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Avator</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意事项:</p><ul><li>处理 HMR 的代码报错会导致自动刷新，且错误信息被清除 <ul><li>推荐使用 hot: &#39;only&#39;，HMR 代码报错，不会自动刷新</li></ul></li><li>代码中多了与业务无关的代码 <ul><li>生产环境不开启热替换功能，<code>module.hot</code> 变量为 false，会被 tree-shaking</li></ul></li></ul><p><a href="https://github.com/yw0525/notes/tree/master/webpack/webpack_5/09_hmr" target="_blank" rel="noreferrer">example: 09_hmr</a></p><h2 id="生产环境优化" tabindex="-1">生产环境优化 <a class="header-anchor" href="#生产环境优化" aria-label="Permalink to &quot;生产环境优化&quot;">​</a></h2><h3 id="配置文件拆分" tabindex="-1">配置文件拆分 <a class="header-anchor" href="#配置文件拆分" aria-label="Permalink to &quot;配置文件拆分&quot;">​</a></h3><p>生产环境注重运行效率，开发环境注重开发效率。</p><p>模式（mode）</p><ul><li>production</li><li>development</li></ul><p>配置文件根据环境不同导出不同配置</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">env</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">argv</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (argv.mode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (argv.mode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> config</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">env</span><span style="color:#24292E;">, </span><span style="color:#E36209;">argv</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (argv.mode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (argv.mode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> config</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>一个环境对应一个配置文件</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;dev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;webpack serve --config webpack.dev.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;webpack --config webpack.prod.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;dev&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;webpack serve --config webpack.dev.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;build&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;webpack --config webpack.prod.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.common.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&#39;./src/main.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    clean: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">css</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;style-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;css-loader&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">(png</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">svg</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">jpg</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">jpeg</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">gif)</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">i</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&#39;asset&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        parser: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          dataUrlCondition: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            maxSize: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 10 KB</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;月落 - Web Developer &amp; JS Fancier&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        keywords: </span><span style="color:#9ECBFF;">&#39;月落,博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        description: </span><span style="color:#9ECBFF;">&#39;月落个人博客，记载前端学习历程。&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.common.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&#39;./src/main.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    clean: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">css</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;style-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;css-loader&#39;</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">(png</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">svg</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">jpg</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">jpeg</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">gif)</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">i</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&#39;asset&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        parser: {</span></span>
<span class="line"><span style="color:#24292E;">          dataUrlCondition: {</span></span>
<span class="line"><span style="color:#24292E;">            maxSize: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 10 KB</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;月落 - Web Developer &amp; JS Fancier&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      meta: {</span></span>
<span class="line"><span style="color:#24292E;">        keywords: </span><span style="color:#032F62;">&#39;月落,博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        description: </span><span style="color:#032F62;">&#39;月落个人博客，记载前端学习历程。&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.dev.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">merge</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-merge&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CopyWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;copy-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./webpack.common&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devtool: </span><span style="color:#9ECBFF;">&#39;eval-cheap-module-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    static: </span><span style="color:#9ECBFF;">&#39;./public&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxy: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/api&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// https://localhost:8080/api/users -&gt; https://api.github.com/api/users</span></span>
<span class="line"><span style="color:#E1E4E8;">        target: </span><span style="color:#9ECBFF;">&#39;https://api.github.com&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// https://api.github.com/api/users -&gt; https://api.github.com/users</span></span>
<span class="line"><span style="color:#E1E4E8;">        pathRewrite: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;^/api&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 不能使用 localhost:8080 作为请求 GitHub 主机名</span></span>
<span class="line"><span style="color:#E1E4E8;">        changeOrigin: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.dev.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">merge</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-merge&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CopyWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;copy-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./webpack.common&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devtool: </span><span style="color:#032F62;">&#39;eval-cheap-module-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    static: </span><span style="color:#032F62;">&#39;./public&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    proxy: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/api&#39;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// https://localhost:8080/api/users -&gt; https://api.github.com/api/users</span></span>
<span class="line"><span style="color:#24292E;">        target: </span><span style="color:#032F62;">&#39;https://api.github.com&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// https://api.github.com/api/users -&gt; https://api.github.com/users</span></span>
<span class="line"><span style="color:#24292E;">        pathRewrite: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;^/api&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 不能使用 localhost:8080 作为请求 GitHub 主机名</span></span>
<span class="line"><span style="color:#24292E;">        changeOrigin: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">merge</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-merge&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CopyWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;copy-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./webpack.common&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devtool: </span><span style="color:#9ECBFF;">&#39;nosources-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CopyWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      patterns: [</span><span style="color:#9ECBFF;">&#39;public&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">merge</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-merge&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CopyWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;copy-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./webpack.common&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devtool: </span><span style="color:#032F62;">&#39;nosources-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CopyWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      patterns: [</span><span style="color:#032F62;">&#39;public&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="defineplugin" tabindex="-1">DefinePlugin <a class="header-anchor" href="#defineplugin" aria-label="Permalink to &quot;DefinePlugin&quot;">​</a></h3><p>为代码注入全局成员，webpack 内置插件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.common.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">webpack</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> webpack.</span><span style="color:#B392F0;">DefinePlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      API_BASE_URL: </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;https://api.github.com&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.common.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">webpack</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> webpack.</span><span style="color:#6F42C1;">DefinePlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      API_BASE_URL: </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;https://api.github.com&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// main.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ========== fetch proxy api example</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">isProd</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isProd </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">API_BASE_URL</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}/users\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/api/users&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ul</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;ul&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">(url)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> res.</span><span style="color:#B392F0;">json</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(data)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      data.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">li</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;li&#39;</span><span style="color:#E1E4E8;">)        </span></span>
<span class="line"><span style="color:#E1E4E8;">        li.textContent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item.login</span></span>
<span class="line"><span style="color:#E1E4E8;">        ul.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(li)</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      document.body.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(ul)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// main.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ========== fetch proxy api example</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">isProd</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">url</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isProd </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">API_BASE_URL</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}/users\`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/api/users&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ul</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;ul&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">(url)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> res.</span><span style="color:#6F42C1;">json</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(data)) {</span></span>
<span class="line"><span style="color:#24292E;">      data.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">li</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;li&#39;</span><span style="color:#24292E;">)        </span></span>
<span class="line"><span style="color:#24292E;">        li.textContent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item.login</span></span>
<span class="line"><span style="color:#24292E;">        ul.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(li)</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      document.body.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(ul)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span></code></pre></div><h3 id="tree-shaking" tabindex="-1">Tree Shaking <a class="header-anchor" href="#tree-shaking" aria-label="Permalink to &quot;Tree Shaking&quot;">​</a></h3><p>摇树优化，“摇掉” 代码中未引用代码（dead-code）。生产环境默认开启。</p><p>Tree Shaking 并不单指 webpack 某个配置选项，是一组功能搭配使用后的优化效果。</p><p><a href="https://webpack.js.org/guides/tree-shaking/" target="_blank" rel="noreferrer">Tree Shaking</a></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimization: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    usedExports: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 标记 “枯树叶”</span></span>
<span class="line"><span style="color:#E1E4E8;">    minimize: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 负责 “摇掉” 它们</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  optimization: {</span></span>
<span class="line"><span style="color:#24292E;">    usedExports: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 标记 “枯树叶”</span></span>
<span class="line"><span style="color:#24292E;">    minimize: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 负责 “摇掉” 它们</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>很多资源说使用 babel-loader 会导致 tree-shaking 失效，其实这种说法是不恰当的。</p><p>Tree Shaking 实现的前提是 ES Modules，使用 import、export 关键字，也就是说交由 webpack 打包的代码必须使用 ESM。</p><p>webpack 在打包模块之前会先将模块根据配置交由不同的 loader 去处理，最新再将所有 loader 处理的结果进行打包。</p><p>为了转换代码中的 ECMAScript 新特性，很多时候我们都会选择 babel-loader 去处理 JS，babel 在转换代码时根据配置就有可能将 ES Modules 转换为 Common JS 。类如 <code>@bebel/preset-env</code> 这个插件集合就存在这样的功能。</p><p>最新版本的 babel-loader 已经帮我们关闭了自动转换语法的插件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 强制开启插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [[</span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">, { modules: </span><span style="color:#9ECBFF;">&#39;commonjs&#39;</span><span style="color:#E1E4E8;"> }]]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 强制开启插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [[</span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">, { modules: </span><span style="color:#032F62;">&#39;commonjs&#39;</span><span style="color:#24292E;"> }]]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="合并模块" tabindex="-1">合并模块 <a class="header-anchor" href="#合并模块" aria-label="Permalink to &quot;合并模块&quot;">​</a></h3><p><a href="https://webpack.js.org/configuration/optimization/#optimizationconcatenatemodules" target="_blank" rel="noreferrer">concatenateModules</a></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimization: {</span></span>
<span class="line"><span style="color:#E1E4E8;">		concatenateModules: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  optimization: {</span></span>
<span class="line"><span style="color:#24292E;">		concatenateModules: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>尽可能将所有模块合并输出到一个函数中，既提升运行效率，又减少代码体积，这个特性也被称为 Scope Hoisting（作用域提升）。</p><h3 id="sideeffects" tabindex="-1">sideEffects <a class="header-anchor" href="#sideeffects" aria-label="Permalink to &quot;sideEffects&quot;">​</a></h3><p><a href="https://webpack.js.org/configuration/optimization/#optimizationsideeffects" target="_blank" rel="noreferrer">sideEffects</a></p><p><a href="https://webpack.js.org/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects" target="_blank" rel="noreferrer">tree-shaking-and-sideeffects</a></p><p>标识代码是否有副作用，为 tree shaking 提供更大的压缩空间。</p><p>副作用：模块执行时除了导出成员之外所做的事情</p><p>sideEffects 通常用于 npm 包标记是否存在副作用</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimization: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 开启功能</span></span>
<span class="line"><span style="color:#E1E4E8;">		sodeEffects: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  optimization: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 开启功能</span></span>
<span class="line"><span style="color:#24292E;">		sodeEffects: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>此特性在 production 模式默认也是开启的。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 标记所有代码都没有副作用（没有使用的模块打包后会被 tree shaking）</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;sideEffects&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 标记所有代码都没有副作用（没有使用的模块打包后会被 tree shaking）</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;sideEffects&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>使用这个功能之前要确保你的代码真的没有副作用，否则 webpack 打包后会误删掉具有副作用的代码。</p><p>解决方法就是在 package.json 中关闭副作用，或者标识哪些文件是存在副作用的。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 标记存在副作用的文件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;sideEffects&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;**/*.css&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;**/*.scss&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;./esnext/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;./esnext/configure.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 标记存在副作用的文件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;sideEffects&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;**/*.css&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;**/*.scss&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;./esnext/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;./esnext/configure.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="代码分割" tabindex="-1">代码分割 <a class="header-anchor" href="#代码分割" aria-label="Permalink to &quot;代码分割&quot;">​</a></h2><p>项目中所有代码最终都会被打包到一起，bundle 体积过大。</p><p>模块打包是必要的，当应用越来越大之后，代码分割也是必要的。</p><p>大多数时候并不是每个模块都需要在启动时加载，所以就需要代码分割，按需加载。</p><p>目前主流的 HTTP/1.1 版本本身存在很多缺陷，例如：</p><ul><li>同域名并行请求限制</li><li>每次请求都会有一定的延迟</li><li>请求的 header 浪费带宽流量</li></ul><p>通过把模块按照设计规则打包到不到的 bundle 中，从而提高应用响应速度。</p><p>目前 webpack 实现分包的方式主要有两种：</p><ul><li>多入口打包</li><li>动态导入</li></ul><h3 id="多入口打包" tabindex="-1">多入口打包 <a class="header-anchor" href="#多入口打包" aria-label="Permalink to &quot;多入口打包&quot;">​</a></h3><p>适用于传统的多页应用程序。</p><p>一个页面对应一个打包入口，公共部分单独提取。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.common.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    index: </span><span style="color:#9ECBFF;">&#39;./src/index.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    album: </span><span style="color:#9ECBFF;">&#39;./src/album.js&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;[name].bundle.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;dist&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">css</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: [</span><span style="color:#9ECBFF;">&#39;style-loader&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;css-loader&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;Multi Entry&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./src/index.html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&#39;index.html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      chunks: [</span><span style="color:#9ECBFF;">&#39;index&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;Multi Entry&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./src/album.html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&#39;album.html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      chunks: [</span><span style="color:#9ECBFF;">&#39;album&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.common.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  entry: {</span></span>
<span class="line"><span style="color:#24292E;">    index: </span><span style="color:#032F62;">&#39;./src/index.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    album: </span><span style="color:#032F62;">&#39;./src/album.js&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;[name].bundle.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;dist&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">css</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: [</span><span style="color:#032F62;">&#39;style-loader&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;css-loader&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;Multi Entry&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./src/index.html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&#39;index.html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      chunks: [</span><span style="color:#032F62;">&#39;index&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;Multi Entry&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./src/album.html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&#39;album.html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      chunks: [</span><span style="color:#032F62;">&#39;album&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><a href="https://github.com/yw0525/notes/tree/master/webpack/webpack_5/11_multi_entry" target="_blank" rel="noreferrer">example: 11_multi_entry</a></p><h3 id="提取公共模块" tabindex="-1">提取公共模块 <a class="header-anchor" href="#提取公共模块" aria-label="Permalink to &quot;提取公共模块&quot;">​</a></h3><p>不同打包入口中肯定会有公共模块，按照上述配置就会出现不同的打包结果中会有相同的模块出现。</p><p>webpack 中提取工共模块也非常简单，只需要开启 splitChunks 功能即可。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">merge</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-merge&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CopyWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;copy-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./webpack.common&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    clean: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  devtool: </span><span style="color:#9ECBFF;">&#39;nosources-source-map&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimization: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// https://webpack.js.org/plugins/split-chunks-plugin/</span></span>
<span class="line"><span style="color:#E1E4E8;">    splitChunks: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      chunks: </span><span style="color:#9ECBFF;">&#39;all&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      minChunks: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      minSize: </span><span style="color:#79B8FF;">10000</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CopyWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      patterns: [</span><span style="color:#9ECBFF;">&#39;public&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">merge</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-merge&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CopyWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;copy-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./webpack.common&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    clean: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  devtool: </span><span style="color:#032F62;">&#39;nosources-source-map&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  optimization: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// https://webpack.js.org/plugins/split-chunks-plugin/</span></span>
<span class="line"><span style="color:#24292E;">    splitChunks: {</span></span>
<span class="line"><span style="color:#24292E;">      chunks: </span><span style="color:#032F62;">&#39;all&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      minChunks: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      minSize: </span><span style="color:#005CC5;">10000</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CopyWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      patterns: [</span><span style="color:#032F62;">&#39;public&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p><a href="https://github.com/yw0525/notes/tree/master/webpack/webpack_5/11_multi_entry" target="_blank" rel="noreferrer">example: 11_multi_entry</a></p><h3 id="动态导入" tabindex="-1">动态导入 <a class="header-anchor" href="#动态导入" aria-label="Permalink to &quot;动态导入&quot;">​</a></h3><p>按需加载。需要用到某个模块时，再加载模块。</p><p>webpack 支持以动态导入的方式实现按需加载，并且所有动态导入的模块会被自动分包。</p><p>相对于多入口方式，动态导入更加灵活，我们可以通过代码逻辑控制模块加载时机。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import posts from &#39;./posts/posts&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// import album from &#39;./album/album&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.location.hash </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;#posts&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mainElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.main&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  mainElement.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hash </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;#posts&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// mainElement.appendChild(posts())</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./posts/posts&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(({ </span><span style="color:#FFAB70;">default</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">posts</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      mainElement.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">posts</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hash </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;#album&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// mainElement.appendChild(album())</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./album/album&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(({ </span><span style="color:#FFAB70;">default</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">album</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      mainElement.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">album</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hashchange&#39;</span><span style="color:#E1E4E8;">, render)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import posts from &#39;./posts/posts&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// import album from &#39;./album/album&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.location.hash </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;#posts&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">mainElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.main&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  mainElement.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hash </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;#posts&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// mainElement.appendChild(posts())</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./posts/posts&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(({ </span><span style="color:#E36209;">default</span><span style="color:#24292E;">: </span><span style="color:#E36209;">posts</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      mainElement.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">posts</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hash </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;#album&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// mainElement.appendChild(album())</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./album/album&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(({ </span><span style="color:#E36209;">default</span><span style="color:#24292E;">: </span><span style="color:#E36209;">album</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      mainElement.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">album</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">render</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hashchange&#39;</span><span style="color:#24292E;">, render)</span></span></code></pre></div><p><a href="https://github.com/yw0525/notes/tree/master/webpack/webpack_5/12_dynamic_import" target="_blank" rel="noreferrer">example: 12_dynamic_import</a></p><p>如果你使用的是单页应用开发框架，例如 react 或者 vue，路由映射组件就可以通过这种动态导入的方式实现按需加载。</p><h3 id="魔法注释" tabindex="-1">魔法注释 <a class="header-anchor" href="#魔法注释" aria-label="Permalink to &quot;魔法注释&quot;">​</a></h3><p>Magic Comments.</p><p>默认通过动态导入产生的 bundle 文件文件，名称只是一个序号。</p><p>使用魔法注释可以对分包产生的 bundle 进行命名。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.location.hash </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;#posts&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mainElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.main&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  mainElement.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hash </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;#posts&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#6A737D;">/* webpackChunkName: &#39;components&#39; */</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./posts/posts&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      ({ </span><span style="color:#FFAB70;">default</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">posts</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        mainElement.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">posts</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hash </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;#album&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#6A737D;">/* webpackChunkName: &#39;components&#39; */</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./album/album&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      ({ </span><span style="color:#FFAB70;">default</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">album</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        mainElement.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">album</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hashchange&#39;</span><span style="color:#E1E4E8;">, render)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.location.hash </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;#posts&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">mainElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.main&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  mainElement.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hash </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;#posts&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span><span style="color:#6A737D;">/* webpackChunkName: &#39;components&#39; */</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./posts/posts&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      ({ </span><span style="color:#E36209;">default</span><span style="color:#24292E;">: </span><span style="color:#E36209;">posts</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        mainElement.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">posts</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hash </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;#album&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span><span style="color:#6A737D;">/* webpackChunkName: &#39;components&#39; */</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./album/album&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      ({ </span><span style="color:#E36209;">default</span><span style="color:#24292E;">: </span><span style="color:#E36209;">album</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        mainElement.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">album</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">render</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hashchange&#39;</span><span style="color:#24292E;">, render)</span></span></code></pre></div><h2 id="css-文件" tabindex="-1">CSS 文件 <a class="header-anchor" href="#css-文件" aria-label="Permalink to &quot;CSS 文件&quot;">​</a></h2><h3 id="minicssextractplugin" tabindex="-1">MiniCssExtractPlugin <a class="header-anchor" href="#minicssextractplugin" aria-label="Permalink to &quot;MiniCssExtractPlugin&quot;">​</a></h3><p>提取 css 文件。</p><p>将 css 代码从打包结果中提取出来，通过这个插件可以实现 css 模块按需加载。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mini-css-extract-plugin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mini-css-extract-plugin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">merge</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-merge&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CopyWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;copy-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MiniCssExtractPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mini-css-extract-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./webpack.common&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">css</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: [MiniCssExtractPlugin.loader, </span><span style="color:#9ECBFF;">&#39;css-loader&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CopyWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      patterns: [</span><span style="color:#9ECBFF;">&#39;public&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MiniCssExtractPlugin</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">merge</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-merge&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CopyWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;copy-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MiniCssExtractPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mini-css-extract-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./webpack.common&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">css</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: [MiniCssExtractPlugin.loader, </span><span style="color:#032F62;">&#39;css-loader&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CopyWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      patterns: [</span><span style="color:#032F62;">&#39;public&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MiniCssExtractPlugin</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>如果样式文件体积不是很大，提取单个文件其实并没有必要。</p><p>个人建议，如果 css 文件超过 150kb 左右才需要考虑是否要提取到单独文件中。</p><p>不过这样提取 css 样式文件存在一个问题，提取后的 css 文件并没有被压缩，即使开启 <code>mode: production</code>。</p><p>webpack 内置的压缩插件仅针对于 JS 文件，对于其他资源文件压缩都需要额外的插件支持。</p><h3 id="cssminimizerplugin" tabindex="-1">CssMinimizerPlugin <a class="header-anchor" href="#cssminimizerplugin" aria-label="Permalink to &quot;CssMinimizerPlugin&quot;">​</a></h3><p><a href="https://webpack.js.org/plugins/css-minimizer-webpack-plugin/" target="_blank" rel="noreferrer">css-minimizer-webpack-plugin</a></p><p>压缩输出的 CSS 文件。支持多进程压缩。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i css</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">minimizer</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">webpack</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">plugin </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i css</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">minimizer</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">webpack</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">plugin </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">merge</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack-merge&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CopyWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;copy-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MiniCssExtractPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mini-css-extract-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CssMinimizerPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;css-minimizer-webpack-plugin&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./webpack.common&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimization: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    minimizer: [</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CssMinimizerPlugin</span><span style="color:#E1E4E8;">(), </span><span style="color:#9ECBFF;">&#39;...&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">css</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: [MiniCssExtractPlugin.loader, </span><span style="color:#9ECBFF;">&#39;css-loader&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CopyWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      patterns: [</span><span style="color:#9ECBFF;">&#39;public&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MiniCssExtractPlugin</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">merge</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack-merge&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CopyWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;copy-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MiniCssExtractPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mini-css-extract-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CssMinimizerPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;css-minimizer-webpack-plugin&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./webpack.common&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  optimization: {</span></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    minimizer: [</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CssMinimizerPlugin</span><span style="color:#24292E;">(), </span><span style="color:#032F62;">&#39;...&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">css</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: [MiniCssExtractPlugin.loader, </span><span style="color:#032F62;">&#39;css-loader&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CopyWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      patterns: [</span><span style="color:#032F62;">&#39;public&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MiniCssExtractPlugin</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>webpack 通过将压缩类的插件配置到 <code>optimization.minimizer</code> 中，只会在 <code>optimization.minimize = true</code> 的场景下启用。</p><blockquote><p>minimizer: [new CssMinimizerPlugin(), &#39;...&#39;]</p><p>For webpack@5 you can use the <code>...</code> syntax to extend existing minimizers (i.e. <code>terser-webpack-plugin</code>), uncomment the next line</p></blockquote><h2 id="输出文件名-hash" tabindex="-1">输出文件名 Hash <a class="header-anchor" href="#输出文件名-hash" aria-label="Permalink to &quot;输出文件名 Hash&quot;">​</a></h2><p><a href="https://webpack.js.org/configuration/output/#outputfilename" target="_blank" rel="noreferrer">output.filename</a></p><p>通常我们部署前端资源文件时都会启动服务器静态资源缓存，对于用户浏览器而言就可以缓存应用中静态资源，后续就不再需要请求服务器得到静态资源文件，应用响应速度会有所提升。</p><p>不过开启静态资源的客户端缓存也会存在一定缺陷，如果缓存失效时间设置过长，一旦应用发生更新重新部署没有办法及时更新到客户端，为了解决这个问题，通常会在生产模式下给输出的文件名增加 hash，当文件发生改变，文件名称也会发生变化。</p><p>对于客户端而言，全新的文件名就是全新的请求，不会命中浏览器缓存。</p><p>webpack 的 filename 属性和绝大多数插件的 filename 属性都支持通过占位符的方式为文件名设置 hash。</p><p>存在三种 hash，效果各不相同。</p><ul><li>[hash] <ul><li>项目级别，项目中任何地方发生改动，这一次打包过程中的 hash 值就会改变</li><li><code>filename: &#39;[name]-[hash].bundle.js&#39;</code></li></ul></li><li>[chunkhash] <ul><li>打包过程中，只要同一入口，chunkhash 都是相同的</li><li>动态导入的 chunk 也有自己的 hash</li><li>相对于普通的 hash，chunkhash 的控制更精确</li><li><code>filename: &#39;[name]-[chunkhash].bundle.js&#39;</code></li></ul></li><li>[contenthash] <ul><li>文件级别的 hash，根据输出文件的内容生成的 hash</li><li>不同的文件有不同的 hash 值</li><li>webpack 允许指定 hash 长度</li><li><code>[name]-[contenthash:8].bundle.js</code></li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(baseConfig, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    clean: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;[name]-[contenthash:8].bundle.js&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.prod.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(baseConfig, {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    clean: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;[name]-[contenthash:8].bundle.js&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>如果控制缓存的话，8 位的 contenthash 其实是比较合适的选择。</p>`,280),r=[t];function E(y,i,F,d,u,h){return n(),a("div",null,r)}const C=s(c,[["render",E]]);export{g as __pageData,C as default};
