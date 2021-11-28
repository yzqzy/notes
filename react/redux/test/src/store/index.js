import { createStore } from 'redux';
import { reducer } from './reducers/counter';

export const store = createStore(reducer);