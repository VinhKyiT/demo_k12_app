import { delay, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { incrementSuccess } from './counter.actions';
import { INCREMENT_COUNTER } from './counter.constants';

//saga
function* handleIncrement(obj) {
  const { payload } = obj;
  try {
    console.log('start increment');
    yield delay(2000);
    console.log('increment success');
    yield put(incrementSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchCountSaga() {
  yield takeLatest(INCREMENT_COUNTER.REQUEST, handleIncrement);
}
