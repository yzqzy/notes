import diff from "./diff";

export default class Component {
  constructor (props) {
    this.props = props;
  }

  setState (state) {
    this.state = Object.assign({}, this.state, state);
    // 获取最新的需要渲染的 virtual DOM 对象
    const virtualDOM = this.render();
    // 获取旧的 virtual DOM 对象进行比对
    const oldDOM = this.getDOM();
    // 获取 container
    const container = oldDOM.parentNode;
    // 实现对比
    diff(virtualDOM, container, oldDOM);
  }

  setDOM (dom) {
    this._dom = dom;
  }

  getDOM () {
    return this._dom;
  }

  updateProps (props) {
    this.props = props;
  }

  // 生命周期函数
  componentWillMount () { }
  componentDidMount () { }
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }
  componentWillUpdate (nextProps, nextState) { }
  componentDidUpdate (prevPros, prevState) {}
  componentWillUnmount () {}
}