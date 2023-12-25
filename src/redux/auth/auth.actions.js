import { LOGIN, LOGOUT, SET_BIOMETRICS, SET_TOKEN } from './auth.constants';

export const loginRequest = payload => ({
  type: LOGIN.REQUEST,
  payload,
});

export const loginSuccess = payload => ({
  type: LOGIN.SUCCESS,
  payload,
});

export const loginFailed = payload => ({
  type: LOGIN.FAILED,
  payload,
});

export const logout = payload => ({
  type: LOGOUT.ORIGIN,
  payload,
});

export const setToken = payload => ({
  type: SET_TOKEN.ORIGIN,
  payload,
});

export const setBiometrics = payload => ({
  type: SET_BIOMETRICS.ORIGIN,
  payload,
});
