// const App = {
//   data () {
//     return {
//       title: 'This is my title'
//     }
//   },
//   template: `
//     <div>
//       <h1 class="title">{{ title }}</h1>
//     </div>
//   `
// }

// Vue.createApp(App).mount('#app');


// import Mustache from 'mustache';

// var data = {
//   title: 'This is my title for Mustache'
// }

// var html = Mustache.render(
//   `<h1>{{ title }}</h1>`,
//   data
// );

// document.getElementById('app').innerHTML = html;


// const App = {
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
//       <h1 class="title">{{ title }}</h1>
//       <p>
//         <span class="author">{{ author }}</span> - {{ dateTime }}
//       </p>
//       <p :title="content">
//         {{ content }}
//       </p>
//     </div>
//   `
// }

// Vue.createApp(App).mount('#app');



import { h } from 'vue';

const App = {
  data () {
    return {
      title: 'This is my title',
      author: 'xiaoye',
      dateTime: new Date(),
      content: 'This is my content'
    }
  },
  render () {
    return h(
      'div',
      {},
      [
        h(
          'h1',
          {
            class: 'title'
          },
          this.title
        ),
        h(
          'p',
          {},
          [
            h(
              'span',
              {
                class: 'author',
              },
              this.author
            ),
            `- ${this.dateTime}`
          ]
        ),
        h(
          'p',
          {
            title: this.content
          },
          this.content
        )
      ]
    )
  }
}

Vue.createApp(App).mount('#app');