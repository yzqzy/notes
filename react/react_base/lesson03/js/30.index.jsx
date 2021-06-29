// class Repeat extends React.Component {
//   render () {
//     const arr = [];

//     for (let i = 0; i < this.props.num; i++) {
//       arr.push(this.props.children(i));
//     }

//     return arr;
//   }
// }

// class App extends React.Component {
//   render () {
//     return (
//       <Repeat
//         num={10}
//       >
//         {
//           (index) => (
//             <p key={index}>This is item { index + 1 }.</p>
//           )
//         }
//       </Repeat>
//     )
//   }
// }


// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

const Http = {
  GET: class extends React.Component {
    state = {
      data: [],
      component: this.props.loading || 'Loading...'
    };

    async componentDidMount () {
      const result = await axios(this.props.url);

      this.setState({
        data: result.data
      }, () => {
        setTimeout(() => {
          this.setState({
            component: this.props.children(this.state.data)
          });
        }, 2 * 1000)
      });
    }

    render () {
      return this.state.component;
    }
  }
}

class App extends React.Component {
  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>年级</th>
          </tr>
        </thead>
        <tbody>
          <Http.GET
            url="http://localhost:8080/getStudents"
            loading={
              <tr>
                <td colSpan={3}>正在加载中...</td>
              </tr>
            }
          >
            {
              (data) => (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td>{ item.grade }</td>
                  </tr>
                ))
              )
            }
          </Http.GET>
        </tbody>
      </table>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);