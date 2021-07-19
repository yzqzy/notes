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

## 认识 Vue 指令





