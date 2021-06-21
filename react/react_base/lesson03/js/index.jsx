// class MyInput extends React.Component {
//   render () {
//     return (
//       <input type="text" placeholder="请填写..." />
//     )
//   }
// }

// // 3. 通过 forwardRef 向 input 转发 Ref 属性
// const MyInput = React.forwardRef((props, ref) => (
//   // 5. ref 参数只能用 forwardRef 定义的组件内可接收 
//   <input type="text" ref={ ref } placeholder={ props.placeholder } />
// ));

// class App extends React.Component {
//   constructor (props) {
//     super(props);

//     // 1. 创建 Ref 对象
//     this.myInputRef = React.createRef();
//   }

//   componentDidMount () {
//     // 4. myInputRef.current 指向 input DOM 节点
//     console.log(this.myInputRef);
//   }

//   inputOperate () {
//     const oInput = this.myInputRef.current;

//     oInput.value = '';
//     oInput.focus();
//   }

//   render () {
//     return (
//       <div>
//         {/* 2. 组件赋值引用 */}
//         <MyInput ref={ this.myInputRef } placeholder="请填写" />
//         <button onClick={ this.inputOperate.bind(this) }>Click</button>
//       </div>
//     )
//   }
// }


class MyInput extends React.Component {
  render () {
    return (
      <input type="text" placeholder={ this.props.placeholder } />
    )
  }
}

function InputHoc (WrapperComponent) {
  class Input extends React.Component {
    render () {
      const { forwardRef, ...props } = this.props;

      return (
        <WrapperComponent ref={ forwardRef } { ...props } />
      )
    }
  }

  function forwardRef (props, ref) {
    return <Input { ...props } forwardRef={ ref } />;
  }

  forwardRef.displayName = 'Input - ' + WrapperComponent.name;

  return React.forwardRef(forwardRef);
}

const MyInputHoc = InputHoc(MyInput);

class App extends React.Component {
  constructor (props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount () {
    console.log(this.inputRef);
  }

  render () {
    return (
      <MyInputHoc ref={ this.inputRef } />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);