# Vue3核心源码实现

## reactivity 对象属性代理（取值和赋值操作）

  Vue3采用新的管理方式（monorepo）来管理项目。

  monorepo：一个仓库中管理多个包的方式。


          @vue/compiler-dom  ->  @vue/compiler-core
  Vue     

          @vue/runtime-dom  ->   @vue/runtime-core  ->  @vue/reactivity

  ```js
  yarn add webpack webpack-cli webpack-dev-server
  yarn add html-webpack-plugin
  ```

  ```js
  yarn add @vue/reactivity 
  ```

  ```js
  import { reactive, effect } from '@vue/reactivity';

  const state = reactive({
    name: 'yueluo',
    age: 22
  });

  effect(() => {
    console.log(state.name);
  })

  state.name = 'YUELUO';
  
  // yueluo
  // YUELUO
  ```
  effect：副作用
  reactive：响应式

  实现reactivity包

## reactivity 对象属性拦截

  Vue3相比较Vue2来说，有比较大的性能提升。
  Vue3使用的proxy代理会在取值的时候判断是否是对象，然后进行代理。
  Vue2处理对象时，一开始就会递归的调用definedProperty进行属性的定义。

## effect 依赖收集 

  Vue3.0 effect 相当于 Vue2.0 watcher。

## effect 视图更新

## computed 计算属性