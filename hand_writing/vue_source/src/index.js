import Vue from 'vue/core';

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

vm.nums.push({ a: 1 });

vm.nums[3].a = 3;