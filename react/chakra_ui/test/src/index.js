import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme, ChakraProvider, CSSReset } from '@chakra-ui/react';

theme.config.useSystemColorMode = true;

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <App theme={ theme } />
  </ChakraProvider>,
  document.getElementById('root')
);
