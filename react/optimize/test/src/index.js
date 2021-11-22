import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundaries from "./ErrorBoundaries";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundaries>
      <App />
    </ErrorBoundaries>
  </React.StrictMode>,
  document.getElementById('root')
);
