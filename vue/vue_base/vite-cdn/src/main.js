// const { createApp } = Vue;

// const App = {
//   data () {
//     return {
//       text: 'Hello Vue！！！'
//     }
//   },
//   template: `
//     <div>
//       <h1>{{ text }}</h1>
//       <button @click="change">Change</button>
//     </div>
//   `,
//   methods: {
//     change () {
//       this.text = 'Hello Vite';
//     }
//   }
// }

// createApp(App).mount('#app');


const { createApp, ref } = Vue;

const App = {
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  setup () {
    const text = ref('Hello Vue!!!');

    const change = () => {
      text.value = 'Hello Vite!!!'
    };

    return {
      text,
      change
    };
  }
}

createApp(App).mount('#app');