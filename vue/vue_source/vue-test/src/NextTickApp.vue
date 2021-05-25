<template>
  <div id="app">
    <div ref="msg">
      {{ msg }}
    </div>
    <button @click="change">change</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      flag: true,
      msg: 'Hello World',
    }
  },
  methods: {
    change () {
      this.msg = 'Hello Vue';

      console.log('sync：', this.$refs.msg.innerText);

      this.$nextTick(() => {
        console.log('nextTick：', this.$refs.msg.innerText);
      });
      this.$nextTick().then(() => {
        console.log('nextTick with promsie：', this.$refs.msg.innerText);
      });
    }
  },
}
</script>

<style>
</style>
