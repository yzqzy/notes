import React from 'react';
import { css } from '@emotion/react';

const style = css({
  width: 200,
  height: 200,
  background: 'orange'
});

function App () {
  return (
    <div css={ style }>App</div>
  );
}

export default App;
