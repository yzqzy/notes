// import styles from './index.module.css';

// class Container extends React.Component {
//   render () {
//     return (
//       <div className={ styles.container }>
//         <div className={ styles.header }>
//           { this.props.header }
//         </div>
//         <div className={ styles.sidebar }>
//           { this.props.sidebar }
//         </div>
//         <div className={ styles.main }>
//           { this.props.main }
//         </div>
//       </div>
//     )
//   }
// }

// class Header extends React.Component {
//   render () {
//     return (
//       <p>
//         HEADER  
//       </p>
//     );
//   }
// }

// class SideBar extends React.Component {
//   render () {
//     return (
//       <p>
//         SideBar
//       </p>
//     );
//   }
// }

// class Main extends React.Component {
//   render () {
//     return (
//       <p>
//         Main
//       </p>
//     );
//   }
// }

// class App extends React.Component {
//   render () {
//     return (
//       <Container
//         header={ <Header /> }
//         sidebar={ <SideBar /> }
//         main={ <Main /> }
//       />
//     )
//   }
// }

// import styles from './index.module.css';

// function Modal (props) {
//   return (
//     <div className={ styles.modal }>
//       <header className={ styles.modalHeader }>
//         <h1>{ props.headerTitle }</h1>
//       </header>
//       <div className={ styles.modalContent }>
//         { props.children  }
//       </div>
//     </div>
//   )
// }

// function Alert (props) {
//   return (
//     <Modal
//       headerTitle={ props.headerTitle }
//     >
//       <p>{ props.alertText }</p>
//     </Modal>
//   )
// }

// function WelcomeAlert () {
//   return (
//     <Alert
//       headerTitle="欢迎你"
//       alertText="尊贵的用户"
//     />
//   )
// }

// function LoginModal () {
//   return (
//     <Modal
//       headerTitle="登录"
//     >
//       <form action="">
//         <p>
//           <input type="text" placeholder="用户名" />
//         </p>
//         <p>
//           <input type="password" placeholder="密码" />
//         </p>
//         <p>
//           <button>登录</button>
//         </p>
//       </form>
//     </Modal>
//   )
// }

// function App () {
//   return (
//     <div>
//       <WelcomeAlert />
//       <LoginModal />
//     </div>
//   )
// }

ReactDOM.render(
  <App />,
  document.getElementById('app')
)