import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from './auth.actions';
import { LOGIN, LOGOUT } from './auth.constants';
import { getUserProfile, resetUserProfile } from '../profile/profile.actions';
import { getProfileApi, loginApi } from '../../services/apis/auth.apis';

export function* loginSaga(obj) {
  const { payload, onSuccess, onFailed } = obj;
  try {
    console.log('login payload', payload);
    const loginResponse = yield call(loginApi, {
      email: payload.email,
      password: payload.password,
    });
    console.log('loginResponse', loginResponse);
    if (loginResponse?.access_token) {
      const profileResponse = yield call(getProfileApi, {
        headers: {
          Authorization: `Bearer ${loginResponse?.access_token}`,
        },
      });
      console.log('profileResponse', profileResponse);
      if (profileResponse?.id) {
        yield put(getUserProfile(profileResponse));
        yield put(
          loginSuccess({
            accessToken: loginResponse?.access_token,
            refreshToken: loginResponse?.refresh_token,
          }),
        );
      } else {
        yield put(loginFailed('Fetch user failed'));
      }
    }
  } catch (error) {
    yield put(loginFailed(error?.response?.data?.message));
    console.log(error);
  }
}

export function* logoutSaga(obj) {
  yield put(resetUserProfile());
}

export default function* watchAuth() {
  yield takeLatest(LOGIN.REQUEST, loginSaga);
  yield takeLatest(LOGOUT.ORIGIN, logoutSaga);
}
