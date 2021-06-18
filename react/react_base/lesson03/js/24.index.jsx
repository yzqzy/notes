class MyInput extends React.Component {
  state = {
    inputValue: ''
  }

  constructor (props) {
    super(props);

    this.inputRef = React.createRef();
  }

  inputOperating () {
    const oInput = this.inputRef.current;

    oInput.focus();

    this.setState({
      inputValue: ''
    });
  }

  changeInputVal (e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render () {
    return (
      <div>
        <input
          type="text"
          ref={ this.inputRef }
          value={ this.state.inputValue }
          onChange={ this.changeInputVal.bind(this) }
        />
        <button onClick={ this.inputOperating.bind(this) }>Button</button>
      </div>
    )
  }
}

class MyVideo extends React.Component {
  constructor (props) {
    super(props);

    this.videoRef = React.createRef();
  }

  videoPlay () {
    this.videoRef.current.play();
  }

  videoPause () {
    this.videoRef.current.pause();
  }

  render () {
    return (
      <div>
        <video
          ref={ this.videoRef }
          src="https://data.yueluo.club/react"
          width="300"
          height="200"
          controls
        />
        <div>
          <button onClick={ this.videoPlay.bind(this) }>Play</button>
          <button onClick={ this.videoPause.bind(this) }>Pause</button>
        </div>
      </div>
    )
  }
}

class MyBox extends React.Component {
  constructor (props) {
    super(props);

    this.boxRef = React.createRef();
  }

  boxExtend () {
    const oBox = this.boxRef.current;

    oBox.style.width = '500px';
    oBox.style.height = '500px';
  }

  render () {
    return (
      <>
        <div
          ref={ this.boxRef }
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'orange',
            transition: 'all 1s'
          }}
        ></div>
        <button onClick={ this.boxExtend.bind(this) }>Extend</button>
      </>
    )
  }
}

class MyBox2 extends React.Component {
  constructor (props) {
    super(props);

    this.boxRef = React.createRef();
  }

  boxExtend () {
    const $box = $(this.boxRef.current);

    $box.animate({
      width: '500px',
      height: '500px'
    });
  }

  render () {
    return (
      <>
        <div
          ref={ this.boxRef }
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'orange',

          }}
        ></div>
        <button onClick={ this.boxExtend.bind(this) }>Extend</button>
      </>
    )
  }
}

class Modal extends React.Component {
  // modalRef = React.createRef();

  // constructor (props) {
  //   super(props);

  //   if (props.onRef) {
  //     props.onRef(this);
  //   }
  // }

  // open () {
  //   this.modalRef.current.style.display = 'block';
  // }

  // close () {
  //   this.modalRef.current.style.display = 'none';
  // }

  render () {
    return (
      <div
        // ref={ this.modalRef }
        style={{
          width: 300,
          border: '1px solid #000',
          // display: 'none'
          display: this.props.isOpen ? 'block' : 'none'
        }}
      >
        <h1>This is a Modal</h1>
        <p>This is a super Modal.</p>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    isOpen: false
  };

  modalOpen (status) {
    // switch (status) {
    //   case 'open':
    //     this.modal.open();
    //     break;
    //   case 'close':
    //     this.modal.close();
    //     break;
    //   default:
    //     break;
    // }
    this.setState({
      isOpen: status === 'open' ? true : false
    });
  }

  render () {
    return (
      <div>
        {/* <Modal onRef={ ref => (this.modal = ref) } /> */}
        <Modal isOpen={ this.state.isOpen } />
        <div>
          <button onClick={ () => this.modalOpen('open') }>Open</button>
          <button onClick={ () => this.modalOpen('close') }>Close</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);