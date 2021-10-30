import React from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

export default function Root(props) {
  return (
    <BrowserRouter basename="/todos">
      <div>
        <Link to="/home">Home</Link> <Link to="/about">About</Link>
      </div>

      <Switch>
        <Route path="/home">
          <Home />
        </Route> 
        <Route path="/about">
          <About />
        </Route> 
        <Route path="/">
          <Redirect to="/home" />
        </Route> 
      </Switch>
    </BrowserRouter>
  );
}
