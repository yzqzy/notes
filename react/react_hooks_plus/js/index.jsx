// const { useState, useEffect } = React;

// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       console.log(count);
//     }, 3 * 1000); 
//   }, [count]);

//   return (
//    <div>
//      <p>{ count }</p>
//      <button
//       onClick={() => setCount(count + 1)}
//      >
//        add
//      </button>
//    </div> 
//   );
// }


const { useState, useEffect, useRef, useLayoutEffect } = React;

const App = () => {
  const ref = useRef();
  const [, setCount] = useState({});

  useLayoutEffect(() => {
    ref.current.style.transform = 'translate(500px)';
    ref.current.style.transition = 'all .5s';

    return () => {
      ref.current.style.transform = 'translate(0px)';
      ref.current.style.transition = 'all .5s';
    }
  });

  let styleObj = {
    width: '100px',
    height: '100px',
    background: 'orange'
  };

  return <div>
    <div style={ styleObj } ref={ ref }></div>
      <button onClick={ () => setCount({}) }>Click</button>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('app'));