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
      errorClass: 'danger',
      btnBgColor: 'red',
      btnStyle: {
        color: '#fff',
        backgroundColor: 'red'
      },
      commonBtnStyle: {
        borderRadius: '17px'
      }
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
        <!-- <button
          :style="{
            color: '#fff',
            // backgroundColor: 'red',
            // 'background-color': 'red'
            // backgroundColor: btnBgColor
          }"
        > -->
        <!-- <button
          :style="btnStyle"
        > -->
        <!-- <button
          :style="[btnStyle, commonBtnStyle]"
        > -->
        <!-- 渲染数组中最后一个被浏览器支持的值，如果浏览器本身支持不带前缀的值，那就渲染不带前缀的值 -->
        <!-- <button
          :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
        > -->
        <!-- :style 中，vue 会在运行时自动检测添加相应的前缀，如果不需要前缀，会去掉前缀 -->
        <button
          :style="[
            btnStyle,
            {
              '-webkit-transition': 'opacity .3s'
            }
          ]"
        >
          Confrim
        </button>
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