import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from './middleware/logger';
import test from './middleware/test';

export const store = createStore(reducers, applyMiddleware(logger, test));
