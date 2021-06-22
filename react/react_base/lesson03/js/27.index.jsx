// class MyInput extends React.Component {
//   render () {
//     return (
//       <input type="text" ref={ this.props.inputRef } />
//     );
//   }
// }

// class App extends React.Component {
//   constructor (props) {
//     super(props);

//     this.inputRef = React.createRef();
//   }

//   componentDidMount () {
//     console.log(this.inputRef);
//   }

//   render () {
//     return (
//       <MyInput inputRef={ this.inputRef } />
//     )
//   }
// }


// class MyInput extends React.Component {
//   constructor (props) {
//     super(props);

//     this.myInput = null;
//   }

//   setMyInput (el) {
//     this.myInput = el;
//   }

//   focuesInput () {
//     this.myInput.value = null;
//     this.myInput.focus();
//   }

//   render () {
//     return (
//       <div>
//         <input type="text" ref={ this.setMyInput.bind(this) } />
//         <button onClick={ this.focuesInput.bind(this) }>Click</button>
//       </div>
//     )
//   }
// }


// class MyInput extends React.Component {
//   render () {
//     return (
//       <div>
//         <input type="text" ref={ this.props.inputRef } />
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   componentDidMount () {
//     console.log(this.oInput);
//   }

//   render () {
//     return (
//       <MyInput inputRef={ el => this.oInput = el } />
//     )
//   }
// }


class MyInput extends React.Component {
  componentDidMount () {
    console.log(this.refs);
  }

  render () {
    return (
      <div>
        <input type="text" ref="inputRef" />
      </div>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <MyInput />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);