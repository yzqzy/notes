import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from './middleware/logger';
import test from './middleware/test';
// import thunk from './middleware/thunk';
import thunk from 'redux-thunk';

export const store = createStore(reducers, applyMiddleware(logger, test, thunk));
