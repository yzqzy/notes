export function renderMixin (Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    const el = vm.$el;

    const node = document.createDocumentFragment();

    let firstChild;

    // 假定存在模板（index.html 中）
    
    while (firstChild = el.firstChild) {
      node.appendChild(firstChild);
    }

    return node;
  }
}