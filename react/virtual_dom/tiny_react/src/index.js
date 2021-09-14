import TinyReact from './TinyReact';

const VirtualDOM = (
  <div className="container">
    <h1>Hello React</h1>
    <h2 data-test="test">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h3>观察，将要改变值</h3>
    { 2 == 1 && <div>2 == 1</div> }
    { 2 == 2 && <div>2 == 2</div> }
    <span>这是一段内容</span>
    <button>点击</button>
  </div>
)

console.log(VirtualDOM);