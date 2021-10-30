import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export default function Root(props) {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">@single-spa/welcome</Link>
        <Link to="/test" style={{ marginLeft: 10 }}>@yueluo/test</Link>
        <Link to="/todos" style={{ marginLeft: 10 }}>@yueluo/todos</Link>
        <Link to="/realworld" style={{ marginLeft: 10 }}>@yueluo/realworld</Link>
      </div>
    </BrowserRouter>
  );
}
