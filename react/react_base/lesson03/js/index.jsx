import { btnStyle } from "../config";
import { BtnStyleContext, LoginStatusContext } from '../config/context';

class Button extends React.Component {
  render () {
    return (
      <BtnStyleContext.Consumer>
        {
          ({ style, doClick }) => (
            <button
              style={style}
              onClick={ doClick }
              { ...this.props }
            />
          )
        }
      </BtnStyleContext.Consumer>
    );
  }
}

class Header extends React.Component {
  render () {
    return (
      <LoginStatusContext.Consumer>
        {
          ({ status, login }) => (
            <div className="header">
              <h1>Header</h1>
              <Button>Header({ status ? '已登录' : '未登录' })</Button>
              <button onClick= {login }>登录/注销</button>
            </div>
          )
        }
      </LoginStatusContext.Consumer>
    )
  }
}

class Main extends React.Component {
  render () {
    return (
      <LoginStatusContext.Consumer>
        {
          ({ status }) => (
            <div className="main">
              <h1>Main</h1>
              <Button>Main({ status ? '已登录' : '未登录' })</Button>
            </div>
          )
        }
      </LoginStatusContext.Consumer>
    )
  }
}

class Footer extends React.Component {
  render () {
    return (
      <LoginStatusContext.Consumer>
        {
          ({ status }) => (
            <div className="footer">
              <h1>Footer</h1>
              <Button>Footer({ status ? '已登录' : '未登录' })</Button>
            </div>
          )
        }
      </LoginStatusContext.Consumer>
    )
  }
}

class Home extends React.Component {
  render () {
    return (
      <div className="page-home">
        <Header />
        <hr />
        <Main />
        <hr />
        <Footer />
        <hr />
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    style: btnStyle.success,
    loginStatus: false,
  }

  doClick (e) {
    console.log(e.target.textContent);
  }

  login () {
    this.setState({
      loginStatus: !this.state.loginStatus
    });
  }

  render () {
    return (
      <div className="app">
        <BtnStyleContext.Provider
          value={{
            style: this.state.style,
            doClick: this.doClick
          }}
        >
          <LoginStatusContext.Provider
            value={{
              status: this.state.loginStatus,
              login: this.login.bind(this)
            }}
          >
            <Home />
          </LoginStatusContext.Provider>
        </BtnStyleContext.Provider>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);