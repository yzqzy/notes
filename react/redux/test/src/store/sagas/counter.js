import { takeEvery, put, delay } from 'redux-saga/effects';
import { increment } from '../actions/counter';
import { INCREMENT_ASYNC } from '../const/counter';

function* increament_async_fn (action) {
  yield delay(2000);
  yield put(increment(action.payload));
}

const counterSaga = function* () {
  yield takeEvery(INCREMENT_ASYNC, increament_async_fn)
}

export default counterSaga;
