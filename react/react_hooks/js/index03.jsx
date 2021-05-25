import { useInfo } from '../service/index';

const useList = (info, itemTpl) => {
  return (
    <ul dangerouslySetInnerHTML={{
      __html: info.map(item => itemTpl(item))
    }}></ul>
  )
}

const App = () => {
  const info = useInfo();

  function itemTpl (item) {
    return Object.entries(item).reduce((prev, [key, value]) => {
      return typeof value === 'object' 
        ? prev += `<ul><li>${ key }: ${ itemTpl(value) }</li></ul>`
        : prev += `<li>${ key }: ${ value }</li>`;
    }, '');
  }

  return useList(info, itemTpl);
}

ReactDOM.render(<App />, document.getElementById('app'));