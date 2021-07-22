// const App = {
//   data () {
//     return {
//       linkIndex: 0,
//       urls: [
//         'https://www.taobao.com',
//         'https://www.tmall.com',
//         'https://www.jd.com'
//       ]
//     }
//   },
//   template: `
//     <div>
//       <div>
//         <p v-if="linkIndex === 0">
//           <a v-bind:href="urls[0]" target="_blank">淘宝</a>
//         </p>
//         <p v-else-if="linkIndex === 1">
//           <a v-bind:href="urls[1]" target="_blank">天猫</a>
//         </p>
//         <p v-else>
//           <a v-bind:href="urls[2]" target="_blank">京东</a>
//         </p>
//       </div>
//       <div>
//         <button v-on:click="changeIndex(0)">淘宝</button>
//         <button v-on:click="changeIndex(1)">天猫</button>
//         <button v-on:click="changeIndex(2)">京东</button>
//       </div>
//     </div>
//   `,
//   methods: {
//     changeIndex (index) {
//       this.linkIndex = index;
//     }
//   },
// }

// Vue.createApp(App).mount('#app');


// const App = {
//   data () {
//     return {
//       linkIndex: 0,
//       urls: [
//         'https://www.taobao.com',
//         'https://www.tmall.com',
//         'https://www.jd.com'
//       ]
//     }
//   },
//   template: `
//     <div>
//       <div>
//         <p v-show="linkIndex === 0">
//           <a v-bind:href="urls[0]" target="_blank">淘宝</a>
//         </p>
//         <p v-show="linkIndex === 1">
//           <a v-bind:href="urls[1]" target="_blank">天猫</a>
//         </p>
//         <p v-show="linkIndex === 2">
//           <a v-bind:href="urls[2]" target="_blank">京东</a>
//         </p>
//       </div>
//       <div>
//         <button v-on:click="changeIndex(0)">淘宝</button>
//         <button v-on:click="changeIndex(1)">天猫</button>
//         <button v-on:click="changeIndex(2)">京东</button>
//       </div>
//     </div>
//   `,
//   methods: {
//     changeIndex (index) {
//       this.linkIndex = index;
//     }
//   },
// }

// Vue.createApp(App).mount('#app');



const App = {
  data () {
    return {
      linkIndex: 0,
      aAttr: 'href',
      eventName: 'click',
      tag: 'tag',
      urls: [
        'https://www.taobao.com',
        'https://www.tmall.com',
        'https://www.jd.com'
      ],
      title: 'This is my title'
    }
  },
  template: `
    <div>
      <div>
        <h1 :[tag]="tag">{{ title }}</h1>
        <p v-show="linkIndex === 0">
          <a :[aAttr]="urls[0]" target="_blank">淘宝</a>
        </p>
        <p v-show="linkIndex === 1">
          <a :[aAttr]="urls[1]" target="_blank">天猫</a>
        </p>
        <p v-show="linkIndex === 2">
          <a :[aAttr]="urls[2]" target="_blank">京东</a>
        </p>
      </div>
      <div>
        <button @[eventName]="changeIndex(0)">淘宝</button>
        <button @[eventName]="changeIndex(1)">天猫</button>
        <button @[eventName]="changeIndex(2)">京东</button>
      </div>
    </div>
  `,
  methods: {
    changeIndex (index) {
      this.linkIndex = index;
    }
  },
}

Vue.createApp(App).mount('#app');