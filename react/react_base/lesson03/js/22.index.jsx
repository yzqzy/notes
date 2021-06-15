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

function listHoc (WrapperComponent, fetchListData) {
  return class extends React.Component {
    state = {
      listData: []
    }

    removeStudent (id) {
      this.setState({
        listData: this.state.listData.filter(item => item.id !== id)
      });
    }

    likeTeacher (id) {
      this.setState({
        listData: this.state.listData.map(item => {
          if (item.id === id) {
            item.like += 1;
          }
          return item;
        })
      });
    }

    async componentDidMount () {
      const result = await fetchListData(this.props.field);

      this.setState({
        listData: result.data
      });
    }

    render () {
      return (
        <>
          {
            this.props.field === 'student' ? (
              <WrapperComponent
                data={ this.state.listData }
                removeStudent={ this.removeStudent.bind(this) }
              />
            ) : (
              <WrapperComponent
                data={ this.state.listData }
                likeTeacher={ this.likeTeacher.bind(this) }
              />
            )
          }
        </>
      )
    }
  }
}

const StudentListHoc = listHoc(StudentList, fetchListData);
const TeacherListHoc = listHoc(TeacherList, fetchListData);

class App extends React.Component {
  render () {
    return (
      <div className="app">
        <StudentListHoc field="student" />
        <TeacherListHoc field="teacher" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);