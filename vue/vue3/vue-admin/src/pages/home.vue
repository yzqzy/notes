
<template>
  <h1>这是首页</h1>

  <TodoList />
  <Counetr />
  <Rate :value="3"></Rate>
  <Rate :value="4" theme="red"></Rate>
  <Rate :value="1" theme="green"></Rate>

  <DynamicRate v-model="score" />
</template>

<script setup>
import { ref } from 'vue';
import TodoList from '../components/TodoList.vue';
import Counetr from '../components/Counetr.vue';
import Rate from '../components/Rate.vue';
import DynamicRate from '../components/DynamicRate.vue';

const score = ref(3.5);
</script>

<style scoped>
h1 {
  color: red;
}
</style>>