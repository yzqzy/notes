// const Title = {
//   props: {
//     title: String
//   },
//   template: `
//     <h1>{{ title }}</h1>
//   `
// }

// const App = {
//   components: {
//     Title
//   },
//   data () {
//     return {
//       title: 'This is my title',
//       author: 'xiaoye',
//       dateTime: new Date(),
//       content: 'This is my content'
//     }
//   },
//   template: `
//     <div>
//       <Title :title="title" />
//       <p>
//         <span class="author">{{ author }}</span> - {{ dateTime }}
//       </p>
//       <p :title="content">
//         {{ content }}
//       </p>
//       <button @click="changeTitle">Change Title</button>
//     </div>
//   `,
//   methods: {
//     changeTitle () {
//       this.title = "This is App title";
//     }
//   },
// }


// const TITLE = 'This is my title';

// const App = {
//   data() {
//     return {
//       title: 'This is my title',
//       author: 'yueluo'
//     }
//   },
//   template: `
//     <div>
//       <h1>${ TITLE } - {{ author }}</h1>
//       <h1>{{ title }} - {{ author }}</h1>
//       <button @click="changeTitle">ChangeTitle</button>
//     </div>
//   `,
//   methods: {
//     changeTitle () {
//       this.title = 'This is change title';
//       this.author = '月落';
//     }
//   },
// }


const App = {
  data() {
    return {
      title: '<h1>This is my title<h1>' ,
      xss: '<img src="123" onerror="alert(123)" />'
    }
  },
  template: `
    <div>{{ title }}</div>
    <div v-html="title" />
    <div v-html="xss" />
  `
}

Vue.createApp(App).mount('#app');