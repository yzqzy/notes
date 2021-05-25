class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  login = () => {
    const { username, password } = this.state;

    if (!username || !password) {
      return alert('用户名密码不能为空');
    }
    
    this.props.login(username, password);
  }

  handleUseNameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }
 
  render () {
    return (
      <div>
        <p>
          用户名：
          <input 
            type="text"
            placeholder="用户名"
            onChange={this.handleUseNameChange}
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            placeholder="密码"
            onChange={this.handlePasswordChange}
          />
        </p>
        <p>
          <button onClick={ this.login }>登录</button>
        </p>
      </div>
    )
  }  
}

class Welcome extends React.Component {
  render () {
    return (
      <div>
        <h1>欢迎您，月落。</h1>
        <button onClick={this.props.logout}>退出登录</button>
      </div>
    );
  }
}

class Tip extends React.Component {
  render () {
    const { tipShow } = this.props;

    if (!tipShow) {
      // 如果 render 返回 null，不会进行任何渲染
      return null;
    }

    return (
      <p>This is a tip.</p>
    )
  }
}

class App extends React.Component {
  state = {
    logged: false,
    count: 0,
    tipShow: false
  }

  logout = () => {
    this.setState({
      logged: false,
      tipShow: false
    });
  }

  login = (username, password) => {
    if (username != 'root' || password != 'root') {
      return alert('用户名密码错误');
    }

    this.setState({
      logged: true,
      tipShow: true
    });
  }

  render () {
    const { logged, count, tipShow } = this.state;

    return (
      <div>
        {
          logged && <span>您好。</span>
        }
        {
          // 判断表达式一定是 bool false、null、undefined 的时候才不会被渲染
          // 0、NaN 会被渲染出来
          count && <p>会员等级：{ count }</p>
          // 解决方式：count.toString() && 
        }
        {
          logged ? (
            <Welcome logout={this.logout} />
          ) : <LoginForm login={this.login} />
        }
        <Tip tipShow={ tipShow } />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);