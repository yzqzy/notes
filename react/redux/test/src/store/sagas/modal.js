import { takeEvery, put, delay } from 'redux-saga/effects';
import { show } from '../actions/modal';
import { SHOW_MODAL_ASYNC } from '../const/modal';

function* showModal_async () {
  yield delay(2000);
  yield put(show());
}

const modalSaga = function* () {
  yield takeEvery(SHOW_MODAL_ASYNC, showModal_async);
}

export default modalSaga;