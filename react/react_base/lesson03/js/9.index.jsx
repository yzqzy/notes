class App extends React.Component {
  constructor (props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.genderRef = React.createRef();
    this.fileRef = React.createRef();
  }

  handleSumbmitClick = (e) => {
    e.preventDefault();

    console.log(this.usernameRef.current.value);
    console.log(this.passwordRef.current.value);
    console.log(this.genderRef.current.value);
    console.log(this.fileRef.current.files[0]);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.usernameRef.current.value = null;
    this.passwordRef.current.value = null;
  }

  render () {
    return (
      <form onSubmit={ this.handleSumbmitClick }>
        <p>
          用户名：
          <input
            ref={ this.usernameRef }
            type="text"
            placeholder="用户名"
          />
        </p>
        <p>
          密码：
          <input
            ref={ this.passwordRef }
            type="password"
            placeholder="密码"
          />
        </p>
        <p>
          <select
            // from field 默认值 - 组件挂载完毕后进行更新，不会导致 的任何更新
            ref={ this.genderRef }
            defaultValue="female"
          >
            <option value="male" >男</option>
            <option value="female" >女</option>
          </select>
        </p>
        <p>
          <input type="radio" defaultChecked={ true } />
          <input type="checkbox" defaultChecked={ true } />
        </p>
        <p>
          <input type="file" ref={ this.fileRef } />
        </p>
        <p>
          <button type="submit">登录</button>
          <button onClick={ this.handleResetClick }>重置</button>
        </p>
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)