// import Vue from 'vue/core';
import Vue from 'vue/platforms/web/entry-runtime-with-compiler.js';

let vm = new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello Vue',
      nums: [ 1, 5, 7 ],
      person: {
        name: 'Mike',
        age: 20
      }
    }
  },
  computed: {},
  watch: {}
});

setTimeout(() => {
  vm.message = 'Hi';
  vm.message = 'Hey';
  vm.message = 'Bye Bye';
}, 3000);

// 保证页面更新后，才能访问 DOM 节点
// Vue.nextTick(() => {

// });