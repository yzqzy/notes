// import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const/counter";

// export const increment = payload => ({ type: INCREMENT, payload });
// export const decrement = payload => ({ type: DECREMENT, payload });

// // export const increment_async = payload => dispatch => {
// //   setTimeout(() => dispatch(increment(payload)), 2 * 1000);
// // }

// export const increment_async = payload => ({ type: INCREMENT_ASYNC, payload });


import { createAction } from 'redux-actions';

export const increment = createAction('inrement');
export const decrement = createAction('decrement');