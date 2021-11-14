import React from 'react';
import { css, keyframes } from '@emotion/react';

const move = keyframes`
  0% {
    background: orange;
    left: 0;
    top: 0;
  }

  100% {
    background: green;
    left：600px;
    top: 300px;
  }
`;

const box = css`
  width: 100px;
  height: 100px;
  position: absolute;
  animation: ${ move } 2s ease infinite;
`;

function App () {
  return (
    <div css={ box }>
      App Works
    </div>
  );
}

export default App;
