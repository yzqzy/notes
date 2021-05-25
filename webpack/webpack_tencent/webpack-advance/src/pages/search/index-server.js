'use strict';

const React = require('react');

require('../../common/index');
require('./index.less');

class Search extends React.Component {
  render () {
    return (
      <div className="text">
        <div>
          Hello React Servcer Render!!!
        </div>
      </div>
    );
  }
}

module.exports = <Search />;