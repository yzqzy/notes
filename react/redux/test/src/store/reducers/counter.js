// import { INCREMENT, DECREMENT } from "../const/counter";

// const initialState = {
//   count: 0
// }

// const counterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT:
//       return {
//         ...state,
//         count: state.count + action.payload
//       };
//     case DECREMENT:
//       return {
//         ...state,
//         count: state.count - action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default counterReducer;



import { handleActions as createReducer } from 'redux-actions';
import { increment, decrement } from '../actions/counter';

const initialState = {
  count: 0
};

const handleIncrement = (state, action) => ({
  count: state.count + action.payload
});

const handleDecrement = (state, action) => ({
  count: state.count - action.payload
});

export default createReducer({
  [increment]: handleIncrement,
  [decrement]: handleDecrement
}, initialState);