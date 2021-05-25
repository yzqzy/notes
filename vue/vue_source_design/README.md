# Vue核心源码实现

## 环境配置、基础代码编写

  npm init 

  npm i webpack webpack-cli webpack-dev-server --save-dev

  npm i html-webpack-plugin --save-dev

## 对象劫持、访问属性代理

## 数组劫持
  
  vue中数组劫持的缺点

    1. 直接通过数组索引改变值，是不会被观察到的。
 
      [1, 3, 4] => vm.nums[2] = 5;  

    2. 数组长度修改，不会对其观察

## 编译文本

  根据数据进行页面渲染，区分元素节点和文本节点，并进行编译。

## 依赖收集

  数据驱动视图更改。

  解决订阅事件重复的问题，使dep和watcher相互依赖。

## 批量异步更新策略

  Promise、MutationObserver 微任务
  setImmediate、setTimeout 宏任务

  微任务比宏任务消耗的时间短，支持Promise的话，可以更快的执行程序。

  /**
   * @description 执行异步函数
   * @param {function} cb - 回调函数
   * @return {void}
   */
  function nextTick (cb) {
    callbacks.push(cb);

    let timerFunction = () => {
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
  }
  
## 数组的依赖收集

  数组和多维数组需要单独处理依赖收集。

## 定义watch方法

  每一个watch都是一个watcher。

  vue原型上挂载watch方法，实例化一个watcher
  
  Vue.prototype.$watch = function (exp, handler) {
    let vm = this;
    
    // exp - watch 
    // watch属性的watcher
    new Watcher(vm, exp, handler, {
      user: true
    });
  }

  在watcher里，获取到改变前与改变后的值，执行回调函数。

  这里的watcher属于用户自定义watcher。

## 计算属性的实现

  每一个计算属性都是一个watcher。

    function initComputed (vm, computed) {
      let watchers = vm._watchersComputed = Object.create(null);

      for (let key in computed) {
        let useDef = computed[key];
        // 计算属性的watcher
        watchers[key] = new Watcher(vm, useDef, () => {}, {
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

      // dirty -> 计算属性缓存问题
      return function () {
        if (watcher) {
          if (watcher.dirty) {
            watcher.evaluate();
          }
          return watcher.value;
        }
      }
    }

## 计算属性更新问题

  为计算属性添加渲染watcher、

  /**
   * @description 计算属性的getter方法
   * @param {object} vm - vue实例
   * @param {string} key - 键
   */
  function createComputedGetter (vm, key) {
    let watcher = vm._watchersComputed[key];

    // dirty -> 计算属性缓存问题
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
  }

  
  /**
   * @description computed属性更新
   *  将渲染watcher添加到计算属性中的deps
   *  用于计算属性watcher出栈后的数据更新操作
   */
  depend () {
    let i = this.deps.length;

    while (i--) {
      this.deps[i].depend();
    }
  }

  /**
   * @description 更新
   * @return {void}
   */
  update () {
    if (this.lazy) {
      // 计算属性watcher，重新取值
      this.dirty = true;
    } else {
      // this.get(); // 立即更新 -> 更新队列处理
      queryWatcher(this);
    }
  }

  计算属性更新相对比较复杂。

  ## 了解虚拟DOM

    虚拟DOM就是一个对象。

    {
      tag: div,
      props: {},
      children: [
        {
          tag: undefined,
          props: undefined,
          children: undefined,
          text: 'yueluo'
        }
      ]
    }

    使用虚拟DOM，可以有效减少性能消耗。

    vue中，虚拟DOM的创建都是依靠h函数。

    ```js
      new Vue({
        render (h) {
          return h('div', {}, 'yueluo');
        }
      })
    ```

    h类似于react中的createElement方法。

    1. 创建虚拟节点
    2. 将虚拟节点转换为真实节点
    3. 放入到DOM中

  ## 将虚拟DOM转换为真实DOM
  
    虚拟DOM创建、首次渲染
    
    需要对新节点和旧节点进行比对，然后在更新页面。

    操作虚拟DOM，比直接操作DOM性能好得多。

  ## 节点更新时，虚拟DOM处理

    实现patch方法。
    
    针对 老节点有子节点，新节点也有子节点 的情况进行特殊处理。

  ## 老节点有子节点，新节点也有子节点的情况

    updateChildren DOM Diff 核心逻辑

    处理追加元素的逻辑。

    a b c
    a b c d

    ```js
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

      while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (isSameVnode(oldStartVnode, newStartVnode)) {
          patch(oldStartVnode, newStartVnode);
          oldStartVnode = oldChildren[++oldStartIndex];
          newStartVnode = newChildren[++newStartIndex];
        }
      }

      if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
          parent.appendChild(createElm(newChildren[i]));
        }
      }
    }
    ```

    ```js
    /**
     * @description 判断是不是同一个节点
     * @param {object} oldVnode 老节点
     * @param {object} newVnode 新节点
     * @return {void}
     */
    function isSameVnode (oldVnode, newVnode) {
      return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key);
    }
    ```

  ## 处理新元素在头部或元素倒序问题

    1. 

      a b c
      e d a b c

    2.

      a b c
      c b a

    ```js
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

      while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
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

      if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
          let refElm = newChildren[newEndIndex + 1].el;
          parent.insertBefore(createElm(newChildren[i]), refElm);
        }
      }
    }
    ```
    
    为什么经常说给属性设置key值时，不要用索引？

      a b c d
      d c b a

      如果元素首尾颠倒时，索引是不变的，diff算法比较时，会根据索引去查询元素。
      导致会被判断n次，如果不使用索引，只会虚拟DOM元素的移动。

      如果不使用索引作为key，只需要3次DOM移动，倒序的时候可以减少性能消耗。
      如果使用索引作为key，会进行4次重新渲染才形成最终的结果。

  ## 虚拟DOM代码合并到原有vue逻辑中（合并Vue代码)

    将虚拟DOM合并到原有逻辑中。

# Vue源码

  package.json

    ```js
    "main": "dist/vue.runtime.common.js" => require('vue'); common.js
    "module": "dist/vue.runtime.esm.js" => import Vue from 'vue'; es module
    ```

    ```js
    "scipts": {
      "dev": "rollup -w -c scripts/config.js --environment TAGHET:web-full-dev",
      "build": "node script/build.js",
      "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
      "build:weex": "npm run build -- weex"
    }
    ```

  scripts/build.js

    ...