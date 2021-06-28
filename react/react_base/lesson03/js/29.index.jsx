// function MyTitle (props) {
//   return (
//     <div>
//       { props.children }
//     </div>
//   )
// }

// class App extends React.Component {
//   render () {
//     return (
//       <div>
//         <MyTitle>
//           This is a Title
//         </MyTitle>
//         <MyTitle>
//           This is
//           a Title
//         </MyTitle>
//         <MyTitle>
//           This is &nbsp;&nbsp;&nbsp; a Title
//         </MyTitle>
//         <MyTitle>
//           This is a &lt;TITLE&gt;
//         </MyTitle>
//         <MyTitle>
//           { 'This is a <TITLE>' }
//         </MyTitle>
//         <MyTitle>
//           { 'This is a &lt;TITLE&gt;' }
//         </MyTitle>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

// class MyList extends React.Component {
//   render () {
//     return (
//       <div className={ this.props.listClassName }>
//         <h1>{ this.props.title }</h1>
//         <ul className="my-list">
//           { this.props.children }
//         </ul>
//       </div>
//     )
//   }
// }

// class ListItem extends React.Component {
//   render () {
//     return (
//       <li>{ this.props.children }</li>
//     )
//   }
// }


// class App extends React.Component {
//   state = {
//     listData: [
//       'This a content 1.',
//       'This a content 2.',
//       'This a content 3.',
//     ]
//   }

//   render () {
//     return (
//       <div>
//         <MyList
//           listClassName="my-list-container"
//           title="This is my list"
//         >
//           {
//             this.state.listData.map((item, index) => (
//               <ListItem key={ index }>
//                 Hello，{ item }
//               </ListItem>
//             ))
//           }
//         </MyList>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );



class MyList extends React.Component {
  render () {
    return (
      <div className={ this.props.listClassName }>
        <h1>{ this.props.title }</h1>
        <ul className="my-list">
          { this.props.children }
        </ul>
      </div>
    )
  }
}

class ListItems extends React.Component {
  render () {
    // return [
    //   <li key="1">This is content 1.</li>,
    //   <li key="2">This is content 2.</li>,
    //   <li key="3">This is content 3.</li>,
    // ]
    return this.props.listData.map((item, index) => (
      <li key={index}>{ item }</li>
    ))
  }
}


class App extends React.Component {
  state = {
    listData: [
      'This a content 1.',
      'This a content 2.',
      'This a content 3.',
    ]
  }

  render () {
    return (
      <div>
        <MyList
          listClassName="my-list-container"
          title="This is my list"
        >
          {/* <ListItems /> */}
          <ListItems listData={this.state.listData}  />
        </MyList>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);