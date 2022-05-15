<template>
  <div>
    <transition name="modal">
      <div class="info-wrap" v-if="showModal">
        <div class="info">啥都没输入！</div>
      </div>
    </transition>

    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>

    <ul v-if="todos.length">
      <transition-group name="flip-list">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>

    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
</template>

<script setup>
import useTodos from "../composeables/useTodos";
import { useMouse } from "../utils/mouse";

const { x, y } = useMouse();

console.log(x.value, y.value);

const {
  title, todos,
  addTodo, clear,
  active, all, allDone,
  showModal,
} = useTodos();
</script>

<style scoped>
.info-wrap {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info-wrap .info {
  padding: 20px;
  color: white;
  background-color: orange;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-leave-active {
  transition: all 0.3s ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>