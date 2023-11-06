import { LOGIN_FAILED, LOGIN_SUCCESS } from './auth.constants';

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailed = payload => ({
  type: LOGIN_FAILED,
  payload,
});
