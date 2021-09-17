import TinyReact from './TinyReact';

// const VirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>观察，将要改变值</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击</button>
//   </div>
// )

// TinyReact.render(
//   VirtualDOM,
//   document.getElementById('root')
// )

// function Demo () {
//   return <div>&hearts;</div>;
// }

// function Heart (props) {
//   return (
//     <div>
//       { props.title }
//       <Demo />
//     </div>
//   );
// }

// TinyReact.render(
//   <Heart title="Hello React" />,
//   document.getElementById('root')
// )



// class Alert extends TinyReact.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <div>
//         <p>Hello React.</p>
//         <p>
//           { this.props.name }
//           { this.props.age }
//         </p>
//       </div>
//     )
//   }
// }

// TinyReact.render(
//   <Alert name="月落" age="23" />,
//   document.getElementById('root')
// );




// const VirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>观察，将要改变值</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击</button>
//   </div>
// )

// const ModifyVirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test-modity">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>值被改变了</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段被修改过的内容</span>
//     <button onClick={() => alert('你好，Modity。')}>点击</button>
//   </div>
// )

// TinyReact.render(
//   VirtualDOM,
//   document.getElementById('root')
// )

// setTimeout(() => {
//   TinyReact.render(
//     ModifyVirtualDOM,
//     document.getElementById('root')
//   )
// }, 2 * 1000);




// const VirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>观察，将要改变值</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击</button>
//   </div>
// )

// const ModifyVirtualDOM = (
//   <div className="container">
//     <h2 data-test="test-modity">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h6>值被改变了</h6>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段被修改过的内容</span>
//   </div>
// )

// TinyReact.render(
//   VirtualDOM,
//   document.getElementById('root')
// )

// setTimeout(() => {
//   TinyReact.render(
//     ModifyVirtualDOM,
//     document.getElementById('root')
//   )
// }, 2 * 1000);



class Alert extends TinyReact.Component {
  constructor (props) {
    super(props);

    this.state = {
      title: 'Default Titie'
    }
    this.handeClick = this.handeClick.bind(this);
  }

  handeClick () {
    this.setState({
      title: 'Change Title'
    });
  }

  render () {
    return (
      <div>
        <p>Hello React.</p>
        <p>
          { this.props.name }
          { this.props.age }
        </p>
        <p>{ this.state.title }</p>
        <button onClick={this.handeClick}>Change Title</button>
      </div>
    )
  }
}

TinyReact.render(
  <Alert name="月落" age="23" />,
  document.getElementById('root')
);