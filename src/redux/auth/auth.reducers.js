import { LOGIN, LOGOUT, SET_BIOMETRICS, SET_TOKEN } from './auth.constants';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  error: '',
  isBioEnabled: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        error: '',
      };
    }
    case LOGIN.FAILED: {
      return {
        ...state,
        error: action?.payload,
      };
    }
    case LOGOUT.ORIGIN: {
      return { ...initialState };
    }
    case SET_TOKEN.ORIGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case SET_BIOMETRICS.ORIGIN:
      return {
        ...state,
        isBioEnabled: action?.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
