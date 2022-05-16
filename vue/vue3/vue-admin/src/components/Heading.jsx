import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    }
  },

  // h function
  // setup (props, { slots }) {
  //   return () => h(
  //     'h' +　props.level,
  //     {},
  //     slots.default()
  //   )
  // }

  // jsx
  setup (props, { slots }) {
    const tag = 'h' + props.level;
    return () => <tag>{ slots.default() }</tag>
  }
})