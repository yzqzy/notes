// const App = {
//   data () {
//     return {
//       isShowImg1: false,
//       isShowImg2: false
//     }
//   },
//   template: `
//     <div>
//       <div>
//         <img v-if="isShowImg1" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.9TSMJGQjXlsMp5bI82ii-gHaE8?w=252&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
//         <img v-show="isShowImg2" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.i0-ND27ia6sO-nZuY9f7qAHaEK?w=289&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
//       </div>
//       <div>
//         <button @click="showImg1">显示图片 1</button>
//         <button @click="showImg2">显示图片 2</button>
//       </div>
//     </div>
//   `,
//   methods: {
//     showImg1 () {
//       this.isShowImg1 = !this.isShowImg1;
//     },
//     showImg2 () {
//       this.isShowImg2 = !this.isShowImg2;
//     },
//   },
// }

// const vm = Vue.createApp(App).mount('#app');


import Vue from '../modules/Vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      isShowImg1: true,
      isShowImg2: true
    }
  },
  beforeCreate () {
    console.log('beforeCreate');
  },
  created () {
    console.log('created');
  },
  beforeMount () {
    console.log('beforeMount');
  },
  mounted () {
    console.log('mounted');
    this.isShowImg1 = false;
  },
  template: `
    <div>
      <img v-if="isShowImg1" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.9TSMJGQjXlsMp5bI82ii-gHaE8?w=252&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
      <img v-show="isShowImg2" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.i0-ND27ia6sO-nZuY9f7qAHaEK?w=289&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
    </div>
    <div>
      <button @click="showImg1">显示图片 1</button>
      <button @click="showImg2">显示图片 2</button>
    </div>
  `,
  methods: {
    showImg1 () {
      this.isShowImg1 = !this.isShowImg1;
    },
    showImg2 () {
      this.isShowImg2 = !this.isShowImg2;
    },
  },
});

console.log(vm);