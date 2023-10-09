import{_ as e,o as n,c as t,Q as d}from"./chunks/framework.9bc09dc8.js";const w=JSON.parse('{"title":"Vue核心源码实现","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue_source_design/index.md","filePath":"vue/vue_source_design/index.md"}'),r={name:"vue/vue_source_design/index.md"},a=d(`<h1 id="vue核心源码实现" tabindex="-1">Vue核心源码实现 <a class="header-anchor" href="#vue核心源码实现" aria-label="Permalink to &quot;Vue核心源码实现&quot;">​</a></h1><h2 id="环境配置、基础代码编写" tabindex="-1">环境配置、基础代码编写 <a class="header-anchor" href="#环境配置、基础代码编写" aria-label="Permalink to &quot;环境配置、基础代码编写&quot;">​</a></h2><p>npm init</p><p>npm i webpack webpack-cli webpack-dev-server --save-dev</p><p>npm i html-webpack-plugin --save-dev</p><h2 id="对象劫持、访问属性代理" tabindex="-1">对象劫持、访问属性代理 <a class="header-anchor" href="#对象劫持、访问属性代理" aria-label="Permalink to &quot;对象劫持、访问属性代理&quot;">​</a></h2><h2 id="数组劫持" tabindex="-1">数组劫持 <a class="header-anchor" href="#数组劫持" aria-label="Permalink to &quot;数组劫持&quot;">​</a></h2><p>vue中数组劫持的缺点</p><pre><code>1. 直接通过数组索引改变值，是不会被观察到的。

  [1, 3, 4] =&gt; vm.nums[2] = 5;  

2. 数组长度修改，不会对其观察
</code></pre><h2 id="编译文本" tabindex="-1">编译文本 <a class="header-anchor" href="#编译文本" aria-label="Permalink to &quot;编译文本&quot;">​</a></h2><p>根据数据进行页面渲染，区分元素节点和文本节点，并进行编译。</p><h2 id="依赖收集" tabindex="-1">依赖收集 <a class="header-anchor" href="#依赖收集" aria-label="Permalink to &quot;依赖收集&quot;">​</a></h2><p>数据驱动视图更改。</p><p>解决订阅事件重复的问题，使dep和watcher相互依赖。</p><h2 id="批量异步更新策略" tabindex="-1">批量异步更新策略 <a class="header-anchor" href="#批量异步更新策略" aria-label="Permalink to &quot;批量异步更新策略&quot;">​</a></h2><p>Promise、MutationObserver 微任务 setImmediate、setTimeout 宏任务</p><p>微任务比宏任务消耗的时间短，支持Promise的话，可以更快的执行程序。</p><p>/**</p><ul><li>@description 执行异步函数</li><li>@param {function} cb - 回调函数</li><li>@return {void} */ function nextTick (cb) { callbacks.push(cb);</li></ul><pre><code>let timerFunction = () =&gt; {
  flushCallbacks();
}

if (Promise) {
  return Promise.resolve().then(timerFunction);
}

if (MutationObserver) {
  // html5中的API
  let observe = new MutationObserver(timerFunction);
  let textNode = document.createElement(10);
  observe.observe(textNode, { characterData: true });
  textNode.textContent = 20;
  return;
}

if (setImmediate) {
  // 性能比setTimeout好，老版本不支持
  return setImmediate(timerFunction);
}

// 必选项
setTimeout(timerFunction);
</code></pre><p>}</p><h2 id="数组的依赖收集" tabindex="-1">数组的依赖收集 <a class="header-anchor" href="#数组的依赖收集" aria-label="Permalink to &quot;数组的依赖收集&quot;">​</a></h2><p>数组和多维数组需要单独处理依赖收集。</p><h2 id="定义watch方法" tabindex="-1">定义watch方法 <a class="header-anchor" href="#定义watch方法" aria-label="Permalink to &quot;定义watch方法&quot;">​</a></h2><p>每一个watch都是一个watcher。</p><p>vue原型上挂载watch方法，实例化一个watcher</p><p>Vue.prototype.$watch = function (exp, handler) { let vm = this;</p><pre><code>// exp - watch 
// watch属性的watcher
new Watcher(vm, exp, handler, {
  user: true
});
</code></pre><p>}</p><p>在watcher里，获取到改变前与改变后的值，执行回调函数。</p><p>这里的watcher属于用户自定义watcher。</p><h2 id="计算属性的实现" tabindex="-1">计算属性的实现 <a class="header-anchor" href="#计算属性的实现" aria-label="Permalink to &quot;计算属性的实现&quot;">​</a></h2><p>每一个计算属性都是一个watcher。</p><pre><code>function initComputed (vm, computed) {
  let watchers = vm._watchersComputed = Object.create(null);

  for (let key in computed) {
    let useDef = computed[key];
    // 计算属性的watcher
    watchers[key] = new Watcher(vm, useDef, () =&gt; {}, {
      lazy: true
    });
    // 设置getter方法
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    });
  }
}

/**
 * @description 计算属性的getter方法
 * @param {object} vm - vue实例
 * @param {string} key - 键
 */
function createComputedGetter (vm, key) {
  let watcher = vm._watchersComputed[key];

  // dirty -&gt; 计算属性缓存问题
  return function () {
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      return watcher.value;
    }
  }
}
</code></pre><h2 id="计算属性更新问题" tabindex="-1">计算属性更新问题 <a class="header-anchor" href="#计算属性更新问题" aria-label="Permalink to &quot;计算属性更新问题&quot;">​</a></h2><p>为计算属性添加渲染watcher、</p><p>/**</p><ul><li>@description 计算属性的getter方法</li><li>@param {object} vm - vue实例</li><li>@param {string} key - 键 */ function createComputedGetter (vm, key) { let watcher = vm._watchersComputed[key];</li></ul><pre><code>// dirty -&gt; 计算属性缓存问题
return function () {
  if (watcher) {
    if (watcher.dirty) {
      watcher.evaluate();
    }

    if (Dep.target) {
      watcher.depend();
    }

    return watcher.value;
  }
}
</code></pre><p>}</p><p>/**</p><ul><li>@description computed属性更新</li><li>将渲染watcher添加到计算属性中的deps</li><li>用于计算属性watcher出栈后的数据更新操作 */ depend () { let i = this.deps.length;</li></ul><pre><code>while (i--) {
  this.deps[i].depend();
}
</code></pre><p>}</p><p>/**</p><ul><li>@description 更新</li><li>@return {void} */ update () { if (this.lazy) { // 计算属性watcher，重新取值 this.dirty = true; } else { // this.get(); // 立即更新 -&gt; 更新队列处理 queryWatcher(this); } }</li></ul><p>计算属性更新相对比较复杂。</p><h2 id="了解虚拟dom" tabindex="-1">了解虚拟DOM <a class="header-anchor" href="#了解虚拟dom" aria-label="Permalink to &quot;了解虚拟DOM&quot;">​</a></h2><pre><code>虚拟DOM就是一个对象。

{
  tag: div,
  props: {},
  children: [
    {
      tag: undefined,
      props: undefined,
      children: undefined,
      text: &#39;yueluo&#39;
    }
  ]
}

使用虚拟DOM，可以有效减少性能消耗。

vue中，虚拟DOM的创建都是依靠h函数。

\`\`\`js
  new Vue({
    render (h) {
      return h(&#39;div&#39;, {}, &#39;yueluo&#39;);
    }
  })
\`\`\`

h类似于react中的createElement方法。

1. 创建虚拟节点
2. 将虚拟节点转换为真实节点
3. 放入到DOM中
</code></pre><h2 id="将虚拟dom转换为真实dom" tabindex="-1">将虚拟DOM转换为真实DOM <a class="header-anchor" href="#将虚拟dom转换为真实dom" aria-label="Permalink to &quot;将虚拟DOM转换为真实DOM&quot;">​</a></h2><pre><code>虚拟DOM创建、首次渲染

需要对新节点和旧节点进行比对，然后在更新页面。

操作虚拟DOM，比直接操作DOM性能好得多。
</code></pre><h2 id="节点更新时-虚拟dom处理" tabindex="-1">节点更新时，虚拟DOM处理 <a class="header-anchor" href="#节点更新时-虚拟dom处理" aria-label="Permalink to &quot;节点更新时，虚拟DOM处理&quot;">​</a></h2><pre><code>实现patch方法。

针对 老节点有子节点，新节点也有子节点 的情况进行特殊处理。
</code></pre><h2 id="老节点有子节点-新节点也有子节点的情况" tabindex="-1">老节点有子节点，新节点也有子节点的情况 <a class="header-anchor" href="#老节点有子节点-新节点也有子节点的情况" aria-label="Permalink to &quot;老节点有子节点，新节点也有子节点的情况&quot;">​</a></h2><pre><code>updateChildren DOM Diff 核心逻辑

处理追加元素的逻辑。

a b c
a b c d

\`\`\`js
/**
 * @description 更新子节点
 * @param {object} parent 父节点
 * @param {object} oldChildren 旧子节点
 * @param {object} newChildren 新子节点
 * @return {void}
 */
function updateChildren (parent, oldChildren, newChildren) {
  let oldStartIndex = 0,
      oldStartVnode = oldChildren[0],
      oldEndIndex = oldChildren.length - 1,
      oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0,
      newStartVnode = newChildren[0],
      newEndIndex = newChildren.length - 1,
      newEndVnode = newChildren[newEndIndex];

  while (oldStartIndex &lt;= oldEndIndex &amp;&amp; newStartIndex &lt;= newEndIndex) {
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    }
  }

  if (newStartIndex &lt;= newEndIndex) {
    for (let i = newStartIndex; i &lt;= newEndIndex; i++) {
      parent.appendChild(createElm(newChildren[i]));
    }
  }
}
\`\`\`

\`\`\`js
/**
 * @description 判断是不是同一个节点
 * @param {object} oldVnode 老节点
 * @param {object} newVnode 新节点
 * @return {void}
 */
function isSameVnode (oldVnode, newVnode) {
  return (oldVnode.tag === newVnode.tag) &amp;&amp; (oldVnode.key === newVnode.key);
}
\`\`\`
</code></pre><h2 id="处理新元素在头部或元素倒序问题" tabindex="-1">处理新元素在头部或元素倒序问题 <a class="header-anchor" href="#处理新元素在头部或元素倒序问题" aria-label="Permalink to &quot;处理新元素在头部或元素倒序问题&quot;">​</a></h2><pre><code>1. 

  a b c
  e d a b c

2.

  a b c
  c b a

\`\`\`js
/**
 * @description 更新子节点
 * @param {object} parent 父节点
 * @param {object} oldChildren 旧子节点
 * @param {object} newChildren 新子节点
 * @return {void}
 */
function updateChildren (parent, oldChildren, newChildren) {
  let oldStartIndex = 0,
      oldStartVnode = oldChildren[0],
      oldEndIndex = oldChildren.length - 1,
      oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0,
      newStartVnode = newChildren[0],
      newEndIndex = newChildren.length - 1,
      newEndVnode = newChildren[newEndIndex];

  while (oldStartIndex &lt;= oldEndIndex &amp;&amp; newStartIndex &lt;= newEndIndex) {
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    }
  }

  if (newStartIndex &lt;= newEndIndex) {
    for (let i = newStartIndex; i &lt;= newEndIndex; i++) {
      let refElm = newChildren[newEndIndex + 1].el;
      parent.insertBefore(createElm(newChildren[i]), refElm);
    }
  }
}
\`\`\`

为什么经常说给属性设置key值时，不要用索引？

  a b c d
  d c b a

  如果元素首尾颠倒时，索引是不变的，diff算法比较时，会根据索引去查询元素。
  导致会被判断n次，如果不使用索引，只会虚拟DOM元素的移动。

  如果不使用索引作为key，只需要3次DOM移动，倒序的时候可以减少性能消耗。
  如果使用索引作为key，会进行4次重新渲染才形成最终的结果。
</code></pre><h2 id="虚拟dom代码合并到原有vue逻辑中-合并vue代码" tabindex="-1">虚拟DOM代码合并到原有vue逻辑中（合并Vue代码) <a class="header-anchor" href="#虚拟dom代码合并到原有vue逻辑中-合并vue代码" aria-label="Permalink to &quot;虚拟DOM代码合并到原有vue逻辑中（合并Vue代码)&quot;">​</a></h2><pre><code>将虚拟DOM合并到原有逻辑中。
</code></pre><h1 id="vue源码" tabindex="-1">Vue源码 <a class="header-anchor" href="#vue源码" aria-label="Permalink to &quot;Vue源码&quot;">​</a></h1><p>package.json</p><pre><code>\`\`\`js
&quot;main&quot;: &quot;dist/vue.runtime.common.js&quot; =&gt; require(&#39;vue&#39;); common.js
&quot;module&quot;: &quot;dist/vue.runtime.esm.js&quot; =&gt; import Vue from &#39;vue&#39;; es module
\`\`\`

\`\`\`js
&quot;scipts&quot;: {
  &quot;dev&quot;: &quot;rollup -w -c scripts/config.js --environment TAGHET:web-full-dev&quot;,
  &quot;build&quot;: &quot;node script/build.js&quot;,
  &quot;build:ssr&quot;: &quot;npm run build -- web-runtime-cjs,web-server-renderer&quot;,
  &quot;build:weex&quot;: &quot;npm run build -- weex&quot;
}
\`\`\`
</code></pre><p>scripts/build.js</p><pre><code>...
</code></pre>`,64),o=[a];function i(l,c,h,u,p,s){return n(),t("div",null,o)}const b=e(r,[["render",i]]);export{w as __pageData,b as default};
