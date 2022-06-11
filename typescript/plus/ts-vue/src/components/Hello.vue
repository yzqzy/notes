<template>
  <h1>Hello {{ name }}</h1>
</template>

<script setup lang="ts">
const name = "TypeScript"
</script>

<style scoped>
h1 {
  color: orange;
}
</style>