<template>
  <div @click="add">{{ count }}</div>
</template>

<script setup>
import { computed } from 'vue'
// import { useStore } from 'vuex'
import { useStore } from '../store/_vuex'

const store = useStore()
const count = computed(() => store.state.count)

function add () {
  store.commit('add')
}
</script>