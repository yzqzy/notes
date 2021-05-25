class Info extends React.Component {
  render () {
    const { username } = this.props;

    return (
      <div>
        <p>第{ this.props.inputNum }号：</p>
        <p>
          输入长度：{ username.length }
        </p>
        <p>
          提示：
          {
            username.length < 6 ? '长度必须大于等于 6 位' :
              username.length >= 6 && username < 12 ? '长度合法' : '长度必须小于 12'
          }
        </p>
      </div>
    )
  }
}

class UserNameInput extends React.Component {
  render () {
    return (
      <div>
        <Info
          username={ this.props.username }
          inputNum={ this.props.inputNum }
        />
        <div>
          <input
            type="text"
            onChange={ this.props.usernameChange }
          />
        </div>
      </div>
    )
  }
}

class App extends  React.Component {
  state = {
    username: ''
  }

  changeUserName = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  render () {
    return (
      <div>
        <UserNameInput
          username={ this.state.username }
          inputNum={ 1 }
          usernameChange={ this.changeUserName }
        />
        <UserNameInput
          username={ this.state.username }
          inputNum={ 2 }
          usernameChange={ this.changeUserName }
        />
      </div>
    )
  }
}

// function Info (props) {
//   const { username } = props;

//   return (
//     <div>
//       <p>第{ props.inputNum }号：</p>
//       <p>
//         输入长度：{ username.length }
//       </p>
//       <p>
//         提示：
//         {
//           username.length < 6 ? '长度必须大于等于 6 位' :
//             username.length >= 6 && username < 12 ? '长度合法' : '长度必须小于 12'
//         }
//       </p>
//     </div>
//   )
// }

// function UserNameInput (props) {
//   const [username, setUsername] = React.useState('');

//   const changeUserName = (e) => {
//     setUsername(e.target.value);
//   }

//   return (
//     <div>
//       <Info
//         username={ username }
//         inputNum={ props.inputNum }
//       />
//       <div>
//         <input
//           type="text"
//           onChange={ changeUserName }
//         />
//       </div>
//     </div>
//   )
// }

// function App () {
//   return (
//     <div>
//       <UserNameInput inputNum={ 1 } />
//       <UserNameInput inputNum={ 2 } />
//     </div>
//   )
// }

ReactDOM.render(
  <App />,
  document.getElementById('app')
)