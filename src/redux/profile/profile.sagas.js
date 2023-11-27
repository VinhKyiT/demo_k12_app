import { call, put, takeLatest } from 'redux-saga/effects';
import { UPDATE_USER_PROFILE } from './profile.constants';
import { updateUserProfileFailed, updateUserProfileSuccess } from './profile.actions';
import { updateUserApi } from '../../services/apis/user.apis';

function* updateProfileSaga(obj) {
  try {
    const { payload } = obj;
    const { avatar, userId, name, oldPassword, newPassword, reEnterPassword } = payload;
    const userPayload = {
      name,
      avatar,
    };
    if (oldPassword) {
      if (newPassword === reEnterPassword) {
        userPayload.password = newPassword;
      }
    }
    const res = yield call(updateUserApi, { userId, payload: userPayload });
    if (res) {
      yield put(updateUserProfileSuccess(res));
    }
  } catch (error) {
    yield put(updateUserProfileFailed(error));
    console.log(error);
  }
}

export default function* watchUserProfileSaga() {
  yield takeLatest(UPDATE_USER_PROFILE.REQUEST, updateProfileSaga);
}
