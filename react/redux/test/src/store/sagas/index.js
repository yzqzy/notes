import { all } from 'redux-saga/effects';
import counterSaga from './counter';
import modalSaga from './modal';

const rootSaga = function* () {
  yield all([
    counterSaga(),
    modalSaga()
  ]);
}

export default rootSaga;
