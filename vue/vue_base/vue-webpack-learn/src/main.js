// const App = {
//   data () {
//     return {
//       imgUrl: 'https://data.yueluo.club/icon/icon.png',
//       title: '头像',
//       content: '个人头像',
//       isLogin: true
//     }
//   },
//   template: `
//     <article>
//       <h1>{{ title }}</h1>
//       <div>
//         <img style="width: 100px; height: 100px;" :src="imgUrl" />
//       </div>
//       <p
//         :title="content"
//         :id="null"
//         :class="undefined"
//       >
//         {{ content }}
//       </p>
//       <p>
//         <textarea
//           :disabled="!isLogin"
//           placeholder="请填写评论"
//         />
//       </p>
//     </article>
//   `
// }


var App = {
  data () {
    return {
      a: 1,
      b: 2,
      title: 'main title',
      subTitle: 'sub title'
    }
  },
  template: `
    <!-- 数学运算表达式 -->
    <h1 :title="a + b">{{ a + b }}</h1>
    <!-- 字符串拼接 -->
    <h2>{{ 'a + b = ' + (a + b) }}</h2>
    <!-- 判断表达式 -->
    <h3>{{ a + b > 5 ? '大于 5' : '小于等于 5' }}</h3>
    <h3>{{ title || subTitle }}</h3>
    <h3>{{ title && subTitle }}</h3>
    <!-- 使用 JS API -->
    <h4>{{ title.replace('main', '') }}</h4>
    <h4>{{ subTitle.split('').reverse().join('-') }}</h4>
    <!-- 不能绑定多个表达式 -->
    <!--
    <h5>
      {{ 
        'a + b = ' + (a + b)
        title
      }}
    </h5>
    报错
    -->
    <!-- 不能绑定语句 -->
    <!-- {{ var a = 1; }} 报错，声明赋值语句 -->
    <!-- {{ a = 1; }} 报错， -->
    {{ a = 1 }} <!-- 赋值表达式 -->
  `
}

Vue.createApp(App).mount('#app');