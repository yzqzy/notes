<template>
  <div id="app">
    <div>
      <router-link to="/foo">foo</router-link> 
      <router-link to="/bar">bar</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
