import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.88002d8f.js";const C=JSON.parse('{"title":"CSS-IN-JS","description":"","frontmatter":{},"headers":[],"relativePath":"react/css_in_js/index.md","filePath":"react/css_in_js/index.md"}'),l={name:"react/css_in_js/index.md"},o=p(`<h1 id="css-in-js" tabindex="-1">CSS-IN-JS <a class="header-anchor" href="#css-in-js" aria-label="Permalink to &quot;CSS-IN-JS&quot;">​</a></h1><p>集成 CSS 代码在 JavaScript 文件。</p><h2 id="存在原因" tabindex="-1">存在原因 <a class="header-anchor" href="#存在原因" aria-label="Permalink to &quot;存在原因&quot;">​</a></h2><p>CSS-IN-JS 时 WEB 项目中将 CSS 代码捆绑在 JavaScript 代码中的解决方案。</p><p>这种方案旨在解决 CSS 的局限性，例如缺乏动态功能，作用域和可移植性。</p><h2 id="优缺点" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点" aria-label="Permalink to &quot;优缺点&quot;">​</a></h2><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li>让 CSS 代码拥有独立的作用域，阻止 CSS 代码泄露到组件外部，防止样式冲突；</li><li>让组件更具有可移植性，实现开箱即用，轻松创建低耦合的应用程序；</li><li>让组件更具有可重用性只需要编写一次，可以在任何地方运行，不仅可以在同一应用程序中重用组件，而且可以在使用相同框架构建的其他应用程序中重用组件；</li><li>让样式具有动态功能，可以将复杂的逻辑应用于样式规则，如果要创建需要动态功能的复杂 UI，它是理想的方案。</li></ul><h3 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h3><ul><li>为项目增加了额外的复杂性；</li><li>自动生成的选择器大大降低了代码的可读性。</li></ul><h2 id="emotion-库" tabindex="-1">Emotion 库 <a class="header-anchor" href="#emotion-库" aria-label="Permalink to &quot;Emotion 库&quot;">​</a></h2><p>Emotion 是一个旨在使用 JavaScript 编写 CSS 样式的库。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm install @emotion</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">core @emotion</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">styled </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">S</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm install @emotion</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">core @emotion</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">styled </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">S</span></span></code></pre></div><h3 id="css-属性支持的两种方式" tabindex="-1">css 属性支持的两种方式 <a class="header-anchor" href="#css-属性支持的两种方式" aria-label="Permalink to &quot;css 属性支持的两种方式&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{ width: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, height: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, background: </span><span style="color:#9ECBFF;">&#39;orange&#39;</span><span style="color:#E1E4E8;"> }}&gt;App&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{ width: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, height: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, background: </span><span style="color:#032F62;">&#39;orange&#39;</span><span style="color:#24292E;"> }}&gt;App&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><p>通知 babel，不再需要将 JSX 语法转换为 React.createElement 方法，而是需要转换为 JSX 方法。</p><table><thead><tr><th></th><th>输入</th><th>输出</th></tr></thead><tbody><tr><td>Before</td><td><code>&lt;img src=&quot;avator.png&quot; /&gt;</code></td><td><code>Reactc.createElement(&#39;img&#39;, { src: &#39;avator.png&#39; })</code></td></tr><tr><td>After</td><td><code>&lt;img src=&quot;avator.png&quot; /&gt;</code></td><td><code>jsx(&#39;img&#39;, { src: &#39;avator.png&#39; })</code></td></tr></tbody></table><h4 id="jsx-pragma" tabindex="-1">JSX Pragma <a class="header-anchor" href="#jsx-pragma" aria-label="Permalink to &quot;JSX Pragma&quot;">​</a></h4><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** </span><span style="color:#F97583;">@jsx</span><span style="color:#6A737D;"> jsx */</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { jsx } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/core&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/** </span><span style="color:#D73A49;">@jsx</span><span style="color:#6A737D;"> jsx */</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { jsx } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/core&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><h4 id="babel-preset" tabindex="-1">Babel Preset <a class="header-anchor" href="#babel-preset" aria-label="Permalink to &quot;Babel Preset&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm run eject</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm run eject</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm i @emotion</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">babel</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">preset</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">css</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">prop </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm i @emotion</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">babel</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">preset</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">css</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">prop </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><p>package.json</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;react-app&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;@emotion/babel-preset-css-prop&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;react-app&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;@emotion/babel-preset-css-prop&quot;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h3 id="css-方法" tabindex="-1">css 方法 <a class="header-anchor" href="#css-方法" aria-label="Permalink to &quot;css 方法&quot;">​</a></h3><h4 id="string-styles" tabindex="-1">String Styles <a class="header-anchor" href="#string-styles" aria-label="Permalink to &quot;String Styles&quot;">​</a></h4><p>推荐使用。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 200px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 200px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: orange</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ style }&gt;App&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">style</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 200px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 200px;</span></span>
<span class="line"><span style="color:#032F62;">  background: orange</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ style }&gt;App&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h4 id="oject-styles" tabindex="-1">Oject Styles <a class="header-anchor" href="#oject-styles" aria-label="Permalink to &quot;Oject Styles&quot;">​</a></h4><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  background: </span><span style="color:#9ECBFF;">&#39;orange&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ style }&gt;App&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">style</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  background: </span><span style="color:#032F62;">&#39;orange&#39;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ style }&gt;App&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="css-优先级" tabindex="-1">css 优先级 <a class="header-anchor" href="#css-优先级" aria-label="Permalink to &quot;css 优先级&quot;">​</a></h3><p>props 对象中的 css 属性优先级高于组件内部的 css 属性。调用组件时可以覆盖组件默认样式。</p><p>components/Css</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 200px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 200px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: orange;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Css</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ style }</span></span>
<span class="line"><span style="color:#E1E4E8;">      { </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">props }</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      CSS</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Css</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">style</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 200px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 200px;</span></span>
<span class="line"><span style="color:#032F62;">  background: orange;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Css</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">props</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ style }</span></span>
<span class="line"><span style="color:#24292E;">      { </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">props }</span></span>
<span class="line"><span style="color:#24292E;">    &gt;</span></span>
<span class="line"><span style="color:#24292E;">      CSS</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Css</span></span></code></pre></div><p>App.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Css </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/CSS&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  background: </span><span style="color:#9ECBFF;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Css</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ style } /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      App works</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Css </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/CSS&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">style</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  background: </span><span style="color:#032F62;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Css</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ style } /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      App works</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="样式化组件" tabindex="-1">样式化组件 <a class="header-anchor" href="#样式化组件" aria-label="Permalink to &quot;样式化组件&quot;">​</a></h3><h4 id="基础使用" tabindex="-1">基础使用 <a class="header-anchor" href="#基础使用" aria-label="Permalink to &quot;基础使用&quot;">​</a></h4><p>样式化组件就是用来构建用户界面，是 emotion 库提供的另一种为元素添加样式的方式。</p><blockquote><p>样式编写同样支持模板字符串和对象的方式。</p></blockquote><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">button</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 100px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 30px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: orange;</span></span>
<span class="line"><span style="color:#9ECBFF;">  border: none;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 1000px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  padding: 20px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  margin: 0 auto;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: pink;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;">&gt;按钮&lt;/</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      App works</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">button</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 100px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 30px;</span></span>
<span class="line"><span style="color:#032F62;">  background: orange;</span></span>
<span class="line"><span style="color:#032F62;">  border: none;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Container</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 1000px;</span></span>
<span class="line"><span style="color:#032F62;">  padding: 20px;</span></span>
<span class="line"><span style="color:#032F62;">  margin: 0 auto;</span></span>
<span class="line"><span style="color:#032F62;">  background: pink;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;">&gt;按钮&lt;/</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      App works</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h4 id="默认样式处理" tabindex="-1">默认样式处理 <a class="header-anchor" href="#默认样式处理" aria-label="Permalink to &quot;默认样式处理&quot;">​</a></h4><p>根据 props 属性覆盖样式。下面是模板字符串和对象形式的样式覆盖的使用方法。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">button</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 100px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 30px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: \${</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">props</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">props</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">bgColor</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">||</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">&#39;orange&#39;</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">};</span></span>
<span class="line"><span style="color:#9ECBFF;">  border: none;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> ({</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: props.width </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  padding: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  margin: </span><span style="color:#9ECBFF;">&#39;0 auto&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  background: </span><span style="color:#9ECBFF;">&#39;pink&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">width</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;"> }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bgColor</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;green&quot;</span><span style="color:#E1E4E8;">&gt;按钮&lt;/</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">button</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 100px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 30px;</span></span>
<span class="line"><span style="color:#032F62;">  background: \${</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">props</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#032F62;"> </span><span style="color:#24292E;">props</span><span style="color:#032F62;">.</span><span style="color:#24292E;">bgColor</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">||</span><span style="color:#032F62;"> </span><span style="color:#032F62;">&#39;orange&#39;</span><span style="color:#032F62;"> </span><span style="color:#032F62;">};</span></span>
<span class="line"><span style="color:#032F62;">  border: none;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Container</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> ({</span></span>
<span class="line"><span style="color:#24292E;">  width: props.width </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  padding: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  margin: </span><span style="color:#032F62;">&#39;0 auto&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  background: </span><span style="color:#032F62;">&#39;pink&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">width</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ </span><span style="color:#005CC5;">500</span><span style="color:#24292E;"> }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bgColor</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;green&quot;</span><span style="color:#24292E;">&gt;按钮&lt;/</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><p>对象形式还可以这样使用。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">button</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 100px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 30px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: \${</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">props</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">props</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">bgColor</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">||</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">&#39;orange&#39;</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">};</span></span>
<span class="line"><span style="color:#9ECBFF;">  border: none;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  padding: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  margin: </span><span style="color:#9ECBFF;">&#39;0 auto&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  background: </span><span style="color:#9ECBFF;">&#39;pink&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> ({</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: props.width,</span></span>
<span class="line"><span style="color:#E1E4E8;">  background: props.background</span></span>
<span class="line"><span style="color:#E1E4E8;">}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">width</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;"> }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bgColor</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;green&quot;</span><span style="color:#E1E4E8;">&gt;按钮&lt;/</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">button</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 100px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 30px;</span></span>
<span class="line"><span style="color:#032F62;">  background: \${</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">props</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#032F62;"> </span><span style="color:#24292E;">props</span><span style="color:#032F62;">.</span><span style="color:#24292E;">bgColor</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">||</span><span style="color:#032F62;"> </span><span style="color:#032F62;">&#39;orange&#39;</span><span style="color:#032F62;"> </span><span style="color:#032F62;">};</span></span>
<span class="line"><span style="color:#032F62;">  border: none;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Container</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  padding: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  margin: </span><span style="color:#032F62;">&#39;0 auto&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  background: </span><span style="color:#032F62;">&#39;pink&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#E36209;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> ({</span></span>
<span class="line"><span style="color:#24292E;">  width: props.width,</span></span>
<span class="line"><span style="color:#24292E;">  background: props.background</span></span>
<span class="line"><span style="color:#24292E;">}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">width</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ </span><span style="color:#005CC5;">500</span><span style="color:#24292E;"> }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bgColor</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;green&quot;</span><span style="color:#24292E;">&gt;按钮&lt;/</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="组件附加样式" tabindex="-1">组件附加样式 <a class="header-anchor" href="#组件附加样式" aria-label="Permalink to &quot;组件附加样式&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Demo</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">className</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">className</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ className }&gt;Demo&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Demo01</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">styled</span><span style="color:#E1E4E8;">(Demo)</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: orange;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Demo02</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">styled</span><span style="color:#E1E4E8;">(Demo)({</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: </span><span style="color:#9ECBFF;">&#39;green&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Demo01</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Demo02</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">className</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">className</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ className }&gt;Demo&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Demo01</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">styled</span><span style="color:#24292E;">(Demo)</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  color: orange;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Demo02</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">styled</span><span style="color:#24292E;">(Demo)({</span></span>
<span class="line"><span style="color:#24292E;">  color: </span><span style="color:#032F62;">&#39;green&#39;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Demo01</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Demo02</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="为特定组件附加样式" tabindex="-1">为特定组件附加样式 <a class="header-anchor" href="#为特定组件附加样式" aria-label="Permalink to &quot;为特定组件附加样式&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: red;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Parent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">Child</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">} {</span></span>
<span class="line"><span style="color:#9ECBFF;">    color: blue;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;child&lt;/</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Parent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;child&lt;/</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Parent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Child</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  color: red;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Parent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">Child</span><span style="color:#032F62;"> </span><span style="color:#032F62;">} {</span></span>
<span class="line"><span style="color:#032F62;">    color: blue;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;child&lt;/</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Parent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;child&lt;/</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Parent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: </span><span style="color:#9ECBFF;">&#39;red&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Parent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  [Child]: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;child&lt;/</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Parent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;child&lt;/</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Parent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Child</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  color: </span><span style="color:#032F62;">&#39;red&#39;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Parent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  [Child]: {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;child&lt;/</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Parent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;child&lt;/</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Parent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="css-选择器" tabindex="-1">css 选择器 &amp; <a class="header-anchor" href="#css-选择器" aria-label="Permalink to &quot;css 选择器 &amp;&quot;">​</a></h3><p>&amp; 表示组件本身</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">div</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 200px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 200px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: orange;</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: green;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">  &amp;:hover {</span></span>
<span class="line"><span style="color:#9ECBFF;">    background: blue;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">  &amp; &gt; span {</span></span>
<span class="line"><span style="color:#9ECBFF;">    color: yellow;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        container</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;span&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Container</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Container</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">div</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 200px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 200px;</span></span>
<span class="line"><span style="color:#032F62;">  background: orange;</span></span>
<span class="line"><span style="color:#032F62;">  color: green;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">  &amp;:hover {</span></span>
<span class="line"><span style="color:#032F62;">    background: blue;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">  &amp; &gt; span {</span></span>
<span class="line"><span style="color:#032F62;">    color: yellow;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        container</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;span&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Container</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="样式化组件属性-as" tabindex="-1">样式化组件属性 as <a class="header-anchor" href="#样式化组件属性-as" aria-label="Permalink to &quot;样式化组件属性 as&quot;">​</a></h3><p>要使用组件中的样式，但要更改要呈现的元素，可以使用 as 属性。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> styled </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/styled&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styled.</span><span style="color:#B392F0;">button</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: red;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">as</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;//yueluo.club&quot;</span><span style="color:#E1E4E8;"> &gt;button&lt;/</span><span style="color:#79B8FF;">Button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> styled </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/styled&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styled.</span><span style="color:#6F42C1;">button</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  color: red;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">as</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;//yueluo.club&quot;</span><span style="color:#24292E;"> &gt;button&lt;/</span><span style="color:#005CC5;">Button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="样式组合" tabindex="-1">样式组合 <a class="header-anchor" href="#样式组合" aria-label="Permalink to &quot;样式组合&quot;">​</a></h3><p>样式组合中，后调用的样式优先级高于先调用的样式。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">base</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: orange&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: white;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">danger</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: red;</span></span>
<span class="line"><span style="color:#9ECBFF;">  background: pink;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{[ base, danger ]}&gt;App works&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">base</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  background: orange&#39;</span></span>
<span class="line"><span style="color:#032F62;">  color: white;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">danger</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  color: red;</span></span>
<span class="line"><span style="color:#032F62;">  background: pink;</span></span>
<span class="line"><span style="color:#032F62;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{[ base, danger ]}&gt;App works&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="global-组件" tabindex="-1">Global 组件 <a class="header-anchor" href="#global-组件" aria-label="Permalink to &quot;Global 组件&quot;">​</a></h3><h4 id="全局样式" tabindex="-1">全局样式 <a class="header-anchor" href="#全局样式" aria-label="Permalink to &quot;全局样式&quot;">​</a></h4><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Global, css } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">styles</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  body {</span></span>
<span class="line"><span style="color:#9ECBFF;">    margin: 0;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">  a {</span></span>
<span class="line"><span style="color:#9ECBFF;">    text-decoration: none;</span></span>
<span class="line"><span style="color:#9ECBFF;">    color: red;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Global</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">styles</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ styles } /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;span&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;http://baidu.com&quot;</span><span style="color:#E1E4E8;">&gt;a标签&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Global, css } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">styles</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  body {</span></span>
<span class="line"><span style="color:#032F62;">    margin: 0;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">  a {</span></span>
<span class="line"><span style="color:#032F62;">    text-decoration: none;</span></span>
<span class="line"><span style="color:#032F62;">    color: red;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Global</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">styles</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ styles } /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;span&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;http://baidu.com&quot;</span><span style="color:#24292E;">&gt;a标签&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="关键帧动画" tabindex="-1">关键帧动画 <a class="header-anchor" href="#关键帧动画" aria-label="Permalink to &quot;关键帧动画&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css, keyframes } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">move</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">keyframes</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  0% {</span></span>
<span class="line"><span style="color:#9ECBFF;">    background: orange;</span></span>
<span class="line"><span style="color:#9ECBFF;">    left: 0;</span></span>
<span class="line"><span style="color:#9ECBFF;">    top: 0;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">  100% {</span></span>
<span class="line"><span style="color:#9ECBFF;">    background: green;</span></span>
<span class="line"><span style="color:#9ECBFF;">    left：600px;</span></span>
<span class="line"><span style="color:#9ECBFF;">    top: 300px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  width: 100px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  height: 100px;</span></span>
<span class="line"><span style="color:#9ECBFF;">  position: absolute;</span></span>
<span class="line"><span style="color:#9ECBFF;">  animation: \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">move</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">} 2s ease infinite;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ box }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      App Works</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css, keyframes } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">move</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">keyframes</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  0% {</span></span>
<span class="line"><span style="color:#032F62;">    background: orange;</span></span>
<span class="line"><span style="color:#032F62;">    left: 0;</span></span>
<span class="line"><span style="color:#032F62;">    top: 0;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">  100% {</span></span>
<span class="line"><span style="color:#032F62;">    background: green;</span></span>
<span class="line"><span style="color:#032F62;">    left：600px;</span></span>
<span class="line"><span style="color:#032F62;">    top: 300px;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  width: 100px;</span></span>
<span class="line"><span style="color:#032F62;">  height: 100px;</span></span>
<span class="line"><span style="color:#032F62;">  position: absolute;</span></span>
<span class="line"><span style="color:#032F62;">  animation: \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">move</span><span style="color:#032F62;"> </span><span style="color:#032F62;">} 2s ease infinite;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ box }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      App Works</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div><h3 id="创建主题" tabindex="-1">创建主题 <a class="header-anchor" href="#创建主题" aria-label="Permalink to &quot;创建主题&quot;">​</a></h3><p>index.js</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ThemeProvider } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">theme</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  colors: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    primary: </span><span style="color:#9ECBFF;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ReactDOM.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">ThemeProvider</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">theme</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ theme }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#79B8FF;">ThemeProvider</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ThemeProvider } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">theme</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  colors: {</span></span>
<span class="line"><span style="color:#24292E;">    primary: </span><span style="color:#032F62;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ReactDOM.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">ThemeProvider</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">theme</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ theme }&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#005CC5;">ThemeProvider</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><p>App.js</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { css, useTheme } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@emotion/react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">primaryColor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  color: \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">props</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">colors</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">primary</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">useTheme</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// 也可以用 hook 的方式获得</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ primaryColor }&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      App Works</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> App;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { css, useTheme } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@emotion/react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">primaryColor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#E36209;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  color: \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">props</span><span style="color:#032F62;">.</span><span style="color:#24292E;">colors</span><span style="color:#032F62;">.</span><span style="color:#24292E;">primary</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">useTheme</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// 也可以用 hook 的方式获得</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ primaryColor }&gt;</span></span>
<span class="line"><span style="color:#24292E;">      App Works</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> App;</span></span></code></pre></div>`,70),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const g=s(l,[["render",c]]);export{C as __pageData,g as default};
