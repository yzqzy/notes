<template>
  <div id="app">
    <p>{{ this.$store.state.number }}</p>
    <p>{{ this.$store.getters.myNumber }}</p>
    <button @click="syncAdd">同步增加按钮</button>
    <button @click="asyncAdd">异步增加按钮</button>
    {{ $store.state.a.x }}
    {{ $store.state.b.y }}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    setTimeout(() => {
      this.$store.state.number = 25;
    }, 3000)
  },
  methods: {
    syncAdd () {
      this.$store.commit('syncAdd', 7);
    },
    asyncAdd () {
      this.$store.dispatch('asyncAdd', 9);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
