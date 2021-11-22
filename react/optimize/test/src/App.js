import { Component } from "react";
import _ from 'lodash';

class App extends Component {
  render () {
    console.log(_.chunk(['a', 'b', 'c', 'd', 'e'], 2));

    return (
      <div>App Works</div>
    )
  }
}

export default App;
