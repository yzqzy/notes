// JSX

// const rEL = <h1>This is my first JSX experience.</h1>;

// const rEl = React.createElement('h1', {
//   className: 'title'
// }, 'This is my first JSX experience');

// ReactDOM.render(
//   rEl,
//   document.getElementById('app')
// );


// class MyButton extends React.Component {
//   constructor (props) {
//     super(props);

//     this.state = {
//       openStatus: false
//     }
//   }

//   statusChange () {
//     this.setState({
//       openStatus: !this.state.openStatus
//     });
//   }

//   render () {
//     // JSX 遵循 JS 的命名规范，一般使用 camelCase 小驼峰
//     return (
//       <div className="wrapper">
//         <p className="text">
//           {
//             /** 插值表达式 */
//             this.state.openStatus ? 'open' : 'close'
//           }
//         </p>
//         <button onClick={ this.statusChange.bind(this) }>
//           { this.state.openStatus ? 'close' : 'open' }
//         </button>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   React.createElement(MyButton),
//   document.getElementById('app')
// )

// const rEl = <h1 className="title">This is my first JSX experience.</h1>;
// const rEl = React.createElement('h1', {
//   className: 'title'
// }, 'This is my first JSX experience');;


// console.log(rEl);
// console.log(JSON.stringify(rEl));



var arr = [
  {
    id: 1,
    name: '张三'
  },
  {
    id: 2,
    name: '李四'
  },
  {
    id: 3,
    name: '王五'
  }
];

function setList () {
  return (
		<ul>
    	{
				arr.map(item => {
          return (
          	<li key={ item.id }>
            	<span>{ item.id }</span>
              <p>{ item.name }</p>
            </li>
          );
        })    
      }
    </ul>  
  )
}

const rEl = setList();

ReactDOM.render(
	rEl,
  document.getElementById('app')
)