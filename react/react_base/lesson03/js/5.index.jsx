// class App extends React.Component {
//   doSth () {
//     console.log('Something is done.');
//   }

//   doSth2 () {
//     console.log('Something is done！');
//   }

//   render () {
//     return (
//       <div>
//         <button onClick={ this.doSth }>click</button>
//         <a href="#" onClick={ this.doSth2 } >click</a>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// )


// class App extends React.Component {
//   doSth (e) {
//     console.log('Something is done.');
//     console.log(e);
//   }

//   render () {
//     return (
//       <div>
//         <button onClick={ this.doSth }>click</button>
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   doSth = () => {
//     console.log(this);
//   }

//   render () {
//     return (
//       <div>
//         <button onClick={ this.doSth }>click</button>
//       </div>
//     )
//   }
// }


class App extends React.Component {
  doSth (p1, p2, p3, e) {
    console.log(p1, p2, p3, e);
  }

  doSth2 (p1, p2, p3, e) {
    console.log(p1, p2, p3, e);
  }

  render () {
    return (
      <div>
        <button onClick={ (e) => this.doSth(1, 2, 3, e) }>click</button>
        <button onClick={ this.doSth2.bind(this, 1, 2, 3) }>click</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)