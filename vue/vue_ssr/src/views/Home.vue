<template>
  <div>
    <h1>Home</h1>
    <p>{{ $store.state.value }}</p>
    <button @click="changeValue">按钮</button>
  </div>
</template>

<script>
export default {
  asyncData (store) {
    return store.dispatch('changeValue', 'first value');
  },
  methods: {
    changeValue () {
      this.$store.dispatch('changeValue', 'second value');
    }
  }
}
</script>