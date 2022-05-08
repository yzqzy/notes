/**
 * @jest-environment jsdom
 */

import Vue from 'vue/dist/vue';

function renderVueComponent () {
  document.body.innerHTML = `
    <div id="app"></div>
  `

  new Vue({
    template: `
      <div id="app">
        <h1>{{ message }}</h1>
      </div>
    `,
    data: {
      message: 'Hello World'
    }
  }).$mount('#app');
}

test('vue testing', () => {
  renderVueComponent();
  console.log(document.body.innerHTML)
  expect(document.body.innerHTML).toMatch(/Hello World/)
})

test.only('Snapshot Testing', () => {
  renderVueComponent();
  // 首次运行时，会生成快照文件
  // 下次运行测试会与快照文件进行比对，如果不一致测试失败
  expect(document.body.innerHTML).toMatchSnapshot();
})