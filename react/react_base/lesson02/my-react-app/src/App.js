// function App() {
//   const importModule = async () => {
//     const { plus } = await import('./index.module');
//     console.log(plus(1, 2));
//   }

//   return (
//     <div className="App">
//       <div>React App !!</div>
//       <button onClick={ importModule }>Click</button>
//     </div>
//   );
// }

// export default App;


// import React, { Component, lazy, Suspense } from "react";
// import Loading from './Loading';

// const MainComponent = lazy(() => import('./Main'));

// class App extends Component {
//   render () {
//     return (
//       <Suspense
//         fallback={ <Loading /> }
//       >
//         <MainComponent />
//       </Suspense>
//     )
//   }
// }

// export default App;


import React, { Component, lazy, Suspense } from "react";
import { Switch, Route } from 'react-router';
import Loading from './Loading';

class App extends Component {
  render () {
    return (
      <Suspense
        fallback={ <Loading /> }
      >
        <div className="app">
          <Switch>
            <Route path="/page1" component={ lazy(() => import('./views/Page1')) } />
            <Route path="/page2" component={ lazy(() => import('./views/Page2')) } />
            <Route path="/page3" component={ lazy(() => import('./views/Page3')) } />
          </Switch>
        </div>
      </Suspense>
    )
  }
}

export default App;