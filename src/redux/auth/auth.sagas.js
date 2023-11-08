import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from './auth.actions';
import { LOGIN, LOGOUT } from './auth.constants';
import axios from 'axios';
import { getUserProfile, resetUserProfile } from '../profile/profile.actions';

export function* loginSaga(obj) {
  const { payload, onSuccess, onFailed } = obj;
  try {
    console.log('login payload', payload);
    const loginResponse = yield call(axios.post, 'https://store.kybuidev.com/api/v1/auth/login', {
      email: payload.email,
      password: payload.password,
    });
    console.log('loginResponse', loginResponse);
    if (loginResponse?.data?.access_token) {
      const profileResponse = yield call(
        axios.get,
        'https://store.kybuidev.com/api/v1/auth/profile',
        {
          headers: {
            Authorization: `Bearer ${loginResponse?.data?.access_token}`,
          },
        },
      );
      console.log('profileResponse', profileResponse);
      if (profileResponse?.data?.id) {
        yield put(getUserProfile(profileResponse?.data));
        yield put(
          loginSuccess({
            accessToken: loginResponse?.data?.access_token,
            refreshToken: loginResponse?.data?.refresh_token,
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
