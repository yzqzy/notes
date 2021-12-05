import React from "react"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../store/actions/counter'

function Counter ({ count, increment, decrement}) {
  return (
    <div>
      <button onClick={ () => increment(10) }>+</button>
      <span>{ count }</span>
      <button onClick={ () => decrement(10) }>-</button>
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.counter.count
});

const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
