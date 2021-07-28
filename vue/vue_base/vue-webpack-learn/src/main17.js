import './main.scss';

const MyAlert = {
  data () {
    return {
      title: 'This is a Alert',
      content: 'This is a Alter Content',
      isShow: true,
      hasError: true,
      alertClassObject: {
        show: true,
        danger: true
      },
      showClass: 'show',
      errorClass: 'danger'
    }
  },
  computed: {
    alertClassObject2 () {
      return {
        show: this.isShow,
        danger: this.isShow && this.hasError
      };
    }
  },
  template: `
    <!-- <div class="my-alert danger show"></div> -->
    <!-- <div
      class="my-alert"
      :class="{
        // 添加某个样式类名的条件
        show: isShow,
        danger: hasError
      }"
    > -->
    <!-- <div
      class="my-alert"
      :class="alertClassObject"
    > -->
    <!-- <div
      class="my-alert"
      :class="alertClassObject2"
    > -->
    <!-- <div
    :class="['my-alert', showClass, errorClass]"
    > -->
    <!-- <div
      :class="[
        'my-alert',
        isShow ? showClass : '',
        isShow && hasError ? errorClass : ''
      ]"
    > -->
    <div
      :class="[
        'my-alert',
        hasError ? errorClass : ''
      ]"
    >
      <header class="header">
        <h1>{{ title }}</h1>
      </header>
      <div class="content">
        <p>{{ content }}</p>
      </div>
      <div class="btn-group">
        <button>Confrim</button>
      </div>
    </div>
  `
}

const App = {
  components: {
    MyAlert
  },
  data () {
    return {
      showClass: 'show'
    }
  },
  template: `
    <!-- class 与 组件内部 class 会合并 -->
    <my-alert :class="showClass" />
  `
};

Vue.createApp(App).mount('#app'); 