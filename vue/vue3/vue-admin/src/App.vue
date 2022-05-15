<template>
  <div>
    <router-link to="/">首页</router-link> | 
    <router-link to="/about">关于</router-link>
  </div>

  <router-view v-slot="{ Component, route }">
    <transition name="route" mode="out-in" appear>
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<style>
#app {
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 60px;
}

ul,
li {
  padding: 0;
  list-style: none;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out; 
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in; 
}
</style>
