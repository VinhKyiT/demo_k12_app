import { call, put, select, takeLatest } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from './auth.actions';
import { LOGIN, LOGOUT } from './auth.constants';
import { getUserProfile, resetUserProfile } from '../profile/profile.actions';
import { getProfileApi, loginApi } from '../../services/apis/auth.apis';
import useBiometrics, { setupBiometrics } from '~helpers/biometrics';
import { showModal } from '~components/AppModal';
import { getBiometricStateSelector } from './auth.selectors';
import Toast from 'react-native-toast-message';

export function* loginSaga(obj) {
  const { payload, onSuccess, onFailed } = obj;
  try {
    console.log('login payload', payload);
    const loginResponse = yield call(loginApi, {
      email: payload.email,
      password: payload.password,
    });
    console.log('loginResponse', loginResponse);
    if (loginResponse.data?.access_token) {
      const isBioEnabled = yield select(getBiometricStateSelector);
      if (!isBioEnabled) {
        showModal({
          title: 'Thông báo',
          content: 'Bạn có muốn sử dụng sinh trắc học cho lần đăng nhập tiếp theo?',
          cancelText: 'Huỷ',
          onConfirm: async () => {
            setupBiometrics(
              () => {
                Toast.show({
                  type: 'success',
                  text1: 'Thành công',
                  text2: 'Đã kích hoạt xác thực bằng sinh trắc học!',
                });
              },
              () => {
                Toast.show({
                  type: 'error',
                  text1: 'Thất bại',
                  text2: 'Kích hoạt xác thực bằng sinh trắc học không thành công!',
                });
              },
            );
          },
          hasCancel: true,
        });
      }
      const profileResponse = yield call(getProfileApi, {
        headers: {
          Authorization: `Bearer ${loginResponse.data?.access_token}`,
        },
      });
      console.log('profileResponse', profileResponse);
      if (profileResponse?.id) {
        yield put(getUserProfile(profileResponse));
        yield put(
          loginSuccess({
            accessToken: loginResponse.data?.access_token,
            refreshToken: loginResponse.data?.refresh_token,
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
