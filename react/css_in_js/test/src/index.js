import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: 'blue'
  }
};

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
