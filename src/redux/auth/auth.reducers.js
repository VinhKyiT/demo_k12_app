import { LOGIN, LOGOUT } from './auth.constants';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  error: '',
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
    default:
      return state;
  }
};

export default authReducer;
