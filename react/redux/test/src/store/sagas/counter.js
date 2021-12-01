import { takeEvery, put, delay } from 'redux-saga/effects';
import { increment } from '../actions/counter';
import { INCREMENT_ASYNC } from '../const/counter';

function* increament_async_fn () {
  yield delay(2000);
  yield put(increment(10));
}

const counterSaga = function* () {
  yield takeEvery(INCREMENT_ASYNC, increament_async_fn)
}

export default counterSaga;
