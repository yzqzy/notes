import React from 'react';
import { css } from '@emotion/react';

const style = css`
  width: 200px;
  height: 200px;
  background: orange;
`;

function Css (props) {
  return (
    <div
      css={ style }
      { ...props }
    >
      CSS
    </div>
  )
}

export default Css