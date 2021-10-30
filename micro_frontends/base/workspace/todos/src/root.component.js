import React from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Parcel from "single-spa-react/parcel"

export default function Root(props) {
  return (
    <BrowserRouter basename="/todos">
      <Parcel config={System.import("@yueluo/navbar")} />
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
