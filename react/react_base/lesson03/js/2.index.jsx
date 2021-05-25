// const rEl = <h1 className="title">This is a title.</h1>;

// /**
//  * @param {ReactElement} - react 元素
//  * @param {RootNode} - 根节点
//  */
// ReactDOM.render(rEl, document.getElementById('app'));

// function update () {
//   const rEl = (
//     <div>
//       <h1>This is a title.</h1>
//       <h2>{ new Date().toString() }</h2>
//     </div>
//   );

//   ReactDOM.render(
//     rEl,
//     document.getElementById('app')
//   );
// }

// setInterval(update, 1000);

// class Title extends React.Component {
//   render () {
//     return <h1>This is a title.</h1>;
//   }
// }

// ReactDOM.render(
//   <Title />,
//   document.getElementById('app')
// );


// class Title extends React.Component {
//   render () {
//     return <h1>This is a title.</h1>;
//   }
// }

// ReactDOM.render(
//   React.createElement(Title),
//   document.getElementById('app')
// );


function Title () {
  return <h1>This is a title.</h1>;
}

ReactDOM.render(
  <Title />,
  document.getElementById('app')
);