<template>
  <div id="app">
    <div v-if="flag">
      {{ msg }}
    </div>
    <div v-else>
      {{ msg1 }}
    </div>
    <button @click="change">change</button>
    <button @click="toggle">toggle</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      flag: true,
      msg: 'Hello World',
      msg1: 'Hello Vue'
    }
  },
  methods: {
    change () {
      this.msg = Math.random();
    },
    toggle () {
      this.flag = !this.flag;
    }
  },
}
</script>

<style>
</style>
