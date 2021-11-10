import React from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';

function App () {
  return (
    <>
      <div>
        <Link to="/home">首页</Link>
        <Link to="/list">列表页</Link>
      </div>
      <div>
        <Route path="/home" component={ Home } />
        <Route path="/list" component={ List } />
      </div>
    </>
  );
}

export default App;
