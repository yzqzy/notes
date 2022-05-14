
<template>
  <div :style="fontstyle">
    {{ rate }}
  </div>
</template>

<script setup>
import { computed, } from 'vue';

const props = defineProps({
  value: Number,
  theme: { type: String, default: 'orange' }
})
const rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))

const themeObj = {
  'black': '#00',
  'white': '#fff',
  'red': '#f5222d',
  'orange': '#fa541c',
  'yellow': '#fadb14',
  'green': '#73d13d',
  'blue': '#40a9ff',
}

const fontstyle = computed(() => {
  return `color:${themeObj[props.theme]};`
})
</script>