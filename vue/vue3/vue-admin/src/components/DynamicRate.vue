
<template>
  <div :style="fontStyle">
    <div class="rate" @mouseout="mouseOut">
      <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
        <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: Number,
  theme: { type: String, default: 'orange' }
})
const emits = defineEmits('update:modelValue')

function onRate (num) {
  emits('update:modelValue', num)
}

const width = ref(props.modelValue)

function mouseOver (i) {
  width.value = i
}

function mouseOut () {
  width.value = props.modelValue
}

const fontWidth = computed(() => `width: ${ width.value }em;`)

const themeObj = {
  'black': '#00',
  'white': '#fff',
  'red': '#f5222d',
  'orange': '#fa541c',
  'yellow': '#fadb14',
  'green': '#73d13d',
  'blue': '#40a9ff',
}

const fontStyle = computed(() => {
  return `color:${themeObj[props.theme]};`
})
</script>


<style scoped>
.rate {
  position: relative;
  display: inline-block;
}

.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  z-index: -1;
  overflow: hidden;  
}
</style>