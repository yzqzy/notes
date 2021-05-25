<template>
  <div id="app">
    <h1>Hello from App!</h1>
    <button @click="onClick">按钮</button>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      console.log('点击了按钮');
    }
  }
}
</script>

<style>
#app {
  background-color: orange;
}
</style>