import { LOGIN_FAILED, LOGIN_SUCCESS } from './auth.constants';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        error: '',
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        error: action?.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
