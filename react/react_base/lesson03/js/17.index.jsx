class Header extends React.Component {
  render () {
    return (
      <header>
        <h1>{ this.props.text }</h1>
        <div>{ this.props.citySelector }</div>
      </header>
    )
  }
}

class Selector extends React.Component {
  render () {
    return (
      <select
        value={ this.props.cityInfo.name }
        onChange={
          (e) => {
            this.props.changeCity({
              name: e.target.value,
              text: e.target[e.target.selectedIndex].text
            })
          }
        }
      >
        {
          this.props.cityData.map((item, index) => (
            <option
              key={ index }
              value={ item.name }
            >
              { item.text }
            </option>
          ))
        }
      </select>
    )
  }
}

class App extends React.Component {
  state = {
    title: '标题',
    cityInfo: {
      name: 'beijing',
      text: '北京'
    },
    cityData: [
      {
        name: 'chengdu',
        text: '成都'
      },
      {
        name: 'beijing',
        text: '北京'
      },
      {
        name: 'hangzhou',
        text: '杭州'
      },
      {
        name: 'shenzhen',
        text: '深圳'
      }
    ]
  }

  changeCity (cityInfo) {
    this.setState({
      cityInfo
    });
  }

  render () {
    return (
      <>
        <Header
          text={ this.state.title }
          citySelector={
            <Selector
              cityData={ this.state.cityData }
              cityInfo={ this.state.cityInfo }
              changeCity={ this.changeCity.bind(this) }
            />
          }
        />
        <span>{ this.state.cityInfo.text }</span>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);