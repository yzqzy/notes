/**
 * @jest-environment jsdom
 */

function renderHtml () {
  const div = document.createElement('div');

  div.innerHTML = `
    <h1>Hello World</h1>
  `

  document.body.appendChild(div);
}

test('dom testing', () => {
  renderHtml();
  expect(document.querySelector('h1').innerHTML).toBe('Hello World');
})
