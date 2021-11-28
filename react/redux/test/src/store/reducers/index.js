import { combineReducers } from 'redux';
import CounterReducer from './counter';
import ModalReducer from './modal';

export default combineReducers({
  counter: CounterReducer,
  modal: ModalReducer
});