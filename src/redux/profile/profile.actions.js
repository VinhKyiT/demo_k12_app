import { GET_USER_PROFILE } from './profile.constants';

export const getUserProfile = payload => ({
  type: GET_USER_PROFILE.SUCCESS,
  payload,
});

export const resetUserProfile = () => ({
  type: GET_USER_PROFILE.RESET,
});
