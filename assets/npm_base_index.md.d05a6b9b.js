import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.9bc09dc8.js";const h=JSON.parse('{"title":"NPM","description":"","frontmatter":{},"headers":[],"relativePath":"npm/base/index.md","filePath":"npm/base/index.md"}'),l={name:"npm/base/index.md"},e=p(`<h1 id="npm" tabindex="-1">NPM <a class="header-anchor" href="#npm" aria-label="Permalink to &quot;NPM&quot;">​</a></h1><h2 id="node模块、常用命令、semver规范" tabindex="-1">Node模块、常用命令、SEMVER规范 <a class="header-anchor" href="#node模块、常用命令、semver规范" aria-label="Permalink to &quot;Node模块、常用命令、SEMVER规范&quot;">​</a></h2><p>Node模块（mode_modules）</p><p>Node环境：一个在Node环境下开发的项目，模块可能是一个库、框架或者是项目依赖、甚至是一个项目，Node环境就是让这些模块成功运行起来的服务提供方。</p><p>package.json：描述node模块的文件，包含多项对Node模块的说明与配置。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm init </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm init </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm init </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm set init.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;yueluo&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm install </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> uninstall</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm install xxx@</span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm rebuild xxx </span><span style="color:#6A737D;">// 重新构建模块</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm update xxxx or npm update </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">g xxx </span><span style="color:#6A737D;">// 更新模块</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npm search xxx </span><span style="color:#6A737D;">// 搜索模块</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm init </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm init </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm init </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm set init.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;yueluo&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm install </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> uninstall</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm install xxx@</span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm rebuild xxx </span><span style="color:#6A737D;">// 重新构建模块</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm update xxxx or npm update </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">g xxx </span><span style="color:#6A737D;">// 更新模块</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npm search xxx </span><span style="color:#6A737D;">// 搜索模块</span></span></code></pre></div><pre><code>semver 规范 - version
Semantic Versioning：语义化规范
种类：固定版本、范围版本

version：x.x.x.x（主版本.次版本.修订版本-日期版本_希腊字母）

MAJOR.MINOR.PATCH-alphabel
</code></pre><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.3.2-20200507_alpha</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.3.2-20200507_alpha</span></span></code></pre></div><ul><li>主版本：多个功能、API、UI等做了大范围升级且一般不向后（向下）兼容。</li><li>次版本：功能或API新增，UI增强，向后兼容。</li><li>修订版：问题（Bug）修复、少量功能升级补丁且向下兼容</li></ul><p>主板本号升级，次版本与修订版本号归0，次版本号升级，修订版本号归0。</p><p>先行版本号（Pre-release version）</p><p>Base：仅实现项目的基本架构 Alpha：初级版本、测试第一阶段，实现功能，修复严重BUG，内部开发人员交流版本</p><pre><code>Beta：中级测试、测试第二阶段，实现UI，进一步修改功能性BUG，可发布测试

RC（Release Candidate）：最终测试版，候选版本，可能会出现一些局部的小BUG，
可发布RC2进行进一步BUG修改，近似于正式版本。

Release：正式版，交付版本，标准版（stable）

release x 1.0.0
release x 1.0.0_stable（web开发不常用）  
</code></pre><p>依赖版本号</p><pre><code>^1.2.0 -&gt; 主版本固定（1） 

主版本号1固定，且遵循不小于次版本号，如次版本号相等，则需不小于修订版本号。

注意：npm install 会安装主版本号固定下的最新版本

^1.3.0 ^1.4.0 等等


~：~1.2.0 主版本号1固定，次版本号2固定，且遵循不小于修订版本号。

~1.2.5 -&gt; 1.2.6


&gt;、&lt;、=、&gt;=、&lt;=、-：版本范围

&gt; 3.2   &lt; 2.2   2.0.3-2.1.0        
</code></pre><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">||</span><span style="color:#E1E4E8;">：或选择</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">^</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">3.1</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">3.5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">||</span><span style="color:#24292E;">：或选择</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">^</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">3.1</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">3.5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">...</span></span></code></pre></div><pre><code>x、*：通配

4.x：对应主版本号4的所有版本号，次版本号、修订版本号不定
*：所有版本号
</code></pre><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">0.1.0_base</span></span>
<span class="line"><span style="color:#e1e4e8;">0.1.1（0.1.1_alpha web开发可以不添加alpha）</span></span>
<span class="line"><span style="color:#e1e4e8;">0.1.2</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">0.1.9  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">version 0.1.x</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">0.1.0_base</span></span>
<span class="line"><span style="color:#24292e;">0.1.1（0.1.1_alpha web开发可以不添加alpha）</span></span>
<span class="line"><span style="color:#24292e;">0.1.2</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">0.1.9  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">version 0.1.x</span></span></code></pre></div><pre><code>新增 功能1
新增 功能2
</code></pre><p>version 0.1.9</p><pre><code>修复 xxx
修复 xxx
</code></pre><p>version 0.2.1</p><pre><code>新增 xxx
修复 xxx
</code></pre><h2 id="package-lock、license-协议" tabindex="-1">package-lock、License 协议 <a class="header-anchor" href="#package-lock、license-协议" aria-label="Permalink to &quot;package-lock、License 协议&quot;">​</a></h2><h3 id="package-lock-json" tabindex="-1">package-lock.json <a class="header-anchor" href="#package-lock-json" aria-label="Permalink to &quot;package-lock.json&quot;">​</a></h3><p>保存当前安装依赖的来源及版本号</p><p>版本变动规则：</p><p>install 指定版本：自动更新 package-lock.json 对应的版本</p><p>install 范围版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">版本小于等于 package-lock.json 中对应的版本时，安装 package-lock.json 中的版本</span></span>
<span class="line"><span style="color:#e1e4e8;">版本大于 package-lock.json 中的对应的版本时，安装范围版本号中最高的版本，并更新 package-lock.json 中对应的版本</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">npm i babel-loader@7.1.1 -&gt; 自动更新 package-lock.json -&gt; 安装7.1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">babel-loader：^7.1.1 </span></span>
<span class="line"><span style="color:#e1e4e8;">package-lock.json 7.3.1 -&gt; 安装7.3.1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">babel-loader：^7.5.1  </span></span>
<span class="line"><span style="color:#e1e4e8;">package-lock.json 7.3.1 -&gt; 安装主版本固定的最高版本，比如 7.8.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">版本小于等于 package-lock.json 中对应的版本时，安装 package-lock.json 中的版本</span></span>
<span class="line"><span style="color:#24292e;">版本大于 package-lock.json 中的对应的版本时，安装范围版本号中最高的版本，并更新 package-lock.json 中对应的版本</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">npm i babel-loader@7.1.1 -&gt; 自动更新 package-lock.json -&gt; 安装7.1.1</span></span>
<span class="line"><span style="color:#24292e;">babel-loader：^7.1.1 </span></span>
<span class="line"><span style="color:#24292e;">package-lock.json 7.3.1 -&gt; 安装7.3.1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">babel-loader：^7.5.1  </span></span>
<span class="line"><span style="color:#24292e;">package-lock.json 7.3.1 -&gt; 安装主版本固定的最高版本，比如 7.8.1</span></span></code></pre></div><h3 id="开源协议" tabindex="-1">开源协议 <a class="header-anchor" href="#开源协议" aria-label="Permalink to &quot;开源协议&quot;">​</a></h3><p>开源协议：说明授权他人使用被开源的项目有哪些权利</p><p>协议查询：<a href="https://opensource.org/licenses/alphabetical" target="_blank" rel="noreferrer">https://opensource.org/licenses/alphabetical</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">license</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;license&quot;：&quot;MIT&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;license&quot;：&quot;(MIT or GPL)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;license&quot;：&quot;SEE LINCENSE IN LICENSE_xxx.txt&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;license&quot;：&quot;UNLICENSED&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">license</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;license&quot;：&quot;MIT&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;license&quot;：&quot;(MIT or GPL)&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;license&quot;：&quot;SEE LINCENSE IN LICENSE_xxx.txt&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;license&quot;：&quot;UNLICENSED&quot;</span></span></code></pre></div><h4 id="bsd协议" tabindex="-1">BSD协议 <a class="header-anchor" href="#bsd协议" aria-label="Permalink to &quot;BSD协议&quot;">​</a></h4><p>Berkeley SoftWare Distrubution：伯克利软件发行版</p><p>自由使用、修改源码、修改后开源或者再发布</p><p>三大条件：</p><ul><li>再发布的产品包含源码，则必须携带原来的BSD协议</li><li>再发布二进制类库或软件，其内部必须携带原来的BSD协议</li><li>禁止用原源码作业或机构、原产品名称做市场推广</li></ul><h4 id="apache协议" tabindex="-1">Apache协议 <a class="header-anchor" href="#apache协议" aria-label="Permalink to &quot;Apache协议&quot;">​</a></h4><p>Apache Licence 2.0：Apache 开源协议2.0</p><p>自由使用、修改源码、修改后开源或再发布（商业软件）</p><p>三大条件：</p><ul><li>修改源码，必须在源码所在文件中进行说明</li><li>修改或拓展的代码中，必须携带原协议、商标、专利声明和作者要求包含的说明信息</li><li>如果使用源码后再发布的产品中包含说明文件，该说明文件必须携带Apache License且不能更改</li></ul><h4 id="gpl协议" tabindex="-1">GPL协议 <a class="header-anchor" href="#gpl协议" aria-label="Permalink to &quot;GPL协议&quot;">​</a></h4><p>GPL：GNU Genaral Public License（Linux）：通用公共许可证</p><p>GNU 一种自由的操作系统。</p><p>自由使用、修改、拓展源码、修改后开源或再发布</p><p>一大条件：必须开源免费（不可以商业化）</p><h4 id="lgpl协议" tabindex="-1">LGPL协议 <a class="header-anchor" href="#lgpl协议" aria-label="Permalink to &quot;LGPL协议&quot;">​</a></h4><p>LGPL：GUN Lesser General Public License：宽通用公共许可证</p><p>针对类库，自由引用，无需开源，可发布与销售</p><h4 id="mit协议" tabindex="-1">MIT协议 <a class="header-anchor" href="#mit协议" aria-label="Permalink to &quot;MIT协议&quot;">​</a></h4><p>MIT：Massachusetts Institute Of Technology （麻省理工学院）</p><p>自由使用、复制、修改、合并、发布、再授权、销售 可修改授权条款</p><p>一大条件：再发布的产品必须版权声明和许可声明</p><h4 id="mozilla协议" tabindex="-1">Mozilla协议 <a class="header-anchor" href="#mozilla协议" aria-label="Permalink to &quot;Mozilla协议&quot;">​</a></h4><p>MPL：The Mozilla Public License</p><p>自由使用、修改、发布</p><p>三大条件：</p><ul><li><p>修改源码，必须开源</p></li><li><p>新增代码不可使用原许可</p></li><li><p>修改代码，必须提供说明文档</p></li></ul><h4 id="mpl-the-mozilla-public-license" tabindex="-1">MPL：The Mozilla Public License <a class="header-anchor" href="#mpl-the-mozilla-public-license" aria-label="Permalink to &quot;MPL：The Mozilla Public License&quot;">​</a></h4><p>自由使用、修改、发布</p><p>三大条件：</p><ul><li><p>修改源码，必须开源</p></li><li><p>新增代码不可使用原许可</p></li><li><p>修改代码，必须提供说明文档</p></li></ul><h4 id="isc协议" tabindex="-1">ISC协议 <a class="header-anchor" href="#isc协议" aria-label="Permalink to &quot;ISC协议&quot;">​</a></h4><p>ISC：Internal Systems Consortium （互联网系统协会）</p><p>自由使用、修改可闭源、无需版权说明</p><p>一大条件：商用后不可使用作者名字宣传</p><h2 id="package-json-常用配置项详解" tabindex="-1">package.json 常用配置项详解 <a class="header-anchor" href="#package-json-常用配置项详解" aria-label="Permalink to &quot;package.json 常用配置项详解&quot;">​</a></h2><p>配置项</p><ol><li><p>name 项目名称（英文）</p><pre><code> 禁止使用JS，NODE等关键词
 
 禁止使用 . 或 _ 开头
 
 小写字母
 
 不要用空格
 
 不要太长
</code></pre><p>html-webpack-plugin</p></li><li><p>keywords：<code>Array&lt;string&gt;</code>，字符串数组</p></li><li><p>description：String，字符串</p></li><li><p>homepage：URL（不带协议）</p><p>www.yueluo.club</p></li><li><p>bugs：Object</p><p>url：bug 提交与追踪地址 email：bug 提交的邮箱地址</p><p>{ &quot;url&quot;: &quot;issues.jsplusplus.com&quot;, &quot;email&quot;: &quot;<a href="mailto:1445367137@qq.com" target="_blank" rel="noreferrer">1445367137@qq.com</a>&quot; }</p></li><li><p>author contributors</p><p>author：Object 作者信息</p><p>name：作者名称 mail：邮箱地址 url：作者网站首页地址</p><p>author：yueluo <a href="mailto:yueluo@qq.com" target="_blank" rel="noreferrer">yueluo@qq.com</a> <a href="http://www.yueluo.club" target="_blank" rel="noreferrer">http://www.yueluo.club</a></p><p>conntributors：Array 一组贡献者（单个元素同author配置）</p></li><li><p>main</p><p>main 入口文件</p><p>编写的模块需要直接引用，需要设置入口文件</p><p>案例：</p><p>如果编写一个 webpack plugin -test-webpack-plugin 入口文件在 dist/app.js 当前 test-webpack-plugin 文件夹下的 package.json 内要设置 main: &#39;dist/app.js&#39;</p><p>项目模块中使用该 plugin 时</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">TestWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reuqire</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test-webpack-plugin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 不用写引用路径</span></span>
<span class="line"><span style="color:#B392F0;">reuqire</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test-webpack-plugin/dist/app.js&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">TestWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reuqire</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test-webpack-plugin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 不用写引用路径</span></span>
<span class="line"><span style="color:#6F42C1;">reuqire</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test-webpack-plugin/dist/app.js&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div></li><li><p>repository</p><p>repository：Object 线上仓库</p><p>type：&#39;git or svn&#39; url：&#39;仓库线上地址&#39;</p></li><li><p>private</p><p>private：Boolean 是否私有</p><p>true npm 无法发布</p></li></ol><h2 id="scripts-脚本命令以及使用技巧" tabindex="-1">scripts 脚本命令以及使用技巧 <a class="header-anchor" href="#scripts-脚本命令以及使用技巧" aria-label="Permalink to &quot;scripts 脚本命令以及使用技巧&quot;">​</a></h2><ol start="10"><li>scripts</li></ol><p>scrips：Object 定义脚本命令，任何可以shell运行的命令都可以被定义</p><p>shell：</p><pre><code>c 语言编写的程序，Linux上的一种命令语言。

shell脚本（shell script），shell 语言编写的脚本程序。
</code></pre><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;remove&quot;: &quot;rm -rf index.txt&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;remove&quot;: &quot;rm -rf index.txt&quot;</span></span></code></pre></div><p>通配符</p><pre><code>&quot;remove&quot;: &quot;rm -rf **/*.txt&quot; 删除根目录文件夹下的所有后缀名为 .txt 的文件

&quot;remove&quot;: &quot;rm -rf **/*.txt *.txt&quot; 删除根目录及其子目录下所有名为 .txt 的文件

比如临时文件等。
</code></pre><p>参数</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;webpack --config wepack.config.js &amp;&amp; node upload_source.js&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// --config 就是配置的参数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;webpack --config wepack.config.js &amp;&amp; node upload_source.js&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// --config 就是配置的参数</span></span></code></pre></div><p>&amp; 和 &amp;&amp;</p><pre><code>&amp;：同时执行
&amp;&amp;：顺次执行
</code></pre><p>默认值</p><pre><code>没有定义脚本命令也可以使用

npm start：node server.js
  
npm install：node-gyp rebuild
</code></pre><p>钩子</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;prebuild&quot;: &quot;echo before&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;build&quot;: &quot;echo build&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;postbuild&quot;: &quot;echo after build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">npm run build -&gt; 自动在之前执行 prebuild，之后再执行 postbuild</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">prepublish，postpublish</span></span>
<span class="line"><span style="color:#e1e4e8;">preinstall，postinstall</span></span>
<span class="line"><span style="color:#e1e4e8;">preuninstall，postuninstall</span></span>
<span class="line"><span style="color:#e1e4e8;">preversion，postversion</span></span>
<span class="line"><span style="color:#e1e4e8;">pretest，posttest</span></span>
<span class="line"><span style="color:#e1e4e8;">prestop，poststop</span></span>
<span class="line"><span style="color:#e1e4e8;">prestart，poststart</span></span>
<span class="line"><span style="color:#e1e4e8;">prerestart，postrestart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;prebuild&quot;: &quot;echo before&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;build&quot;: &quot;echo build&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;postbuild&quot;: &quot;echo after build&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">npm run build -&gt; 自动在之前执行 prebuild，之后再执行 postbuild</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">prepublish，postpublish</span></span>
<span class="line"><span style="color:#24292e;">preinstall，postinstall</span></span>
<span class="line"><span style="color:#24292e;">preuninstall，postuninstall</span></span>
<span class="line"><span style="color:#24292e;">preversion，postversion</span></span>
<span class="line"><span style="color:#24292e;">pretest，posttest</span></span>
<span class="line"><span style="color:#24292e;">prestop，poststop</span></span>
<span class="line"><span style="color:#24292e;">prestart，poststart</span></span>
<span class="line"><span style="color:#24292e;">prerestart，postrestart</span></span></code></pre></div><p>简写</p><pre><code>npm start = npm run start
npm stop = npm run stop
npm test = npm run test

npm restart = pm run stop &amp;&amp; npm run restart &amp;&amp; npm run start（可以在命令前后增加事件钩子）
</code></pre><p>取值</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">p<wbr>rocess.env.npm_package_name</span></span>
<span class="line"><span style="color:#E1E4E8;">p<wbr>rocess.env.npm_package_repository_type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;server&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;echo $npm_package_server&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">案例：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;server&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">&quot;url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;http://ww.yueluo.club&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">&quot;port&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3000&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">package.json 取值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;port&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;echo $npm_package_server_port&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">server.js 文件取值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">p<wbr>rocess.env.npm_package_server_port; </span><span style="color:#6A737D;">// 3000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">p<wbr>rocess.env.npm_package_name</span></span>
<span class="line"><span style="color:#24292E;">p<wbr>rocess.env.npm_package_repository_type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;server&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;echo $npm_package_server&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">案例：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;server&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#005CC5;">&quot;url&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;http://ww.yueluo.club&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#005CC5;">&quot;port&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3000&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">package.json 取值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;port&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;echo $npm_package_server_port&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">server.js 文件取值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">p<wbr>rocess.env.npm_package_server_port; </span><span style="color:#6A737D;">// 3000</span></span></code></pre></div><h2 id="dependencies依赖分类" tabindex="-1">dependencies依赖分类 <a class="header-anchor" href="#dependencies依赖分类" aria-label="Permalink to &quot;dependencies依赖分类&quot;">​</a></h2><p>dependencies：依赖模块</p><p>devDependencies：开发环境下，用于转换、压缩、混淆、替换代码等协助最终打包成线上版本所需的依赖</p><pre><code>npm i xxx --save-dev    npm i xxx -D
</code></pre><p>dependencies：线上（生产）环境中，项目、程序、模块运行必备的依赖。</p><pre><code>npm i xxx --save    npm i xxx -S
</code></pre><p>npm i xxx 安装当前命令行所在目录、安装在dependenices</p><p>npm i xxx -g 全局安装</p><p>peerDependencies</p><p>peerDependencies：同辈依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test 项目中依赖 a、b 模块，a 模块也依赖 b 模块，如何解决不重复安装 b 模块。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">解决方法：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">a 模块中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;peerDependencies&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;b&quot;: &quot;^1.0.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">npm3 不强制安装 peerDependencies</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">警告：xxx@1.1.1 reuqires a peer of yyy@2.2.2 but none is installed，提示手动安装模块。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test 项目中依赖 a、b 模块，a 模块也依赖 b 模块，如何解决不重复安装 b 模块。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">解决方法：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">a 模块中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;peerDependencies&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">&quot;b&quot;: &quot;^1.0.0&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">npm3 不强制安装 peerDependencies</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">警告：xxx@1.1.1 reuqires a peer of yyy@2.2.2 but none is installed，提示手动安装模块。</span></span></code></pre></div><h2 id="npm发布、版本管理、废弃与删除" tabindex="-1">npm发布、版本管理、废弃与删除 <a class="header-anchor" href="#npm发布、版本管理、废弃与删除" aria-label="Permalink to &quot;npm发布、版本管理、废弃与删除&quot;">​</a></h2><p>NPM是随同NodeJs一起安装的包管理工具。</p><p>允许用户从NPM服务器下载别人编写的第三方包到本地使用。 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。 允许用户将自己编写的包或命令行程序上传到服务器供别人使用。</p><p>npm -v</p><p>注册NPM</p><p><a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">https://www.npmjs.com/</a></p><ol><li>sign up</li><li>填写正确的邮箱</li><li>到邮箱内验证邮箱</li><li>跳转到NPM首页</li></ol><p>nrm 操作</p><p>npm i nrm -g npm 仓库管理软件，快速切换npm仓库</p><p>nrm ls 列出所有仓库</p><p>nrm add cnpm <a href="https://registry.npm.Taobao.org" target="_blank" rel="noreferrer">https://registry.npm.Taobao.org</a> 增加仓库</p><p>nrm use npm 切换仓库</p><p>npm 发布</p><ol><li>npm adduser 增加用户 ，如果发布报错，先 npm login</li><li>填写注册 NPM 时填写的用户名、密码、邮箱地址</li><li>显示 logged is as yueluo on <a href="https://registry.npmjs.org" target="_blank" rel="noreferrer">https://registry.npmjs.org</a> 增加成功</li><li>查看 npm 仓库 nrm ls 前面有 * 的就是当前仓库</li><li>切换仓库 nrm use npm 切换到 npm 仓库</li><li>npm publish</li><li>发布成功</li></ol><p>scoped 包发布</p><p>package.json 的 name @yueluo/my-module</p><p>如果需要域的服务，是要收费的。</p><p>如果不想被收费，可以使用 npm publish --access public 。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">classe1</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">yueluo</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;月落&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">classe2</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">yueluo</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;月落&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">classe1</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">yueluo</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;月落&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">classe2</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">yueluo</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;月落&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>babel-loader xiaoming babel-loader xiaoli</p><p>scoped</p><pre><code>@xiaoming/babel-loader
@xiaoli/babel-loader
</code></pre><p>版本迭代</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm version </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">major </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> minor </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> path</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> 增加版本</span></span>
<span class="line"><span style="color:#E1E4E8;">npm publish 再次发布</span></span>
<span class="line"><span style="color:#E1E4E8;">npm view yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first versions 查看版本迭代情况</span></span>
<span class="line"><span style="color:#E1E4E8;">npm up yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first 切换到 npm 下 yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first 项目下</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm version </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">major </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> minor </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> path</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> 增加版本</span></span>
<span class="line"><span style="color:#24292E;">npm publish 再次发布</span></span>
<span class="line"><span style="color:#24292E;">npm view yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first versions 查看版本迭代情况</span></span>
<span class="line"><span style="color:#24292E;">npm up yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first 切换到 npm 下 yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first 项目下</span></span></code></pre></div><p>node index.js</p><p>废弃包版本</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm deprecate yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first@</span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;deprecate fircdst version&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">npm view yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first versions 无变化</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">安装 </span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> （npm view yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first versions）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">提示：npm </span><span style="color:#79B8FF;">WARN</span><span style="color:#E1E4E8;"> deprecated yueluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first@</span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">: deprecate first version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm deprecate yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first@</span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;deprecate fircdst version&#39;</span></span>
<span class="line"><span style="color:#24292E;">npm view yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first versions 无变化</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">安装 </span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> （npm view yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first versions）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">提示：npm </span><span style="color:#005CC5;">WARN</span><span style="color:#24292E;"> deprecated yueluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first@</span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">: deprecate first version</span></span></code></pre></div><p>删除包</p><p>包删除 24 小时后可重发 发布 72 小时内的包可删除</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm unpublish yeuluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first@</span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">force</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm unpublish yeuluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first@</span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">force</span></span></code></pre></div><p>删除包</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm unpublish yeuluo</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">first </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">force</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm unpublish yeuluo</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">first </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">force</span></span></code></pre></div><h2 id="编写-markdown-文档" tabindex="-1">编写 markdown 文档 <a class="header-anchor" href="#编写-markdown-文档" aria-label="Permalink to &quot;编写 markdown 文档&quot;">​</a></h2><p>markdown</p><p>纯文本格式标记语言，本质上跟HTML一致，没有区别。</p><p>用简单的书写方式确定一批文本显示格式。</p><p>后缀名：.md</p><p>vscode Markdown Preview Enhanced</p><p>标题</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># Thi is a title for markdon</span></span>
<span class="line"><span style="color:#E1E4E8;">## Thi is a title for markdon</span></span>
<span class="line"><span style="color:#E1E4E8;">### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#E1E4E8;">#### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#E1E4E8;">##### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#E1E4E8;">###### Thi is a title for markdon</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># Thi is a title for markdon</span></span>
<span class="line"><span style="color:#24292E;">## Thi is a title for markdon</span></span>
<span class="line"><span style="color:#24292E;">### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#24292E;">#### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#24292E;">##### Thi is a title for markdon</span></span>
<span class="line"><span style="color:#24292E;">###### Thi is a title for markdon</span></span></code></pre></div><p>文本</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">This is a content for markdown.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">**This is a content. 加粗**</span></span>
<span class="line"><span style="color:#E1E4E8;">*This is a content. 斜体*</span></span>
<span class="line"><span style="color:#E1E4E8;">***This is a content. 加粗斜体***</span></span>
<span class="line"><span style="color:#E1E4E8;">~~This is a content. 删除线~~</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text-decoration: underline&quot;</span><span style="color:#E1E4E8;">&gt;This is a content 下划线&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">This is a content for markdown.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">**This is a content. 加粗**</span></span>
<span class="line"><span style="color:#24292E;">*This is a content. 斜体*</span></span>
<span class="line"><span style="color:#24292E;">***This is a content. 加粗斜体***</span></span>
<span class="line"><span style="color:#24292E;">~~This is a content. 删除线~~</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text-decoration: underline&quot;</span><span style="color:#24292E;">&gt;This is a content 下划线&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>引用</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&gt; This is a content.</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt; &gt; This is a content.</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt; &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt; &gt; &gt; This is a content.</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt; &gt; &gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&gt; This is a content.</span></span>
<span class="line"><span style="color:#24292E;">&gt; &gt; This is a content.</span></span>
<span class="line"><span style="color:#24292E;">&gt; &gt;</span></span>
<span class="line"><span style="color:#24292E;">&gt; &gt; &gt; This is a content.</span></span>
<span class="line"><span style="color:#24292E;">&gt; &gt; &gt;</span></span></code></pre></div><p>分割线</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">---</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">---</span></span></code></pre></div><hr><p>图片</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">![yueluo](http://data.yueluo.club/icon/icon.png &quot;yueluo&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">![yueluo](http://data.yueluo.club/icon/icon.png &quot;yueluo&quot;)</span></span></code></pre></div><p>超链接</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[yueluo](http://www.yueluo.club &quot;yueluo&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[yueluo](http://www.yueluo.club &quot;yueluo&quot;)</span></span></code></pre></div><p>无序列表</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">无序 - + *</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">- list item</span></span>
<span class="line"><span style="color:#E1E4E8;">* list item</span></span>
<span class="line"><span style="color:#E1E4E8;">+ list item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">无序 - + *</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">- list item</span></span>
<span class="line"><span style="color:#24292E;">* list item</span></span>
<span class="line"><span style="color:#24292E;">+ list item</span></span></code></pre></div><p>有序列表</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">1. list item</span></span>
<span class="line"><span style="color:#E1E4E8;">2. list item</span></span>
<span class="line"><span style="color:#E1E4E8;">3. list item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">1. list item</span></span>
<span class="line"><span style="color:#24292E;">2. list item</span></span>
<span class="line"><span style="color:#24292E;">3. list item</span></span></code></pre></div><p>列表嵌套</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  - list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      + sub item</span></span>
<span class="line"><span style="color:#E1E4E8;">      + sub item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  * list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    1. list item</span></span>
<span class="line"><span style="color:#E1E4E8;">    2. list item</span></span>
<span class="line"><span style="color:#E1E4E8;">    3. list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  + list item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">this is a list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  - list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      + sub item</span></span>
<span class="line"><span style="color:#24292E;">      + sub item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  * list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    1. list item</span></span>
<span class="line"><span style="color:#24292E;">    2. list item</span></span>
<span class="line"><span style="color:#24292E;">    3. list item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  + list item</span></span></code></pre></div><p>表格</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">th|th|th|th</span></span>
<span class="line"><span style="color:#E1E4E8;">:-:|:-:|:-:|:-:</span></span>
<span class="line"><span style="color:#E1E4E8;">td|td|td|td</span></span>
<span class="line"><span style="color:#E1E4E8;">td|td|td|td</span></span>
<span class="line"><span style="color:#E1E4E8;">td|td|td|td</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">th|th|th|th</span></span>
<span class="line"><span style="color:#24292E;">:-:|:-:|:-:|:-:</span></span>
<span class="line"><span style="color:#24292E;">td|td|td|td</span></span>
<span class="line"><span style="color:#24292E;">td|td|td|td</span></span>
<span class="line"><span style="color:#24292E;">td|td|td|td</span></span></code></pre></div><p>可以使用 “ : ” 设置文字居左、居右显示</p><p>代码块</p><p>单行 <code>console.log(&#39;this is a line code&#39;);</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">#app</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">700</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">#app</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">700</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;This is a title&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;This is content&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;This is a title&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;This is content&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>流程图 <code>flow content</code></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cond1=&gt;condition: 修改源码后闭源？</span></span>
<span class="line"><span style="color:#E1E4E8;">cond2=&gt;condition: 版权说明？</span></span>
<span class="line"><span style="color:#E1E4E8;">cond3=&gt;condition: 商用后用作者名字宣传？</span></span>
<span class="line"><span style="color:#E1E4E8;">cond4=&gt;condition: 新增代码采用同样许可？</span></span>
<span class="line"><span style="color:#E1E4E8;">cond5=&gt;condition: 修改源码提供文档说明？</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">apache=&gt;end: Apache</span></span>
<span class="line"><span style="color:#E1E4E8;">mit=&gt;end: MIT</span></span>
<span class="line"><span style="color:#E1E4E8;">isc_bsd=&gt;end: ISC、BSD</span></span>
<span class="line"><span style="color:#E1E4E8;">gpl=&gt;end: GPL</span></span>
<span class="line"><span style="color:#E1E4E8;">mozilla=&gt;end: Mozilla</span></span>
<span class="line"><span style="color:#E1E4E8;">lgpl=&gt;end: LGPL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">cond1(yes)-&gt;cond2</span></span>
<span class="line"><span style="color:#E1E4E8;">cond1(no)-&gt;cond4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">cond2(yes)-&gt;apache</span></span>
<span class="line"><span style="color:#E1E4E8;">cond2(no)-&gt;cond3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">cond3(yes)-&gt;mit</span></span>
<span class="line"><span style="color:#E1E4E8;">cond3(no)-&gt;isc_bsd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">cond4(yes)-&gt;gpl</span></span>
<span class="line"><span style="color:#E1E4E8;">cond4(no)-&gt;cond5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">cond5(yes)-&gt;mozilla</span></span>
<span class="line"><span style="color:#E1E4E8;">cond5(no)-&gt;lgpl</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cond1=&gt;condition: 修改源码后闭源？</span></span>
<span class="line"><span style="color:#24292E;">cond2=&gt;condition: 版权说明？</span></span>
<span class="line"><span style="color:#24292E;">cond3=&gt;condition: 商用后用作者名字宣传？</span></span>
<span class="line"><span style="color:#24292E;">cond4=&gt;condition: 新增代码采用同样许可？</span></span>
<span class="line"><span style="color:#24292E;">cond5=&gt;condition: 修改源码提供文档说明？</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">apache=&gt;end: Apache</span></span>
<span class="line"><span style="color:#24292E;">mit=&gt;end: MIT</span></span>
<span class="line"><span style="color:#24292E;">isc_bsd=&gt;end: ISC、BSD</span></span>
<span class="line"><span style="color:#24292E;">gpl=&gt;end: GPL</span></span>
<span class="line"><span style="color:#24292E;">mozilla=&gt;end: Mozilla</span></span>
<span class="line"><span style="color:#24292E;">lgpl=&gt;end: LGPL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">cond1(yes)-&gt;cond2</span></span>
<span class="line"><span style="color:#24292E;">cond1(no)-&gt;cond4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">cond2(yes)-&gt;apache</span></span>
<span class="line"><span style="color:#24292E;">cond2(no)-&gt;cond3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">cond3(yes)-&gt;mit</span></span>
<span class="line"><span style="color:#24292E;">cond3(no)-&gt;isc_bsd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">cond4(yes)-&gt;gpl</span></span>
<span class="line"><span style="color:#24292E;">cond4(no)-&gt;cond5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">cond5(yes)-&gt;mozilla</span></span>
<span class="line"><span style="color:#24292E;">cond5(no)-&gt;lgpl</span></span></code></pre></div>`,170),o=[e];function t(c,i,r,y,E,d){return n(),a("div",null,o)}const g=s(l,[["render",t]]);export{h as __pageData,g as default};
