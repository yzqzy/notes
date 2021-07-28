import './main.scss';

const App = {
  data () {
    return {
      isActive: true
    }
  },
  template: `
    <div :class="{ active: isActive }"></div>
  `
};

Vue.createApp(App).mount('#app');