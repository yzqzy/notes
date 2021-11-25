import { createStore } from 'redux';
import { reducer } from './reducers/couner';

export const store = createStore(reducer);