'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.less';
import avator from './imgs/avator.png';

class Search extends React.Component {
  render () {
    return (
      <div className="text">
        Hello React!!! <img width={ 200 } height={ 200 } src={ avator } />
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('app')
);