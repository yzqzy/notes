// // 类组件
// class Text extends React.Component {
//   // 属性 配置 props 保存
//   constructor (props) {
//     super(props);

//     // 数据 内部数据 state
//     this.state = {
//       title: this.props.title
//     }
//   }

//   // 事件处理函数
//   handleBtnClick () {
//     // 逻辑部分
//     this.setState({
//       title: 'This is my Component.'
//     });
//   }

//   render () {
//     // 视图标记
//     return (
//       <div>
//         <h1>{ this.state.title }</h1>
//         <button onClick={ this.handleBtnClick.bind(this) }>Click</button>
//       </div>
//     )
//   }
// }

// const { useState } = React;

// function Test (props) {
//   const [ title, setTitle ] = useState(props.title);

//   return (
//     <div>
//       <h1>{ title }</h1>
//       <button onClick={ () => setTitle('This is my Component.') }>Click</button>
//     </div>
//   )
// }

// class Title extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return <h1>{ this.props.title }</h1>;
//   }
// }

// class Author extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <span>{ this.props.author }</span>
//     )
//   }
// }

// class Para extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <p>{ this.props.para }</p>
//     )
//   }
// }

// class App extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   state = {
//     title: 'This is a Title.',
//     author: 'yueluo',
//     para: 'this is a paragrah'
//   }

//   render () {
//     const { title, author, para } = this.state;

//     return (
//       <div>
//         <Title title={ title } />
//         <Author author={ author } />
//         <Para para={ para } />
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


// class Title extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     const { title, author, para } = this.props;

//     return <div>
//       <h1>{ title }</h1>
//       <Author author={ author } />
//       <Para para={ para } />
//     </div>;
//   }
// }

// class Author extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <span>{ this.props.author }</span>
//     )
//   }
// }

// class Para extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <p>{ this.props.para }</p>
//     )
//   }
// }

// class App extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   state = {
//     title: 'This is a Title.',
//     author: 'yueluo',
//     para: 'this is a paragrah'
//   }

//   render () {
//     const { title, author, para } = this.state;

//     return (
//       <div>
//         <Title
//           { ...this.state }
//         />
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    content: this.props.content
  }

  handleBtnClick () {
    this.setState({
      content: '123'
    });
  }

  render () {
    return (
      <div>
        <h1>{ this.state.content }</h1>
        <button onClick={ this.handleBtnClick.bind(this) } >Click</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App content="This is my content." />,
  document.getElementById('app')
);