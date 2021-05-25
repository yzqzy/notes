class App extends React.Component {
  state = {
    username: '',
    password: '',
    intro: '',
    gender: 'male',
    isStudent: true,
    hobbies: []
  }

  hobbiesData = [
    {
      name: '钢琴',
      value: 'piano'
    },
    {
      name: '旅行',
      value: 'travel'
    },
    {
      name: '跑步',
      value: 'running'
    },
    {
      name: '唱歌',
      value: 'singing'
    }
  ]

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStudentChange = (isStudent) => {
    this.setState({
      isStudent
    })
  }

  handleHobbiesChange = (e) => {
    if (e.target.checked) {
      this.setState({
        hobbies: [...this.state.hobbies, e.target.value]
      });
    } else {
      this.setState({
        hobbies: this.state.hobbies.filter(item => item !== e.target.value)
      })
    }
  }

  handleSubmitClick = (e) => {
    e.preventDefault();

    const { username, password, intro, gender, isStudent, hobbies } = this.state;

    console.log(username, password, intro, gender, isStudent, hobbies);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.setState({
      username: '',
      password: '',
      intro: '',
      gender: 'male',
      isStudent: true,
      hobbies: []
    });
  }

  render () {
    const { username, password, intro, gender, isStudent, hobbies } = this.state;

    return (
      <form>
        <p>
          用户名:
          <input
            type="text"
            name="username"
            placeholder="用户名"
            value={ username }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            name="password"
            placeholder="密码"
            value={ password }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <textarea
            name="intro"
            placeholder="自我介绍"
            value={ intro }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <select
            value={ gender }
            name="gender"
            onChange={ this.handleChange }
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </p>
        <p>
          是否是学生：
          是<input
              type="radio"
              name="isStudent"
              checked={ isStudent }
              onChange={ this.handleStudentChange.bind(this, true) }
            />
          | 
          否<input
              type="radio"
              name="isStudent"
              onChange={ this.handleStudentChange.bind(this, false) }
            />
        </p>
        <p>
          {
            this.hobbiesData.map(item => {
              return (
                <span  key={ item.value }>
                  { item.name }：
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={ item.value }
                    checked={ hobbies.includes(item.value) }
                    onChange={ this.handleHobbiesChange }
                  />|
                </span>
              )
            })
          }
        </p>
        <p>
          <button onClick={ this.handleSubmitClick }>登录</button>
          <button onClick={ this.handleResetClick } >重置</button>
        </p>
      </form>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);