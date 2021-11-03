import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Auth from './components/AuthApp';
import Marketing from './components/MarketingApp';
import Header from './components/Header';

const history = createBrowserHistory()

function App () {
  return (
    <Router history={ history }>
      <Header />
      <Switch>
        <Route path="/auth/signin"> 
          <Auth />
        </Route>
        <Route path="/"> 
          <Marketing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
