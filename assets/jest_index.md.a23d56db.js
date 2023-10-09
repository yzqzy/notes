import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.9bc09dc8.js";const p="/assets/config.61c4448a.png",h=JSON.parse('{"title":"Jest","description":"","frontmatter":{},"headers":[],"relativePath":"jest/index.md","filePath":"jest/index.md"}'),o={name:"jest/index.md"},e=l(`<h1 id="jest" tabindex="-1">Jest <a class="header-anchor" href="#jest" aria-label="Permalink to &quot;Jest&quot;">​</a></h1><h2 id="简单测试" tabindex="-1">简单测试 <a class="header-anchor" href="#简单测试" aria-label="Permalink to &quot;简单测试&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// demo.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">y</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> y;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  sum,</span></span>
<span class="line"><span style="color:#E1E4E8;">  subtract</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// demo.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">x</span><span style="color:#24292E;">, </span><span style="color:#E36209;">y</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> y;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  sum,</span></span>
<span class="line"><span style="color:#24292E;">  subtract</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 1. 引入测试函数</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">sum</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">subtract</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./demo&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 2. 定义函数输入</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">// 3. 定义预期输出</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">expected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 4. 检查函数是否返回预期结果</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (result </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> expected) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`sum(1, 2) result \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">expected</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}, but get \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">result</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 1. 引入测试函数</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">sum</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">subtract</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./demo&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 2. 定义函数输入</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">// 3. 定义预期输出</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">expected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 4. 检查函数是否返回预期结果</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (result </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> expected) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`sum(1, 2) result \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">expected</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}, but get \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">result</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="断言和测试用例" tabindex="-1">断言和测试用例 <a class="header-anchor" href="#断言和测试用例" aria-label="Permalink to &quot;断言和测试用例&quot;">​</a></h2><p>定义 expect 断言函数</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">sum</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">subtract</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./demo&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">expected</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (result </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> expected) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`expect result \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">expected</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}, but get \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">result</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">sum</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">subtract</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./demo&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">result</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">expected</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (result </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> expected) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`expect result \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">expected</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}, but get \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">result</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">sum</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">subtract</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./demo&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">expected</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (result </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> expected) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`expect result \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">expected</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}, but get \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">result</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">sum</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">subtract</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./demo&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">result</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">expected</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (result </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> expected) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`expect result \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">expected</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}, but get \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">result</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>定义 test 函数，test 函数其实就是测试用例，一个测试用例可以包含多个断言函数。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">message</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}: \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">error</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">expected</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (result </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> expected) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`expect result \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">expected</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}, but get \${</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">result</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">message</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (error) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">message</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}: \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">error</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">result</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">expected</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (result </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> expected) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`expect result \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">expected</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}, but get \${</span><span style="color:#032F62;"> </span><span style="color:#24292E;">result</span><span style="color:#032F62;"> </span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="jest-体验" tabindex="-1">Jest 体验 <a class="header-anchor" href="#jest-体验" aria-label="Permalink to &quot;Jest 体验&quot;">​</a></h2><h3 id="安装、使用" tabindex="-1">安装、使用 <a class="header-anchor" href="#安装、使用" aria-label="Permalink to &quot;安装、使用&quot;">​</a></h3><p>初始化 package.json、安装 jest</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm init </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pnpm i jest </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm init </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pnpm i jest </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><p>定义 scripts 脚本</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;jest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;jest&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>运行测试脚本</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm run test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm run test</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  √ </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) result is </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> ms)</span></span>
<span class="line"><span style="color:#E1E4E8;">  √ </span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) result is </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">                                                                                                                                                         </span></span>
<span class="line"><span style="color:#E1E4E8;">                                                                                                                                                                                       </span></span>
<span class="line"><span style="color:#E1E4E8;">Test </span><span style="color:#B392F0;">Suites</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#B392F0;">Tests</span><span style="color:#E1E4E8;">:       </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#B392F0;">Snapshots</span><span style="color:#E1E4E8;">:   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Time</span><span style="color:#E1E4E8;">:        </span><span style="color:#79B8FF;">0.401</span><span style="color:#E1E4E8;"> s, estimated </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran all test suites.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span></span>
<span class="line"><span style="color:#24292E;">  √ </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) result is </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> ms)</span></span>
<span class="line"><span style="color:#24292E;">  √ </span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) result is </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">                                                                                                                                                         </span></span>
<span class="line"><span style="color:#24292E;">                                                                                                                                                                                       </span></span>
<span class="line"><span style="color:#24292E;">Test </span><span style="color:#6F42C1;">Suites</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#6F42C1;">Tests</span><span style="color:#24292E;">:       </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#6F42C1;">Snapshots</span><span style="color:#24292E;">:   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Time</span><span style="color:#24292E;">:        </span><span style="color:#005CC5;">0.401</span><span style="color:#24292E;"> s, estimated </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> s</span></span>
<span class="line"><span style="color:#24292E;">Ran all test suites.</span></span></code></pre></div><blockquote><p>jest 在运行 *.test.js 文件时，会把 test、expect 等相关辅助函数注册到全局环境。</p></blockquote><h3 id="增加代码提示" tabindex="-1">增加代码提示 <a class="header-anchor" href="#增加代码提示" aria-label="Permalink to &quot;增加代码提示&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i @types</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jest </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i @types</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jest </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><p>安装 @types 模块后，可以直接使用 jest 提示，无须引入。</p><h2 id="jest-介绍" tabindex="-1">Jest 介绍 <a class="header-anchor" href="#jest-介绍" aria-label="Permalink to &quot;Jest 介绍&quot;">​</a></h2><p><a href="https://jestjs.io/" target="_blank" rel="noreferrer">Jest</a> 是 Facebook 出品的一个 JavaScript 开源测试框架。相对其他测试框架，它最大特点就是内置了常用的测试工具，比如零配置、自带断言、测试覆盖率等功能，实现了开箱即用。</p><p>Jest 使用但不限于以下技术项目：Babel、TypeScript、Node、React、Angular、Vue 等。</p><p>Jest 特点：</p><ul><li>零配置</li><li>自带断言</li><li>作为一个面向前端的测试框架，Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见框架的自动化测试</li><li>Jest 的测试用例是并行执行的，只执行发生改变的文件所对应的测试</li><li>测试覆盖率</li><li>Mock 模拟</li></ul><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><p>Jest 提供默认的零配置的使用方式，不过我们可以通过配置文件的方式去更改默认配置。</p><p>生成配置文件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> npx jest </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> npx jest </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">init</span></span></code></pre></div><img src="`+p+`"><p>配置文件中会生成所有配置，不过大部分都是默认配置。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// jest.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * For a detailed explanation regarding each configuration property, visit:</span></span>
<span class="line"><span style="color:#6A737D;"> * https://jestjs.io/docs/configuration 官方文档地址</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// All imported modules in your tests should be mocked automatically</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// automock: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Stop running tests after \`n\` failures</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// bail: 0,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The directory where Jest should store its cached dependency information</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// cacheDirectory: &quot;C:\\\\Users\\\\yueluo\\\\AppData\\\\Local\\\\Temp\\\\jest&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Automatically clear mock calls, instances, contexts and results before every test</span></span>
<span class="line"><span style="color:#E1E4E8;">  clearMocks: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Indicates whether the coverage information should be collected while executing the test</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// collectCoverage: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of glob patterns indicating a set of files for which coverage information should be collected</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// collectCoverageFrom: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The directory where Jest should output its coverage files</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// coverageDirectory: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings used to skip coverage collection</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// coveragePathIgnorePatterns: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;\\\\\\\\node_modules\\\\\\\\&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Indicates which provider should be used to instrument code for coverage</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// coverageProvider: &quot;babel&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A list of reporter names that Jest uses when writing coverage reports</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// coverageReporters: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;json&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;text&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;lcov&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;clover&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An object that configures minimum threshold enforcement for coverage results</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// coverageThreshold: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A path to a custom dependency extractor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// dependencyExtractor: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Make calling deprecated APIs throw helpful error messages</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// errorOnDeprecated: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The default configuration for fake timers</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// fakeTimers: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;enableGlobally&quot;: false</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Force coverage collection from ignored files using an array of glob patterns</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// forceCoverageMatch: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A path to a module which exports an async function that is triggered once before all test suites</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// globalSetup: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A path to a module which exports an async function that is triggered once after all test suites</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// globalTeardown: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A set of global variables that need to be available in all test environments</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// globals: {},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// maxWorkers: &quot;50%&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of directory names to be searched recursively up from the requiring module&#39;s location</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// moduleDirectories: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;node_modules&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of file extensions your modules use</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// moduleFileExtensions: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;js&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;mjs&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;cjs&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;jsx&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;ts&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;tsx&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;json&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;node&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// moduleNameMapper: {},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings, matched against all module paths before considered &#39;visible&#39; to the module loader</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// modulePathIgnorePatterns: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Activates notifications for test results</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// notify: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An enum that specifies notification mode. Requires { notify: true }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// notifyMode: &quot;failure-change&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A preset that is used as a base for Jest&#39;s configuration</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// preset: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Run tests from one or more projects</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// projects: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Use this configuration option to add custom reporters to Jest</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// reporters: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Automatically reset mock state before every test</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// resetMocks: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Reset the module registry before running each individual test</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// resetModules: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A path to a custom resolver</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// resolver: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Automatically restore mock state and implementation before every test</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// restoreMocks: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The root directory that Jest should scan for tests and modules within</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// rootDir: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A list of paths to directories that Jest should use to search for files in</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// roots: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;&lt;rootDir&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Allows you to use a custom runner instead of Jest&#39;s default test runner</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// runner: &quot;jest-runner&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The paths to modules that run some code to configure or set up the testing environment before each test</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// setupFiles: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A list of paths to modules that run some code to configure or set up the testing framework before each test</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// setupFilesAfterEnv: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The number of seconds after which a test is considered as slow and reported as such in the results.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// slowTestThreshold: 5,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A list of paths to snapshot serializer modules Jest should use for snapshot testing</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// snapshotSerializers: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The test environment that will be used for testing</span></span>
<span class="line"><span style="color:#E1E4E8;">  testEnvironment: </span><span style="color:#9ECBFF;">&quot;jsdom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Options that will be passed to the testEnvironment</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testEnvironmentOptions: {},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Adds a location field to test results</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testLocationInResults: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 默认文件配置规则</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The glob patterns Jest uses to detect test files</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testMatch: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;**/__tests__/**/*.[jt]s?(x)&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;**/?(*.)+(spec|test).[tj]s?(x)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 默认忽略目录</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testPathIgnorePatterns: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;\\\\\\\\node_modules\\\\\\\\&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// The regexp pattern or array of patterns that Jest uses to detect test files</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testRegex: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This option allows the use of a custom results processor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testResultsProcessor: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This option allows use of a custom test runner</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// testRunner: &quot;jest-circus/runner&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// A map from regular expressions to paths to transformers</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// transform: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// transformIgnorePatterns: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;\\\\\\\\node_modules\\\\\\\\&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   &quot;\\\\.pnp\\\\.[^\\\\\\\\]+$&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// unmockedModulePathPatterns: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Indicates whether each individual test should be reported during the run</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// verbose: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// watchPathIgnorePatterns: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Whether to use watchman for file crawling</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// watchman: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// jest.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * For a detailed explanation regarding each configuration property, visit:</span></span>
<span class="line"><span style="color:#6A737D;"> * https://jestjs.io/docs/configuration 官方文档地址</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// All imported modules in your tests should be mocked automatically</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// automock: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Stop running tests after \`n\` failures</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// bail: 0,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The directory where Jest should store its cached dependency information</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// cacheDirectory: &quot;C:\\\\Users\\\\yueluo\\\\AppData\\\\Local\\\\Temp\\\\jest&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Automatically clear mock calls, instances, contexts and results before every test</span></span>
<span class="line"><span style="color:#24292E;">  clearMocks: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Indicates whether the coverage information should be collected while executing the test</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// collectCoverage: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of glob patterns indicating a set of files for which coverage information should be collected</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// collectCoverageFrom: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The directory where Jest should output its coverage files</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// coverageDirectory: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings used to skip coverage collection</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// coveragePathIgnorePatterns: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;\\\\\\\\node_modules\\\\\\\\&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Indicates which provider should be used to instrument code for coverage</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// coverageProvider: &quot;babel&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A list of reporter names that Jest uses when writing coverage reports</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// coverageReporters: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;json&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;text&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;lcov&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;clover&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An object that configures minimum threshold enforcement for coverage results</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// coverageThreshold: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A path to a custom dependency extractor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// dependencyExtractor: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Make calling deprecated APIs throw helpful error messages</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// errorOnDeprecated: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The default configuration for fake timers</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// fakeTimers: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;enableGlobally&quot;: false</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Force coverage collection from ignored files using an array of glob patterns</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// forceCoverageMatch: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A path to a module which exports an async function that is triggered once before all test suites</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// globalSetup: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A path to a module which exports an async function that is triggered once after all test suites</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// globalTeardown: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A set of global variables that need to be available in all test environments</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// globals: {},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// maxWorkers: &quot;50%&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of directory names to be searched recursively up from the requiring module&#39;s location</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// moduleDirectories: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;node_modules&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of file extensions your modules use</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// moduleFileExtensions: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;js&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;mjs&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;cjs&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;jsx&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;ts&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;tsx&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;json&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;node&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// moduleNameMapper: {},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings, matched against all module paths before considered &#39;visible&#39; to the module loader</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// modulePathIgnorePatterns: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Activates notifications for test results</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// notify: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An enum that specifies notification mode. Requires { notify: true }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// notifyMode: &quot;failure-change&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A preset that is used as a base for Jest&#39;s configuration</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// preset: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Run tests from one or more projects</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// projects: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Use this configuration option to add custom reporters to Jest</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// reporters: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Automatically reset mock state before every test</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// resetMocks: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Reset the module registry before running each individual test</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// resetModules: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A path to a custom resolver</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// resolver: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Automatically restore mock state and implementation before every test</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// restoreMocks: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The root directory that Jest should scan for tests and modules within</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// rootDir: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A list of paths to directories that Jest should use to search for files in</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// roots: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;&lt;rootDir&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Allows you to use a custom runner instead of Jest&#39;s default test runner</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// runner: &quot;jest-runner&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The paths to modules that run some code to configure or set up the testing environment before each test</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// setupFiles: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A list of paths to modules that run some code to configure or set up the testing framework before each test</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// setupFilesAfterEnv: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The number of seconds after which a test is considered as slow and reported as such in the results.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// slowTestThreshold: 5,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A list of paths to snapshot serializer modules Jest should use for snapshot testing</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// snapshotSerializers: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The test environment that will be used for testing</span></span>
<span class="line"><span style="color:#24292E;">  testEnvironment: </span><span style="color:#032F62;">&quot;jsdom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Options that will be passed to the testEnvironment</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testEnvironmentOptions: {},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Adds a location field to test results</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testLocationInResults: false,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 默认文件配置规则</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The glob patterns Jest uses to detect test files</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testMatch: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;**/__tests__/**/*.[jt]s?(x)&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;**/?(*.)+(spec|test).[tj]s?(x)&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 默认忽略目录</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testPathIgnorePatterns: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;\\\\\\\\node_modules\\\\\\\\&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// The regexp pattern or array of patterns that Jest uses to detect test files</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testRegex: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This option allows the use of a custom results processor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testResultsProcessor: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This option allows use of a custom test runner</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// testRunner: &quot;jest-circus/runner&quot;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// A map from regular expressions to paths to transformers</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// transform: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// transformIgnorePatterns: [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;\\\\\\\\node_modules\\\\\\\\&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   &quot;\\\\.pnp\\\\.[^\\\\\\\\]+$&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// unmockedModulePathPatterns: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Indicates whether each individual test should be reported during the run</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// verbose: undefined,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// watchPathIgnorePatterns: [],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Whether to use watchman for file crawling</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// watchman: true,</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="jestcli-选项" tabindex="-1">JestCli 选项 <a class="header-anchor" href="#jestcli-选项" aria-label="Permalink to &quot;JestCli 选项&quot;">​</a></h2><p>Jest 不仅可以通过配置文件配置，还可以通过命令行参数进行配置。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// a.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test a&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;this a&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// a.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test a&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;this a&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">sum</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">subtract</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./demo&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">sum</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">subtract</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./demo&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>直接运行 <code>pnpm run test</code> 会执行所有的测试用例。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">02</span><span style="color:#E1E4E8;">@</span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> test</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> jest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">a.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    console.log</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      at Object.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;"> (a.test.js:</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Test </span><span style="color:#B392F0;">Suites</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Tests</span><span style="color:#E1E4E8;">:       </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Snapshots</span><span style="color:#E1E4E8;">:   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Time</span><span style="color:#E1E4E8;">:        </span><span style="color:#79B8FF;">1.58</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran all test suites.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">02</span><span style="color:#24292E;">@</span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> test</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> jest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">a.test.js</span></span>
<span class="line"><span style="color:#24292E;">  ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    console.log</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      at Object.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;"> (a.test.js:</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">11</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Test </span><span style="color:#6F42C1;">Suites</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Tests</span><span style="color:#24292E;">:       </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Snapshots</span><span style="color:#24292E;">:   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Time</span><span style="color:#24292E;">:        </span><span style="color:#005CC5;">1.58</span><span style="color:#24292E;"> s</span></span>
<span class="line"><span style="color:#24292E;">Ran all test suites.</span></span></code></pre></div><p>我们还可以指定需要测试的文件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;jest&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;test2&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;jest demo.test.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;jest&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;test2&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;jest demo.test.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>执行 <code>pnpm run test2</code> 只会执行 <code>demo.test.js</code> 文件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  √ </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) result is </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> ms)</span></span>
<span class="line"><span style="color:#E1E4E8;">  √ </span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) result is </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">                                                   </span></span>
<span class="line"><span style="color:#E1E4E8;">                                                                                 </span></span>
<span class="line"><span style="color:#E1E4E8;">Test </span><span style="color:#B392F0;">Suites</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> total                                                   </span></span>
<span class="line"><span style="color:#B392F0;">Tests</span><span style="color:#E1E4E8;">:       </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> total                                                   </span></span>
<span class="line"><span style="color:#B392F0;">Snapshots</span><span style="color:#E1E4E8;">:   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Time</span><span style="color:#E1E4E8;">:        </span><span style="color:#79B8FF;">0.454</span><span style="color:#E1E4E8;"> s, estimated </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran all test suites matching </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">i.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span></span>
<span class="line"><span style="color:#24292E;">  √ </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) result is </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> ms)</span></span>
<span class="line"><span style="color:#24292E;">  √ </span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) result is </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">                                                   </span></span>
<span class="line"><span style="color:#24292E;">                                                                                 </span></span>
<span class="line"><span style="color:#24292E;">Test </span><span style="color:#6F42C1;">Suites</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> total                                                   </span></span>
<span class="line"><span style="color:#6F42C1;">Tests</span><span style="color:#24292E;">:       </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> total                                                   </span></span>
<span class="line"><span style="color:#6F42C1;">Snapshots</span><span style="color:#24292E;">:   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Time</span><span style="color:#24292E;">:        </span><span style="color:#005CC5;">0.454</span><span style="color:#24292E;"> s, estimated </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> s</span></span>
<span class="line"><span style="color:#24292E;">Ran all test suites matching </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">i.</span></span></code></pre></div><p>现在 jest 只会在手动执行的时候触发，如果我们向实时监听文件变化可以这样配置。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;test:watch&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;jest --watchAll&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;test:watch&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;jest --watchAll&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>运行脚本文件，jest 就会监听所有文件的执行。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">02</span><span style="color:#E1E4E8;">@</span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> test</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> jest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">a.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    console.log</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      at Object.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;"> (a.test.js:</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">a.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    console.log</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      at Object.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;"> (a.test.js:</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Test </span><span style="color:#B392F0;">Suites</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Tests</span><span style="color:#E1E4E8;">:       </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Snapshots</span><span style="color:#E1E4E8;">:   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Time</span><span style="color:#E1E4E8;">:        </span><span style="color:#79B8FF;">1.109</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran all test suites.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Watch Usage</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press f to run only failed tests.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press o to only run tests related to changed files.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press p to filter by a filename regex pattern.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press t to filter by a test name regex pattern.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press q to quit watch mode.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press Enter to trigger a test run.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">02</span><span style="color:#24292E;">@</span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> test</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> jest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">a.test.js</span></span>
<span class="line"><span style="color:#24292E;">  ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    console.log</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      at Object.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;"> (a.test.js:</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">11</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">a.test.js</span></span>
<span class="line"><span style="color:#24292E;">  ● Console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    console.log</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      at Object.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;"> (a.test.js:</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">11</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Test </span><span style="color:#6F42C1;">Suites</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Tests</span><span style="color:#24292E;">:       </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Snapshots</span><span style="color:#24292E;">:   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Time</span><span style="color:#24292E;">:        </span><span style="color:#005CC5;">1.109</span><span style="color:#24292E;"> s</span></span>
<span class="line"><span style="color:#24292E;">Ran all test suites.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Watch Usage</span></span>
<span class="line"><span style="color:#24292E;"> › Press f to run only failed tests.</span></span>
<span class="line"><span style="color:#24292E;"> › Press o to only run tests related to changed files.</span></span>
<span class="line"><span style="color:#24292E;"> › Press p to filter by a filename regex pattern.</span></span>
<span class="line"><span style="color:#24292E;"> › Press t to filter by a test name regex pattern.</span></span>
<span class="line"><span style="color:#24292E;"> › Press q to quit watch mode.</span></span>
<span class="line"><span style="color:#24292E;"> › Press Enter to trigger a test run.</span></span></code></pre></div><p>建议开发过程中使用 <code>watch</code> 模式，可以实时给予反馈。</p><h2 id="监视模式" tabindex="-1">监视模式 <a class="header-anchor" href="#监视模式" aria-label="Permalink to &quot;监视模式&quot;">​</a></h2><h3 id="watchall" tabindex="-1">--watchAll <a class="header-anchor" href="#watchall" aria-label="Permalink to &quot;--watchAll&quot;">​</a></h3><p>监视文件的更改并在任何更改时重新运行所有的测试文件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">jest </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">watchAll</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">jest </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">watchAll</span></span></code></pre></div><h3 id="watch" tabindex="-1">--watch <a class="header-anchor" href="#watch" aria-label="Permalink to &quot;--watch&quot;">​</a></h3><blockquote><p>该模式需要 Git 支持</p></blockquote><p>监视 Git 仓库中的文件更改，并重新运行已更改文件相关的测试。如果文件未更改，不会执行任何测试文件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">jest </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">watch</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">jest </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">watch</span></span></code></pre></div><h2 id="监视模式的服务命令" tabindex="-1">监视模式的服务命令 <a class="header-anchor" href="#监视模式的服务命令" aria-label="Permalink to &quot;监视模式的服务命令&quot;">​</a></h2><p>执行 <code>jest --watchAll</code> 后，会打印出如下内容：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Watch Usage</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press f to run only failed tests.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press o to only run tests related to changed files.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press p to filter by a filename regex pattern.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press t to filter by a test name regex pattern.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press q to quit watch mode.</span></span>
<span class="line"><span style="color:#E1E4E8;"> › Press Enter to trigger a test run.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Watch Usage</span></span>
<span class="line"><span style="color:#24292E;"> › Press f to run only failed tests.</span></span>
<span class="line"><span style="color:#24292E;"> › Press o to only run tests related to changed files.</span></span>
<span class="line"><span style="color:#24292E;"> › Press p to filter by a filename regex pattern.</span></span>
<span class="line"><span style="color:#24292E;"> › Press t to filter by a test name regex pattern.</span></span>
<span class="line"><span style="color:#24292E;"> › Press q to quit watch mode.</span></span>
<span class="line"><span style="color:#24292E;"> › Press Enter to trigger a test run.</span></span></code></pre></div><p>执行脚本后，可以通过键盘控制 jest。</p><ul><li>f：只运行失败的测试</li><li>o：只运行与更改文件相关的测试，即 watch模式（需要 git 支持）</li><li>a：运行所有的测试，即 watchAll 模式</li><li>p：以文件名正则表达式模式进行过滤 <ul><li>只有 --watchAll 的时候 p 模式才生效</li><li>注意：testRegex 将尝试使用绝对路径的方式来检测</li></ul></li><li>t：根据测试名称进行过滤，即 <code>test(&#39;sum&#39;)</code> ，sum 就是测试名称</li><li>q：退出监视模式</li><li>enter：触发测试重新执行</li></ul><h2 id="使用-es6-模块" tabindex="-1">使用 ES6 模块 <a class="header-anchor" href="#使用-es6-模块" aria-label="Permalink to &quot;使用 ES6 模块&quot;">​</a></h2><p>Jest 在运行测试的时候会自动找到 Babel 将 ES6 代码转换为 ES5 执行。</p><blockquote><p>运行原理：运行测试之前，结合 Babel，先把你的代码做一次转化，模块被转换为 CommonJS，运行转换后的测试用例代码。</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm install babel</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jest @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">core @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">preset</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">env </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm install babel</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jest @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">core @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">preset</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">env </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// babel.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  presets: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&#39;@babel/preset-env&#39;</span><span style="color:#E1E4E8;">, { targets: { node: </span><span style="color:#9ECBFF;">&#39;current&#39;</span><span style="color:#E1E4E8;"> } }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// babel.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  presets: [</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&#39;@babel/preset-env&#39;</span><span style="color:#24292E;">, { targets: { node: </span><span style="color:#032F62;">&#39;current&#39;</span><span style="color:#24292E;"> } }],</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// demo.js</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">y</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> y;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// demo.js</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">x</span><span style="color:#24292E;">, </span><span style="color:#E36209;">y</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> y;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// demo.test.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { sum, subtract } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./demo&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// demo.test.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { sum, subtract } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./demo&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>执行脚本文件 <code>pnpm run test2</code> 可以正常运行。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">02</span><span style="color:#E1E4E8;">@</span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> test2 </span><span style="color:#B392F0;">D</span><span style="color:#E1E4E8;">:\\workspace\\notes\\jest\\</span><span style="color:#79B8FF;">02</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> jest demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PASS</span><span style="color:#E1E4E8;">  .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  √ </span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) result is </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> ms)</span></span>
<span class="line"><span style="color:#E1E4E8;">  √ </span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) result is </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">                                                                                                                                                         </span></span>
<span class="line"><span style="color:#E1E4E8;">                                                                                                                                                                                       </span></span>
<span class="line"><span style="color:#E1E4E8;">Test </span><span style="color:#B392F0;">Suites</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#B392F0;">Tests</span><span style="color:#E1E4E8;">:       </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> passed, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#B392F0;">Snapshots</span><span style="color:#E1E4E8;">:   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> total</span></span>
<span class="line"><span style="color:#B392F0;">Time</span><span style="color:#E1E4E8;">:        </span><span style="color:#79B8FF;">2.086</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"><span style="color:#E1E4E8;">Ran all test suites matching </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">demo.test.js</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">i.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">02</span><span style="color:#24292E;">@</span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> test2 </span><span style="color:#6F42C1;">D</span><span style="color:#24292E;">:\\workspace\\notes\\jest\\</span><span style="color:#005CC5;">02</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> jest demo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">PASS</span><span style="color:#24292E;">  .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span></span>
<span class="line"><span style="color:#24292E;">  √ </span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) result is </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> ms)</span></span>
<span class="line"><span style="color:#24292E;">  √ </span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) result is </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">                                                                                                                                                         </span></span>
<span class="line"><span style="color:#24292E;">                                                                                                                                                                                       </span></span>
<span class="line"><span style="color:#24292E;">Test </span><span style="color:#6F42C1;">Suites</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#6F42C1;">Tests</span><span style="color:#24292E;">:       </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> passed, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> total                                                                                                                                                         </span></span>
<span class="line"><span style="color:#6F42C1;">Snapshots</span><span style="color:#24292E;">:   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> total</span></span>
<span class="line"><span style="color:#6F42C1;">Time</span><span style="color:#24292E;">:        </span><span style="color:#005CC5;">2.086</span><span style="color:#24292E;"> s</span></span>
<span class="line"><span style="color:#24292E;">Ran all test suites matching </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">demo.test.js</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">i.</span></span></code></pre></div><h2 id="jest-api" tabindex="-1">Jest API <a class="header-anchor" href="#jest-api" aria-label="Permalink to &quot;Jest API&quot;">​</a></h2><p>测试文件中，Jest 将所有的方法和对象放入到全局环境中，不需要导入任何内容就可以使用。不过也支持显式导入。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i @jest</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">globals </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i @jest</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">globals </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { describe, expect, test } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@jest/globals&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { describe, expect, test } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@jest/globals&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><h3 id="test-函数" tabindex="-1">Test 函数 <a class="header-anchor" href="#test-函数" aria-label="Permalink to &quot;Test 函数&quot;">​</a></h3><p>test 函数别名：<code>it(name, fn, timeout)</code>，test 函数就是一个测试用例。</p><ul><li><code>test(name, fn, timeout)</code></li><li><code>test.concurrent(name, fn, timeout)</code></li><li><code>test.concurrent.each(table)(name, fn, timeout)</code></li><li><code>test.concurrent.only.each(table)(name, fn)</code></li><li><code>test.each(table)(name, fn, timeout)</code></li><li><code>test.only(name, fn, timeout)</code> ：仅运行当前测试用例（针对当前模块）</li></ul><h3 id="expect-匹配器" tabindex="-1">Expect 匹配器 <a class="header-anchor" href="#expect-匹配器" aria-label="Permalink to &quot;Expect 匹配器&quot;">​</a></h3><p>编写测试前，通常需要检查值是否满足某些条件。Expect 支持访问许多 “匹配器”，以验证不同的内容。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;global expect&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 匹配数字</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">({ name: </span><span style="color:#9ECBFF;">&#39;jack&#39;</span><span style="color:#E1E4E8;"> }).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ name: </span><span style="color:#9ECBFF;">&#39;jack&#39;</span><span style="color:#E1E4E8;"> }); </span><span style="color:#6A737D;">// 匹配对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yueluosensen&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toMatch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">yueluo</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 正则匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBeGreaterThan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 大于</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBeLessThan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 小于</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;global expect&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 匹配数字</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">({ name: </span><span style="color:#032F62;">&#39;jack&#39;</span><span style="color:#24292E;"> }).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ name: </span><span style="color:#032F62;">&#39;jack&#39;</span><span style="color:#24292E;"> }); </span><span style="color:#6A737D;">// 匹配对象</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yueluosensen&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toMatch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/yueluo/</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 正则匹配</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBeGreaterThan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 大于</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBeLessThan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 小于</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>更多用法：<a href="https://jestjs.io/docs/expect" target="_blank" rel="noreferrer">https://jestjs.io/docs/expect</a></p><h3 id="describe-函数" tabindex="-1">describe 函数 <a class="header-anchor" href="#describe-函数" aria-label="Permalink to &quot;describe 函数&quot;">​</a></h3><p>describe 创建一个将几个测试组合在一起的块。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;demo&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;global&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;global expect&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 匹配数字</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">({ name: </span><span style="color:#9ECBFF;">&#39;jack&#39;</span><span style="color:#E1E4E8;"> }).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ name: </span><span style="color:#9ECBFF;">&#39;jack&#39;</span><span style="color:#E1E4E8;"> }); </span><span style="color:#6A737D;">// 匹配对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yueluosensen&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toMatch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">yueluo</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 正则匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBeGreaterThan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 大于</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBeLessThan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 小于</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;demo&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sum(1, 2) result is 3&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;subtract(2, 1) result is 1&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;global&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;global expect&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 匹配数字</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">({ name: </span><span style="color:#032F62;">&#39;jack&#39;</span><span style="color:#24292E;"> }).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ name: </span><span style="color:#032F62;">&#39;jack&#39;</span><span style="color:#24292E;"> }); </span><span style="color:#6A737D;">// 匹配对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yueluosensen&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toMatch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/yueluo/</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 正则匹配</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBeGreaterThan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 大于</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBeLessThan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 小于</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>如果测试用例同时写在一个文件中，可以将相关的测试用例进行分组。</p><p>相关用法：</p><ul><li><code>describe(name, fn)</code></li><li><code>describe.each(table)(name, fn, timeout)</code></li><li><code>describe.only(name, fn)</code></li><li><code>describe.only.each(table)(name, fn)</code></li><li><code>describe.skip(name, fn)</code></li><li><code>describe.skip.each(table)(name, fn)</code></li></ul><h3 id="生命周期钩子" tabindex="-1">生命周期钩子 <a class="header-anchor" href="#生命周期钩子" aria-label="Permalink to &quot;生命周期钩子&quot;">​</a></h3><ul><li><code>beforeAll(fn, timeout)</code>：测试用例之前执行（仅运行一次）</li><li><code>beforeEach(fn, timeout)</code>：每个测试用例运行之前，都会执行一次</li><li><code>afterAll(fn, timeout)</code>：测试用例执行完毕执行（仅运行一次）</li><li><code>afterEach(fn, timeout)</code>：每个测试用例执行完毕之后，都会执行一次</li></ul><h3 id="jest-对象" tabindex="-1">Jest 对象 <a class="header-anchor" href="#jest-对象" aria-label="Permalink to &quot;Jest 对象&quot;">​</a></h3><p>Jest 对象自动位于每个测试文件中的范围内。</p><p>jest 对象中的方法有助于创建模拟，可以控制 Jest 的整体行为。也可以手动导入。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// jest.autoMockOn</span></span>
<span class="line"><span style="color:#6A737D;">// jest.useFakeTimers</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// jest.autoMockOn</span></span>
<span class="line"><span style="color:#6A737D;">// jest.useFakeTimers</span></span></code></pre></div><p>详情内容参考：<a href="https://jestjs.io/docs/jest-object%E3%80%82" target="_blank" rel="noreferrer">https://jestjs.io/docs/jest-object。</a></p><h2 id="常用匹配器" tabindex="-1">常用匹配器 <a class="header-anchor" href="#常用匹配器" aria-label="Permalink to &quot;常用匹配器&quot;">​</a></h2><p><a href="https://jestjs.io/docs/using-matchers%E3%80%82" target="_blank" rel="noreferrer">https://jestjs.io/docs/using-matchers。</a></p><h3 id="common-matchers" tabindex="-1">Common Matchers <a class="header-anchor" href="#common-matchers" aria-label="Permalink to &quot;Common Matchers&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;common matchers&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;two plus two is four&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">author</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&#39;yueluo&#39;</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(author).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(author); </span><span style="color:#6A737D;">// toBe 只可以判断对象引用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">({ name: </span><span style="color:#9ECBFF;">&#39;yueluo&#39;</span><span style="color:#E1E4E8;"> }).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ name: </span><span style="color:#9ECBFF;">&#39;yueluo&#39;</span><span style="color:#E1E4E8;"> }); </span><span style="color:#6A737D;">// toEqual 可以判断对象属性是否相同</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;common matchers&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;two plus two is four&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">author</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { name: </span><span style="color:#032F62;">&#39;yueluo&#39;</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(author).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(author); </span><span style="color:#6A737D;">// toBe 只可以判断对象引用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">({ name: </span><span style="color:#032F62;">&#39;yueluo&#39;</span><span style="color:#24292E;"> }).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ name: </span><span style="color:#032F62;">&#39;yueluo&#39;</span><span style="color:#24292E;"> }); </span><span style="color:#6A737D;">// toEqual 可以判断对象属性是否相同</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h3 id="truthiness" tabindex="-1">Truthiness <a class="header-anchor" href="#truthiness" aria-label="Permalink to &quot;Truthiness&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;truthiness&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;null&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(n).</span><span style="color:#B392F0;">toBeNull</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断为 null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(n).</span><span style="color:#B392F0;">toBeDefined</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断是否已定义</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(n).not.</span><span style="color:#B392F0;">toBeUndefined</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断不是未定义</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(n).not.</span><span style="color:#B392F0;">toBeTruthy</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断不是 true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(n).</span><span style="color:#B392F0;">toBeFalsy</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断是 false</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;zero&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">z</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(z).not.</span><span style="color:#B392F0;">toBeNull</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断不是 null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(z).</span><span style="color:#B392F0;">toBeDefined</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断是否已定义</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(z).not.</span><span style="color:#B392F0;">toBeUndefined</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断不是未定义</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(z).not.</span><span style="color:#B392F0;">toBeTruthy</span><span style="color:#E1E4E8;">();</span><span style="color:#6A737D;">// 判断不是 true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(z).</span><span style="color:#B392F0;">toBeFalsy</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 判断是 false</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;truthiness&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;null&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(n).</span><span style="color:#6F42C1;">toBeNull</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断为 null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(n).</span><span style="color:#6F42C1;">toBeDefined</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断是否已定义</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(n).not.</span><span style="color:#6F42C1;">toBeUndefined</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断不是未定义</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(n).not.</span><span style="color:#6F42C1;">toBeTruthy</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断不是 true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(n).</span><span style="color:#6F42C1;">toBeFalsy</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断是 false</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;zero&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">z</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(z).not.</span><span style="color:#6F42C1;">toBeNull</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断不是 null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(z).</span><span style="color:#6F42C1;">toBeDefined</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断是否已定义</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(z).not.</span><span style="color:#6F42C1;">toBeUndefined</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断不是未定义</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(z).not.</span><span style="color:#6F42C1;">toBeTruthy</span><span style="color:#24292E;">();</span><span style="color:#6A737D;">// 判断不是 true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(z).</span><span style="color:#6F42C1;">toBeFalsy</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 判断是 false</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h3 id="numbers" tabindex="-1">Numbers <a class="header-anchor" href="#numbers" aria-label="Permalink to &quot;Numbers&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;numbers&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;two plus two&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toBeGreaterThan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toBeGreaterThanOrEqual</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3.5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toBeLessThan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toBeLessThanOrEqual</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4.5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// toBe and toEqual are equivalent for numbers</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;adding floating point numbers&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//expect(value).toBe(0.3); This won&#39;t work because of rounding error</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(value).</span><span style="color:#B392F0;">toBeCloseTo</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0.3</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// This works.</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;numbers&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;two plus two&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toBeGreaterThan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toBeGreaterThanOrEqual</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3.5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toBeLessThan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toBeLessThanOrEqual</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4.5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// toBe and toEqual are equivalent for numbers</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;adding floating point numbers&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//expect(value).toBe(0.3); This won&#39;t work because of rounding error</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(value).</span><span style="color:#6F42C1;">toBeCloseTo</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0.3</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// This works.</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="strings" tabindex="-1">Strings <a class="header-anchor" href="#strings" aria-label="Permalink to &quot;Strings&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;strings&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;there is no I in team&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;team&#39;</span><span style="color:#E1E4E8;">).not.</span><span style="color:#B392F0;">toMatch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">I</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;but there is a &quot;stop&quot; in Christoph&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Christoph&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toMatch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">stop</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;strings&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;there is no I in team&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;team&#39;</span><span style="color:#24292E;">).not.</span><span style="color:#6F42C1;">toMatch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/I/</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;but there is a &quot;stop&quot; in Christoph&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Christoph&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toMatch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/stop/</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="array-and-iterables" tabindex="-1">Array and iterables <a class="header-anchor" href="#array-and-iterables" aria-label="Permalink to &quot;Array and iterables&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;arrays&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">shoppingList</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;diapers&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;kleenex&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;trash bags&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;paper towels&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;milk&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;the shopping list has milk on it&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(shoppingList).</span><span style="color:#B392F0;">toContain</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;milk&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(shoppingList.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">(shoppingList)).</span><span style="color:#B392F0;">toContain</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;milk&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;arrays&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">shoppingList</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;diapers&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;kleenex&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;trash bags&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;paper towels&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;milk&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;the shopping list has milk on it&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(shoppingList).</span><span style="color:#6F42C1;">toContain</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;milk&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(shoppingList.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">(shoppingList)).</span><span style="color:#6F42C1;">toContain</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;milk&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="exceptions" tabindex="-1">Exceptions <a class="header-anchor" href="#exceptions" aria-label="Permalink to &quot;Exceptions&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;exceptions&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileAndroidCode</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;you are using the wrong JDK&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;compiling android goes as expected&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileAndroidCode</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">toThrow</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileAndroidCode</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">toThrow</span><span style="color:#E1E4E8;">(Error);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// You can also use the exact error message or a regexp</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileAndroidCode</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">toThrow</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;you are using the wrong JDK&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileAndroidCode</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">toThrow</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">JDK</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;exceptions&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileAndroidCode</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;you are using the wrong JDK&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;compiling android goes as expected&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileAndroidCode</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">toThrow</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileAndroidCode</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">toThrow</span><span style="color:#24292E;">(Error);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// You can also use the exact error message or a regexp</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileAndroidCode</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">toThrow</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;you are using the wrong JDK&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileAndroidCode</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">toThrow</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/JDK/</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="and-more" tabindex="-1">And More <a class="header-anchor" href="#and-more" aria-label="Permalink to &quot;And More&quot;">​</a></h3><p>This is just a taste. For a complete list of matchers, check out the <a href="https://jestjs.io/docs/expect" target="_blank" rel="noreferrer">reference docs</a>.</p><p>Once you&#39;ve learned about the matchers that are available, a good next step is to check out how Jest lets you <a href="https://jestjs.io/docs/asynchronous" target="_blank" rel="noreferrer">test asynchronous code</a>.</p><h2 id="测试异步代码" tabindex="-1">测试异步代码 <a class="header-anchor" href="#测试异步代码" aria-label="Permalink to &quot;测试异步代码&quot;">​</a></h2><p>新建 async.test.js 文件，并执行以下命令。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx jest async.test.js </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">watch</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx jest async.test.js </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">watch</span></span></code></pre></div><h3 id="回调函数形式" tabindex="-1">回调函数形式 <a class="header-anchor" href="#回调函数形式" aria-label="Permalink to &quot;回调函数形式&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 错误示范：这种写法不会等待定时器结束</span></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async fail&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 正确做法</span></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async success&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">done</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 错误示范：这种写法不会等待定时器结束</span></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async fail&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 正确做法</span></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async success&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">done</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="promise-形式" tabindex="-1">Promise 形式 <a class="header-anchor" href="#promise-形式" aria-label="Permalink to &quot;Promise 形式&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async promise1&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">done</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async promise2&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async promise3&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// return expect(getData()).rejects.toMatch(&#39;error&#39;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">()).resolves.</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async promise4&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(error).</span><span style="color:#B392F0;">toMatch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;async promise5&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// await expect(getData()).rejects.toMatch(&#39;error&#39;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">()).resolves.</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async promise1&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">done</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async promise2&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async promise3&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// return expect(getData()).rejects.toMatch(&#39;error&#39;);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">()).resolves.</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async promise4&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (error) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(error).</span><span style="color:#6F42C1;">toMatch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;async promise5&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// await expect(getData()).rejects.toMatch(&#39;error&#39;);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">()).resolves.</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="mock" tabindex="-1">Mock <a class="header-anchor" href="#mock" aria-label="Permalink to &quot;Mock&quot;">​</a></h2><h3 id="定时器" tabindex="-1">定时器 <a class="header-anchor" href="#定时器" aria-label="Permalink to &quot;定时器&quot;">​</a></h3><h4 id="长时间处理" tabindex="-1">长时间处理 <a class="header-anchor" href="#长时间处理" aria-label="Permalink to &quot;长时间处理&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 针对超长时间的异步函数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;timer: long&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">      }, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// mock 定时器</span></span>
<span class="line"><span style="color:#E1E4E8;">  jest.</span><span style="color:#B392F0;">useFakeTimers</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;timer mock&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 至少存在一次断言调用</span></span>
<span class="line"><span style="color:#E1E4E8;">    expect.</span><span style="color:#B392F0;">assertions</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 快进所有定时器到结束</span></span>
<span class="line"><span style="color:#E1E4E8;">    jest.</span><span style="color:#B392F0;">runAllTimers</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 针对超长时间的异步函数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;timer: long&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">      }, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// mock 定时器</span></span>
<span class="line"><span style="color:#24292E;">  jest.</span><span style="color:#6F42C1;">useFakeTimers</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;timer mock&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 至少存在一次断言调用</span></span>
<span class="line"><span style="color:#24292E;">    expect.</span><span style="color:#6F42C1;">assertions</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 快进所有定时器到结束</span></span>
<span class="line"><span style="color:#24292E;">    jest.</span><span style="color:#6F42C1;">runAllTimers</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h4 id="循环处理" tabindex="-1">循环处理 <a class="header-anchor" href="#循环处理" aria-label="Permalink to &quot;循环处理&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;timer: loop&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      }, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// mock 定时器</span></span>
<span class="line"><span style="color:#E1E4E8;">  jest.</span><span style="color:#B392F0;">useFakeTimers</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;timer mock&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 至少存在一次断言调用</span></span>
<span class="line"><span style="color:#E1E4E8;">    expect.</span><span style="color:#B392F0;">assertions</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 快进当前进行的定时器结束，不等待其它</span></span>
<span class="line"><span style="color:#E1E4E8;">    jest.</span><span style="color:#B392F0;">runOnlyPendingTimers</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;timer: loop&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      }, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// mock 定时器</span></span>
<span class="line"><span style="color:#24292E;">  jest.</span><span style="color:#6F42C1;">useFakeTimers</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;timer mock&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 至少存在一次断言调用</span></span>
<span class="line"><span style="color:#24292E;">    expect.</span><span style="color:#6F42C1;">assertions</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 快进当前进行的定时器结束，不等待其它</span></span>
<span class="line"><span style="color:#24292E;">    jest.</span><span style="color:#6F42C1;">runOnlyPendingTimers</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h4 id="快进指定时间" tabindex="-1">快进指定时间 <a class="header-anchor" href="#快进指定时间" aria-label="Permalink to &quot;快进指定时间&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;timer: set time&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">      }, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// mock 定时器</span></span>
<span class="line"><span style="color:#E1E4E8;">  jest.</span><span style="color:#B392F0;">useFakeTimers</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;timer mock&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 至少存在一次断言调用</span></span>
<span class="line"><span style="color:#E1E4E8;">    expect.</span><span style="color:#B392F0;">assertions</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">({ author: </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    jest.</span><span style="color:#B392F0;">advanceTimersByTime</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    jest.</span><span style="color:#B392F0;">advanceTimersByTime</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;timer: set time&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">      }, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// mock 定时器</span></span>
<span class="line"><span style="color:#24292E;">  jest.</span><span style="color:#6F42C1;">useFakeTimers</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;timer mock&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 至少存在一次断言调用</span></span>
<span class="line"><span style="color:#24292E;">    expect.</span><span style="color:#6F42C1;">assertions</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">({ author: </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    jest.</span><span style="color:#6F42C1;">advanceTimersByTime</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">9</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    jest.</span><span style="color:#6F42C1;">advanceTimersByTime</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h3 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h3><h4 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">items</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; index </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> items.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; index</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">(items[index], index);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mock functions&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">items</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;js&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;ts&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;nodejs&#39;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mockFn</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> jest.</span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 调用函数设置返回值会覆盖上面的实现 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// mockFn.mockReturnValue(123);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 调用函数设置第一个返回值</span></span>
<span class="line"><span style="color:#E1E4E8;">  mockFn.</span><span style="color:#B392F0;">mockReturnValueOnce</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">123</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(items, mockFn);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(mockFn.mock);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFn.mock.calls.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(items.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFn.mock.calls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;js&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFn.mock.calls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">items</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; index </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> items.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; index</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">(items[index], index);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mock functions&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">items</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;js&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;ts&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;nodejs&#39;</span><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">mockFn</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> jest.</span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">((</span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 调用函数设置返回值会覆盖上面的实现 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// mockFn.mockReturnValue(123);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 调用函数设置第一个返回值</span></span>
<span class="line"><span style="color:#24292E;">  mockFn.</span><span style="color:#6F42C1;">mockReturnValueOnce</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">123</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(items, mockFn);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(mockFn.mock);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFn.mock.calls.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(items.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFn.mock.calls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;js&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFn.mock.calls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h4 id="模拟模块" tabindex="-1">模拟模块 <a class="header-anchor" href="#模拟模块" aria-label="Permalink to &quot;模拟模块&quot;">​</a></h4><p>例如使用 axios，不需要真实请求，可以提高测试速度。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// users.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;author&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;yueluo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;author&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;heora&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// users.json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;author&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;yueluo&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;author&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;heora&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// user.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> axios </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;axios&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAllUsers</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> axios.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/users.json&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> res.data);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// user.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> axios </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;axios&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAllUsers</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> axios.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/users.json&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> res.data);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// user.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> axios </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;axios&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { getAllUsers } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./user&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> users </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./users.json&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">jest.</span><span style="color:#B392F0;">mock</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;axios&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;fetch users&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { data: users };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  axios.get.</span><span style="color:#B392F0;">mockResolvedValue</span><span style="color:#E1E4E8;">(resp);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAllUsers</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(data).</span><span style="color:#B392F0;">toEqual</span><span style="color:#E1E4E8;">(users);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// user.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> axios </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;axios&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { getAllUsers } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./user&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> users </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./users.json&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">jest.</span><span style="color:#6F42C1;">mock</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;axios&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;fetch users&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { data: users };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  axios.get.</span><span style="color:#6F42C1;">mockResolvedValue</span><span style="color:#24292E;">(resp);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAllUsers</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(data).</span><span style="color:#6F42C1;">toEqual</span><span style="color:#24292E;">(users);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h4 id="模拟实现" tabindex="-1">模拟实现 <a class="header-anchor" href="#模拟实现" aria-label="Permalink to &quot;模拟实现&quot;">​</a></h4><p>当函数内部存在大量计算，或者功能较多时，可以使用。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// foo.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;foo&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// foo.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;foo&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// foo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">jest.</span><span style="color:#B392F0;">mock</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./foo&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./foo&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">foo.</span><span style="color:#B392F0;">mockImplementation</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">42</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mock implementations&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">42</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// foo.test.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">jest.</span><span style="color:#6F42C1;">mock</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./foo&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./foo&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">foo.</span><span style="color:#6F42C1;">mockImplementation</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">42</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mock implementations&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">42</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h4 id="模拟名称" tabindex="-1">模拟名称 <a class="header-anchor" href="#模拟名称" aria-label="Permalink to &quot;模拟名称&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">myMockFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> jest</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">mockReturnValue</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;default&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">mockImplementation</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">scalar</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">42</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> scalar)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">mockName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;add42&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">myMockFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> jest</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">mockReturnValue</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;default&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">mockImplementation</span><span style="color:#24292E;">(</span><span style="color:#E36209;">scalar</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">42</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> scalar)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">mockName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;add42&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><h4 id="自定义匹配器" tabindex="-1">自定义匹配器 <a class="header-anchor" href="#自定义匹配器" aria-label="Permalink to &quot;自定义匹配器&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// The mock function was called at least once</span></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFunc).</span><span style="color:#B392F0;">toHaveBeenCalled</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// The mock function was called at least once with the specified args</span></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFunc).</span><span style="color:#B392F0;">toHaveBeenCalledWith</span><span style="color:#E1E4E8;">(arg1, arg2);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// The last call to the mock function was called with the specified args</span></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFunc).</span><span style="color:#B392F0;">toHaveBeenLastCalledWith</span><span style="color:#E1E4E8;">(arg1, arg2);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// All calls and the name of the mock is written as a snapshot</span></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(mockFunc).</span><span style="color:#B392F0;">toMatchSnapshot</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// The mock function was called at least once</span></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFunc).</span><span style="color:#6F42C1;">toHaveBeenCalled</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// The mock function was called at least once with the specified args</span></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFunc).</span><span style="color:#6F42C1;">toHaveBeenCalledWith</span><span style="color:#24292E;">(arg1, arg2);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// The last call to the mock function was called with the specified args</span></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFunc).</span><span style="color:#6F42C1;">toHaveBeenLastCalledWith</span><span style="color:#24292E;">(arg1, arg2);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// All calls and the name of the mock is written as a snapshot</span></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(mockFunc).</span><span style="color:#6F42C1;">toMatchSnapshot</span><span style="color:#24292E;">();</span></span></code></pre></div><p>更多用法可以点击<a href="https://jestjs.io/docs/mock-functions" target="_blank" rel="noreferrer">这里</a>查看。</p><h2 id="钩子函数" tabindex="-1">钩子函数 <a class="header-anchor" href="#钩子函数" aria-label="Permalink to &quot;钩子函数&quot;">​</a></h2><p>可以在测试用例执行前后做一些通用的操作。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  author: </span><span style="color:#9ECBFF;">&#39;yueluo&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">beforeAll</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;before all&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">afterAll</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;after all&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 每个实例运行之前</span></span>
<span class="line"><span style="color:#B392F0;">beforeEach</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">({}, data)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 每个实例运行之后</span></span>
<span class="line"><span style="color:#B392F0;">afterEach</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test 1&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  user.author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(user.author).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;heora&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test 2&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(user.author).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yueluo&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  author: </span><span style="color:#032F62;">&#39;yueluo&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">beforeAll</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;before all&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">afterAll</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;after all&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 每个实例运行之前</span></span>
<span class="line"><span style="color:#6F42C1;">beforeEach</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">({}, data)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 每个实例运行之后</span></span>
<span class="line"><span style="color:#6F42C1;">afterEach</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test 1&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  user.author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(user.author).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;heora&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test 2&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(user.author).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yueluo&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>分组</p><blockquote><p>describe 内部的 beforeEach 仅对当前内部的测试用例生效</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">describe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;group&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">beforeEach</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;group before each&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">afterEach</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;group after each&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test1&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;group test1&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test2&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;group test2&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">describe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;group&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">beforeEach</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;group before each&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">afterEach</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;group after each&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test1&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;group test1&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test2&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;group test2&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="dom-测试" tabindex="-1">DOM 测试 <a class="header-anchor" href="#dom-测试" aria-label="Permalink to &quot;DOM 测试&quot;">​</a></h2><p>Jest 配合 <code>jest-environment-jsdom</code> 可以做到在 nodejs 环境中模拟 DOM API。</p><blockquote><p>jsdom 不再默认内置于 jest v28 ，需要显式安装</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i jest</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">environment</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jsdom </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i jest</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">environment</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jsdom </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @jest-environment jsdom</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderHtml</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;div&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  div.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;h1&gt;Hello World&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  \`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(div);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dom testing&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">renderHtml</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;h1&#39;</span><span style="color:#E1E4E8;">).innerHTML).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @jest-environment jsdom</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderHtml</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">div</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;div&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  div.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;h1&gt;Hello World&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#032F62;">  \`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(div);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;dom testing&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">renderHtml</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;h1&#39;</span><span style="color:#24292E;">).innerHTML).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello World&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="vue-组件测试" tabindex="-1">Vue 组件测试 <a class="header-anchor" href="#vue-组件测试" aria-label="Permalink to &quot;Vue 组件测试&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i vue@</span><span style="color:#79B8FF;">2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i vue@</span><span style="color:#005CC5;">2</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @jest-environment jsdom</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue/dist/vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderVueComponent</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  \`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        &lt;h1&gt;{{ message }}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    \`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      message: </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }).</span><span style="color:#B392F0;">$mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;vue testing&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">renderVueComponent</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(document.body.innerHTML)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(document.body.innerHTML).</span><span style="color:#B392F0;">toMatch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">Hello World</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @jest-environment jsdom</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue/dist/vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderVueComponent</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">  \`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">      &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#032F62;">        &lt;h1&gt;{{ message }}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">    \`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    data: {</span></span>
<span class="line"><span style="color:#24292E;">      message: </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }).</span><span style="color:#6F42C1;">$mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;vue testing&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">renderVueComponent</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(document.body.innerHTML)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(document.body.innerHTML).</span><span style="color:#6F42C1;">toMatch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/Hello World/</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="快照测试" tabindex="-1">快照测试 <a class="header-anchor" href="#快照测试" aria-label="Permalink to &quot;快照测试&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @jest-environment jsdom</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue/dist/vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderVueComponent</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  \`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        &lt;h1&gt;{{ message }}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    \`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      message: </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }).</span><span style="color:#B392F0;">$mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">test.</span><span style="color:#B392F0;">only</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Snapshot Testing&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">renderVueComponent</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 首次运行时，会生成快照文件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 下次运行测试会与快照文件进行比对，如果不一致测试失败</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(document.body.innerHTML).</span><span style="color:#B392F0;">toMatchSnapshot</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @jest-environment jsdom</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue/dist/vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderVueComponent</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">  \`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">      &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#032F62;">        &lt;h1&gt;{{ message }}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">    \`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    data: {</span></span>
<span class="line"><span style="color:#24292E;">      message: </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }).</span><span style="color:#6F42C1;">$mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">test.</span><span style="color:#6F42C1;">only</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Snapshot Testing&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">renderVueComponent</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 首次运行时，会生成快照文件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 下次运行测试会与快照文件进行比对，如果不一致测试失败</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(document.body.innerHTML).</span><span style="color:#6F42C1;">toMatchSnapshot</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>快照文件（<code>__snapshots__/vue.test.js.snap</code>）：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Jest Snapshot v1, https://goo.gl/fbAQLP</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">\`Snapshot Testing 1\`</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div id=</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">&quot;app</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">&quot;&gt;&lt;h1&gt;Hello World&lt;/h1&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Jest Snapshot v1, https://goo.gl/fbAQLP</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">exports</span><span style="color:#24292E;">[</span><span style="color:#032F62;">\`Snapshot Testing 1\`</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div id=</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">&quot;app</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">&quot;&gt;&lt;h1&gt;Hello World&lt;/h1&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">  &quot;</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">;</span></span></code></pre></div><p>如果模板确实有更改，我们可以更新快照。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx jest vue.test.js </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">updateSnapshot</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx jest vue.test.js </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">updateSnapshot</span></span></code></pre></div>`,165),t=[e];function c(r,E,y,i,F,d){return n(),a("div",null,t)}const C=s(o,[["render",c]]);export{h as __pageData,C as default};
