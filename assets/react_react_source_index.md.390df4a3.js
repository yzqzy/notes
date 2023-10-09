import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.9bc09dc8.js";const F=JSON.parse('{"title":"React 源码","description":"","frontmatter":{},"headers":[],"relativePath":"react/react_source/index.md","filePath":"react/react_source/index.md"}'),l={name:"react/react_source/index.md"},o=p(`<h1 id="react-源码" tabindex="-1">React 源码 <a class="header-anchor" href="#react-源码" aria-label="Permalink to &quot;React 源码&quot;">​</a></h1><h2 id="搭建-react-源码本地调试环境" tabindex="-1">搭建 React 源码本地调试环境 <a class="header-anchor" href="#搭建-react-源码本地调试环境" aria-label="Permalink to &quot;搭建 React 源码本地调试环境&quot;">​</a></h2><p>使用 create-react-app 脚手架创建项目</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx create</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">react</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">app react</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">source</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx create</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">react</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">app react</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">source</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">test</span></span></code></pre></div><p>弹射 create-react-app 脚手架内部配置</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm run eject</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm run eject</span></span></code></pre></div><p>克隆 react 官方原理（项目根目录下克隆）</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git clone </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">branch v16.</span><span style="color:#79B8FF;">13.1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">depth</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">https</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//github.com/facebook/react.git src/react</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git clone </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">branch v16.</span><span style="color:#005CC5;">13.1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">depth</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">https</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//github.com/facebook/react.git src/react</span></span></code></pre></div><p>链接本地源码</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// config/webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This allows you to set a fallback for where webpack should look for modules.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// We placed these paths second because we want \`node_modules\` to &quot;win&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// if there are any conflicts. This matches Node resolution mechanism.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// https://github.com/facebook/create-react-app/issues/253</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">modules</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;node_modules&quot;</span><span style="color:#E1E4E8;">, paths.appNodeModules].</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules.additionalModulePaths </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">  ),</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// These are the reasonable defaults supported by the Node ecosystem.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// We also include JSX as a common component filename extension to support</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// some tools, although we do not recommend using it, see:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// https://github.com/facebook/create-react-app/issues/290</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// \`web\` extension prefixes have been added for better support</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// for React Native Web.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">extensions</span><span style="color:#E1E4E8;">: paths.moduleFileExtensions</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ext</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`.\${</span><span style="color:#E1E4E8;">ext</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ext</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> useTypeScript </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">ext.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">)),</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">alias</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-native&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-native-web&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">react</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;../src/react/packages/react&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;../src/react/packages/react-dom&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">shared</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;../src/react/packages/shared&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-reconciler&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      __dirname,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;../src/react/packages/react-reconciler&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;legacy-events&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      __dirname,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;../src/react/packages/legacy-events&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Adds support for installing with Plug&#39;n&#39;Play, leading to faster installs and adding</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// guards against forgotten dependencies and such.</span></span>
<span class="line"><span style="color:#E1E4E8;">    PnpWebpackPlugin,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Prevents users from importing files from outside of src/ (or node_modules/).</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// This often causes confusion because we only process files within src/ with babel.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// To fix this, we prevent you from importing files out of src/ -- if you&#39;d like to,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// please link the files into your node_modules/ and let module-resolution kick in.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Make sure your source files are compiled, as they will not be processed in any way.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleScopePlugin</span><span style="color:#E1E4E8;">(paths.appSrc, [paths.appPackageJson])</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#6A737D;">// To fix this, we prevent you from importing files out of src/ -- if you&#39;d like to,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// please link the files into your node_modules/ and let module-resolution kick in.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Make sure your source files are compiled, as they will not be processed in any way.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModuleScopePlugin</span><span style="color:#E1E4E8;">(paths.appSrc, [</span></span>
<span class="line"><span style="color:#E1E4E8;">      paths.appPackageJson,</span></span>
<span class="line"><span style="color:#E1E4E8;">      reactRefreshOverlayEntry,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// config/webpack.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This allows you to set a fallback for where webpack should look for modules.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// We placed these paths second because we want \`node_modules\` to &quot;win&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// if there are any conflicts. This matches Node resolution mechanism.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// https://github.com/facebook/create-react-app/issues/253</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">modules</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;node_modules&quot;</span><span style="color:#24292E;">, paths.appNodeModules].</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    modules.additionalModulePaths </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">  ),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// These are the reasonable defaults supported by the Node ecosystem.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// We also include JSX as a common component filename extension to support</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// some tools, although we do not recommend using it, see:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// https://github.com/facebook/create-react-app/issues/290</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// \`web\` extension prefixes have been added for better support</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// for React Native Web.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">extensions</span><span style="color:#24292E;">: paths.moduleFileExtensions</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ext</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`.\${</span><span style="color:#24292E;">ext</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ext</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> useTypeScript </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">ext.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">)),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">alias</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-native&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-native-web&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">react</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;../src/react/packages/react&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;../src/react/packages/react-dom&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">shared</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;../src/react/packages/shared&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-reconciler&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      __dirname,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;../src/react/packages/react-reconciler&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;legacy-events&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      __dirname,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;../src/react/packages/legacy-events&quot;</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Adds support for installing with Plug&#39;n&#39;Play, leading to faster installs and adding</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// guards against forgotten dependencies and such.</span></span>
<span class="line"><span style="color:#24292E;">    PnpWebpackPlugin,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Prevents users from importing files from outside of src/ (or node_modules/).</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// This often causes confusion because we only process files within src/ with babel.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// To fix this, we prevent you from importing files out of src/ -- if you&#39;d like to,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// please link the files into your node_modules/ and let module-resolution kick in.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Make sure your source files are compiled, as they will not be processed in any way.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleScopePlugin</span><span style="color:#24292E;">(paths.appSrc, [paths.appPackageJson])</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#6A737D;">// To fix this, we prevent you from importing files out of src/ -- if you&#39;d like to,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// please link the files into your node_modules/ and let module-resolution kick in.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Make sure your source files are compiled, as they will not be processed in any way.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModuleScopePlugin</span><span style="color:#24292E;">(paths.appSrc, [</span></span>
<span class="line"><span style="color:#24292E;">      paths.appPackageJson,</span></span>
<span class="line"><span style="color:#24292E;">      reactRefreshOverlayEntry,</span></span>
<span class="line"><span style="color:#24292E;">    ]),</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><p>修改环境变量</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// config/env.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const stringified = {</span></span>
<span class="line"><span style="color:#6A737D;">//   &#39;p<wbr>rocess.env&#39;: Object.keys(raw).reduce((env, key) =&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">//     env[key] = JSON.stringify(raw[key]);</span></span>
<span class="line"><span style="color:#6A737D;">//     return env;</span></span>
<span class="line"><span style="color:#6A737D;">//   }, {}),</span></span>
<span class="line"><span style="color:#6A737D;">// };</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">stringified</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;p<wbr>rocess.env&quot;</span><span style="color:#E1E4E8;">: Object.</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(raw).</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">env</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    env[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(raw[key])</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> env</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, {}),</span></span>
<span class="line"><span style="color:#E1E4E8;">  __DEV__: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  SharedArrayBuffer: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  spyOnDev: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  spyOnDevAndProd: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  spyOnProd: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  __PROFILE__: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  __UMD__: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  __EXPERIMENTAL__: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  __VARIANT__: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  gate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  trustedTypes: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// config/env.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const stringified = {</span></span>
<span class="line"><span style="color:#6A737D;">//   &#39;p<wbr>rocess.env&#39;: Object.keys(raw).reduce((env, key) =&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">//     env[key] = JSON.stringify(raw[key]);</span></span>
<span class="line"><span style="color:#6A737D;">//     return env;</span></span>
<span class="line"><span style="color:#6A737D;">//   }, {}),</span></span>
<span class="line"><span style="color:#6A737D;">// };</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">stringified</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;p<wbr>rocess.env&quot;</span><span style="color:#24292E;">: Object.</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(raw).</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">env</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    env[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(raw[key])</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> env</span></span>
<span class="line"><span style="color:#24292E;">  }, {}),</span></span>
<span class="line"><span style="color:#24292E;">  __DEV__: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  SharedArrayBuffer: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  spyOnDev: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  spyOnDevAndProd: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  spyOnProd: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  __PROFILE__: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  __UMD__: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  __EXPERIMENTAL__: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  __VARIANT__: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  gate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  trustedTypes: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>配置 babel 转换代码时忽略类型检查</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm install @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">plugin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">transform</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">flow</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">strip</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">types </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm install @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">plugin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">transform</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">flow</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">strip</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">types </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// config/webpack.config.js	[babel-loader]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">(js</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">mjs</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">jsx</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">ts</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">tsx)</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">: paths.appSrc,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">: require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;babel-loader&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">customize</span><span style="color:#E1E4E8;">: require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;babel-preset-react-app/webpack-overrides&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;@babel/plugin-transform-flow-strip-types&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      [</span></span>
<span class="line"><span style="color:#E1E4E8;">        require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;babel-plugin-named-asset-import&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          loaderMap: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            svg: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              ReactComponent:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&quot;@svgr/webpack?-svgo,+titleProp,+ref![path]&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// This is a feature of \`babel-loader\` for webpack (not Babel itself).</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// It enables caching results in ./node_modules/.cache/babel-loader/</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// directory for faster rebuilds.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">cacheDirectory</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// See #6846 for context on why cacheCompression is disabled</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">cacheCompression</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">compact</span><span style="color:#E1E4E8;">: isEnvProduction</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// config/webpack.config.js	[babel-loader]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">(js</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">mjs</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">jsx</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">ts</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">tsx)</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">: paths.appSrc,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">: require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;babel-loader&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">options</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">customize</span><span style="color:#24292E;">: require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;babel-preset-react-app/webpack-overrides&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;@babel/plugin-transform-flow-strip-types&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      [</span></span>
<span class="line"><span style="color:#24292E;">        require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;babel-plugin-named-asset-import&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          loaderMap: {</span></span>
<span class="line"><span style="color:#24292E;">            svg: {</span></span>
<span class="line"><span style="color:#24292E;">              ReactComponent:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&quot;@svgr/webpack?-svgo,+titleProp,+ref![path]&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// This is a feature of \`babel-loader\` for webpack (not Babel itself).</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// It enables caching results in ./node_modules/.cache/babel-loader/</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// directory for faster rebuilds.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cacheDirectory</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// See #6846 for context on why cacheCompression is disabled</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cacheCompression</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">compact</span><span style="color:#24292E;">: isEnvProduction</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><p>导出 HostConfig</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// react/packages/react-reconciler/src/ReactFiberHostConfig.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> invariant </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;shared/invariant&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./forks/ReactFiberHostConfig.dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// We expect that our Rollup, Jest, and Flow configurations</span></span>
<span class="line"><span style="color:#6A737D;">// always shim this module with the corresponding host config</span></span>
<span class="line"><span style="color:#6A737D;">// (either provided by a renderer, or a generic shim for npm).</span></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#6A737D;">// We should never resolve to this file, but it exists to make</span></span>
<span class="line"><span style="color:#6A737D;">// sure that if we *do* accidentally break the configuration,</span></span>
<span class="line"><span style="color:#6A737D;">// the failure isn&#39;t silent.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// invariant(false, &#39;This module must be shimmed by a specific renderer.&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// react/packages/react-reconciler/src/ReactFiberHostConfig.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> invariant </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;shared/invariant&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./forks/ReactFiberHostConfig.dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// We expect that our Rollup, Jest, and Flow configurations</span></span>
<span class="line"><span style="color:#6A737D;">// always shim this module with the corresponding host config</span></span>
<span class="line"><span style="color:#6A737D;">// (either provided by a renderer, or a generic shim for npm).</span></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#6A737D;">// We should never resolve to this file, but it exists to make</span></span>
<span class="line"><span style="color:#6A737D;">// sure that if we *do* accidentally break the configuration,</span></span>
<span class="line"><span style="color:#6A737D;">// the failure isn&#39;t silent.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// invariant(false, &#39;This module must be shimmed by a specific renderer.&#39;);</span></span></code></pre></div><p>修改 ReactSharedInternals.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// react/packages/shared/ReactSharedInternals.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import * as React from &#39;react&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const ReactSharedInternals =</span></span>
<span class="line"><span style="color:#6A737D;">//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactSharedInternals </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;../react/src/ReactSharedInternals&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// react/packages/shared/ReactSharedInternals.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import * as React from &#39;react&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const ReactSharedInternals =</span></span>
<span class="line"><span style="color:#6A737D;">//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactSharedInternals </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;../react/src/ReactSharedInternals&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>关闭 eslint 扩展</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// react/.eslintrc.js	[module.exports]</span></span>
<span class="line"><span style="color:#6A737D;">// 删除 extends</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// extends: [&#39;fbjs&#39;, &#39;prettier&#39;],</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// react/.eslintrc.js	[module.exports]</span></span>
<span class="line"><span style="color:#6A737D;">// 删除 extends</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// extends: [&#39;fbjs&#39;, &#39;prettier&#39;],</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>禁止 invariant 报错</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// react/packages/shared/invariant.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invariant</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">condition</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">format</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">c</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">d</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">f</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (condition) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;Internal React error: invariant() is meant to be replaced at compile &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;time. There is no runtime version.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// react/packages/shared/invariant.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invariant</span><span style="color:#24292E;">(</span><span style="color:#E36209;">condition</span><span style="color:#24292E;">, </span><span style="color:#E36209;">format</span><span style="color:#24292E;">, </span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">, </span><span style="color:#E36209;">c</span><span style="color:#24292E;">, </span><span style="color:#E36209;">d</span><span style="color:#24292E;">, </span><span style="color:#E36209;">e</span><span style="color:#24292E;">, </span><span style="color:#E36209;">f</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (condition) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;Internal React error: invariant() is meant to be replaced at compile &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;time. There is no runtime version.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>eslint 配置</p><blockquote><p>react 源码文件夹新建 .eslintrc.json 并添加如下配置</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;extends&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-app&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;globals&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;SharedArrayBuffer&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;spyOnDev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;spyOnDevAndProd&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;spyOnProd&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;__PROFILE__&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;__UMD__&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;__EXPERIMENTAL__&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;__VARIANT__&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gate&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;trustedTypes&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;extends&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-app&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;globals&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;SharedArrayBuffer&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;spyOnDev&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;spyOnDevAndProd&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;spyOnProd&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;__PROFILE__&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;__UMD__&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;__EXPERIMENTAL__&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;__VARIANT__&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gate&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;trustedTypes&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>修改 react react-dom 引入方式</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-dom&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-dom&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./App&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-dom&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./App&quot;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/App.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span></span></code></pre></div><p>解决 vscode 中 flow 报错</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;javascript.validate.enable&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;javascript.validate.enable&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span></code></pre></div><p><code>__DEV__</code> 报错</p><p>删除 node_modules 文件夹，执行 npm install</p><h2 id="jsx-转换-reactelement-过程解析" tabindex="-1">JSX 转换 ReactElement 过程解析 <a class="header-anchor" href="#jsx-转换-reactelement-过程解析" aria-label="Permalink to &quot;JSX 转换 ReactElement 过程解析&quot;">​</a></h2><p>JSX 被 Babel 编译为 React.createElement 方法的调用，createElement 方法在调用后返回的就是 ReactElement，就是 Virtual DOM。</p><h3 id="createelement" tabindex="-1">createElement <a class="header-anchor" href="#createelement" aria-label="Permalink to &quot;createElement&quot;">​</a></h3><p>packages/react/index.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  Children,</span></span>
<span class="line"><span style="color:#E1E4E8;">  createRef,</span></span>
<span class="line"><span style="color:#E1E4E8;">  Component,</span></span>
<span class="line"><span style="color:#E1E4E8;">  PureComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">  createContext,</span></span>
<span class="line"><span style="color:#E1E4E8;">  forwardRef,</span></span>
<span class="line"><span style="color:#E1E4E8;">  lazy,</span></span>
<span class="line"><span style="color:#E1E4E8;">  memo,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useCallback,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useContext,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useEffect,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useImperativeHandle,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useDebugValue,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useLayoutEffect,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useMemo,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useReducer,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useRef,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useState,</span></span>
<span class="line"><span style="color:#E1E4E8;">  Fragment,</span></span>
<span class="line"><span style="color:#E1E4E8;">  Profiler,</span></span>
<span class="line"><span style="color:#E1E4E8;">  StrictMode,</span></span>
<span class="line"><span style="color:#E1E4E8;">  Suspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">  createElement,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloneElement,</span></span>
<span class="line"><span style="color:#E1E4E8;">  isValidElement,</span></span>
<span class="line"><span style="color:#E1E4E8;">  version,</span></span>
<span class="line"><span style="color:#E1E4E8;">  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,</span></span>
<span class="line"><span style="color:#E1E4E8;">  createFactory,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useTransition,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useDeferredValue,</span></span>
<span class="line"><span style="color:#E1E4E8;">  SuspenseList,</span></span>
<span class="line"><span style="color:#E1E4E8;">  unstable_withSuspenseConfig,</span></span>
<span class="line"><span style="color:#E1E4E8;">  block,</span></span>
<span class="line"><span style="color:#E1E4E8;">  DEPRECATED_useResponder,</span></span>
<span class="line"><span style="color:#E1E4E8;">  DEPRECATED_createResponder,</span></span>
<span class="line"><span style="color:#E1E4E8;">  unstable_createFundamental,</span></span>
<span class="line"><span style="color:#E1E4E8;">  unstable_createScope,</span></span>
<span class="line"><span style="color:#E1E4E8;">  jsx,</span></span>
<span class="line"><span style="color:#E1E4E8;">  jsxs,</span></span>
<span class="line"><span style="color:#E1E4E8;">  jsxDEV,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./src/React&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  Children,</span></span>
<span class="line"><span style="color:#24292E;">  createRef,</span></span>
<span class="line"><span style="color:#24292E;">  Component,</span></span>
<span class="line"><span style="color:#24292E;">  PureComponent,</span></span>
<span class="line"><span style="color:#24292E;">  createContext,</span></span>
<span class="line"><span style="color:#24292E;">  forwardRef,</span></span>
<span class="line"><span style="color:#24292E;">  lazy,</span></span>
<span class="line"><span style="color:#24292E;">  memo,</span></span>
<span class="line"><span style="color:#24292E;">  useCallback,</span></span>
<span class="line"><span style="color:#24292E;">  useContext,</span></span>
<span class="line"><span style="color:#24292E;">  useEffect,</span></span>
<span class="line"><span style="color:#24292E;">  useImperativeHandle,</span></span>
<span class="line"><span style="color:#24292E;">  useDebugValue,</span></span>
<span class="line"><span style="color:#24292E;">  useLayoutEffect,</span></span>
<span class="line"><span style="color:#24292E;">  useMemo,</span></span>
<span class="line"><span style="color:#24292E;">  useReducer,</span></span>
<span class="line"><span style="color:#24292E;">  useRef,</span></span>
<span class="line"><span style="color:#24292E;">  useState,</span></span>
<span class="line"><span style="color:#24292E;">  Fragment,</span></span>
<span class="line"><span style="color:#24292E;">  Profiler,</span></span>
<span class="line"><span style="color:#24292E;">  StrictMode,</span></span>
<span class="line"><span style="color:#24292E;">  Suspense,</span></span>
<span class="line"><span style="color:#24292E;">  createElement,</span></span>
<span class="line"><span style="color:#24292E;">  cloneElement,</span></span>
<span class="line"><span style="color:#24292E;">  isValidElement,</span></span>
<span class="line"><span style="color:#24292E;">  version,</span></span>
<span class="line"><span style="color:#24292E;">  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,</span></span>
<span class="line"><span style="color:#24292E;">  createFactory,</span></span>
<span class="line"><span style="color:#24292E;">  useTransition,</span></span>
<span class="line"><span style="color:#24292E;">  useDeferredValue,</span></span>
<span class="line"><span style="color:#24292E;">  SuspenseList,</span></span>
<span class="line"><span style="color:#24292E;">  unstable_withSuspenseConfig,</span></span>
<span class="line"><span style="color:#24292E;">  block,</span></span>
<span class="line"><span style="color:#24292E;">  DEPRECATED_useResponder,</span></span>
<span class="line"><span style="color:#24292E;">  DEPRECATED_createResponder,</span></span>
<span class="line"><span style="color:#24292E;">  unstable_createFundamental,</span></span>
<span class="line"><span style="color:#24292E;">  unstable_createScope,</span></span>
<span class="line"><span style="color:#24292E;">  jsx,</span></span>
<span class="line"><span style="color:#24292E;">  jsxs,</span></span>
<span class="line"><span style="color:#24292E;">  jsxDEV,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./src/React&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>packages/react/src/React.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  createElement </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> createElementProd,</span></span>
<span class="line"><span style="color:#E1E4E8;">  createFactory </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> createFactoryProd,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloneElement </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> cloneElementProd,</span></span>
<span class="line"><span style="color:#E1E4E8;">  isValidElement,</span></span>
<span class="line"><span style="color:#E1E4E8;">  jsx </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> jsxProd,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./ReactElement&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  createElement </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> createElementProd,</span></span>
<span class="line"><span style="color:#24292E;">  createFactory </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> createFactoryProd,</span></span>
<span class="line"><span style="color:#24292E;">  cloneElement </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> cloneElementProd,</span></span>
<span class="line"><span style="color:#24292E;">  isValidElement,</span></span>
<span class="line"><span style="color:#24292E;">  jsx </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> jsxProd,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./ReactElement&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>packages/react/src/ReactElement.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 创建 React Element</span></span>
<span class="line"><span style="color:#6A737D;"> * type      元素类型</span></span>
<span class="line"><span style="color:#6A737D;"> * config    配置属性</span></span>
<span class="line"><span style="color:#6A737D;"> * children  子元素</span></span>
<span class="line"><span style="color:#6A737D;"> * 1. 分离 props 属性和特殊属性</span></span>
<span class="line"><span style="color:#6A737D;"> * 2. 将子元素挂载到 props.children 中</span></span>
<span class="line"><span style="color:#6A737D;"> * 3. 为 props 属性赋默认值 (defaultProps)</span></span>
<span class="line"><span style="color:#6A737D;"> * 4. 创建并返回 ReactElement</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">type</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">config</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">children</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * propName -&gt; 属性名称</span></span>
<span class="line"><span style="color:#6A737D;">   * 用于后面的 for 循环</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> propName;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 存储 React Element 中的普通元素属性 即不包含 key ref self source</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 待提取属性</span></span>
<span class="line"><span style="color:#6A737D;">   * React 内部为了实现某些功能而存在的属性</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> ref </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> self </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> source </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果 config 不为 null</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (config </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果 config 对象中有合法的 ref 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">hasValidRef</span><span style="color:#E1E4E8;">(config)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 将 config.ref 属性提取到 ref 变量中</span></span>
<span class="line"><span style="color:#E1E4E8;">      ref </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.ref;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 在开发环境中</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果 ref 属性的值被设置成了字符串形式就报一个提示</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 说明此用法在将来的版本中会被删除</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warnIfStringRefCannotBeAutoConverted</span><span style="color:#E1E4E8;">(config);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果在 config 对象中拥有合法的 key 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">hasValidKey</span><span style="color:#E1E4E8;">(config)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 将 config.key 属性中的值提取到 key 变量中</span></span>
<span class="line"><span style="color:#E1E4E8;">      key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> config.key;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    self </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.__self </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> config.__self;</span></span>
<span class="line"><span style="color:#E1E4E8;">    source </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.__source </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> config.__source;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历 config 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (propName </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> config) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果当前遍历到的属性是对象自身属性</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 并且在 RESERVED_PROPS 对象中不存在该属性</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        hasOwnProperty.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(config, propName) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">RESERVED_PROPS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">hasOwnProperty</span><span style="color:#E1E4E8;">(propName)</span></span>
<span class="line"><span style="color:#E1E4E8;">      ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将满足条件的属性添加到 props 对象中 (普通属性)</span></span>
<span class="line"><span style="color:#E1E4E8;">        props[propName] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config[propName];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 将第三个及之后的参数挂载到 props.children 属性中</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果子元素是多个 props.children 是数组</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果子元素是一个 props.children 是对象</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 由于从第三个参数开始及以后都表示子元素</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 所以减去前两个参数的结果就是子元素的数量</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">childrenLength</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果子元素的数量是 1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (childrenLength </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 直接将子元素挂载到到 props.children 属性上</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 此时 children 是对象类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    props.children </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> children;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果子元素的数量大于 1</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (childrenLength </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建数组, 数组中元素的数量等于子元素的数量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">childArray</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">(childrenLength);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 开启循环 循环次匹配子元素的数量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> childrenLength; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 将子元素添加到 childArray 数组中</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// i + 2 的原因是实参集合的前两个参数不是子元素</span></span>
<span class="line"><span style="color:#E1E4E8;">      childArray[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">[i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果是开发环境</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果 Object 对象中存在 freeze 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Object.freeze) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 调用 freeze 方法 冻结 childArray 数组</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 防止 React 核心对象被修改 冻结对象提高性能</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object.</span><span style="color:#B392F0;">freeze</span><span style="color:#E1E4E8;">(childArray);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将子元素数组挂载到 props.children 属性中</span></span>
<span class="line"><span style="color:#E1E4E8;">    props.children </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> childArray;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果当前处理是组件</span></span>
<span class="line"><span style="color:#6A737D;">   * 看组件身上是否有 defaultProps 属性</span></span>
<span class="line"><span style="color:#6A737D;">   * 这个属性中存储的是 props 对象中属性的默认值</span></span>
<span class="line"><span style="color:#6A737D;">   * 遍历 defaultProps 对象 查看对应的 props 属性的值是否为 undefined</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果为undefined 就将默认值赋值给对应的 props 属性值</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 将 type 属性值视为函数 查看其中是否具有 defaultProps 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (type </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> type.defaultProps) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将 type 函数下的 defaultProps 属性赋值给 defaultProps 变量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">defaultProps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> type.defaultProps;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历 defaultProps 对象中的属性 将属性名称赋值给 propName 变量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (propName </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> defaultProps) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果 props 对象中的该属性的值为 undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (props[propName] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将 defaultProps 对象中的对应属性的值赋值给 props 对象中的对应属性的值</span></span>
<span class="line"><span style="color:#E1E4E8;">        props[propName] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> defaultProps[propName];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 在开发环境中 React 会检测开发者是否在组件内部</span></span>
<span class="line"><span style="color:#6A737D;">   * 通过 props 对象获取 key 属性或者 ref 属性</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果开发者调用了 在控制台中报错误提示</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果处于开发环境</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 元素具有 key 属性或者 ref 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> ref) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 看一下 type 属性中存储的是否是函数 如果是函数就表示当前元素是组件</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果元素不是组件 就直接返回元素类型字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// displayName 用于在报错过程中显示是哪一个组件报错了</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果开发者显式定义了 displayName 属性 就显示开发者定义的</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 否者就显示组件名称 如果组件也没有名称 就显示 &#39;Unknown&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">displayName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> type.displayName </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> type.name </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Unknown&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> type;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果 key 属性存在</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 为 props 对象添加key 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 并指定当通过 props 对象获取 key 属性时报错</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">defineKeyPropWarningGetter</span><span style="color:#E1E4E8;">(props, displayName);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果 ref 属性存在</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (ref) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 为 props 对象添加 ref 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 并指定当通过 props 对象获取 ref 属性时报错</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">defineRefPropWarningGetter</span><span style="color:#E1E4E8;">(props, displayName);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回 ReactElement</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReactElement</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    type,</span></span>
<span class="line"><span style="color:#E1E4E8;">    key,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ref,</span></span>
<span class="line"><span style="color:#E1E4E8;">    self,</span></span>
<span class="line"><span style="color:#E1E4E8;">    source,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 在 Virtual DOM 中用于识别自定义组件</span></span>
<span class="line"><span style="color:#E1E4E8;">    ReactCurrentOwner.current,</span></span>
<span class="line"><span style="color:#E1E4E8;">    props,</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 创建 React Element</span></span>
<span class="line"><span style="color:#6A737D;"> * type      元素类型</span></span>
<span class="line"><span style="color:#6A737D;"> * config    配置属性</span></span>
<span class="line"><span style="color:#6A737D;"> * children  子元素</span></span>
<span class="line"><span style="color:#6A737D;"> * 1. 分离 props 属性和特殊属性</span></span>
<span class="line"><span style="color:#6A737D;"> * 2. 将子元素挂载到 props.children 中</span></span>
<span class="line"><span style="color:#6A737D;"> * 3. 为 props 属性赋默认值 (defaultProps)</span></span>
<span class="line"><span style="color:#6A737D;"> * 4. 创建并返回 ReactElement</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#E36209;">type</span><span style="color:#24292E;">, </span><span style="color:#E36209;">config</span><span style="color:#24292E;">, </span><span style="color:#E36209;">children</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * propName -&gt; 属性名称</span></span>
<span class="line"><span style="color:#6A737D;">   * 用于后面的 for 循环</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> propName;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 存储 React Element 中的普通元素属性 即不包含 key ref self source</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 待提取属性</span></span>
<span class="line"><span style="color:#6A737D;">   * React 内部为了实现某些功能而存在的属性</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> ref </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> self </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> source </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果 config 不为 null</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (config </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果 config 对象中有合法的 ref 属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">hasValidRef</span><span style="color:#24292E;">(config)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 将 config.ref 属性提取到 ref 变量中</span></span>
<span class="line"><span style="color:#24292E;">      ref </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> config.ref;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 在开发环境中</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果 ref 属性的值被设置成了字符串形式就报一个提示</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 说明此用法在将来的版本中会被删除</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warnIfStringRefCannotBeAutoConverted</span><span style="color:#24292E;">(config);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果在 config 对象中拥有合法的 key 属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">hasValidKey</span><span style="color:#24292E;">(config)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 将 config.key 属性中的值提取到 key 变量中</span></span>
<span class="line"><span style="color:#24292E;">      key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> config.key;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    self </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> config.__self </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> config.__self;</span></span>
<span class="line"><span style="color:#24292E;">    source </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> config.__source </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> config.__source;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历 config 对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (propName </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> config) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果当前遍历到的属性是对象自身属性</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 并且在 RESERVED_PROPS 对象中不存在该属性</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        hasOwnProperty.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(config, propName) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">RESERVED_PROPS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">hasOwnProperty</span><span style="color:#24292E;">(propName)</span></span>
<span class="line"><span style="color:#24292E;">      ) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将满足条件的属性添加到 props 对象中 (普通属性)</span></span>
<span class="line"><span style="color:#24292E;">        props[propName] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> config[propName];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 将第三个及之后的参数挂载到 props.children 属性中</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果子元素是多个 props.children 是数组</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果子元素是一个 props.children 是对象</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 由于从第三个参数开始及以后都表示子元素</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 所以减去前两个参数的结果就是子元素的数量</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">childrenLength</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果子元素的数量是 1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (childrenLength </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 直接将子元素挂载到到 props.children 属性上</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 此时 children 是对象类型</span></span>
<span class="line"><span style="color:#24292E;">    props.children </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> children;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果子元素的数量大于 1</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (childrenLength </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建数组, 数组中元素的数量等于子元素的数量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">childArray</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">(childrenLength);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 开启循环 循环次匹配子元素的数量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> childrenLength; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 将子元素添加到 childArray 数组中</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// i + 2 的原因是实参集合的前两个参数不是子元素</span></span>
<span class="line"><span style="color:#24292E;">      childArray[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">[i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果是开发环境</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果 Object 对象中存在 freeze 方法</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Object.freeze) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 调用 freeze 方法 冻结 childArray 数组</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 防止 React 核心对象被修改 冻结对象提高性能</span></span>
<span class="line"><span style="color:#24292E;">        Object.</span><span style="color:#6F42C1;">freeze</span><span style="color:#24292E;">(childArray);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将子元素数组挂载到 props.children 属性中</span></span>
<span class="line"><span style="color:#24292E;">    props.children </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> childArray;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果当前处理是组件</span></span>
<span class="line"><span style="color:#6A737D;">   * 看组件身上是否有 defaultProps 属性</span></span>
<span class="line"><span style="color:#6A737D;">   * 这个属性中存储的是 props 对象中属性的默认值</span></span>
<span class="line"><span style="color:#6A737D;">   * 遍历 defaultProps 对象 查看对应的 props 属性的值是否为 undefined</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果为undefined 就将默认值赋值给对应的 props 属性值</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 将 type 属性值视为函数 查看其中是否具有 defaultProps 属性</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (type </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> type.defaultProps) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将 type 函数下的 defaultProps 属性赋值给 defaultProps 变量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">defaultProps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> type.defaultProps;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历 defaultProps 对象中的属性 将属性名称赋值给 propName 变量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (propName </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> defaultProps) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果 props 对象中的该属性的值为 undefined</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (props[propName] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将 defaultProps 对象中的对应属性的值赋值给 props 对象中的对应属性的值</span></span>
<span class="line"><span style="color:#24292E;">        props[propName] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> defaultProps[propName];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 在开发环境中 React 会检测开发者是否在组件内部</span></span>
<span class="line"><span style="color:#6A737D;">   * 通过 props 对象获取 key 属性或者 ref 属性</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果开发者调用了 在控制台中报错误提示</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果处于开发环境</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (__DEV__) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 元素具有 key 属性或者 ref 属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> ref) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 看一下 type 属性中存储的是否是函数 如果是函数就表示当前元素是组件</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果元素不是组件 就直接返回元素类型字符串</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// displayName 用于在报错过程中显示是哪一个组件报错了</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果开发者显式定义了 displayName 属性 就显示开发者定义的</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 否者就显示组件名称 如果组件也没有名称 就显示 &#39;Unknown&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">displayName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> type.displayName </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> type.name </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Unknown&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> type;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果 key 属性存在</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 为 props 对象添加key 属性</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 并指定当通过 props 对象获取 key 属性时报错</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">defineKeyPropWarningGetter</span><span style="color:#24292E;">(props, displayName);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果 ref 属性存在</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (ref) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 为 props 对象添加 ref 属性</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 并指定当通过 props 对象获取 ref 属性时报错</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">defineRefPropWarningGetter</span><span style="color:#24292E;">(props, displayName);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回 ReactElement</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReactElement</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    type,</span></span>
<span class="line"><span style="color:#24292E;">    key,</span></span>
<span class="line"><span style="color:#24292E;">    ref,</span></span>
<span class="line"><span style="color:#24292E;">    self,</span></span>
<span class="line"><span style="color:#24292E;">    source,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 在 Virtual DOM 中用于识别自定义组件</span></span>
<span class="line"><span style="color:#24292E;">    ReactCurrentOwner.current,</span></span>
<span class="line"><span style="color:#24292E;">    props,</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,43),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const D=s(l,[["render",c]]);export{F as __pageData,D as default};
