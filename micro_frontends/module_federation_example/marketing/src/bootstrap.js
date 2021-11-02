import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

function mount (el, { onNavgate, defaultHistory }) {
  const history = defaultHistory || createMemoryHistory();

  onNavgate && history.listen(onNavgate);

  ReactDOM.render(<App history={ history } />, el);

  return {
    onParentNavgate ({ pathname: nextPathname }) {
      const pathname = history.location.pathname;

      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    }
  }
}

if (process.env.NODE_ENV == 'development') {
  const el = document.querySelector('#dev-marketing');

  if (el) mount(el, {
    defaultHistory: createBrowserHistory()
  });
}

export { mount };
