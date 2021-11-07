// const { createRef, forwardRef, useRef } = React;

// const useImperativeHandle = (ref, cb) => {
//   ref.current = cb();
// }

// const Foo = forwardRef((params, inputRef1) => {
//   const inputRef = useRef();

//   useImperativeHandle(inputRef1, () => ({
//     focus () {
//       inputRef.current.focus();
//     }
//   }));

//   return <input type="text" ref={ inputRef } />;
// });

// const App = () => {
//   const inputRef = useRef();

//   const onClick = () => {
//     inputRef.current.focus();
//   }

//   return <div>
//     <Foo ref={ inputRef } />
//     <button onClick={ onClick }>button</button>
//   </div>;
// }

// ReactDOM.render(<App />, document.getElementById('app'));

// const { useRef, createRef, useState } = React;

// window.arr = [];

// const App = params => {
//   const [count, setCount] = useState(0);

//   const useRef1 = useRef();
//   const createRef1 = createRef();

//   window.arr.push(useRef1, createRef1);

//   return (
//     <div>
//       { count }
//       <button onClick={() => setCount(count + 1)}>add</button>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById('app'));


const { useRef, createRef, useState } = React;

// class App extends React.Component {
//   inputRef;

//   onClick = () => {
//     console.log(this.inputRef);
//   }

//   render () {
//     return (
//       <div>
//         <input type="text" ref={ ref => this.inputRef = ref } />
//         <button onClick={ this.onClick }>add</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

const App = params => {
  let inputRef;

  const onClick = () => {
    console.log(inputRef);
  }

  return (
    <div>
      <input type="text" ref={ ref => inputRef = ref } />
      <button onClick={ onClick }>add</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));