import React from 'react';
import { css, useTheme } from '@emotion/react';

const primaryColor = props => css`
  color: ${ props.colors.primary }
`;

function App () {
  console.log(useTheme()); // 也可以用 hook 的方式获得

  return (
    <div css={ primaryColor }>
      App Works
    </div>
  );
}

export default App;
