'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import '../../common/index';
import './index.less';

class Search extends React.Component {
  render () {
    return (
      <div className="text">
        Search
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('app')
);