
<template>
  <h1>这是关于页面</h1>

  <Todo />

  <Heading :level="2">H2 标签</Heading>
  <Heading :level="3">H3 标签</Heading>

  <DynamicBox />
  <VueTransition />
  <VuexCounter />
</template>

<script setup>
import DynamicBox from "../components/DynamicBox.vue"
import VueTransition from "../components/VueTransition.vue"
import VuexCounter from "../components/VuexCounter.vue"
import Heading from '../components/Heading'
import Todo from '../components/Todo'
</script>