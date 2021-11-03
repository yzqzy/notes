import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Signin from './components/Signin';

function App ({ history, setStatus }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/auth/signin">
          <Signin setStatus={ setStatus } />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
