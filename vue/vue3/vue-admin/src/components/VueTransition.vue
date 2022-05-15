<template>
  <div>
    <button @click="toggle">click</button>

    <transition name="fade">
      <h1 v-if="showTitle">hello vue3</h1>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showTitle = ref(true)

function toggle() {
  showTitle.value = !showTitle.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>