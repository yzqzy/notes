import { reactive, effect, computed } from './reactity';

const state = reactive({
  name: 'yueluo',
  age: 22,
  colors: ['red', 'green', 'blue']
});


let myAge = computed(() => {
  return state.age * 2;
});

effect(() => {
  console.log(myAge.value);
})

state.age = 23;