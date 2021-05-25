import Vue from 'vue';

let vm = new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello World'
    }
  },
  render (h) {
    return h('p', { id: 'test' }, this.message);
  }
});

setTimeout(() => {
  vm.message = 'Hi';
}, 3000);