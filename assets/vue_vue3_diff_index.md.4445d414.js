import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.88002d8f.js";const l="/notes/assets/0.dc30ccb3.png",o="/notes/assets/1.8ba367a6.png",t="/notes/assets/2.3fa60d72.png",e="/notes/assets/3.bf980320.png",c="/notes/assets/4.8ffae24d.png",r="/notes/assets/5.05f27cd0.png",E="/notes/assets/6.6400e19d.png",g=JSON.parse('{"title":"Vue3 Diff","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue3_diff/index.md","filePath":"vue/vue3_diff/index.md"}'),y={name:"vue/vue3_diff/index.md"},i=p('<h1 id="vue3-diff" tabindex="-1">Vue3 Diff <a class="header-anchor" href="#vue3-diff" aria-label="Permalink to &quot;Vue3 Diff&quot;">​</a></h1><p>Vue3 patch method：</p><p><strong>runtime-core/src/renderer.ts</strong></p><p>Vue3 Diff 算法和 Vue2 基本是一致的，主要看一下 patch 方法。</p><h3 id="patch-流程图" tabindex="-1">patch 流程图 <a class="header-anchor" href="#patch-流程图" aria-label="Permalink to &quot;patch 流程图&quot;">​</a></h3><p><img src="'+l+`" alt="流程图"></p><h3 id="patch-源码分析" tabindex="-1">patch 源码分析 <a class="header-anchor" href="#patch-源码分析" aria-label="Permalink to &quot;patch 源码分析&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">patch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PatchFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">patch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PatchFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {}</span></span></code></pre></div><h4 id="patch" tabindex="-1">patch <a class="header-anchor" href="#patch" aria-label="Permalink to &quot;patch&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Note: functions inside this closure should use \`const xxx = () =&gt; {}\`</span></span>
<span class="line"><span style="color:#6A737D;">// style in order to prevent being inlined by minifiers.</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">patch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PatchFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">n1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">n2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">container</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  anchor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  parentComponent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  parentSuspense </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  isSVG </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// patching &amp; not same type, unmount old tree</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    anchor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getNextHostNode</span><span style="color:#E1E4E8;">(n1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组件相关的卸载操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">unmount</span><span style="color:#E1E4E8;">(n1, parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    n1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n2.patchFlag </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">BAIL</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    optimized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    n2.dynamicChildren </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">type</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">ref</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">shapeFlag</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Text:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">processText</span><span style="color:#E1E4E8;">(n1, n2, container, anchor)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Comment:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">processCommentNode</span><span style="color:#E1E4E8;">(n1, n2, container, anchor)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Static:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">mountStaticNode</span><span style="color:#E1E4E8;">(n2, container, anchor, isSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">patchStaticNode</span><span style="color:#E1E4E8;">(n1, n2, container, isSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Fragment:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">processFragment</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">        n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">        container,</span></span>
<span class="line"><span style="color:#E1E4E8;">        anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">        parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">        parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">        isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">        optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">      )</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">ELEMENT</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 处理普通元素节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">processElement</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">          n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">          container,</span></span>
<span class="line"><span style="color:#E1E4E8;">          anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">          isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">          optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">        )</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">COMPONENT</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">processComponent</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">          n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">          container,</span></span>
<span class="line"><span style="color:#E1E4E8;">          anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">          isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">          optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">        )</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">TELEPORT</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ;(type </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> TeleportImpl).</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          n1 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TeleportVNode</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          n2 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TeleportVNode</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          container,</span></span>
<span class="line"><span style="color:#E1E4E8;">          anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">          isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">          optimized,</span></span>
<span class="line"><span style="color:#E1E4E8;">          internals</span></span>
<span class="line"><span style="color:#E1E4E8;">        )</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__FEATURE_SUSPENSE__ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">SUSPENSE</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ;(type </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> SuspenseImpl).</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">          n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">          container,</span></span>
<span class="line"><span style="color:#E1E4E8;">          anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">          parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">          isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">          optimized,</span></span>
<span class="line"><span style="color:#E1E4E8;">          internals</span></span>
<span class="line"><span style="color:#E1E4E8;">        )</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Invalid VNode type:&#39;</span><span style="color:#E1E4E8;">, type, </span><span style="color:#9ECBFF;">\`(\${</span><span style="color:#F97583;">typeof</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">type</span><span style="color:#9ECBFF;">})\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// set ref</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (ref </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> parentComponent) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setRef</span><span style="color:#E1E4E8;">(ref, n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n1.ref, parentSuspense, n2)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Note: functions inside this closure should use \`const xxx = () =&gt; {}\`</span></span>
<span class="line"><span style="color:#6A737D;">// style in order to prevent being inlined by minifiers.</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">patch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PatchFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">n1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">n2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">container</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  anchor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  parentComponent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  parentSuspense </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  isSVG </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  optimized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// patching &amp; not same type, unmount old tree</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#24292E;">    anchor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getNextHostNode</span><span style="color:#24292E;">(n1)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组件相关的卸载操作</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">unmount</span><span style="color:#24292E;">(n1, parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    n1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n2.patchFlag </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">BAIL</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    optimized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    n2.dynamicChildren </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">type</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">ref</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">shapeFlag</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (type) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Text:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">processText</span><span style="color:#24292E;">(n1, n2, container, anchor)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Comment:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">processCommentNode</span><span style="color:#24292E;">(n1, n2, container, anchor)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Static:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">mountStaticNode</span><span style="color:#24292E;">(n2, container, anchor, isSVG)</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">patchStaticNode</span><span style="color:#24292E;">(n1, n2, container, isSVG)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Fragment:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">processFragment</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        n1,</span></span>
<span class="line"><span style="color:#24292E;">        n2,</span></span>
<span class="line"><span style="color:#24292E;">        container,</span></span>
<span class="line"><span style="color:#24292E;">        anchor,</span></span>
<span class="line"><span style="color:#24292E;">        parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">        parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">        isSVG,</span></span>
<span class="line"><span style="color:#24292E;">        optimized</span></span>
<span class="line"><span style="color:#24292E;">      )</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">ELEMENT</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 处理普通元素节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">processElement</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          n1,</span></span>
<span class="line"><span style="color:#24292E;">          n2,</span></span>
<span class="line"><span style="color:#24292E;">          container,</span></span>
<span class="line"><span style="color:#24292E;">          anchor,</span></span>
<span class="line"><span style="color:#24292E;">          parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">          parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">          isSVG,</span></span>
<span class="line"><span style="color:#24292E;">          optimized</span></span>
<span class="line"><span style="color:#24292E;">        )</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">COMPONENT</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">processComponent</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          n1,</span></span>
<span class="line"><span style="color:#24292E;">          n2,</span></span>
<span class="line"><span style="color:#24292E;">          container,</span></span>
<span class="line"><span style="color:#24292E;">          anchor,</span></span>
<span class="line"><span style="color:#24292E;">          parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">          parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">          isSVG,</span></span>
<span class="line"><span style="color:#24292E;">          optimized</span></span>
<span class="line"><span style="color:#24292E;">        )</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">TELEPORT</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ;(type </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> TeleportImpl).</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          n1 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TeleportVNode</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          n2 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TeleportVNode</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          container,</span></span>
<span class="line"><span style="color:#24292E;">          anchor,</span></span>
<span class="line"><span style="color:#24292E;">          parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">          parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">          isSVG,</span></span>
<span class="line"><span style="color:#24292E;">          optimized,</span></span>
<span class="line"><span style="color:#24292E;">          internals</span></span>
<span class="line"><span style="color:#24292E;">        )</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__FEATURE_SUSPENSE__ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">SUSPENSE</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ;(type </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> SuspenseImpl).</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          n1,</span></span>
<span class="line"><span style="color:#24292E;">          n2,</span></span>
<span class="line"><span style="color:#24292E;">          container,</span></span>
<span class="line"><span style="color:#24292E;">          anchor,</span></span>
<span class="line"><span style="color:#24292E;">          parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">          parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">          isSVG,</span></span>
<span class="line"><span style="color:#24292E;">          optimized,</span></span>
<span class="line"><span style="color:#24292E;">          internals</span></span>
<span class="line"><span style="color:#24292E;">        )</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Invalid VNode type:&#39;</span><span style="color:#24292E;">, type, </span><span style="color:#032F62;">\`(\${</span><span style="color:#D73A49;">typeof</span><span style="color:#032F62;"> </span><span style="color:#24292E;">type</span><span style="color:#032F62;">})\`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// set ref</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (ref </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> parentComponent) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setRef</span><span style="color:#24292E;">(ref, n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n1.ref, parentSuspense, n2)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="processelement" tabindex="-1">processElement <a class="header-anchor" href="#processelement" aria-label="Permalink to &quot;processElement&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">processElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">n1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">n2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">container</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RendererElement</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">anchor</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RendererNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentComponent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ComponentInternalInstance</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentSuspense</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SuspenseBoundary</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">isSVG</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">optimized</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	isSVG </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isSVG </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> (n2.type </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;svg&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 首次挂载，n1 为 null</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 挂载元素</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">mountElement</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">			container,</span></span>
<span class="line"><span style="color:#E1E4E8;">			anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">			optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 非首次挂载，patch 更新</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">patchElement</span><span style="color:#E1E4E8;">(n1, n2, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">processElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">n1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">n2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">container</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RendererElement</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">anchor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RendererNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentComponent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ComponentInternalInstance</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentSuspense</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SuspenseBoundary</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">isSVG</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">optimized</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	isSVG </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isSVG </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> (n2.type </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;svg&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 首次挂载，n1 为 null</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 挂载元素</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">mountElement</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			n2,</span></span>
<span class="line"><span style="color:#24292E;">			container,</span></span>
<span class="line"><span style="color:#24292E;">			anchor,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			isSVG,</span></span>
<span class="line"><span style="color:#24292E;">			optimized</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 非首次挂载，patch 更新</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">patchElement</span><span style="color:#24292E;">(n1, n2, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="patchelement" tabindex="-1">patchElement <a class="header-anchor" href="#patchelement" aria-label="Permalink to &quot;patchElement&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">patchElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">n1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">n2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentComponent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ComponentInternalInstance</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentSuspense</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SuspenseBoundary</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">isSVG</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">optimized</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n2.el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1.el</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { patchFlag, dynamicChildren, dirs } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// #1426 take the old vnode&#39;s patch flag into account since user may clone a</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// compiler-generated vnode, which de-opts to FULL_PROPS</span></span>
<span class="line"><span style="color:#E1E4E8;">	patchFlag </span><span style="color:#F97583;">|=</span><span style="color:#E1E4E8;"> n1.patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">FULL_PROPS</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">oldProps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1.props </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EMPTY_OBJ</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">newProps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2.props </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EMPTY_OBJ</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> vnodeHook</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeHook</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((vnodeHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newProps.onVnodeBeforeUpdate)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">invokeVNodeHook</span><span style="color:#E1E4E8;">(vnodeHook, parentComponent, n2, n1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (dirs) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">invokeDirectiveHook</span><span style="color:#E1E4E8;">(n2, n1, parentComponent, </span><span style="color:#9ECBFF;">&#39;beforeUpdate&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> isHmrUpdating) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// HMR updated, force full diff</span></span>
<span class="line"><span style="color:#E1E4E8;">		patchFlag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">		optimized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">		dynamicChildren </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 优化操作，如果 patchFlag &gt; 0 才进行比对</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// the presence of a patchFlag means this element&#39;s render code was</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// generated by the compiler and can take the fast path.</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// in this path old node and new node are guaranteed to have the same shape</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// (i.e. at the exact same position in the source template)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">FULL_PROPS</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// element props contain dynamic keys, full diff needed</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果存在动态的 key</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">patchProps</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">				el,</span></span>
<span class="line"><span style="color:#E1E4E8;">				n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">				oldProps,</span></span>
<span class="line"><span style="color:#E1E4E8;">				newProps,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">				isSVG</span></span>
<span class="line"><span style="color:#E1E4E8;">			)</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// class</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// this flag is matched when the element has dynamic class bindings.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 处理类</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">CLASS</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (oldProps.class </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> newProps.class) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">hostPatchProp</span><span style="color:#E1E4E8;">(el, </span><span style="color:#9ECBFF;">&#39;class&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, newProps.class, isSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// style</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// this flag is matched when the element has dynamic style bindings</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 处理 style</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">STYLE</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">hostPatchProp</span><span style="color:#E1E4E8;">(el, </span><span style="color:#9ECBFF;">&#39;style&#39;</span><span style="color:#E1E4E8;">, oldProps.style, newProps.style, isSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// props</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// This flag is matched when the element has dynamic prop/attr bindings</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// other than class and style. The keys of dynamic prop/attrs are saved for</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// faster iteration.</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// Note dynamic keys like :[foo]=&quot;bar&quot; will cause this optimization to</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// bail out and go through a full diff because we need to unset the old key</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">PROPS</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// if the flag is present then dynamicProps must be non-null</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">propsToUpdate</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2.dynamicProps</span><span style="color:#F97583;">!</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> propsToUpdate.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> propsToUpdate[i]</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">prev</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> oldProps[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">next</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newProps[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">						next </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> prev </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">						(hostForcePatchProp </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hostForcePatchProp</span><span style="color:#E1E4E8;">(el, key))</span></span>
<span class="line"><span style="color:#E1E4E8;">					) {</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#B392F0;">hostPatchProp</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">							el,</span></span>
<span class="line"><span style="color:#E1E4E8;">							key,</span></span>
<span class="line"><span style="color:#E1E4E8;">							prev,</span></span>
<span class="line"><span style="color:#E1E4E8;">							next,</span></span>
<span class="line"><span style="color:#E1E4E8;">							isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">							n1.children </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">							parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">							parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">							unmountChildren</span></span>
<span class="line"><span style="color:#E1E4E8;">						)</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// text</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// This flag is matched when the element has only dynamic text children.</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">TEXT</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1.children </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> n2.children) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">hostSetElementText</span><span style="color:#E1E4E8;">(el, n2.children </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">optimized </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> dynamicChildren </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// unoptimized, full diff</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">patchProps</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			el,</span></span>
<span class="line"><span style="color:#E1E4E8;">			n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">			oldProps,</span></span>
<span class="line"><span style="color:#E1E4E8;">			newProps,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			isSVG</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">areChildrenSVG</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isSVG </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n2.type </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;foreignObject&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (dynamicChildren) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">patchBlockChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			n1.dynamicChildren</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			dynamicChildren,</span></span>
<span class="line"><span style="color:#E1E4E8;">			el,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			areChildrenSVG</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> parentComponent </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> parentComponent.type.__hmrId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">traverseStaticChildren</span><span style="color:#E1E4E8;">(n1, n2)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">optimized) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// full diff</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 主要看一下 patchChildren 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">patchChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">			n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">			el,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			areChildrenSVG</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((vnodeHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newProps.onVnodeUpdated) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> dirs) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">queuePostRenderEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			vnodeHook </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeVNodeHook</span><span style="color:#E1E4E8;">(vnodeHook, parentComponent, n2, n1)</span></span>
<span class="line"><span style="color:#E1E4E8;">			dirs </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeDirectiveHook</span><span style="color:#E1E4E8;">(n2, n1, parentComponent, </span><span style="color:#9ECBFF;">&#39;updated&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}, parentSuspense)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">patchElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">n1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">n2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentComponent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ComponentInternalInstance</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentSuspense</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SuspenseBoundary</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">isSVG</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">optimized</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n2.el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1.el</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { patchFlag, dynamicChildren, dirs } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// #1426 take the old vnode&#39;s patch flag into account since user may clone a</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// compiler-generated vnode, which de-opts to FULL_PROPS</span></span>
<span class="line"><span style="color:#24292E;">	patchFlag </span><span style="color:#D73A49;">|=</span><span style="color:#24292E;"> n1.patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">FULL_PROPS</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">oldProps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1.props </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EMPTY_OBJ</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">newProps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2.props </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EMPTY_OBJ</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> vnodeHook</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeHook</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((vnodeHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newProps.onVnodeBeforeUpdate)) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">invokeVNodeHook</span><span style="color:#24292E;">(vnodeHook, parentComponent, n2, n1)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (dirs) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">invokeDirectiveHook</span><span style="color:#24292E;">(n2, n1, parentComponent, </span><span style="color:#032F62;">&#39;beforeUpdate&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> isHmrUpdating) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// HMR updated, force full diff</span></span>
<span class="line"><span style="color:#24292E;">		patchFlag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">		optimized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">		dynamicChildren </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 优化操作，如果 patchFlag &gt; 0 才进行比对</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// the presence of a patchFlag means this element&#39;s render code was</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// generated by the compiler and can take the fast path.</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// in this path old node and new node are guaranteed to have the same shape</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// (i.e. at the exact same position in the source template)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">FULL_PROPS</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// element props contain dynamic keys, full diff needed</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果存在动态的 key</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">patchProps</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">				el,</span></span>
<span class="line"><span style="color:#24292E;">				n2,</span></span>
<span class="line"><span style="color:#24292E;">				oldProps,</span></span>
<span class="line"><span style="color:#24292E;">				newProps,</span></span>
<span class="line"><span style="color:#24292E;">				parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">				parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">				isSVG</span></span>
<span class="line"><span style="color:#24292E;">			)</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// class</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// this flag is matched when the element has dynamic class bindings.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 处理类</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">CLASS</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (oldProps.class </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> newProps.class) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">hostPatchProp</span><span style="color:#24292E;">(el, </span><span style="color:#032F62;">&#39;class&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, newProps.class, isSVG)</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// style</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// this flag is matched when the element has dynamic style bindings</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 处理 style</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">STYLE</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">hostPatchProp</span><span style="color:#24292E;">(el, </span><span style="color:#032F62;">&#39;style&#39;</span><span style="color:#24292E;">, oldProps.style, newProps.style, isSVG)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// props</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// This flag is matched when the element has dynamic prop/attr bindings</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// other than class and style. The keys of dynamic prop/attrs are saved for</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// faster iteration.</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// Note dynamic keys like :[foo]=&quot;bar&quot; will cause this optimization to</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// bail out and go through a full diff because we need to unset the old key</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">PROPS</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// if the flag is present then dynamicProps must be non-null</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">propsToUpdate</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2.dynamicProps</span><span style="color:#D73A49;">!</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> propsToUpdate.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">key</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> propsToUpdate[i]</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">prev</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> oldProps[key]</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">next</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newProps[key]</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">						next </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> prev </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">						(hostForcePatchProp </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hostForcePatchProp</span><span style="color:#24292E;">(el, key))</span></span>
<span class="line"><span style="color:#24292E;">					) {</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#6F42C1;">hostPatchProp</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">							el,</span></span>
<span class="line"><span style="color:#24292E;">							key,</span></span>
<span class="line"><span style="color:#24292E;">							prev,</span></span>
<span class="line"><span style="color:#24292E;">							next,</span></span>
<span class="line"><span style="color:#24292E;">							isSVG,</span></span>
<span class="line"><span style="color:#24292E;">							n1.children </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">							parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">							parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">							unmountChildren</span></span>
<span class="line"><span style="color:#24292E;">						)</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// text</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// This flag is matched when the element has only dynamic text children.</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">TEXT</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1.children </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> n2.children) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">hostSetElementText</span><span style="color:#24292E;">(el, n2.children </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">optimized </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> dynamicChildren </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// unoptimized, full diff</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">patchProps</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			el,</span></span>
<span class="line"><span style="color:#24292E;">			n2,</span></span>
<span class="line"><span style="color:#24292E;">			oldProps,</span></span>
<span class="line"><span style="color:#24292E;">			newProps,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			isSVG</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">areChildrenSVG</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isSVG </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n2.type </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;foreignObject&#39;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (dynamicChildren) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">patchBlockChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			n1.dynamicChildren</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			dynamicChildren,</span></span>
<span class="line"><span style="color:#24292E;">			el,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			areChildrenSVG</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> parentComponent </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> parentComponent.type.__hmrId) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">traverseStaticChildren</span><span style="color:#24292E;">(n1, n2)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">optimized) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// full diff</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 主要看一下 patchChildren 方法</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">patchChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			n1,</span></span>
<span class="line"><span style="color:#24292E;">			n2,</span></span>
<span class="line"><span style="color:#24292E;">			el,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			areChildrenSVG</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((vnodeHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newProps.onVnodeUpdated) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> dirs) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">queuePostRenderEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			vnodeHook </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeVNodeHook</span><span style="color:#24292E;">(vnodeHook, parentComponent, n2, n1)</span></span>
<span class="line"><span style="color:#24292E;">			dirs </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeDirectiveHook</span><span style="color:#24292E;">(n2, n1, parentComponent, </span><span style="color:#032F62;">&#39;updated&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		}, parentSuspense)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="patchchildren-☆" tabindex="-1">patchChildren ☆ <a class="header-anchor" href="#patchchildren-☆" aria-label="Permalink to &quot;patchChildren ☆&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">patchChildren</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PatchChildrenFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">n1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">n2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">container</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">anchor</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentComponent</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentSuspense</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">isSVG</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	optimized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取 n1 的子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n1.children</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">prevShapeFlag</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1 </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> n1.shapeFlag </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取 n2 的子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2.children</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">patchFlag</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">shapeFlag</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// fast path</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">KEYED_FRAGMENT</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// this could be either fully-keyed or mixed (some keyed some not)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// presence of patchFlag means children are guaranteed to be arrays</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果 children 存在 key</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">patchKeyedChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">				c1 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">				c2 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeArrayChildren</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				container,</span></span>
<span class="line"><span style="color:#E1E4E8;">				anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">				isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">				optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patchFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> PatchFlags.</span><span style="color:#79B8FF;">UNKEYED_FRAGMENT</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// unkeyed</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// children 没有 key</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">patchUnkeyedChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">				c1 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">				c2 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeArrayChildren</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				container,</span></span>
<span class="line"><span style="color:#E1E4E8;">				anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">				isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">				optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// children has 3 possibilities: text, array or no children.</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">TEXT_CHILDREN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// text children fast path</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevShapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">ARRAY_CHILDREN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">unmountChildren</span><span style="color:#E1E4E8;">(c1 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[], parentComponent, parentSuspense)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c2 </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> c1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">hostSetElementText</span><span style="color:#E1E4E8;">(container, c2 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevShapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">ARRAY_CHILDREN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// prev children was array</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">ARRAY_CHILDREN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// two arrays, cannot assume anything, do full diff</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">patchKeyedChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">					c1 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">					c2 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeArrayChildren</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					container,</span></span>
<span class="line"><span style="color:#E1E4E8;">					anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">					isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">					optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">				)</span></span>
<span class="line"><span style="color:#E1E4E8;">			} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// no new children, just unmount old</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">unmountChildren</span><span style="color:#E1E4E8;">(c1 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[], parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// prev children was text OR null</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// new children is array OR null</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevShapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">TEXT_CHILDREN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">hostSetElementText</span><span style="color:#E1E4E8;">(container, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// mount new if array</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> ShapeFlags.</span><span style="color:#79B8FF;">ARRAY_CHILDREN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">mountChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">					c2 </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeArrayChildren</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					container,</span></span>
<span class="line"><span style="color:#E1E4E8;">					anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">					isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">					optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">				)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">patchChildren</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PatchChildrenFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">n1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">n2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">container</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">anchor</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentComponent</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentSuspense</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">isSVG</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	optimized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取 n1 的子节点</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n1.children</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">prevShapeFlag</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1 </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> n1.shapeFlag </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取 n2 的子节点</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2.children</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">patchFlag</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">shapeFlag</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// fast path</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">KEYED_FRAGMENT</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// this could be either fully-keyed or mixed (some keyed some not)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// presence of patchFlag means children are guaranteed to be arrays</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果 children 存在 key</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">patchKeyedChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">				c1 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">				c2 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeArrayChildren</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				container,</span></span>
<span class="line"><span style="color:#24292E;">				anchor,</span></span>
<span class="line"><span style="color:#24292E;">				parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">				parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">				isSVG,</span></span>
<span class="line"><span style="color:#24292E;">				optimized</span></span>
<span class="line"><span style="color:#24292E;">			)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patchFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> PatchFlags.</span><span style="color:#005CC5;">UNKEYED_FRAGMENT</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// unkeyed</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// children 没有 key</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">patchUnkeyedChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">				c1 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">				c2 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeArrayChildren</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				container,</span></span>
<span class="line"><span style="color:#24292E;">				anchor,</span></span>
<span class="line"><span style="color:#24292E;">				parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">				parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">				isSVG,</span></span>
<span class="line"><span style="color:#24292E;">				optimized</span></span>
<span class="line"><span style="color:#24292E;">			)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// children has 3 possibilities: text, array or no children.</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">TEXT_CHILDREN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// text children fast path</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevShapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">ARRAY_CHILDREN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">unmountChildren</span><span style="color:#24292E;">(c1 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[], parentComponent, parentSuspense)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c2 </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> c1) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">hostSetElementText</span><span style="color:#24292E;">(container, c2 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevShapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">ARRAY_CHILDREN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// prev children was array</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">ARRAY_CHILDREN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// two arrays, cannot assume anything, do full diff</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">patchKeyedChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">					c1 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">					c2 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeArrayChildren</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					container,</span></span>
<span class="line"><span style="color:#24292E;">					anchor,</span></span>
<span class="line"><span style="color:#24292E;">					parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">					parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">					isSVG,</span></span>
<span class="line"><span style="color:#24292E;">					optimized</span></span>
<span class="line"><span style="color:#24292E;">				)</span></span>
<span class="line"><span style="color:#24292E;">			} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// no new children, just unmount old</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">unmountChildren</span><span style="color:#24292E;">(c1 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[], parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// prev children was text OR null</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// new children is array OR null</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevShapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">TEXT_CHILDREN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">hostSetElementText</span><span style="color:#24292E;">(container, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// mount new if array</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> ShapeFlags.</span><span style="color:#005CC5;">ARRAY_CHILDREN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">mountChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">					c2 </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeArrayChildren</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					container,</span></span>
<span class="line"><span style="color:#24292E;">					anchor,</span></span>
<span class="line"><span style="color:#24292E;">					parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">					parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">					isSVG,</span></span>
<span class="line"><span style="color:#24292E;">					optimized</span></span>
<span class="line"><span style="color:#24292E;">				)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="patchunkeyedchildren" tabindex="-1">patchUnkeyedChildren <a class="header-anchor" href="#patchunkeyedchildren" aria-label="Permalink to &quot;patchUnkeyedChildren&quot;">​</a></h4><p>patch 过程中没有key的情况</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">patchUnkeyedChildren</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">c1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">c2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeArrayChildren</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">container</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RendererElement</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">anchor</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RendererNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentComponent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ComponentInternalInstance</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentSuspense</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SuspenseBoundary</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">isSVG</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">optimized</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	c1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c1 </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EMPTY_ARR</span></span>
<span class="line"><span style="color:#E1E4E8;">	c2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c2 </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EMPTY_ARR</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">oldLength</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c1.</span><span style="color:#79B8FF;">length</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">newLength</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c2.</span><span style="color:#79B8FF;">length</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取数据长度，取数组长度比较小的作为 commonLength，即循环的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commonLength</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">min</span><span style="color:#E1E4E8;">(oldLength, newLength)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> commonLength; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取新节点的子项</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nextChild</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (c2[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cloneIfMounted</span><span style="color:#E1E4E8;">(c2[i] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">normalizeVNode</span><span style="color:#E1E4E8;">(c2[i]))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 调用 patch 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			c1[i],</span></span>
<span class="line"><span style="color:#E1E4E8;">			nextChild,</span></span>
<span class="line"><span style="color:#E1E4E8;">			container,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">			optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (oldLength </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> newLength) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// remove old</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果老节点比新节点多，执行 unmountChildren 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#6A737D;">// 把 c1 多出来的一项移除掉（参见图示 1）</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">unmountChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			c1,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			commonLength</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// mount new</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果新节点比老节点多，执行 mountChildren 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 把新节点插入到老节点中（参见图示二）</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">mountChildren</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			c2,</span></span>
<span class="line"><span style="color:#E1E4E8;">			container,</span></span>
<span class="line"><span style="color:#E1E4E8;">			anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">			parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">			isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">			optimized,</span></span>
<span class="line"><span style="color:#E1E4E8;">			commonLength</span></span>
<span class="line"><span style="color:#E1E4E8;">		)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">patchUnkeyedChildren</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">c1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">c2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeArrayChildren</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">container</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RendererElement</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">anchor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RendererNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentComponent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ComponentInternalInstance</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentSuspense</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SuspenseBoundary</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">isSVG</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">optimized</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	c1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c1 </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EMPTY_ARR</span></span>
<span class="line"><span style="color:#24292E;">	c2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c2 </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EMPTY_ARR</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">oldLength</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c1.</span><span style="color:#005CC5;">length</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">newLength</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c2.</span><span style="color:#005CC5;">length</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取数据长度，取数组长度比较小的作为 commonLength，即循环的长度</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">commonLength</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">min</span><span style="color:#24292E;">(oldLength, newLength)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> commonLength; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取新节点的子项</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nextChild</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (c2[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> optimized</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cloneIfMounted</span><span style="color:#24292E;">(c2[i] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">normalizeVNode</span><span style="color:#24292E;">(c2[i]))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 调用 patch 方法</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			c1[i],</span></span>
<span class="line"><span style="color:#24292E;">			nextChild,</span></span>
<span class="line"><span style="color:#24292E;">			container,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			isSVG,</span></span>
<span class="line"><span style="color:#24292E;">			optimized</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (oldLength </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> newLength) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// remove old</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果老节点比新节点多，执行 unmountChildren 方法</span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#6A737D;">// 把 c1 多出来的一项移除掉（参见图示 1）</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">unmountChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			c1,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			commonLength</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// mount new</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果新节点比老节点多，执行 mountChildren 方法</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 把新节点插入到老节点中（参见图示二）</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">mountChildren</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			c2,</span></span>
<span class="line"><span style="color:#24292E;">			container,</span></span>
<span class="line"><span style="color:#24292E;">			anchor,</span></span>
<span class="line"><span style="color:#24292E;">			parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">			parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">			isSVG,</span></span>
<span class="line"><span style="color:#24292E;">			optimized,</span></span>
<span class="line"><span style="color:#24292E;">			commonLength</span></span>
<span class="line"><span style="color:#24292E;">		)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="图1" tabindex="-1">图1 <a class="header-anchor" href="#图1" aria-label="Permalink to &quot;图1&quot;">​</a></h5><p><img src="`+o+'" alt="图1"></p><h5 id="图2" tabindex="-1">图2 <a class="header-anchor" href="#图2" aria-label="Permalink to &quot;图2&quot;">​</a></h5><p><img src="'+t+`" alt="图2"></p><h4 id="patchkeyedchildren" tabindex="-1">patchKeyedChildren <a class="header-anchor" href="#patchkeyedchildren" aria-label="Permalink to &quot;patchKeyedChildren&quot;">​</a></h4><p>patch 过程中存在 key 的情况</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// can be all-keyed or mixed</span></span>
<span class="line"><span style="color:#6A737D;">// children 都有 key 或者 有些有 key，有些没 key</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">patchKeyedChildren</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">c1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">c2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNodeArrayChildren</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">container</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RendererElement</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentAnchor</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RendererNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentComponent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ComponentInternalInstance</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">parentSuspense</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SuspenseBoundary</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">isSVG</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FFAB70;">optimized</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">l2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c2.</span><span style="color:#79B8FF;">length</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> e1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c1.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// prev ending index</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> e2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> l2 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// next ending index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 1. sync from start</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b) c</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b) d e</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 从头开始比对</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c1[i]</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (c2[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cloneIfMounted</span><span style="color:#E1E4E8;">(c2[i] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">normalizeVNode</span><span style="color:#E1E4E8;">(c2[i]))</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">				n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">				n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">				container,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">				isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">				optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			)</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		i</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 2. sync from end</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// a (b c)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// d e (b c)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 尾开始比较</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c1[e1]</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (c2[e2] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cloneIfMounted</span><span style="color:#E1E4E8;">(c2[e2] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">normalizeVNode</span><span style="color:#E1E4E8;">(c2[e2]))</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">				n1,</span></span>
<span class="line"><span style="color:#E1E4E8;">				n2,</span></span>
<span class="line"><span style="color:#E1E4E8;">				container,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">				parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">				isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">				optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">			)</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		e1</span><span style="color:#F97583;">--</span></span>
<span class="line"><span style="color:#E1E4E8;">		e2</span><span style="color:#F97583;">--</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 3. common sequence + mount</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b) c</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// i = 2, e1 = 1, e2 = 2</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// c (a b)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// i = 0, e1 = -1, e2 = 0</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> e1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nextPos</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e2 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">anchor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextPos </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> l2 </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> (c2[nextPos] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">).el </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> parentAnchor</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// anchor 为 null =&gt; appendChild 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// anchor 不为 null =&gt; insertBefore 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					(c2[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cloneIfMounted</span><span style="color:#E1E4E8;">(c2[i] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">normalizeVNode</span><span style="color:#E1E4E8;">(c2[i])),</span></span>
<span class="line"><span style="color:#E1E4E8;">					container,</span></span>
<span class="line"><span style="color:#E1E4E8;">					anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">					isSVG</span></span>
<span class="line"><span style="color:#E1E4E8;">				)</span></span>
<span class="line"><span style="color:#E1E4E8;">				i</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 4. common sequence + unmount</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b) c</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (a b)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// i = 2, e1 = 2, e2 = 1</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// a (b c)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// (b c)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// i = 0, e1 = 0, e2 = -1</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> e2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">unmount</span><span style="color:#E1E4E8;">(c1[i], parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			i</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 5. unknown sequence</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// [i ... e1 + 1]: a b [c d e] f g</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// [i ... e2 + 1]: a b [e c d h] f g</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// i = 2, e1 = 4, e2 = 5</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">s1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i </span><span style="color:#6A737D;">// prev starting index</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">s2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i </span><span style="color:#6A737D;">// next starting index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 5.1 build key:index map for newChildren</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">keyToNewIndexMap</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 未知序列情况（详见图4）</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 构造新值的映射关系</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s2; i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e2; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nextChild</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (c2[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cloneIfMounted</span><span style="color:#E1E4E8;">(c2[i] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">normalizeVNode</span><span style="color:#E1E4E8;">(c2[i]))</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextChild.key </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> keyToNewIndexMap.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(nextChild.key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#9ECBFF;">\`Duplicate keys found during update:\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(nextChild.key),</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#9ECBFF;">\`Make sure keys are unique.\`</span></span>
<span class="line"><span style="color:#E1E4E8;">					)</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">				keyToNewIndexMap.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(nextChild.key, i)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 5.2 loop through old children left to be patched and try to patch</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// matching nodes &amp; remove nodes that are no longer present</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 循环旧孩子节点，尝试进行 patch</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> j</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> patched </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">toBePatched</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e2 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> s2 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> moved </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// used to track whether any node has moved</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> maxNewIndexSoFar </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// works as Map&lt;newIndex, oldIndex&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// Note that oldIndex is offset by +1</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// and oldIndex = 0 is a special value indicating the new node has</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// no corresponding old node.</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// used for determining longest stable subsequence</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">newIndexToOldIndexMap</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">(toBePatched)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> toBePatched; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) newIndexToOldIndexMap[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s1; i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e1; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">prevChild</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c1[i]</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 头与头相同，尾与尾相同，中间不同，执行卸载过程（详见图3），特殊情况</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (patched </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> toBePatched) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// all new children have been patched so this can only be a removal</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">unmount</span><span style="color:#E1E4E8;">(prevChild, parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> newIndex</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevChild.key </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				newIndex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> keyToNewIndexMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(prevChild.key)</span></span>
<span class="line"><span style="color:#E1E4E8;">			} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// key-less node, try to locate a key-less node of the same type</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s2; j </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> e2; j</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">						newIndexToOldIndexMap[j </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> s2] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(prevChild, c2[j] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">					) {</span></span>
<span class="line"><span style="color:#E1E4E8;">						newIndex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> j</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (newIndex </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">unmount</span><span style="color:#E1E4E8;">(prevChild, parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				newIndexToOldIndexMap[newIndex </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> s2] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (newIndex </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> maxNewIndexSoFar) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					maxNewIndexSoFar </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newIndex</span></span>
<span class="line"><span style="color:#E1E4E8;">				} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					moved </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">					prevChild,</span></span>
<span class="line"><span style="color:#E1E4E8;">					c2[newIndex] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					container,</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">					isSVG,</span></span>
<span class="line"><span style="color:#E1E4E8;">					optimized</span></span>
<span class="line"><span style="color:#E1E4E8;">				)</span></span>
<span class="line"><span style="color:#E1E4E8;">				patched</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 逻辑执行情况（详见图5），可以自己推导一下。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 5.3 move and mount</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// generate longest stable subsequence only when nodes have moved</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取最长的稳定的子序列</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">increasingNewIndexSequence</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> moved</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSequence</span><span style="color:#E1E4E8;">(newIndexToOldIndexMap)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EMPTY_ARR</span></span>
<span class="line"><span style="color:#E1E4E8;">		j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> increasingNewIndexSequence.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// looping backwards so that we can use last patched node as anchor</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从后向前循环，将已经 patch 好的节点作为锚点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 执行结果（详见图6）</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> toBePatched </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nextIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s2 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> i</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nextChild</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c2[nextIndex] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">anchor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">				nextIndex </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> l2 </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> (c2[nextIndex </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VNode</span><span style="color:#E1E4E8;">).el </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> parentAnchor</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (newIndexToOldIndexMap[i] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// mount new</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					nextChild,</span></span>
<span class="line"><span style="color:#E1E4E8;">					container,</span></span>
<span class="line"><span style="color:#E1E4E8;">					anchor,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">					parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">					isSVG</span></span>
<span class="line"><span style="color:#E1E4E8;">				)</span></span>
<span class="line"><span style="color:#E1E4E8;">			} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (moved) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// move if:</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// There is no stable subsequence (e.g. a reverse)</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// OR current node is not among the stable sequence</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (j </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> increasingNewIndexSequence[j]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">move</span><span style="color:#E1E4E8;">(nextChild, container, anchor, MoveType.</span><span style="color:#79B8FF;">REORDER</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">				} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					j</span><span style="color:#F97583;">--</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// can be all-keyed or mixed</span></span>
<span class="line"><span style="color:#6A737D;">// children 都有 key 或者 有些有 key，有些没 key</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">patchKeyedChildren</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">c1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">c2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNodeArrayChildren</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">container</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RendererElement</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentAnchor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RendererNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentComponent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ComponentInternalInstance</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">parentSuspense</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SuspenseBoundary</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">isSVG</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#E36209;">optimized</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">l2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c2.</span><span style="color:#005CC5;">length</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> e1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c1.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// prev ending index</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> e2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> l2 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// next ending index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 1. sync from start</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b) c</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b) d e</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 从头开始比对</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e2) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c1[i]</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (c2[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> optimized</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cloneIfMounted</span><span style="color:#24292E;">(c2[i] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">normalizeVNode</span><span style="color:#24292E;">(c2[i]))</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">				n1,</span></span>
<span class="line"><span style="color:#24292E;">				n2,</span></span>
<span class="line"><span style="color:#24292E;">				container,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">				parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">				isSVG,</span></span>
<span class="line"><span style="color:#24292E;">				optimized</span></span>
<span class="line"><span style="color:#24292E;">			)</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		i</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 2. sync from end</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// a (b c)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// d e (b c)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 尾开始比较</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e2) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c1[e1]</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (c2[e2] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> optimized</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cloneIfMounted</span><span style="color:#24292E;">(c2[e2] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">normalizeVNode</span><span style="color:#24292E;">(c2[e2]))</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">				n1,</span></span>
<span class="line"><span style="color:#24292E;">				n2,</span></span>
<span class="line"><span style="color:#24292E;">				container,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">				parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">				isSVG,</span></span>
<span class="line"><span style="color:#24292E;">				optimized</span></span>
<span class="line"><span style="color:#24292E;">			)</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		e1</span><span style="color:#D73A49;">--</span></span>
<span class="line"><span style="color:#24292E;">		e2</span><span style="color:#D73A49;">--</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 3. common sequence + mount</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b) c</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// i = 2, e1 = 1, e2 = 2</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// c (a b)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// i = 0, e1 = -1, e2 = 0</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> e1) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e2) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nextPos</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e2 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">anchor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextPos </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> l2 </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> (c2[nextPos] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">).el </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> parentAnchor</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e2) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// anchor 为 null =&gt; appendChild 方法</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// anchor 不为 null =&gt; insertBefore 方法</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					(c2[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> optimized</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cloneIfMounted</span><span style="color:#24292E;">(c2[i] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">normalizeVNode</span><span style="color:#24292E;">(c2[i])),</span></span>
<span class="line"><span style="color:#24292E;">					container,</span></span>
<span class="line"><span style="color:#24292E;">					anchor,</span></span>
<span class="line"><span style="color:#24292E;">					parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">					parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">					isSVG</span></span>
<span class="line"><span style="color:#24292E;">				)</span></span>
<span class="line"><span style="color:#24292E;">				i</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 4. common sequence + unmount</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b) c</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (a b)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// i = 2, e1 = 2, e2 = 1</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// a (b c)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// (b c)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// i = 0, e1 = 0, e2 = -1</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> e2) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e1) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">unmount</span><span style="color:#24292E;">(c1[i], parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			i</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 5. unknown sequence</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// [i ... e1 + 1]: a b [c d e] f g</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// [i ... e2 + 1]: a b [e c d h] f g</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// i = 2, e1 = 4, e2 = 5</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">s1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i </span><span style="color:#6A737D;">// prev starting index</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">s2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i </span><span style="color:#6A737D;">// next starting index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 5.1 build key:index map for newChildren</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">keyToNewIndexMap</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 未知序列情况（详见图4）</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 构造新值的映射关系</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s2; i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e2; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nextChild</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (c2[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> optimized</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cloneIfMounted</span><span style="color:#24292E;">(c2[i] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">normalizeVNode</span><span style="color:#24292E;">(c2[i]))</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextChild.key </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> keyToNewIndexMap.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(nextChild.key)) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#032F62;">\`Duplicate keys found during update:\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(nextChild.key),</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#032F62;">\`Make sure keys are unique.\`</span></span>
<span class="line"><span style="color:#24292E;">					)</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">				keyToNewIndexMap.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(nextChild.key, i)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 5.2 loop through old children left to be patched and try to patch</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// matching nodes &amp; remove nodes that are no longer present</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 循环旧孩子节点，尝试进行 patch</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> j</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> patched </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">toBePatched</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e2 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> s2 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> moved </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// used to track whether any node has moved</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> maxNewIndexSoFar </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// works as Map&lt;newIndex, oldIndex&gt;</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// Note that oldIndex is offset by +1</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// and oldIndex = 0 is a special value indicating the new node has</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// no corresponding old node.</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// used for determining longest stable subsequence</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">newIndexToOldIndexMap</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">(toBePatched)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> toBePatched; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) newIndexToOldIndexMap[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s1; i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e1; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">prevChild</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c1[i]</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 头与头相同，尾与尾相同，中间不同，执行卸载过程（详见图3），特殊情况</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (patched </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> toBePatched) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// all new children have been patched so this can only be a removal</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">unmount</span><span style="color:#24292E;">(prevChild, parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> newIndex</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevChild.key </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				newIndex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> keyToNewIndexMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(prevChild.key)</span></span>
<span class="line"><span style="color:#24292E;">			} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// key-less node, try to locate a key-less node of the same type</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s2; j </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> e2; j</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">						newIndexToOldIndexMap[j </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> s2] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(prevChild, c2[j] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">					) {</span></span>
<span class="line"><span style="color:#24292E;">						newIndex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> j</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (newIndex </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">unmount</span><span style="color:#24292E;">(prevChild, parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				newIndexToOldIndexMap[newIndex </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> s2] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (newIndex </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> maxNewIndexSoFar) {</span></span>
<span class="line"><span style="color:#24292E;">					maxNewIndexSoFar </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newIndex</span></span>
<span class="line"><span style="color:#24292E;">				} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					moved </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">					prevChild,</span></span>
<span class="line"><span style="color:#24292E;">					c2[newIndex] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					container,</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">					parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">					isSVG,</span></span>
<span class="line"><span style="color:#24292E;">					optimized</span></span>
<span class="line"><span style="color:#24292E;">				)</span></span>
<span class="line"><span style="color:#24292E;">				patched</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 逻辑执行情况（详见图5），可以自己推导一下。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 5.3 move and mount</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// generate longest stable subsequence only when nodes have moved</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取最长的稳定的子序列</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">increasingNewIndexSequence</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> moved</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSequence</span><span style="color:#24292E;">(newIndexToOldIndexMap)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EMPTY_ARR</span></span>
<span class="line"><span style="color:#24292E;">		j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> increasingNewIndexSequence.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// looping backwards so that we can use last patched node as anchor</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从后向前循环，将已经 patch 好的节点作为锚点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 执行结果（详见图6）</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> toBePatched </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nextIndex</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s2 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> i</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nextChild</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c2[nextIndex] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">anchor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">				nextIndex </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> l2 </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> (c2[nextIndex </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VNode</span><span style="color:#24292E;">).el </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> parentAnchor</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (newIndexToOldIndexMap[i] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// mount new</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					nextChild,</span></span>
<span class="line"><span style="color:#24292E;">					container,</span></span>
<span class="line"><span style="color:#24292E;">					anchor,</span></span>
<span class="line"><span style="color:#24292E;">					parentComponent,</span></span>
<span class="line"><span style="color:#24292E;">					parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">					isSVG</span></span>
<span class="line"><span style="color:#24292E;">				)</span></span>
<span class="line"><span style="color:#24292E;">			} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (moved) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// move if:</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// There is no stable subsequence (e.g. a reverse)</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// OR current node is not among the stable sequence</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (j </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> increasingNewIndexSequence[j]) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">move</span><span style="color:#24292E;">(nextChild, container, anchor, MoveType.</span><span style="color:#005CC5;">REORDER</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">				} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					j</span><span style="color:#D73A49;">--</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="图3" tabindex="-1">图3 <a class="header-anchor" href="#图3" aria-label="Permalink to &quot;图3&quot;">​</a></h5><p><img src="`+e+'" alt="图三"></p><h5 id="图4" tabindex="-1">图4 <a class="header-anchor" href="#图4" aria-label="Permalink to &quot;图4&quot;">​</a></h5><p><img src="'+c+'" alt="图4"></p><h5 id="图5" tabindex="-1">图5 <a class="header-anchor" href="#图5" aria-label="Permalink to &quot;图5&quot;">​</a></h5><p><img src="'+r+'" alt="图5"></p><h5 id="图6" tabindex="-1">图6 <a class="header-anchor" href="#图6" aria-label="Permalink to &quot;图6&quot;">​</a></h5><p><img src="'+E+`" alt="图6"></p><h4 id="getsequence" tabindex="-1">getSequence <a class="header-anchor" href="#getsequence" aria-label="Permalink to &quot;getSequence&quot;">​</a></h4><p>算法。计算最长稳定的子序列。</p><p>[5, 3, 4, 0] =&gt; [3, 4]</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// https://en.wikipedia.org/wiki/Longest_increasing_subsequence</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSequence</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">[])</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">[] {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i, j, u, v, c</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arrI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[i]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arrI </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result[result.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arr[j] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arrI) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        p[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> j</span></span>
<span class="line"><span style="color:#E1E4E8;">        result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(i)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      u </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">      v </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (u </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> v) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ((u </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> v) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arr[result[c]] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arrI) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          u </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          v </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arrI </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arr[result[u]]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (u </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          p[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result[u </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        result[u] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  u </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result.</span><span style="color:#79B8FF;">length</span></span>
<span class="line"><span style="color:#E1E4E8;">  v </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result[u </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (u</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    result[u] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> v</span></span>
<span class="line"><span style="color:#E1E4E8;">    v </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p[v]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// https://en.wikipedia.org/wiki/Longest_increasing_subsequence</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSequence</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">[])</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">[] {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">p</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i, j, u, v, c</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arrI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[i]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arrI </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result[result.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arr[j] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arrI) {</span></span>
<span class="line"><span style="color:#24292E;">        p[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> j</span></span>
<span class="line"><span style="color:#24292E;">        result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(i)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      u </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">      v </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (u </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> v) {</span></span>
<span class="line"><span style="color:#24292E;">        c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ((u </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> v) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arr[result[c]] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arrI) {</span></span>
<span class="line"><span style="color:#24292E;">          u </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          v </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arrI </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arr[result[u]]) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (u </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          p[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result[u </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        result[u] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  u </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result.</span><span style="color:#005CC5;">length</span></span>
<span class="line"><span style="color:#24292E;">  v </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result[u </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (u</span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    result[u] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> v</span></span>
<span class="line"><span style="color:#24292E;">    v </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p[v]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,38),F=[i];function d(A,h,D,C,m,u){return n(),a("div",null,F)}const f=s(y,[["render",d]]);export{g as __pageData,f as default};
