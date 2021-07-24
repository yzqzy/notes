// const app = Vue.createApp({
//   data () {
//     return {
//       title: 'This is my title'
//     }
//   },
//   template: `
//     <h1>{{ title }}</h1>
//     <button @click="changeTitle">Change</button>
//   `,
//   methods: {
//     changeTitle () {
//       this.title = 'This is your title';
//     }
//   },
// });

// const vm = app.mount('#app');


// const List = {
//   data () {
//     return {
//       teachers: []
//     }
//   },
//   template: `
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <td>ID</td>
//             <td>姓名</td>
//             <td>学科</td>
//           </tr>
//         </thead>
//         <tbody v-if="teachers.length > 0">
//           <tr
//             v-for="item of teachers"
//             key="item.id"
//           >
//             <td>{{ item.id }}</td>
//             <td>{{ item.name }}</td>
//             <td>{{ item.subject }}</td>
//           </tr>
//         </tbody>
//         <tbody>
//           <tr>
//             <td colspan="3">暂无数据</td>
//           </tr>
//         </tbody>
//       </table>
//       <button @click="debounceGetData">GET TEACHERS'DATA</button>
//     </div>
//   `,
//   created () {
//     this.debounceGetData = _.debounce(this.getData, 1000);
//   },
//   unmounted() {
//     this.debounceGetData.cancel();
//   },
//   methods: {
//     async getData () {
//       const result = await axios('http://localhost:4000/getTeachers');
//       this.teachers = result.data;
//     }
//   },
// }

// Vue.createApp(List).mount('#app');



var Vue = (function () {
  function Vue (options) {
    this.$data = options.data();
    this._methods = options.methods;

    this._init(this);
  }

  Vue.prototype._init = function (vm) {
    initData(vm);
    initMethods(vm);
  }

  function initData (vm) {
    for (var key in vm.$data) {
      (function (k) {
        Object.defineProperty(vm, k, {
          get: function () {
            return vm.$data[k];
          },
          set: function (newVal) {
            vm.$data[k] = newVal;
          }
        })
      })(key);
    }
  }

  function initMethods (vm) {
    for (var key in vm._methods) {
      vm[key] = vm._methods[key];
    }
  }

  return Vue;
})();

const vm = new Vue({
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  methods: {
    increaseA (num) {
      this.a += num;
    },
    increaseB (num) {
      this.b += num;
    },
    getTotal () {
      console.log(this.a + this.b);
    }
  },
});

vm.increaseA(1);
vm.increaseA(1);
vm.increaseA(1);
vm.increaseA(1);

vm.increaseA(2);
vm.increaseA(2);
vm.increaseA(2);
vm.increaseA(2);

console.log(vm);
console.log(vm.getTotal());

