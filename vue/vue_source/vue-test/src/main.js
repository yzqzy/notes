// import Vue from 'vue'

// vue 初始化
// new Vue({
//   el: '#app',
//   data () {
//     return {
//       message: 'Hello World'
//     }
//   }
// })

// vue 手写 render 函数
// new Vue({
//   el: '#app',
//   render (createElement) {
//     return createElement('div', {
//       attrs: {
//         id: 'app1'
//       }
//     }, this.message);
//   },
//   data () {
//     return {
//       message: 'Hello World'
//     }
//   }
// })

// vue 使用未定义的变量
// new Vue({
//   el: '#app',
//   data () {
//     return {
//       message: 'Hello World'
//     }
//   }
// })

// patch 过程分析
// new Vue({
//   el: '#app',
//   render (createElement) {
//     return createElement('div', {
//       attrs: {
//         id: 'app'
//       }
//     }, this.message);
//   },
//   data () {
//     return {
//       message: 'Hello World'
//     }
//   }
// })

// 组件化过程分析
// import Vue from 'vue';
// import App from './App.vue';

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

// 配置合并过程
// import Vue from 'vue';

// const childComp = {
//   template: '<div>{{ msg }}</div>',
//   created () {
//     console.log('child created');
//   },
//   mounted () {
//     console.log('child mounted');
//   },
//   data () {
//     return {
//       msg: 'Hello World.'
//     }
//   }
// }

// Vue.mixin({
//   created () {
//     console.log('parent created');
//   },
// })

// new Vue({
//   el: '#app',
//   render: h => h(childComp)
// })


// 全局注册和局部注册
// import Vue from 'vue';
// import App from './App.vue';

// Vue.component(App);

// new Vue({
//   el: '#app',
//   template: '<app />'
// })


// 异步组件
// import Vue from 'vue';

// Vue.component('HelloWorld', function (resolve, reject) {
//   // 这个特殊的 require 语法告诉 webpack
//   // 自动将编译后的代码分割成不同的块
//   // 这些块将通过 Ajax 请求自动下载
//   require(['./components/HelloWorld'], resolve);
// })

// Vue.component(
//   'HelloWorld',
//   // 该 import 函数返回一个 Promise 对象
//   () => import('./components/HelloWorld.vue')
// )

// const AsyncComp = () => ({
//   // 需要加载的组件
//   component: import('./components/HelloWorld.vue'),
//   // 加载中应当渲染的组件
//   loading: LoadingComp,
//   // 出错时渲染的组件
//   error: ErrorComp,
//   // 渲染加载中组件前的等待时间。默认：200ms
//   delay: 200,
//   // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
//   timeout: 3000
// })
// Vue.component('HelloWorld', AsyncComp);

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })


// 响应式原理
// import Vue from 'vue';

// new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue！'
//   },
//   methods: {
//     changeMsg () {
//       this.message = 'Hello World！';
//     }
//   }
// })


// 依赖收集、派发更新
// import Vue from 'vue';
// import App from './DepApp.vue';

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

// nextTick
// import Vue from 'vue';
// import App from './NextTickApp.vue';

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

// computed
import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    }
  }
});
