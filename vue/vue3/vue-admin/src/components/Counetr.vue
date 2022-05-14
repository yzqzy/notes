
<template>
  <div>
    <h1 @click="add">{{ count }}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
let count = ref(1)
let color = ref('red')
function add() {
  count.value++
  color.value = Math.random() > 0.5 ? "blue" : "red"
}
</script>

<style scoped>
h1 {
  color: v-bind(color);
}
</style>>