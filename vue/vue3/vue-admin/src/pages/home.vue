
<template>
  <h1>这是首页</h1>

  <TodoList />
  <Counetr />
  <Rate :value="3"></Rate>
  <Rate :value="4" theme="red"></Rate>
  <Rate :value="1" theme="green"></Rate>
</template>

<script setup>
import { ref } from 'vue';
import TodoList from '../components/TodoList.vue';
import Counetr from '../components/Counetr.vue';
import Rate from '../components/Rate.vue';

const score = ref(3);
</script>

<style scoped>
h1 {
  color: red;
}
</style>>