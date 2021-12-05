import React from "react"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../store/actions/counter'

function Counter ({ count, increment, decrement, increment_async }) {
  return (
    <div>
      <button onClick={ () => increment_async(20) }>+</button>
      <span>{ count }</span>
      <button onClick={ () => decrement(5) }>-</button>
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.counter.count
});

const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
