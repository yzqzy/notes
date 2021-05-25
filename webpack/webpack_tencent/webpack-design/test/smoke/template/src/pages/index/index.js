'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import '../../common/index';
import './index.less';
import avator from '../../imgs/avator.png';

import { a } from './tree-shaking';

class Search extends React.Component {
  constructor () {
    super(...arguments);

    this.state = {
      Text: null
    };
  }

  loadComponent () {
    import('./dynamic').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }

  render () {
    const funcA = a;
    const { Text } = this.state;

    return (
      <div className="text">
        <div>
          Hello React!!! { funcA }
        </div>
        { Text ? <Text /> : null }
        <div>
          <img
            width={ 200 }
            height={ 200 }
            src={ avator }
            onClick={ this.loadComponent.bind(this) }
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('app')
);