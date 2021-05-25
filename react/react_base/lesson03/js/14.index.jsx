/**
 * Bound bind -> 绑定、带子、线 bund  
 * ou -> o -> i  ary 名词后缀，边界
 * 
 * static getDerivedStateFromError(error) 静态方法
 * 
 * 参数：子组件抛出的错误
 * 返回值：新的 state
 * 获取捕获到的错误状态，修改错误状态
 * 作用：渲染备用的 UI
 * 渲染阶段调用，不允许出现副作用 setTimeout
 */
class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  constructor (props) {
    super(props);

    window.onerror = function (err) {
      console.log(err);
    }
  }

  static getDerivedStateFromError (error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    console.log(error, info);
  }

  render () {
    if (this.state.hasError) {
      return (
        <h1>This is Error UI</h1>
      );
    }

    return this.props.children;
  }
}

class Test extends React.Component {
  render () {
    return (
      <div>{ data.title }</div>
    )
  }
}

class Sub extends React.Component {
  render () {
    return (
      <p>This is content</p>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <Sub />
        <ErrorBoundary>
          <Test />
        </ErrorBoundary>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)