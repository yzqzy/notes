// import { nanoid } from 'nanoid';
// class App extends React.Component {
//   state = {
//     arr: [
//       {
//         id: 1,
//         name: '张三'
//       },
//       {
//         id: 2,
//         name: '李四'
//       },
//       {
//         id: 3,
//         name: '王五'
//       }
//     ]
//   }

//   render () {
//     const { arr } = this.state;

//     return (
//       <table border="1">
//         <thead>
//           <tr>
//             <th>KEY</th>
//             <th>ID</th>
//             <th>名称</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             arr.map((item, index) => {
//               const key = nanoid();

//               return (
//                 <tr key={ key }>
//                   <td>{ key }</td>
//                   <td>{ item.id }</td>
//                   <td>{ item.name }</td>
//                 </tr>
//               )
//             })
//           }
//         </tbody>
//       </table>   
//     );
//   }
// }

import { nanoid } from 'nanoid';

class ItemTitle extends React.Component {
  render () {
    return (
      <thead>
        <tr>
          <th>KEY</th>
          <th>ID</th>
          <th>NAME</th>
        </tr>
      </thead>
    )
  }
}

class ListItem extends React.Component {
  render () {
    const { sid, item } = this.props;

    return (
      <tbody>
        <tr>
          <td>{ sid }</td>
          <td>{ item.id }</td>
          <td>{ item.name }</td>
        </tr>
      </tbody>
    )
  }
}

class ListTable extends React.Component {
  state = {
    arr: [
      {
        id: 1,
        name: '张三'
      },
      {
        id: 2,
        name: '李四'
      },
      {
        id: 3,
        name: '王五'
      }
    ]
  }

  render () {
    return (
      <table border="1">
        <ItemTitle />
        {
          this.state.arr.map(item => {
            const sid = nanoid();

            return (
              <ListItem
                key={ sid }
                sid={ sid }
                item={ item }
              />
            )
          })
        }
      </table>
    )
  }
}


ReactDOM.render(
  <ListTable />,
  document.getElementById('app')
);