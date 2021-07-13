const MyTitle = {
  props: ['content'],
  template: `
		<h1>
			<slot></slot>
		</h1>
	`
}

const MyAuthor = {
  template: `
		<p>
			Author: <slot></slot>
    </p>
	`
}

const MyContent = {
  template: `
		<p><slot></slot></p>
	`
}

const App = {
  components: {
  	MyTitle,
    MyAuthor,
    MyContent
  },
  data () {
    return {
      title: 'This is a Title',
      author: 'yueluo',
      content: 'This is a Content',
      beforeInit: new Date().getTime(),
    }
  },
  template: `
		<div>
			<my-title>{{ title }}</my-title>
			<my-author>{{ author }}</my-author>
      <my-content>{{ content }}</my-content>
		</div>
	`,
  beforeCreate () {
    this.beforeInit = new Date().getTime();
  },
  mounted () {
    console.log(new Date().getTime() - this.beforeInit);
  },
}

Vue.createApp(App).mount('#app');