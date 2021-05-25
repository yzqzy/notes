const { useState } = React;

function App () {
  const [count, setCount] = useState(0);
  const [, _setCount] = useState({});

  console.log('render');

  const onClick = params => {
    _setCount({});
  }
  
  return (
  	<div>
    	<p>You Clicked { count } times</p>
      <button onClick={ onClick }>Click me</button>
    </div>
  );
};

// const { Component } = React;

// class App extends Component {
//   state = {
//     count: 0
//   }

//   render () {
//     const { count } = this.state;

//     return (
//       <div>
//         <p>You Clicked { count } times</p>
//         <button
//           onClick={ () => this.setState({ count: count + 1 }) }  
//         >
//           Click me
//         </button>
//       </div>
//     )
//   }
// };

// const { Component } = React;
// class App extends Component {
//   state = {
//     count: 0
//   }

//   shouldComponentUpdate () {
//     console.log('before update');

//     return true;
//   }
  
//   render () {
//   	console.log('render');
//     const { count } = this.state;

//   	return (
//       <div>
//         <button onClick={ () => {
//         	console.log(1);
//         	this.forceUpdate();
//           // this.setState({
//           //   count: count + 1
//           // })
//       	} }>Click me</button>
//       </div>
//     )
//   }
// }

ReactDOM.render(<App />, document.getElementById('app'));