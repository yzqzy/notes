// const colorSystem = {
//   'primary': 'blue',
//   'success': 'green',
//   'warning': 'orange',
//   'danger': 'red'
// }

// const MyUI = {
//   Button: class extends React.Component {
//     render () {
//       const { type, children } = this.props;

//       return (
//         <button
//           style={{
//             color: '#fff',
//             backgroundColor: colorSystem[type]
//           }}
//         >
//           { children }
//         </button>
//       )
//     }
//   },
//   Input: function (props) {
//     const { placeholder, onValueInput } = props;

//     return (
//       <input
//         type="text"
//         placeholder={ placeholder }
//         onChange={ (e) => onValueInput(e) }
//       />
//     )
//   }
// }

// class App extends React.Component {
//   valueInput (e) {
//     console.log(e.target.value);
//   }

//   render () {
//     return (
//       <>
//         <MyUI.Button
//           type="primary"
//         >
//           Click
//         </MyUI.Button>

//         <MyUI.Input
//           placeholder="请输入文本"
//           onValueInput={ this.valueInput.bind(this) }
//         />
//       </>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// )


// class LoginBtnGroup extends React.Component {
//   render () {
//     return (
//       <div>
//         <button>登录</button>
//         <button>注册</button>
//       </div>
//     )
//   }
// }

// class WelcomeInfo extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>欢迎您，{ this.props.usernmae }</h1>
//       </div>  
//     )
//   }
// }

// class Header extends React.Component {
//   static components = {
//     'login': LoginBtnGroup,
//     'welcome': WelcomeInfo
//   }

//   render () {
//     const HeaderUser = Header.components[this.props.type];

//     return (
//       <HeaderUser { ...this.props } />
//     )
//   }
// }

// class App extends React.Component {
//   render () {
//     return (
//       <Header
//         type={ 'welcome' }
//         usernmae="月落"
//       />
//     )
//   }
// }


// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


// function MyTitle (props) {
//   const { title, author } = props;

//   return (
//     <div>
//       <h1>{ title }</h1>
//       <p>{ author }</p>
//     </div>
//   )
// }

// class App extends React.Component {
//   state = {
//     mainTitle: 'This is a MAINTITLE',
//     subTitle: 'This is a SUBTITLE',
//     titleShow: 'main',
//   }

//   render () {
//     let title = '';

//     // if (this.state.titleShow === 'sub') {
//     //   title = <h2>{ this.state.subTitle }</h2>;
//     // } else {
//     //   title = <h1>{ this.state.mainTitle }</h1>;
//     // }

//     switch (this.state.titleShow) {
//       case 'main':
//         title = <h1>{ this.state.mainTitle }</h1>;
//         break;
//       case 'sub':
//         title = <h2>{ this.state.subTitle }</h2>;
//         break;
//       default:
//         title = <h3>There is no title</h3>;
//         break;
//     }

//     return (
//       // <MyTitle
//       //   title="This is a title"
//       //   author="heora"
//       // />

//       // <MyTitle
//       //   title={ `${ this.state.mainTitle }（${ this.state.subTitle }）` }
//       //   author="heora"
//       // />

//       // <div>{ title }</div>

//       <div>
//         {
//           this.state.titleShow === 'sub' ? (
//             <h2>{ this.state.subTitle }</h2>
//           ) : (
//             <h1>{ this.state.mainTitle }</h1>
//           )
//         }
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


// function MyTitle (props) {
//   const { title, author } = props;

//   return (
//     <div>
//       <h1>{ title }</h1>
//       <p>{ author }</p>
//     </div>
//   )
// }

// class App extends React.Component {
//   render () {
//     return (
//       <div>
//         <MyTitle
//           title="这是一个标题"
//           author="月落"
//         />

//         <MyTitle
//           title={ "这是一个标题" }
//           author={ "月落" }
//         />

//         <MyTitle
//           title="这是一个<标题>"
//           author={ "&lt;月落&gt;" } // &lt;月落&gt;
//         />

//         <MyTitle
//           title="这是一个&lt;标题&gt;" // 这是一个<标题>
//           author={ "<月落>" } // <月落>
//         />
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


// function MyTitle (props) {
//   const { title, author, authorShow } = props;

//   return (
//     <div>
//       <h1>{ title }</h1>
//       {
//         // 真假 Boolean
//         authorShow ? (
//           <p>{ author }</p>
//         ) : null
//       }
//     </div>
//   )
// }

// class App extends React.Component {
//   render () {
//     return (
//       <div>
//         <MyTitle
//           title="This is  a TITLE"
//           author="heora"
//           // 字符串传入的意义是字符串，不代表 Bool 真假
//           // 逻辑：字符串 true 是逻辑真
//           authorShow="true"
//         />
//         <MyTitle
//           title="This is  a TITLE"
//           author="heora"
//           // 语义和逻辑：Bool true 的意义代表 Bool 真假
//           authorShow={ true }
//         />
//         <MyTitle
//           title="This is  a TITLE"
//           author="heora"
//           // 不赋值属性，默认就是 Bool 真
//           // React 不推荐这么做，语义不好，类似 ES6 省略属性值写法
//           authorShow
//         />
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


function MyTitle (props) {
  const { title, author, authorShow } = props;

  return (
    <div>
      <h1>{ title }</h1>
      {
        authorShow ? (
          <p>{ author }</p>
        ) : null
      }
    </div>
  )
}

class App extends React.Component {
  render () {
    const { abc, ...others } = this.props;
    
    return (
      <div>
        <MyTitle {...others} />
      </div>
    )
  }
}

ReactDOM.render(
  <App
    title="This is a title"
    author="heora"
    authorShow={ true }
    abc="abc"
  />,
  document.getElementById('app')
);