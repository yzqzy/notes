import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';
// import { Button } from './component-styles/index';

// const theme = extendTheme({
//   components: {
//     Button
//   }
// });

ReactDOM.render(
  <ChakraProvider theme={ theme } >
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
