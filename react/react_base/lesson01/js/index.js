class MyButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      openStatus: false
    }
  }

  render () {
    const oP = React.createElement(
      'p',
      {
        className: 'text',
        key: 1
      },
      this.state.openStatus ? 'open' : 'close'
    );

    const oBtn = React.createElement(
      'button',
      {
        key: 1,
        onClick: () => this.setState({
          openStatus: !this.state.openStatus
        })
      },
      this.state.openStatus ? 'close' : 'open'
    );

    const wrapper = React.createElement(
      'div',
      {
        className: 'wrapper',
      },
      [ oP, oBtn ]
    );

    return wrapper;
  }
}

// React -> React API -> 处理视图的 API 集合
// ReactDOM -> render -> 虚拟 DOM -> 真实 DOM

// const span = React.createElement('span', {
//   className: 'text',
//   key: 1
// }, 'this is a span');

// ReactDOM.render(
//   React.createElement('div', {
//     'data-tag': 'div'
//   },
//   [ span ]
//   ),
//   document.getElementById('app')
// )

ReactDOM.render(
  React.createElement(MyButton),
  document.getElementById('app')
)