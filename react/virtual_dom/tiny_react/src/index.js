import TinyReact from './TinyReact/index.js';

const VirtualDOM = (
  <div className="container">
    <h1>Hello React</h1>
    <h2 data-test="test">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h3>观察，将要改变值</h3>
    <span>这是一段内容</span>
  </div>
)

console.log(VirtualDOM);