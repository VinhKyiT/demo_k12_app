import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from './profile.constants';

const initialProfileState = {
  userInfo: {},
};

const profileReducers = (state = initialProfileState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE.SUCCESS: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    case GET_USER_PROFILE.RESET: {
      return { ...initialProfileState };
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    default:
      return state;
  }
};

export default profileReducers;
