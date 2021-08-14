const App = {
  data () {
    return {
      isLogin: true,
      username: 'yueluo',
      listShow: false
    }
  },
  template: `
    <div>
      <div class="user">
        <template v-if="isLogin">
          <span>Welcome， {{ username }}</span>
          <div>
            <a href="javascript:;" @click="changeListShow">个人中心</a>
            <ul v-show="listShow">
              <li>
                <a href="#">我的资料</a>
              </li>
              <li>
                <a href="#">我的账号</a>
              </li>
              <li>
                <a href="#">我的钱包</a>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <a href="#">登录</a>
          <a href="#">注册</a>
        </template>
      </div>
    </div>
  `,
  methods: {
    changeListShow () {
      this.listShow = !this.listShow;
    }
  },
};

Vue.createApp(App).mount('#app');