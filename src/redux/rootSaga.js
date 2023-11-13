import { all, fork } from 'redux-saga/effects';
import watchAuthSaga from './auth/auth.sagas';
import watchHomeSaga from './home/home.sagas';
import watchCountSaga from './counter/counter.sagas';

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchHomeSaga),
    fork(watchCountSaga),
    // ...other sagas
  ]);
}
