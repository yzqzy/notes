import qs from 'qs';

const App = {
  data () {
    return {
      order: 0,
      questionData: {},
      myAnswer: -1,
      myResults: []
    }
  },
  template: `
    <div>
      <div v-if="myResults.length > 0">
        <h1>考试结果：</h1>
        <ul>
          <li
            v-for="(item, index) of myResults"
            :key="item.qid"
          >
            <h2>编号：{{ item.qid }}</h2>
            <p>题目：{{ item.question }}</p>
            <p>你的答案：{{ item.myAnswer }}</p>
            <p>正确答案：{{ item.rightAnswer }}</p>
            <p>正确：{{ isRightText(item.isRight) }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <h1>编号：{{ questionData.id }}</h1>
        <p>{{ questionData.question }}</p>
        <div>
          <button
            v-for="(item, index) of questionData.items"
            :key="item"
            @click="selectAnswer(index)"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>    
  `,
  mounted () {
    this.getQuestion(this.order);
  },
  watch: {
    order (newVal, oldVal) {
      this.uploadAnswer(oldVal, this.myAnswer);
      this.getQuestion(newVal);
    }
  },
  computed: {
    isRightText () {
      return function (isRight) {
        return isRight ? '是' : '否';
      }
    }
  },
  methods: {
    getQuestion (order) {
      axios.post('http://localhost:4000/getQuestion', qs.stringify({
        order
      }))
        .then(res => {
          const result = res.data;

          if (result.errorCode) {
            this.myResults = result.data;
            return;
          }

          this.questionData = result.data;
        });
    },
    uploadAnswer (order, myAnswer) {
      axios.post('http://localhost:4000/uploadAnswer', qs.stringify({
        order,
        myAnswer
      })).then(res => {
        console.log(res.data);
      });
    },
    selectAnswer (index) {
      this.myAnswer = index;
      this.order += 1;
    }
  },
}

Vue.createApp(App).mount('#app');