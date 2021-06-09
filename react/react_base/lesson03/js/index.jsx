// class Table extends React.Component {
//   state = {
//     headers: [
//       'Name',
//       'ID',
//       'Age'
//     ],
//     info: [
//       'yueluo',
//       '2324324234',
//       '23'
//     ]
//   }

//   render () {
//     return (
//       <table border="1">
//         <caption>Private Information</caption>
//         <thead>
//           <tr>
//             <TableHeaders headers={ this.state.headers } />
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <TableCells info={ this.state.info } />
//           </tr>
//         </tbody>
//       </table>
//     );
//   }
// }

// class TableHeaders extends React.Component {
//   render () {
//     return (
//       <>
//         {
//           this.props.headers.map((item, index) => (
//             <th key={ index }>{ item }</th>
//           ))
//         }
//       </>
//     )
//   }
// }

// class TableCells extends React.Component {
//   render () {
//     return (
//       <>
//         {
//           this.props.info.map((item, index) => (
//             <td key={index}>{ item }</td>
//           ))
//         }
//       </>
//     )
//   }
// }

// class App extends React.Component {
//   render () {
//     return (
//       <Table />
//     );
//   }
// }

class StaffList extends React.Component {
  state = {
    list: [
      {
        id: 1,
        name: '小红',
        desc: '研发'
      },
      {
        id: 2,
        name: '小李',
        desc: '运维'
      },
      {
        id: 3,
        name: '小明',
        desc: '财务'
      },
      {
        id: 4,
        name: '小华',
        desc: '销售'
      },
    ]
  }

  render () {
    return (
      <dl>
        {
          this.state.list.map(({ id, name, desc }) => (
            // <>
            //   <dl>{ id }: { name }</dl>
            //   <dd>{ desc }</dd>
            // </>
            <React.Component key={ id }>
              <dl>{ id }: { name }</dl>
              <dd>{ desc }</dd>
            </React.Component>
          ))
        }
      </dl>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <StaffList />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);