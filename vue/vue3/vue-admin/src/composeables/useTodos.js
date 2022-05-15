import { ref, computed, reactive } from "vue";

export default function useTodos() {
  const title = ref("");
  const todos = ref([{ title: "学习Vue", done: false }]);
  const showModal = ref(false);

  const animate = reactive({
    show: false,
    el: null
  });

  function beforeEnter (el) {
    const dom = animate.el;
    const rect = dom.getBoundingClientRect();
    const x = window.innerWidth - rect.left - 60;
    const y = rect.top - 10;

    el.style.transform = `translate(-${ x }px, ${ y }px)`;
  }
  function enter (el, done) {
    document.body.offsetHeight // 手动触发一次重绘，开始动画（获取offsetHeight看起来没有副作用不接收也不占内存空间）
    el.style.transform = `translate(0, 0)`;
    el.addEventListener('transitionend', done);
  }
  function afterEnter (el) {
    animate.show = false;
    el.style.display = 'none';
  }

  function addTodo() {
    if (!title.value) {

      showModal.value = true;
      setTimeout(() => {
        showModal.value = false;
      }, 1500)
      return;
    }

    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  function removeTodo (e, i) {
    animate.el = e.target;
    animate.show = true;
    todos.value.splice(i, 1);
  }
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }

  const active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  const all = computed(() => todos.value.length);
  const allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });
  
  return {
    title, todos,
    addTodo, removeTodo, clear,
    active, all, allDone, showModal,
    animate, enter, afterEnter, beforeEnter
  };
}
