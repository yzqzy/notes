class StudentList extends React.Component {
  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>年级</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.grade }</td>
                <td>
                  <button
                    onClick={() => this.props.removeStudent(item.id)}
                  >删除</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

class TeacherList extends React.Component {
  render () {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>科目</th>
            <th>喜欢</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.subject }</td>
                <td>{ item.like }</td>
                <td>
                  <button
                    onClick={() => this.props.likeTeacher(item.id)}
                  >
                    喜欢
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

const fetchListData = (field) => {
  let url = '';

  switch (field) {
    case 'student':
      url = 'http://localhost:8080/getStudents';
      break;
    case 'teacher':
      url = 'http://localhost:8080/getTeachers';
      break;
    default:
      break;
  }

  return axios(url);
}

class App extends React.Component {
  state = {
    studentList: [],
    teacherList: []
  }

  async componentDidMount () {
    const studentData = await fetchListData('student');
    const teacherData = await fetchListData('teacher');

    this.setState({
      studentList: studentData.data,
      teacherList: teacherData.data
    });
  }

  removeStudent (id) {
    this.setState({
      studentList: this.state.studentList.filter(item => item.id !== id)
    });
  }

  likeTeacher (id) {
    this.setState({
      teacherList: this.state.teacherList.map(item => {
        if (item.id === id) {
          item.like += 1;
        }
        return item;
      })
    });
  }

  render () {
    return (
      <div className="app">
        <StudentList
          data={ this.state.studentList }
          removeStudent={ this.removeStudent.bind(this) }
        />
        <TeacherList
          data={ this.state.teacherList }
          likeTeacher={ this.likeTeacher.bind(this) }
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);