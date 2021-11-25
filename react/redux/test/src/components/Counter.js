import React from "react"
import { connect } from 'react-redux';

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

const mapDispatchToProps = dispatch => ({
  increment () {
    dispatch({ type: 'increment' })
  },
  decrement () {
    dispatch({ type: 'decrement' })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
