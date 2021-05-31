import { ThemeContext } from '../config/context';
import '../css/index.css';

class Header extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {
          (theme) => (
            <header className={`header ${ theme }`}>
              { this.props.children }
            </header>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

class NavItem extends React.Component {
  render () {
    const { index, item } = this.props;

    return (
      <div className={ !index ? `item active` : 'item' }>
        { item }
      </div>
    )
  }
}

class BottomNav extends React.Component {
  render () {
    return (
      <div className="bottom-nav">
        {
          this.props.data.map((item, index) => {
            return (
              <NavItem
                item={ item }
                index={ index }
                key={ index }
              />
            )
          })
        }
      </div>
    );
  }
}

class Main extends React.Component {
  state = {
    navData: [
      '第①',
      '第②',
      '第③',
      '第④'
    ]
  }

  render () {
    return (
      <>
        <Header>标题</Header>
        <div style={{ marginTop: '88px' }}>
          <button onClick={() => this.props.themeChange('black')}>Black</button>
          <button onClick={() => this.props.themeChange('red')}>Red</button>
          <button onClick={() => this.props.themeChange('orange')}>Orange</button>
          <button onClick={() => this.props.themeChange('purple')}>Purple</button>
        </div>
        <BottomNav
          data={ this.state.navData }
        />
      </>
    );
  };
}

class  App extends React.Component {
  state = {
    theme: 'black'
  }

  themeChange (theme) {
    this.setState({
      theme
    });
  }

  render () {
    return (
      <ThemeContext.Provider
        value={this.state.theme}
      >
        <Main themeChange={ this.themeChange.bind(this) } />
      </ThemeContext.Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);