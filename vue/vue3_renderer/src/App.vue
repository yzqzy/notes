<template>
  <div @click="onClick">
    <circle
      :animals="state.animals"
      :x="200"
      :y="state.y"
      :r="100"
    />
    <rect />
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'App',
  setup () {
    const state = reactive({
      animals: [
        { name: '猫', count: 10, color: 'red' },
        { name: '狗', count: 50, color: 'green' },
        { name: '老虎', count: 100, color: 'blue' },
        { name: '大象', count: 200, color: 'orange' }
      ],
      y: 200
    });

    const onClick = () => {
      state.animals.push({
        name: '小鸭',
        count: 80,
        color: 'purple'
      });
    };

    return {
      state,
      onClick
    }
  }
}
</script>

<style>
</style>
