import React, { render, Component } from './react';

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
);

// render(jsx, document.getElementById('root'));



class Greating extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>Hello React Component</div>
    )
  }
};

// render(<Greating />, document.getElementById('root'));



function FnComponent (props) {
  return (
    <div>Hello React Component：{ props.title }</div>
  )
}

render(<FnComponent title="Hello" />, document.getElementById('root'));