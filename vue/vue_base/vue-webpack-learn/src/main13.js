const App = {
  data () {
    return {
      a: 1,
      b: 2,
      type: 'plus'  
    }
  },
  template: `
    <div>
      <h1>{{ result }}</h1>
      <p>
        <span>{{ a }}</span>
        <span>{{ sym }}</span>
        <span>{{ b }}</span>
        <span>=</span>
        <span>{{ result }}</span>
      </p>
      <div>
        <input type="number" v-model="a" />
        <input type="number" v-model="b" />
      </div>
      <div>
        <button @click="compute('plus')">+</button>
        <button @click="compute('minus')">-</button>
        <button @click="compute('mul')">*</button>
        <button @click="compute('div')">/</button>
      </div>
    </div>
  `,
  watch: {
    result (newVal, oldVal) {
      console.log(newVal, oldVal);

      var finalResult = this.formatResult();

      console.log(finalResult);
    },
    a (newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  methods: {
    compute (type) {
      this.type = type;
    },
    formatResult () {
      return {
        'number_a': this.a,
        'number_b': this.b,
        'cal_type': this.type,
        'computed_result': this.result
      }
    }
  },
  computed: {
    sym () {
      switch (this.type) {
        case 'plus':
          return '+';
        case 'minus':
          return '-';
        case 'mul':
          return '*';
        case 'div':
          return '/';
        default:
          break;
      }
    },
    result: {
      get () {
        const a = Number(this.a);
        const b = Number(this.b);

        switch (this.type) {
          case 'plus':
            return a + b;
          case 'minus':
            return a - b;
          case 'mul':
            return a * b;
          case 'div':
            return a / b;
          default:
            break;
        }
      }
    }
  }
}

const vm = Vue.createApp(App).mount('#app');