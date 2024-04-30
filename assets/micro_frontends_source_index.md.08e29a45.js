import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.88002d8f.js";const o="/notes/assets/1.95e23359.png",l="/notes/assets/2.d6c8f346.png",e="/notes/assets/3.48378b36.png",t="/notes/assets/7.1074bdbf.png",r="/notes/assets/8.74dac2d9.png",c="/notes/assets/4.0db7479e.png",i="/notes/assets/5.f87ac1d5.png",E="/notes/assets/6.f07d4505.png",F=JSON.parse('{"title":"微前端","description":"","frontmatter":{},"headers":[],"relativePath":"micro_frontends/source/index.md","filePath":"micro_frontends/source/index.md"}'),y={name:"micro_frontends/source/index.md"},d=p('<h1 id="微前端" tabindex="-1">微前端 <a class="header-anchor" href="#微前端" aria-label="Permalink to &quot;微前端&quot;">​</a></h1><h2 id="一、简介" tabindex="-1">一、简介 <a class="header-anchor" href="#一、简介" aria-label="Permalink to &quot;一、简介&quot;">​</a></h2><p>将前端整体分解为许多更小、更易管理的片段。每个团队可以端到端地拥有自己的功能，可以在自己的代码库中工作，可以独立发布版本，可以不断进行小的增量升级，还可以通过 API 与其他团队集成，以便他们可以一起组建和管理页面和应用程序。</p><p><img src="'+o+`" alt="微前端"></p><h2 id="二、组成部分" tabindex="-1">二、组成部分 <a class="header-anchor" href="#二、组成部分" aria-label="Permalink to &quot;二、组成部分&quot;">​</a></h2><h3 id="_1-生命周期" tabindex="-1">1. 生命周期 <a class="header-anchor" href="#_1-生命周期" aria-label="Permalink to &quot;1. 生命周期&quot;">​</a></h3><p>管理 APP 行为，每个 APP 规定有四个生命周期。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 启动</span></span>
<span class="line"><span style="color:#E1E4E8;">    bootstrap: [() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 挂载</span></span>
<span class="line"><span style="color:#E1E4E8;">    mount: [() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 卸载</span></span>
<span class="line"><span style="color:#E1E4E8;">    unmount: [() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 更新</span></span>
<span class="line"><span style="color:#E1E4E8;">    update: [() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 启动</span></span>
<span class="line"><span style="color:#24292E;">    bootstrap: [() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 挂载</span></span>
<span class="line"><span style="color:#24292E;">    mount: [() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 卸载</span></span>
<span class="line"><span style="color:#24292E;">    unmount: [() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 更新</span></span>
<span class="line"><span style="color:#24292E;">    update: [() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_2-状态" tabindex="-1">2. 状态 <a class="header-anchor" href="#_2-状态" aria-label="Permalink to &quot;2. 状态&quot;">​</a></h3><p><img src="`+l+'" alt="状态"></p><h3 id="_3-执行流程" tabindex="-1">3. 执行流程 <a class="header-anchor" href="#_3-执行流程" aria-label="Permalink to &quot;3. 执行流程&quot;">​</a></h3><p>微前端框架</p><ul><li><p>isStarted false 预加载 APP</p></li><li><p>isStarted true 已启动微前端框架</p><p>/home -&gt; /user 卸载 home 相关的 App，加载 user 相关的 App，挂载 user 相关的 App。</p><p>/home -&gt; app1 执行过程中，如果切换至 /user，首先卸载旧 app，然后挂载 app2。</p></li></ul><p><img src="'+e+'" alt="执行流程"></p><p><img src="'+t+'" alt="执行流程2"></p><p><img src="'+r+'" alt="执行流程3"></p><p>微前端框架先处理 hashchange 或 popstate 事件，然后 VueRouter、React Router 再处理事件</p><p><img src="'+c+'" alt="代加载APP"></p><p><img src="'+i+'" alt="卸载app"></p><p><img src="'+E+'" alt="待挂载app"></p><h2 id="三、微前端解决方案" tabindex="-1">三、微前端解决方案 <a class="header-anchor" href="#三、微前端解决方案" aria-label="Permalink to &quot;三、微前端解决方案&quot;">​</a></h2><p><strong>Single SPA</strong> 它将生命周期应用于每个应用程序。每个应用程序都可以响应 url 路由事件，并且知道如何从 DOM 引导，加载和卸载自身。</p><p>实现简单的微前端框架。</p>',23),h=[d];function _(m,u,g,P,A,f){return a(),n("div",null,h)}const D=s(y,[["render",_]]);export{F as __pageData,D as default};