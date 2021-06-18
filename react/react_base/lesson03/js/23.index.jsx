// class MyInput extends React.Component {
//   render () {
//     return (
//       <div>
//         <h1>{ this.props.inputValue }</h1>
//         <p>总计：{ this.props.b + this.props.c }</p>
//         <input
//           type="text"
//           placeholder="请填写"
//           value={ this.props.inputValue }
//           onChange={ this.props.valueInput }
//         />
//       </div>
//     );
//   }
// }

function MyInput (props) {
  React.useEffect(() => {
    console.log('我是 MyInput');
  }, [props.inputValue]);

  return (
    <div>
      <h1>{ props.inputValue }</h1>
      <p>总计：{ props.b + props.c }</p>
      <input
        type="text"
        placeholder="请填写"
        value={ props.inputValue }
        onChange={ props.valueInput }
      />
    </div>
  );
}

function InputHoc (WrapperComponent) {
  // WrapperComponent.prototype.componentDidUpdate = function () {
  // 高阶组件不可以修改参数组件，可能会导致参数组件内部逻辑执行失效
  // 一切的功能都可以在容器内实现
  // }

  class InputHocComponent extends React.Component {
    state = {
      inputValue: ''
    };

    valueInput (e) {
      this.setState({
        inputValue: e.target.value
      });
    }

    render () {
      // 如何排除参数组件不需要的属性
      const { a, ...props } = this.props; 

      return (
        <WrapperComponent
          inputValue={ this.state.inputValue }
          valueInput={ this.valueInput.bind(this) }
          { ...props }
        >

        </WrapperComponent>
      );
    }
  }

  InputHocComponent.displayName = "InputHoc";

  return InputHocComponent;
}

const MyInputHoc = InputHoc(MyInput);

class App extends React.Component {
  state = {
    a: 1,
    b: 2,
    c: 3
  }

  render () {
    return (
      <MyInputHoc {...this.state} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);