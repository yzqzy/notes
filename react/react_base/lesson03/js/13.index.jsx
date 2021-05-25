import Loading from './loading';

const MainComponent = React.lazy(() => import('./main'));
class App extends React.Component {
  render () {
    return (
      <React.Suspense
        fallback={ <Loading /> }
      >
        <div>
          <MainComponent />
        </div>
      </React.Suspense>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);