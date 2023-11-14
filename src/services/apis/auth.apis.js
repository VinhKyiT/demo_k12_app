import { END_POINTS } from '~constants/endpoints';
import axiosClient from '~utils/axiosClient';

export const loginApi = data => {
  return axiosClient.post(END_POINTS.auth.login, data);
};

export const getProfileApi = () => {
  return axiosClient.get(END_POINTS.auth.profile);
};

export const refreshTokenApi = () => {
  return axiosClient.get(END_POINTS.auth.refreshToken);
};
