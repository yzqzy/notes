import React, { render, Component } from './react';

// const jsx = (
//   <div>
//     <p>Hello React</p>
//     <p>Hello Fiber</p>
//   </div>
// );

// render(jsx, document.getElementById('root'));



class Greating extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '张三'
    }
  }

  render () {
    return (
      <div>
        <div>Hello React Component: { this.state.name }</div>
        <button onClick={() => this.setState({ name: '李四' })}>button</button>
      </div>
    )
  }
};

render(<Greating />, document.getElementById('root'));



// function FnComponent (props) {
//   return (
//     <div>Hello React Component：{ props.title }</div>
//   )
// }

// render(<FnComponent title="Hello" />, document.getElementById('root'));




// const jsx = (
//   <div>
//     <p>Hello React</p>
//     <p>Hello Fiber</p>
//   </div>
// );

// render(jsx, document.getElementById('root'));

// setTimeout(() => {
//   const newJsx = (
//     <div>
//       <p>Hello Fiber</p>
//     </div>
//   );

//   render(newJsx, document.getElementById('root'));
// }, 2000)