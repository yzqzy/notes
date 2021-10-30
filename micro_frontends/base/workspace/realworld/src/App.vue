<template>
  <div id="app">
    <div>
      <Parcel :config="parcelConfig" :mountParcel="mountParcel" />
      <router-link to="/foo">foo</router-link> 
      <router-link to="/bar">bar</router-link>
      <button @click="handleClick">公共方法</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import Parcel from "single-spa-vue/dist/esm/parcel";
import { mountRootParcel } from "single-spa";

export default {
  name: 'App',
  components: {
    Parcel
  },
  data () {
    return {
      parcelConfig: window.System.import("@yueluo/navbar"),
      mountParcel: mountRootParcel,
      subjection: null
    }
  },
  methods: {
    async handleClick () {
      const toolsModule = await window.System.import('@yueluo/tools');

      toolsModule.sayHello('@yueluo/realworld');
    }
  },
  async mounted () {
    const toolsModule = await window.System.import('@yueluo/tools');

    this.subjection = toolsModule.sharedSubject.subscribe(console.log);
  },
  async destroyed () {
    this.subjection && this.subjection.unsubscribe();
  }
}
</script>
