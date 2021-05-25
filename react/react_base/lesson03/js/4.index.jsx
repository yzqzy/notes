// class Title extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <h1>{ this.props.title }</h1>
//     )
//   }
// }

// class DateTime extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   state = {
//     datetime: new Date().toString()
//   }

//   // 组件已经被渲染到 DOM 中后运行
//   // 组件已经被挂载到真实 DOM 中后运行的函数
//   componentDidMount () {
//     this.t = setInterval(() => {
//       this.setState({
//         datetime: new Date().toString()
//       });
//     }, 1000);
//   }

//   // 组件卸载之前运行
//   componentWillUnmount () {
//     this.t && clearInterval(this.t);
//     this.t = null;
//   }

//   render () {
//     return (
//       <h2 id="datetime">It's Now { this.state.datetime }</h2>
//     )
//   }
// }

// class Board extends React.Component {
//   render () {
//     return (
//       <div>
//         <Title title="Welecome to my Board" />
//         <DateTime />
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <Board />,
//   document.getElementById('app')
// )


// setTimeout(() => {
//   ReactDOM.unmountComponentAtNode(
//     document.getElementById('app')
//   )
// }, 5 * 1000)


class Title extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1>{ this.props.title }</h1>
    )
  }
}

class App extends React.Component {
  state = {
    title: 'This is a title.'
  }

  render () {
    return <Title title={ this.state.title } />
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)