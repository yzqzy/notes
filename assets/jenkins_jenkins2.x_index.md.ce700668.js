import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.88002d8f.js";const d=JSON.parse('{"title":"Jenkins","description":"","frontmatter":{},"headers":[],"relativePath":"jenkins/jenkins2.x/index.md","filePath":"jenkins/jenkins2.x/index.md"}'),l={name:"jenkins/jenkins2.x/index.md"},e=p(`<h1 id="jenkins" tabindex="-1">Jenkins <a class="header-anchor" href="#jenkins" aria-label="Permalink to &quot;Jenkins&quot;">​</a></h1><h2 id="pipeline-入门" tabindex="-1">pipeline 入门 <a class="header-anchor" href="#pipeline-入门" aria-label="Permalink to &quot;pipeline 入门&quot;">​</a></h2><h3 id="第一个流水线" tabindex="-1">第一个流水线 <a class="header-anchor" href="#第一个流水线" aria-label="Permalink to &quot;第一个流水线&quot;">​</a></h3><p>Jenkinsfile</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">  agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stage</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;Build&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">        echo </span><span style="color:#9ECBFF;">&quot;Building...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stage</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;Test&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">        echo </span><span style="color:#9ECBFF;">&quot;Testing...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stage</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;Deploy&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">        echo </span><span style="color:#9ECBFF;">&quot;Deploying...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">  agent any</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  stages {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stage</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;Build&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      steps {</span></span>
<span class="line"><span style="color:#24292E;">        echo </span><span style="color:#032F62;">&quot;Building...&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stage</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;Test&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      steps {</span></span>
<span class="line"><span style="color:#24292E;">        echo </span><span style="color:#032F62;">&quot;Testing...&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stage</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;Deploy&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      steps {</span></span>
<span class="line"><span style="color:#24292E;">        echo </span><span style="color:#032F62;">&quot;Deploying...&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="版本控制库拉取-pipeline" tabindex="-1">版本控制库拉取 pipeline <a class="header-anchor" href="#版本控制库拉取-pipeline" aria-label="Permalink to &quot;版本控制库拉取 pipeline&quot;">​</a></h3><p>。。。</p><h2 id="pipeline-语法讲解" tabindex="-1">pipeline 语法讲解 <a class="header-anchor" href="#pipeline-语法讲解" aria-label="Permalink to &quot;pipeline 语法讲解&quot;">​</a></h2><h3 id="pipeline-组成" tabindex="-1">pipeline 组成 <a class="header-anchor" href="#pipeline-组成" aria-label="Permalink to &quot;pipeline 组成&quot;">​</a></h3><p>Jenkins pipeline 其实就是基于 Groovy 语言实现的一种 DSL（领域特定语言），用于描述整条流水线是如何进行的。流水前的内容哦那个包括执行编译、打包、测试、输出、测试报告等步骤。</p><h4 id="pipeline-最简结构" tabindex="-1">pipeline 最简结构 <a class="header-anchor" href="#pipeline-最简结构" aria-label="Permalink to &quot;pipeline 最简结构&quot;">​</a></h4><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">  agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stage</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;Build&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">        echo </span><span style="color:#9ECBFF;">&quot;Building...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">  agent any</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  stages {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stage</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;Build&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      steps {</span></span>
<span class="line"><span style="color:#24292E;">        echo </span><span style="color:#032F62;">&quot;Building...&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>pipeline：代表整条流水线，包含整条流水线的逻辑；</li><li>stage 部分：阶段，代表流水线的阶段。每个阶段都必须有名称；</li><li>stages：流水线中多个 stage 的容器。stages 部分至少包含一个 stage；</li><li>steps 部分：代表阶段中的一个或多个具体步骤（step）的容器。steps 部分至少包含一个步骤；</li><li>agent 部分：指定流水线的执行位置（Jenkins agent）。流水线中的每个阶段都必须在某个地方（物理机、虚拟机或 Docker 容器）执行，agent 部分即指定具体再哪里执行。</li></ul><p>以上每一个部分（section）都是必需的，少一个，Jenkins 都会报错。</p><h4 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-label="Permalink to &quot;步骤&quot;">​</a></h4><p>pipeline 基本结构决定的是 pipeline 整体流程，真正生效的还是 pipeline 中的每一个步骤。步骤是 pipeline 中已经不能在拆分的最小操作。</p><p>不过 pipeline 的步骤是可插拔的，就像 Jenkins 的插件一样。Jenkins 提供了对现有插件进行修改，就可以在 pipeline 中当成一个步骤使用。这样就降低了从现有依赖于界面的插件过渡到 pipeline 中步骤的成本。</p><p>已经有很多插件适配了 Jenkins pipeline：<a href="https://github.com/jenkinsci/pipeline-plugin/blob/master/COMPATIBILITY.md%E3%80%82" target="_blank" rel="noreferrer">https://github.com/jenkinsci/pipeline-plugin/blob/master/COMPATIBILITY.md。</a></p><p>只要安装了这些适配了 Jenkins pipeline 的插件，就可以使用其提供的 pipeline 步骤。</p><p>Jenkins 官方也提供了 pipeline 步骤参考文档：<a href="https://www.jenkins.io/doc/pipeline/steps/%E3%80%82" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/pipeline/steps/。</a></p><h3 id="post-部分" tabindex="-1">post 部分 <a class="header-anchor" href="#post-部分" aria-label="Permalink to &quot;post 部分&quot;">​</a></h3><p>post 部分包含的是在整个 pipeline 或阶段完成后一些附加的步骤。post 部门是可选的。</p><p>根据 pipeline 或阶段的完成状态，post 部分分成多种条件块，包括：</p><ul><li>always：不论当前完成状态是什么，都执行；</li><li>changed：只要当前完成状态与上一次完成状态不同就执行；</li><li>fixed：上一次完成状态未失败或不稳定（unstable），当前完成状态为成功时执行；</li><li>regression：上一次完成状态为成功，当前完成状态为失败、不稳定或中止（aborted）时执行；</li><li>aborted：当前执行结果是中止状态时（一般是人为中止）执行；</li><li>failure：当前完成状态为失败时执行；</li><li>success：当前完成状态为成功时执行；</li><li>unstable：当前完成状态为成功时执行；</li><li>cleanup：清理条件块。不论当前完成状态是什么，在其他所有条件块执行完成后都执行。post 部门可以包含多种条件快，以下是 post 部分的完整示例。</li></ul><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">  agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stage</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">        echo </span><span style="color:#9ECBFF;">&quot;build stage&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      post {</span></span>
<span class="line"><span style="color:#E1E4E8;">				always {</span></span>
<span class="line"><span style="color:#E1E4E8;">          echo </span><span style="color:#9ECBFF;">&quot;stage post alwasy&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }        </span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  post {</span></span>
<span class="line"><span style="color:#E1E4E8;">    changed {</span></span>
<span class="line"><span style="color:#E1E4E8;">      echo </span><span style="color:#9ECBFF;">&quot;pipeline post changed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    always {</span></span>
<span class="line"><span style="color:#E1E4E8;">      echo </span><span style="color:#9ECBFF;">&quot;pipeline post always&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    success {</span></span>
<span class="line"><span style="color:#E1E4E8;">      echo </span><span style="color:#9ECBFF;">&quot;pipeline post success&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    failure {</span></span>
<span class="line"><span style="color:#E1E4E8;">      echo </span><span style="color:#9ECBFF;">&quot;pipeline post failure&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">  agent any</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  stages {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stage</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      steps {</span></span>
<span class="line"><span style="color:#24292E;">        echo </span><span style="color:#032F62;">&quot;build stage&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      post {</span></span>
<span class="line"><span style="color:#24292E;">				always {</span></span>
<span class="line"><span style="color:#24292E;">          echo </span><span style="color:#032F62;">&quot;stage post alwasy&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }        </span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  post {</span></span>
<span class="line"><span style="color:#24292E;">    changed {</span></span>
<span class="line"><span style="color:#24292E;">      echo </span><span style="color:#032F62;">&quot;pipeline post changed&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    always {</span></span>
<span class="line"><span style="color:#24292E;">      echo </span><span style="color:#032F62;">&quot;pipeline post always&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    success {</span></span>
<span class="line"><span style="color:#24292E;">      echo </span><span style="color:#032F62;">&quot;pipeline post success&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    failure {</span></span>
<span class="line"><span style="color:#24292E;">      echo </span><span style="color:#032F62;">&quot;pipeline post failure&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="pipeline-支持的指令" tabindex="-1">pipeline 支持的指令 <a class="header-anchor" href="#pipeline-支持的指令" aria-label="Permalink to &quot;pipeline 支持的指令&quot;">​</a></h3><p>基本结构无法满足现实多变的需求。所以，Jenkins pipeline 通过各种指令（directive）类丰富自己。指令可以被理解为对 Jenkins pipeline 基本结构的补充。</p><p>Jenkins pipeline 支持的指令有：</p><ul><li>environment：用于设置环境变量，可定义在 stage 或 pipeline 部分；</li><li>tools：可定义在 pipeline 或 stage 部门，它会自动下载并安装我们执行的工具，并将其加入 PATH 变量中；</li><li>input：定义在 stage 部分，会暂停 pipeline，提示你输入内容；</li><li>options：用于配置 Jenkins pipeline 本身的选项，比如 options {retry (3) } 指当 pipeline 失败时再重试 2 次。options 质量可以定义在 stage 或 pipeline 部分；</li><li>parallel：并行执行多个 step。在 pipeline 插件 1.2 版本之后，parallel 开始支持多个阶段进行并行执行；</li><li>parameters：与 input 不同，parameters 是执行 pipeline 前传入的一些参数；</li><li>triggers：用于定义执行 pipeline 的触发器；</li><li>when：当满足 when 定义的条件时，阶段才执行。</li></ul><p>使用指令时，需要注意的是每个指令都有自己的 “作用域。如果指令使用的位置不正确，Jenkins 将会报错。</p><h3 id="pipeline-本身配置" tabindex="-1">pipeline 本身配置 <a class="header-anchor" href="#pipeline-本身配置" aria-label="Permalink to &quot;pipeline 本身配置&quot;">​</a></h3>`,31),o=[e];function i(t,c,r,E,y,u){return n(),a("div",null,o)}const g=s(l,[["render",i]]);export{d as __pageData,g as default};
