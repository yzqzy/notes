import React from "react"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../store/actions/counter'

function Counter ({ count, increment, decrement }) {
  return (
    <div>
      <button onClick={ increment }>+</button>
      <span>{ count }</span>
      <button onClick={ decrement }>-</button>
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
