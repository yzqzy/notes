import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import { Button } from './components/index';

const theme = extendTheme({
  components: {
    Button
  }
});

ReactDOM.render(
  <ChakraProvider theme={ theme } >
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
