const loginErrorSelector = state => state.auth.error;
const accessTokenSelector = state => state.auth.accessToken;
const refreshTokenSelector = state => state.auth.refreshToken;
const loginStateSelector = state => state.auth.isLoggedIn;
const getBiometricStateSelector = state => state.auth.isBiometricEnabled;

export {
  loginErrorSelector,
  accessTokenSelector,
  refreshTokenSelector,
  loginStateSelector,
  getBiometricStateSelector,
};
