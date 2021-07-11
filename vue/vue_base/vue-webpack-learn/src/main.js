// import App from './App.vue';

// Vue.createApp(App).mount('#app');

const Article = {
  data () {
    return {
      title: 'This is a title',
      author: 'yueluo',
      dateTime: '2021-07-11 21:21:21',
      content: 'This is  a Content',
      like: 0,
      isLogin: true,
      isFollowed: false,
      myComment: "",
      commentList: []
    }
  },
  methods: {
    likeThisArticle () {
      this.like++;
    },
    followAction () {
      this.isFollowed = !this.isFollowed;
    },
    submitComment () {
      if (this.myComment.length > 0) {
        this.commentList.push({
          id: new Date().getTime(),
          dateTime: new Date(),
          content: this.myComment
        });
      }

      console.log(this.commentList);
    }
  },
}

Vue.createApp(Article).mount('#app');