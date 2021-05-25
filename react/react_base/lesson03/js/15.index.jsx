// import Loading from './loading';
// import ErrorBoundary from './ErrorBoundary';

// const TestComponent = React.lazy(() => import('./index.module'));

// class App extends React.Component {
//   render () {
//     return (
//       <ErrorBoundary>
//         <React.Suspense
//           fallback={ <Loading /> }
//         >
//           <TestComponent />
//         </React.Suspense>
//       </ErrorBoundary>
//     );
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

import Loading from './loading';

const Test1 = React.lazy(() => import('./modules/Test1'));
const Test2 = React.lazy(() => import('./modules/Test2'));

class App extends React.Component {
  render () {
    return (
      <React.Suspense
        fallback={ <Loading /> }
      >
        <Test1 />
        <Test2 />
      </React.Suspense>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);