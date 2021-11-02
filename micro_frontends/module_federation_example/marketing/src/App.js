import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Pricing from './components/Pricing';

function App ({ history }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
