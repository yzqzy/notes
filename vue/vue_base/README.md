# Vue

## 渐进式框架、三大框架对比、数据流和绑定

Vue （发音类似于 view），是一套用于构建用户界面的渐进式框架。与其他大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整理。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

> 渐进式框架（progresive framework）：vue 对自己框架和其他框架对比后，生产的一个特定的名词。



Angular 是一个综合性框架，相对于 Vue 来说是一个开发平台。更加关注项目应用，不是只解决视图渲染或者状态管理。适合开发大型应用。项目级别应用。自上而下的开发。

React 仅关注用户界面，view 层，将数据渲染到视图中，它仅关注一个点，即视图，是一个库。不提供状态管理和路由，需要依赖 redux 和 react-router。

Vue 仅关注用户界面，view 层，关注把数据渲染到视图中，仅关注一个点视图。核心库只关心视图层。它和 React 不同的是，还提供了 vuex 、vue-router 库，可以选择集成，没有任何学习难度。



Micro libs 微型库。



React 和 Vue 都是自下向上开发，Angular 是自顶向下开发。

Vue 和 Angular 相对于 React 是强规范，约束性很强。React 没有特殊性，可以使用 class 或者 函数，只是要求使用 JSX 开发视图。

React 比较灵活，可以有自己千变万化的设计思路。

Vue 先给一个关注点视图，如果需要状态管理，路由和 SSR，都可以找到相对应的方案，这就是 Vue 渐进式的思想。



数据绑定和数据流

数据绑定即数据与视图渲染直接的关系

* React 是单向数据绑定，必须通过事件触发数据的修改，导致视图变更；
* Vue  是双向数据绑定，存在 v-model 机制，可以完成视图变化导致 state/data 变更，v-model 封装了事件处理函数；



数据流即父子组件中数据按照什么方向流动。

React 和 Vue 都是单向数据流，父组件传递 state 给子组件作为 props，子组件获取的 props 变更，不能导致 state 变更。只能父组件的 state 变更导致子组件的 props 变更。

>  props：immutable value、state/data：mutable value

## Vue 项目的构建方式

### vite、CDN 的方式

vue3：https://v3.cn.vuejs.org/guide/introduction.html

> https://unpkg.com/browse/vue@3.1.4/dist/

> https://unpkg.com/browse/vue@3.1.2/dist/vue.global.js
>
> 可以选择版本，这里演示的是 vue2 的版本。

```js
yarn add vite -D
```

```js
"scripts": {
  "dev": "vite"
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div id="app"></div>

    <script src="https://unpkg.com/vue@3.1.2/dist/vue.global.js"></script>
    <script type="module" src="./src/main.js"></script>

</body>

</html>
```

```js
// main.js

const { createApp } = Vue;

const App = {
  data () {
    return {
      text: 'Hello Vue！！！'
    }
  },
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  methods: {
    change () {
      this.text = 'Hello Vite';
    }
  }
}

createApp(App).mount('#app');

// vue2
// new Vue({
//  render: h => h(App)
//}).$mount('#app');
```

```js
yarn dev
```



```js
// main.jconst { createApp, ref } = Vue;

const App = {
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  setup () {
    const text = ref('Hello Vue!!!');

    const change = () => {
      text.value = 'Hello Vite!!!'
    };

    return {
      text,
      change
    };
  }
}

createApp(App).mount('#app');s

const { createApp, ref } = Vue;

const App = {
  template: `
    <div>
      <h1>{{ text }}</h1>
      <button @click="change">Change</button>
    </div>
  `,
  setup () {
    const text = ref('Hello Vue!!!');

    const change = () => {
      text.value = 'Hello Vite!!!'
    };

    return {
      text,
      change
    };
  }
}

createApp(App).mount('#app');
```

### vitejs 的方式

可以使用 create-vite-app 的方式创建 vite 项目。

```js
npm init @vitejs/app vue-vite // 使用命令并搭建 vue 项目
```

```js
yarn dev
```

这种构建方式只针对于 vue3，只可以开发 vue 3。



vite 也可以使用 cdn 引入 vue 的方式，可以减少打包体积。

### vue-cli 脚手架

```js
npm i @vue/cli -g
```

```js
vue create vue-cli-demo
```

> 3.x 很大程度上是向后兼容的。

```js
yarn serve
```



改造：NPM 转为 CDN 地址

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>

    <!-- built files will be auto injected -->
    
    <script src="https://unpkg.com/vue@3.1.2/dist/vue.global.js"></script>

  </body>
</html>
```

main.js

```js
// import { createApp } from 'vue'; 引入全局 CDN 文件，不使用 NPM 库

const { createApp } = Vue;

import App from './App.vue'

createApp(App).mount('#app')
```

vue.config.js

```js
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue'
    }
  }
}
```

可以安装 dev-tools ，调试 vue 项目。

## webpack 搭建 vue2/3 项目

```js
mkdir vue-webpack
```

```js
npm init -y
```

```js
yarn add webpack@4.44.2 webpack-cli@3.3.12 webpack-dev-server@3.11.2 -D
```

```js
"dev": "webpack-dev-server"
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app"></div>
	
  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.1.2/dist/vue.global.js"></script>
  
</body>
</html>
```



```js
yarn add vue-loader@next @vue/compiler-sfc vue-template-compiler html-webpack-plugin@4.5.0 -D
```

> vue 2 需要降低 vue-loader 版本，上述配置支持 vue3，测试项目可以自己搭建，生产环境建议还是使用脚手架工具
>
> 低版本：npm i vue-loader -D
>
> 高版本：npm i vue-loader@next -D



```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js'
  },
  externals: {
    'vue': 'Vue'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
```

```js
yarn dev
```

## vue 基本用法

vue 核心：对模板语法方式进行编译，渲染 DOM。

* template：组件模板
* script：组件逻辑模块
* style：组件样式

组件逻辑的本质就是一个对象，里面有很多特定的属性。

vue 将数据与 DOM 进行关联，并建立响应式关系。所谓响应式，就是数据改变，视图更新。

数据  => ViewModel 核心库 => 视图。

> react 不支持视图修改，数据修改，vue 支持。React 必须有事件驱动更改 state，修改视图。
>
> 如果不看 v-model，vue 也可以被称为单向数据流。vue 完成了数据双向绑定的机制，使我们的业务关注点全部可以放到业务逻辑层，视图层交由 ViewModel 完成绑定数据、渲染和更新。 

```js
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
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app">
    <div class="article">
      <!-- 插值表达式 -->
      <h1>{{ title }}</h1>
      <p>
        <span>{{ author }} {{ dateTime }}</span>
      </p>
      <p>
        <span>Like: {{ like }}</span>
        <!-- v-on onClick/addEventListener 绑定事件处理函数 -->
        <!-- <button v-on:click="likeThisArticle">Like</button> -->
        <!-- v-* 都是 vue 的指令 -->
        <button v-if="isLogin" @click="likeThisArticle">Like</button>
        <button v-else disabled>Please login first！</button>
      </p>
      <p>
        <button @click="followAction">{{ isFollowed ? 'Followed' : 'Follow' }}</button>
      </p>
      <!-- v-bind 绑定属性，引号内部看作变量，vue 会对其进行解析 -->
      <!-- <p v-bind:title="content">{{ content }}</p> -->
      <p :title="content">{{ content }}</p>

      <div class="form">
        <p>{{ myComment }}</p>
        <!-- v-model oninput value =》 myComment -->
        <input type="text" placeholder="请填写评论" v-model="myComment" />
        <button @click="submitComment">Button</button>
      </div>
    </div>
    <div class="comment">
      <ul>
        <!-- key in obj，对象使用 -->
        <!-- (item, index) of arr，数组使用 -->
        <li v-for="item of commentList" :key="item.id">
          <p>
            <p>
              <span>{{ item.dateTime }}</span>
            </p>
            <span>{{ item.content }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>

  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.1.2/dist/vue.global.js"></script>
   
</body>
</html>
```

## vue 组件化构建

vue 组件化 => 核心 组件系统。

vue 利用 ES 模块化，来完成 vue 的组件系统构建。


组件化即抽象小型、独立、可预先定义配置的、可复用的组件。

小型：页面的构成拆分成一个一个的小单元独立开发。

独立：每一个小单元尽可能都独立开发

预先定义：小单元都可以先定义好，在需要的时候导入使用

预先配置：小单元可以接收一些在使用的时候需要的配置

可复用：一个小单元可以在多个地方使用



> 可复用性要适当考量，组件最大的作用是独立开发、预先配置。目的是为了更好的维护和扩展。
>
> 有些组件确实是不需要复用的。可配置性越高，功能就越强。



TodoList

```js
{
  id: new Date().getTime(),
  content: inputValue,
  completed: false
}

TodoList 组件
	data
  	todoList
  methods
  	removeTodo			id
    addTodo					inputValue
    changeCompleted	id
	tofo-form		 view
	todo-list	ul view
  	todo-item v-for  view
```



```js
// main.js

const { createApp } = Vue;

const TodoList = {
  data () {
    return {
      todoList: []
    }
  },
  methods: {
    removeTodo (id) {
      this.todoList = this.todoList.filter(item => item.id !== id);
    },
    addTodo (val) {
      console.log('1111')

      this.todoList.push({
        id: new Date().getTime(),
        content: val,
        completed: false
      });
    },
    changeCompleted (id) {
      this.todoList = this.todoList.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }

        return item;
      });
    }
  }
};

const app = createApp(TodoList);

app.component('todo-form', {
  data () {
    return {
      inputValue: ''
    }
  },
  template: `
    <div>
      <input type="text" placeholder="请填写" v-model="inputValue" />
      <button @click="addTodo">增加</button>
    </div>
  `,
  methods: {
    addTodo () {
      this.$emit('add-todo', this.inputValue);
      this.inputValue = '';
    }
  }
});

app.component('todo-item', {
  props: ['todo'],
  template: `
    <li>
      <input
        type="checkbox"
        :checked="todo.completed"
        @click="changeCompleted(todo.id)"
      />
      <span
        :style="{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }"
      >
        {{ todo.content }}
      </span>
      <button @click="removeTodo(todo.id)">删除</button>
    </li>  
  `,
  methods: {
    changeCompleted (id) {
      this.$emit('change-completed', id);
    },
    removeTodo (id) {
      this.$emit('remove-todo', id);
    }
  }
});

app.mount('#app');
```

```html
// index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app">
    <div class="todo-list">
      <div>
        <ul>
          <todo-form
            @add-todo="addTodo"
          />
        </ul>
      </div>
      <div>
        <ul>
          <todo-item
            v-for="item of todoList"
            :key="item.id"
            :todo="item"
            @change-completed="changeCompleted"
            @remove-todo="removeTodo"
          />
        </ul>
      </div>
    </div>
  </div>

  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.1.2/dist/vue.global.js"></script>
   
</body>
</html>
```



组件嵌套形成 vue 组件树。

## 应用实例、组件实例与根组件实例

### 应用实例

通过 createApp 创建出的实例。

```js
const app = Vue.createApp({}); // Application 应用
```

应用实例主要用来注册全局组件

```js
app.component('MyTitle', {
  data () {
    return {
      title: 'I Love Vue!!!'
    }
  },
  template: `<h1>{{ title }}</h1>`
});
```

实例上暴露了很多方法

* component 注册组件
* directive 注册指令
* filter 注册过滤器
* use 使用插件
* 。。。

大多数这样的方法都会返回 createApp 创建出来的应用实例。

```js
const app2 = app.component('MyTitle', {});

// app2 === app 
```

app2 === app，这意味着可以链式调用。

```js
app.component('MyTitle', {}).directive('toLowerCase', {
  mounted (el) {
    el.addEventListener('click', function () {
    	this.innerText = this.innerText.toLowerCase();
    });
  }
})
```

### 根组件实例

根组件的本质就是一个对象。`{}`

createApp 执行的时候需要一个根组件，`createApp({})`，根组件时 Vue 渲染的起点。

根元素时一个 HTML 元素，createApp 执行创建 Vue 应用实例时，需要一个 HTML 根元素。

```html
<div id="app"></div>
```

```js
const RootComponent = {
  data () {
    return {
      a: 1,
      b: 2,
      total: 0
    }
  },
  mounted () {
  	this.plus();
  },
  methods: {
    plus () {
      this.total = this.a + this.b;
    }
  },
  template: `
		<h1>{{ a }} + {{ b }} = {{ total }}</h1>
	`
}

const app = Vue.createApp(RootComponent);

const vm = app.mount('#app');
```

mount 方法返回的根组件实例，vm。vm 即 ViewModel，MVVM => vm。

Vue 不是一个完整的 MVVM 模型，只是参考了 MVVM 模型。

### 组件实例

每个组件都有自己的组件实例，一个应用中所有的组件都共享一个应用实例。

无论是根组件还是应用内其他的组件，配置选项、组件行为都是一样的。

```js
const MyTitle = {
  props: ['content'],
  template: `
		<h1 :title="content">
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
      content: 'This is a Content'
    }
  },
  template: `
		<div>
			<my-title :content="content">{{ title }}</my-title>
			<my-author>{{ author }}</my-author>
      <my-content>{{ content }}</my-content>
		</div>
	`
}

const app = Vue.createApp(App);

const vm = app.mount('#app');

console.log(vm);
```

组件实例可以添加一些属性 property。

```js
data/props/components/methods ...
this -> $attrs/$emit  Vue 组件实例内置方法
```

### 生命周期函数

组件是有初始化过程的，在这个过程中，Vue 提供了很多每个阶段运行的函数，函数会在对应的初始化阶段自动运行。

 <img src="./images/lifecycle.png" style="zoom: 40%;" />

## 认识及实现 MVC

M：数据模型（模型层），操作数据库（对数据进行增删改查的操作）

V：视图层，显示视图或者模板

C：控制器，逻辑层，将数据和视图关联挂载，可以由一些基础逻辑操作，可以充当 API 层，前端请求的 API 对应的是控制器



服务端渲染：

>  前端异步请求 URL，控制器中的一个方法，通过 Model 层的方法，操纵数据库，获取数据，返回给控制器方法，响应回前端。

服务端渲染：

>  View 需要数据，控制器对应方法，调用 Model  方法，获取数据，返回给控制器方法，render 到 view 中。



前端：

Model：管理视图所需要的数据，数据关联，数据与视图关联

View：HTML 模板和视图渲染

Controller：管理事件逻辑



加减乘除计算器

```js
Model -> data -> a b s r
				 监听 data change，update view
         
View -> template -> render 

Controller -> event trigger -> model/data
```

```js
controller -> model -> view -> controller

MVVM 雏形
```



```js
(function () {

  function init () {
    model.init(); // 组织数据，数据监听/数据代理
    view.render(); // 组织 HTML 模板，渲染 HTML 模板
    controller.init(); // 事件处理函数定义，事件处理函数绑定
  }

  var model = {
    data: {
      a: 0,
      b: 0,
      s: '+',
      r: 0
    },
    init: function () {
      var _this = this;

      for (var k in _this.data) {
        (function (k) {
          Object.defineProperty(_this, k, {
            get: function () {
              return _this.data[k];
            },
            set: function (newVal) {
              _this.data[k] = newVal;

              view.render({
                [k]: newVal
              });
            }
          })
        })(k);
      }
    }
  }

  var view = {
    el: '#app',
    template: `
      <p>
        <span class="cal-a">{{ a }}</span>
        <span class="cal-s">{{ s }}</span>
        <span class="cal-b">{{ b }}</span>
        <span>=</span>
        <span class="cal-r">{{ r }}</span>
      </p>
      <p>
        <input type="text" placeholder="Number a" class="cal-input a" />
        <input type="text" placeholder="Number b" class="cal-input b" />
      </p>
      <p>
        <button class="cal-btn">+</button>
        <button class="cal-btn">-</button>
        <button class="cal-btn">*</button>
        <button class="cal-btn">/</button>
      </p>
    `,
    render: function (mutedData) {
      if (!mutedData) {
        this.template = this.template.replace(
          /\{\{(.*?)\}\}/g,
          function (node, key) {
            return model[key.trim()];
          }
        )

        var container = document.createElement('div');

        container.innerHTML = this.template;
  
        document.querySelector(this.el).appendChild(container);
      } else {
        for (var k in mutedData) {
          document.querySelector('.cal-' + k).textContent = mutedData[k];
        }
      }
    }
  }

  var controller = {
    init: function () {
      var oCalInputs = document.querySelectorAll('.cal-input'),
          oCalBtns = document.querySelectorAll('.cal-btn'),
          inputItem,
          btnItem;

      for (var i = 0; i < oCalInputs.length; i++) {
        inputItem = oCalInputs[i];

        inputItem.addEventListener('input', this.handleInput, false);
      }

      for (var i = 0; i < oCalBtns.length; i++) {
        btnItem = oCalBtns[i];

        btnItem.addEventListener('click', this.handleBtnClick, false);
      }
    },
    handleInput: function (e) {
      var tar = e.target,
          value = Number(tar.value),
          field = tar.className.split(' ')[1];

      model[field] = value;
    
      with (model) {
        r = eval('a' + s + 'b');
      }
    },
    handleBtnClick: function (e) {
      var type = e.target.textContent;

      model.s = type;

      with (model) {
        r = eval('a' + s + 'b');
      }
    }
  }

  init();

})();
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="app"></div>

  <script src="./mvc.js"></script>

</body>
</html>
```



MVVM 实际上就是 MVVM 的雏形，MVVM 解决了驱动不集中、不内聚，解决了视图和模型完全隔离的现状。

Vue 是关注于视图渲染，vue  核心来说只是一个视图渲染库。核心库只关注视图层。

angular 是 MVW，whatever。vue 是 MVVM，vm  其实也相当于 whatever。

##  认识及实现 MVVM

MVC 缺点：

* 驱动被 MVC 分离成三部分，和普通 M V 的逻辑混合在一起

MVVM 驱动 VM，ViewModel。

M - Model 数据保存和处理、V - 视图。ViewModel 。

> vue 存在 ref 属性可以操作真实节点，不符合 MVVM 的要求。并没有彻底分离 view 和 model 层。



MVVM 不是一种框架，也不是设计模式，而是一种设计思想。



```js
mvvm
	shared
  src
  vm
  index.html
```



/shared/utils.js

```js
const reg_check_str = /^[\'|\"].+?[\'|\"]$/;
const reg_str = /[\'|\"]/g;

export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

export function hasOwnProperty (target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual (newVal, oldVal) {
  return newVal === oldVal;
}

export function randomNum () {
  return new Date().getTime() + parseInt(Math.random() * 10000);
}

export function formatData (str) {
  if (reg_check_str.test(str)) {
    return str.replace(reg_str, '');
  }

  switch (str) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      break;
  }

  return Number(str);
}
```



src/app.js

```js
import { createApp, useReactive } from '../vm';

function App () {
  const state = useReactive({
    count: 0,
    name: 'yueluo'
  });

  const add = (num) => {
    state.count += num;
  }

  const minus = (num) => {
    state.count -= num;
  }

  const changeName = (name) => {
    state.name = name;
  }

  return {
    template: `
      <h1>{{ count }}</h1>
      <h2>{{ name }}</h2>
      <button onClick="add(2)">+</button>
      <button onClick="minus(1)">-</button>
      <button onClick="changeName('月落')">Change Name</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName
    },
  }
}

createApp(
  App,
  document.getElementById('app')
)
```



vm/compiler/event.js

```js
import { formatData, randomNum } from '../../shared/utils';

const reg_onClick = /onClick\=\"(.+?)\"/g;
const reg_fnName = /^(.+?)\(/;
const reg_args = /\((.*?)\)/;

const eventPool = [];

export function eventFormat (template) {
  return template.replace(reg_onClick, function (node, key) {
    const _mark =  randomNum();

    eventPool.push({
      mark: _mark,
      hander: key.trim(),
      type: 'click'
    });

    return `data-mark="${_mark}"`;
  });
}

export function bindEvent (methods)  {
  const allElements = document.querySelectorAll('*');

  let oItem = null;
  let _mark = 0;

  eventPool.forEach(event => {
    for (let i = 0; i < allElements.length; i++) {
      oItem = allElements[i];

      _mark = parseInt(oItem.dataset.mark);

      if (event.mark === _mark) {
        oItem.addEventListener(event.type, function () {
          const fnName = event.hander.match(reg_fnName)[1];
          const args = formatData(event.hander.match(reg_args)[1]);

          methods[fnName](args);
        }, false);
      }
    }
  });
}
```

vm/compiler/state.js

```js
import { randomNum } from "../../shared/utils";

const reg_html = /\<.+?\>\{\{(.*?)\}\}<\/.+?\>/g;
const reg_tag = /\<(.+?)\>/;
const reg_var = /\{\{(.+?)\}\}/g;

export const statePool = [];

let o = 0;

export function stateFormat (template, state) {
  let _state = {};

  template = template.replace(reg_html, function (node, key) {
    const matched = node.match(reg_tag);
    const _mark = randomNum();

    _state.mark = _mark;

    statePool.push(_state);

    _state = {};

    return `<${matched[1]} data-mark="${_mark}">{{${key}}}</${matched[1]}>`
  });

  template =  template.replace(reg_var, function (node, key) {
    let _var = key.trim();

    const _varArr = _var.split('.');

    let i = 0;
    
    while (i < _varArr.length) {
      _var = state[_varArr[i]];
      i++;
    }

    statePool[o].state = _varArr;
    o++;

    return _var;
  });

  return template;
}
```



vm/reactive/index.js

```js
import { isObject } from '../../shared/utils';
import { mutableHandler } from './mutableHandler';

export function useReactive (target) {
  return createReactObject(target, mutableHandler);
}

function createReactObject (target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }

  const observer = new Proxy(target, baseHandler);

  return observer;
}
```

vm/reactive/mutableHandler.js

```js
import { useReactive } from ".";
import { hasOwnProperty, isEqual, isObject } from "../../shared/utils";
import { statePool } from "../compiler/state";
import { update } from "../render";

const get = createGetter(),
      set = createSetter();

function createGetter () {
  return function get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);

    if (isObject(res)) {
      return useReactive(res);
    }

    return res;
  }
}

function createSetter () {
  return function set (target, key, value, receiver) {
    const isKeyExist = hasOwnProperty(target, key),
          oldVal = target[key],
          res = Reflect.set(target, key, value, receiver);

    if (!isKeyExist) {

    } else if (!isEqual(value, oldVal)) {
      update(statePool, key, value);
    }

    return res;
  }
}

const mutableHandler = {
  get,
  set
}

export {
  mutableHandler
}
```

vm/index.js

```js
export { useReactive } from './reactive';
export { createApp } from './render';
export { eventFormat } from './compiler/event';
export { stateFormat } from './compiler/state';
```

vm/render.js

```js
import { bindEvent } from './compiler/event';
import { eventFormat, stateFormat } from './index';

export function createApp (root, rootDom) {
  const { template, state, methods } = typeof root === 'function' ? root() : root;

  rootDom.innerHTML = render(template, state);

  bindEvent(methods);
}

export function render (template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);

  return template;
}

export function update (statePool, key, value) {
  const allElements = document.querySelectorAll('*');

  let oItem = null;

  statePool.forEach(item => {
    if (item.state[item.state.length - 1] === key) {
      for (let i = 0; i < allElements.length; i++) {
        oItem = allElements[i];

        const _mark = parseInt(oItem.dataset.mark);

        if (item.mark === _mark) {
          oItem.innerHTML = value;
        }
      }
    }
  });
}
```



index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="app"></div>

  <script type="module" src="./src/app.js"></script>

</body>
</html>
```



## 认识 Mustache 与 Vue 编译

模板语法：template 内的 HTML 字符串，存在 vue 特性，比如文本，表达式，属性，指令。

Vue 的模板都是基于 HTML，模板中直接写 HTML 都是能够被 HTML 解析器解析的。

Vue 表达式 / 自定义属性 / 指令 ，Vue 提供了一套模板编译系统，即将 HTML 字符串转化成 AST 树，形成虚拟 DOM 树，进行渲染。



插值表达式

```vue
const App = {
  data () {
    return {
      title: 'This is my title'
    }
  },
  template: `
    <div>
      <h1 class="title">{{ title }}</h1>
    </div>
  `
}

Vue.createApp(App).mount('#app');
```

Mustache：用更少的逻辑来处理模板渲染，github 存在 mustache 库，vue 参考了其实现，但其内部没有使用该库。

Vue 中没有使用 mustache 库，它有自己的模板编译系统。



Mustache 库

```js
npm install mustache --save
```

```js
import Mustache from 'mustache';

var data = {
  title: 'This is my title for Mustache'
}

var html = Mustache.render(
  `<h1>{{ title }}</h1>`,
  data
);

document.getElementById('app').innerHTML = html;
```



```vue
const App = {
  data () {
    return {
      title: 'This is my title',
      author: 'xiaoye',
      dateTime: new Date(),
      content: 'This is my content'
    }
  },
  template: `
    <div>
      <h1 class="title">{{ title }}</h1>
      <p>
        <span class="author">{{ author }}</span> - {{ dateTime }}
      </p>
      <p :title="content">
        {{ content }}
      </p>
    </div>
  `
}

Vue.createApp(App).mount('#app');
```

```js
import { h } from 'vue';

const App = {
  data () {
    return {
      title: 'This is my title',
      author: 'xiaoye',
      dateTime: new Date(),
      content: 'This is my content'
    }
  },
  render () {
    return h(
      'div',
      {},
      [
        h(
          'h1',
          {
            class: 'title'
          },
          this.title
        ),
        h(
          'p',
          {},
          [
            h(
              'span',
              {
                class: 'author',
              },
              this.author
            ),
            `- ${this.dateTime}`
          ]
        ),
        h(
          'p',
          {
            title: this.content
          },
          this.content
        )
      ]
    )
  }
}

Vue.createApp(App).mount('#app');
```

## 认识 Vue 内置指令

```vue
const Title = {
  props: {
    title: String
  },
  template: `
    <h1>{{ title }}</h1>
  `
}

const App = {
  components: {
    Title
  },
  data () {
    return {
      title: 'This is my title',
      author: 'xiaoye',
      dateTime: new Date(),
      content: 'This is my content'
    }
  },
  template: `
    <div>
      <Title :title="title" />
      <p>
        <span class="author">{{ author }}</span> - {{ dateTime }}
      </p>
      <p :title="content">
        {{ content }}
      </p>
      <button @click="changeTitle">Change Title</button>
    </div>
  `,
  methods: {
    changeTitle () {
      this.title = "This is App title";
    }
  },
}

Vue.createApp(App).mount('#app');
```



directive 指令：所有在 Vue 中，模板上的属性 v-* 都是指令。



为什么叫做指令？

模板应该按照怎样的逻辑进行渲染或绑定行为。



Vue 提供了大量的内置指令，v-if、v-else、v-for、v-show、v-html、v-once。

开发者也可以自定义指令，v-取名。

### v-once

v-once：一次插值，永不更新。

```vue
const App = {
  data() {
    return {
      title: 'This is my title'
    }
  },
  template: `
    <div>
      <h1 v-once>{{ title }}</h1>
      <h1>{{ title }}</h1>
      <button @click="changeTitle">ChangeTitle</button>
    </div>
  `,
  methods: {
    changeTitle () {
      this.title = 'This is change title'
    }
  },
}

Vue.createApp(App).mount('#app');
```



使用 v-once 后会影响整个节点。

```vue
const App = {
  data() {
    return {
      title: 'This is my title',
      author: 'yueluo'
    }
  },
  template: `
    <div>
      <h1 v-once>{{ title }} - {{ author }}</h1>
      <h1>{{ title }} - {{ author }}</h1>
      <button @click="changeTitle">ChangeTitle</button>
    </div>
  `,
  methods: {
    changeTitle () {
      this.title = 'This is change title';
      this.author = '月落';
    }
  },
}

Vue.createApp(App).mount('#app');
```



对于不可改变的值，我们可以考虑采用以下方案。

```vue
const TITLE = 'This is my title';

const App = {
  data() {
    return {
      title: 'This is my title',
      author: 'yueluo'
    }
  },
  template: `
    <div>
      <h1>${ TITLE } - {{ author }}</h1>
      <h1>{{ title }} - {{ author }}</h1>
      <button @click="changeTitle">ChangeTitle</button>
    </div>
  `,
  methods: {
    changeTitle () {
      this.title = 'This is change title';
      this.author = '月落';
    }
  },
}

Vue.createApp(App).mount('#app');
```

### v-html

插值不会解析 html，因为插值表达式是 JS 表达式，没有对 DOM 的操作，raw HTML。

不要试图用 v-html 做子模板。vue  本身就有一个底层的模板编译系统，而不是直接使用字符串来渲染。

应该把子模板放到子组件中，让模板的重用和组合更加强大。

```vue
const App = {
  data() {
    return {
      title: '<h1>This is my title<h1>' ,
    }
  },
  template: `
    <div>{{ title }}</div>
    <div v-html="title" />
  `
}

Vue.createApp(App).mount('#app');
```



不要把用户提供的内容作为 v-html 的插值，这种插值可能会引起 xss 攻击。

```vue
const App = {
  data() {
    return {
      title: '<h1>This is my title<h1>' ,
      xss: '<img src="123" onerror="alert(123)" />'
    }
  },
  template: `
    <div>{{ title }}</div>
    <div v-html="title" />
    <div v-html="xss" />
  `
}

Vue.createApp(App).mount('#app');
```

### v-if、v-else-if、v-else

v-if 未选中时，使用 `<!-- v-if -->`  占位，每次找到注释节点替换。

```vue
const App = {
  data () {
    return {
      linkIndex: 0,
      urls: [
        'https://www.taobao.com',
        'https://www.tmall.com',
        'https://www.jd.com'
      ]
    }
  },
  template: `
    <div>
      <div>
        <p v-if="linkIndex === 0">
          <a v-bind:href="urls[0]" target="_blank">淘宝</a>
        </p>
        <p v-else-if="linkIndex === 1">
          <a v-bind:href="urls[1]" target="_blank">天猫</a>
        </p>
        <p v-else>
          <a v-bind:href="urls[2]" target="_blank">京东</a>
        </p>
      </div>
      <div>
        <button v-on:click="changeIndex(0)">淘宝</button>
        <button v-on:click="changeIndex(1)">天猫</button>
        <button v-on:click="changeIndex(2)">京东</button>
      </div>
    </div>
  `,
  methods: {
    changeIndex (index) {
      this.linkIndex = index;
    }
  },
}

Vue.createApp(App).mount('#app');
```

### v-show

v-show 隐藏节点，v-if 删除节点。

```vue
const App = {
  data () {
    return {
      linkIndex: 0,
      urls: [
        'https://www.taobao.com',
        'https://www.tmall.com',
        'https://www.jd.com'
      ]
    }
  },
  template: `
    <div>
      <div>
        <p v-show="linkIndex === 0">
          <a v-bind:href="urls[0]" target="_blank">淘宝</a>
        </p>
        <p v-show="linkIndex === 1">
          <a v-bind:href="urls[1]" target="_blank">天猫</a>
        </p>
        <p v-show="linkIndex === 2">
          <a v-bind:href="urls[2]" target="_blank">京东</a>
        </p>
      </div>
      <div>
        <button v-on:click="changeIndex(0)">淘宝</button>
        <button v-on:click="changeIndex(1)">天猫</button>
        <button v-on:click="changeIndex(2)">京东</button>
      </div>
    </div>
  `,
  methods: {
    changeIndex (index) {
      this.linkIndex = index;
    }
  },
}

Vue.createApp(App).mount('#app');
```

### v-bind

插入表达式

```js
v-bind:href="" => href=""
v-on:eventName => 绑定事件处理函数
```

v-：提示这是 vue 内置的 attribute，可以使用缩写。

```js
v-bind => :
v-on => @
```



动态的属性名参数不能出现空格和引号，HTML 的合法属性名不能出现空格引号

```html
<h1 "data-**"="123"></h1>
```



```vue
const App = {
  data () {
    return {
      linkIndex: 0,
      aAttr: 'href',
      eventName: 'click',
      tag: 'tag',
      urls: [
        'https://www.taobao.com',
        'https://www.tmall.com',
        'https://www.jd.com'
      ],
      title: 'This is my title'
    }
  },
  template: `
    <div>
      <div>
        <h1 :[tag]="tag">{{ title }}</h1>
        <p v-show="linkIndex === 0">
          <a :[aAttr]="urls[0]" target="_blank">淘宝</a>
        </p>
        <p v-show="linkIndex === 1">
          <a :[aAttr]="urls[1]" target="_blank">天猫</a>
        </p>
        <p v-show="linkIndex === 2">
          <a :[aAttr]="urls[2]" target="_blank">京东</a>
        </p>
      </div>
      <div>
        <button @[eventName]="changeIndex(0)">淘宝</button>
        <button @[eventName]="changeIndex(1)">天猫</button>
        <button @[eventName]="changeIndex(2)">京东</button>
      </div>
    </div>
  `,
  methods: {
    changeIndex (index) {
      this.linkIndex = index;
    }
  },
}

Vue.createApp(App).mount('#app');
```



如果 null 作为属性是无效的，可以利用 null 解除绑定。

```vue
<h1 v-bind:[null]="title"></h1>
```

```vue
<h1 v-bind:[attr]="title"></h1>

this.attr = 'tag';
this.attr = null;
```



插值表达式不能时候全局变量。受限列表。

```js
var str = '123';
```

```vue
<h1>
  {{ str }}
</h1>
```

## 插值表达式的使用指南

属性： 

attribute：HTML 的 扩展，title、src、href 等，attr

property：在对象内部存储数据，通常用来描述数据结构，prop

### v-bind

Mustache 中不支持在 HTML 属性中插值，Vue 因为存在底层的模板编译系统，支持 Vue 内置的属性。

v-bind，`v-bind:id`。

想在 HTML 中插入 JS 表达式，可以使用 v-bind。

```vue
const App = {
  data () {
    return {
      imgUrl: 'https://data.yueluo.club/icon/icon.png',
      title: '头像',
      content: '个人头像',
      isLogin: true
    }
  },
  template: `
    <article>
      <h1>{{ title }}</h1>
      <div>
        <img style="width: 100px; height: 100px;" :src="imgUrl" />
      </div>
      <p
        :title="content"
        :id="null"
        :class="undefined"
      >
        {{ content }}
      </p>
      <p>
        <textarea
          :disabled="!isLogin"
          placeholder="请填写评论"
        />
      </p>
    </article>
  `
}

Vue.createApp(App).mount('#app');
```

### truthy、falsy

`disabled="true"` ： 对于模板解析，true 是个字符串，并不是逻辑真

`disabled="true"` ：逻辑真

> truthy、falsy

> falsy：false、0、“”、null、undefined、NaN 的集合

>  truthy：除 falsy 以外的值

对于 disabled 逻辑真假的属性来说，只有 true、false、"" 和 truthy 会在解析过程中将 disabled 属性包含在元素上。

### 插值表达式

插值，是 JS 表达式，不是语句、模块、函数、赋值、声明等。

```vue
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
  `
}

Vue.createApp(App).mount('#app');
```



```vue
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
```

## ES5-ES6 对象深拷贝问题

### WeakMap、Map

Map 键名可以是任意类型。WeakMap 键名只能是对象。



```js
const oBtn1 = document.querySelector('#btn1');
const oBtn2 = document.querySelector('#btn2');

oBtn1.addEventListener('click', handleBtn1Click, false);
oBtn2.addEventListener('click', handleBtn2Click, false);

function handleBtn1Click () {}
function handleBtn2Click () {}

oBtn1.remove();
oBtn2.remove();

handleBtn1Click = null;
handleBtn2Click = null;
```

=> 

```js
const oBtn1 = document.querySelector('#btn1');
const oBtn2 = document.querySelector('#btn2');

const oBtnMap = new WeakMap();

oBtnMap.set(oBtn1, handleBtn1Click);
oBtnMap.set(oBtn2, handleBtn2Click);

oBtn1.addEventListener('click', oBtnMap.get(oBtn1), false);
oBtn2.addEventListener('click', oBtnMap.get(oBtn2), false);

function handleBtn1Click () {}
function handleBtn2Click () {}

oBtn1.remove();
oBtn2.remove();
```

WeakMap 键名是弱引用，只要 oBtn1（键名） 被移除，键值就会被回收掉。Map 没有对应功能。

弱引用指的是键名。

### ES5 deepClone

```js
var obj = {
  name: 'yueluo',
  age: '23',
  info: {
    hobby: [
      'travel',
      'piano', {
        a: 1
      }
    ],
    career: {
      teacher: 4,
      enginner: 9
    }
  }
}
```

```js
function deepClone (origin, target) {
  var tar = target || {};
  var toStr = Object.prototype.toString;
  var arrType = '[object Array]';
  
  for (var k in origin) {
    if (origin.hasOwnProperty(k)) {
      if (typeof origin[k] === 'object' && origin[k] !== null) {
      	tar[k] = toStr.call(origin[k]) === arrType ? [] : {};
        deepClone(origin[k], tar[k])
    	} else {
        tar[k] = origin[k];
      }
    }
  }
  
  return target;
}

const newObj = deepClone(obj, {});

console.log(newObj);
```



=> 

```js
function deepClone (origin) {
  if (origin == undefined || typeof origin !== 'object') {
    return origin;
  }
  
  if (origin instanceof Date) {
  	return new Date(origin);
  }
  
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }
  
  const target = new origin.constructor();
  
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
    	target[k] = deepClone(origin[k]);
    }
  }
  
  return target;
}
```

> origin == undeinfed -> undefined === undefined && null == undefined



```js
let test1 = {};
let test2 = {};

test2.test1 = test1;
test1.test2 = test2;

function deepClone (origin, hashMap = new WeakMap()) {
  if (origin == undefined || typeof origin !== 'object') {
    return origin;
  }
  
  if (origin instanceof Date) {
  	return new Date(origin);
  }
  
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }
  
  const hashKey = hashMa.get(origin);
  
  if (hashKey) {
    return hashKey;
  }
  
  const target = new origin.constructor();
  
  hashMap.set(origin, target);
  
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
    	target[k] = deepClone(origin[k], hashMap);
    }
  }
  
  return target;
}
```

## data 属性及数据响应式实现

data 必须是一个函数，Vue 在创建实例的过程中调用 data 函数，返回数据对象，通过响应式包装存储在实例的 $data 中，并且实例是可以直接越过 $data 访问属性的。



> $，$_，$__  等都是 vue 提供的内置 API，开发者尽量避免用这些前缀命名自己的变量和方法名。

 ```js
 const app = Vue.createApp({
   data () {
     return {
       title: 'This is my Title'
     }
   },
   template: `
     <h1>{{ title }}</h1>
   `,
 });
 
 const vm = app.mount('#app');
 
 vm.$data.title = 'This is your Title';
 console.log(vm.title);
 ```



data 为什么必须是一个函数：

```js
const obj = {
  a: 1,
  b: 2
}

var vm1 = new Vue({
  data: obj
});

var vm2 = new Vue({
  data: obj
});

function Vue (options) {
  // this.$data = options.data();
  this.$data = options.data;

  for (let key in this.$data) {
    ((k) => {
      Object.defineProperty(this, k, {
        get: () => {
          return this.$data[k];
        },
        set: (newVal) => {
          this.$data[k] = newVal;
        }
      })
    })(key);
  }
}

vm1.b = 3;

console.log(vm1, vm2);
```

如果 obj 是一个对象，对象是引用值，所以实例化的时候是一份对象，两个组件同时操作就会引起冲突。



`__defineGetter__`，`__defineSetter__` 	Obejct 上面的静态方法，Mozila 提出的规范，兼容性比较好

```js
const obj = () => {
  return {
    a: 1,
    b: 2
  }
};

var vm1 = new Vue({
  data: obj
});

var vm2 = new Vue({
  data: obj
});

function Vue (options) {
  this.$data = options.data();

  for (let key in this.$data) {
    ((k) => {
      this.__defineGetter__(k, () => {
        return this.$data[k];
      });

      this.__defineSetter__(k, (newVal) => {
        this.$data[k] = newVal;
      });
    })(key);
  }
}

vm1.b = 3;

console.log(vm1, vm2);
```

## methods 及实例方法挂载实现

向组件实例添加方法。



Vue 创建实例时，会自动为 methods 绑定当前实例 this，保证在事件监听时，回调始终指向当前组件实例。避免使用箭头函数。 

箭头函数会阻止 Vue 正确绑定组件实例的 this。模板直接调用的方法应该尽量避免副作用操作。

 ```vue
 const app = Vue.createApp({
   data () {
     return {
       title: 'This is my title'
     }
   },
   template: `
     <h1>{{ title }}</h1>
     <button @click="changeTitle">Change</button>
   `,
   methods: {
     changeTitle () {
       this.title = 'This is your title';
     }
   },
 });
 
 const vm = app.mount('#app');
 ```



lodash 常用的 JS 工具库。

```html
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
```

```vue
const List = {
  data () {
    return {
      teachers: []
    }
  },
  template: `
    <div>
      <table border="1">
        <thead>
          <tr>
            <td>ID</td>
            <td>姓名</td>
            <td>学科</td>
          </tr>
        </thead>
        <tbody v-if="teachers.length > 0">
          <tr
            v-for="item of teachers"
            key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.subject }}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colspan="3">暂无数据</td>
          </tr>
        </tbody>
      </table>
      <button @click="debounceGetData">GET TEACHERS'DATA</button>
    </div>
  `,
  created () {
    this.debounceGetData = _.debounce(this.getData, 1000);
  },
  unmounted() {
    this.debounceGetData.cancel();
  },
  methods: {
    async getData () {
      const result = await axios('http://localhost:4000/getTeachers');
      this.teachers = result.data;
    }
  },
}

Vue.createApp(List).mount('#app');
```



methods 实现

```vue

var Vue = (function () {
  function Vue (options) {
    this.$data = options.data();
    this._methods = options.methods;

    this._init(this);
  }

  Vue.prototype._init = function (vm) {
    initData(vm);
    initMethods(vm);
  }

  function initData (vm) {
    for (var key in vm.$data) {
      (function (k) {
        Object.defineProperty(vm, k, {
          get: function () {
            return vm.$data[k];
          },
          set: function (newVal) {
            vm.$data[k] = newVal;
          }
        })
      })(key);
    }
  }

  function initMethods (vm) {
    for (var key in vm._methods) {
      vm[key] = vm._methods[key];
    }
  }

  return Vue;
})();

const vm = new Vue({
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  methods: {
    increaseA (num) {
      this.a += num;
    },
    increaseB (num) {
      this.b += num;
    },
    getTotal () {
      console.log(this.a + this.b);
    }
  },
});

vm.increaseA(1);
vm.increaseA(1);
vm.increaseA(1);
vm.increaseA(1);

vm.increaseA(2);
vm.increaseA(2);
vm.increaseA(2);
vm.increaseA(2);

console.log(vm);
console.log(vm.getTotal());
```

## v-if/v-show 与构建架子

```vue
const App = {
  data () {
    return {
      isShowImg1: false,
      isShowImg2: false
    }
  },
  template: `
    <div>
      <div>
        <img v-if="isShowImg1" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.9TSMJGQjXlsMp5bI82ii-gHaE8?w=252&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
        <img v-show="isShowImg2" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.i0-ND27ia6sO-nZuY9f7qAHaEK?w=289&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
      </div>
      <div>
        <button @click="showImg1">显示图片 1</button>
        <button @click="showImg2">显示图片 2</button>
      </div>
    </div>
  `,
  methods: {
    showImg1 () {
      this.isShowImg1 = !this.isShowImg1;
    },
    showImg2 () {
      this.isShowImg2 = !this.isShowImg2;
    },
  },
}

const vm = Vue.createApp(App).mount('#app');

console.log(vm);
```

 v-if  注释节点和节点替换。将节点替换为注释节点。

v-show 操作 diaplay 属性。



自定义实现 v-if 与 v-show

```vue
import Vue from '../modules/Vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      isShowImg1: true,
      isShowImg2: true
    }
  },
  beforeCreate () {
    console.log('beforeCreate');
  },
  created () {
    console.log('created');
  },
  beforeMount () {
    console.log('beforeMount');
  },
  mounted () {
    console.log('mounted');
    this.isShowImg1 = false;
  },
  template: `
    <div>
      <img v-if="isShowImg1" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.9TSMJGQjXlsMp5bI82ii-gHaE8?w=252&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
      <img v-show="isShowImg2" width="200" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.i0-ND27ia6sO-nZuY9f7qAHaEK?w=289&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
    </div>
    <div>
      <button @click="showImg1">显示图片 1</button>
      <button @click="showImg2">显示图片 2</button>
    </div>
  `,
  methods: {
    showImg1 () {
      this.isShowImg1 = !this.isShowImg1;
    },
    showImg2 () {
      this.isShowImg2 = !this.isShowImg2;
    },
  },
});

console.log(vm);
```

```js
var Vue = (function () {
  function Vue (options) {
    var recycles = {
      beforeCreate: options.beforeCreate,
      created: options.created,
      beforeMount: options.beforeMount,
      mounted: options.mounted
    };

    recycles.beforeCreate.call(this);

    this.$el = document.querySelector(options.el);
    this.$data = options.data();

    this._init(this, options.template, options.methods, recycles);
  }

  Vue.prototype._init = function (vm, template, methods, recycles) {
    recycles.created.call(vm);

    var container = document.createElement('div');

    container.innerHTML = template;

    var showPool = new Map();
    var eventPool = new Map();

    initData(vm, showPool);
    initPool(container, methods, showPool, eventPool);
    bindEvent(vm, eventPool);
    render(vm, showPool, container, recycles);
  }

  function initData (vm, showPool) {
    var _data = vm.$data;

    for (var key in _data) {
      (function (k) {
        Object.defineProperty(vm, k, {
          get () {
            return _data[k];
          },
          set: function (newVal) {
            _data[k] = newVal;
            
            update(vm, k, showPool);
          }
        })
      })(key);
    }
  }

  function initPool (container, methods, showPool, eventPool) {
    var _allNodes = container.getElementsByTagName('*');

    var dom = null;

    for (var i = 0; i < _allNodes.length; i++) {
      dom = _allNodes[i];

      var vIfData = dom.getAttribute('v-if');
      var vShowData = dom.getAttribute('v-show');
      var vEvent = dom.getAttribute('@click');
      
      if (vIfData) {
        showPool.set(
          dom,
          {
            type: 'if',
            prop: vIfData
          }
        )

        dom.removeAttribute('v-if');
      } else if (vShowData) {
        showPool.set(
          dom,
          {
            type: 'show',
            prop: vShowData
          }
        )

        dom.removeAttribute('v-show');
      }

      if (vEvent) {
        eventPool.set(
          dom,
          methods[vEvent]
        )

        dom.removeAttribute('@click');
      }
    }
  }

  function bindEvent (vm, eventPool) {
    for (var [dom, handler] of eventPool) {
      vm[handler.name] = handler;

      dom.addEventListener('click', vm[handler.name].bind(vm), false);
    }
  }

  function render (vm, showPool, container, recycles) {
    var _data = vm.$data;
    var _el = vm.$el;

    for (var [dom, info] of showPool) {
      switch (info.type) {
        case 'if':
          info.comment = document.createComment(['v-if'])
          !_data[info.prop] && dom.parentNode.replaceChild(info.comment, dom);
          break;
        case 'show':
          !_data[info.prop] && (dom.style.display = 'none');
          break;
        default:
          break;
      }
    }

    recycles.beforeMount.call(vm);
    
    _el.appendChild(container);

    recycles.mounted.call(vm);
  }

  function update (vm, key, showPool) {
    var _data = vm.$data;

    for (var [dom, info] of showPool) {
      if (info.prop === key) {
        switch (info.type) {
          case 'if':
            !_data[key] ? (
              dom.parentNode.replaceChild(info.comment, dom)
            ) : (info.comment.parentNode.replaceChild(dom, info.comment));
            break;
          case 'show':
            !_data[key] ? (dom.style.display = 'none') : (dom.removeAttribute('style'));
            break;
        }
      }
    }
  }

  return Vue;
})();

export default Vue;
```

## 计算属性以及应用场景分析

计算属性：解决模板中复杂的逻辑运算问题。



```js
const App = {
  data () {
    return {
      studentCount: 10
    }
  },
  template: `
    <h1>{{ studentCount > 0 ? ('学生数：' + studentCount) : '暂无学生' }}</h1>
  `
}

Vue.createApp(App).mount('#app');
```



模板、逻辑、样式尽可能的绝对分离。如何页面存在相同逻辑，会运算很多次。

```js
const App = {
  data () {
    return {
      studentCount: 10
    }
  },
  template: `
    <h1>{{ studentCountInfo }}</h1>
    <h1>{{ studentCountInfo }}</h1>
  `,
  computed: {
    studentCountInfo () {
      return this.studentCount > 0 ? ('学生数：' + this.studentCount) : '暂无学生';
    }
  }
}

Vue.createApp(App).mount('#app');
```

计算属性只在内部逻辑依赖的数据发生变化的时候才会被再次调用，计算属性会缓存其依赖的上一次计算出的数据结果。

多次复用一个数据，计算属性只调用一次，多次复用相同值的数据，计算属性只调用一次。



依赖发生变化，重新渲染。逻辑选算结果被复用。

```js
const App = {
  data () {
    return {
      studentCount: 0
    }
  },
  template: `
    <h1>{{ studentCountInfo }}</h1>
    <h1>{{ studentCountInfo }}</h1>
    <button @click="addStudentCount">ADD STUDENT COUNT</button>
  `,
  computed: {
    studentCountInfo () {
      return this.studentCount > 0 ? ('学生数：' + this.studentCount) : '暂无学生';
    }
  },
  methods: {
    addStudentCount () {
      this.studentCount += 1;
    }
  },
}

Vue.createApp(App).mount('#app');
```



计算器案例

```js
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
    }
  }
}

Vue.createApp(App).mount('#app');
```

computed 计算属性可以使用方法替代，但是每次使用都会重新调用，computed 则是依赖项没有变化，值就不会重新计算。



反向赋值，案例。

```js
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
```

## 实现 computed 与依赖收集

  ```js
  var Vue = (function () {
    /**
     * total: {
     *  value：函数执行返回的结果
     *  get：get
     *  dep：['a', 'b']
     * }
     */
    var computedData = {};
    var reg_var = /\{\{(.+?)\}\}/g;
  
    var dataPool = {};
  
    var Vue = function (options) {
      this.$el = document.querySelector(options.el);
      this.$data = options.data();
  
      this._init(this, options.computed, options.template);
    }
  
    Vue.prototype._init = function (vm, computed, template) {
      dataReactive(vm);
      computedReactive(vm, computed)
      render(vm, template);
    }
  
    function render (vm, template) {
      var container = document.createElement('div');
      var _el = vm.$el;
  
      container.innerHTML = template;
  
      var domTree = _compileTemplate(vm, container);
  
      _el.appendChild(domTree);
    }
  
    function update (vm, key) {
      dataPool[key].textContent = vm[key];
    }
  
    function _compileTemplate (vm, container) {
      var allNodes = container.getElementsByTagName('*');
      var nodeItem = null;
  
      for (var i = 0; i < allNodes.length; i++) {
        nodeItem = allNodes[i];
  
        var matched = nodeItem.textContent.match(reg_var);
  
        if (matched) {
          nodeItem.textContent = nodeItem.textContent.replace(reg_var, function (node, key) {
            dataPool[key.trim()] = nodeItem;
            return vm[key.trim()];
          });
        }
      }
  
      return container;
    }
  
    function dataReactive (vm) {
      var _data = vm.$data;
  
      for (var key in _data) {
        (function (k) {
          Object.defineProperty(vm, k, {
            get: function () {
              return _data[k];
            },
            set: function (newVal) {
              _data[k] = newVal;
  
              update(vm, k);
              _updateComputedData(vm, k, function (key) {
                update(vm, key);
              })
            }
          })
        })(key);
      }
    }
  
    function computedReactive (vm, computed) {
      _initComputedData(vm, computed);
  
      for (var key in computedData) {
        (function (k) {
          Object.defineProperty(vm, k, {
            get () {
              return computedData[k].value;
            },
            set (newVal) {
              computedData[k].value = newVal;
            }
          })
        })(key);
      }
    }
  
    function _initComputedData (vm, computed) {
      for (var key in computed) {
        var descriptor = Object.getOwnPropertyDescriptor(computed, key);
        var descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value;
  
        computedData[key] = {
          value: descriptorFn.call(vm),
          get: descriptorFn.bind(vm),
          dep: _collectDep(descriptorFn)
        };
      }
    }
  
    function _collectDep (fn) {
      var _collection = fn.toString().match(/this.(.+?)/g);
  
      if (_collection.length > 0) {
        for (var i = 0; i < _collection.length; i++) {
          _collection[i] = _collection[i].split('.')[1];
        }
      }
  
      return _collection;
    }
  
    function _updateComputedData (vm, key, update) {
      var _dep = null;
  
      for (var _key in computedData) {
        _dep = computedData[_key].dep;
  
        for (var i = 0; i < _dep.length; i++) {
          if (_dep[i] === key) {
            vm[_key] = computedData[_key].get();
            update(_key);
          }
        }
      }
    }
  
    return Vue;
  })();
  
  var vm = new Vue({
    el: '#app',
    template: `
      <span>{{ a }}</span>
      <span>+</span>
      <span>{{ b }}</span>
      <span>=</span>
      <span>{{ total }}</span>
    `,
    data () {
      return {
        a: 1,
        b: 2
      }
    },
    computed: {
      total () {
        console.log('computed total');
        return this.a + this.b;
      }
    }
  });
  
  console.log(vm.total);
  console.log(vm.total);
  console.log(vm.total);
  console.log(vm.total);
  console.log(vm.total);
  
  vm.a = 100;
  
  console.log(vm.total);
  console.log(vm.total);
  console.log(vm.total);
  console.log(vm.total);
  console.log(vm.total);
  ```

## 计算属性与侦听器应用分析

computed 计算属性：

* 关注点在模板，抽离复用模板中的复杂的逻辑运算
* 当函数内的依赖发生改变后重新调用

watch 侦听属性：

* 关注点在数据更新，给数据增加侦听器，当数据更新时，侦听器函数执行
* 数据更新时，需要做什么，完成什么样的逻辑



```js
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
```



