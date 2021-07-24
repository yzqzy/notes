// const App = {
//   data () {
//     return {
//       studentCount: 0
//     }
//   },
//   template: `
//     <h1>{{ studentCountInfo }}</h1>
//     <h1>{{ studentCountInfo }}</h1>
//     <button @click="addStudentCount">ADD STUDENT COUNT</button>
//   `,
//   computed: {
//     studentCountInfo () {
//       return this.studentCount > 0 ? ('学生数：' + this.studentCount) : '暂无学生';
//     }
//   },
//   methods: {
//     addStudentCount () {
//       this.studentCount += 1;
//     }
//   },
// }


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
  methods: {
    compute (type) {
      this.type = type;
    }
  },
  computed: {
    // 默认为 getter
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
    },
    calData: {
      get () {
        return {
          a: 'number a:' + this.a,
          b: 'number b:' + this.b,
          type: 'computed type:' + this.type,
          result: 'computed result:' + this.result
        }
      },
      set (newVal) {
        this.a = Number(newVal.a.split(':')[1]);
        this.b = Number(newVal.b.split(':')[1]);
        this.type = newVal.type.split(':')[1];
      }
    }
  }
}

const vm = Vue.createApp(App).mount('#app');

vm.calData = {
  a: 'number a:100',
  b: 'number b:200',
  type: 'computed type:div',
}