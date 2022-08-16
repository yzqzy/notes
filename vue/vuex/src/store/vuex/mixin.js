export default function (Vue) {
  Vue.mixin({ beforeCreate: vuexInit })
}

function vuexInit () {
  const options = this.$options;

  if (options.store) {
    this.$store = options.store;
  } else {
    this.$store = this.$parent && this.$parent.$store;
  }
}