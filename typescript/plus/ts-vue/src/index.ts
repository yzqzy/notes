import { createApp } from 'vue';
import Hello from './components/Hello.vue';

// createApp({
//   data() {
//     return {
//       name: "typescript"
//     }
//   },
//   template: `<h1>Hello {{name}}</h1>`
// }).mount('#app');

createApp({
  components: {
    Hello
  },
  template: `<hello />`
}).mount('#app');

