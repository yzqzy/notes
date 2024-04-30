import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.88002d8f.js";const l="/notes/assets/1.2e5b7b1b.png",o="/notes/assets/2.4cd853e4.png",m=JSON.parse('{"title":"基于模块联邦的微前端实现方案","description":"","frontmatter":{},"headers":[],"relativePath":"micro_frontends/module_federation_example/index.md","filePath":"micro_frontends/module_federation_example/index.md"}'),e={name:"micro_frontends/module_federation_example/index.md"},t=p('<h1 id="基于模块联邦的微前端实现方案" tabindex="-1">基于模块联邦的微前端实现方案 <a class="header-anchor" href="#基于模块联邦的微前端实现方案" aria-label="Permalink to &quot;基于模块联邦的微前端实现方案&quot;">​</a></h1><h2 id="微前端应用案例概述" tabindex="-1">微前端应用案例概述 <a class="header-anchor" href="#微前端应用案例概述" aria-label="Permalink to &quot;微前端应用案例概述&quot;">​</a></h2><p>案例中包含三个微应用，分别为 marketing、Authentication 和 Dashboard。</p><ul><li>Marketing：营销微应用，包含首页组件和价格组件</li><li>Authentication：身份验证微应用，包含登录组件</li><li>Dashboard：仪表盘微应用，包含仪表盘组件</li></ul><img src="'+l+'"><p>容器应用、营销应用、身份验证应用使用 React 框架，仪表盘使用 Vue 框架。</p><img src="'+o+`"><h2 id="marketing-应用初始化" tabindex="-1">Marketing - 应用初始化 <a class="header-anchor" href="#marketing-应用初始化" aria-label="Permalink to &quot;Marketing - 应用初始化&quot;">​</a></h2><h3 id="_1-创建应用解构" tabindex="-1">1. 创建应用解构 <a class="header-anchor" href="#_1-创建应用解构" aria-label="Permalink to &quot;1. 创建应用解构&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public</span></span>
<span class="line"><span style="color:#E1E4E8;">	index.html</span></span>
<span class="line"><span style="color:#E1E4E8;">src</span></span>
<span class="line"><span style="color:#E1E4E8;">	bootstrap.js</span></span>
<span class="line"><span style="color:#E1E4E8;">	index.js</span></span>
<span class="line"><span style="color:#F97583;">package-</span><span style="color:#E1E4E8;">lock.json</span></span>
<span class="line"><span style="color:#E1E4E8;">package.json</span></span>
<span class="line"><span style="color:#E1E4E8;">webpack.config.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public</span></span>
<span class="line"><span style="color:#24292E;">	index.html</span></span>
<span class="line"><span style="color:#24292E;">src</span></span>
<span class="line"><span style="color:#24292E;">	bootstrap.js</span></span>
<span class="line"><span style="color:#24292E;">	index.js</span></span>
<span class="line"><span style="color:#D73A49;">package-</span><span style="color:#24292E;">lock.json</span></span>
<span class="line"><span style="color:#24292E;">package.json</span></span>
<span class="line"><span style="color:#24292E;">webpack.config.js</span></span></code></pre></div><p>index.html</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#85E89D;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;X-UA-Compatible&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;IE=edge&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;viewport&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;Marketing&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;dev-marketing&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;X-UA-Compatible&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;IE=edge&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;Marketing&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;dev-marketing&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>src/bootstrap.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;marketing&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;marketing&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>src/index.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./bootstrap&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./bootstrap&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><h3 id="_2-配置-webpack" tabindex="-1">2. 配置 webpack <a class="header-anchor" href="#_2-配置-webpack" aria-label="Permalink to &quot;2. 配置 webpack&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    port: </span><span style="color:#79B8FF;">8081</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 html5 history API 时，所有的 404 请求都会响应 index.html 文件 </span></span>
<span class="line"><span style="color:#E1E4E8;">    historyApiFallback: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-react&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 1. 避免 babel 语法转义后，函数重复</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 2. 避免 babel polyfill 将 API 添加到全局</span></span>
<span class="line"><span style="color:#E1E4E8;">            plugins: [</span><span style="color:#9ECBFF;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    port: </span><span style="color:#005CC5;">8081</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 html5 history API 时，所有的 404 请求都会响应 index.html 文件 </span></span>
<span class="line"><span style="color:#24292E;">    historyApiFallback: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-react&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 1. 避免 babel 语法转义后，函数重复</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 2. 避免 babel polyfill 将 API 添加到全局</span></span>
<span class="line"><span style="color:#24292E;">            plugins: [</span><span style="color:#032F62;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_3-添加启动命令" tabindex="-1">3. 添加启动命令 <a class="header-anchor" href="#_3-添加启动命令" aria-label="Permalink to &quot;3. 添加启动命令&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;start&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;webpack serve&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;start&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;webpack serve&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="marketing-创建挂载方法" tabindex="-1">Marketing 创建挂载方法 <a class="header-anchor" href="#marketing-创建挂载方法" aria-label="Permalink to &quot;Marketing 创建挂载方法&quot;">​</a></h2><p>bootstrap.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;Marketing workds&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;, el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-marketing&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;Marketing workds&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;, el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-marketing&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><h2 id="marketing-创建路由" tabindex="-1">Marketing 创建路由 <a class="header-anchor" href="#marketing-创建路由" aria-label="Permalink to &quot;Marketing 创建路由&quot;">​</a></h2><h3 id="_1-创建-components-文件夹" tabindex="-1">1. 创建 components 文件夹 <a class="header-anchor" href="#_1-创建-components-文件夹" aria-label="Permalink to &quot;1. 创建 components 文件夹&quot;">​</a></h3><h3 id="_2-创建-app-组件-编写路由" tabindex="-1">2. 创建 App 组件，编写路由 <a class="header-anchor" href="#_2-创建-app-组件-编写路由" aria-label="Permalink to &quot;2. 创建 App 组件，编写路由&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { BrowserRouter, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Landing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Landing&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Pricing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Pricing&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">BrowserRouter</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/pricing&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Pricing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Landing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">BrowserRouter</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { BrowserRouter, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Landing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Landing&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Pricing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Pricing&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">BrowserRouter</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/pricing&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Pricing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Landing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">BrowserRouter</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> /&gt;, el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-marketing&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> /&gt;, el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-marketing&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><h2 id="container-应用初始化" tabindex="-1">Container 应用初始化 <a class="header-anchor" href="#container-应用初始化" aria-label="Permalink to &quot;Container 应用初始化&quot;">​</a></h2><h3 id="_1-创建应用结构" tabindex="-1">1. 创建应用结构 <a class="header-anchor" href="#_1-创建应用结构" aria-label="Permalink to &quot;1. 创建应用结构&quot;">​</a></h3><p>基于 marking 应用进行拷贝修改。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public</span></span>
<span class="line"><span style="color:#E1E4E8;">	index.html</span></span>
<span class="line"><span style="color:#E1E4E8;">src</span></span>
<span class="line"><span style="color:#E1E4E8;">	bootstrap.js</span></span>
<span class="line"><span style="color:#E1E4E8;">	index.js</span></span>
<span class="line"><span style="color:#F97583;">package-</span><span style="color:#E1E4E8;">lock.json</span></span>
<span class="line"><span style="color:#E1E4E8;">package.json</span></span>
<span class="line"><span style="color:#E1E4E8;">webpack.config.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public</span></span>
<span class="line"><span style="color:#24292E;">	index.html</span></span>
<span class="line"><span style="color:#24292E;">src</span></span>
<span class="line"><span style="color:#24292E;">	bootstrap.js</span></span>
<span class="line"><span style="color:#24292E;">	index.js</span></span>
<span class="line"><span style="color:#D73A49;">package-</span><span style="color:#24292E;">lock.json</span></span>
<span class="line"><span style="color:#24292E;">package.json</span></span>
<span class="line"><span style="color:#24292E;">webpack.config.js</span></span></code></pre></div><h3 id="_2-修改-index-html" tabindex="-1">2. 修改 index.html <a class="header-anchor" href="#_2-修改-index-html" aria-label="Permalink to &quot;2. 修改 index.html&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#85E89D;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;X-UA-Compatible&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;IE=edge&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;viewport&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;Container&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;X-UA-Compatible&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;IE=edge&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;Container&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="_3-修改-app-js" tabindex="-1">3. 修改 App.js <a class="header-anchor" href="#_3-修改-app-js" aria-label="Permalink to &quot;3. 修改 App.js&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;Container works&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;Container works&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="_4-修改-bootstrap-js" tabindex="-1">4. 修改 bootstrap.js <a class="header-anchor" href="#_4-修改-bootstrap-js" aria-label="Permalink to &quot;4. 修改 bootstrap.js&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> /&gt;, el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#root&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> /&gt;, el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#root&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><h3 id="_5-修改-webpack-config-js" tabindex="-1">5. 修改 webpack.config.js <a class="header-anchor" href="#_5-修改-webpack-config-js" aria-label="Permalink to &quot;5. 修改 webpack.config.js&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    port: </span><span style="color:#79B8FF;">8080</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    historyApiFallback: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-react&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            plugins: [</span><span style="color:#9ECBFF;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    port: </span><span style="color:#005CC5;">8080</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    historyApiFallback: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-react&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            plugins: [</span><span style="color:#032F62;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="容器应用加载-marketing-应用" tabindex="-1">容器应用加载 Marketing 应用 <a class="header-anchor" href="#容器应用加载-marketing-应用" aria-label="Permalink to &quot;容器应用加载 Marketing 应用&quot;">​</a></h2><h3 id="marketing-应用" tabindex="-1">marketing 应用 <a class="header-anchor" href="#marketing-应用" aria-label="Permalink to &quot;marketing 应用&quot;">​</a></h3><p>webpack.config.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ModuleFederationPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    port: </span><span style="color:#79B8FF;">8081</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 html5 history API 时，所有的 404 请求都会响应 index.html 文件 </span></span>
<span class="line"><span style="color:#E1E4E8;">    historyApiFallback: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-react&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 1. 避免 babel 语法转义后，函数重复</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 2. 避免 babel polyfill 将 API 添加到全局</span></span>
<span class="line"><span style="color:#E1E4E8;">            plugins: [</span><span style="color:#9ECBFF;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 导出模块</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleFederationPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;marketing&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&#39;remoteEntry.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      exposes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;./MarketingApp&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./src/bootstrap.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ModuleFederationPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    port: </span><span style="color:#005CC5;">8081</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 html5 history API 时，所有的 404 请求都会响应 index.html 文件 </span></span>
<span class="line"><span style="color:#24292E;">    historyApiFallback: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-react&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 1. 避免 babel 语法转义后，函数重复</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 2. 避免 babel polyfill 将 API 添加到全局</span></span>
<span class="line"><span style="color:#24292E;">            plugins: [</span><span style="color:#032F62;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 导出模块</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleFederationPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;marketing&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&#39;remoteEntry.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      exposes: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;./MarketingApp&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./src/bootstrap.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="container-应用" tabindex="-1">Container 应用 <a class="header-anchor" href="#container-应用" aria-label="Permalink to &quot;Container 应用&quot;">​</a></h3><p>components/MarketingApp</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useEffect, useRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { mount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;marketing/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MarketingApp</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useEffect, useRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { mount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;marketing/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MarketingApp</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current);</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>webpack.config.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ModuleFederationPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    port: </span><span style="color:#79B8FF;">8080</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    historyApiFallback: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-react&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            plugins: [</span><span style="color:#9ECBFF;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleFederationPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;container&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        marketing: </span><span style="color:#9ECBFF;">&quot;marketing@http://localhost:8081/remoteEntry.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ModuleFederationPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    port: </span><span style="color:#005CC5;">8080</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    historyApiFallback: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-react&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            plugins: [</span><span style="color:#032F62;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleFederationPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;container&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      remotes: {</span></span>
<span class="line"><span style="color:#24292E;">        marketing: </span><span style="color:#032F62;">&quot;marketing@http://localhost:8081/remoteEntry.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>App.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Marketing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#79B8FF;">Marketing</span><span style="color:#E1E4E8;"> /&gt;;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Marketing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#005CC5;">Marketing</span><span style="color:#24292E;"> /&gt;;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h2 id="共享库设置" tabindex="-1">共享库设置 <a class="header-anchor" href="#共享库设置" aria-label="Permalink to &quot;共享库设置&quot;">​</a></h2><p>container 和 marketing 中使用大量相同的代码库，如果不做共享处理，则应用中相同的库会被加载多次。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;@material-ui/core&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^4.11.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;@material-ui/icons&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^4.9.1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^17.0.1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^17.0.1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^5.2.0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;@material-ui/core&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^4.11.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#032F62;">&quot;@material-ui/icons&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^4.9.1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^17.0.1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^17.0.1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^5.2.0&quot;</span></span></code></pre></div><p>container 和 marketing 应用的 webpack.config.js 配置文件中加入以下代码</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageJSON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./package.json&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleFederationPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;marketing&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&#39;remoteEntry.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    exposes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;./MarketingApp&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./src/bootstrap.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    shared: packageJSON.dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">  }),</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageJSON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./package.json&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleFederationPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;marketing&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;remoteEntry.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    exposes: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;./MarketingApp&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./src/bootstrap.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    shared: packageJSON.dependencies</span></span>
<span class="line"><span style="color:#24292E;">  }),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="微前端应用路由" tabindex="-1">微前端应用路由 <a class="header-anchor" href="#微前端应用路由" aria-label="Permalink to &quot;微前端应用路由&quot;">​</a></h2><h3 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h3><p>容器应用路由用于匹配微应用，微应用用于匹配组件。</p><p><strong>Container</strong></p><table><thead><tr><th>路由</th><th>组件</th></tr></thead><tbody><tr><td>/</td><td>Marketing</td></tr><tr><td>/auth/signin</td><td>Authentication</td></tr><tr><td>/dashboard</td><td>Dashboard</td></tr></tbody></table><p><strong>Marketing</strong></p><table><thead><tr><th>路由</th><th>组件</th></tr></thead><tbody><tr><td>/</td><td>Landing</td></tr><tr><td>/pircing</td><td>Pricing</td></tr></tbody></table><p><strong>Auth</strong></p><table><thead><tr><th>路由</th><th>组件</th></tr></thead><tbody><tr><td>/auth/signin</td><td>signin</td></tr></tbody></table><p><strong>Dashboard</strong></p><table><thead><tr><th>路由</th><th>组件</th></tr></thead><tbody><tr><td>/dashboard</td><td>dashboard</td></tr></tbody></table><p>容器应用使用 BrowserHistory 路由，微应用使用 MemoryHistory 路由。</p><ul><li>为防止容器应用和微应用同时操作 url 而产生冲突，在微前端架构中，只允许容器应用更新 url，微应用不允许更新 url，MemoryHistory 是基于内存的路由，不会改变浏览器地址栏中的 url；</li><li>如果不同的应用程序需要传达有关路由的相关信息，应该尽可能的使用通用的方式，memoryHistory 在 React 和 Vue 中都有提供。</li></ul><h3 id="更新现有路由配置" tabindex="-1">更新现有路由配置 <a class="header-anchor" href="#更新现有路由配置" aria-label="Permalink to &quot;更新现有路由配置&quot;">​</a></h3><h4 id="container-路由配置" tabindex="-1">Container 路由配置 <a class="header-anchor" href="#container-路由配置" aria-label="Permalink to &quot;Container 路由配置&quot;">​</a></h4><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createBrowserHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Marketing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Marketing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createBrowserHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Marketing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Marketing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h4 id="marketing-路由配置" tabindex="-1">Marketing 路由配置 <a class="header-anchor" href="#marketing-路由配置" aria-label="Permalink to &quot;Marketing 路由配置&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Marketing/bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createMemoryHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } /&gt;, el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-marketing&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Marketing/bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createMemoryHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } /&gt;, el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-marketing&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Marketing/app.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Landing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Landing&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Pricing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Pricing&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">history</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/pricing&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Pricing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Landing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Marketing/app.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Landing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Landing&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Pricing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Pricing&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">history</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/pricing&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Pricing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Landing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h4 id="添加头部组件" tabindex="-1">添加头部组件 <a class="header-anchor" href="#添加头部组件" aria-label="Permalink to &quot;添加头部组件&quot;">​</a></h4><p>container/src/App.js</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createBrowserHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Marketing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Header </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Header&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Header</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Marketing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createBrowserHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Marketing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Header </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Header&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Header</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Marketing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="微应用和容器应用路由交互" tabindex="-1">微应用和容器应用路由交互 <a class="header-anchor" href="#微应用和容器应用路由交互" aria-label="Permalink to &quot;微应用和容器应用路由交互&quot;">​</a></h3><ul><li><p>微应用路由变化时 url 地址没有被同步到浏览器中的地址栏中，路由变化也没有被同步到浏览器的历史记录中。</p><p>当微应用路由变化时通知容器应用更新路由信息（容器应用向微应用传递方法）。</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Container/components/MarketingApp.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useEffect, useRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { mount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;marketing/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MarketingApp</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Container/components/MarketingApp.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useEffect, useRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { mount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;marketing/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MarketingApp</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current, {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">          history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Marketing/bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createMemoryHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">onNavgate</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  onNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } /&gt;, el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-marketing&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Marketing/bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createMemoryHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">onNavgate</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  onNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } /&gt;, el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-marketing&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><ul><li><p>容器应用路由变化时只能匹配到微应用，微应用路由并不会响应容器应用路由的变化。</p><p>当容器应用路由变化时需要通知微应用路由进行响应（微应用容容器应用传递方法）。</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Container/components/MarketingApp.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useEffect, useRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { mount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;marketing/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MarketingApp</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">onParentNavgate</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    onParentNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Container/components/MarketingApp.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useEffect, useRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { mount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;marketing/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MarketingApp</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">onParentNavgate</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current, {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">          history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    onParentNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Marketing/bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createMemoryHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">onNavgate</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  onNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onParentNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-marketing&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Marketing/bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createMemoryHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">onNavgate</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  onNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onParentNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-marketing&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><h3 id="marketing-应用本地路由设置" tabindex="-1">marketing 应用本地路由设置 <a class="header-anchor" href="#marketing-应用本地路由设置" aria-label="Permalink to &quot;marketing 应用本地路由设置&quot;">​</a></h3><p>目前 Marketing 应用本地开发环境是报错的，原因是本地开发环境在调用 mount 方法时没有传递第二个参数，默认值就是 undefined，mount 方法内部试图从 undefined 解构 onNavigate，所以就报错了。</p><p>解决办法是在本地开发环境调用 mount 方法时传递一个空对象。</p><p>如果当前是本地开发环境，路由依然使用 BrowserHistory，所以在调用 mount 方法时传递 defaultHistory 以做区分。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-marketing&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultHistory: </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-marketing&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el, {</span></span>
<span class="line"><span style="color:#24292E;">    defaultHistory: </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 mount 方法内部判断 defaultHistory 是否存在，如果存在就用 defaultHistory，否则就用 MemoryHistory。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">onNavgate</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">defaultHistory</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> defaultHistory </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  onNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onParentNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">onNavgate</span><span style="color:#24292E;">, </span><span style="color:#E36209;">defaultHistory</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> defaultHistory </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  onNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onParentNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="配置其他应用的-publicpath" tabindex="-1">配置其他应用的 publicPath <a class="header-anchor" href="#配置其他应用的-publicpath" aria-label="Permalink to &quot;配置其他应用的 publicPath&quot;">​</a></h3><p>container</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">output</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">publicPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;http://localhost:8080/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">output</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">publicPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;http://localhost:8080/&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>marketing</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">output</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">publicPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;http://localhost:8081/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">output</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">publicPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;http://localhost:8081/&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="authentication-应用初始化" tabindex="-1">Authentication 应用初始化 <a class="header-anchor" href="#authentication-应用初始化" aria-label="Permalink to &quot;Authentication 应用初始化&quot;">​</a></h2><p>拷贝 marketing 项目的文件。</p><h3 id="下载应用依赖" tabindex="-1">下载应用依赖 <a class="header-anchor" href="#下载应用依赖" aria-label="Permalink to &quot;下载应用依赖&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cd auth </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> npm install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cd auth </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> npm install</span></span></code></pre></div><h3 id="拷贝-src-文件夹" tabindex="-1">拷贝 src 文件夹 <a class="header-anchor" href="#拷贝-src-文件夹" aria-label="Permalink to &quot;拷贝 src 文件夹&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-auth&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultHistory: </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// bootstrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-auth&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el, {</span></span>
<span class="line"><span style="color:#24292E;">    defaultHistory: </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Signin </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Signin&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">history</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/auth/signin&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Signin</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Signin </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Signin&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">history</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/auth/signin&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Signin</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="拷贝-public-文件夹" tabindex="-1">拷贝 public 文件夹 <a class="header-anchor" href="#拷贝-public-文件夹" aria-label="Permalink to &quot;拷贝 public 文件夹&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;dev-auth&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;dev-auth&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="修改-webpack-config-js" tabindex="-1">修改 webpack.config.js <a class="header-anchor" href="#修改-webpack-config-js" aria-label="Permalink to &quot;修改 webpack.config.js&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ModuleFederationPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageJSON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./package.json&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    publicPath: </span><span style="color:#9ECBFF;">&#39;http://localhost:8082/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    port: </span><span style="color:#79B8FF;">8082</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    historyApiFallback: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-react&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            plugins: [</span><span style="color:#9ECBFF;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleFederationPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;auth&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&#39;remoteEntry.js&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      exposes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;./AuthApp&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./src/bootstrap.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      shared: packageJSON.dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ModuleFederationPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageJSON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./package.json&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    publicPath: </span><span style="color:#032F62;">&#39;http://localhost:8082/&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    port: </span><span style="color:#005CC5;">8082</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    historyApiFallback: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-react&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            plugins: [</span><span style="color:#032F62;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleFederationPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;auth&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&#39;remoteEntry.js&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      exposes: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;./AuthApp&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./src/bootstrap.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      shared: packageJSON.dependencies</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="container-加载-auth-应用" tabindex="-1">Container 加载 Auth 应用 <a class="header-anchor" href="#container-加载-auth-应用" aria-label="Permalink to &quot;Container 加载 Auth 应用&quot;">​</a></h2><p>拷贝 Marketing App 的内容进行修改。</p><p>Auth/index.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useEffect, useRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { mount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;auth/AuthApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AuthApp</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">onParentNavgate</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    onParentNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useEffect, useRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { mount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;auth/AuthApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AuthApp</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">onParentNavgate</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current, {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">          history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    onParentNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>App.js</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createBrowserHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Auth </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/AuthApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Marketing </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/MarketingApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Header </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Header&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Header</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/auth/signin&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Auth</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Marketing</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createBrowserHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Auth </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/AuthApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Marketing </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/MarketingApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Header </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Header&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Header</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/auth/signin&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Auth</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Marketing</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><p>webpack.config.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ModuleFederationPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageJSON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./package.json&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mode: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    publicPath: </span><span style="color:#9ECBFF;">&#39;http://localhost:8080/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    port: </span><span style="color:#79B8FF;">8080</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    historyApiFallback: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        use: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: </span><span style="color:#9ECBFF;">&#39;babel-loader&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            presets: [</span><span style="color:#9ECBFF;">&#39;@babel/preset-react&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            plugins: [</span><span style="color:#9ECBFF;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleFederationPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;container&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        marketing: </span><span style="color:#9ECBFF;">&quot;marketing@http://localhost:8081/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        auth: </span><span style="color:#9ECBFF;">&quot;auth@http://localhost:8082/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      shared: packageJSON.dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      template: </span><span style="color:#9ECBFF;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;html-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ModuleFederationPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageJSON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./package.json&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mode: </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    publicPath: </span><span style="color:#032F62;">&#39;http://localhost:8080/&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    port: </span><span style="color:#005CC5;">8080</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    historyApiFallback: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        use: {</span></span>
<span class="line"><span style="color:#24292E;">          loader: </span><span style="color:#032F62;">&#39;babel-loader&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          options: {</span></span>
<span class="line"><span style="color:#24292E;">            presets: [</span><span style="color:#032F62;">&#39;@babel/preset-react&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            plugins: [</span><span style="color:#032F62;">&#39;@babel/plugin-transform-runtime&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleFederationPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;container&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      remotes: {</span></span>
<span class="line"><span style="color:#24292E;">        marketing: </span><span style="color:#032F62;">&quot;marketing@http://localhost:8081/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        auth: </span><span style="color:#032F62;">&quot;auth@http://localhost:8082/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      shared: packageJSON.dependencies</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HtmlWebpackPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      template: </span><span style="color:#032F62;">&#39;./public/index.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>解决登录页面两次才显示的 BUG</strong></p><p>当点击登录按钮时，容器应用的路由地址时 /auth/signin，加载 AuthApp，但是 AuthApp 在首次加载时默认访问的时 /，因为使用 createMemoryHistory 创建路由时没有传递初始参数，当再次点击登录按钮时，容器应用通知微应用路由发生了变化，微应用同步路由变化，所以最终看到登陆界面。</p><p>解决问题的核心在于微应用在初次创建路由时应该接收一个默认参数，默认参数就来自于容器应用。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// auth/boostrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">onNavgate</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">defaultHistory</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">initialPath</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> defaultHistory </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">    initialEntries: [ initialPath ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  onNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onParentNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// auth/boostrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">onNavgate</span><span style="color:#24292E;">, </span><span style="color:#E36209;">defaultHistory</span><span style="color:#24292E;">, </span><span style="color:#E36209;">initialPath</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> defaultHistory </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">    initialEntries: [ initialPath ]</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  onNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onParentNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// container/src/components/AuthApp/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AuthApp</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">onParentNavgate</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      initialPath: history.location.pathname,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    onParentNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// container/src/components/AuthApp/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AuthApp</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">onParentNavgate</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current, {</span></span>
<span class="line"><span style="color:#24292E;">      initialPath: history.location.pathname,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">          history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    onParentNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>按照上述方法修改 MarketingApp</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// marketing/boostrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">onNavgate</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">defaultHistory</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">initialPath</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> defaultHistory </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    initialEntries: [ initialPath ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  onNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onParentNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// marketing/boostrap.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">onNavgate</span><span style="color:#24292E;">, </span><span style="color:#E36209;">defaultHistory</span><span style="color:#24292E;">, </span><span style="color:#E36209;">initialPath</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> defaultHistory </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    initialEntries: [ initialPath ]</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  onNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onParentNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// container/src/components/MarketingApp/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MarketingApp</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">onParentNavgate</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      initialPath: history.location.pathname,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    onParentNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// container/src/components/MarketingApp/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MarketingApp</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">onParentNavgate</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current, {</span></span>
<span class="line"><span style="color:#24292E;">      initialPath: history.location.pathname,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">          history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    onParentNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="微应用懒加载" tabindex="-1">微应用懒加载 <a class="header-anchor" href="#微应用懒加载" aria-label="Permalink to &quot;微应用懒加载&quot;">​</a></h2><p>目前所有的微应用都会在用户初始访问时加载，这样会导致加载时间过长，解决办法就是懒加载微应用。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">container</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { lazy, Suspense } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createBrowserHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Header </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Header&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Progress </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Progress&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AuthApp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lazy</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./components/AuthApp&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MarketingApp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lazy</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./components/MarketingApp&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Header</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Suspense</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fallback</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ &lt;</span><span style="color:#79B8FF;">Progress</span><span style="color:#E1E4E8;"> /&gt; }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/auth/signin&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#79B8FF;">AuthApp</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#79B8FF;">MarketingApp</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Suspense</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">container</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { lazy, Suspense } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createBrowserHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Header </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Header&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Progress </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Progress&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AuthApp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lazy</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./components/AuthApp&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MarketingApp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lazy</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./components/MarketingApp&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Header</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Suspense</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fallback</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ &lt;</span><span style="color:#005CC5;">Progress</span><span style="color:#24292E;"> /&gt; }&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/auth/signin&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#005CC5;">AuthApp</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#005CC5;">MarketingApp</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Suspense</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h2 id="设置微应用状态" tabindex="-1">设置微应用状态 <a class="header-anchor" href="#设置微应用状态" aria-label="Permalink to &quot;设置微应用状态&quot;">​</a></h2><h3 id="container" tabindex="-1">container <a class="header-anchor" href="#container" aria-label="Permalink to &quot;container&quot;">​</a></h3><p>components/AuthApp/index.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useEffect, useRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { mount } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;auth/AuthApp&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AuthApp</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">setStatus</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHistory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">onParentNavgate</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(ref.current, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      setStatus,</span></span>
<span class="line"><span style="color:#E1E4E8;">      initialPath: history.location.pathname,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    onParentNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ ref }&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useEffect, useRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { mount } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;auth/AuthApp&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AuthApp</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">setStatus</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHistory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">onParentNavgate</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(ref.current, {</span></span>
<span class="line"><span style="color:#24292E;">      setStatus,</span></span>
<span class="line"><span style="color:#24292E;">      initialPath: history.location.pathname,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">          history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    onParentNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onParentNavgate);</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ ref }&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>src/App.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> /&gt;, el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#root&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> /&gt;, el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#root&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><h3 id="auth" tabindex="-1">auth <a class="header-anchor" href="#auth" aria-label="Permalink to &quot;auth&quot;">​</a></h3><p>src/components/bootstrap.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createMemoryHistory, createBrowserHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;history&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">setStatus</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onNavgate</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">defaultHistory</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">initialPath</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">history</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> defaultHistory </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMemoryHistory</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">    initialEntries: [ initialPath ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  onNavgate </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(&lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history } </span><span style="color:#B392F0;">setStatus</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ setStatus } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onParentNavgate</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">pathname</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">nextPathname</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pathname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextPathname </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pathname) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nextPathname);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#dev-auth&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el) </span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(el, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultHistory: </span><span style="color:#B392F0;">createBrowserHistory</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { mount };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createMemoryHistory, createBrowserHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;history&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">setStatus</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onNavgate</span><span style="color:#24292E;">, </span><span style="color:#E36209;">defaultHistory</span><span style="color:#24292E;">, </span><span style="color:#E36209;">initialPath</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> defaultHistory </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMemoryHistory</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">    initialEntries: [ initialPath ]</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  onNavgate </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(onNavgate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(&lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history } </span><span style="color:#6F42C1;">setStatus</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ setStatus } /&gt;, el);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onParentNavgate</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">pathname</span><span style="color:#24292E;">: </span><span style="color:#E36209;">nextPathname</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pathname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> history.location.pathname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextPathname </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pathname) {</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nextPathname);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p<wbr>rocess.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;development&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#dev-auth&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el) </span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(el, {</span></span>
<span class="line"><span style="color:#24292E;">    defaultHistory: </span><span style="color:#6F42C1;">createBrowserHistory</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { mount };</span></span></code></pre></div><p>src/App.js</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router, Route, Switch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Signin </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/Signin&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">history</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">setStatus</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">history</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ history }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/auth/signin&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">Signin</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setStatus</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ setStatus } /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Switch</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router, Route, Switch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Signin </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/Signin&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">history</span><span style="color:#24292E;">, </span><span style="color:#E36209;">setStatus</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">history</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ history }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/auth/signin&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">Signin</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setStatus</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ setStatus } /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Switch</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Router</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div>`,138),c=[t];function r(E,y,i,F,u,d){return n(),a("div",null,c)}const g=s(e,[["render",r]]);export{m as __pageData,g as default};
