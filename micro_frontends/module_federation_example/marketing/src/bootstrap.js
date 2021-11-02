import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import App from './App';

function mount (el) {
  const history = createMemoryHistory();

  ReactDOM.render(<App history={ history } />, el);
}

if (process.env.NODE_ENV == 'development') {
  const el = document.querySelector('#dev-marketing');

  if (el) mount(el);
}

export { mount };
