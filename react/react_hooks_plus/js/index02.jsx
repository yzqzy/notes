import { withInfo } from '../service/index';

class List extends React.PureComponent {
  render () {
    const { info, render } = this.props;

    return (
      <div>
        <ul dangerouslySetInnerHTML={{
          __html: info.map(item => render(item))
        }}></ul>
      </div>
    )
  }
}

class App extends React.Component {
  itemTpl = item => {
    return Object.entries(item).reduce((prev, [key, value]) => {
      return typeof value === 'object' 
        ? prev += `<ul><li>${ key }: ${ this.itemTpl(value) }</li></ul>`
        : prev += `<li>${ key }: ${ value }</li>`;
    }, '');
  }

  render () {
    return <div>
      <List { ...this.props } render={ this.itemTpl } />
    </div>;
  }
}

const WithInfoApp = withInfo(App);

ReactDOM.render(<WithInfoApp />, document.getElementById('app'));