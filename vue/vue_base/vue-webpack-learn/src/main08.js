// const app = Vue.createApp({
//   data () {
//     return {
//       title: 'This is my Title'
//     }
//   },
//   template: `
//     <h1>{{ title }}</h1>
//   `,
// });

// const vm = app.mount('#app');

// vm.$data.title = 'This is your Title';
// console.log(vm.title);

// const obj = {
//   a: 1,
//   b: 2
// }

// var vm1 = new Vue({
//   data: obj
// });

// var vm2 = new Vue({
//   data: obj
// });

// function Vue (options) {
//   // this.$data = options.data();
//   this.$data = options.data;

//   for (let key in this.$data) {
//     ((k) => {
//       Object.defineProperty(this, k, {
//         get: () => {
//           return this.$data[k];
//         },
//         set: (newVal) => {
//           this.$data[k] = newVal;
//         }
//       })
//     })(key);
//   }
// }

// vm1.b = 3;

// console.log(vm1, vm2);



const obj = () => {
  return {
    a: 1,
    b: 2
  }
};

var vm1 = new Vue({
  data: obj
});

var vm2 = new Vue({
  data: obj
});

function Vue (options) {
  this.$data = options.data();

  for (let key in this.$data) {
    ((k) => {
      this.__defineGetter__(k, () => {
        return this.$data[k];
      });

      this.__defineSetter__(k, (newVal) => {
        this.$data[k] = newVal;
      });
    })(key);
  }
}

vm1.b = 3;

console.log(vm1, vm2);