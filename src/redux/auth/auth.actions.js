import { LOGIN, LOGOUT, SET_TOKEN } from './auth.constants';

export const loginRequest = (payload, onSuccess, onFailed) => ({
  type: LOGIN.REQUEST,
  payload,
  onSuccess,
  onFailed,
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
