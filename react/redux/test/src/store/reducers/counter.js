import { INCREMENT, DECREMENT } from "../const/counter";
import { HIDE_MODAL, SHOW_MODAL } from "../const/modal";

const initialState = {
  count: 0,
  show: false
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.payload
      };
    case SHOW_MODAL: 
      return {
        ...state,
        show: true
      };
    case HIDE_MODAL:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
} 