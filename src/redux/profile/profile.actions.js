import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from './profile.constants';

export const getUserProfile = payload => ({
  type: GET_USER_PROFILE.SUCCESS,
  payload,
});

export const resetUserProfile = () => ({
  type: GET_USER_PROFILE.RESET,
});

export const updateUserProfileRequest = payload => ({
  type: UPDATE_USER_PROFILE.REQUEST,
  payload,
});

export const updateUserProfileSuccess = payload => ({
  type: UPDATE_USER_PROFILE.SUCCESS,
  payload,
});

export const updateUserProfileFailed = payload => ({
  type: UPDATE_USER_PROFILE.FAILED,
  payload,
});
