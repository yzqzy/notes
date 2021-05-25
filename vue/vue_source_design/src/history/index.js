import Vue from 'vue';

let vm = new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello World',
      nums: [[1, 2], 5, 7],
      person: {
        name: 'Mike',
        age: 20
      },
      fristName: 'yue',
      lastName: 'luo'
    }
  },
  computed: {
    fullName: function () {
      return this.fristName + this.lastName;
    }
  },
  watch: {
    message: function (newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  }
});

setTimeout(() => {
  // vm.nums.push(10);
  // vm.nums[0].push(10);
  // vm.message = 'hello';
  vm.fristName = 'yang';
}, 3000);