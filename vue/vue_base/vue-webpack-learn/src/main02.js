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