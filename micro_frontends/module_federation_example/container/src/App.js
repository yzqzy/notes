import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import Progress from './components/Progress';

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

const history = createBrowserHistory()

function App () {
  return (
    <Router history={ history }>
      <Header />
      <Suspense fallback={ <Progress /> }>
        <Switch>
          <Route path="/auth/signin"> 
            <AuthApp />
          </Route>
          <Route path="/"> 
            <MarketingApp />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
