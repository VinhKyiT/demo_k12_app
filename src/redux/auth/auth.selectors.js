const loginErrorSelector = state => state.auth.error;
const accessTokenSelector = state => state.auth.accessToken;
const refreshTokenSelector = state => state.auth.refreshToken;
const loginStateSelector = state => state.auth.isLoggedIn;

export { loginErrorSelector, accessTokenSelector, refreshTokenSelector, loginStateSelector };
