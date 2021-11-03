import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Signin from './components/Signin';

function App ({ history }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/auth/signin">
          <Signin />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
